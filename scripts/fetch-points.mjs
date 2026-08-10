// Refreshes src/data/points.json from the NHL public API, preserving the
// player IDs already recorded there. Run when a season's totals change.
//
// Usage: node scripts/fetch-points.mjs [season]
//   season defaults to 20252026

import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const SEASON = Number(process.argv[2] ?? 20252026)
const FILE = path.resolve('src/data/points.json')

const existing = JSON.parse(await readFile(FILE, 'utf8'))
const out = {}
let changed = 0

for (const [slug, rec] of Object.entries(existing)) {
  if (!rec.playerId) {
    out[slug] = rec
    continue
  }
  const res = await fetch(`https://api-web.nhle.com/v1/player/${rec.playerId}/landing`)
  if (!res.ok) {
    console.log(`  skip  ${slug} (HTTP ${res.status})`)
    out[slug] = rec
    continue
  }
  const landing = await res.json()
  // Players traded midseason have one row per team; sum them.
  const rows = (landing.seasonTotals ?? []).filter(
    (s) => s.season === SEASON && s.leagueAbbrev === 'NHL' && s.gameTypeId === 2,
  )
  if (!rows.length) {
    out[slug] = rec
    continue
  }
  const sum = (k) => rows.reduce((t, r) => t + (r[k] ?? 0), 0)
  const fresh = {
    playerId: rec.playerId,
    gp: sum('gamesPlayed'),
    goals: sum('goals'),
    assists: sum('assists'),
    points: sum('points'),
  }
  if (fresh.points !== rec.points || fresh.gp !== rec.gp) {
    console.log(`  UPDATED ${slug}: ${rec.points}P/${rec.gp}GP -> ${fresh.points}P/${fresh.gp}GP`)
    changed++
  }
  out[slug] = fresh
}

await writeFile(FILE, JSON.stringify(out, null, 2) + '\n')
console.log(changed ? `\n${changed} player(s) changed.` : '\nNo stat changes.')
