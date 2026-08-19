import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/LAK.json'
import draft from '../draft/LAK.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// Los Angeles Kings editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Kings team reset for the 2026-27 season. Cap
// figures and the active injury table have not been read from PuckPedia for
// this club yet, so there is no cap tab. Every "after" lineup is a projection
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
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Kopitar retired and Kuzmenko left; Zuccarello, Haula and Perry signed on one- and two-year deals',
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
    ],
  },
  {
    group: 'Defense',
    summary: 'Largely intact, with Gustafsson added on a one-year deal',
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
  { status: 'Open', item: 'Cap and contract detail', impact: 'Not yet verified against PuckPedia, so this club has no cap tab' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Kings 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/los-angeles-kings-roster-changes-for-2026-27-season' },
  { label: 'Official Kings news', url: 'https://www.nhl.com/kings/news/' },
]

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}

export { STATUS, RUMOR_STATUS }
