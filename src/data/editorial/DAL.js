import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/DAL.json'
import { pointsFromLeague } from './_derive'

// Dallas Stars editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Stars team reset for the 2026-27 season. Cap
// figures have not been read from PuckPedia for this club yet, so there is no
// cap tab. Every "after" lineup is a projection until the club announces a
// roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'Dallas Stars',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['A quiet summer.', 'One very loud contract.'],
  deck:
    'Dallas made almost no additions — one $1 million forward — and moved ' +
    'Mavrik Bourque and Ilya Lyubushkin to Nashville for picks. The offseason ' +
    'that matters is a negotiation: Jason Robertson led the club with 96 ' +
    'points and remains an unsigned restricted free agent. The general ' +
    'manager’s public position is that there is time.',
}

export const ledgerRange = 'July 1'

export const departures = [
  { date: 'Jul. 1', player: 'Mavrik Bourque', pos: 'F', mechanism: 'Trade to Nashville', detail: 'Sent with Ilya Lyubushkin for a 2027 second and a 2028 third; signed a six-year, $33M deal with Nashville on Jul. 4 after 41 points in 82 games.' },
  { date: 'Jul. 1', player: 'Ilya Lyubushkin', pos: 'D', mechanism: 'Trade to Nashville', detail: 'Included in the Bourque deal after 9 points in 53 games.' },
  { date: 'Jul. 1', player: 'Alexander Petrovic', pos: 'D', mechanism: 'UFA', detail: 'Signed a two-year contract with Florida.' },
  { date: 'Offseason', player: 'Michael Bunting', pos: 'F', mechanism: 'UFA', detail: 'Unsigned as of this brief, which is the only firm statement about him.' },
]

export const arrivals = [
  { date: 'Jul. 1', player: 'Joel Kiviranta', pos: 'F', deal: 'One year, $1M', role: 'Returns to Dallas after three seasons away; projected fourth line' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Robertson unsigned; Bourque traded to Nashville; Kiviranta returns',
    rows: [
      {
        pos: 'LW', before: 'Jason Robertson', after: 'Jason Robertson', status: 'unsigned',
        notes: [
          'An unsigned restricted free agent, which is the only firm fact about his situation',
          'Led Dallas with 96 points — 45 goals and 51 assists — in 82 games',
          'The general manager’s public position: “The games don’t start until September, and this is part of contract negotiations”',
        ],
      },
      {
        pos: 'C', before: 'Wyatt Johnston', after: 'Wyatt Johnston', status: 'retained',
        notes: ['Projected to centre the top line with Mikko Rantanen'],
      },
      {
        pos: 'C', before: 'Roope Hintz', after: 'Roope Hintz', status: 'retained',
        notes: ['Projected to centre the second line between Robertson and Tyler Seguin'],
      },
      {
        pos: 'F', before: 'Mavrik Bourque', after: null, status: 'departed',
        notes: [
          'Traded to Nashville on Jul. 1 with Lyubushkin for a 2027 second and a 2028 third',
          'Signed a six-year, $33M contract with Nashville three days later after a 41-point season',
        ],
      },
      {
        pos: 'F', before: null, after: 'Joel Kiviranta', status: 'added',
        notes: [
          'One year at $1M on Jul. 1, returning after playing in Dallas from 2019 to 2023',
        ],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Lyubushkin and Petrovic out; no replacement signed',
    rows: [
      {
        pos: 'RD', before: 'Miro Heiskanen', after: 'Miro Heiskanen', status: 'retained',
        notes: ['Projected on the top pair with Esa Lindell'],
      },
      {
        pos: 'D', before: 'Ilya Lyubushkin', after: null, status: 'departed',
        notes: ['Traded to Nashville on Jul. 1 in the Bourque deal'],
      },
      {
        pos: 'D', before: 'Alexander Petrovic', after: null, status: 'departed',
        notes: ['Signed a two-year contract with Florida on Jul. 1'],
      },
      {
        pos: 'LD', before: 'Lian Bichsel', after: 'Lian Bichsel', status: 'retained',
        notes: ['Projected on the third pair with Tyler Myers'],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Unchanged: Oettinger and DeSmith',
    rows: [
      {
        pos: 'G', before: 'Jake Oettinger', after: 'Jake Oettinger', status: 'retained',
        notes: ['Projected starter'],
      },
      {
        pos: 'G', before: 'Casey DeSmith', after: 'Casey DeSmith', status: 'retained',
        notes: ['Projected backup'],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'The 96-point winger is unsigned',
    body: 'Jason Robertson led Dallas with 45 goals and 51 assists and remains a restricted free agent. Jim Nill’s public line is that the games do not start until September. Nothing beyond that is confirmed.',
  },
  {
    title: 'Bourque sold, then paid elsewhere',
    body: 'Mavrik Bourque and Ilya Lyubushkin went to Nashville on Jul. 1 for a 2027 second and a 2028 third. Three days later Nashville signed Bourque for six years and $33 million.',
  },
  {
    title: 'One addition, worth $1 million',
    body: 'Joel Kiviranta returned on a one-year deal. That is the entire list of players Dallas added this summer.',
  },
]

// Not researched from a primary source yet; the reset does not list picks.
export const draftClass = []

export const campWatch = [
  { name: 'Arttu Hyry', pos: 'F', note: 'The general manager said he has “a great opportunity” to earn a roster spot after his playoff performance.' },
  { name: 'Trey Taylor', pos: 'D', note: 'On an entry-level contract signed in March 2025; depth on a blue line that lost two players.' },
]

export const unresolved = [
  { status: 'Open', item: 'Jason Robertson’s contract', impact: 'The club’s leading scorer is an unsigned RFA' },
  { status: 'Open', item: 'Replacing Lyubushkin and Petrovic', impact: 'Two defensemen left and nobody was signed' },
  { status: 'Open', item: 'Michael Bunting', impact: 'Still an unsigned UFA' },
  { status: 'Open', item: 'Cap and contract detail', impact: 'Not yet verified against PuckPedia, so this club has no cap tab' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Stars 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/dallas-stars-roster-changes-for-2026-27-season' },
  { label: 'Official Stars news', url: 'https://www.nhl.com/stars/news/' },
]

export const points = pointsFromLeague(league)
export const contracts = {}

export { STATUS, RUMOR_STATUS }
