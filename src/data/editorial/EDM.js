import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/EDM.json'
import draft from '../draft/EDM.json'
import { pointsFromLeague, draftFromApi } from './_derive'

// Edmonton Oilers editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Oilers team reset for the 2026-27 season. Cap
// figures and the active injury table have not been read from PuckPedia for
// this club yet, so there is no cap tab. Every "after" lineup is a projection
// until the club announces a roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'Edmonton Oilers',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['New coach. New crease.', 'Same two players.'],
  deck:
    'Edmonton changed almost everything around Connor McDavid and Leon ' +
    'Draisaitl. Kris Knoblauch was fired in May and Mike Babcock hired in ' +
    'June; Darnell Nurse was traded to San Jose after eleven seasons; and the ' +
    'goaltending was rebuilt again, this time around 36-year-old Frederik ' +
    'Andersen. Here is what changed, and what camp still has to settle.',
}

export const ledgerRange = 'May 14 – July 5'

export const departures = [
  { date: 'Jul. 1', player: 'Darnell Nurse', pos: 'D', mechanism: 'Trade to San Jose', detail: 'Traded after eleven seasons for Shakir Mukhamadullin and prospect Zachary Sharp.' },
  { date: 'Jul. 1', player: 'Jack Roslovic', pos: 'F', mechanism: 'UFA', detail: 'Signed a two-year contract with Toronto.' },
  { date: 'Jul. 1', player: 'Calvin Pickard', pos: 'G', mechanism: 'UFA', detail: 'Signed a one-year contract with Minnesota.' },
  { date: 'Jul. 1', player: 'Adam Henrique', pos: 'F', mechanism: 'UFA', detail: 'Became an unrestricted free agent.' },
  { date: 'Jul. 1', player: 'Connor Ingram', pos: 'G', mechanism: 'UFA', detail: 'Became an unrestricted free agent.' },
  { date: 'Jul. 1', player: 'Curtis Lazar', pos: 'F', mechanism: 'UFA', detail: 'Not re-signed.' },
  { date: 'May 14', player: 'Kris Knoblauch', pos: 'Head coach', mechanism: 'Fired', detail: 'Dismissed after three seasons behind the bench.' },
]

export const arrivals = [
  { date: 'Jun. 23', player: 'Mike Babcock', pos: 'Head coach', deal: 'Hired', role: 'Replaces Kris Knoblauch; 700 career NHL wins' },
  { date: 'Jul. 1', player: 'Frederik Andersen', pos: 'G', deal: 'One year, $2.8M', role: 'Projected starter; 36-year-old Stanley Cup winner from Carolina' },
  { date: 'Jul. 1', player: 'Ryan Shea', pos: 'D', deal: 'Five years', role: 'From Pittsburgh after 35 points in 80 games; projected third pair' },
  { date: 'Jul. 1', player: 'Shakir Mukhamadullin', pos: 'D', deal: 'Trade from San Jose; two years, $3.5M signed Jul. 5', role: 'Came back in the Nurse deal with Zachary Sharp' },
  { date: 'Jul. 1', player: 'Mathieu Joseph', pos: 'F', deal: 'One year', role: 'Bottom-six forward depth' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'The top of the lineup is untouched; Roslovic, Henrique and Lazar out, Joseph in',
    rows: [
      {
        pos: 'C', before: 'Connor McDavid', after: 'Connor McDavid', status: 'retained',
        notes: ['Projected to centre the top line between Ryan Nugent-Hopkins and Zach Hyman'],
      },
      {
        pos: 'C', before: 'Leon Draisaitl', after: 'Leon Draisaitl', status: 'retained',
        notes: ['Projected to centre the second line with Vasily Podkolzin and Matthew Savoie'],
      },
      {
        pos: 'F', before: 'Jack Roslovic', after: null, status: 'departed',
        notes: ['Signed a two-year contract with Toronto on Jul. 1'],
      },
      {
        pos: 'F', before: 'Adam Henrique', after: null, status: 'departed',
        notes: ['Became a UFA and was not re-signed'],
      },
      {
        pos: 'F', before: null, after: 'Mathieu Joseph', status: 'added',
        notes: [
          'Signed for one year on Jul. 1',
          'Projected on the fourth line with Samanski and Frederic',
        ],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Nurse traded after eleven seasons; Shea and Mukhamadullin in',
    rows: [
      {
        pos: 'D', before: 'Darnell Nurse', after: null, status: 'departed',
        notes: [
          'Traded to San Jose on Jul. 1 after eleven seasons',
          'Returned Shakir Mukhamadullin and prospect Zachary Sharp',
          '7 goals, 17 assists, 167 blocked shots and 137 hits in 82 games',
        ],
      },
      {
        pos: 'D', before: null, after: 'Ryan Shea', status: 'added',
        notes: [
          'Signed for five years on Jul. 1 after 35 points in 80 games with Pittsburgh',
          'Projected on the third pair alongside Mukhamadullin',
        ],
      },
      {
        pos: 'D', before: null, after: 'Shakir Mukhamadullin', status: 'added',
        notes: [
          'Acquired in the Nurse trade and signed Jul. 5 for two years at $3.5M',
        ],
      },
      {
        pos: 'D', before: 'Evan Bouchard', after: 'Evan Bouchard', status: 'retained',
        notes: ['Projected on the top pair with Mattias Ekholm'],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Rebuilt again: Pickard and Ingram out, Andersen in alongside Jarry',
    rows: [
      {
        pos: 'G', before: null, after: 'Frederik Andersen', status: 'added',
        notes: [
          'One year at $2.8M on Jul. 1',
          'Thirty-six, and a Stanley Cup winner with Carolina',
        ],
      },
      {
        pos: 'G', before: 'Calvin Pickard', after: null, status: 'departed',
        notes: ['Signed a one-year contract with Minnesota on Jul. 1'],
      },
      {
        pos: 'G', before: 'Connor Ingram', after: null, status: 'departed',
        notes: ['Became a UFA'],
      },
    ],
  },
  {
    group: 'Coaching',
    summary: 'Knoblauch out in May, Babcock in on Jun. 23',
    rows: [
      {
        pos: 'Head coach', before: 'Kris Knoblauch', after: 'Mike Babcock', status: 'added',
        notes: [
          'Knoblauch was fired on May 14 after three seasons',
          'Babcock was hired Jun. 23 and brings 700 career NHL wins',
        ],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'A new voice behind the bench',
    body: 'Kris Knoblauch was fired on May 14 and Mike Babcock hired on Jun. 23. Babcock arrives with 700 career wins to a roster whose window is defined by the two players at the top of it.',
  },
  {
    title: 'Nurse traded after eleven seasons',
    body: 'Darnell Nurse went to San Jose on Jul. 1 for Shakir Mukhamadullin and a prospect. He had played his entire NHL career in Edmonton and led the club in blocked shots.',
  },
  {
    title: 'The crease turned over again',
    body: 'Calvin Pickard and Connor Ingram both left, and Frederik Andersen signed for one year at $2.8M. The projected tandem is Andersen and Jarry.',
  },
]

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'Matthew Savoie', pos: 'F', note: 'Projected onto the second line beside Draisaitl; a projection rather than a decision.' },
  { name: 'Shakir Mukhamadullin', pos: 'D', note: 'Arrived in the Nurse trade and is projected onto the third pair.' },
]

export const unresolved = [
  { status: 'Open', item: 'How Babcock uses the bottom six', impact: 'Three of last season’s forwards left as free agents' },
  { status: 'Open', item: 'The goaltending tandem', impact: 'Andersen is 36 and the crease has turned over in consecutive summers' },
  { status: 'Open', item: 'Replacing Nurse’s minutes', impact: 'Blue line lost 82 games of top-four defense' },
  { status: 'Open', item: 'Cap and contract detail', impact: 'Not yet verified against PuckPedia, so this club has no cap tab' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Oilers 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/edmonton-oilers-roster-changes-for-2026-27-season' },
  { label: 'Official Oilers news', url: 'https://www.nhl.com/oilers/news/' },
]

export const points = pointsFromLeague(league)
export const contracts = {}

export { STATUS, RUMOR_STATUS }
