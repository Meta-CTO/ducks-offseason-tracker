import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/BOS.json'
import draft from '../draft/BOS.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// Boston Bruins editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Bruins team reset for the 2026-27 season. Cap
// figures read from PuckPedia on Aug. 19, 2026. Every "after" lineup is a projection until the club announces a
// roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'Boston Bruins',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['They spent two firsts on a winger.', 'The centre problem is older than that.'],
  deck:
    'Boston sent the 23rd pick and a conditional 2028 first to Utah for JJ ' +
    'Peterka, who is projected straight onto the top line beside David ' +
    'Pastrnak. What the summer did not solve is the one the reset names ' +
    'plainly: the club still has no first-line centre, and has not since ' +
    'Patrice Bergeron. Viktor Arvidsson and his 54 points left for Detroit.',
}

export const ledgerRange = 'June 26 – July 3'

export const departures = [
  { date: 'Jul. 1', player: 'Viktor Arvidsson', pos: 'F', mechanism: 'UFA', detail: 'Signed a two-year contract with Detroit after 25 goals and 54 points in 69 games.' },
  { date: 'Jul. 1', player: 'Joonas Korpisalo', pos: 'G', mechanism: 'Trade to N.Y. Rangers', detail: 'Returned forward Kalle Vaisanen and a 2028 fourth-round pick.' },
  { date: 'Jul. 3', player: 'Andrew Peeke', pos: 'D', mechanism: 'UFA', detail: 'Signed a one-year contract with Utah after 14 points in 77 games.' },
]

export const arrivals = [
  { date: 'Jun. 26', player: 'JJ Peterka', pos: 'F', deal: 'Trade from Utah; four years left on a five-year deal', role: 'Cost the 23rd pick and a conditional 2028 first; projected top line' },
  { date: 'Jul. 1', player: 'Will Borgen', pos: 'D', deal: 'Trade from N.Y. Rangers', role: 'Cost a 2027 second and a conditional 2028 third; projected second pair' },
  { date: 'Jul. 1', player: 'Connor Clifton', pos: 'D', deal: 'Two years', role: 'Returns to Boston; projected third pair' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Peterka bought with two first-round picks; Arvidsson left for Detroit — depth rows are from the roster feed and 2025–26 club stats, not individually researched',
    rows: [
      {
        pos: 'F', before: null, after: 'JJ Peterka', status: 'added',
        notes: [
          'Acquired from Utah on Jun. 26 for the 23rd pick and a conditional 2028 first',
          '25 goals and 47 points in 82 games, with four years left on his contract',
          'Projected on the top line with Pavel Zacha and David Pastrnak',
        ],
      },
      {
        pos: 'RW', before: 'David Pastrnak', after: 'David Pastrnak', status: 'retained',
        notes: ['Projected on the top line, now with Peterka'],
      },
      {
        pos: 'F', before: 'Viktor Arvidsson', after: null, status: 'departed',
        notes: [
          'Signed a two-year contract with Detroit on Jul. 1',
          '25 goals and 54 points in 69 games — the club’s most productive departure',
        ],
      },
      {
        pos: 'C', before: null, after: 'James Hagens', status: 'camp',
        notes: [
          'Nineteen, seventh overall in 2025, after 47 points in 34 games at Boston College',
          'Projected onto the third line; two regular-season games so far',
        ],
      },
      {
        pos: 'C', before: 'Michael Eyssimont', after: 'Michael Eyssimont', status: 'retained',
        notes: [
          'Played 56 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Morgan Geekie', after: 'Morgan Geekie', status: 'retained',
        notes: [
          'Played 81 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'L', before: 'Tanner Jeannot', after: 'Tanner Jeannot', status: 'retained',
        notes: [
          'Played 77 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Mark Kastelic', after: 'Mark Kastelic', status: 'retained',
        notes: [
          'Played 82 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Marat Khusnutdinov', after: 'Marat Khusnutdinov', status: 'retained',
        notes: [
          'Played 77 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Sean Kuraly', after: 'Sean Kuraly', status: 'retained',
        notes: [
          'Played 82 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Elias Lindholm', after: 'Elias Lindholm', status: 'retained',
        notes: [
          'Played 69 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Fraser Minten', after: 'Fraser Minten', status: 'retained',
        notes: [
          'Played 82 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Casey Mittelstadt', after: 'Casey Mittelstadt', status: 'retained',
        notes: [
          'Played 71 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Alex Steeves', after: 'Alex Steeves', status: 'retained',
        notes: [
          'Played 43 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Pavel Zacha', after: 'Pavel Zacha', status: 'retained',
        notes: [
          'Played 78 games for the club in 2025–26 and is on the current roster',
        ],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Peeke left for Utah; Borgen acquired and Clifton re-signed — depth rows are from the roster feed and 2025–26 club stats, not individually researched',
    rows: [
      {
        pos: 'RD', before: 'Charlie McAvoy', after: 'Charlie McAvoy', status: 'retained',
        notes: ['Projected on the top pair'],
      },
      {
        pos: 'RD', before: null, after: 'Will Borgen', status: 'added',
        notes: [
          'Acquired from the N.Y. Rangers on Jul. 1 for a 2027 second and a conditional 2028 third',
          '15 points and 18:03 a night in 75 games; projected second pair',
        ],
      },
      {
        pos: 'D', before: null, after: 'Connor Clifton', status: 'added',
        notes: ['Two years on Jul. 1, returning to Boston; projected third pair'],
      },
      {
        pos: 'D', before: 'Andrew Peeke', after: null, status: 'departed',
        notes: ['Signed a one-year contract with Utah on Jul. 3'],
      },
      {
        pos: 'D', before: 'Jonathan Aspirot', after: 'Jonathan Aspirot', status: 'retained',
        notes: [
          'Played 61 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'D', before: 'Jordan Harris', after: 'Jordan Harris', status: 'retained',
        notes: [
          'Played 8 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'D', before: 'Henri Jokiharju', after: 'Henri Jokiharju', status: 'retained',
        notes: [
          'Played 41 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'D', before: 'Hampus Lindholm', after: 'Hampus Lindholm', status: 'retained',
        notes: [
          'Played 67 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'D', before: 'Mason Lohrei', after: 'Mason Lohrei', status: 'retained',
        notes: [
          'Played 73 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'D', before: 'Nikita Zadorov', after: 'Nikita Zadorov', status: 'retained',
        notes: [
          'Played 81 games for the club in 2025–26 and is on the current roster',
        ],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Korpisalo traded to the Rangers; DiPietro projected as the backup',
    rows: [
      {
        pos: 'G', before: 'Jeremy Swayman', after: 'Jeremy Swayman', status: 'retained',
        notes: ['Projected starter'],
      },
      {
        pos: 'G', before: null, after: 'Michael DiPietro', status: 'camp',
        notes: [
          'Twenty-seven; 1.91 GAA and .930 in 45 games in Providence',
          'A second consecutive AHL goaltender-of-the-year award; projected backup',
        ],
      },
      {
        pos: 'G', before: 'Joonas Korpisalo', after: null, status: 'departed',
        notes: ['Traded to the N.Y. Rangers on Jul. 1 for Kalle Vaisanen and a 2028 fourth'],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'Two first-round picks for JJ Peterka',
    body: 'The 23rd selection and a conditional 2028 first went to Utah on Jun. 26. Peterka is 24, scored 25 goals, and has four years left on his contract — the sort of asset Boston has struggled to acquire.',
  },
  {
    title: 'The centre question is still open',
    body: 'The reset names a top-tier centre as the primary need, the Bergeron succession still unresolved. Pavel Zacha is projected in the role and 19-year-old James Hagens is projected on the third line.',
  },
  {
    title: 'The most productive forward left',
    body: 'Viktor Arvidsson signed in Detroit after 54 points in 69 games. Peterka replaces the goals; the reset does not claim the centre depth improved.',
  },
]

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'James Hagens', pos: 'C', note: 'Nineteen, seventh overall in 2025, projected onto the third line.' },
  { name: 'Michael DiPietro', pos: 'G', note: 'Back-to-back AHL goaltender of the year; projected as the NHL backup.' },
  { name: 'Frederic Brunet', pos: 'D', note: 'Twenty-two, 36 points in Providence, and subject to waivers — so the decision has a cost.' },
]

export const unresolved = [
  { status: 'Open', item: 'A first-line centre', impact: 'Named in the reset as the primary need; unresolved since Bergeron retired' },
  { status: 'Open', item: 'Whether Hagens is ready at nineteen', impact: 'Projected third-line centre' },
  { status: 'Open', item: 'Frederic Brunet’s waiver status', impact: 'Cannot be sent down without risk' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Bruins 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/boston-bruins-roster-changes-for-2026-27-season' },
  { label: 'Official Bruins news', url: 'https://www.nhl.com/bruins/news/' },
]

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}


// BOS cap data, PuckPedia, retrieved Aug. 19, 2026.
export const cap = {
  capSummary: {
    ceiling: 104_000_000,
    capHit: 98_609_583,
    space: 5_390_417,
    rosterSlots: '23 / 23',
    potentialBonuses: 1_000_000,
    asOf: 'Aug. 19, 2026',
  },
  capGroups: [
    { key: 'F', label: 'Forwards', color: 'var(--cap-forwards)', total: 55_382_083 },
    { key: 'D', label: 'Defense', color: 'var(--cap-defense)', total: 33_550_000 },
    { key: 'G', label: 'Goaltending', color: 'var(--cap-goalies)', total: 9_062_500 },
    { key: 'O', label: 'Retained & buyouts', color: 'var(--cap-other)', total: 615_000 },
  ],
  capHits: [
    { name: 'David Pastrnak', group: 'F', hit: 11_250_000 },
    { name: 'Elias Lindholm', group: 'F', hit: 7_750_000 },
    { name: 'JJ Peterka', group: 'F', hit: 7_700_000 },
    { name: 'Casey Mittelstadt', group: 'F', hit: 5_750_000 },
    { name: 'Morgan Geekie', group: 'F', hit: 5_500_000 },
    { name: 'Pavel Zacha', group: 'F', hit: 4_750_000 },
    { name: 'Tanner Jeannot', group: 'F', hit: 3_400_000 },
    { name: 'Sean Kuraly', group: 'F', hit: 1_850_000 },
    { name: 'Alex Steeves', group: 'F', hit: 1_625_000 },
    { name: 'Mark Kastelic', group: 'F', hit: 1_566_667 },
    { name: 'Michael Eyssimont', group: 'F', hit: 1_450_000 },
    { name: 'James Hagens', group: 'F', hit: 986_250 },
    { name: 'Marat Khusnutdinov', group: 'F', hit: 925_000 },
    { name: 'Fraser Minten', group: 'F', hit: 879_166 },
    { name: 'Charlie McAvoy', group: 'D', hit: 9_500_000 },
    { name: 'Hampus Lindholm', group: 'D', hit: 6_500_000 },
    { name: 'Nikita Zadorov', group: 'D', hit: 5_000_000 },
    { name: 'Will Borgen', group: 'D', hit: 4_100_000 },
    { name: 'Mason Lohrei', group: 'D', hit: 3_200_000 },
    { name: 'Henri Jokiharju', group: 'D', hit: 3_000_000 },
    { name: 'Connor Clifton', group: 'D', hit: 2_250_000 },
    { name: 'Jeremy Swayman', group: 'G', hit: 8_250_000 },
    { name: 'Michael DiPietro', group: 'G', hit: 812_500 },
    { name: 'Brandon Carlo', group: 'O', hit: 615_000, charge: 'retained' },
  ],
}

export { STATUS, RUMOR_STATUS }
