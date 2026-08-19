import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/WSH.json'
import draft from '../draft/WSH.json'
import { pointsFromLeague, draftFromApi } from './_derive'

// Washington Capitals editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Capitals team reset for the 2026-27 season. Cap
// figures have not been read from PuckPedia for this club yet, so there is no
// cap tab. Every "after" lineup is a projection until the club announces a
// roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'Washington Capitals',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['Ovechkin came back at forty.', 'They bought him wingers.'],
  deck:
    'Alex Ovechkin returns for a 22nd season, and Washington spent the summer ' +
    'putting scoring around him. Alex Tuch signed for eight years in a ' +
    'sign-and-trade with Buffalo, Jordan Kyrou cost Connor McMichael and a ' +
    'first-round pick, and Boone Jenner arrived from Columbus after thirteen ' +
    'seasons there. Rasmus Sandin is out after ACL surgery.',
}

export const ledgerRange = 'June 23 – July 2'

export const departures = [
  { date: 'Jun. 23', player: 'Connor McMichael', pos: 'F', mechanism: 'Trade to St. Louis', detail: 'Sent with Milton Gastrin and the 16th pick for Jordan Kyrou; signed a six-year contract with St. Louis on Jul. 16.' },
  { date: 'Jun. 25', player: 'Hendrix Lapierre', pos: 'F', mechanism: 'Trade to Pittsburgh', detail: 'Returned a 2027 third and a 2028 fifth-round pick.' },
  { date: 'Jun. 25', player: 'Declan Chisholm', pos: 'D', mechanism: 'Trade to New Jersey', detail: 'Returned a 2027 fourth-round pick.' },
  { date: 'Jul. 1', player: 'Trevor van Riemsdyk', pos: 'D', mechanism: 'UFA', detail: 'Signed a two-year contract with Pittsburgh after 14 points in 68 games.' },
  { date: 'Jul. 2', player: 'Brandon Duhaime', pos: 'F', mechanism: 'UFA', detail: 'Signed a three-year contract with Toronto.' },
]

export const arrivals = [
  { date: 'Jun. 23', player: 'Jordan Kyrou', pos: 'F', deal: 'Trade from St. Louis', role: 'Cost Connor McMichael, Milton Gastrin and the 16th pick; projected top line' },
  { date: 'Jun. 24', player: 'Alex Tuch', pos: 'F', deal: 'Eight years; sign-and-trade from Buffalo', role: 'Buffalo received David Kampf and a 2027 third; projected second line' },
  { date: 'Jul. 1', player: 'Boone Jenner', pos: 'C', deal: 'Four years', role: 'Columbus’ captain for five of his thirteen seasons; projected fourth line' },
  { date: 'Jul. 1', player: 'Vincent Desharnais', pos: 'D', deal: 'Four years', role: 'Six-foot-seven; from San Jose; projected third pair' },
  { date: 'Jul. 1', player: 'Jonny Brodzinski', pos: 'F', deal: 'Signed', role: 'From the N.Y. Rangers after 16 points in 55 games' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Ovechkin returns at forty; Tuch, Kyrou and Jenner all added; McMichael traded',
    rows: [
      {
        pos: 'LW', before: 'Alex Ovechkin', after: 'Alex Ovechkin', status: 'retained',
        notes: [
          'Returns for a 22nd season at forty',
          'Projected on the top line with Dylan Strome and Jordan Kyrou',
        ],
      },
      {
        pos: 'RW', before: null, after: 'Alex Tuch', status: 'added',
        notes: [
          'Agreed an eight-year contract on Jun. 24 and was traded from Buffalo the same day',
          'Buffalo received David Kampf and a 2027 third; 33 goals and 66 points last season',
          'Projected on the second line with Pierre-Luc Dubois and Tom Wilson',
        ],
      },
      {
        pos: 'RW', before: null, after: 'Jordan Kyrou', status: 'added',
        notes: [
          'Acquired from St. Louis on Jun. 23 for Connor McMichael, Milton Gastrin and the 16th pick',
          'A three-time 30-goal scorer; projected top line',
        ],
      },
      {
        pos: 'F', before: 'Connor McMichael', after: null, status: 'departed',
        notes: [
          'Traded to St. Louis on Jun. 23 in the Kyrou deal, then signed there for six years on Jul. 16',
          '46 points in 78 games',
        ],
      },
      {
        pos: 'C', before: null, after: 'Boone Jenner', status: 'added',
        notes: [
          'Four years on Jul. 1 after thirteen seasons in Columbus, five as captain',
          'Projected to centre the fourth line',
        ],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'van Riemsdyk and Chisholm out; Desharnais signed for four years; Sandin out injured',
    rows: [
      {
        pos: 'D', before: 'Rasmus Sandin', after: 'Rasmus Sandin', status: 'injured',
        notes: ['Out following ACL surgery; does not appear in the projected lineup'],
      },
      {
        pos: 'D', before: null, after: 'Vincent Desharnais', status: 'added',
        notes: [
          'Four years on Jul. 1 from San Jose',
          'Six-foot-seven; projected on the third pair with Cole Hutson',
        ],
      },
      {
        pos: 'LD', before: 'Jakob Chychrun', after: 'Jakob Chychrun', status: 'retained',
        notes: ['Projected on the top pair with Matt Roy'],
      },
      {
        pos: 'D', before: 'Trevor van Riemsdyk', after: null, status: 'departed',
        notes: ['Signed a two-year contract with Pittsburgh on Jul. 1'],
      },
      {
        pos: 'LD', before: null, after: 'Cole Hutson', status: 'camp',
        notes: ['A rookie defenseman the reset names as a Calder Trophy candidate'],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Unchanged: Thompson and Lindgren',
    rows: [
      {
        pos: 'G', before: 'Logan Thompson', after: 'Logan Thompson', status: 'retained',
        notes: ['Projected starter'],
      },
      {
        pos: 'G', before: 'Charlie Lindgren', after: 'Charlie Lindgren', status: 'retained',
        notes: ['Projected backup'],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'Eight years for Alex Tuch, in a sign-and-trade',
    body: 'He agreed the contract on Jun. 24 and was traded from Buffalo the same day, for David Kampf and a 2027 third. Kampf never played for Buffalo — he signed in Czechia two weeks later.',
  },
  {
    title: 'A first-round pick and McMichael for Kyrou',
    body: 'Washington sent Connor McMichael, Milton Gastrin and the 16th selection to St. Louis on Jun. 23. Both McMichael and Kyrou scored 46 points last season; Kyrou has three 30-goal years behind him.',
  },
  {
    title: 'Ovechkin at forty, with new wingers',
    body: 'A 22nd season, and the two forwards acquired this summer are projected on the top two lines. Boone Jenner, Columbus’ captain of five years, was added on a four-year deal to centre the fourth.',
  },
]

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'Cole Hutson', pos: 'LD', note: 'A rookie defenseman the reset names as a Calder Trophy candidate.' },
  { name: 'Ivan Protas', pos: 'C', note: 'Projected to centre the third line alongside his brother Aliaksei.' },
  { name: 'Ryan Leonard', pos: 'RW', note: 'Projected onto the third line.' },
]

export const unresolved = [
  { status: 'Open', item: 'Rasmus Sandin’s knee', impact: 'Out after ACL surgery; not in the projected lineup' },
  { status: 'Open', item: 'Whether Cole Hutson holds a top-six defense job', impact: 'Projected onto the third pair as a rookie' },
  { status: 'Open', item: 'Cap and contract detail', impact: 'Not yet verified against PuckPedia, so this club has no cap tab' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Capitals 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/washington-capitals-roster-changes-for-2026-27-season' },
  { label: 'Official Capitals news', url: 'https://www.nhl.com/capitals/news/' },
]

export const points = pointsFromLeague(league)
export const contracts = {}

export { STATUS, RUMOR_STATUS }
