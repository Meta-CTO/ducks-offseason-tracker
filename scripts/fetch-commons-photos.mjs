// Sources every person's photo from Wikimedia Commons under a FREE license
// (CC0 / public domain / CC BY / CC BY-SA) and records the attribution each
// license requires. Anything non-free — including all NHL/NHLI headshots — is
// rejected; those people fall back to an initials avatar in the UI.
//
// Writes:
//   public/headshots/<slug>.<ext>   the image
//   src/data/photo-credits.json     { slug: {name, file, author, license,
//                                     licenseUrl, sourceUrl, cropped} }
//
// Usage: node scripts/fetch-commons-photos.mjs

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

// Wikimedia asks for a descriptive User-Agent. Set CONTACT_EMAIL to your
// own address when running this yourself.
const CONTACT = process.env.CONTACT_EMAIL ?? 'https://github.com/Meta-CTO/ducks-offseason-tracker'
const UA = `ducks-offseason-tracker/1.0 (${CONTACT})`
const OUT_DIR = path.resolve('public/headshots')
const CREDITS = path.resolve('src/data/photo-credits.json')

// { display } is the name the app renders (and slugifies); { search } is the
// Wikipedia lookup when the display name is surname-only.
const PEOPLE = [
  { display: 'Leo Carlsson' }, { display: 'Cutter Gauthier' },
  { display: 'Beckett Sennecke' }, { display: 'Troy Terry' },
  { display: 'Chris Kreider' }, { display: 'Mikael Granlund' },
  { display: 'Alex Killorn' }, { display: 'Frank Vatrano' },
  { display: 'Ryan Poehling' }, { display: 'Washe', search: 'Tim Washe' },
  { display: 'Mason McTavish' }, { display: 'Jeffrey Viel' },
  { display: 'Ross Johnston' }, { display: 'A.J. Greer' },
  { display: 'Jeff Malott' }, { display: 'Colangelo', search: 'Sam Colangelo' },
  { display: 'Nathan Gaucher' }, { display: 'Nikita Nesterenko' },
  { display: 'Jackson LaCombe' }, { display: 'Pavel Mintyukov' },
  { display: 'Drew Helleson' }, { display: 'Tyson Hinds' },
  { display: 'Ian Moore' }, { display: 'Jacob Trouba' },
  { display: 'Radko Gudas' }, { display: 'John Carlson' },
  { display: 'Olen Zellweger' }, { display: 'Nick Jensen' },
  { display: 'Tristan Luneau' }, { display: 'Lukas Dostal' },
  { display: 'Ville Husso' }, { display: 'Petr Mrazek' },
  { display: 'Laurent Brossoit' }, { display: 'Roger McQueen' },
  { display: 'Nikita Klepov' }, { display: 'Anton Wahlberg' },
  { display: 'Marcus Nordmark' },
  // Coaching staff
  { display: 'Joel Quenneville' }, { display: 'Tim Army' },
  { display: 'Jay Woodcroft' }, { display: 'Ryan McGill' },
  { display: 'Andrew Brewer' }, { display: 'Peter Budaj' },
]

const slugify = (name) =>
  name.toLowerCase().replace(/[.'’]/g, '').replace(/\s+/g, '-')

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// Only licenses that permit reuse. Attribution is still REQUIRED for every
// CC BY / CC BY-SA image — that's what photo-credits.json feeds.
const FREE = /^(cc0|cc by(-sa)?[ -]?\d|public domain|pd|no restrictions)/i

const get = async (url) => {
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  return res.ok ? res : null
}

// Find the person's Wikipedia page, preferring an ice-hockey disambiguation.
async function findPage(name) {
  const candidates = [
    `${name} (ice hockey)`,
    `${name} (ice hockey, born 2004)`,
    name,
  ]
  for (const title of candidates) {
    const res = await get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, '_'))}`,
    )
    if (!res) continue
    const data = await res.json()
    if (data.type === 'disambiguation') continue
    const blurb = `${data.description ?? ''} ${data.extract ?? ''}`.toLowerCase()
    // Guard against grabbing a same-named person from another field.
    if (!/hockey|nhl|winger|defenceman|defenseman|goaltender|centre|center/.test(blurb)) continue
    const image = (data.originalimage ?? data.thumbnail ?? {}).source
    if (!image) continue
    return { title: data.title, image: image.split('?')[0], page: data.content_urls?.desktop?.page }
  }
  return null
}

// Pull license + author for a Commons file. Returns null if not free.
async function licenseFor(imageUrl) {
  const file =
    'File:' +
    decodeURIComponent(imageUrl.split('/').pop().replace(/^\d+px-/, ''))
  const res = await get(
    `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(file)}&prop=imageinfo&iiprop=extmetadata|url&format=json`,
  )
  if (!res) return null
  const page = Object.values((await res.json()).query?.pages ?? {})[0]
  const meta = page?.imageinfo?.[0]?.extmetadata
  if (!meta) return null

  const text = (v) =>
    v ? String(v.value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : ''
  const license = text(meta.LicenseShortName)
  if (!FREE.test(license)) return { rejected: license || 'unknown' }

  return {
    file,
    author: text(meta.Artist) || 'Unknown',
    license,
    licenseUrl: text(meta.LicenseUrl),
    sourceUrl: `https://commons.wikimedia.org/wiki/${encodeURIComponent(file)}`,
  }
}

await mkdir(OUT_DIR, { recursive: true })
const credits = await readFile(CREDITS, 'utf8').then(JSON.parse).catch(() => ({}))

let ok = 0
for (const person of PEOPLE) {
  const name = person.search ?? person.display
  const slug = slugify(person.display)
  try {
    const found = await findPage(name)
    if (!found) {
      console.log(`  --    ${name} — no free photo (initials avatar)`)
      continue
    }
    const lic = await licenseFor(found.image)
    if (!lic) {
      console.log(`  --    ${name} — no license data (skipped)`)
      continue
    }
    if (lic.rejected) {
      console.log(`  SKIP  ${name} — non-free license: ${lic.rejected}`)
      continue
    }
    const img = await get(found.image)
    if (!img) {
      console.log(`  --    ${name} — download failed`)
      continue
    }
    const ext = (found.image.split('.').pop() ?? 'jpg').toLowerCase()
    const file = `${slug}.${['jpg', 'jpeg', 'png'].includes(ext) ? ext : 'jpg'}`
    await writeFile(path.join(OUT_DIR, file), Buffer.from(await img.arrayBuffer()))
    credits[slug] = {
      name: person.display,
      file,
      author: lic.author,
      license: lic.license,
      licenseUrl: lic.licenseUrl,
      sourceUrl: lic.sourceUrl,
      wikipedia: found.page,
    }
    ok++
    console.log(`  ok    ${name} — ${lic.license} by ${lic.author.slice(0, 40)}`)
    await sleep(400) // be polite to the Wikimedia API
  } catch (err) {
    console.log(`  --    ${name} (${err.message})`)
  }
}

await writeFile(CREDITS, JSON.stringify(credits, null, 2) + '\n')
console.log(`\n${ok}/${PEOPLE.length} freely-licensed photos -> public/headshots/`)
