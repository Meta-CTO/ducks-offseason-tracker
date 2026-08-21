import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/MIN.json'
import draft from '../draft/MIN.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// Minnesota Wild editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Wild team reset for the 2026-27 season. Cap
// figures read from PuckPedia on Aug. 19, 2026. Every "after" lineup is a projection until the club announces a
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
    summary: 'Zuccarello, Johansson and Tarasenko out — 150 points — with Coleman and Shabanov in — projected roles are NHL.com’s',
    rows: [
      {
        pos: 'LW', before: 'Kirill Kaprizov', after: 'Kirill Kaprizov', status: 'retained',
        notes: [
          'Carries a $17M cap hit through 2034, the largest in the league',
          'Projected on the top line with Joel Eriksson Ek and Matt Boldy',
        ],
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
      {
        pos: 'L', before: 'Matt Boldy', after: 'Matt Boldy', status: 'retained',
        notes: [
          'Projected on the first line alongside Kirill Kaprizov and Joel Eriksson Ek',
        ],
      },
      {
        pos: 'R', before: 'Bobby Brink', after: 'Bobby Brink', status: 'retained',
        notes: [
          'Projected on the third line alongside Yakov Trenin and Danila Yurov',
        ],
      },
      {
        pos: 'C', before: 'Joel Eriksson Ek', after: 'Joel Eriksson Ek', status: 'retained',
        notes: [
          'Projected to centre the first line between Kirill Kaprizov and Matt Boldy',
        ],
      },
      {
        pos: 'L', before: 'Marcus Foligno', after: 'Marcus Foligno', status: 'retained',
        notes: [
          'Projected on the fourth line alongside Michael McCarron and Nick Foligno',
        ],
      },
      {
        pos: 'L', before: 'Nick Foligno', after: 'Nick Foligno', status: 'retained',
        notes: [
          'Projected on the fourth line alongside Marcus Foligno and Michael McCarron',
        ],
      },
      {
        pos: 'C', before: 'Hunter Haight', after: 'Hunter Haight', status: 'retained',
        notes: [
          'On the roster; not in NHL.com\'s projected lineup',
        ],
      },
      {
        pos: 'R', before: 'Ryan Hartman', after: 'Ryan Hartman', status: 'retained',
        notes: [
          'Projected to centre the second line between Blake Coleman and Maksim Shabanov',
        ],
      },
      {
        pos: 'C', before: 'Michael McCarron', after: 'Michael McCarron', status: 'retained',
        notes: [
          'Projected to centre the fourth line between Marcus Foligno and Nick Foligno',
        ],
      },
      {
        pos: 'C', before: 'Nico Sturm', after: 'Nico Sturm', status: 'retained',
        notes: [
          'On the roster; not in NHL.com\'s projected lineup',
        ],
      },
      {
        pos: 'C', before: 'Yakov Trenin', after: 'Yakov Trenin', status: 'retained',
        notes: [
          'Projected on the third line alongside Danila Yurov and Bobby Brink',
        ],
      },
      {
        pos: 'R', before: 'Danila Yurov', after: 'Danila Yurov', status: 'retained',
        notes: [
          'Projected to centre the third line between Yakov Trenin and Bobby Brink',
        ],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Middleton traded to Calgary; Maatta came back the other way — projected roles are NHL.com’s',
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
      {
        pos: 'D', before: 'Zach Bogosian', after: 'Zach Bogosian', status: 'retained',
        notes: [
          'Projected on the third pair with Olli Maatta',
        ],
      },
      {
        pos: 'D', before: 'Jonas Brodin', after: 'Jonas Brodin', status: 'retained',
        notes: [
          'Projected on the second pair with Jared Spurgeon',
        ],
      },
      {
        pos: 'D', before: 'Viking Gustafsson Nyberg', after: 'Viking Gustafsson Nyberg', status: 'retained',
        notes: [
          'On the roster; not in NHL.com\'s projected lineup',
        ],
      },
      {
        pos: 'D', before: 'Quinn Hughes', after: 'Quinn Hughes', status: 'retained',
        notes: [
          'Projected on the top pair with Brock Faber',
        ],
      },
      {
        pos: 'D', before: 'Daemon Hunt', after: 'Daemon Hunt', status: 'retained',
        notes: [
          'On the roster; not in NHL.com\'s projected lineup',
        ],
      },
      {
        pos: 'D', before: 'Matt Kiersted', after: 'Matt Kiersted', status: 'retained',
        notes: [
          'On the roster; not in NHL.com\'s projected lineup',
        ],
      },
      {
        pos: 'D', before: 'Carson Lambos', after: 'Carson Lambos', status: 'retained',
        notes: [
          'On the roster; not in NHL.com\'s projected lineup',
        ],
      },
      {
        pos: 'D', before: 'David Spacek', after: 'David Spacek', status: 'retained',
        notes: [
          'On the roster; not in NHL.com\'s projected lineup',
        ],
      },
      {
        pos: 'D', before: 'Jared Spurgeon', after: 'Jared Spurgeon', status: 'retained',
        notes: [
          'Projected on the second pair with Jonas Brodin',
        ],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Gustavsson recovering from hip surgery; Pickard signed behind Wallstedt — projected roles are NHL.com’s',
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
  {
    group: 'Coaching',
    summary: 'John Hynes returns behind the bench',
    rows: [
      {
        pos: 'Head coach', before: 'John Hynes', after: 'John Hynes', status: 'retained',
        notes: [
          'Listed as the club\'s head coach for both 2025–26 and 2026–27',
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
    body: 'Hughes anchors the projected top pair at a $7.85M cap hit but does not appear in this summer’s ledger: he came from Vancouver in a mid-December in-season trade, for Marco Rossi, Liam Ohgren, Zeev Buium and a 2026 first-round pick. It sits outside the offseason window this page covers, and is noted here so the blue line makes sense. He can reach unrestricted free agency in 2027.',
  },
]

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'Danila Yurov', pos: 'C', note: 'Projected to centre the third line, one of the jobs the veteran departures opened.' },
  { name: 'Maksim Shabanov', pos: 'F', note: 'Signed for one year and projected into a top-six role he has not held before.' },
]

export const unresolved = [
  { status: 'Open', item: 'Filip Gustavsson’s hip', impact: 'On IR recovering from surgery; Pickard signed behind Wallstedt' },
  { status: 'Open', item: 'Five players hurt going into camp', impact: 'Gustavsson, Brodin, Eriksson Ek, Bogosian and Stramel, with $1.15M of cap space' },
  { status: 'Open', item: 'Top-six forward depth', impact: 'Named in the reset as the outstanding need after three veterans left' },
  { status: 'Open', item: 'Vladimir Tarasenko and Jeff Petry', impact: 'Both still unsigned' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Wild 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/minnesota-wild-roster-changes-for-2026-27-season' },
  { label: 'Hughes traded to Wild by Canucks (Dec. 2025)', url: 'https://www.nhl.com/news/quinn-hughes-traded-to-minnesota-wild-by-vancouver-canucks' },
  { label: 'Official Wild news', url: 'https://www.nhl.com/wild/news/' },
]

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}

// MIN cap data, PuckPedia, retrieved Aug. 19, 2026.
export const cap = {
  capSummary: {
    ceiling: 104_000_000,
    capHit: 102_847_499,
    space: 1_152_501,
    rosterSlots: '23 / 23',
    potentialBonuses: 2_100_000,
    asOf: 'Aug. 19, 2026',
  },
  capGroups: [
    { key: 'F', label: 'Forwards', color: 'var(--cap-forwards)', total: 55_605_833 },
    { key: 'D', label: 'Defense', color: 'var(--cap-defense)', total: 35_575_000 },
    { key: 'G', label: 'Goaltending', color: 'var(--cap-goalies)', total: 10_000_000 },
    { key: 'O', label: 'Retained & buyouts', color: 'var(--cap-other)', total: 1_666_666 },
  ],
  capHits: [
    { name: 'Kirill Kaprizov', group: 'F', hit: 17_000_000 },
    { name: 'Matt Boldy', group: 'F', hit: 7_000_000 },
    { name: 'Joel Eriksson Ek', group: 'F', hit: 5_250_000 },
    { name: 'Marcus Foligno', group: 'F', hit: 4_000_000 },
    { name: 'Ryan Hartman', group: 'F', hit: 4_000_000 },
    { name: 'Yakov Trenin', group: 'F', hit: 3_500_000 },
    { name: 'Michael McCarron', group: 'F', hit: 3_333_333 },
    { name: 'Bobby Brink', group: 'F', hit: 2_750_000 },
    { name: 'Blake Coleman', group: 'F', hit: 2_450_000 },
    { name: 'Nico Sturm', group: 'F', hit: 2_000_000 },
    { name: 'Maksim Shabanov', group: 'F', hit: 1_600_000 },
    { name: 'Danila Yurov', group: 'F', hit: 972_500 },
    { name: 'Nick Foligno', group: 'F', hit: 900_000 },
    { name: 'Justin Kirkland', group: 'F', hit: 850_000 },
    { name: 'Brock Faber', group: 'D', hit: 8_500_000 },
    { name: 'Quinn Hughes', group: 'D', hit: 7_850_000 },
    { name: 'Jared Spurgeon', group: 'D', hit: 7_575_000 },
    { name: 'Jonas Brodin', group: 'D', hit: 6_000_000 },
    { name: 'Olli Maatta', group: 'D', hit: 3_500_000 },
    { name: 'Zach Bogosian', group: 'D', hit: 1_250_000 },
    { name: 'Daemon Hunt', group: 'D', hit: 900_000 },
    { name: 'Filip Gustavsson', group: 'G', hit: 6_800_000 },
    { name: 'Jesper Wallstedt', group: 'G', hit: 2_200_000 },
    { name: 'Calvin Pickard', group: 'G', hit: 1_000_000 },
    { name: 'LW,RW', group: 'O', hit: 833_333, charge: 'buyout' },
    { name: 'BUYOUT', group: 'O', hit: 833_333, charge: 'buyout' },
  ],
}

export { STATUS, RUMOR_STATUS }
