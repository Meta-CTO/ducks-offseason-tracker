import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/TBL.json'
import draft from '../draft/TBL.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// Tampa Bay Lightning editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Lightning team reset for the 2026-27 season. Cap
// figures read from PuckPedia on Aug. 19, 2026. Every "after" lineup is a projection until the club announces a
// roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'Tampa Bay Lightning',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['They kept their powder dry.', 'Kucherov’s contract is still open.'],
  deck:
    'Tampa Bay lost a 70-point defenseman to a Toronto sign-and-trade, let ' +
    'three forwards walk, and replaced them with John Carlson and Ilya ' +
    'Mikheyev. The general manager’s stated logic was to avoid commitments ' +
    'that would block a bigger opportunity later. The largest piece of ' +
    'unfinished business is Nikita Kucherov, eligible to re-sign and ' +
    'unrestricted after this season.',
}

export const ledgerRange = 'June 19 – July 1'

export const departures = [
  { date: 'Jun. 19', player: 'Darren Raddysh', pos: 'D', mechanism: 'Sign-and-trade to Toronto', detail: 'Agreed an eight-year contract with Toronto; Tampa Bay received a 2026 fifth-round pick after his career-high 70 points in 73 games.' },
  { date: 'Jul. 1', player: 'Nick Paul', pos: 'F', mechanism: 'Trade to Toronto', detail: 'Sent for Dennis Hildeby, a 2027 fourth and a 2028 third, after five seasons with the club.' },
  { date: 'Jul. 1', player: 'Corey Perry', pos: 'F', mechanism: 'UFA', detail: 'Signed a one-year contract with Los Angeles at forty-one.' },
  { date: 'Jul. 1', player: 'Oliver Bjorkstrand', pos: 'F', mechanism: 'UFA', detail: 'Signed a one-year contract with the N.Y. Rangers after 32 points in 80 games.' },
  { date: 'Jul. 1', player: 'Declan Carlile', pos: 'D', mechanism: 'UFA', detail: 'Signed a two-year contract with Pittsburgh.' },
]

export const arrivals = [
  { date: 'Jul. 1', player: 'John Carlson', pos: 'D', deal: 'Two years', role: 'Thirty-six, after 60 points in 71 games; projected third pair' },
  { date: 'Jul. 1', player: 'Ilya Mikheyev', pos: 'F', deal: 'Four years', role: 'From Chicago after 36 points in 77 games; projected third line' },
  { date: 'Jul. 1', player: 'Jeffrey Viel', pos: 'F', deal: 'Five years', role: 'Twenty-nine; spent last season between Boston and Anaheim' },
  { date: 'Jul. 1', player: 'Dennis Hildeby', pos: 'G', deal: 'Trade from Toronto', role: 'Arrived in the Nick Paul deal with two picks; projected backup' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Paul, Perry and Bjorkstrand out; Mikheyev and Viel in; Kucherov unsigned beyond this season — projected roles are NHL.com’s',
    rows: [
      {
        pos: 'RW', before: 'Nikita Kucherov', after: 'Nikita Kucherov', status: 'retained',
        notes: [
          'Hart Trophy winner on a $9.5M cap hit, eligible to re-sign after Jul. 1',
          'Becomes an unrestricted free agent after 2026-27; no extension has been announced',
          'Projected on the top line with Brayden Point and Jake Guentzel',
        ],
      },
      {
        pos: 'F', before: null, after: 'Ilya Mikheyev', status: 'added',
        notes: [
          'Four years on Jul. 1 after 36 points in 77 games with Chicago',
          'Projected on the third line with Zemgus Girgensons and Yanni Gourde',
        ],
      },
      {
        pos: 'F', before: 'Nick Paul', after: null, status: 'departed',
        notes: [
          'Traded to Toronto on Jul. 1 for Dennis Hildeby and two picks after five seasons',
        ],
      },
      {
        pos: 'F', before: 'Oliver Bjorkstrand', after: null, status: 'departed',
        notes: ['Signed with the N.Y. Rangers on Jul. 1; second on the team with 9 power-play goals'],
      },
      {
        pos: 'F', before: 'Corey Perry', after: null, status: 'departed',
        notes: ['Signed a one-year contract with Los Angeles on Jul. 1'],
      },
      {
        pos: 'C', before: null, after: 'Conor Geekie', status: 'camp',
        notes: [
          'Twenty-two, in the final year of his entry-level contract',
          'The reset projects an expanded role with Paul gone',
        ],
      },
      {
        pos: 'C', before: 'Anthony Cirelli', after: 'Anthony Cirelli', status: 'retained',
        notes: [
          'Projected to centre the second line between Brandon Hagel and Gage Goncalves',
        ],
      },
      {
        pos: 'C', before: 'Zemgus Girgensons', after: 'Zemgus Girgensons', status: 'retained',
        notes: [
          'Projected on the third line alongside Yanni Gourde and Ilya Mikheyev',
        ],
      },
      {
        pos: 'C', before: 'Gage Goncalves', after: 'Gage Goncalves', status: 'retained',
        notes: [
          'Projected on the second line alongside Brandon Hagel and Anthony Cirelli',
        ],
      },
      {
        pos: 'C', before: 'Yanni Gourde', after: 'Yanni Gourde', status: 'retained',
        notes: [
          'Projected to centre the third line between Zemgus Girgensons and Ilya Mikheyev',
        ],
      },
      {
        pos: 'C', before: 'Jake Guentzel', after: 'Jake Guentzel', status: 'retained',
        notes: [
          'Projected on the first line alongside Brayden Point and Nikita Kucherov',
        ],
      },
      {
        pos: 'L', before: 'Brandon Hagel', after: 'Brandon Hagel', status: 'retained',
        notes: [
          'Projected on the second line alongside Anthony Cirelli and Gage Goncalves',
        ],
      },
      {
        pos: 'R', before: 'Pontus Holmberg', after: 'Pontus Holmberg', status: 'retained',
        notes: [
          'Projected on the fourth line alongside Dominic James and Conor Geekie',
        ],
      },
      {
        pos: 'C', before: 'Dominic James', after: 'Dominic James', status: 'retained',
        notes: [
          'Projected to centre the fourth line between Pontus Holmberg and Conor Geekie',
        ],
      },
      {
        pos: 'C', before: 'Brayden Point', after: 'Brayden Point', status: 'retained',
        notes: [
          'Projected to centre the first line between Jake Guentzel and Nikita Kucherov',
        ],
      },
      {
        pos: 'R', before: 'Scott Sabourin', after: 'Scott Sabourin', status: 'retained',
        notes: [
          'On the roster; not in NHL.com\'s projected lineup',
        ],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Raddysh signed an eight-year deal with Toronto; Carlson signed for two — projected roles are NHL.com’s',
    rows: [
      {
        pos: 'D', before: 'Darren Raddysh', after: null, status: 'departed',
        notes: [
          'Sign-and-traded to Toronto on Jun. 19 on an eight-year contract',
          'A career-high 70 points in 73 games; Tampa Bay received a 2026 fifth-round pick',
        ],
      },
      {
        pos: 'RD', before: null, after: 'John Carlson', status: 'added',
        notes: [
          'Two years on Jul. 1 at thirty-six, after 60 points in 71 games',
          '785 points in 1,159 career games; projected third pair',
        ],
      },
      {
        pos: 'LD', before: 'Victor Hedman', after: 'Victor Hedman', status: 'retained',
        notes: ['Projected on the top pair with J.J. Moser'],
      },
      {
        pos: 'D', before: 'Declan Carlile', after: null, status: 'departed',
        notes: ['Signed a two-year contract with Pittsburgh on Jul. 1'],
      },
      {
        pos: 'D', before: 'Erik Cernak', after: 'Erik Cernak', status: 'retained',
        notes: [
          'Projected on the second pair with Ryan McDonagh',
        ],
      },
      {
        pos: 'D', before: 'Max Crozier', after: 'Max Crozier', status: 'retained',
        notes: [
          'On the roster; not in NHL.com\'s projected lineup',
        ],
      },
      {
        pos: 'D', before: 'Emil Lilleberg', after: 'Emil Lilleberg', status: 'retained',
        notes: [
          'On the roster; not in NHL.com\'s projected lineup',
        ],
      },
      {
        pos: 'D', before: 'Ryan McDonagh', after: 'Ryan McDonagh', status: 'retained',
        notes: [
          'Projected on the second pair with Erik Cernak',
        ],
      },
      {
        pos: 'D', before: 'J.J. Moser', after: 'J.J. Moser', status: 'retained',
        notes: [
          'Projected on the top pair with Victor Hedman',
        ],
      },
      {
        pos: 'D', before: 'Charle-Edouard D\'Astous', after: 'Charle-Edouard D\'Astous', status: 'retained',
        notes: [
          'Projected on the third pair with John Carlson',
        ],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Hildeby acquired from Toronto behind Vasilevskiy — projected roles are NHL.com’s',
    rows: [
      {
        pos: 'G', before: 'Andrei Vasilevskiy', after: 'Andrei Vasilevskiy', status: 'retained',
        notes: ['Projected starter'],
      },
      {
        pos: 'G', before: null, after: 'Dennis Hildeby', status: 'added',
        notes: [
          'Arrived from Toronto on Jul. 1 in the Nick Paul trade, with two picks',
          '2.86 GAA and .914 in 20 games; projected backup',
        ],
      },
      {
        pos: 'G', before: 'Jonas Johansson', after: 'Jonas Johansson', status: 'retained',
        notes: [
          'On the roster; not in NHL.com\'s projected lineup',
        ],
      },
    ],
  },
  {
    group: 'Coaching',
    summary: 'Jon Cooper returns behind the bench',
    rows: [
      {
        pos: 'Head coach', before: 'Jon Cooper', after: 'Jon Cooper', status: 'retained',
        notes: [
          'Listed as the club\'s head coach for both 2025–26 and 2026–27',
        ],
      },
      {
        pos: 'Assistant coach', before: 'Jeff Halpern', after: 'Jeff Halpern', status: 'onstaff',
        notes: [
          'Listed on the club\'s coaching staff for 2026–27',
        ],
      },
      {
        pos: 'Assistant coach', before: 'Rob Zettler', after: 'Rob Zettler', status: 'onstaff',
        notes: [
          'Listed on the club\'s coaching staff for 2026–27',
        ],
      },
      {
        pos: 'Assistant coach', before: 'Dan Hinote', after: 'Dan Hinote', status: 'onstaff',
        notes: [
          'Listed on the club\'s coaching staff for 2026–27',
        ],
      },
      {
        pos: 'Goaltending coach', before: 'Frantz Jean', after: 'Frantz Jean', status: 'onstaff',
        notes: [
          'Listed on the club\'s coaching staff for 2026–27',
        ],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'A 70-point defenseman, signed away',
    body: 'Darren Raddysh agreed an eight-year contract with Toronto on Jun. 19 in a sign-and-trade. Tampa Bay received a 2026 fifth-round pick for a player coming off a career-high 70 points.',
  },
  {
    title: 'Kucherov’s future is the open file',
    body: 'The Hart Trophy winner became eligible to re-sign after Jul. 1 and can reach unrestricted free agency after this season. Nothing has been announced.',
  },
  {
    title: 'Deliberately uncommitted',
    body: 'The general manager’s stated logic: “The idea was to not make commitments that would prevent us from taking advantage of bigger opportunities that would move the needle.” Tampa Bay has not won a playoff round since reaching the 2022 Final.',
  },
]

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'Conor Geekie', pos: 'C', note: 'Twenty-two, final year of his entry-level deal, projected into a bigger role after Paul’s departure.' },
  { name: 'Gage Goncalves', pos: 'F', note: 'Projected onto the second line with Brandon Hagel and Anthony Cirelli.' },
]

export const unresolved = [
  { status: 'Open', item: 'Nikita Kucherov’s contract', impact: 'UFA after 2026-27; eligible to re-sign now' },
  { status: 'Open', item: 'Replacing Raddysh’s 70 points', impact: 'Carlson is 36, costs $8.5M, and is projected on the third pair' },
  { status: 'Open', item: 'Room to extend Kucherov', impact: '$3.23M of space, and no buyouts or retained salary to clear' },
]

export const rumors = []

export const sources = [
  { label: 'Coaching staff (NHL.com club site)', url: 'https://www.nhl.com/lightning/team/hockey-staff' },
  { label: 'NHL.com Lightning 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/tampa-bay-lightning-roster-changes-for-2026-27-season' },
  { label: 'Official Lightning news', url: 'https://www.nhl.com/lightning/news/' },
]

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}

// TBL cap data, PuckPedia, retrieved Aug. 19, 2026.
export const cap = {
  capSummary: {
    ceiling: 104_000_000,
    capHit: 100_771_666,
    space: 3_228_334,
    rosterSlots: '23 / 23',
    potentialBonuses: 1_027_500,
    asOf: 'Aug. 19, 2026',
  },
  capGroups: [
    { key: 'F', label: 'Forwards', color: 'var(--cap-forwards)', total: 54_904_999 },
    { key: 'D', label: 'Defense', color: 'var(--cap-defense)', total: 34_275_000 },
    { key: 'G', label: 'Goaltending', color: 'var(--cap-goalies)', total: 11_591_667 },
  ],
  capHits: [
    { name: 'Nikita Kucherov', group: 'F', hit: 9_500_000 },
    { name: 'Brayden Point', group: 'F', hit: 9_500_000 },
    { name: 'Jake Guentzel', group: 'F', hit: 9_000_000 },
    { name: 'Brandon Hagel', group: 'F', hit: 6_500_000 },
    { name: 'Anthony Cirelli', group: 'F', hit: 6_250_000 },
    { name: 'Ilya Mikheyev', group: 'F', hit: 3_850_000 },
    { name: 'Jeffrey Viel', group: 'F', hit: 2_500_000 },
    { name: 'Yanni Gourde', group: 'F', hit: 2_333_333 },
    { name: 'Pontus Holmberg', group: 'F', hit: 1_550_000 },
    { name: 'Gage Goncalves', group: 'F', hit: 1_200_000 },
    { name: 'Zemgus Girgensons', group: 'F', hit: 925_000 },
    { name: 'Dominic James', group: 'F', hit: 910_000 },
    { name: 'Conor Geekie', group: 'F', hit: 886_666 },
    { name: 'John Carlson', group: 'D', hit: 8_500_000 },
    { name: 'Victor Hedman', group: 'D', hit: 8_000_000 },
    { name: 'J.J. Moser', group: 'D', hit: 6_750_000 },
    { name: 'Erik Cernak', group: 'D', hit: 5_200_000 },
    { name: 'Ryan McDonagh', group: 'D', hit: 4_100_000 },
    { name: 'Charle-Edouard D\'Astous', group: 'D', hit: 875_000 },
    { name: 'Emil Lilleberg', group: 'D', hit: 850_000 },
    { name: 'Andrei Vasilevskiy', group: 'G', hit: 9_500_000 },
    { name: 'Jonas Johansson', group: 'G', hit: 1_250_000 },
    { name: 'Dennis Hildeby', group: 'G', hit: 841_667 },
  ],
}

export { STATUS, RUMOR_STATUS }
