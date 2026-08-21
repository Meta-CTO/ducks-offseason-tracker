// Adds a Coaching group to club modules that have none.
//
// 21 of 32 clubs showed no staff at all, because the NHL API carries no
// coaching data and only Anaheim and ten others had it written by hand.
// scripts/fetch-coaches.mjs sources the head coach from Hockey-Reference for
// both 2025-26 and 2026-27; this turns that pair into a row.
//
// The two seasons are what make the status honest: same name is `retained`,
// a different one is a handover, written as before/after with `added` — the
// shape RosterComparison renders as "New Coach / Added / replaces Old Coach".
// A club whose previous season could not be read is SKIPPED rather than
// guessed at, because `retained` would be an unsourced claim.
//
// Only the head coach. Assistants and GMs are not on these pages, so a club
// that already lists them keeps what it has and is left alone.
//
// Hockey-Reference lists one coach per season, so a mid-season change is not
// visible here — Vegas shows Cassidy for 2025-26 though Tortorella took over in
// March. Notes therefore attribute the previous name to the source rather than
// claiming the person held the job all year. Clubs with a mid-season change are
// exactly the ones likely to already have a Coaching group, which this skips.
//
// Usage: node scripts/add-coaching.mjs [--dry-run]

import { readFile, writeFile, readdir } from 'node:fs/promises'

const dry = process.argv.includes('--dry-run')

const registry = await readFile('src/data/editorial/index.js', 'utf8')
const clubs = [...registry.matchAll(/^\s{2}([A-Z]{3}):/gm)].map((m) => m[1])
const have = new Set((await readdir('src/data/coaches')).map((f) => f.replace('.json', '')))

const esc = (s) => s.replace(/'/g, "\\'")
const report = []

for (const club of clubs) {
  const file = `src/data/editorial/${club}.js`
  const src = await readFile(file, 'utf8')

  if (src.includes("group: 'Coaching'")) { report.push([club, 'has one already']); continue }
  if (!have.has(club)) { report.push([club, 'NO SOURCE — not fetched']); continue }

  const c = JSON.parse(await readFile(`src/data/coaches/${club}.json`, 'utf8'))
  if (!c.coach) { report.push([club, 'no coach parsed']); continue }
  if (c.changed === null || c.previousCoach == null) {
    report.push([club, 'SKIPPED — previous season unknown, status would be a guess'])
    continue
  }

  const block = c.changed
    ? `  {
    group: 'Coaching',
    summary: '${esc(c.coach)} replaced ${esc(c.previousCoach)} behind the bench',
    rows: [
      {
        pos: 'Head coach', before: '${esc(c.previousCoach)}', after: '${esc(c.coach)}', status: 'added',
        notes: [
          '${esc(c.coach)} is the head coach for 2026–27; Hockey-Reference lists ${esc(c.previousCoach)} as the club\\'s 2025–26 head coach',
        ],
      },
    ],
  },
`
    : `  {
    group: 'Coaching',
    summary: '${esc(c.coach)} returns behind the bench',
    rows: [
      {
        pos: 'Head coach', before: '${esc(c.coach)}', after: '${esc(c.coach)}', status: 'retained',
        notes: [
          'Listed as the club\\'s head coach for both 2025–26 and 2026–27',
        ],
      },
    ],
  },
`

  // Append as the last group in rosterComparison.
  const start = src.indexOf('export const rosterComparison = [')
  if (start === -1) { report.push([club, 'no rosterComparison export']); continue }
  let depth = 0, end = -1
  for (let i = src.indexOf('[', start); i < src.length; i++) {
    if (src[i] === '[') depth++
    else if (src[i] === ']') { depth--; if (depth === 0) { end = i; break } }
  }
  if (end === -1) { report.push([club, 'could not find end of rosterComparison']); continue }

  const next = src.slice(0, end) + block + src.slice(end)
  if (!dry) await writeFile(file, next)
  report.push([club, c.changed ? `added: ${c.previousCoach} → ${c.coach}` : `added: ${c.coach} (retained)`])
}

let n = 0
for (const [club, msg] of report) {
  if (msg.startsWith('added:')) n++
  console.log(`  ${club}  ${msg}`)
}
console.log(`\n${dry ? 'Would add' : 'Added'} a Coaching group to ${n} club(s).`)
