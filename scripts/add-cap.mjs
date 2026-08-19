// Inserts a parsed `cap` block into a club module and reports name mismatches.
//
// PuckPedia writes names as "Peterka, John-Jason"; the site writes "JJ Peterka".
// A mismatch is not cosmetic — Avatar and the contract lookup both key on the
// slugified display name, so a cap row spelled differently from the roster row
// silently loses its photo. Every inserted name is checked against the names
// the module already uses and anything unmatched is printed for a human to
// reconcile.
//
// Usage: node scripts/parse-puckpedia.mjs BOS < page.txt | node scripts/add-cap.mjs BOS

import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const abbrev = process.argv[2]
if (!abbrev) {
  console.error('Usage: ... | node scripts/add-cap.mjs <ABBR>')
  process.exit(1)
}

const chunks = []
for await (const c of process.stdin) chunks.push(c)
const block = Buffer.concat(chunks).toString('utf8').trim()

const file = path.resolve(`src/data/editorial/${abbrev}.js`)
let src = await readFile(file, 'utf8')

if (/export const cap\b/.test(src)) {
  console.error(`${abbrev} already has cap data; remove it first to replace.`)
  process.exit(1)
}

// Names the module already renders, so the cap rows can be checked against them.
const known = new Set()
for (const m of src.matchAll(/(?:before|after): '([^']+)'/g)) known.add(m[1])
for (const m of src.matchAll(/\{ name: '([^']+)', pos:/g)) known.add(m[1])

const capNames = [...block.matchAll(/name: '([^']+)'/g)].map((m) => m[1])
const surnameOf = (n) => n.split(' ').slice(-1)[0].toLowerCase()
const knownSurnames = new Map([...known].map((n) => [surnameOf(n), n]))

const unmatched = []
for (const n of capNames) {
  if (known.has(n)) continue
  const bySurname = knownSurnames.get(surnameOf(n))
  unmatched.push({ cap: n, siteGuess: bySurname ?? null })
}

// Insert before the shared re-export so the file keeps its shape.
const anchor = "\nexport { STATUS, RUMOR_STATUS }"
if (!src.includes(anchor)) {
  console.error(`${abbrev}: could not find the export anchor.`)
  process.exit(1)
}
src = src.replace(anchor, `\n${block}\n${anchor}`)

// Drop the now-untrue "no cap tab" line from the unresolved list.
src = src.replace(
  /\n *\{ status: 'Open', item: 'Cap and contract detail'[^\n]*\n/,
  '\n',
)

await writeFile(file, src)

console.log(`${abbrev}: cap block inserted (${capNames.length} players).`)
if (unmatched.length) {
  console.log(`\n  ${unmatched.length} name(s) not matching a roster row:`)
  for (const u of unmatched) {
    console.log(`    "${u.cap}"${u.siteGuess ? `  -> site uses "${u.siteGuess}"` : '  (not on this page)'}`)
  }
  console.log('\n  Rows with no roster match are usually depth players the')
  console.log('  editorial page does not list; those are fine. A "-> site uses"')
  console.log('  line is a real mismatch and should be reconciled.')
}
