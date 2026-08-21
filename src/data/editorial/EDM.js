import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/EDM.json'
import draft from '../draft/EDM.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// Edmonton Oilers editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Oilers team reset for the 2026-27 season. Cap
// figures read from PuckPedia on Aug. 19, 2026. Every "after" lineup is a projection
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
  { date: 'Jul. 1', player: 'Frederik Andersen', pos: 'G', deal: 'One year; $1M cap hit', role: 'From Carolina at thirty-six. The reset describes the deal as $2.8M; PuckPedia carries a $1M cap hit against $2.8M of team potential bonuses, the usual shape of a 35-plus contract' },
  { date: 'Jul. 1', player: 'Ryan Shea', pos: 'D', deal: 'Five years', role: 'From Pittsburgh after 35 points in 80 games; projected third pair' },
  { date: 'Jul. 1', player: 'Shakir Mukhamadullin', pos: 'D', deal: 'Trade from San Jose; two years, $3.5M signed Jul. 5', role: 'Came back in the Nurse deal with Zachary Sharp' },
  { date: 'Jul. 1', player: 'Mathieu Joseph', pos: 'F', deal: 'One year', role: 'Bottom-six forward depth' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'The top of the lineup is untouched; Roslovic, Henrique and Lazar out, Joseph in — projected roles are NHL.com’s',
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
      {
        pos: 'C', before: 'Colton Dach', after: 'Colton Dach', status: 'retained',
        notes: [
          'On the roster; not in NHL.com\'s projected lineup',
        ],
      },
      {
        pos: 'C', before: 'Jason Dickinson', after: 'Jason Dickinson', status: 'retained',
        notes: [
          'Projected to centre the third line between Isaac Howard and Kasperi Kapanen',
        ],
      },
      {
        pos: 'C', before: 'Trent Frederic', after: 'Trent Frederic', status: 'retained',
        notes: [
          'Projected on the fourth line alongside Mathieu Joseph and Josh Samanski',
        ],
      },
      {
        pos: 'L', before: 'Zach Hyman', after: 'Zach Hyman', status: 'retained',
        notes: [
          'Projected on the first line alongside Ryan Nugent-Hopkins and Connor McDavid',
        ],
      },
      {
        pos: 'C', before: 'Mattias Janmark', after: 'Mattias Janmark', status: 'retained',
        notes: [
          'On the roster; not in NHL.com\'s projected lineup',
        ],
      },
      {
        pos: 'L', before: 'Max Jones', after: 'Max Jones', status: 'retained',
        notes: [
          'On the roster; not in NHL.com\'s projected lineup',
        ],
      },
      {
        pos: 'R', before: 'Kasperi Kapanen', after: 'Kasperi Kapanen', status: 'retained',
        notes: [
          'Projected on the third line alongside Isaac Howard and Jason Dickinson',
        ],
      },
      {
        pos: 'C', before: 'Ryan Nugent-Hopkins', after: 'Ryan Nugent-Hopkins', status: 'retained',
        notes: [
          'Projected on the first line alongside Connor McDavid and Zach Hyman',
        ],
      },
      {
        pos: 'R', before: 'Vasily Podkolzin', after: 'Vasily Podkolzin', status: 'retained',
        notes: [
          'Projected on the second line alongside Leon Draisaitl and Matthew Savoie',
        ],
      },
      {
        pos: 'C', before: 'Josh Samanski', after: 'Josh Samanski', status: 'retained',
        notes: [
          'Projected to centre the fourth line between Mathieu Joseph and Trent Frederic',
        ],
      },
      {
        pos: 'C', before: 'Matt Savoie', after: 'Matt Savoie', status: 'retained',
        notes: [
          'On the roster; not in NHL.com\'s projected lineup',
        ],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Nurse traded after eleven seasons; Shea and Mukhamadullin in — projected roles are NHL.com’s',
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
      {
        pos: 'D', before: 'Mattias Ekholm', after: 'Mattias Ekholm', status: 'retained',
        notes: [
          'Projected on the top pair with Evan Bouchard',
        ],
      },
      {
        pos: 'D', before: 'Ty Emberson', after: 'Ty Emberson', status: 'retained',
        notes: [
          'On the roster; not in NHL.com\'s projected lineup',
        ],
      },
      {
        pos: 'D', before: 'Connor Murphy', after: 'Connor Murphy', status: 'retained',
        notes: [
          'Projected on the second pair with Jake Walman',
        ],
      },
      {
        pos: 'D', before: 'Spencer Stastney', after: 'Spencer Stastney', status: 'retained',
        notes: [
          'On the roster; not in NHL.com\'s projected lineup',
        ],
      },
      {
        pos: 'D', before: 'Jake Walman', after: 'Jake Walman', status: 'retained',
        notes: [
          'Projected on the second pair with Connor Murphy',
        ],
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
          'One year on Jul. 1, carrying a $1M cap hit per PuckPedia',
          'The reset states $2.8M, which matches Edmonton’s potential-bonus total — a 35-plus deal loaded with bonuses rather than salary',
          'Thirty-six, and a Stanley Cup winner with Carolina',
        ],
      },
      {
        pos: 'G', before: 'Tristan Jarry', after: 'Tristan Jarry', status: 'retained',
        notes: [
          'Carries $5.38M, the largest goaltending cap hit on the roster',
          'The reset projects the tandem as Andersen and Jarry',
        ],
      },
      {
        pos: 'G', before: null, after: 'Devon Levi', status: 'added',
        notes: ['Acquired from Buffalo on Jul. 1 for a 2028 third-round pick'],
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
  { name: 'Matt Savoie', pos: 'F', note: 'Projected onto the second line beside Draisaitl; a projection rather than a decision.' },
  { name: 'Shakir Mukhamadullin', pos: 'D', note: 'Arrived in the Nurse trade and is projected onto the third pair.' },
]

export const unresolved = [
  { status: 'Open', item: 'How Babcock uses the bottom six', impact: 'Three of last season’s forwards left as free agents' },
  { status: 'Open', item: 'The goaltending tandem', impact: 'Andersen is 36 and the crease has turned over in consecutive summers' },
  { status: 'Open', item: 'Replacing Nurse’s minutes', impact: 'Blue line lost 82 games of top-four defense' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Oilers 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/edmonton-oilers-roster-changes-for-2026-27-season' },
  { label: 'Official Oilers news', url: 'https://www.nhl.com/oilers/news/' },
]

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}

// EDM cap data, PuckPedia, retrieved Aug. 19, 2026.
export const cap = {
  capSummary: {
    ceiling: 104_000_000,
    capHit: 99_274_166,
    space: 4_725_834,
    rosterSlots: '23 / 23',
    potentialBonuses: 2_800_000,
    asOf: 'Aug. 19, 2026',
  },
  capGroups: [
    { key: 'F', label: 'Forwards', color: 'var(--cap-forwards)', total: 55_061_666 },
    { key: 'D', label: 'Defense', color: 'var(--cap-defense)', total: 34_175_000 },
    { key: 'G', label: 'Goaltending', color: 'var(--cap-goalies)', total: 7_187_500 },
    { key: 'O', label: 'Retained & buyouts', color: 'var(--cap-other)', total: 2_850_000 },
  ],
  capHits: [
    { name: 'Leon Draisaitl', group: 'F', hit: 14_000_000 },
    { name: 'Connor McDavid', group: 'F', hit: 12_500_000 },
    { name: 'Zach Hyman', group: 'F', hit: 5_500_000 },
    { name: 'Ryan Nugent-Hopkins', group: 'F', hit: 5_125_000 },
    { name: 'Jason Dickinson', group: 'F', hit: 4_000_000 },
    { name: 'Trent Frederic', group: 'F', hit: 3_850_000 },
    { name: 'Vasily Podkolzin', group: 'F', hit: 2_950_000 },
    { name: 'Kasperi Kapanen', group: 'F', hit: 2_600_000 },
    { name: 'Mattias Janmark', group: 'F', hit: 1_450_000 },
    { name: 'Colton Dach', group: 'F', hit: 1_200_000 },
    { name: 'Mathieu Joseph', group: 'F', hit: 1_000_000 },
    { name: 'Matt Savoie', group: 'F', hit: 886_666 },
    { name: 'Evan Bouchard', group: 'D', hit: 10_500_000 },
    { name: 'Jake Walman', group: 'D', hit: 7_000_000 },
    { name: 'Connor Murphy', group: 'D', hit: 4_100_000 },
    { name: 'Mattias Ekholm', group: 'D', hit: 4_000_000 },
    { name: 'Ryan Shea', group: 'D', hit: 4_000_000 },
    { name: 'Shakir Mukhamadullin', group: 'D', hit: 1_750_000 },
    { name: 'Spencer Stastney', group: 'D', hit: 1_525_000 },
    { name: 'Ty Emberson', group: 'D', hit: 1_300_000 },
    { name: 'Tristan Jarry', group: 'G', hit: 5_375_000 },
    { name: 'Frederik Andersen', group: 'G', hit: 1_000_000 },
    { name: 'Devon Levi', group: 'G', hit: 812_500 },
    { name: 'BUYOUT', group: 'O', hit: 2_600_000, charge: 'buyout' },
    { name: 'Bonus Carryover Overage', group: 'O', hit: 250_000, charge: 'buyout' },
  ],
}

export { STATUS, RUMOR_STATUS }
