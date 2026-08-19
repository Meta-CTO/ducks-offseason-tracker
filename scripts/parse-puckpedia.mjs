// Turns a PuckPedia team page's visible text into the `cap` shape a club
// module exports. Hand-transcribing ~24 cap hits per club across 32 clubs is
// where errors come from, so the numbers are parsed rather than retyped.
//
// PuckPedia blocks automated crawlers (its robots.txt names ClaudeBot and
// anthropic-ai), so this script does NOT fetch anything. It reads text already
// captured from a human-directed browser visit on stdin, which is the same
// posture the update-data skill has always used for cap figures.
//
// Usage: pbpaste | node scripts/parse-puckpedia.mjs ANA
//        node scripts/parse-puckpedia.mjs ANA < page.txt



const abbrev = process.argv[2]
if (!abbrev) {
  console.error('Usage: node scripts/parse-puckpedia.mjs <ABBR> < page.txt')
  process.exit(1)
}

const chunks = []
for await (const c of process.stdin) chunks.push(c)
const text = Buffer.concat(chunks).toString('utf8')
const money = (s) => Number(String(s).replace(/[$,]/g, ''))

const num = (label) => {
  const m = text.match(new RegExp(`${label}\\s*\\n\\s*\\$([\\d,]+)`))
  return m ? money(m[1]) : null
}

const capHit = num('PROJECTED CAP HIT')
const space = num('PROJECTED CAP SPACE')
const bonuses = num('POTENTIAL BONUSES') ?? 0
const roster = (text.match(/ACTIVE ROSTER\s*\n\s*(\d+\/\d+)/) ?? [])[1] ?? null

if (capHit == null || space == null) {
  console.error('Could not find the cap overview — is this a PuckPedia team page?')
  process.exit(1)
}

/**
 * A group section looks like:
 *
 *   14
 *   Forwards
 *   $55,382,083
 *   53.3% of cap
 *   ...
 *   Pastrnak, David
 *   A            <- optional captain/alternate letter
 *   age30
 *   RW,LW
 *   $11,250,000  <- first figure is this season's cap hit
 *
 * "Non-roster" sections are excluded — those players do not count against the
 * cap. Buried, buyout and retained charges DO count, and are folded into one
 * "Retained & buyouts" group: without them the group totals fall short of the
 * stated cap hit and the utilisation bar silently under-reports. Boston is
 * short $615,000 in retained salary on a traded player, Buffalo $6,444,444 on
 * a buyout.
 */
const GROUPS = [
  ['Forwards', 'F'],
  ['Defence', 'D'],
  ['Goaltenders', 'G'],
]

const CHARGE_SECTIONS = ['Buried', 'Buyout & Cap Charges', 'Retained']

const groups = []
const hits = []

for (const [heading, key] of GROUPS) {
  // Anchor on the roster section, not the "Non-roster Forwards" one.
  const re = new RegExp(`\\n(\\d+)\\n${heading}\\n\\$([\\d,]+)\\n`)
  const m = text.match(re)
  if (!m) {
    console.error(`No ${heading} section found.`)
    process.exit(1)
  }
  groups.push({ key, total: money(m[2]), count: Number(m[1]) })

  // Everything from this heading to the next section heading.
  const start = m.index + m[0].length
  const rest = text.slice(start)
  const endIdx = rest.search(/\nTOTALS\n/)
  const body = endIdx === -1 ? rest : rest.slice(0, endIdx)

  // "Surname, Forename" followed within a few lines by the first $figure.
  const playerRe = /\n([A-ZÄÅÖÜÉ][^\n,]*, [^\n]+)\n((?:(?!\n[A-ZÄÅÖÜÉ][^\n,]*, )[\s\S])*?)\$([\d,]+)/g
  for (const p of body.matchAll(playerRe)) {
    const [surname, forename] = p[1].split(', ')
    hits.push({ name: `${forename.trim()} ${surname.trim()}`, group: key, hit: money(p[3]) })
  }
}

// Buried / buyout / retained charges, folded into one group.
let chargeTotal = 0
for (const heading of CHARGE_SECTIONS) {
  const esc = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const m = text.match(new RegExp(`\\n(\\d+)\\n${esc}\\n\\$([\\d,]+)\\n`))
  if (!m || money(m[2]) === 0) continue
  chargeTotal += money(m[2])

  const start = m.index + m[0].length
  const rest = text.slice(start)
  const endIdx = rest.search(/\nTOTALS\n/)
  const body = endIdx === -1 ? rest : rest.slice(0, endIdx)
  const playerRe = /\n([A-ZÄÅÖÜÉ][^\n,]*, [^\n]+)\n((?:(?!\n[A-ZÄÅÖÜÉ][^\n,]*, )[\s\S])*?)\$([\d,]+)/g
  for (const p of body.matchAll(playerRe)) {
    const [surname, forename] = p[1].split(', ')
    hits.push({
      name: `${forename.trim()} ${surname.trim()}`,
      group: 'O',
      hit: money(p[3]),
      charge: heading === 'Retained' ? 'retained' : heading === 'Buried' ? 'buried' : 'buyout',
    })
  }
}
if (chargeTotal > 0) groups.push({ key: 'O', total: chargeTotal, count: null })

// The whole point of the extra group: groups must reconcile to the cap hit.
const groupSum = groups.reduce((n, g) => n + g.total, 0)
console.error(
  `  ${groupSum === capHit ? 'ok' : 'MISMATCH'}  groups sum $${groupSum.toLocaleString()} ` +
    `vs cap hit $${capHit.toLocaleString()}`,
)

// Sanity: the parsed players should account for the group totals.
for (const g of groups) {
  const summed = hits.filter((h) => h.group === g.key).reduce((n, h) => n + h.hit, 0)
  const count = hits.filter((h) => h.group === g.key).length
  const flag = summed === g.total && (g.count === null || count === g.count) ? 'ok' : 'MISMATCH'
  console.error(
    `  ${flag}  ${g.key}: ${count}/${g.count} players, ` +
      `$${summed.toLocaleString()} vs $${g.total.toLocaleString()}`,
  )
}

const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '_')

console.log(`// ${abbrev} cap data, PuckPedia, retrieved Aug. 19, 2026.
export const cap = {
  capSummary: {
    ceiling: 104_000_000,
    capHit: ${fmt(capHit)},
    space: ${fmt(space)},
    rosterSlots: '${roster?.replace('/', ' / ')}',
    potentialBonuses: ${fmt(bonuses)},
    asOf: 'Aug. 19, 2026',
  },
  capGroups: [
    { key: 'F', label: 'Forwards', color: 'var(--cap-forwards)', total: ${fmt(groups[0].total)} },
    { key: 'D', label: 'Defense', color: 'var(--cap-defense)', total: ${fmt(groups[1].total)} },
    { key: 'G', label: 'Goaltending', color: 'var(--cap-goalies)', total: ${fmt(groups[2].total)} },${
  groups[3]
    ? `\n    { key: 'O', label: 'Retained & buyouts', color: 'var(--cap-other)', total: ${fmt(groups[3].total)} },`
    : ''
}
  ],
  capHits: [
${hits.map((h) => `    { name: '${h.name.replace(/'/g, "\\'")}', group: '${h.group}', hit: ${fmt(h.hit)}${h.charge ? `, charge: '${h.charge}'` : ''} },`).join('\n')}
  ],
}`)
