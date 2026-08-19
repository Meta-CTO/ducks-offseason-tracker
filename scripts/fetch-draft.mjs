// Writes every club's 2026 draft class from the official NHL API.
//
// This closes by script a gap the team-reset pages left open: the resets
// describe the summer's trades but almost never list a club's selections, so
// every club except Anaheim shipped with an empty draftClass. One request
// returns all 224 picks.
//
// Two things it deliberately drops: teamLogoLight/teamLogoDark, which are
// league logo SVGs this project does not use, and the amateur-club fields for
// clubs where they are blank.
//
// Output: src/data/draft/<ABBR>.json, imported by each club's editorial module.
//
// Usage: node scripts/fetch-draft.mjs [--year 2026]

import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const args = process.argv.slice(2)
const year = args.includes('--year') ? args[args.indexOf('--year') + 1] : '2026'
const OUT_DIR = path.resolve('src/data/draft')

const res = await fetch(`https://api-web.nhle.com/v1/draft/picks/${year}/all`)
if (!res.ok) {
  console.error(`Draft ${year} unavailable (HTTP ${res.status}); nothing written.`)
  process.exit(1)
}
const { picks = [] } = await res.json()
if (picks.length === 0) {
  console.error(`Draft ${year} returned no picks; nothing written.`)
  process.exit(1)
}

const name = (n) => (typeof n === 'string' ? n : (n?.default ?? ''))

const byTeam = new Map()
for (const p of picks) {
  const abbrev = name(p.teamAbbrev) || p.teamAbbrev
  if (!abbrev) continue
  if (!byTeam.has(abbrev)) byTeam.set(abbrev, [])
  byTeam.get(abbrev).push({
    rd: p.round,
    pick: p.overallPick,
    player: `${name(p.firstName)} ${name(p.lastName)}`.trim(),
    pos: p.positionCode ?? null,
    // Where they were playing when drafted — the one piece of context the API
    // offers that a reader cannot get from the name alone.
    from: [name(p.amateurClubName), p.amateurLeague].filter(Boolean).join(', ') || null,
  })
}

await mkdir(OUT_DIR, { recursive: true })

let total = 0
for (const [abbrev, list] of [...byTeam.entries()].sort()) {
  list.sort((a, b) => a.pick - b.pick)
  await writeFile(
    path.join(OUT_DIR, `${abbrev}.json`),
    `${JSON.stringify(list, null, 2)}\n`,
  )
  total += list.length
  console.log(`${abbrev}  ${list.length} pick(s)`)
}

console.log(`\n${total} picks across ${byTeam.size} clubs for the ${year} draft.`)
