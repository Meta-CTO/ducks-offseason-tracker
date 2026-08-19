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

import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

// Wikimedia asks for a descriptive User-Agent. Set CONTACT_EMAIL to your
// own address when running this yourself.
const CONTACT = process.env.CONTACT_EMAIL ?? 'https://github.com/Meta-CTO/ducks-offseason-tracker'
const UA = `ducks-offseason-tracker/1.0 (${CONTACT})`
const OUT_DIR = path.resolve('public/headshots')
const CREDITS = path.resolve('src/data/photo-credits.json')

// The people to look up are read from the editorial club modules rather than
// listed here, so a club added or edited later is picked up automatically.
// Names come from roster-comparison rows (before/after) and camp-watch
// entries — the places the UI actually renders an avatar.
//
// A photo belongs to a person, not a club: someone traded mid-summer appears
// on two clubs' pages and needs the same face on both. So credits stay in one
// global index keyed by slug, and each club module exports the subset it
// renders, which is what its attribution list must cover.
const EDITORIAL_DIR = path.resolve('src/data/editorial')

const peopleFromModules = async () => {
  const files = (await readdir(EDITORIAL_DIR)).filter((f) => /^[A-Z]{3}\.js$/.test(f))
  const names = new Set()
  for (const f of files) {
    const src = await readFile(path.join(EDITORIAL_DIR, f), 'utf8')
    for (const m of src.matchAll(/(?:before|after): '([^']+)'/g)) names.add(m[1])
    for (const m of src.matchAll(/\{ name: '([^']+)', pos:/g)) names.add(m[1])
  }
  // Coaches and executives are people too, but Wikimedia lookups for them
  // collide with unrelated articles far more often, and the UI does not render
  // an avatar for them. Skip anything that is not a player row.
  return [...names].sort().map((display) => ({ display }))
}

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

const PEOPLE = await peopleFromModules()
const force = process.argv.includes('--force')

// Wikimedia gets three requests per person, so a full sweep is a few thousand
// calls. Anyone already credited is skipped unless --force, which makes the
// run resumable after an interruption and cheap to re-run when a club changes.
const todo = force ? PEOPLE : PEOPLE.filter((p) => !credits[slugify(p.display)])
console.log(`${PEOPLE.length} people across all clubs; ${todo.length} to look up.\n`)

let ok = 0
let checked = 0
for (const person of todo) {
  const name = person.search ?? person.display
  const slug = slugify(person.display)
  if (++checked % 25 === 0) console.log(`  ... ${checked}/${todo.length}`)
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
  } catch (err) {
    console.log(`  --    ${name} (${err.message})`)
  }
  await sleep(300) // be polite to the Wikimedia API, hit or miss
}

await writeFile(CREDITS, JSON.stringify(credits, null, 2) + '\n')
console.log(
  `\n${ok} new freely-licensed photo(s); ` +
    `${Object.keys(credits).length}/${PEOPLE.length} people now have one.`,
)
