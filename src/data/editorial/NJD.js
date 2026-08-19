import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/NJD.json'
import draft from '../draft/NJD.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// New Jersey Devils editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Devils team reset for the 2026-27 season. Cap
// figures read from PuckPedia on Aug. 19, 2026. Every "after" lineup is a projection until the club announces a
// roster.
//
// Sourcing note: the Devils and Panthers resets agree that Jacob Markstrom
// went to Florida for Evan Rodrigues and Jesper Boqvist, but name different
// additional pieces — Florida's lists Ben Steeves going to New Jersey, New
// Jersey's lists Angus Crookshank going to Florida. The ledger below states
// the part both pages agree on.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'New Jersey Devils',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['A new GM sold the young defenseman.', 'The offer sheet got matched.'],
  deck:
    'Tom Fitzgerald was fired in April and Sunny Mehta hired from Florida, ' +
    'where he had been assistant general manager through back-to-back Stanley ' +
    'Cups. He promptly turned Simon Nemec into two conditional first-round ' +
    'picks, moved Jacob Markstrom, and tried an offer sheet on Utah’s Barrett ' +
    'Hayton that Utah matched. Nico Hischier signed five more years.',
}

export const ledgerRange = 'April 16 – July 15'

export const departures = [
  { date: 'Apr. 6', player: 'Tom Fitzgerald', pos: 'General manager', mechanism: 'Fired', detail: 'Dismissed after seven seasons; Sunny Mehta hired ten days later.' },
  { date: 'Jun. 23', player: 'Simon Nemec', pos: 'D', mechanism: 'Trade to Calgary', detail: 'Sent with Maxim Tsyplakov for conditional 2027 and 2028 first-round picks, a 2026 second and defenseman Etienne Morin.' },
  { date: 'Jun. 23', player: 'Maxim Tsyplakov', pos: 'F', mechanism: 'Trade to Calgary', detail: 'Included in the Nemec deal.' },
  { date: 'Jun. 30', player: 'Jacob Markstrom', pos: 'G', mechanism: 'Trade to Florida', detail: 'Returned Evan Rodrigues and Jesper Boqvist; 23-19-1 with a 3.07 GAA in 44 games.' },
  { date: 'Jul. 1', player: 'Paul Cotter', pos: 'F', mechanism: 'UFA', detail: 'Signed a one-year contract with Vancouver after 15 points in 79 games.' },
]

export const arrivals = [
  { date: 'Apr. 16', player: 'Sunny Mehta', pos: 'General manager', deal: 'Hired', role: 'Six seasons with Florida, three as assistant GM and head of analytics through two Stanley Cups' },
  { date: 'Jun. 1', player: 'Anton Silayev', pos: 'D', deal: 'Three years', role: 'Twenty, six-foot-seven, tenth overall in 2024; 124 hits in 61 KHL games' },
  { date: 'Jun. 25', player: 'Declan Chisholm', pos: 'D', deal: 'Trade from Washington for a 2027 fourth', role: 'One season left on his contract' },
  { date: 'Jun. 25', player: 'Amadeus Lombardi', pos: 'C', deal: 'Trade from Detroit for a 2026 fourth', role: '42 points in 47 AHL games' },
  { date: 'Jun. 30', player: 'Evan Rodrigues', pos: 'F', deal: 'Trade from Florida; final year of a four-year deal', role: 'Came back in the Markstrom trade; projected fourth line' },
  { date: 'Jun. 30', player: 'Jesper Boqvist', pos: 'F', deal: 'Trade from Florida; final year of his contract', role: 'Included with Rodrigues' },
  { date: 'Jul. 1', player: 'Nico Daws', pos: 'G', deal: 'Two years', role: 'Expected to compete for a full-time role with Markstrom gone' },
  { date: 'Jul. 15', player: 'Anthony Mantha', pos: 'RW', deal: 'Two years', role: 'From Pittsburgh after career highs of 33 goals and 64 points; projected third line' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Hischier extended five years; Mantha signed; an offer sheet for Barrett Hayton was matched',
    rows: [
      {
        pos: 'C', before: 'Nico Hischier', after: 'Nico Hischier', status: 'retained',
        notes: [
          'Captain; signed a five-year extension beginning in 2027-28',
          'Hischier: “I want to be a New Jersey Devil, and I want to turn the ship around”',
        ],
      },
      {
        pos: 'C', before: 'Jack Hughes', after: 'Jack Hughes', status: 'retained',
        notes: [
          'Projected to centre the second line with Jesper Bratt and Connor Brown',
          'The reset names insurance behind him at centre as an outstanding need',
        ],
      },
      {
        pos: 'RW', before: null, after: 'Anthony Mantha', status: 'added',
        notes: [
          'Two years on Jul. 15 after career highs of 33 goals and 64 points in Pittsburgh',
          'Six-foot-five; projected on the third line with Cody Glass and Arseny Gritsyuk',
        ],
      },
      {
        pos: 'F', before: null, after: 'Evan Rodrigues', status: 'added',
        notes: ['Returned in the Markstrom trade on Jun. 30; projected fourth line'],
      },
      {
        pos: 'F', before: 'Paul Cotter', after: null, status: 'departed',
        notes: ['Signed a one-year contract with Vancouver on Jul. 1'],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Nemec sold to Calgary for two conditional firsts; Silayev signed',
    rows: [
      {
        pos: 'D', before: 'Simon Nemec', after: null, status: 'departed',
        notes: [
          'Traded to Calgary on Jun. 23 with Maxim Tsyplakov',
          'Returned conditional 2027 and 2028 firsts, a 2026 second and Etienne Morin',
          'Calgary signed him for five years two weeks later',
        ],
      },
      {
        pos: 'LD', before: null, after: 'Anton Silayev', status: 'camp',
        notes: [
          'Three years on Jun. 1; twenty years old and six-foot-seven',
          'Tenth overall in 2024, with 124 hits and 74 blocks in 61 KHL games',
        ],
      },
      {
        pos: 'LD', before: 'Luke Hughes', after: 'Luke Hughes', status: 'retained',
        notes: ['Projected on the second pair with Brett Pesce'],
      },
      {
        pos: 'D', before: null, after: 'Declan Chisholm', status: 'added',
        notes: ['Acquired from Washington on Jun. 25 for a 2027 fourth-round pick'],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Markstrom traded to Florida; Daws signed to compete behind Allen',
    rows: [
      {
        pos: 'G', before: 'Jake Allen', after: 'Jake Allen', status: 'retained',
        notes: ['Projected starter'],
      },
      {
        pos: 'G', before: 'Jacob Markstrom', after: null, status: 'departed',
        notes: [
          'Traded to Florida on Jun. 30 for Evan Rodrigues and Jesper Boqvist',
          '23-19-1 with a 3.07 GAA in 44 games',
        ],
      },
      {
        pos: 'G', before: 'Nico Daws', after: 'Nico Daws', status: 'camp',
        notes: [
          'Signed for two years on Jul. 1 and expected to compete for a full-time role',
          'The reset says goaltending could become a deadline priority if he cannot establish himself',
        ],
      },
    ],
  },
  {
    group: 'Coaching',
    summary: 'Fitzgerald fired in April; Mehta hired from the two-time champions',
    rows: [
      {
        pos: 'General manager', before: 'Tom Fitzgerald', after: 'Sunny Mehta', status: 'added',
        notes: [
          'Fitzgerald was fired Apr. 6 after seven seasons; Mehta hired Apr. 16',
          'Mehta spent six seasons in Florida, three as assistant GM and head of analytics through back-to-back Stanley Cups',
        ],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'An analytics executive took over',
    body: 'Tom Fitzgerald was fired on Apr. 6 and Sunny Mehta hired ten days later, arriving from Florida where he had been assistant general manager and head of analytics through two championships.',
  },
  {
    title: 'Nemec turned into two conditional firsts',
    body: 'The young defenseman went to Calgary on Jun. 23 with Maxim Tsyplakov for conditional 2027 and 2028 first-round picks, a 2026 second and Etienne Morin. Calgary signed him for five years on Jul. 6.',
  },
  {
    title: 'An offer sheet that did not work',
    body: 'New Jersey tendered Utah’s Barrett Hayton an offer sheet on Jul. 1 and Utah matched it — the summer’s second matched offer sheet, after Anaheim matched Philadelphia’s bid for Leo Carlsson.',
  },
  {
    title: 'The captain committed',
    body: 'Nico Hischier signed a five-year extension beginning in 2027-28, saying he wanted to show his teammates he intends to stay and “turn the ship around.”',
  },
]

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'Anton Silayev', pos: 'LD', note: 'Twenty and six-foot-seven, signed for three years in June.' },
  { name: 'Nico Daws', pos: 'G', note: 'Expected to compete for a full-time role now that Markstrom has gone.' },
  { name: 'Seamus Casey', pos: 'D', note: 'A restricted free agent in the final season of his entry-level deal.' },
  { name: 'Amadeus Lombardi', pos: 'C', note: 'Twenty-three; 42 points in 47 AHL games after arriving from Detroit.' },
]

export const unresolved = [
  { status: 'Open', item: 'Goaltending behind Jake Allen', impact: 'The reset flags a deadline move if Daws cannot establish himself' },
  { status: 'Open', item: 'Centre insurance behind Jack Hughes', impact: 'Named in the reset as a need' },
  { status: 'Open', item: 'Finishing and physicality up front', impact: 'The reset says the club lacks “finishing detail and a bit more nastiness”' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Devils 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/new-jersey-devils-roster-changes-for-2026-27-season' },
  { label: 'NHL.com Panthers team reset (Markstrom trade)', url: 'https://www.nhl.com/news/topic/team-resets/florida-panthers-roster-changes-for-2026-27-season' },
  { label: 'Official Devils news', url: 'https://www.nhl.com/devils/news/' },
]

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}

// NJD cap data, PuckPedia, retrieved Aug. 19, 2026.
export const cap = {
  capSummary: {
    ceiling: 104_000_000,
    capHit: 100_150_000,
    space: 3_850_000,
    rosterSlots: '23 / 23',
    potentialBonuses: 0,
    asOf: 'Aug. 19, 2026',
  },
  capGroups: [
    { key: 'F', label: 'Forwards', color: 'var(--cap-forwards)', total: 58_500_000 },
    { key: 'D', label: 'Defense', color: 'var(--cap-defense)', total: 36_500_000 },
    { key: 'G', label: 'Goaltending', color: 'var(--cap-goalies)', total: 3_900_000 },
    { key: 'O', label: 'Retained & buyouts', color: 'var(--cap-other)', total: 1_250_000 },
  ],
  capHits: [
    { name: 'Timo Meier', group: 'F', hit: 8_800_000 },
    { name: 'Jack Hughes', group: 'F', hit: 8_000_000 },
    { name: 'Jesper Bratt', group: 'F', hit: 7_875_000 },
    { name: 'Nico Hischier', group: 'F', hit: 7_250_000 },
    { name: 'Anthony Mantha', group: 'F', hit: 4_750_000 },
    { name: 'Dawson Mercer', group: 'F', hit: 4_000_000 },
    { name: 'Arseny Gritsyuk', group: 'F', hit: 3_250_000 },
    { name: 'Evan Rodrigues', group: 'F', hit: 3_075_000 },
    { name: 'Connor Brown', group: 'F', hit: 3_000_000 },
    { name: 'Stefan Noesen', group: 'F', hit: 2_750_000 },
    { name: 'Cody Glass', group: 'F', hit: 2_500_000 },
    { name: 'Nick Bjugstad', group: 'F', hit: 1_750_000 },
    { name: 'Jesper Boqvist', group: 'F', hit: 1_500_000 },
    { name: 'Dougie Hamilton', group: 'D', hit: 9_000_000 },
    { name: 'Luke Hughes', group: 'D', hit: 9_000_000 },
    { name: 'Brett Pesce', group: 'D', hit: 5_500_000 },
    { name: 'Brenden Dillon', group: 'D', hit: 4_000_000 },
    { name: 'Johnathan Kovacevic', group: 'D', hit: 4_000_000 },
    { name: 'Jonas Siegenthaler', group: 'D', hit: 3_400_000 },
    { name: 'Declan Chisholm', group: 'D', hit: 1_600_000 },
    { name: 'Jake Allen', group: 'G', hit: 1_800_000 },
    { name: 'Nico Daws', group: 'G', hit: 1_100_000 },
    { name: 'David Rittich', group: 'G', hit: 1_000_000 },
    { name: 'Bonus Carryover Overage', group: 'O', hit: 1_250_000, charge: 'buyout' },
  ],
}

export { STATUS, RUMOR_STATUS }
