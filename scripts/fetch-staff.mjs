// Fetches full coaching staff and the general manager from each club's NHL.com
// site, so a Coaching group can list more than a head coach.
//
// The NHL API has no coaching endpoint and the club sites are bespoke: pages
// live at /team/coaching-staff, /coaches, /management, /front-office and more,
// in at least two markups. Candidate URLs come from nhl.com's own sitemap.
//
// GENERAL MANAGERS ARE DELIBERATELY NOT COLLECTED. Front-office titles are
// compound — Columbus lists "President, Hockey Operations / General Manager /
// Alternate Governor: Don Waddell" — and an exact-role match picked up a
// different person entirely. Only the head coach is gated, so an ungated field
// from a different section of the page is not safe to write.
//
// THE GATE: a parsed page is accepted only if the head coach it yields matches
// the one Hockey-Reference already gave us in src/data/coaches/<ABBR>.json. A
// club site's staff page and an independent source agreeing is what makes the
// rest of that page trustworthy. Without it a wrong URL — the sitemap offers
// Montreal a recycling page and Nashville a youth-hockey one — would quietly
// write a wrong staff list. Pages that fail the gate are reported, not written.
//
// Two further traps:
//   * Pages also list the AHL affiliate's staff, with its own "Head Coach".
//     Only the FIRST coaching section belongs to the NHL club.
//   * Names carry non-breaking spaces.
//
// Usage: node scripts/fetch-staff.mjs <candidates.json> [--club ABBR]

import { readFile, writeFile } from 'node:fs/promises'

const args = process.argv.slice(2)
const candFile = args.find((a) => !a.startsWith('--'))
const only = args.includes('--club') ? args[args.indexOf('--club') + 1]?.toUpperCase() : null
if (!candFile) { console.error('Usage: node scripts/fetch-staff.mjs <candidates.json>'); process.exit(1) }

const UA = 'ducks-offseason-tracker/1.0 (personal hockey site; contact garrett@metacto.com)'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
// Winnipeg's list carries left-to-right marks before names; invisible, but
// they make the string unequal to the same name written anywhere else.
const clean = (s) => s.replace(/[\u200b-\u200f\ufeff]/g, '').replace(/ /g, ' ')
  .replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()
// "Martin St-Louis" and "Martin St. Louis" are the same person; a club site and
// Hockey-Reference punctuate compound surnames differently, so fold hyphens and
// periods to spaces before comparing or the gate rejects a correct page.
const norm = (s) => s.normalize('NFD').replace(/\p{M}/gu, '')
  .replace(/[\\'’`]/g, '').replace(/[.-]/g, ' ').replace(/\s+/g, ' ').toLowerCase().trim()

const HEAD = /^head coach$/i
const ASSOC = /^associate coach(es)?$/i
const ASST = /^assistant coach(es)?$/i
const GOALIE = /^goalt(ending|ie)s? coach(es)?$/i
const ANY_ROLE = /^(head coach|associate coach(es)?|assistant coach(es)?|goalt(ending|ie)s? coach(es)?|general manager|video coach)$/i

// Strategy A: JSON-LD articleBody markdown, "Role | Name" under "## SECTION".
const parseArticleBody = (html) => {
  const m = /"articleBody":"((?:[^"\\]|\\.)*)"/.exec(html)
  if (!m) return null
  let body
  try { body = JSON.parse('"' + m[1] + '"') } catch { return null }
  const secs = body.split('##').map((chunk) => {
    const [head, ...rest] = chunk.split('\n')
    const rows = []
    for (const line of rest) {
      const i = line.indexOf('|')
      if (i === -1) continue
      const role = clean(line.slice(0, i)).replace(/\*/g, '')
      const names = clean(line.slice(i + 1)).split(',').map(clean).filter(Boolean)
      if (role && names.length) rows.push({ role, names })
    }
    return { heading: clean(head).replace(/\*/g, ''), rows }
  })
  return secs.filter((s) => s.rows.length)
}

// Strategy B: <article class="coach-profile"> with <h3>Name</h3> + <li>Role</li>.
const parseCoachProfiles = (html) => {
  const rows = []
  for (const m of html.matchAll(/<article[^>]*class="[^"]*coach-profile[^"]*"[\s\S]*?<\/article>/g)) {
    const name = /<h3[^>]*>([\s\S]*?)<\/h3>/.exec(m[0])?.[1]
    const role = /<ul[^>]*class="[^"]*profile-meta[^"]*"[^>]*>\s*<li[^>]*>([\s\S]*?)<\/li>/.exec(m[0])?.[1]
    if (!name || !role) continue
    const strip = (x) => clean(x.replace(/<[^>]+>/g, ' '))
    rows.push({ role: strip(role), names: [strip(name)] })
  }
  return rows.length ? [{ heading: 'COACHING STAFF', rows }] : null
}

// Strategy C: a heading holding the name, followed closely by a paragraph
// holding the role — <h2>Rod Brind'Amour</h2><p><strong><em>Head Coach</em></strong></p>.
// This is the most common club-site shape and the loosest match, which is
// exactly why the Hockey-Reference gate matters.
const parseHeadingThenRole = (html) => {
  const ROLE = /^(head coach|associate coach|assistant coach|assistant coaches|goaltending coach|goalie coach|general manager|video coach)$/i
  const rows = []
  const re = /<h[23][^>]*>([\s\S]{2,60}?)<\/h[23]>([\s\S]{0,260}?)<\/p>/g
  for (const m of html.matchAll(re)) {
    const name = clean(m[1].replace(/<[^>]+>/g, ' '))
    const after = clean(m[2].replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' '))
    if (!name || !ROLE.test(after)) continue
    rows.push({ role: after, names: [name] })
  }
  return rows.length ? [{ heading: 'COACHING STAFF', rows }] : null
}

// Strategy D: a two-column directory table — <td>Dan Muse</td><td>Head Coach</td>.
const parseTablePairs = (html) => {
  const rows = []
  for (const m of html.matchAll(/<td[^>]*>([\s\S]{2,80}?)<\/td>\s*<td[^>]*>([\s\S]{2,80}?)<\/td>/g)) {
    const a = clean(m[1].replace(/<[^>]+>/g, ' ')), b = clean(m[2].replace(/<[^>]+>/g, ' '))
    if (ANY_ROLE.test(b)) rows.push({ role: b, names: [a] })
    else if (ANY_ROLE.test(a)) rows.push({ role: a, names: [b] })
  }
  return rows.length ? [{ heading: 'COACHING STAFF', rows }] : null
}

// Strategy E: name and role joined in one element, either order —
// "<p>Head Coach - Ryan Craig</p>" or "<h3>Spencer Carbery - Head Coach</h3>".
const parseDashPairs = (html) => {
  const rows = []
  for (const m of html.matchAll(/<(?:p|h[1-6]|li|span)[^>]*>([\s\S]{5,90}?)<\/(?:p|h[1-6]|li|span)>/g)) {
    const text = clean(m[1].replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' '))
    const d = /^(.{2,45}?)\s+[-–—]\s+(.{2,45})$/.exec(text)
    if (!d) continue
    const [, a, b] = d
    if (ANY_ROLE.test(b)) rows.push({ role: b, names: [a] })
    else if (ANY_ROLE.test(a)) rows.push({ role: a, names: [b] })
  }
  return rows.length ? [{ heading: 'COACHING STAFF', rows }] : null
}

// Strategy F: role and name separated by a colon, the role often bolded —
// "<p><strong>Head Coach:</strong> <a>Dean Evason</a></p>".
const parseColonPairs = (html) => {
  const rows = []
  for (const m of html.matchAll(/<(?:p|li|h[1-6]|div)[^>]*>([\s\S]{5,200}?)<\/(?:p|li|h[1-6]|div)>/g)) {
    const text = clean(m[1].replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' '))
    const c = /^(.{2,40}?):\s*(.{2,60})$/.exec(text)
    if (!c) continue
    const [, role, name] = c
    if (ANY_ROLE.test(role)) rows.push({ role, names: name.split(',').map(clean).filter(Boolean) })
  }
  return rows.length ? [{ heading: 'COACHING STAFF', rows }] : null
}

const collect = (secs) => {
  // First section containing a head coach is the NHL club's; later ones are the
  // AHL affiliate.
  const idx = secs.findIndex((s) => s.rows.some((r) => HEAD.test(r.role)))
  const coachSec = idx === -1 ? null : secs[idx]
  if (!coachSec) return { headCoach: null }
  const pull = (re) => coachSec.rows.filter((r) => re.test(r.role)).flatMap((r) => r.names)
  return {
    headCoach: pull(HEAD)[0] ?? null,
    associateCoaches: pull(ASSOC),
    assistantCoaches: pull(ASST),
    goaltendingCoaches: pull(GOALIE),
  }
}

const cands = JSON.parse(await readFile(candFile, 'utf8'))
const clubs = only ? [only] : Object.keys(cands)
const report = []

for (const club of clubs) {
  let known = null
  try { known = JSON.parse(await readFile(`src/data/coaches/${club}.json`, 'utf8')) } catch { /* none */ }
  if (!known?.coach) { report.push([club, 'no Hockey-Reference coach to gate against']); continue }

  let accepted = null, tried = []
  for (const url of cands[club] ?? []) {
    const res = await fetch(url, { headers: { 'user-agent': UA } }).catch(() => null)
    await sleep(400)
    if (!res?.ok) { tried.push(`${url.split('/team/')[1]}: no response`); continue }
    const html = await res.text()
    for (const parse of [parseArticleBody, parseCoachProfiles, parseHeadingThenRole, parseTablePairs, parseDashPairs, parseColonPairs]) {
      const secs = parse(html)
      if (!secs) continue
      const got = collect(secs)
      if (!got.headCoach) { tried.push(`${url.split('/team/')[1]}: no head coach`); continue }
      if (norm(got.headCoach) !== norm(known.coach)) {
        tried.push(`${url.split('/team/')[1]}: head coach "${got.headCoach}" != "${known.coach}"`)
        continue
      }
      accepted = { ...got, staffSource: url }
      break
    }
    if (accepted) break
  }

  if (!accepted) { report.push([club, `NO SOURCE — ${tried.join('; ') || 'no candidates'}`]); continue }
  await writeFile(`src/data/coaches/${club}.json`, JSON.stringify({ ...known, ...accepted }, null, 2) + '\n')
  const n = (accepted.associateCoaches?.length ?? 0) + (accepted.assistantCoaches?.length ?? 0) + (accepted.goaltendingCoaches?.length ?? 0)
  report.push([club, `ok — ${accepted.headCoach}, +${n} staff`])
}

let ok = 0
for (const [club, msg] of report) { if (msg.startsWith('ok')) ok++; console.log(`  ${club}  ${msg}`) }
console.log(`\n${ok}/${clubs.length} club(s) verified against Hockey-Reference and written.`)
