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
import { readFile, writeFile } from 'node:fs/promises'
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
const add = (club, severity, kind, detail) => issues.push({ club, severity, kind, detail })

// Roles that are staff, not skaters — they will never be on an NHL roster feed.
const STAFF = /coach|manager|president|captain|gm\b|hc\b|ac\b|gc\b|advisor|operations/i

for (const club of targets) {
  const m = await import(pathToFileURL(path.resolve(`src/data/editorial/${club}.js`)).href)
  const league = JSON.parse(await readFile(`src/data/league/${club}.json`, 'utf8'))
  const rawNames = [...league.forwards, ...league.defensemen, ...league.goalies].map((p) => p.name)
  const leagueNames = new Set(rawNames.map(norm))
  const leagueSurnames = new Set(rawNames.map((n) => norm(n.split(' ').slice(-1)[0])))
  const rosterSize = rawNames.length

  const groups = m.rosterComparison ?? []
  const allRows = groups.flatMap((g) => g.rows.map((r) => ({ ...r, group: g.group })))
  const playerRows = allRows.filter((r) => !STAFF.test(r.pos ?? ''))
  const subject = (r) => (r.status === 'added' ? (r.after ?? r.before) : (r.before ?? r.after))

  // 1. Coverage against the actual roster.
  const covered = new Set(playerRows.map((r) => subject(r)).filter(Boolean))
  const coveredNorm = new Set([...covered].map(norm))
  const pct = rosterSize ? Math.round((covered.size / rosterSize) * 100) : 0
  if (pct < 60) {
    add(club, pct < 40 ? 'high' : 'medium', 'thin-coverage',
      `${covered.size} of ${rosterSize} rostered players have a row (${pct}%)`)
  }

  // 2. Coaching section.
  if (!groups.some((g) => g.group === 'Coaching')) {
    add(club, 'medium', 'no-coaching', 'no Coaching group, so the club shows no staff at all')
  }

  // 3. Handover rows: both names present, chip describes only one of them.
  for (const r of allRows) {
    if (r.before && r.after && r.before !== r.after && r.after !== 'TBD' && r.status === 'added') {
      add(club, 'high', 'handover-row',
        `${r.pos}: before='${r.before}' after='${r.after}' status='added' — the chip is about ${r.after}`)
    }
  }

  // 4. A player row whose name the league file does not know.
  for (const r of playerRows) {
    const n = subject(r)
    if (!n) continue
    const nn = norm(n)
    if (!leagueNames.has(nn) && !leagueSurnames.has(nn) && !leagueSurnames.has(norm(n.split(' ').slice(-1)[0]))) {
      const gone = r.status === 'departed' || r.status === 'unsigned' || r.status === 'camp'
      add(club, gone ? 'low' : 'high', 'name-not-on-roster',
        `${r.pos} '${n}' (${r.status}) is not on the current ${club} roster feed`)
    }
  }

  // 5. Duplicate rows for the same person.
  const seen = new Map()
  for (const r of allRows) {
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
    const clash = [...covered].find((n) => norm(n.split(' ').slice(-1)[0]) === sur)
    if (clash) add(club, 'low', 'cap-name-mismatch', `cap says '${h.name}', roster says '${clash}'`)
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
for (const [key, list] of Object.entries(byKind).sort(
  (a, b) => RANK[a[1][0].severity] - RANK[b[1][0].severity] || b[1].length - a[1].length)) {
  const [sev, kind] = key.split('|')
  console.log(`${sev.toUpperCase()}  ${kind}  (${list.length})`)
  for (const i of list.slice(0, 12)) console.log(`    [${i.club}] ${i.detail}`)
  if (list.length > 12) console.log(`    … and ${list.length - 12} more (--json for all)`)
  console.log()
}
