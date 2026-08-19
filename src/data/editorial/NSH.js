import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/NSH.json'
import draft from '../draft/NSH.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// Nashville Predators editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Predators team reset for the 2026-27 season. Cap
// figures have not been read from PuckPedia for this club yet, so there is no
// cap tab. Every "after" lineup is a projection until the club announces a
// roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'Nashville Predators',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['A new man in charge.', 'Then he went shopping.'],
  deck:
    'Chris MacFarland left the Presidents’ Trophy winners in Colorado to run ' +
    'Nashville, and Barry Trotz moved to an advisory role. What followed was ' +
    'the busiest summer in the division: six forwards and a defenseman ' +
    'acquired, three of them from MacFarland’s old club. The stated logic is ' +
    'character — and the stated gap is still a No. 1 centre.',
}

export const ledgerRange = 'June 2 – July 4'

export const departures = [
  { date: 'Jun. 24', player: 'Fedor Svechkov', pos: 'F', mechanism: 'Trade to Colorado', detail: 'Sent with Zachary L’Heureux in the deal that brought Jack Drury the other way; 17 points in 70 games.' },
  { date: 'Jun. 24', player: 'Zachary L’Heureux', pos: 'F', mechanism: 'Trade to Colorado', detail: 'Traded alongside Svechkov at twenty-three.' },
  { date: 'Jul. 1', player: 'Erik Haula', pos: 'F', mechanism: 'UFA', detail: 'Signed a two-year contract with Los Angeles after 38 points in 81 games.' },
  { date: 'Jun. 2', player: 'Barry Trotz', pos: 'General manager', mechanism: 'Moved to an advisory role', detail: 'Stepped aside when Chris MacFarland was hired.' },
]

export const arrivals = [
  { date: 'Jun. 2', player: 'Chris MacFarland', pos: 'President of hockey ops / GM', deal: 'Hired', role: 'Ran Colorado for four seasons, including the 2025-26 Presidents’ Trophy' },
  { date: 'Jun. 16', player: 'Ross Colton', pos: 'F', deal: 'Trade from Colorado', role: 'Cost Magnus Chrona and thirds in 2026 and 2027; Cup winner with Tampa Bay in 2021' },
  { date: 'Jun. 24', player: 'Jack Drury', pos: 'F', deal: 'Trade from Colorado; five years, signed Jun. 28', role: '27 points in 82 games; projected to centre the fourth line' },
  { date: 'Jun. 27', player: 'Adam Edstrom', pos: 'F', deal: 'Trade from N.Y. Rangers', role: 'Bottom-six forward; 5 points in 35 games' },
  { date: 'Jun. 29', player: 'Nils Hoglander', pos: 'F', deal: 'Trade from Vancouver for a 2029 third', role: 'Projected on the third line' },
  { date: 'Jul. 1', player: 'Alex Kerfoot', pos: 'F', deal: 'Two years', role: 'From Utah after 13 points in 34 games' },
  { date: 'Jul. 1', player: 'Mavrik Bourque', pos: 'F', deal: 'Trade from Dallas; six years, $33M signed Jul. 4', role: 'Cost a 2027 second and a 2028 third; projected to centre the top line' },
  { date: 'Jul. 1', player: 'Ilya Lyubushkin', pos: 'D', deal: 'Trade from Dallas', role: 'Came with Bourque; projected third pair' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Six forwards acquired; Svechkov, L’Heureux and Haula out',
    rows: [
      {
        pos: 'C', before: null, after: 'Mavrik Bourque', status: 'added',
        notes: [
          'Acquired from Dallas on Jul. 1 with Lyubushkin for a 2027 second and a 2028 third',
          'Signed for six years and $33M — a $5.5M cap hit — on Jul. 4',
          'Projected to centre the top line, though the reset is explicit that his fit as a No. 1 centre is uncertain',
        ],
      },
      {
        pos: 'LW', before: 'Filip Forsberg', after: 'Filip Forsberg', status: 'retained',
        notes: ['Projected on the top line with Bourque and Matthew Wood'],
      },
      {
        pos: 'C', before: 'Ryan O’Reilly', after: 'Ryan O’Reilly', status: 'retained',
        notes: [
          'Projected to centre the second line with Steven Stamkos and Luke Evangelista',
          'The reset calls him the default answer at No. 1 centre',
        ],
      },
      {
        pos: 'F', before: null, after: 'Ross Colton', status: 'added',
        notes: [
          'Acquired from Colorado on Jun. 16 for a goaltender and two third-round picks',
          'Projected to centre the third line',
        ],
      },
      {
        pos: 'F', before: null, after: 'Jack Drury', status: 'added',
        notes: [
          'Acquired from Colorado on Jun. 24 and signed for five years on Jun. 28',
          'Projected to centre the fourth line',
        ],
      },
      {
        pos: 'LW', before: null, after: 'Nils Hoglander', status: 'added',
        notes: ['Acquired from Vancouver on Jun. 29 for a 2029 third-round pick'],
      },
      {
        pos: 'F', before: 'Erik Haula', after: null, status: 'departed',
        notes: ['Signed a two-year contract with Los Angeles on Jul. 1 after 38 points in 81 games'],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Lyubushkin added; the top four is unchanged',
    rows: [
      {
        pos: 'D', before: 'Roman Josi', after: 'Roman Josi', status: 'retained',
        notes: ['Projected on the top pair with Nick Perbix'],
      },
      {
        pos: 'D', before: null, after: 'Ilya Lyubushkin', status: 'added',
        notes: [
          'Arrived from Dallas on Jul. 1 in the Bourque trade',
          '9 points and 68 hits in 53 games; projected third pair',
        ],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Unchanged: Saros and Annunen',
    rows: [
      {
        pos: 'G', before: 'Juuse Saros', after: 'Juuse Saros', status: 'retained',
        notes: ['Projected starter'],
      },
      {
        pos: 'G', before: 'Justus Annunen', after: 'Justus Annunen', status: 'retained',
        notes: ['Projected backup'],
      },
    ],
  },
  {
    group: 'Coaching',
    summary: 'MacFarland hired on Jun. 2; Trotz to an advisory role',
    rows: [
      {
        pos: 'President of hockey ops / GM', before: 'Barry Trotz', after: 'Chris MacFarland', status: 'added',
        notes: [
          'Hired Jun. 2 after four seasons running Colorado',
          'Trotz moved to an advisory role',
          'MacFarland: “We want to surround our young NHL players with character builders, guys that have seen winning”',
        ],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'They hired the Presidents’ Trophy GM',
    body: 'Chris MacFarland left Colorado on Jun. 2 to run Nashville, with Barry Trotz moving to an advisory role. He then acquired three forwards from his former club: Ross Colton, Jack Drury and, in the other direction, sent Svechkov and L’Heureux back.',
  },
  {
    title: 'A $33 million bet on a first-line centre',
    body: 'Mavrik Bourque cost a 2027 second and a 2028 third, then signed for six years at $5.5M a season. He is projected to centre the top line, and the reset says plainly that whether he can hold that role is unresolved.',
  },
  {
    title: 'Seven players in, three out',
    body: 'Bourque, Colton, Drury, Hoglander, Edstrom, Kerfoot and Lyubushkin all arrived. Svechkov, L’Heureux and Haula left. It is the most active summer in the division.',
  },
]

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'Brady Martin', pos: 'F', note: 'Nineteen, the fifth overall pick in 2025; three NHL games so far and 24 points in 24 OHL games.' },
  { name: 'Joakim Kemell', pos: 'F', note: 'Twenty-two; 29 points in 48 AHL games after 16 NHL appearances.' },
  { name: 'Ryan Ufko', pos: 'D', note: 'Twenty-three; 11 points in 18 NHL games and 44 in 52 in the AHL.' },
  { name: 'Tanner Molendyk', pos: 'D', note: 'Twenty-one; 23 points in 60 AHL games as a rookie.' },
]

export const unresolved = [
  { status: 'Open', item: 'A No. 1 centre', impact: 'Named in the reset as the priority; Bourque is projected there but unproven in the role' },
  { status: 'Open', item: 'Two buyouts still on the books', impact: 'Turris at $2M and Duchene at $1.56M — $3.56M of the cap committed to players who left' },
  { status: 'Open', item: 'Whether Brady Martin is ready', impact: 'Nineteen, and the club’s highest-upside forward prospect' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Predators 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/nashville-predators-roster-changes-for-2026-27-season' },
  { label: 'Official Predators news', url: 'https://www.nhl.com/predators/news/' },
]

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}

// NSH cap data, PuckPedia, retrieved Aug. 19, 2026.
export const cap = {
  capSummary: {
    ceiling: 104_000_000,
    capHit: 96_329_556,
    space: 7_670_444,
    rosterSlots: '23 / 23',
    potentialBonuses: 1_500_000,
    asOf: 'Aug. 19, 2026',
  },
  capGroups: [
    { key: 'F', label: 'Forwards', color: 'var(--cap-forwards)', total: 53_800_000 },
    { key: 'D', label: 'Defense', color: 'var(--cap-defense)', total: 29_984_000 },
    { key: 'G', label: 'Goaltending', color: 'var(--cap-goalies)', total: 8_990_000 },
    { key: 'O', label: 'Retained & buyouts', color: 'var(--cap-other)', total: 3_555_556 },
  ],
  capHits: [
    { name: 'Filip Forsberg', group: 'F', hit: 8_500_000 },
    { name: 'Steven Stamkos', group: 'F', hit: 8_000_000 },
    { name: 'Jonathan Marchessault', group: 'F', hit: 5_500_000 },
    { name: 'Mavrik Bourque', group: 'F', hit: 5_500_000 },
    { name: 'Ryan O\'Reilly', group: 'F', hit: 4_500_000 },
    { name: 'Jack Drury', group: 'F', hit: 4_500_000 },
    { name: 'Ross Colton', group: 'F', hit: 4_000_000 },
    { name: 'Alexander Kerfoot', group: 'F', hit: 3_500_000 },
    { name: 'Nils Hoglander', group: 'F', hit: 3_000_000 },
    { name: 'Luke Evangelista', group: 'F', hit: 3_000_000 },
    { name: 'Vitali Pinchuk', group: 'F', hit: 1_025_000 },
    { name: 'Adam Edstrom', group: 'F', hit: 975_000 },
    { name: 'Matthew Wood', group: 'F', hit: 950_000 },
    { name: 'Ozzy Wiesblatt', group: 'F', hit: 850_000 },
    { name: 'Roman Josi', group: 'D', hit: 9_059_000 },
    { name: 'Brady Skjei', group: 'D', hit: 7_000_000 },
    { name: 'Nicolas Hague', group: 'D', hit: 5_500_000 },
    { name: 'Ilya Lyubushkin', group: 'D', hit: 3_250_000 },
    { name: 'Nicklaus Perbix', group: 'D', hit: 2_750_000 },
    { name: 'Justin Barron', group: 'D', hit: 1_575_000 },
    { name: 'Adam Wilsby', group: 'D', hit: 850_000 },
    { name: 'Juuse Saros', group: 'G', hit: 7_740_000 },
    { name: 'Justus Annunen', group: 'G', hit: 1_250_000 },
    { name: 'C,RW', group: 'O', hit: 2_000_000, charge: 'buyout' },
    { name: 'C,RW', group: 'O', hit: 1_555_556, charge: 'buyout' },
  ],
}

export { STATUS, RUMOR_STATUS }
