// Machine-checkable half of the update pass. Compares live NHL API data
// against what the site currently claims and prints only REAL differences.
//
// Design note: this deliberately does NOT diff the full NHL roster against the
// site. The site is editorial (notable players and coaches), not a roster
// mirror, so that comparison produces constant false positives from AHL depth
// and two-way contracts. Instead it checks the things that would actually
// constitute news:
//
//   1. Team changes for anyone the site covers (a trade or signing)
//   2. Stat totals differing from what the site shows
//   3. The specific open questions in the unresolved tracker
//
// Contracts, cap figures and injuries are NOT visible here; PuckPedia blocks
// scripted access, so the skill checks those through the browser.
//
// Usage: node scripts/check-updates.mjs [--json]

import { readFile } from 'node:fs/promises'
import path from 'node:path'

const asJson = process.argv.includes('--json')
const SEASON = 20252026

const read = async (p) => JSON.parse(await readFile(path.resolve(p), 'utf8'))
const get = async (url) => {
  try {
    const res = await fetch(url)
    return res.ok ? await res.json() : null
  } catch {
    return null
  }
}

const findings = []
const note = (kind, detail) => findings.push({ kind, detail })

const contracts = await read('src/data/contracts.json')
const points = await read('src/data/points.json')
const credits = await read('src/data/photo-credits.json')

// Where the site says each person currently plays. A contract entry with a
// `team` means the site shows them as departed to that club; otherwise the
// site is presenting them as a Duck.
const expectedTeam = (slug) => contracts[slug]?.team ?? 'ANA'

// ---- 1. team changes ----------------------------------------------------

for (const [slug, rec] of Object.entries(points)) {
  if (!rec.playerId) continue
  const landing = await get(`https://api-web.nhle.com/v1/player/${rec.playerId}/landing`)
  if (!landing) continue

  const actual = landing.currentTeamAbbrev
  const expected = expectedTeam(slug)
  const name = credits[slug]?.name ?? slug

  if (actual && actual !== expected) {
    note(
      'team-change',
      `${name}: site shows ${expected}, NHL API shows ${actual}. Possible trade or signing.`,
    )
  }

  // ---- 2. stat totals ---------------------------------------------------
  const rows = (landing.seasonTotals ?? []).filter(
    (s) => s.season === SEASON && s.leagueAbbrev === 'NHL' && s.gameTypeId === 2,
  )
  if (rows.length) {
    const sum = (k) => rows.reduce((t, r) => t + (r[k] ?? 0), 0)
    if (sum('points') !== rec.points || sum('gamesPlayed') !== rec.gp) {
      note(
        'stats-changed',
        `${name}: site has ${rec.points}P/${rec.gp}GP, API has ${sum('points')}P/${sum('gamesPlayed')}GP`,
      )
    }
  }
}

// ---- 3. the open questions ---------------------------------------------

// Gauthier signing is the headline unresolved item. If he appears with a
// current NHL contract / roster spot, that is real news.
const gauthier = points['cutter-gauthier']?.playerId
if (gauthier) {
  const landing = await get(`https://api-web.nhle.com/v1/player/${gauthier}/landing`)
  const stillUnsigned = contracts['cutter-gauthier']?.note === 'Unsigned RFA'
  if (landing && stillUnsigned) {
    // The API does not expose contract status directly; sweaterNumber plus an
    // active roster listing is a weak signal worth a manual check.
    const roster = await get('https://api-web.nhle.com/v1/roster/ANA/current')
    const onRoster = roster
      ? [...(roster.forwards ?? []), ...(roster.defensemen ?? []), ...(roster.goalies ?? [])]
          .some((p) => String(p.id) === String(gauthier))
      : false
    if (onRoster) {
      note(
        'check-manually',
        'Cutter Gauthier appears on the current ANA roster while the site still lists him as an unsigned RFA. Verify his contract status on PuckPedia.',
      )
    }
  }
}

// Anyone the site marks injured is worth re-checking each pass.
const ducksSrc = await readFile(path.resolve('src/data/editorial/ANA.js'), 'utf8')
const injured = [...ducksSrc.matchAll(/'([^']+)',\s*after:\s*'[^']+',\s*status:\s*'injured'/g)]
for (const m of injured) {
  note('check-manually', `${m[1]} is marked injured; confirm status on PuckPedia's injury table.`)
}

// ---- output -------------------------------------------------------------

const real = findings.filter((f) => f.kind !== 'check-manually')

if (asJson) {
  console.log(JSON.stringify({ checked: new Date().toISOString(), findings }, null, 2))
} else if (!findings.length) {
  console.log('NO CHANGES DETECTED')
} else {
  if (real.length) {
    console.log(`${real.length} data difference(s) found:\n`)
    for (const f of real) console.log(`  [${f.kind}] ${f.detail}`)
  } else {
    console.log('No data differences found in NHL API sources.')
  }
  const manual = findings.filter((f) => f.kind === 'check-manually')
  if (manual.length) {
    console.log(`\n${manual.length} item(s) to confirm manually:\n`)
    for (const f of manual) console.log(`  - ${f.detail}`)
  }
  console.log('\nVerify against a primary source before editing any data file.')
}
