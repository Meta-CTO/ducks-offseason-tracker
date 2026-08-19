import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/SJS.json'
import { pointsFromLeague } from './_derive'

// San Jose Sharks editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Sharks team reset for the 2026-27 season. Cap
// figures and the active injury table have not been read from PuckPedia for
// this club yet, so there is no cap tab. Every "after" lineup is a projection
// until the club announces a roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'San Jose Sharks',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['They paid Celebrini.', 'Then they bought a defense.'],
  deck:
    'Macklin Celebrini signed for five years and $94 million on Jul. 29 after ' +
    'a 115-point season — more than the next two Sharks scorers combined. ' +
    'Around him the club stopped rebuilding and started buying: Jacob Trouba ' +
    'and Darnell Nurse on the blue line, Mason Marchment for secondary ' +
    'scoring, and the second overall pick straight into the lineup.',
}

export const ledgerRange = 'June 17 – July 29'

export const departures = [
  { date: 'Jun. 23', player: 'William Eklund', pos: 'F', mechanism: 'Trade to Ottawa', detail: 'Traded with prospects Kasper Halttunen and Brandon Svoboda for the ninth overall pick after a 53-point season.' },
  { date: 'Jul. 1', player: 'Shakir Mukhamadullin', pos: 'D', mechanism: 'Trade to Edmonton', detail: 'Sent with prospect Zachary Sharp to acquire Darnell Nurse.' },
  { date: 'Jul. 1', player: 'Mario Ferraro', pos: 'D', mechanism: 'UFA', detail: 'Signed a three-year contract with Winnipeg after seven seasons and 490 games in San Jose.' },
  { date: 'Jul. 1', player: 'Vincent Desharnais', pos: 'D', mechanism: 'UFA', detail: 'Signed a four-year contract with Washington.' },
  { date: 'Jul. 1', player: 'Ryan Reaves', pos: 'F', mechanism: 'UFA', detail: 'Became an unrestricted free agent after 3 goals in 50 games.' },
  { date: 'Jul. 1', player: 'Philipp Kurashev', pos: 'F', mechanism: 'No qualifying offer', detail: 'Became a free agent after 20 points in 43 games.' },
]

export const arrivals = [
  { date: 'Jun. 17', player: 'Michael Kesselring', pos: 'D', deal: 'Trade from Buffalo; three years, $13.5M signed Jun. 29', role: 'Cost the 20th pick, returning the 26th; 29 points in 82 games in 2024-25' },
  { date: 'Jul. 1', player: 'Jacob Trouba', pos: 'D', deal: 'Four years', role: 'From Anaheim; projected right side of the top pair' },
  { date: 'Jul. 1', player: 'Darnell Nurse', pos: 'D', deal: 'Trade from Edmonton', role: 'For Mukhamadullin and Zachary Sharp; projected left side of the second pair' },
  { date: 'Jul. 1', player: 'Mason Marchment', pos: 'F', deal: 'Five years', role: 'Secondary scoring; 45 points in 68 games last season' },
  { date: 'Jul. 1', player: 'Eric Comrie', pos: 'G', deal: 'Two years', role: 'Competes with Alex Nedeljkovic for the backup job' },
  { date: 'Jul. 2', player: 'Ivar Stenberg', pos: 'F', deal: 'Three-year entry-level contract', role: 'Second overall pick; projected on the third line' },
  { date: 'Jul. 29', player: 'Macklin Celebrini', pos: 'C', deal: 'Five years, $94M ($18.8M AAV)', role: 'Re-signed after a 115-point season' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Celebrini signed long term; Eklund traded for the ninth pick; Marchment and Stenberg in',
    rows: [
      {
        pos: 'C', before: 'Macklin Celebrini', after: 'Macklin Celebrini', status: 'retained',
        notes: [
          'Signed Jul. 29 for five years and $94M — an $18.8M cap hit',
          '45 goals and 70 assists for 115 points, more than the next two Sharks scorers combined',
          'Projected to centre the top line between Collin Graf and Will Smith',
        ],
      },
      {
        pos: 'F', before: 'William Eklund', after: null, status: 'departed',
        notes: [
          'Traded to Ottawa on Jun. 23 with two prospects for the ninth overall pick',
          '15 goals and 38 assists in 78 games',
        ],
      },
      {
        pos: 'F', before: null, after: 'Mason Marchment', status: 'added',
        notes: [
          'Five years on Jul. 1 after 45 points in 68 games',
          'Projected on the second line with Michael Misa and Igor Chernyshov',
        ],
      },
      {
        pos: 'LW', before: null, after: 'Ivar Stenberg', status: 'camp',
        notes: [
          'Second overall pick, signed to a three-year entry-level deal on Jul. 2',
          'Eighteen; projected onto the third line, which camp still has to confirm',
        ],
      },
      {
        pos: 'F', before: 'Ryan Reaves', after: null, status: 'departed',
        notes: ['Became a UFA after 3 goals in 50 games'],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Rebuilt entirely: Ferraro, Desharnais and Mukhamadullin out; Trouba, Nurse and Kesselring in',
    rows: [
      {
        pos: 'RD', before: null, after: 'Jacob Trouba', status: 'added',
        notes: [
          'Signed for four years on Jul. 1 after leaving Anaheim',
          '10 goals and 35 points in 81 games; projected right side of the top pair',
        ],
      },
      {
        pos: 'LD', before: null, after: 'Darnell Nurse', status: 'added',
        notes: [
          'Acquired from Edmonton on Jul. 1 for Mukhamadullin and a prospect',
          '167 blocked shots and 137 hits in 82 games; projected second pair',
        ],
      },
      {
        pos: 'RD', before: null, after: 'Michael Kesselring', status: 'added',
        notes: [
          'Acquired from Buffalo on Jun. 17 with the 26th pick for the 20th, then signed for three years and $13.5M',
          'Limited to 34 games last season after 29 points in 82 the year before',
        ],
      },
      {
        pos: 'D', before: 'Mario Ferraro', after: null, status: 'departed',
        notes: [
          'Signed a three-year contract with Winnipeg on Jul. 1',
          'Seven seasons and 490 games in San Jose, seventh all-time among Sharks defensemen',
        ],
      },
      {
        pos: 'D', before: 'Vincent Desharnais', after: null, status: 'departed',
        notes: ['Signed a four-year contract with Washington on Jul. 1'],
      },
      {
        pos: 'D', before: 'Shakir Mukhamadullin', after: null, status: 'departed',
        notes: ['Traded to Edmonton on Jul. 1 in the Nurse deal'],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Askarov projected to start; Comrie signed to push Nedeljkovic for the backup job',
    rows: [
      {
        pos: 'G', before: 'Yaroslav Askarov', after: 'Yaroslav Askarov', status: 'retained',
        notes: ['Projected starter'],
      },
      {
        pos: 'G', before: null, after: 'Eric Comrie', status: 'camp',
        notes: [
          'Two years on Jul. 1',
          'Competing with Alex Nedeljkovic for the backup job',
        ],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'The franchise player signed',
    body: 'Macklin Celebrini took five years and $94 million on Jul. 29 — an $18.8M cap hit — after scoring 115 points. That is more than the next two Sharks scorers put together, which is both the argument for the contract and the problem it does not solve.',
  },
  {
    title: 'A blue line bought outright',
    body: 'Mario Ferraro, Vincent Desharnais and Shakir Mukhamadullin all left. Jacob Trouba signed for four years, Darnell Nurse arrived from Edmonton, and Michael Kesselring cost a pick swap and three years at $13.5M.',
  },
  {
    title: 'Eklund sold for a pick',
    body: 'A 53-point winger went to Ottawa on Jun. 23, with two prospects, for the ninth overall selection. San Jose used the second overall pick on Ivar Stenberg and signed him immediately.',
  },
]

// Not researched from a primary source yet; the reset lists the top selections
// in prose but not the full class.
export const draftClass = []

export const campWatch = [
  { name: 'Ivar Stenberg', pos: 'LW', note: 'Second overall pick, eighteen, projected straight onto the third line.' },
  { name: 'Eric Comrie', pos: 'G', note: 'Signed to compete with Alex Nedeljkovic for the backup job.' },
  { name: 'Will Smith', pos: 'C/RW', note: 'Projected on the top line; the reset names his scoring progression as an open question.' },
]

export const unresolved = [
  { status: 'Open', item: 'Secondary scoring', impact: 'Celebrini outscored the next two Sharks combined; the reset names this as the need' },
  { status: 'Open', item: 'Whether Stenberg can hold an NHL job', impact: 'Third-line left wing, at eighteen' },
  { status: 'Open', item: 'Comrie vs. Nedeljkovic', impact: 'Backup goaltender' },
  { status: 'Open', item: 'Cap and contract detail', impact: 'Not yet verified against PuckPedia, so this club has no cap tab' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Sharks 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/san-jose-sharks-roster-changes-for-2026-27-season' },
  { label: 'Official Sharks news', url: 'https://www.nhl.com/sharks/news/' },
]

export const points = pointsFromLeague(league)
export const contracts = {}

export { STATUS, RUMOR_STATUS }
