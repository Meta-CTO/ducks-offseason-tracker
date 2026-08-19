import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/MTL.json'
import draft from '../draft/MTL.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// Montréal Canadiens editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Canadiens team reset for the 2026-27 season. Cap
// figures have not been read from PuckPedia for this club yet, so there is no
// cap tab. Every "after" lineup is a projection until the club announces a
// roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'Montréal Canadiens',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['The quietest summer in the division.', 'A fourteen-year run ended.'],
  deck:
    'Montréal added two players on one-year deals and let Brendan Gallagher ' +
    'go to Vancouver for future considerations, closing fourteen seasons and ' +
    '911 games. The roster the club is counting on is the one it already has: ' +
    'Ivan Demidov after a 62-point season, Lane Hutson on the blue line, and ' +
    'a crease handed to two goaltenders aged 24 and 21.',
}

export const ledgerRange = 'June 26 – July 9'

export const departures = [
  { date: 'Jun. 29', player: 'Brendan Gallagher', pos: 'RW', mechanism: 'Trade to Vancouver', detail: 'Sent for future considerations after fourteen seasons, 911 games and 487 points in Montréal. The Canadiens retain $3.25M of his cap hit.' },
  { date: 'Jul. 1', player: 'Joe Veleno', pos: 'F', mechanism: 'No qualifying offer', detail: 'Signed with the N.Y. Rangers after Montréal declined to qualify him.' },
  { date: 'Offseason', player: 'Patrik Laine', pos: 'F', mechanism: 'UFA', detail: 'Unsigned as of this brief, which is the only firm statement about him; has not played since Oct. 16 and required core muscle surgery.' },
]

export const arrivals = [
  { date: 'Jun. 26', player: 'Brett Berard', pos: 'F', deal: 'Trade from N.Y. Rangers; one year, signed Jul. 9', role: 'Twenty-three, with 10 points in 48 NHL games' },
  { date: 'Jul. 8', player: 'Reilly Walsh', pos: 'D', deal: 'One year, two-way', role: 'Twenty-seven; 46 points in 68 KHL games last season' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Gallagher traded after fourteen seasons; Laine unsigned; Berard added',
    rows: [
      {
        pos: 'C', before: 'Nick Suzuki', after: 'Nick Suzuki', status: 'retained',
        notes: [
          'Captain; projected to centre the top line between Cole Caufield and Juraj Slafkovsky',
          'Suzuki: “You never know how many chances you’re going to get to be a few games away from a Stanley Cup Final”',
        ],
      },
      {
        pos: 'RW', before: 'Ivan Demidov', after: 'Ivan Demidov', status: 'retained',
        notes: [
          '62 points last season; projected on the second line with Alex Newhook and Jake Evans',
          'The reset names a top-six forward to complement him as the outstanding need',
        ],
      },
      {
        pos: 'RW', before: 'Brendan Gallagher', after: null, status: 'departed',
        notes: [
          'Traded to Vancouver on Jun. 29 for future considerations',
          'Fourteen seasons, 911 games and 487 points in Montréal',
        ],
      },
      {
        pos: 'F', before: 'Patrik Laine', after: null, status: 'unsigned',
        notes: [
          'An unsigned unrestricted free agent, which is the only firm fact about his situation',
          'Has not played since Oct. 16 and required core muscle surgery',
        ],
      },
      {
        pos: 'F', before: null, after: 'Brett Berard', status: 'added',
        notes: ['Acquired from the Rangers on Jun. 26 and signed for one year on Jul. 9'],
      },
      {
        pos: 'F', before: 'Joe Veleno', after: null, status: 'departed',
        notes: ['Not qualified; signed with the N.Y. Rangers on Jul. 1'],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Unchanged in the top four, with Walsh added on a two-way deal',
    rows: [
      {
        pos: 'LD', before: 'Lane Hutson', after: 'Lane Hutson', status: 'retained',
        notes: ['Projected on the second pair with Jayden Struble'],
      },
      {
        pos: 'RD', before: 'Noah Dobson', after: 'Noah Dobson', status: 'retained',
        notes: ['Projected on the top pair with Mike Matheson'],
      },
      {
        pos: 'D', before: null, after: 'Reilly Walsh', status: 'added',
        notes: ['One year, two-way, on Jul. 8 after 46 points in 68 KHL games'],
      },
      {
        pos: 'RD', before: null, after: 'David Reinbacher', status: 'camp',
        notes: ['Fifth overall in 2023; the reset flags a potentially expanded role, which camp decides'],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'The crease is handed to two young goaltenders',
    rows: [
      {
        pos: 'G', before: 'Sam Montembeault', after: 'Sam Montembeault', status: 'retained',
        notes: [
          'Carries $3.15M, the largest goaltending hit on the roster, and is a UFA in 2027',
          'PuckPedia has him on the roster; NHL.com’s projected lineup lists only Dobes and Fowler',
        ],
      },
      {
        pos: 'G', before: 'Jakub Dobes', after: 'Jakub Dobes', status: 'retained',
        notes: ['Projected starter, at $965,000 before a raise to $5.36M in 2027-28'],
      },
      {
        pos: 'G', before: 'Jacob Fowler', after: 'Jacob Fowler', status: 'camp',
        notes: [
          '9-6-2 with a .908 save percentage',
          'The reset says he could push Dobes for playing time',
        ],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'Fourteen seasons ended for future considerations',
    body: 'Brendan Gallagher went to Vancouver on Jun. 29. He had played 911 games and scored 487 points for Montréal, and the return was future considerations.',
  },
  {
    title: 'They added almost nothing',
    body: 'Brett Berard on a one-year deal and Reilly Walsh on a one-year two-way contract. That is the whole list, in a summer when the reset names top-six forward help as the need.',
  },
  {
    title: 'The crease belongs to the kids',
    body: 'Jakub Dobes is projected to start with Jacob Fowler behind him, and the reset says Fowler could push for playing time. Neither has an established NHL workload.',
  },
]

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'Jacob Fowler', pos: 'G', note: 'Could push Dobes for starts; a .908 save percentage so far.' },
  { name: 'David Reinbacher', pos: 'RD', note: 'Fifth overall in 2023, with an expanded role flagged as possible.' },
  { name: 'Zachary Bolduc', pos: 'LW', note: 'Projected onto the fourth line with Oliver Kapanen and Kirby Dach.' },
]

export const unresolved = [
  { status: 'Open', item: 'A top-six forward for Demidov', impact: 'Named in the reset as the outstanding need' },
  { status: 'Open', item: 'Patrik Laine', impact: 'Unsigned, and has not played since October' },
  { status: 'Open', item: 'Dobes or Fowler', impact: 'Two young goaltenders and no established starter' },
  { status: 'Open', item: 'Where Montembeault fits', impact: 'On the roster at $3.15M but absent from the projected lineup' },
  { status: 'Open', item: 'Bolduc and Xhekaj', impact: 'Both unsigned RFAs carrying no cap hit yet' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Canadiens 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/montreal-canadiens-roster-changes-for-2026-27-season' },
  { label: 'Official Canadiens news', url: 'https://www.nhl.com/canadiens/news/' },
]

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}

// MTL cap data, PuckPedia, retrieved Aug. 19, 2026.
export const cap = {
  capSummary: {
    ceiling: 104_000_000,
    capHit: 94_216_076,
    space: 9_783_924,
    rosterSlots: '21 / 23',
    potentialBonuses: 4_350_000,
    asOf: 'Aug. 19, 2026',
  },
  capGroups: [
    { key: 'F', label: 'Forwards', color: 'var(--cap-forwards)', total: 48_908_333 },
    { key: 'D', label: 'Defense', color: 'var(--cap-defense)', total: 35_062_500 },
    { key: 'G', label: 'Goaltending', color: 'var(--cap-goalies)', total: 5_060_833 },
    { key: 'O', label: 'Retained & buyouts', color: 'var(--cap-other)', total: 5_184_410 },
  ],
  capHits: [
    { name: 'Nick Suzuki', group: 'F', hit: 7_875_000 },
    { name: 'Cole Caufield', group: 'F', hit: 7_850_000 },
    { name: 'Juraj Slafkovský', group: 'F', hit: 7_600_000 },
    { name: 'Phillip Danault', group: 'F', hit: 5_500_000 },
    { name: 'Josh Anderson', group: 'F', hit: 5_500_000 },
    { name: 'Kirby Dach', group: 'F', hit: 3_600_000 },
    { name: 'Alex Newhook', group: 'F', hit: 2_900_000 },
    { name: 'Jake Evans', group: 'F', hit: 2_850_000 },
    { name: 'Alexandre Texier', group: 'F', hit: 2_500_000 },
    { name: 'Oliver Kapanen', group: 'F', hit: 942_500 },
    { name: 'Ivan Demidov', group: 'F', hit: 940_833 },
    { name: 'Brett Berard', group: 'F', hit: 850_000 },
    { name: 'Noah Dobson', group: 'D', hit: 9_500_000 },
    { name: 'Lane Hutson', group: 'D', hit: 8_850_000 },
    { name: 'Mike Matheson', group: 'D', hit: 6_000_000 },
    { name: 'Kaiden Guhle', group: 'D', hit: 5_550_000 },
    { name: 'Alexandre Carrier', group: 'D', hit: 3_750_000 },
    { name: 'Jayden Struble', group: 'D', hit: 1_412_500 },
    { name: 'Sam Montembeault', group: 'G', hit: 3_150_000 },
    { name: 'Jakub Dobes', group: 'G', hit: 965_000 },
    { name: 'Jacob Fowler', group: 'G', hit: 945_833 },
    { name: 'Bonus Carryover Overage', group: 'O', hit: 1_934_410, charge: 'buyout' },
    { name: 'RETAINED', group: 'O', hit: 3_250_000, charge: 'retained' },
  ],
}

export { STATUS, RUMOR_STATUS }
