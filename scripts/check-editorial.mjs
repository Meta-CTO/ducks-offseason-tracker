// Structural check for editorial club modules.
//
// A brief is hand-written prose, so its facts cannot be verified mechanically —
// that is what primary sources and the update pass are for. What *can* be
// checked is shape: that every registered club exports what the components
// read, that status values match the shared vocabulary, and that a club has
// not quietly ended up with another club's data.
//
// Usage: node scripts/check-editorial.mjs

import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

const DIR = path.resolve('src/data/editorial')

const REQUIRED = [
  'LAST_UPDATED', 'hero', 'departures', 'arrivals', 'rosterComparison',
  'biggestChanges', 'draftClass', 'campWatch', 'unresolved', 'rumors',
  'sources', 'points',
]

// Read the vocabularies out of status.js rather than restating them, so this
// check cannot drift from what the components actually accept. Roster rows use
// STATUS; rumour entries use RUMOR_STATUS; both appear as `status:` in a
// module, so either is valid here.
const statusSrc = await readFile(path.resolve('src/data/status.js'), 'utf8')
const keysOf = (name) => {
  const block = statusSrc.slice(statusSrc.indexOf(`export const ${name} = {`))
  return [...block.slice(0, block.indexOf('\n}')).matchAll(/^\s{2}(\w+):/gm)].map((m) => m[1])
}
const VALID_STATUS = new Set([...keysOf('STATUS'), ...keysOf('RUMOR_STATUS')])

const problems = []
const fail = (club, msg) => problems.push(`${club}: ${msg}`)

const registry = await readFile(path.join(DIR, 'index.js'), 'utf8')
const registered = [...registry.matchAll(/^\s{2}([A-Z]{3}):/gm)].map((m) => m[1])

const files = (await readdir(DIR))
  .filter((f) => /^[A-Z]{3}\.js$/.test(f))
  .map((f) => f.slice(0, 3))

for (const club of files) {
  if (!registered.includes(club)) {
    fail(club, 'module exists but is not registered in index.js, so it is unreachable')
  }
}
for (const club of registered) {
  if (!files.includes(club)) fail(club, 'registered in index.js but has no module file')
}

for (const club of registered.filter((c) => files.includes(c))) {
  const src = await readFile(path.join(DIR, `${club}.js`), 'utf8')

  for (const name of REQUIRED) {
    if (!new RegExp(`export\\s+(const\\s+|\\{[^}]*\\b)${name}\\b`).test(src)) {
      fail(club, `missing export: ${name}`)
    }
  }

  // A club importing another club's league file is the failure mode that
  // would silently attribute one team's statistics to another.
  const leagueImports = [...src.matchAll(/league\/([A-Z]{3})\.json/g)].map((m) => m[1])
  for (const imported of leagueImports) {
    if (imported !== club) {
      fail(club, `imports league data for ${imported} — statistics would be wrong`)
    }
  }

  // The same failure shape as the league-file check: a club-specific data file
  // imported by the wrong club. photo-credits.json and points.json are
  // Anaheim's; only Anaheim may import them.
  if (club !== 'ANA') {
    for (const shared of ['photo-credits.json', 'points.json', 'contracts.json', '../cap']) {
      if (src.includes(shared)) {
        fail(club, `imports ${shared}, which holds Anaheim's data`)
      }
    }
  }

  for (const m of src.matchAll(/status: '([a-z]+)'/g)) {
    if (!VALID_STATUS.has(m[1])) {
      fail(club, `unknown status '${m[1]}' (valid: ${[...VALID_STATUS].join(', ')})`)
    }
  }

  // The cap tab only renders for clubs exporting cap data; flag the reverse
  // mistake of exporting cap without the contracts its expiry labels read.
  if (/export const cap\b/.test(src) && !/\bcontracts\b/.test(src)) {
    fail(club, 'exports cap data but no contracts map for expiry labels')
  }
}

if (problems.length === 0) {
  console.log(`All ${registered.length} editorial club(s) structurally OK: ${registered.join(', ')}`)
} else {
  console.error(`${problems.length} problem(s):\n`)
  for (const p of problems) console.error(`  - ${p}`)
  process.exit(1)
}
