// Fills out a Coaching group that lists only a head coach.
//
// add-coaching.mjs could add just the one row, because Hockey-Reference carries
// only head coaches. scripts/fetch-staff.mjs now reads the rest from each club's
// own site, gated on that site's head coach matching Hockey-Reference.
//
// Status is `onstaff`, not `retained`. The club sites say who is on staff this
// season; they do not say who was on staff last season, and claiming continuity
// would be the same unsourced assertion the roster backfill made.
//
// Only groups holding a single head-coach row are touched. The clubs whose
// coaching staff was written by hand already list assistants and keep them.
//
// Usage: node scripts/add-staff.mjs [--dry-run]

import { readFile, writeFile, readdir } from 'node:fs/promises'

const dry = process.argv.includes('--dry-run')
const esc = (s) => s.replace(/'/g, "\\'")

const ROLES = [
  ['associateCoaches', 'Associate coach'],
  ['assistantCoaches', 'Assistant coach'],
  ['goaltendingCoaches', 'Goaltending coach'],
]

const files = (await readdir('src/data/editorial')).filter((f) => /^[A-Z]{3}\.js$/.test(f)).sort()
const report = []

for (const f of files) {
  const club = f.replace('.js', '')
  const file = `src/data/editorial/${f}`
  const src = await readFile(file, 'utf8')

  const gi = src.indexOf("group: 'Coaching'")
  if (gi === -1) { report.push([club, 'no Coaching group']); continue }

  // Bound the group so rows elsewhere are not counted.
  const rowsAt = src.indexOf('rows: [', gi)
  let depth = 0, end = -1
  for (let i = src.indexOf('[', rowsAt); i < src.length; i++) {
    if (src[i] === '[') depth++
    else if (src[i] === ']') { depth--; if (depth === 0) { end = i; break } }
  }
  const body = src.slice(rowsAt, end)
  const rowCount = [...body.matchAll(/\bpos: '/g)].length
  if (rowCount !== 1) { report.push([club, `${rowCount} rows already — left alone`]); continue }

  let staff
  try { staff = JSON.parse(await readFile(`src/data/coaches/${club}.json`, 'utf8')) }
  catch { report.push([club, 'no staff file']); continue }
  if (!staff.headCoach) { report.push([club, 'NO STAFF SOURCE — head coach only']); continue }

  const already = new Set([...body.matchAll(/before: '((?:[^'\\]|\\.)*)'/g)].map((m) => m[1]))
  const lines = []
  for (const [key, label] of ROLES) {
    for (const name of staff[key] ?? []) {
      if (!name || already.has(name)) continue
      lines.push(`      {\n        pos: '${label}', before: '${esc(name)}', after: '${esc(name)}', status: 'onstaff',\n` +
                 `        notes: [\n          'Listed on the club\\'s coaching staff for 2026–27',\n        ],\n      },\n`)
    }
  }
  if (!lines.length) { report.push([club, 'staff file lists no assistants']); continue }

  const next = src.slice(0, end).replace(/[ \t]*$/, '') + lines.join('') + '    ' + src.slice(end)
  if (!dry) await writeFile(file, next)
  report.push([club, `+${lines.length} staff row(s)`])
}

let total = 0
for (const [club, msg] of report) {
  if (msg.startsWith('+')) total += Number(msg.slice(1).split(' ')[0])
  console.log(`  ${club}  ${msg}`)
}
console.log(`\n${dry ? 'Would add' : 'Added'} ${total} staff row(s).`)
