// Machine-checkable half of an update pass, across all 32 clubs.
//
// Design note: this deliberately does NOT diff the full NHL roster against the
// site. Each club's page is editorial — the players whose situation changed,
// not a roster mirror — so a full diff produces constant false positives from
// AHL depth and two-way contracts. Instead it checks the things that would
// actually constitute news:
//
//   1. Roster movement since the league files were last scraped. The scraped
//      file is a snapshot; if the live API disagrees, someone arrived or left.
//   2. A player the site marks `unsigned` who now appears on the club's roster.
//      That is the single highest-value signal in an offseason.
//   3. A player the site still places on a club the API no longer has them on.
//   4. Anyone marked `injured`, which always needs a human recheck.
//
// Contracts, cap figures and injuries are NOT visible here; PuckPedia blocks
// scripted access, so the skill checks those through the browser.
//
// Usage: node scripts/check-updates.mjs [--team ABBR] [--json]

import { readFile } from 'node:fs/promises'
import path from 'node:path'

const args = process.argv.slice(2)
const asJson = args.includes('--json')
const only = args.includes('--team') ? args[args.indexOf('--team') + 1]?.toUpperCase() : null

const EDITORIAL = path.resolve('src/data/editorial')
const LEAGUE = path.resolve('src/data/league')

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const get = async (url, tries = 4) => {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url)
      if (res.ok) return await res.json()
      if (res.status === 404) return null
      if (res.status === 429) {
        await sleep((Number(res.headers.get('retry-after')) || 1) * 1000 * (i + 1))
        continue
      }
    } catch {
      /* transient; retry */
    }
    await sleep(400 * 2 ** i)
  }
  return null
}

const findings = []
const note = (club, kind, detail) => findings.push({ club, kind, detail })

const registry = await readFile(path.join(EDITORIAL, 'index.js'), 'utf8')
const clubs = [...registry.matchAll(/^\s{2}([A-Z]{3}):/gm)].map((m) => m[1])
const targets = only ? clubs.filter((c) => c === only) : clubs

if (only && targets.length === 0) {
  console.error(`Unknown or unregistered club: ${only}`)
  process.exit(1)
}

const name = (p) => `${p.firstName?.default ?? ''} ${p.lastName?.default ?? ''}`.trim()

for (const club of targets) {
  const src = await readFile(path.join(EDITORIAL, `${club}.js`), 'utf8')

  // Coaching rows are people too, but they are never on a player roster, so
  // comparing them against the API produces a wall of false positives. Cut the
  // Coaching group out before reading any names.
  const coachIdx = src.indexOf("group: 'Coaching'")
  const playerSrc = coachIdx === -1
    ? src
    : src.slice(0, coachIdx) + src.slice(src.indexOf('\n  },', coachIdx))

  // Names the site places on this club right now: an `after` value means the
  // player is on the post-change roster. `before`-only means they left.
  const onSite = new Set()
  for (const m of playerSrc.matchAll(/after: '([^']+)'/g)) onSite.add(m[1])

  const unsigned = [...playerSrc.matchAll(/(?:before|after): '([^']+)',\s*status: 'unsigned'/g)]
    .map((m) => m[1])
  const injured = [...playerSrc.matchAll(/(?:before|after): '([^']+)',\s*status: 'injured'/g)]
    .map((m) => m[1])

  const live = await get(`https://api-web.nhle.com/v1/roster/${club}/current`)
  await sleep(120)
  if (!live) {
    note(club, 'unavailable', 'roster endpoint did not respond; skipped')
    continue
  }
  const livePlayers = [...(live.forwards ?? []), ...(live.defensemen ?? []), ...(live.goalies ?? [])]
  const liveNames = new Set(livePlayers.map(name))
  // Some site rows use a surname alone ("Washe", "Colangelo") where the API
  // gives a full name, so fall back to a surname match before reporting anyone
  // as missing.
  const liveSurnames = new Set(livePlayers.map((p) => p.lastName?.default ?? ''))
  const onLiveRoster = (n) =>
    liveNames.has(n) || liveSurnames.has(n) || liveSurnames.has(n.split(' ').slice(-1)[0])

  // 1. Has the club's roster moved since the league file was scraped?
  const scraped = await readFile(path.join(LEAGUE, `${club}.json`), 'utf8')
    .then(JSON.parse)
    .catch(() => null)
  if (scraped) {
    const was = new Set(
      [...scraped.forwards, ...scraped.defensemen, ...scraped.goalies].map((p) => p.name),
    )
    const arrived = [...liveNames].filter((n) => !was.has(n))
    const left = [...was].filter((n) => !liveNames.has(n))
    if (arrived.length) note(club, 'roster-in', `now on the roster: ${arrived.join(', ')}`)
    if (left.length) note(club, 'roster-out', `no longer on the roster: ${left.join(', ')}`)
  }

  // 2. An unsigned player who now appears on the roster is likely signed.
  for (const player of unsigned) {
    if (onLiveRoster(player)) {
      note(
        club,
        'likely-signed',
        `${player} is marked unsigned but appears on the current ${club} roster. Confirm on PuckPedia.`,
      )
    }
  }

  // 3. Someone the site still shows on this club that the API does not.
  for (const player of onSite) {
    if (!onLiveRoster(player) && !unsigned.includes(player)) {
      note(club, 'check-manually', `${player} is shown on ${club} but is not on its current roster.`)
    }
  }

  // 4. Injuries always need a human.
  for (const player of injured) {
    note(club, 'check-manually', `${player} is marked injured; confirm on PuckPedia's injury table.`)
  }
}

if (asJson) {
  console.log(JSON.stringify(findings, null, 2))
  process.exit(0)
}

const real = findings.filter((f) => !['check-manually', 'unavailable'].includes(f.kind))
const manual = findings.filter((f) => f.kind === 'check-manually')
const broken = findings.filter((f) => f.kind === 'unavailable')

if (real.length === 0) {
  console.log(`No data differences found across ${targets.length} club(s).`)
} else {
  console.log(`${real.length} difference(s) worth investigating:\n`)
  for (const f of real) console.log(`  [${f.club}] ${f.kind}: ${f.detail}`)
}

if (manual.length) {
  console.log(`\n${manual.length} item(s) to confirm by hand:\n`)
  for (const f of manual) console.log(`  [${f.club}] ${f.detail}`)
}
if (broken.length) {
  console.log(`\n${broken.length} club(s) could not be checked:\n`)
  for (const f of broken) console.log(`  [${f.club}] ${f.detail}`)
}

console.log('\nVerify against a primary source before editing any data file.')
