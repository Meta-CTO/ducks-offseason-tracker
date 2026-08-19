import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/NYI.json'
import { pointsFromLeague } from './_derive'

// New York Islanders editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Islanders team reset for the 2026-27 season. Cap
// figures have not been read from PuckPedia for this club yet, so there is no
// cap tab. Every "after" lineup is a projection until the club announces a
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
    summary: 'Lee left for Utah; Maccelli signed for a year; Eklund projected onto the third line',
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
    ],
  },
  {
    group: 'Defense',
    summary: 'DeAngelo re-signed; Schaefer projected onto the top pair; Romanov returning from injury',
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

// Not researched from a primary source yet; the reset names recent picks in
// prose but not a full class.
export const draftClass = []

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
  { status: 'Open', item: 'Cap and contract detail', impact: 'Not yet verified against PuckPedia, so this club has no cap tab' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Islanders 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/new-york-islanders-roster-changes-for-2026-27-season' },
  { label: 'Official Islanders news', url: 'https://www.nhl.com/islanders/news/' },
]

export const points = pointsFromLeague(league)
export const contracts = {}

export { STATUS, RUMOR_STATUS }
