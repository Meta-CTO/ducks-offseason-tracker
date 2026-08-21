import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/NYI.json'
import draft from '../draft/NYI.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// New York Islanders editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Islanders team reset for the 2026-27 season. Cap
// figures read from PuckPedia on Aug. 19, 2026. Every "after" lineup is a projection until the club announces a
// roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'New York Islanders',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['Their captain of eight years left.', 'The kids arrive anyway.'],
  deck:
    'Anders Lee signed in Utah after fourteen seasons, 923 games and 308 ' +
    'goals, taking the captaincy with him. The Islanders replaced him with ' +
    'one-year deals and a youth movement: Matthew Schaefer is projected onto ' +
    'the top defense pair, Victor Eklund onto the third line, and Peter ' +
    'DeBoer starts his first full season behind the bench.',
}

export const ledgerRange = 'June 26 – July 3'

export const departures = [
  { date: 'Jul. 1', player: 'Anders Lee', pos: 'LW · Captain', mechanism: 'UFA', detail: 'Signed a three-year contract with Utah after fourteen seasons: 923 games, 308 goals and 549 points, fourth in franchise goals.' },
  { date: 'Jul. 3', player: 'David Rittich', pos: 'G', mechanism: 'UFA', detail: 'Signed a one-year contract with New Jersey.' },
  { date: 'Offseason', player: 'Carson Soucy', pos: 'D', mechanism: 'UFA', detail: 'Unsigned as of this brief, which is the only firm statement about him; arrived from the Rangers in January.' },
]

export const arrivals = [
  { date: 'Jun. 26', player: 'Tony DeAngelo', pos: 'D', deal: 'Two years, re-signed', role: 'Projected on the second pair with Adam Pelech' },
  { date: 'Jul. 1', player: 'Matias Maccelli', pos: 'F', deal: 'One year', role: 'From Toronto after 39 points in 71 games; projected fourth line' },
  { date: 'Jul. 1', player: 'Matthew Kessel', pos: 'D', deal: 'One year', role: 'From St. Louis; depth on the blue line' },
  { date: 'Jul. 1', player: 'Vitek Vanecek', pos: 'G', deal: 'One year', role: 'From Utah; likely an AHL assignment if Varlamov is healthy' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Lee left for Utah; Maccelli signed for a year; Eklund projected onto the third line — depth rows are from the roster feed and 2025–26 club stats, not individually researched',
    rows: [
      {
        pos: 'LW', before: 'Anders Lee', after: null, status: 'departed',
        notes: [
          'Signed a three-year contract with Utah on Jul. 1',
          'Fourteen seasons, 923 games and 308 goals — fourth in franchise history — with eight as captain',
          'The captaincy is now vacant, with no successor named',
        ],
      },
      {
        pos: 'C', before: 'Bo Horvat', after: 'Bo Horvat', status: 'retained',
        notes: ['Projected to centre the top line between Simon Holmstrom and Mathew Barzal'],
      },
      {
        pos: 'RW', before: null, after: 'Victor Eklund', status: 'camp',
        notes: [
          'Nineteen, sixteenth overall in 2025, with an NHL debut in April behind him',
          'Projected onto the third line — a projection, not a decision',
        ],
      },
      {
        pos: 'F', before: null, after: 'Matias Maccelli', status: 'added',
        notes: [
          'One year on Jul. 1 after Toronto declined to qualify him',
          '39 points in 71 games; projected fourth line',
        ],
      },
          {
        pos: 'C', before: 'Mathew Barzal', after: 'Mathew Barzal', status: 'retained',
        notes: [
          'Played 81 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'R', before: 'Mitchell Chaffee', after: 'Mitchell Chaffee', status: 'retained',
        notes: [
          'On the current roster; no 2025–26 games for the club',
        ],
      },
      {
        pos: 'C', before: 'Casey Cizikas', after: 'Casey Cizikas', status: 'retained',
        notes: [
          'Played 81 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'L', before: 'Anthony Duclair', after: 'Anthony Duclair', status: 'retained',
        notes: [
          'Played 62 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'L', before: 'Emil Heineman', after: 'Emil Heineman', status: 'retained',
        notes: [
          'Played 82 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'R', before: 'Simon Holmstrom', after: 'Simon Holmstrom', status: 'retained',
        notes: [
          'Played 79 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Kyle MacLean', after: 'Kyle MacLean', status: 'retained',
        notes: [
          'Played 59 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Jean-Gabriel Pageau', after: 'Jean-Gabriel Pageau', status: 'retained',
        notes: [
          'Played 74 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'L', before: 'Ondrej Palat', after: 'Ondrej Palat', status: 'retained',
        notes: [
          'Played 29 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Kyle Palmieri', after: 'Kyle Palmieri', status: 'retained',
        notes: [
          'Played 25 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Brayden Schenn', after: 'Brayden Schenn', status: 'retained',
        notes: [
          'Played 19 games for the club in 2025–26 and is on the current roster',
        ],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'DeAngelo re-signed; Schaefer projected onto the top pair; Romanov returning from injury — depth rows are from the roster feed and 2025–26 club stats, not individually researched',
    rows: [
      {
        pos: 'LD', before: 'Matthew Schaefer', after: 'Matthew Schaefer', status: 'retained',
        notes: ['Projected on the top pair with Ryan Pulock'],
      },
      {
        pos: 'RD', before: 'Tony DeAngelo', after: 'Tony DeAngelo', status: 'retained',
        notes: ['Re-signed for two years on Jun. 26; projected second pair with Adam Pelech'],
      },
      {
        pos: 'D', before: 'Alexander Romanov', after: 'Alexander Romanov', status: 'injured',
        notes: ['Returning from a shoulder injury; projected on the third pair'],
      },
      {
        pos: 'D', before: null, after: 'Matthew Kessel', status: 'added',
        notes: ['One year on Jul. 1 from St. Louis'],
      },
      {
        pos: 'D', before: 'Carson Soucy', after: null, status: 'unsigned',
        notes: ['An unsigned UFA, which is the only firm fact about his situation'],
      },
          {
        pos: 'D', before: 'Scott Mayfield', after: 'Scott Mayfield', status: 'retained',
        notes: [
          'Played 80 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'D', before: 'Adam Pelech', after: 'Adam Pelech', status: 'retained',
        notes: [
          'Played 82 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'D', before: 'Ryan Pulock', after: 'Ryan Pulock', status: 'retained',
        notes: [
          'Played 76 games for the club in 2025–26 and is on the current roster',
        ],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Rittich left for New Jersey; Vanecek signed as cover while Varlamov recovers',
    rows: [
      {
        pos: 'G', before: 'Ilya Sorokin', after: 'Ilya Sorokin', status: 'retained',
        notes: ['Projected starter'],
      },
      {
        pos: 'G', before: 'Semyon Varlamov', after: 'Semyon Varlamov', status: 'injured',
        notes: [
          'Recovering from bilateral knee replacement',
          'Projected as the backup if healthy',
        ],
      },
      {
        pos: 'G', before: null, after: 'Vitek Vanecek', status: 'added',
        notes: [
          'One year on Jul. 1 from Utah',
          'Likely an AHL assignment if Varlamov is fit',
        ],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'Fourteen seasons and the captaincy',
    body: 'Anders Lee signed in Utah on Jul. 1 after 923 games and 308 goals, fourth in franchise history, eight of those years as captain. Nobody has been named to replace him.',
  },
  {
    title: 'A youth movement in the projected lineup',
    body: 'Matthew Schaefer is projected onto the top defense pair and 19-year-old Victor Eklund onto the third line, with Cole Eiserman, Kashawn Aitcheson and Isaiah George all in the queue behind them.',
  },
  {
    title: 'Two goaltenders coming back from surgery',
    body: 'Semyon Varlamov is recovering from bilateral knee replacement and Alexander Romanov from a shoulder injury. Vitek Vanecek was signed as insurance and would go to the AHL if Varlamov is fit.',
  },
]

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'Victor Eklund', pos: 'RW', note: 'Nineteen, sixteenth overall in 2025, projected onto the third line.' },
  { name: 'Isaiah George', pos: 'D', note: 'Twenty-two; the reset asks whether he can secure a full-time role out of camp.' },
  { name: 'Cole Eiserman', pos: 'F', note: 'Nineteen, twentieth overall in 2024, on an entry-level contract.' },
  { name: 'Kashawn Aitcheson', pos: 'D', note: 'Nineteen; expected to play in Hamilton after winning the OHL’s top defenseman award.' },
]

export const unresolved = [
  { status: 'Open', item: 'The captaincy', impact: 'Vacant since Lee left; no successor named' },
  { status: 'Open', item: 'Semyon Varlamov’s knees', impact: 'Recovering from bilateral knee replacement; decides whether Vanecek stays up' },
  { status: 'Open', item: 'Alexander Romanov’s shoulder', impact: 'Third defense pair' },
  { status: 'Open', item: 'Whether Isaiah George holds a job', impact: 'Named in the reset as a camp question' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Islanders 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/new-york-islanders-roster-changes-for-2026-27-season' },
  { label: 'Official Islanders news', url: 'https://www.nhl.com/islanders/news/' },
]

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}

// NYI cap data, PuckPedia, retrieved Aug. 19, 2026.
export const cap = {
  capSummary: {
    ceiling: 104_000_000,
    capHit: 101_065_416,
    space: 2_934_584,
    rosterSlots: '23 / 23',
    potentialBonuses: 3_830_000,
    asOf: 'Aug. 19, 2026',
  },
  capGroups: [
    { key: 'F', label: 'Forwards', color: 'var(--cap-forwards)', total: 57_515_833 },
    { key: 'D', label: 'Defense', color: 'var(--cap-defense)', total: 28_049_583 },
    { key: 'G', label: 'Goaltending', color: 'var(--cap-goalies)', total: 12_000_000 },
    { key: 'O', label: 'Retained & buyouts', color: 'var(--cap-other)', total: 3_500_000 },
  ],
  capHits: [
    { name: 'Mathew Barzal', group: 'F', hit: 9_150_000 },
    { name: 'Bo Horvat', group: 'F', hit: 8_500_000 },
    { name: 'Brayden Schenn', group: 'F', hit: 6_500_000 },
    { name: 'Ondrej Palat', group: 'F', hit: 6_000_000 },
    { name: 'Jean-Gabriel Pageau', group: 'F', hit: 4_850_000 },
    { name: 'Kyle Palmieri', group: 'F', hit: 4_750_000 },
    { name: 'Simon Holmstrom', group: 'F', hit: 3_625_000 },
    { name: 'Anthony Duclair', group: 'F', hit: 3_500_000 },
    { name: 'Pierre Engvall', group: 'F', hit: 3_000_000 },
    { name: 'Casey Cizikas', group: 'F', hit: 2_500_000 },
    { name: 'Matias Maccelli', group: 'F', hit: 2_250_000 },
    { name: 'Emil Heineman', group: 'F', hit: 1_100_000 },
    { name: 'Calum Ritchie', group: 'F', hit: 940_833 },
    { name: 'Kyle MacLean', group: 'F', hit: 850_000 },
    { name: 'Alexander Romanov', group: 'D', hit: 6_250_000 },
    { name: 'Ryan Pulock', group: 'D', hit: 6_150_000 },
    { name: 'Adam Pelech', group: 'D', hit: 5_750_000 },
    { name: 'Tony DeAngelo', group: 'D', hit: 4_500_000 },
    { name: 'Scott Mayfield', group: 'D', hit: 3_500_000 },
    { name: 'Matthew Schaefer', group: 'D', hit: 986_250 },
    { name: 'Isaiah George', group: 'D', hit: 913_333 },
    { name: 'Ilya Sorokin', group: 'G', hit: 8_250_000 },
    { name: 'Semyon Varlamov', group: 'G', hit: 2_750_000 },
    { name: 'Vitek Vanecek', group: 'G', hit: 1_000_000 },
    { name: 'Bonus Carryover Overage', group: 'O', hit: 3_500_000, charge: 'buyout' },
  ],
}

export { STATUS, RUMOR_STATUS }
