// Builds the league-wide data layer from the official NHL API: a team registry
// plus one roster/stats file per club.
//
// What this deliberately does NOT do:
//
//   * Store headshot URLs. The API hands back assets.nhle.com mug shots on
//     every player record. Those are league photography, which this project
//     does not use (see CONTRIBUTING.md); they are stripped on the way in so a
//     later component cannot accidentally render one.
//   * Fetch contracts or cap figures. The API has none, and PuckPedia's
//     robots.txt names ClaudeBot and anthropic-ai in its disallow list, so
//     cap data is not scraped here.
//   * Invent editorial content. Roster bullets, camp battles and unresolved
//     items are written from a sourced brief, never generated from stats.
//
// Usage: node scripts/fetch-league.mjs [--team ABBR] [--quiet]

import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const args = process.argv.slice(2)
const only = args.includes('--team') ? args[args.indexOf('--team') + 1] : null
const quiet = args.includes('--quiet')
const log = (...a) => !quiet && console.log(...a)

const OUT_DIR = path.resolve('src/data/league')
const REGISTRY = path.resolve('src/data/teams.json')

// Primary/secondary club colors. These are factual identity colors used for
// tinting the picker and page chrome; no logos, wordmarks or crests are used
// anywhere in this project.
const COLORS = {
  ANA: ['#F47A38', '#B9975B'], BOS: ['#FFB81C', '#000000'],
  BUF: ['#003087', '#FFB81C'], CAR: ['#CC0000', '#000000'],
  CBJ: ['#002654', '#CE1126'], CGY: ['#D2001C', '#FAAF19'],
  CHI: ['#CF0A2C', '#000000'], COL: ['#6F263D', '#236192'],
  DAL: ['#006847', '#8F8F8C'], DET: ['#CE1126', '#7F7F7F'],
  EDM: ['#FF4C00', '#041E42'], FLA: ['#C8102E', '#041E42'],
  LAK: ['#111111', '#A2AAAD'], MIN: ['#154734', '#A6192E'],
  MTL: ['#AF1E2D', '#192168'], NJD: ['#CE1126', '#000000'],
  NSH: ['#FFB81C', '#041E42'], NYI: ['#00539B', '#F47D30'],
  NYR: ['#0038A8', '#CE1126'], OTT: ['#C52032', '#000000'],
  PHI: ['#F74902', '#000000'], PIT: ['#FCB514', '#000000'],
  SEA: ['#001628', '#99D9D9'], SJS: ['#006D75', '#EA7200'],
  STL: ['#002F87', '#FCB514'], TBL: ['#002868', '#4F5B66'],
  TOR: ['#00205B', '#4F6BAF'], UTA: ['#71AFE5', '#090909'],
  VAN: ['#00205B', '#00843D'], VGK: ['#B4975A', '#333F42'],
  WPG: ['#041E42', '#004C97'], WSH: ['#C8102E', '#041E42'],
}

const FALLBACK_COLORS = ['#4F5B66', '#8F8F8C']

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// The API rate-limits a full-league sweep hard: firing requests as fast as
// Promise.all allows gets 429s from roughly the 12th team onward. So requests
// are serialised, paced, and 429s are retried honouring Retry-After.
const PACE_MS = 120

const get = async (url, tries = 5) => {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url)
      if (res.ok) return await res.json()
      // 404 is a real answer (no such resource); retrying will not help.
      if (res.status === 404) return null
      if (res.status === 429) {
        const after = Number(res.headers.get('retry-after')) || 1
        await sleep(after * 1000 * (i + 1))
        continue
      }
    } catch {
      /* network blip: fall through to retry */
    }
    await sleep(500 * 2 ** i)
  }
  return null
}

/** URL-safe team slug: "Montréal Canadiens" -> "montreal-canadiens". */
const slugify = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const name = (n) => (typeof n === 'string' ? n : (n?.default ?? ''))

/** Strip everything we neither use nor are willing to host. */
const skater = (p) => ({
  id: p.playerId,
  name: `${name(p.firstName)} ${name(p.lastName)}`.trim(),
  pos: p.positionCode,
  gp: p.gamesPlayed ?? 0,
  g: p.goals ?? 0,
  a: p.assists ?? 0,
  p: p.points ?? 0,
  plusMinus: p.plusMinus ?? 0,
  toi: p.avgTimeOnIcePerGame ?? null,
})

const goalie = (p) => ({
  id: p.playerId,
  name: `${name(p.firstName)} ${name(p.lastName)}`.trim(),
  pos: 'G',
  gp: p.gamesPlayed ?? 0,
  w: p.wins ?? 0,
  l: p.losses ?? 0,
  otl: p.overtimeLosses ?? 0,
  gaa: p.goalsAgainstAverage ?? null,
  svPct: p.savePercentage ?? null,
  so: p.shutouts ?? 0,
})

/** Roster entry, which carries bio the stats feed does not. */
const rosterEntry = (p) => ({
  id: p.id,
  name: `${name(p.firstName)} ${name(p.lastName)}`.trim(),
  pos: p.positionCode,
  number: p.sweaterNumber ?? null,
  shoots: p.shootsCatches ?? null,
  height: p.heightInInches ?? null,
  weight: p.weightInPounds ?? null,
  birthDate: p.birthDate ?? null,
  birthCountry: p.birthCountry ?? null,
})

const standings = await get('https://api-web.nhle.com/v1/standings/now')
if (!standings?.standings?.length) {
  console.error('Could not read league standings; aborting without writing.')
  process.exit(1)
}

const teams = standings.standings
  .map((s) => {
    const abbrev = s.teamAbbrev.default
    const full = name(s.teamName)
    return {
      abbrev,
      name: full,
      common: name(s.teamCommonName) || full,
      slug: slugify(full),
      conference: s.conferenceName,
      division: s.divisionName,
      colors: COLORS[abbrev] ?? FALLBACK_COLORS,
      record: {
        wins: s.wins ?? 0,
        losses: s.losses ?? 0,
        otLosses: s.otLosses ?? 0,
        points: s.points ?? 0,
        divisionSequence: s.divisionSequence ?? null,
      },
    }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

const missingColor = teams.filter((t) => !COLORS[t.abbrev]).map((t) => t.abbrev)
if (missingColor.length) {
  console.warn(`No color entry for: ${missingColor.join(', ')} (using fallback)`)
}

await mkdir(OUT_DIR, { recursive: true })

const targets = only ? teams.filter((t) => t.abbrev === only) : teams
if (only && targets.length === 0) {
  console.error(`Unknown team code: ${only}`)
  process.exit(1)
}

let failures = 0

for (const team of targets) {
  const roster = await get(`https://api-web.nhle.com/v1/roster/${team.abbrev}/current`)
  await sleep(PACE_MS)
  const stats = await get(`https://api-web.nhle.com/v1/club-stats/${team.abbrev}/now`)
  await sleep(PACE_MS)

  if (!roster) {
    console.error(`${team.abbrev}: roster unavailable, leaving existing file alone`)
    failures++
    continue
  }

  const statsById = new Map()
  for (const s of stats?.skaters ?? []) statsById.set(s.playerId, skater(s))
  for (const s of stats?.goalies ?? []) statsById.set(s.playerId, goalie(s))

  const withStats = (list) =>
    list.map((p) => ({ ...rosterEntry(p), stats: statsById.get(p.id) ?? null }))

  const payload = {
    abbrev: team.abbrev,
    name: team.name,
    season: stats?.season ?? null,
    forwards: withStats(roster.forwards ?? []),
    defensemen: withStats(roster.defensemen ?? []),
    goalies: withStats(roster.goalies ?? []),
  }

  await writeFile(
    path.join(OUT_DIR, `${team.abbrev}.json`),
    `${JSON.stringify(payload, null, 2)}\n`,
  )
  log(
    `${team.abbrev}  ${payload.forwards.length}F ${payload.defensemen.length}D ` +
      `${payload.goalies.length}G`,
  )
}

if (!only) {
  await writeFile(REGISTRY, `${JSON.stringify(teams, null, 2)}\n`)
  log(`\nWrote ${teams.length} teams to src/data/teams.json`)
}

if (failures) {
  console.error(`\n${failures} team(s) failed; their files were not overwritten.`)
  process.exit(1)
}
