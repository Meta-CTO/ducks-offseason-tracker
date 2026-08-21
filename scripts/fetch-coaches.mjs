// Fetches each club's head coach for last season and next, so a coaching change
// can be stated as a change rather than guessed at.
//
// The NHL API has no coaching endpoint (v1/coaches 404s), which is why 21 of 32
// clubs had no Coaching group at all. NHL.com's club sites are bespoke — only
// Calgary exposes a parseable /team/coaching-staff page — so the uniform source
// is Hockey-Reference, which CLAUDE.md already lists as a primary source.
//
// Both seasons matter. /teams/<ABBR>/2026.html is who coached in 2025-26;
// /teams/<ABBR>/2027.html is who holds the job for 2026-27. Same name means
// `retained`; different means `added`, and the pair becomes a handover row.
// Fetching only the second would leave the status unsupportable.
//
// RATE LIMIT: Hockey-Reference returns 429 with a ~3500s Retry-After after
// roughly thirty requests in quick succession, and the block is site-wide, not
// per-page. Requests are paced and a 429 aborts the run rather than hammering.
// Its robots.txt names GPTBot and AhrefsBot, not this project, and does not
// disallow /teams/; requests identify themselves honestly.
//
// Covers the head coach only. Assistants, goaltending coaches and GMs are not on
// these pages; clubs already carrying that detail keep it.
//
// Usage: node scripts/fetch-coaches.mjs [--club ABBR] [--only-missing]

import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises'

const args = process.argv.slice(2)
const only = args.includes('--club') ? args[args.indexOf('--club') + 1]?.toUpperCase() : null
const onlyMissing = args.includes('--only-missing')

const HR = { VGK: 'VEG' }          // franchise codes that differ from the NHL's
const PACE_MS = 3000               // deliberately slow; see RATE LIMIT above
const UA = 'ducks-offseason-tracker/1.0 (personal hockey site; contact garrett@metacto.com)'

const teams = JSON.parse(await readFile('src/data/teams.json', 'utf8'))
await mkdir('src/data/coaches', { recursive: true })
const have = new Set((await readdir('src/data/coaches')).map((f) => f.replace('.json', '')))

let targets = only ? teams.filter((t) => t.abbrev === only) : teams
if (onlyMissing) {
  targets = []
  for (const t of teams) {
    if (!have.has(t.abbrev)) { targets.push(t); continue }
    const d = JSON.parse(await readFile(`src/data/coaches/${t.abbrev}.json`, 'utf8'))
    if (!d.previousCoach) targets.push(t)   // fetched before the two-season change
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const strip = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()

// Values are sometimes a link (Coach) and sometimes bare text. Reading the first
// <a> unconditionally made every captain the arena, because the next link after
// a plain-text value is "Primary Arena".
const field = (html, label) => {
  const m = new RegExp(`${label}:\\s*(?:<\\/strong>)?([\\s\\S]{0,220})`).exec(html)
  if (!m) return null
  const upToNextLabel = m[1].split(/[A-Z][A-Za-z ]{2,20}:/)[0]
  const link = /^\s*(?:<[^>]+>\s*)*<a[^>]*>([^<]+)<\/a>/.exec(upToNextLabel)
  const out = strip(link ? link[1] : strip(upToNextLabel).split('(')[0])
  return out && out.length < 60 ? out : null
}

class RateLimited extends Error {}

const page = async (code, season) => {
  const url = `https://www.hockey-reference.com/teams/${code}/${season}.html`
  for (let i = 0; i < 3; i++) {
    const res = await fetch(url, { headers: { 'user-agent': UA } }).catch(() => null)
    if (res?.ok) return { html: await res.text(), url }
    if (res?.status === 429) {
      const wait = Number(res.headers.get('retry-after')) || 3600
      throw new RateLimited(`429; retry after ${wait}s (~${Math.ceil(wait / 60)} min)`)
    }
    await sleep(1000 * 2 ** i)
  }
  return { html: null, url }
}

const results = []
try {
  for (const t of targets) {
    const code = HR[t.abbrev] ?? t.abbrev
    const next = await page(code, 2027); await sleep(PACE_MS)
    const prev = await page(code, 2026); await sleep(PACE_MS)
    if (!next.html) { results.push({ abbrev: t.abbrev, error: 'no response' }); continue }

    const coach = field(next.html, 'Coach')
    const previousCoach = prev.html ? field(prev.html, 'Coach') : null
    results.push({ abbrev: t.abbrev, coach, previousCoach })
    if (coach) {
      await writeFile(`src/data/coaches/${t.abbrev}.json`, JSON.stringify({
        abbrev: t.abbrev, season: '2026-27', coach, previousCoach,
        changed: previousCoach ? coach !== previousCoach : null,
        source: next.url, previousSource: prev.url,
      }, null, 2) + '\n')
    }
  }
} catch (e) {
  if (!(e instanceof RateLimited)) throw e
  console.error(`\nStopped: ${e.message}`)
  console.error('Everything fetched so far is written. Re-run with --only-missing after the window.\n')
}

let ok = 0
for (const r of results) {
  if (!r.coach) { console.log(`  FAIL  ${r.abbrev}  ${r.error ?? 'coach not parsed'}`); continue }
  ok++
  const tag = r.previousCoach == null ? '?' : r.coach === r.previousCoach ? 'retained' : `NEW (was ${r.previousCoach})`
  console.log(`  ok    ${r.abbrev}  ${r.coach.padEnd(20)} ${tag}`)
}
console.log(`\n${ok}/${targets.length} club(s) written.`)
