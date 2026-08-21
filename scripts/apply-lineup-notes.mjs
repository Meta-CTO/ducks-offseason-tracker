// Replaces the roster backfill's placeholder notes with the projected role
// NHL.com's team reset actually states for that player.
//
// The backfill could only say "Played 74 games for the club in 2025-26 and is on
// the current roster", which is true and says nothing. Each club's team reset
// ends with a projected lineup — four forward lines, three pairs, two goalies —
// and that is a primary editorial source, so a row can say where the club is
// projected to play someone instead of how many games they played.
//
// NHL.com writes forward lines left wing -- centre -- right wing, so the middle
// name of a three-man unit is the centre. Pairs and goalies are ordered.
//
// A player on the roster but absent from the projected lineup is said to be
// absent from it, not given an invented role.
//
// Reset text is NHL.com's copyright and this repo is public, so the cache lives
// outside it and its path is passed in.
//
// Usage: node scripts/apply-lineup-notes.mjs <resets-dir> [--club ABBR] [--dry-run]

import { readFile, writeFile, readdir } from 'node:fs/promises'
import path from 'node:path'

const args = process.argv.slice(2)
const dir = args.find((a) => !a.startsWith('--'))
const dry = args.includes('--dry-run')
const only = args.includes('--club') ? args[args.indexOf('--club') + 1]?.toUpperCase() : null
if (!dir) { console.error('Usage: node scripts/apply-lineup-notes.mjs <resets-dir>'); process.exit(1) }

const PLACEHOLDER = /^Played \d+ games? for the club in 2025–26 and is on the current roster$/

const norm = (s) =>
  s.normalize('NFD').replace(/\p{M}/gu, '').replace(/[\\'’`]/g, '')
   .replace(/ /g, ' ').replace(/\s+/g, ' ').toLowerCase().trim()

const FWD = ['first', 'second', 'third', 'fourth']
const PAIR = ['top', 'second', 'third']

const unitsOf = (md) => {
  const m = /##\s*\**Projected lineup\**\s*\n([\s\S]*)$/.exec(md)
  if (!m) return null
  return m[1].split('\n').map((l) => l.trim()).filter(Boolean)
    .map((l) => l.split(/\s+--\s+|\s+—\s+/).map((p) => p.trim()).filter(Boolean))
    .filter((u) => u.length && !/^(Injured|Note)\b/i.test(u[0]))
}

// name -> the sentence describing where the reset projects them
const rolesOf = (units) => {
  const out = new Map()
  let fwd = 0, pair = 0, g = 0
  for (const u of units) {
    if (u.length === 3) {
      const label = FWD[fwd] ?? `${fwd + 1}th`
      const [lw, c, rw] = u
      out.set(norm(lw), `Projected on the ${label} line alongside ${c} and ${rw}`)
      out.set(norm(c), `Projected to centre the ${label} line between ${lw} and ${rw}`)
      out.set(norm(rw), `Projected on the ${label} line alongside ${lw} and ${c}`)
      fwd++
    } else if (u.length === 2) {
      const label = PAIR[pair] ?? `${pair + 1}th`
      out.set(norm(u[0]), `Projected on the ${label} pair with ${u[1]}`)
      out.set(norm(u[1]), `Projected on the ${label} pair with ${u[0]}`)
      pair++
    } else if (u.length === 1) {
      out.set(norm(u[0]), g === 0 ? 'Projected as the starter' : 'Projected as the backup')
      g++
    }
  }
  return out
}

const files = (await readdir('src/data/editorial')).filter((f) => /^[A-Z]{3}\.js$/.test(f))
const targets = only ? files.filter((f) => f.startsWith(only)) : files
let replaced = 0, unlisted = 0, noSource = []

for (const f of targets.sort()) {
  const club = f.replace('.js', '')
  let md
  try { md = await readFile(path.join(dir, `${club}.md`), 'utf8') }
  catch { noSource.push(club); continue }
  const units = unitsOf(md)
  if (!units?.length) { noSource.push(club); continue }
  const roles = rolesOf(units)

  const file = `src/data/editorial/${club}.js`
  let src = await readFile(file, 'utf8')
  let n = 0, u = 0

  // Each placeholder note sits in a row whose name is the nearest preceding
  // `before:`; rewrite the note in place so nothing else about the row moves.
  src = src.replace(
    /(before: '((?:[^'\\]|\\.)*)', after: '(?:[^'\\]|\\.)*', status: '[^']*',\n        notes: \[\n          ')([^']*)(')/g,
    (whole, head, name, note, tail) => {
      if (!PLACEHOLDER.test(note)) return whole
      const role = roles.get(norm(name))
      if (role) { n++; return head + role.replace(/'/g, "\\'") + tail }
      u++
      return head + "On the roster; not in NHL.com\\'s projected lineup" + tail
    },
  )

  if (!dry) await writeFile(file, src)
  replaced += n; unlisted += u
  if (n || u) console.log(`  ${club}  ${String(n).padStart(2)} role note(s), ${String(u).padStart(2)} not in lineup`)
}

console.log(`\n${dry ? 'Would rewrite' : 'Rewrote'} ${replaced} note(s) from projected lineups; ${unlisted} player(s) absent from them.`)
if (noSource.length) console.log(`No usable lineup for: ${noSource.join(', ')}`)
