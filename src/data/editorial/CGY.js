import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/CGY.json'
import draft from '../draft/CGY.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// Calgary Flames editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Flames team reset for the 2026-27 season, which
// carries the offseason transactions and the projected lineup. Cap figures and
// the active injury table have not been read from PuckPedia for this club yet,
// so there is no cap tab and injury status is only claimed where the reset
// states it. Every "after" lineup is a projection until the club announces a
// roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'Calgary Flames',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['They traded for a blue line.', 'The kids get the minutes.'],
  deck:
    'Calgary spent its summer on defense, buying Simon Nemec from New Jersey ' +
    'for two conditional first-round picks and signing him for five years, ' +
    'then swapping Blake Coleman and Olli Maatta to Minnesota for Jake ' +
    'Middleton. Losing a 20-goal scorer who killed penalties and played the ' +
    'power play is the point rather than the cost: the club has said out loud ' +
    'that those minutes now go to younger players.',
}

export const ledgerRange = 'June 23 – July 6'

export const departures = [
  { date: 'Jul. 1', player: 'Ryan Lomberg', pos: 'F', mechanism: 'UFA', detail: 'Signed a two-year contract with Columbus after 9 points in 57 games.' },
  { date: 'Jul. 2', player: 'Blake Coleman', pos: 'F', mechanism: 'Trade to Minnesota', detail: 'Sent with Olli Maatta for Jake Middleton, ending five seasons in Calgary after a 20-goal, 35-point year.' },
  { date: 'Jul. 2', player: 'Olli Maatta', pos: 'D', mechanism: 'Trade to Minnesota', detail: 'Included in the Middleton deal five months after arriving from Utah.' },
  { date: 'Offseason', player: 'Victor Olofsson', pos: 'F', mechanism: 'UFA', detail: 'Signed with Vegas on Jul. 1 after 31 points split between Calgary and Colorado.' },
]

export const arrivals = [
  { date: 'Jun. 23', player: 'Simon Nemec', pos: 'D', deal: 'Trade from New Jersey; five years, signed Jul. 6', role: 'Cost conditional 2027 and 2028 firsts, a 2026 second and Etienne Morin; projected second pair' },
  { date: 'Jun. 23', player: 'Maxim Tsyplakov', pos: 'F', deal: 'Trade from New Jersey', role: 'Came in the Nemec deal; projected on the fourth line' },
  { date: 'Jul. 2', player: 'Jake Middleton', pos: 'D', deal: 'Trade from Minnesota', role: 'For Coleman and Maatta; 16 points and a team-leading 76 penalty minutes in 75 games' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Coleman, Lomberg and Olofsson out; Tsyplakov in, and the vacated minutes go to younger players',
    rows: [
      {
        pos: 'F', before: 'Blake Coleman', after: null, status: 'departed',
        notes: [
          'Traded to Minnesota on Jul. 2 after 20 goals and 35 points in 69 games',
          'Played power play, penalty kill and even strength; the club has said those minutes now go to younger forwards',
        ],
      },
      {
        pos: 'C', before: 'Morgan Frost', after: 'Morgan Frost', status: 'retained',
        notes: ['Projected to centre the top line between Matvei Gridin and Matt Coronato'],
      },
      {
        pos: 'LW', before: 'Jonathan Huberdeau', after: 'Jonathan Huberdeau', status: 'injured',
        notes: [
          'Underwent hip surgery in March; the reset expects him back',
          'Projected on the third line with Ryan Strome and Yegor Sharangovich',
        ],
      },
      {
        pos: 'C', before: 'Mikael Backlund', after: 'Mikael Backlund', status: 'retained',
        notes: ['Projected to centre the second line with Connor Zary and Joel Farabee'],
      },
      {
        pos: 'F', before: null, after: 'Maxim Tsyplakov', status: 'added',
        notes: [
          'Arrived Jun. 23 in the Nemec trade',
          'Projected on the fourth line with Martin Pospisil and Adam Klapka',
        ],
      },
      {
        pos: 'F', before: 'Ryan Lomberg', after: null, status: 'departed',
        notes: ['Signed a two-year deal with Columbus on Jul. 1'],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Rebuilt in two trades: Nemec bought with picks, Middleton acquired for Coleman and Maatta',
    rows: [
      {
        pos: 'D', before: null, after: 'Simon Nemec', status: 'added',
        notes: [
          'Acquired from New Jersey on Jun. 23 and signed for five years on Jul. 6',
          'Cost conditional first-round picks in 2027 and 2028, a 2026 second, and Etienne Morin',
          '26 points in 68 games last season; projected on the second pair',
        ],
      },
      {
        pos: 'D', before: null, after: 'Jake Middleton', status: 'added',
        notes: [
          'Acquired from Minnesota on Jul. 2 for Coleman and Maatta',
          '16 points in 75 games and a team-leading 76 penalty minutes',
        ],
      },
      {
        pos: 'D', before: 'Olli Maatta', after: null, status: 'departed',
        notes: ['Traded to Minnesota on Jul. 2 after 21 games in Calgary'],
      },
      {
        pos: 'D', before: null, after: 'Zayne Parekh', status: 'camp',
        notes: ['Projected onto the third pair with Yan Kuznetsov; a projection, not an announced job'],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Unchanged: Wolf projected to start with Cooley behind him',
    rows: [
      {
        pos: 'G', before: 'Dustin Wolf', after: 'Dustin Wolf', status: 'retained',
        notes: ['Projected as the starter'],
      },
      {
        pos: 'G', before: 'Devin Cooley', after: 'Devin Cooley', status: 'retained',
        notes: ['Projected as the backup'],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'Two first-round picks for a defenseman',
    body: 'Simon Nemec cost conditional first-round picks in 2027 and 2028, a 2026 second and Etienne Morin, then signed for five years on Jul. 6. It is the summer’s clearest statement of intent from a club that also sold a 20-goal forward.',
  },
  {
    title: 'Coleman out, minutes freed on purpose',
    body: 'Blake Coleman went to Minnesota with Olli Maatta for Jake Middleton. Calgary framed it as an opening rather than a loss: the power-play, penalty-kill and even-strength time Coleman absorbed now goes to younger forwards.',
  },
  {
    title: 'A camp with real jobs available',
    body: 'Aydar Suniev, Jonathan Castagna and Tyson Gross are all named as candidates in the reset, and Zayne Parekh is projected onto the third pair. None of that is settled.',
  },
]

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'Aydar Suniev', pos: 'F', note: 'Twenty-one, and challenging for a spot after 24 points in 57 AHL games.' },
  { name: 'Jonathan Castagna', pos: 'F', note: 'Twenty-one, attending his first professional training camp.' },
  { name: 'Tyson Gross', pos: 'F', note: 'Twenty-three; scored his first NHL goal on Apr. 9 and is expected to get a long look.' },
  { name: 'Zayne Parekh', pos: 'D', note: 'Projected onto the third pair, which camp still has to confirm.' },
]

export const unresolved = [
  { status: 'Open', item: 'Jonathan Huberdeau’s hip', impact: 'Had surgery in March; third-line left wing' },
  { status: 'Open', item: 'Who absorbs Coleman’s minutes', impact: 'Power play, penalty kill and even strength all have time to redistribute' },
  { status: 'Open', item: 'Zayne Parekh’s roster spot', impact: 'Third defense pair' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Flames 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/calgary-flames-roster-changes-for-2026-27-season' },
  { label: 'Official Flames news', url: 'https://www.nhl.com/flames/news/' },
]

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}

// CGY cap data, PuckPedia, retrieved Aug. 19, 2026.
export const cap = {
  capSummary: {
    ceiling: 104_000_000,
    capHit: 89_116_666,
    space: 14_883_334,
    rosterSlots: '23 / 23',
    potentialBonuses: 1_500_000,
    asOf: 'Aug. 19, 2026',
  },
  capGroups: [
    { key: 'F', label: 'Forwards', color: 'var(--cap-forwards)', total: 52_012_916 },
    { key: 'D', label: 'Defense', color: 'var(--cap-defense)', total: 24_403_750 },
    { key: 'G', label: 'Goaltending', color: 'var(--cap-goalies)', total: 8_850_000 },
    { key: 'O', label: 'Retained & buyouts', color: 'var(--cap-other)', total: 3_850_000 },
  ],
  capHits: [
    { name: 'Jonathan Huberdeau', group: 'F', hit: 10_500_000 },
    { name: 'Matt Coronato', group: 'F', hit: 6_500_000 },
    { name: 'Yegor Sharangovich', group: 'F', hit: 5_750_000 },
    { name: 'Ryan Strome', group: 'F', hit: 5_000_000 },
    { name: 'Joel Farabee', group: 'F', hit: 5_000_000 },
    { name: 'Morgan Frost', group: 'F', hit: 4_375_000 },
    { name: 'Connor Zary', group: 'F', hit: 3_775_000 },
    { name: 'Mikael Backlund', group: 'F', hit: 3_250_000 },
    { name: 'Martin Pospisil', group: 'F', hit: 2_500_000 },
    { name: 'Maxim Tsyplakov', group: 'F', hit: 2_250_000 },
    { name: 'Adam Klapka', group: 'F', hit: 1_250_000 },
    { name: 'Matvei Gridin', group: 'F', hit: 953_750 },
    { name: 'Samuel Honzek', group: 'F', hit: 909_166 },
    { name: 'Simon Nemec', group: 'D', hit: 7_250_000 },
    { name: 'Kevin Bahl', group: 'D', hit: 5_350_000 },
    { name: 'Jake Middleton', group: 'D', hit: 4_350_000 },
    { name: 'Zach Whitecloud', group: 'D', hit: 2_750_000 },
    { name: 'Joel Hanley', group: 'D', hit: 1_750_000 },
    { name: 'Brayden Pachal', group: 'D', hit: 1_187_500 },
    { name: 'Zayne Parekh', group: 'D', hit: 953_750 },
    { name: 'Yan Kuznetsov', group: 'D', hit: 812_500 },
    { name: 'Dustin Wolf', group: 'G', hit: 7_500_000 },
    { name: 'Devin Cooley', group: 'G', hit: 1_350_000 },
    { name: 'Blake Coleman', group: 'O', hit: 2_450_000, charge: 'retained' },
    { name: 'Nazem Kadri', group: 'O', hit: 1_400_000, charge: 'retained' },
  ],
}

export { STATUS, RUMOR_STATUS }
