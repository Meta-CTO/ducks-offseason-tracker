// Adds rows for rostered players a club module does not yet mention.
//
// Coverage sat near 50% on most clubs — Calgary listed 6 forwards against a
// 29-man file — which reads as missing data rather than curation.
//
// What makes a backfilled row safe to assert: the player appears BOTH in the
// club's 2025-26 stats file AND on its current roster feed. Both halves are the
// NHL API, so "played here last season, on the roster now" is sourced, and
// `retained` is the accurate status. Anyone in only one of the two is skipped
// and reported:
//   * stats file only  -> they left; asserting a departure needs a source
//   * roster feed only -> arrived or promoted; which one needs research
//
// No narrative is invented. The note states the two sourced facts and nothing
// else, and each touched group gets one provenance sentence so a reader can see
// which rows are researched and which are roster-feed depth.
//
// Usage: node scripts/backfill-roster.mjs [--club ABBR] [--dry-run]

import { readFile, writeFile } from 'node:fs/promises'

const args = process.argv.slice(2)
const dry = args.includes('--dry-run')
const only = args.includes('--club') ? args[args.indexOf('--club') + 1]?.toUpperCase() : null

const PROVENANCE =
  'depth rows are from the roster feed and 2025–26 club stats, not individually researched'

const norm = (s) =>
  s.normalize('NFD').replace(/\p{M}/gu, '').replace(/['’`]/g, '').toLowerCase().trim()

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const get = async (url, tries = 4) => {
  for (let i = 0; i < tries; i++) {
    const res = await fetch(url, { redirect: 'follow' }).catch(() => null)
    if (res?.ok) return res.json()
    if (res?.status === 429) await sleep((Number(res.headers.get('retry-after')) || 1) * 1000 * (i + 1))
    else await sleep(400 * 2 ** i)
  }
  return null
}

// Insert before the closing bracket of the `rows: [ ... ]` that follows a group.
const insertRows = (src, groupName, block) => {
  const g = src.indexOf(`group: '${groupName}'`)
  if (g === -1) return null
  const rowsAt = src.indexOf('rows: [', g)
  if (rowsAt === -1) return null
  let depth = 0
  for (let i = src.indexOf('[', rowsAt); i < src.length; i++) {
    if (src[i] === '[') depth++
    else if (src[i] === ']') {
      depth--
      if (depth === 0) {
        return src.slice(0, i) + block + '    ' + src.slice(i)
      }
    }
  }
  return null
}

const addProvenance = (src, groupName) => {
  const g = src.indexOf(`group: '${groupName}'`)
  const m = /summary: '((?:[^'\\]|\\.)*)'/.exec(src.slice(g))
  if (!m || m[1].includes('roster feed')) return src
  const at = g + m.index
  return src.slice(0, at) + `summary: '${m[1]} — ${PROVENANCE}'` + src.slice(at + m[0].length)
}

const registry = await readFile('src/data/editorial/index.js', 'utf8')
const clubs = [...registry.matchAll(/^\s{2}([A-Z]{3}):/gm)].map((m) => m[1])
const targets = only ? clubs.filter((c) => c === only) : clubs

const GROUP_OF = { forwards: 'Offense', defensemen: 'Defense', goalies: 'Goaltending' }
const summary = []

for (const club of targets) {
  const file = `src/data/editorial/${club}.js`
  let src = await readFile(file, 'utf8')
  const league = JSON.parse(await readFile(`src/data/league/${club}.json`, 'utf8'))

  const live = await get(`https://api-web.nhle.com/v1/roster/${club}/current`)
  await sleep(150)
  if (!live) { summary.push({ club, skipped: 'roster feed did not respond' }); continue }
  const onRoster = new Set(
    [...live.forwards, ...live.defensemen, ...live.goalies]
      .map((p) => norm(`${p.firstName?.default ?? ''} ${p.lastName?.default ?? ''}`)),
  )

  const existing = new Set(
    [...src.matchAll(/(?:before|after): '((?:[^'\\]|\\.)*)'/g)].map((m) => norm(m[1])),
  )

  let added = 0, leftOut = 0, unresearched = 0
  for (const [key, groupName] of Object.entries(GROUP_OF)) {
    const missing = (league[key] ?? []).filter((p) => {
      const n = norm(p.name)
      if (existing.has(n)) return false
      if (!onRoster.has(n)) { leftOut++; return false }   // in stats, not on roster => departed
      return true
    })
    if (!missing.length) continue

    const rows = missing.map((p) => {
      const gp = p.stats?.gp
      const note = gp
        ? `Played ${gp} game${gp === 1 ? '' : 's'} for the club in 2025–26 and is on the current roster`
        : 'On the current roster; no 2025–26 games for the club'
      const name = p.name.replace(/'/g, "\\'")
      return `      {\n        pos: '${p.pos}', before: '${name}', after: '${name}', status: 'retained',\n` +
             `        notes: [\n          '${note.replace(/'/g, "\\'")}',\n        ],\n      },\n`
    }).join('')

    const next = insertRows(src, groupName, rows)
    if (!next) { console.error(`  ${club}: could not find rows[] for ${groupName}`); continue }
    src = addProvenance(next, groupName)
    added += missing.length
  }

  // Roster-feed players with no 2025-26 club stats: arrived or promoted.
  const leagueNames = new Set([...league.forwards, ...league.defensemen, ...league.goalies].map((p) => norm(p.name)))
  for (const n of onRoster) if (!leagueNames.has(n) && !existing.has(n)) unresearched++

  if (added && !dry) await writeFile(file, src)
  summary.push({ club, added, leftOut, unresearched })
}

const w = (s, n) => String(s).padEnd(n)
console.log(`${w('club', 6)}${w('added', 7)}${w('departed?', 11)}new-to-club?`)
let total = 0
for (const r of summary) {
  if (r.skipped) { console.log(`${w(r.club, 6)}${r.skipped}`); continue }
  total += r.added
  console.log(`${w(r.club, 6)}${w(r.added, 7)}${w(r.leftOut, 11)}${r.unresearched}`)
}
console.log(`\n${dry ? 'Would add' : 'Added'} ${total} row(s).`)
console.log('"departed?" played for the club in 2025–26 but is not on the roster now.')
console.log('"new-to-club?" is on the roster with no 2025–26 club stats.')
console.log('Both need a source before they can be stated; neither was written.')
