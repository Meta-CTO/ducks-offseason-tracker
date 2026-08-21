// Content QA sweep across all 32 clubs.
//
// check-editorial.mjs validates *shape* — that a module exports what the
// components read. This checks whether what it exports is any good: coverage
// against the real roster, names that will silently fail a lookup, and the
// handover rows that once rendered an outgoing coach wearing an "Added" chip.
//
// It cannot check facts. Everything here is a signal to go read a source.
//
// Usage: node scripts/qa-sweep.mjs [--club ABBR] [--json]

import { register } from 'node:module'
import { pathToFileURL } from 'node:url'
import { readFile, writeFile, readdir } from 'node:fs/promises'
import path from 'node:path'

// The club modules use extensionless imports and bare .json imports, which Vite
// resolves and plain node does not. Register a resolver so this script can load
// the real modules instead of regex-scraping them, which is what produced a
// wrong row count the first time.
const resolver = `
import { existsSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'
export async function resolve(spec, ctx, next) {
  if (spec.startsWith('.') && ctx.parentURL) {
    const base = path.dirname(fileURLToPath(ctx.parentURL))
    const abs = path.resolve(base, spec)
    for (const cand of [abs, abs + '.js', abs + '.json', path.join(abs, 'index.js')]) {
      if (!existsSync(cand)) continue
      if (cand === abs && !path.extname(cand)) continue
      const url = pathToFileURL(cand).href
      if (cand.endsWith('.json')) return { url, format: 'json', importAttributes: { type: 'json' }, shortCircuit: true }
      return { url, shortCircuit: true }
    }
  }
  return next(spec, ctx)
}`
await writeFile(new URL('./.qa-resolver.mjs', import.meta.url), resolver)
register('./.qa-resolver.mjs', import.meta.url)

const args = process.argv.slice(2)
const asJson = args.includes('--json')
const only = args.includes('--club') ? args[args.indexOf('--club') + 1]?.toUpperCase() : null

// "Stützle" and "Stutzle", "O’Reilly" and "O'Reilly" are the same person. Not
// folding these produced nine false "not on roster" hits on the first run.
const norm = (s) =>
  s.normalize('NFD').replace(/\p{M}/gu, '').replace(/['’`]/g, '').toLowerCase().trim()


const registry = await readFile('src/data/editorial/index.js', 'utf8')
const clubs = [...registry.matchAll(/^\s{2}([A-Z]{3}):/gm)].map((m) => m[1])
const targets = only ? clubs.filter((c) => c === only) : clubs

const updates = JSON.parse(await readFile('src/data/updates.json', 'utf8'))
const issues = []
const verified = []
const confirmedHC = new Set()
const haveCoach = new Set(
  (await readdir('src/data/coaches').catch(() => [])).map((f) => f.replace('.json', '')),
)
const add = (club, severity, kind, detail) => issues.push({ club, severity, kind, detail })

// Roles that are staff, not skaters — they will never be on an NHL roster feed.
const STAFF = /coach|manager|president|captain|gm\b|hc\b|ac\b|gc\b|advisor|operations/i

// NHL player search, used only for names the roster feed does not have. Cached
// so a club with several depth signings costs one request each, not repeats.
const UA = 'ducks-offseason-tracker/1.0 (personal hockey site)'
const searchCache = new Map()
const searchPlayer = async (name) => {
  const key = norm(name)
  if (searchCache.has(key)) return searchCache.get(key)
  // The endpoint does not always match a full hyphenated name — querying
  // "Axel Sandin-Pellikka" returns nothing while "Sandin" returns him — so fall
  // back to the last name before concluding a player does not exist.
  const plain = name.replace(/’/g, "'")
  let out = null
  for (const term of [plain, plain.split(/[\s-]+/).slice(-1)[0], plain.split(/\s+/).slice(-1)[0]]) {
    if (!term || out) continue
    const url = `https://search.d3.nhle.com/api/v1/search/player?culture=en-us&limit=20&q=${encodeURIComponent(term)}`
    const res = await fetch(url, { headers: { 'user-agent': UA } }).catch(() => null)
    if (!res?.ok) continue
    const list = await res.json().catch(() => [])
    const hit = list.find((p) => norm(p.name) === key)
    if (hit) out = { team: hit.teamAbbrev ?? null, last: hit.lastTeamAbbrev ?? null }
    await new Promise((r) => setTimeout(r, 200))
  }
  searchCache.set(key, out)
  await new Promise((r) => setTimeout(r, 250))
  return out
}

for (const club of targets) {
  const m = await import(pathToFileURL(path.resolve(`src/data/editorial/${club}.js`)).href)
  const league = JSON.parse(await readFile(`src/data/league/${club}.json`, 'utf8'))
  const leaguePlayers = [...league.forwards, ...league.defensemen, ...league.goalies]
  const rawNames = leaguePlayers.map((p) => p.name)
  const leagueNames = new Set(rawNames.map(norm))
  const leagueSurnames = new Set(rawNames.map((n) => norm(n.split(' ').slice(-1)[0])))
  // Coverage counts only players with games for the club. The league file is the
  // current roster with 2025-26 club stats attached where they exist, so an entry
  // with no games is someone who did not play here last season — an arrival or a
  // prospect. Nothing about them can be asserted from the API, so they are not
  // rows the site is missing; counting them made Anaheim read as 64% covered
  // while every player it can speak about had a row.
  const played = leaguePlayers.filter((p) => p.stats?.gp > 0).map((p) => norm(p.name))
  const rosterSize = played.length
  const unplayed = leaguePlayers.length - rosterSize

  const groups = m.rosterComparison ?? []
  const allRows = groups.flatMap((g) => g.rows.map((r) => ({ ...r, group: g.group })))
  const playerRows = allRows.filter((r) => !STAFF.test(r.pos ?? ''))
  const subject = (r) => (r.status === 'added' ? (r.after ?? r.before) : (r.before ?? r.after))

  // 1. Coverage against the actual roster.
  const covered = new Set(playerRows.map((r) => subject(r)).filter(Boolean))
  const coveredNorm = new Set([...covered].map(norm))
  // Coverage is the overlap with the roster, not the row count: a club can have
  // plenty of rows and still miss most of its roster if many describe players
  // who left. Comparing row count to roster size overstated Calgary at 41%.
  const overlap = played.filter((n) => coveredNorm.has(n)).length
  const pct = rosterSize ? Math.round((overlap / rosterSize) * 100) : 0
  if (pct < 90) {
    add(club, pct < 70 ? 'high' : 'medium', 'thin-coverage',
      `${overlap} of ${rosterSize} players with games for the club have a row (${pct}%)`)
  }
  if (unplayed > 0) {
    add(club, 'low', 'unresearched-arrivals',
      `${unplayed} roster entr${unplayed === 1 ? 'y has' : 'ies have'} no games for the club — arrivals or prospects needing a source`)
  }

  // 2. Coaching section, and whether what it says matches the source.
  const coaching = groups.find((g) => g.group === 'Coaching')
  if (!coaching) {
    add(club, 'medium', 'no-coaching', 'no Coaching group, so the club shows no staff at all')
  } else if (haveCoach.has(club)) {
    const hr = JSON.parse(await readFile(`src/data/coaches/${club}.json`, 'utf8'))
    const hcRow = coaching.rows.find((r) => /head coach/i.test(r.pos ?? ''))
    const stated = hcRow ? subject(hcRow) : null
    if (stated && hr.coach && norm(stated) !== norm(hr.coach)) {
      add(club, 'high', 'coach-disagrees',
        `module says the head coach is '${stated}', Hockey-Reference says '${hr.coach}'`)
    } else if (stated && hr.coach) {
      verified.push(`${club}: head coach '${stated}' confirmed against Hockey-Reference`)
      confirmedHC.add(club)
    }
  }

  // 3. Handover rows: both names present, chip describes only one of them.
  for (const r of allRows) {
    if (r.before && r.after && r.before !== r.after && r.after !== 'TBD' && r.status === 'added') {
      // Already cross-checked against Hockey-Reference above; no need to ask for
      // a source twice.
      if (/head coach/i.test(r.pos ?? '') && confirmedHC.has(club)) continue
      // The render bug these exposed is fixed; what is left is that a handover
      // asserts two things at once — one person out, another in — and both
      // halves need a source. Listed so they can be re-read, not as a defect.
      add(club, 'medium', 'handover-verify',
        `${r.pos}: ${r.before} → ${r.after}. Both halves need a primary source.`)
    }
  }

  // 4. A player row whose name the league file does not know.
  //
  // Absence from the roster feed is NOT by itself an error: the feed carries the
  // NHL roster only, so AHL depth and LTIR players are legitimately missing.
  // Seven of the eight names this first flagged turned out to be correct. So
  // anyone unmatched is put to the player-search endpoint, which reports a
  // current club — that is what separates "not in the 23-man feed" from a row
  // attributing someone to the wrong team.
  for (const r of playerRows) {
    const n = subject(r)
    if (!n) continue
    const nn = norm(n)
    if (leagueNames.has(nn) || leagueSurnames.has(nn) || leagueSurnames.has(norm(n.split(' ').slice(-1)[0]))) continue
    if (r.status === 'departed' || r.status === 'unsigned') continue   // expected to be gone

    const found = await searchPlayer(n)
    if (!found) {
      add(club, 'medium', 'player-not-found',
        `${r.pos} '${n}' (${r.status}) is on no roster feed and NHL player search does not know the name`)
    } else if (found.team && found.team !== club) {
      add(club, 'high', 'wrong-club',
        `${r.pos} '${n}' is listed here but NHL player search puts them on ${found.team}`)
    } else if (!found.team) {
      add(club, 'medium', 'no-current-club',
        `${r.pos} '${n}' (${r.status}) has no current NHL club (last: ${found.last ?? '—'})`)
    }
    // team === club: correct, just outside the 23-man feed. Not an issue.
  }

  // 5. Duplicate rows for the same person.
  // playerRows, not allRows: a person can legitimately hold a role as well as a
  // lineup spot. Anaheim lists Gudas as a departed defenceman and again on the
  // captaincy row he vacated, which is two facts, not a duplicate.
  const seen = new Map()
  for (const r of playerRows) {
    const n = subject(r)
    if (!n) continue
    if (seen.has(n)) add(club, 'medium', 'duplicate-row', `'${n}' appears in ${seen.get(n)} and ${r.group}`)
    else seen.set(n, r.group)
  }

  // 6. Rumor chips that can never render.
  for (const r of m.rumors ?? []) {
    if (r.player && !coveredNorm.has(norm(r.player))) {
      add(club, 'medium', 'orphan-rumor',
        `rumor names '${r.player}', which matches no roster row, so no chip appears`)
    }
  }

  // 7. Cap rows whose name will not match a roster row (loses the photo).
  for (const h of m.cap?.capHits ?? []) {
    if (coveredNorm.has(norm(h.name))) continue
    const sur = norm(h.name.split(' ').slice(-1)[0])
    const clashes = [...covered].filter((n) => norm(n.split(' ').slice(-1)[0]) === sur)
    // Two players can share a surname, in which case a differing cap name is the
    // thing telling them apart, not a typo. Vancouver rosters two Elias
    // Petterssons — a forward at $11.6M and a defenceman at $913K — and
    // "correcting" the cap row to match would merge them.
    if (clashes.length === 1) {
      add(club, 'low', 'cap-name-mismatch', `cap says '${h.name}', roster says '${clashes[0]}'`)
    }
  }

  // 8. draftClass present.
  if (!(m.draftClass ?? []).length) add(club, 'medium', 'no-draft-class', 'draftClass is empty')

  // 9. LAST_UPDATED.
  if (!m.LAST_UPDATED) add(club, 'medium', 'no-last-updated', 'LAST_UPDATED missing')
}

// 10. Badge entries that match no rendered string anywhere.
const allText = (await Promise.all(targets.map((c) =>
  readFile(`src/data/editorial/${c}.js`, 'utf8')))).join('\n')
for (const e of updates.entries ?? []) {
  const needle = e.text.replace(/’/g, '’')
  if (!allText.includes(needle.slice(0, 40))) {
    add('—', 'medium', 'orphan-badge', `updates.json entry matches no bullet: "${e.text.slice(0, 60)}…"`)
  }
}

if (asJson) {
  console.log(JSON.stringify(issues, null, 2))
  process.exit(0)
}

const RANK = { high: 0, medium: 1, low: 2 }
issues.sort((a, b) => RANK[a.severity] - RANK[b.severity] || a.club.localeCompare(b.club))
const byKind = {}
for (const i of issues) (byKind[`${i.severity}|${i.kind}`] ??= []).push(i)

const counts = issues.reduce((a, i) => ({ ...a, [i.severity]: (a[i.severity] ?? 0) + 1 }), {})
console.log(`QA sweep over ${targets.length} club(s): ${issues.length} issue(s) ` +
  `(${counts.high ?? 0} high, ${counts.medium ?? 0} medium, ${counts.low ?? 0} low)\n`)
if (verified.length) {
  console.log(`VERIFIED  (${verified.length})`)
  for (const v of verified) console.log(`    ${v}`)
  console.log()
}
for (const [key, list] of Object.entries(byKind).sort(
  (a, b) => RANK[a[1][0].severity] - RANK[b[1][0].severity] || b[1].length - a[1].length)) {
  const [sev, kind] = key.split('|')
  console.log(`${sev.toUpperCase()}  ${kind}  (${list.length})`)
  for (const i of list.slice(0, 12)) console.log(`    [${i.club}] ${i.detail}`)
  if (list.length > 12) console.log(`    … and ${list.length - 12} more (--json for all)`)
  console.log()
}
