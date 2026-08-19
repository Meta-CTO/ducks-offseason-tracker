import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/MIN.json'
import { pointsFromLeague } from './_derive'

// Minnesota Wild editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Wild team reset for the 2026-27 season. Cap
// figures have not been read from PuckPedia for this club yet, so there is no
// cap tab. Every "after" lineup is a projection until the club announces a
// roster.
//
// Scope note: Quinn Hughes appears on the projected blue line but is not in
// the ledger below, because he arrived from Vancouver in a mid-December
// in-season trade. This tracker covers the offseason, so he is carried as
// context rather than as a summer arrival. See the note in biggestChanges.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'Minnesota Wild',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['Three veterans left.', 'They replaced them with one.'],
  deck:
    'Mats Zuccarello, Marcus Johansson and Vladimir Tarasenko took 150 points ' +
    'out of the lineup between them. Minnesota answered by trading Jake ' +
    'Middleton and three picks to Calgary for Blake Coleman and Olli Maatta, ' +
    'and signing Maksim Shabanov for a year. The reset names top-six forward ' +
    'depth as the outstanding need, and Filip Gustavsson is recovering from ' +
    'hip surgery.',
}

export const ledgerRange = 'June 5 – July 2'

export const departures = [
  { date: 'Jun. 5', player: 'Marcus Johansson', pos: 'F', mechanism: 'Signed in Sweden', detail: 'Joined Färjestads BK of the SHL at thirty-five after 49 points in 75 games.' },
  { date: 'Jul. 1', player: 'Mats Zuccarello', pos: 'F', mechanism: 'UFA', detail: 'Signed a one-year contract with Los Angeles after seven seasons and 54 points in 59 games.' },
  { date: 'Jul. 2', player: 'Jake Middleton', pos: 'D', mechanism: 'Trade to Calgary', detail: 'Sent with three picks for Blake Coleman and Olli Maatta.' },
  { date: 'Offseason', player: 'Vladimir Tarasenko', pos: 'F', mechanism: 'UFA', detail: 'Unsigned as of this brief, which is the only firm statement about him; 47 points in 75 games.' },
  { date: 'Offseason', player: 'Jeff Petry', pos: 'D', mechanism: 'UFA', detail: 'Unsigned as of this brief; 9 assists in 67 games split between Minnesota and Florida.' },
]

export const arrivals = [
  { date: 'Jul. 1', player: 'Calvin Pickard', pos: 'G', deal: 'One year', role: 'From Edmonton; projected backup while Gustavsson recovers' },
  { date: 'Jul. 2', player: 'Blake Coleman', pos: 'F', deal: 'Trade from Calgary; one season left on a six-year deal', role: 'Two-time Stanley Cup champion; projected second line' },
  { date: 'Jul. 2', player: 'Olli Maatta', pos: 'D', deal: 'Trade from Calgary; two seasons left', role: 'Came with Coleman; projected third pair' },
  { date: 'Jul. 2', player: 'Maksim Shabanov', pos: 'F', deal: 'One year', role: 'From the N.Y. Islanders after 18 points in 44 games; projected second line' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Zuccarello, Johansson and Tarasenko out — 150 points — with Coleman and Shabanov in',
    rows: [
      {
        pos: 'LW', before: 'Kirill Kaprizov', after: 'Kirill Kaprizov', status: 'retained',
        notes: ['Projected on the top line with Joel Eriksson Ek and Matt Boldy'],
      },
      {
        pos: 'F', before: 'Mats Zuccarello', after: null, status: 'departed',
        notes: [
          'Signed with Los Angeles on Jul. 1 after seven seasons in Minnesota',
          '54 points in 59 games, plus 9 in 8 playoff games',
        ],
      },
      {
        pos: 'F', before: 'Vladimir Tarasenko', after: null, status: 'unsigned',
        notes: [
          'An unsigned unrestricted free agent, which is the only firm fact about his situation',
          '47 points in 75 games',
        ],
      },
      {
        pos: 'F', before: 'Marcus Johansson', after: null, status: 'departed',
        notes: ['Signed with Färjestads BK in Sweden on Jun. 5 after 49 points in 75 games'],
      },
      {
        pos: 'F', before: null, after: 'Blake Coleman', status: 'added',
        notes: [
          'Acquired from Calgary on Jul. 2 with Maatta for Jake Middleton and three picks',
          '20 goals and 35 points; won the Stanley Cup twice with Tampa Bay',
          'Projected on the second line with Ryan Hartman and Shabanov',
        ],
      },
      {
        pos: 'F', before: null, after: 'Maksim Shabanov', status: 'added',
        notes: ['One year on Jul. 2 after 18 points in 44 games with the Islanders'],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Middleton traded to Calgary; Maatta came back the other way',
    rows: [
      {
        pos: 'D', before: 'Jake Middleton', after: null, status: 'departed',
        notes: [
          'Traded to Calgary on Jul. 2 with a 2027 third, a 2028 fourth and a 2029 second',
          '16 points in 75 games',
        ],
      },
      {
        pos: 'D', before: null, after: 'Olli Maatta', status: 'added',
        notes: [
          'Arrived in the Middleton trade with two seasons left on his contract',
          'Projected on the third pair with Zach Bogosian',
        ],
      },
      {
        pos: 'RD', before: 'Brock Faber', after: 'Brock Faber', status: 'retained',
        notes: ['Projected on the top pair'],
      },
      {
        pos: 'D', before: 'Jeff Petry', after: null, status: 'unsigned',
        notes: ['An unsigned UFA, which is the only firm fact about his situation'],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Gustavsson recovering from hip surgery; Pickard signed behind Wallstedt',
    rows: [
      {
        pos: 'G', before: 'Filip Gustavsson', after: 'Filip Gustavsson', status: 'injured',
        notes: ['Recovering from hip surgery'],
      },
      {
        pos: 'G', before: 'Jesper Wallstedt', after: 'Jesper Wallstedt', status: 'retained',
        notes: ['Projected starter'],
      },
      {
        pos: 'G', before: null, after: 'Calvin Pickard', status: 'added',
        notes: [
          'One year on Jul. 1 from Edmonton',
          'Projected backup while Gustavsson recovers',
        ],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: '150 points walked out',
    body: 'Mats Zuccarello signed in Los Angeles, Marcus Johansson went to Sweden, and Vladimir Tarasenko is unsigned. Between them they scored 150 points last season, and the reset still lists top-six forward depth as the need.',
  },
  {
    title: 'Middleton and three picks for Coleman',
    body: 'Minnesota sent its defenseman plus a 2027 third, a 2028 fourth and a 2029 second to Calgary for Blake Coleman and Olli Maatta. Calgary described the same trade as clearing minutes for younger players.',
  },
  {
    title: 'Quinn Hughes was already here',
    body: 'Hughes anchors the projected top pair but does not appear in this summer’s ledger: he came from Vancouver in a mid-December in-season trade, for Marco Rossi, Liam Ohgren, Zeev Buium and a 2026 first-round pick. It sits outside the offseason window this page covers, and is noted here so the blue line makes sense.',
  },
]

// Not researched from a primary source yet; the reset does not list picks.
export const draftClass = []

export const campWatch = [
  { name: 'Danila Yurov', pos: 'C', note: 'Projected to centre the third line, one of the jobs the veteran departures opened.' },
  { name: 'Maksim Shabanov', pos: 'F', note: 'Signed for one year and projected into a top-six role he has not held before.' },
]

export const unresolved = [
  { status: 'Open', item: 'Filip Gustavsson’s hip', impact: 'Recovering from surgery; Pickard signed behind Wallstedt' },
  { status: 'Open', item: 'Top-six forward depth', impact: 'Named in the reset as the outstanding need after three veterans left' },
  { status: 'Open', item: 'Vladimir Tarasenko and Jeff Petry', impact: 'Both still unsigned' },
  { status: 'Open', item: 'Cap and contract detail', impact: 'Not yet verified against PuckPedia, so this club has no cap tab' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Wild 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/minnesota-wild-roster-changes-for-2026-27-season' },
  { label: 'Hughes traded to Wild by Canucks (Dec. 2025)', url: 'https://www.nhl.com/news/quinn-hughes-traded-to-minnesota-wild-by-vancouver-canucks' },
  { label: 'Official Wild news', url: 'https://www.nhl.com/wild/news/' },
]

export const points = pointsFromLeague(league)
export const contracts = {}

export { STATUS, RUMOR_STATUS }
