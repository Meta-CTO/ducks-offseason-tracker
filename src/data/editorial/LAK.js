import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/LAK.json'
import draft from '../draft/LAK.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// Los Angeles Kings editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Kings team reset for the 2026-27 season. Cap
// figures read from PuckPedia on Aug. 19, 2026. Every "after" lineup is a projection
// until the club announces a roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'Los Angeles Kings',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['Kopitar retired.', 'Nobody replaces that.'],
  deck:
    'Anze Kopitar ended twenty seasons in Los Angeles, taking 1,316 points, ' +
    'two Stanley Cups and ten years as captain with him. The Kings answered ' +
    'with veterans on short deals — Mats Zuccarello, Erik Haula, a returning ' +
    'Corey Perry — and a new head coach in Peter Laviolette. The captaincy is ' +
    'the open question the roster cannot answer on its own.',
}

export const ledgerRange = 'June 9 – July 1'

export const departures = [
  { date: 'Offseason', player: 'Anze Kopitar', pos: 'C · Captain', mechanism: 'Retired', detail: 'Retired after twenty seasons: 1,316 points in 1,521 games, two Stanley Cups and ten years as captain.' },
  { date: 'Jul. 1', player: 'Andrei Kuzmenko', pos: 'F', mechanism: 'UFA', detail: 'Signed a one-year contract with Pittsburgh after 25 points in 52 games.' },
]

export const arrivals = [
  { date: 'Jun. 9', player: 'Peter Laviolette', pos: 'Head coach', deal: 'Hired', role: '846-562-161 across 23 seasons; won the Stanley Cup with Carolina in 2006' },
  { date: 'Jul. 1', player: 'Mats Zuccarello', pos: 'F', deal: 'One year', role: 'From Minnesota after 54 points in 59 games; projected second line' },
  { date: 'Jul. 1', player: 'Erik Haula', pos: 'F', deal: 'Two years', role: 'From Nashville after 38 points in 81 games; projected to centre the second line' },
  { date: 'Jul. 1', player: 'Corey Perry', pos: 'F', deal: 'One year', role: 'Returns to Los Angeles; projected fourth line' },
  { date: 'Jul. 1', player: 'Erik Gustafsson', pos: 'D', deal: 'One year', role: 'From Detroit; 37 points in 39 AHL games last season' },
  { date: 'Jul. 1', player: 'Scott Laughton', pos: 'C/LW', deal: 'Three years, $3.5M AAV', role: 'Recorded on PuckPedia rather than the reset; projected to centre the third line' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Kopitar retired and Kuzmenko left; Zuccarello, Haula and Perry signed on one- and two-year deals — projected roles are NHL.com’s',
    rows: [
      {
        pos: 'C', before: 'Anze Kopitar', after: null, status: 'departed',
        notes: [
          'Retired after twenty seasons and ten years as captain',
          '1,316 points in 1,521 games; two Stanley Cups',
          'The reset is explicit that the role is not replaceable, only redistributed',
        ],
      },
      {
        pos: 'LW', before: 'Artemi Panarin', after: 'Artemi Panarin', status: 'retained',
        notes: [
          'Carries $11M, the largest forward cap hit on the roster, and reaches unrestricted free agency in 2027',
          'Projected on the top line with Byfield and Kempe',
        ],
      },
      {
        pos: 'C', before: 'Quinton Byfield', after: 'Quinton Byfield', status: 'retained',
        notes: ['Projected to centre the top line between Artemi Panarin and Adrian Kempe'],
      },
      {
        pos: 'C', before: null, after: 'Erik Haula', status: 'added',
        notes: [
          'Two years on Jul. 1 after 38 points in 81 games with Nashville',
          'Projected to centre the second line with Kevin Fiala and Zuccarello',
        ],
      },
      {
        pos: 'RW', before: null, after: 'Mats Zuccarello', status: 'added',
        notes: [
          'One year on Jul. 1 after 54 points in 59 games with Minnesota',
          'Turns 39 during the season; a short deal for a specific job',
        ],
      },
      {
        pos: 'RW', before: null, after: 'Corey Perry', status: 'added',
        notes: [
          'Returns on a one-year deal after splitting last season between Los Angeles and Tampa Bay',
          'Projected on the fourth line with Joel Armia and Samuel Helenius',
        ],
      },
      {
        pos: 'F', before: 'Andrei Kuzmenko', after: null, status: 'departed',
        notes: ['Signed a one-year contract with Pittsburgh on Jul. 1'],
      },
      {
        pos: 'R', before: 'Joel Armia', after: 'Joel Armia', status: 'retained',
        notes: [
          'Projected on the fourth line alongside Samuel Helenius and Corey Perry',
        ],
      },
      {
        pos: 'L', before: 'Kevin Fiala', after: 'Kevin Fiala', status: 'retained',
        notes: [
          'Projected on the second line alongside Erik Haula and Mats Zuccarello',
        ],
      },
      {
        pos: 'C', before: 'Samuel Helenius', after: 'Samuel Helenius', status: 'retained',
        notes: [
          'Projected to centre the fourth line between Joel Armia and Corey Perry',
        ],
      },
      {
        pos: 'R', before: 'Adrian Kempe', after: 'Adrian Kempe', status: 'retained',
        notes: [
          'Projected on the first line alongside Artemi Panarin and Quinton Byfield',
        ],
      },
      {
        pos: 'R', before: 'Alex Laferriere', after: 'Alex Laferriere', status: 'retained',
        notes: [
          'Projected on the third line alongside Trevor Moore and Scott Laughton',
        ],
      },
      {
        pos: 'C', before: 'Scott Laughton', after: 'Scott Laughton', status: 'retained',
        notes: [
          'Projected to centre the third line between Trevor Moore and Alex Laferriere',
        ],
      },
      {
        pos: 'L', before: 'Trevor Moore', after: 'Trevor Moore', status: 'retained',
        notes: [
          'Projected on the third line alongside Scott Laughton and Alex Laferriere',
        ],
      },
      {
        pos: 'C', before: 'Alex Turcotte', after: 'Alex Turcotte', status: 'retained',
        notes: [
          'On the roster; not in NHL.com\'s projected lineup',
        ],
      },
      {
        pos: 'R', before: 'Taylor Ward', after: 'Taylor Ward', status: 'retained',
        notes: [
          'On the roster; not in NHL.com\'s projected lineup',
        ],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Largely intact, with Gustafsson added on a one-year deal — projected roles are NHL.com’s',
    rows: [
      {
        pos: 'RD', before: 'Drew Doughty', after: 'Drew Doughty', status: 'retained',
        notes: ['Projected on the top pair with Mikey Anderson'],
      },
      {
        pos: 'RD', before: 'Brandt Clarke', after: 'Brandt Clarke', status: 'retained',
        notes: ['Projected on the second pair with Joel Edmundson'],
      },
      {
        pos: 'D', before: null, after: 'Erik Gustafsson', status: 'added',
        notes: [
          'One year on Jul. 1 from Detroit',
          'Played only two NHL games last season, with 37 points in 39 AHL games',
        ],
      },
      {
        pos: 'D', before: 'Mikey Anderson', after: 'Mikey Anderson', status: 'retained',
        notes: [
          'Projected on the top pair with Drew Doughty',
        ],
      },
      {
        pos: 'D', before: 'Cody Ceci', after: 'Cody Ceci', status: 'retained',
        notes: [
          'Projected on the third pair with Brian Dumoulin',
        ],
      },
      {
        pos: 'D', before: 'Brian Dumoulin', after: 'Brian Dumoulin', status: 'retained',
        notes: [
          'Projected on the third pair with Cody Ceci',
        ],
      },
      {
        pos: 'D', before: 'Joel Edmundson', after: 'Joel Edmundson', status: 'retained',
        notes: [
          'Projected on the second pair with Brandt Clarke',
        ],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Unchanged: Kuemper and Forsberg',
    rows: [
      {
        pos: 'G', before: 'Darcy Kuemper', after: 'Darcy Kuemper', status: 'retained',
        notes: ['Projected starter'],
      },
      {
        pos: 'G', before: 'Anton Forsberg', after: 'Anton Forsberg', status: 'retained',
        notes: ['Projected backup'],
      },
    ],
  },
  {
    group: 'Coaching',
    summary: 'Laviolette hired on Jun. 9',
    rows: [
      {
        pos: 'Head coach', before: null, after: 'Peter Laviolette', status: 'added',
        notes: [
          'Hired Jun. 9 with a 846-562-161 record across 23 seasons and 1,594 games',
          'Won the Stanley Cup with Carolina in 2006; reached the Final with Philadelphia and Nashville',
        ],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'Twenty seasons ended',
    body: 'Anze Kopitar retired with 1,316 points in 1,521 games, two Stanley Cups and a decade as captain. Scott Laughton put it plainly: “You lose ‘Kopi,’ you’re not going to fill that role.”',
  },
  {
    title: 'Veterans on short money',
    body: 'Mats Zuccarello and Corey Perry signed for one year each and Erik Haula for two. None of it is a long-term commitment, and all of it is aimed at the centre depth Kopitar took with him.',
  },
  {
    title: 'A new coach with a long record',
    body: 'Peter Laviolette was hired Jun. 9. He arrives with 23 seasons behind NHL benches, a Cup with Carolina in 2006, and Final appearances with Philadelphia and Nashville.',
  },
]

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'Samuel Helenius', pos: 'C', note: 'Projected to centre the fourth line, one of the spots Kopitar’s retirement reshuffled.' },
]

export const unresolved = [
  { status: 'Open', item: 'The captaincy', impact: 'Vacant for the first time in a decade after Kopitar’s retirement' },
  { status: 'Open', item: 'Centre depth', impact: 'The reset names this as the outstanding need behind Byfield and Haula' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Kings 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/los-angeles-kings-roster-changes-for-2026-27-season' },
  { label: 'Official Kings news', url: 'https://www.nhl.com/kings/news/' },
]

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}

// LAK cap data, PuckPedia, retrieved Aug. 19, 2026.
export const cap = {
  capSummary: {
    ceiling: 104_000_000,
    capHit: 102_225_000,
    space: 1_775_000,
    rosterSlots: '23 / 23',
    potentialBonuses: 6_000_000,
    asOf: 'Aug. 19, 2026',
  },
  capGroups: [
    { key: 'F', label: 'Forwards', color: 'var(--cap-forwards)', total: 58_250_000 },
    { key: 'D', label: 'Defense', color: 'var(--cap-defense)', total: 35_875_000 },
    { key: 'G', label: 'Goaltending', color: 'var(--cap-goalies)', total: 7_500_000 },
    { key: 'O', label: 'Retained & buyouts', color: 'var(--cap-other)', total: 600_000 },
  ],
  capHits: [
    { name: 'Artemi Panarin', group: 'F', hit: 11_000_000 },
    { name: 'Adrian Kempe', group: 'F', hit: 10_625_000 },
    { name: 'Kevin Fiala', group: 'F', hit: 7_875_000 },
    { name: 'Quinton Byfield', group: 'F', hit: 6_250_000 },
    { name: 'Trevor Moore', group: 'F', hit: 4_200_000 },
    { name: 'Alex Laferriere', group: 'F', hit: 4_100_000 },
    { name: 'Erik Haula', group: 'F', hit: 3_600_000 },
    { name: 'Scott Laughton', group: 'F', hit: 3_500_000 },
    { name: 'Joel Armia', group: 'F', hit: 2_500_000 },
    { name: 'Corey Perry', group: 'F', hit: 1_000_000 },
    { name: 'Mats Zuccarello', group: 'F', hit: 1_000_000 },
    { name: 'Samuel Helenius', group: 'F', hit: 875_000 },
    { name: 'Taylor Ward', group: 'F', hit: 875_000 },
    { name: 'Alex Turcotte', group: 'F', hit: 850_000 },
    { name: 'Drew Doughty', group: 'D', hit: 11_000_000 },
    { name: 'Brandt Clarke', group: 'D', hit: 7_400_000 },
    { name: 'Cody Ceci', group: 'D', hit: 4_500_000 },
    { name: 'Mikey Anderson', group: 'D', hit: 4_125_000 },
    { name: 'Brian Dumoulin', group: 'D', hit: 4_000_000 },
    { name: 'Joel Edmundson', group: 'D', hit: 3_850_000 },
    { name: 'Erik Gustafsson', group: 'D', hit: 1_000_000 },
    { name: 'Darcy Kuemper', group: 'G', hit: 5_250_000 },
    { name: 'Anton Forsberg', group: 'G', hit: 2_250_000 },
    { name: 'BUYOUT', group: 'O', hit: 600_000, charge: 'buyout' },
  ],
}

export { STATUS, RUMOR_STATUS }
