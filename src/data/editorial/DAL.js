import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/DAL.json'
import draft from '../draft/DAL.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// Dallas Stars editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Stars team reset for the 2026-27 season. Cap
// figures read from PuckPedia on Aug. 19, 2026. Every "after" lineup is a projection until the club announces a
// roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'Dallas Stars',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['A quiet summer.', 'Then a $12 million bridge.'],
  deck:
    'Dallas made almost no additions — one $1 million forward — and moved ' +
    'Mavrik Bourque and Ilya Lyubushkin to Nashville for picks. Then it paid ' +
    'Jason Robertson $12 million for a single season, matching Mikko Rantanen ' +
    'as the club’s largest cap hit and pushing Dallas $1.36 million above the ' +
    'ceiling. It has to be compliant by opening night.',
}

export const ledgerRange = 'July 1 – July 21'

export const departures = [
  { date: 'Jul. 1', player: 'Mavrik Bourque', pos: 'F', mechanism: 'Trade to Nashville', detail: 'Sent with Ilya Lyubushkin for a 2027 second and a 2028 third; signed a six-year, $33M deal with Nashville on Jul. 4 after 41 points in 82 games.' },
  { date: 'Jul. 1', player: 'Ilya Lyubushkin', pos: 'D', mechanism: 'Trade to Nashville', detail: 'Included in the Bourque deal after 9 points in 53 games.' },
  { date: 'Jul. 1', player: 'Alexander Petrovic', pos: 'D', mechanism: 'UFA', detail: 'Signed a two-year contract with Florida.' },
  { date: 'Offseason', player: 'Michael Bunting', pos: 'F', mechanism: 'UFA', detail: 'Unsigned as of this brief, which is the only firm statement about him.' },
]

export const arrivals = [
  { date: 'Jul. 1', player: 'Joel Kiviranta', pos: 'F', deal: 'One year, $1M', role: 'Returns to Dallas after three seasons away; projected fourth line' },
  { date: 'Jul. 3', player: 'Jamie Benn', pos: 'LW/C', deal: 'One year, $850K', role: 'Re-signed at thirty-seven; recorded on PuckPedia rather than the reset' },
  { date: 'Jul. 21', player: 'Jason Robertson', pos: 'LW', deal: 'One year, $12M', role: 'Re-signed after leading Dallas with 96 points; recorded on PuckPedia rather than the reset' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Robertson re-signed for a year; Bourque traded to Nashville; Kiviranta returns — projected roles are NHL.com’s',
    rows: [
      {
        pos: 'LW', before: 'Jason Robertson', after: 'Jason Robertson', status: 'retained',
        notes: [
          'Re-signed Jul. 21 for one year at $12M, tying Mikko Rantanen for the largest cap hit on the roster',
          'Led Dallas with 96 points — 45 goals and 51 assists — in 82 games',
          'A one-year deal rather than a long term, so the same negotiation returns next summer',
        ],
      },
      {
        pos: 'C', before: 'Wyatt Johnston', after: 'Wyatt Johnston', status: 'retained',
        notes: ['Projected to centre the top line with Mikko Rantanen'],
      },
      {
        pos: 'C', before: 'Roope Hintz', after: 'Roope Hintz', status: 'retained',
        notes: ['Projected to centre the second line between Robertson and Tyler Seguin'],
      },
      {
        pos: 'F', before: 'Mavrik Bourque', after: null, status: 'departed',
        notes: [
          'Traded to Nashville on Jul. 1 with Lyubushkin for a 2027 second and a 2028 third',
          'Signed a six-year, $33M contract with Nashville three days later after a 41-point season',
        ],
      },
      {
        pos: 'F', before: null, after: 'Joel Kiviranta', status: 'added',
        notes: [
          'One year at $1M on Jul. 1, returning after playing in Dallas from 2019 to 2023',
        ],
      },
      {
        pos: 'L', before: 'Jamie Benn', after: 'Jamie Benn', status: 'retained',
        notes: [
          'Projected on the third line alongside Sam Steel and Matt Duchene',
        ],
      },
      {
        pos: 'C', before: 'Colin Blackwell', after: 'Colin Blackwell', status: 'retained',
        notes: [
          'On the roster; not in NHL.com\'s projected lineup',
        ],
      },
      {
        pos: 'C', before: 'Oskar Bäck', after: 'Oskar Bäck', status: 'retained',
        notes: [
          'Projected on the fourth line alongside Radek Faksa and Joel Kiviranta',
        ],
      },
      {
        pos: 'C', before: 'Matt Duchene', after: 'Matt Duchene', status: 'retained',
        notes: [
          'Projected to centre the third line between Sam Steel and Jamie Benn',
        ],
      },
      {
        pos: 'C', before: 'Radek Faksa', after: 'Radek Faksa', status: 'retained',
        notes: [
          'Projected to centre the fourth line between Oskar Back and Joel Kiviranta',
        ],
      },
      {
        pos: 'C', before: 'Justin Hryckowian', after: 'Justin Hryckowian', status: 'retained',
        notes: [
          'Projected on the first line alongside Wyatt Johnston and Mikko Rantanen',
        ],
      },
      {
        pos: 'R', before: 'Arttu Hyry', after: 'Arttu Hyry', status: 'retained',
        notes: [
          'On the roster; not in NHL.com\'s projected lineup',
        ],
      },
      {
        pos: 'R', before: 'Mikko Rantanen', after: 'Mikko Rantanen', status: 'retained',
        notes: [
          'Projected on the first line alongside Justin Hryckowian and Wyatt Johnston',
        ],
      },
      {
        pos: 'C', before: 'Tyler Seguin', after: 'Tyler Seguin', status: 'retained',
        notes: [
          'Projected on the second line alongside Jason Robertson and Roope Hintz',
        ],
      },
      {
        pos: 'C', before: 'Sam Steel', after: 'Sam Steel', status: 'retained',
        notes: [
          'Projected on the third line alongside Matt Duchene and Jamie Benn',
        ],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Lyubushkin and Petrovic out; no replacement signed — projected roles are NHL.com’s',
    rows: [
      {
        pos: 'RD', before: 'Miro Heiskanen', after: 'Miro Heiskanen', status: 'retained',
        notes: ['Projected on the top pair with Esa Lindell'],
      },
      {
        pos: 'D', before: 'Ilya Lyubushkin', after: null, status: 'departed',
        notes: ['Traded to Nashville on Jul. 1 in the Bourque deal'],
      },
      {
        pos: 'D', before: 'Alexander Petrovic', after: null, status: 'departed',
        notes: ['Signed a two-year contract with Florida on Jul. 1'],
      },
      {
        pos: 'LD', before: 'Lian Bichsel', after: 'Lian Bichsel', status: 'retained',
        notes: ['Projected on the third pair with Tyler Myers'],
      },
      {
        pos: 'D', before: 'Kyle Capobianco', after: 'Kyle Capobianco', status: 'retained',
        notes: [
          'On the roster; not in NHL.com\'s projected lineup',
        ],
      },
      {
        pos: 'D', before: 'Thomas Harley', after: 'Thomas Harley', status: 'retained',
        notes: [
          'Projected on the second pair with Nils Lundkvist',
        ],
      },
      {
        pos: 'D', before: 'Esa Lindell', after: 'Esa Lindell', status: 'retained',
        notes: [
          'Projected on the top pair with Miro Heiskanen',
        ],
      },
      {
        pos: 'D', before: 'Nils Lundkvist', after: 'Nils Lundkvist', status: 'retained',
        notes: [
          'Projected on the second pair with Thomas Harley',
        ],
      },
      {
        pos: 'D', before: 'Tyler Myers', after: 'Tyler Myers', status: 'retained',
        notes: [
          'Projected on the third pair with Lian Bichsel',
        ],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Unchanged: Oettinger and DeSmith',
    rows: [
      {
        pos: 'G', before: 'Jake Oettinger', after: 'Jake Oettinger', status: 'retained',
        notes: ['Projected starter'],
      },
      {
        pos: 'G', before: 'Casey DeSmith', after: 'Casey DeSmith', status: 'retained',
        notes: ['Projected backup'],
      },
    ],
  },
  {
    group: 'Coaching',
    summary: 'Glen Gulutzan returns behind the bench',
    rows: [
      {
        pos: 'Head coach', before: 'Glen Gulutzan', after: 'Glen Gulutzan', status: 'retained',
        notes: [
          'Listed as the club\'s head coach for both 2025–26 and 2026–27',
        ],
      },
      {
        pos: 'Assistant coach', before: 'Neil Graham Alain Nasreddine David Pelletier', after: 'Neil Graham Alain Nasreddine David Pelletier', status: 'onstaff',
        notes: [
          'Listed on the club\'s coaching staff for 2026–27',
        ],
      },
      {
        pos: 'Goaltending coach', before: 'Jeff Reese', after: 'Jeff Reese', status: 'onstaff',
        notes: [
          'Listed on the club\'s coaching staff for 2026–27',
        ],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'The 96-point winger signed — for one year',
    body: 'Jason Robertson re-signed on Jul. 21 at $12 million, matching Mikko Rantanen as the club’s largest cap hit. The term is the striking part: a single season, which means Dallas has the same conversation again next summer.',
  },
  {
    title: 'And now they are over the cap',
    body: 'Dallas projects at $105.36 million against a $104 million ceiling — $1.36 million in the red, before a $2.08 million bonus carryover overage that is already counted. The roster has to be compliant by opening night.',
  },
  {
    title: 'Bourque sold, then paid elsewhere',
    body: 'Mavrik Bourque and Ilya Lyubushkin went to Nashville on Jul. 1 for a 2027 second and a 2028 third. Three days later Nashville signed Bourque for six years and $33 million.',
  },
  {
    title: 'One addition, worth $1 million',
    body: 'Joel Kiviranta returned on a one-year deal. That is the entire list of players Dallas added this summer.',
  },
]

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'Arttu Hyry', pos: 'F', note: 'The general manager said he has “a great opportunity” to earn a roster spot after his playoff performance.' },
  { name: 'Trey Taylor', pos: 'D', note: 'On an entry-level contract signed in March 2025; depth on a blue line that lost two players.' },
]

export const unresolved = [
  { status: 'Open', item: 'Getting under the ceiling', impact: 'Dallas is $1.36M over and must be compliant by opening night' },
  { status: 'Open', item: 'Robertson again next summer', impact: 'His new deal runs one year, so the negotiation repeats in 2027' },
  { status: 'Open', item: 'Replacing Lyubushkin and Petrovic', impact: 'Two defensemen left and nobody was signed' },
  { status: 'Open', item: 'Michael Bunting', impact: 'Still an unsigned UFA' },
  { status: 'Open', item: 'Four injured regulars', impact: 'Hintz, Seguin, Lundkvist and Hyry are all listed week to week' },
]

export const rumors = []

export const sources = [
  { label: 'Coaching staff (NHL.com club site)', url: 'https://www.nhl.com/stars/team/front-office' },
  { label: 'NHL.com Stars 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/dallas-stars-roster-changes-for-2026-27-season' },
  { label: 'Official Stars news', url: 'https://www.nhl.com/stars/news/' },
]

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}

// DAL cap data, PuckPedia, retrieved Aug. 19, 2026.
export const cap = {
  capSummary: {
    ceiling: 104_000_000,
    capHit: 105_360_333,
    space: -1_360_333,
    rosterSlots: '23 / 23',
    potentialBonuses: 1_650_000,
    asOf: 'Aug. 19, 2026',
  },
  capGroups: [
    { key: 'F', label: 'Forwards', color: 'var(--cap-forwards)', total: 64_650_000 },
    { key: 'D', label: 'Defense', color: 'var(--cap-defense)', total: 29_330_333 },
    { key: 'G', label: 'Goaltending', color: 'var(--cap-goalies)', total: 9_300_000 },
    { key: 'O', label: 'Retained & buyouts', color: 'var(--cap-other)', total: 2_080_000 },
  ],
  capHits: [
    { name: 'Mikko Rantanen', group: 'F', hit: 12_000_000 },
    { name: 'Jason Robertson', group: 'F', hit: 12_000_000 },
    { name: 'Tyler Seguin', group: 'F', hit: 9_850_000 },
    { name: 'Roope Hintz', group: 'F', hit: 8_450_000 },
    { name: 'Wyatt Johnston', group: 'F', hit: 8_400_000 },
    { name: 'Matt Duchene', group: 'F', hit: 4_500_000 },
    { name: 'Sam Steel', group: 'F', hit: 2_100_000 },
    { name: 'Radek Faksa', group: 'F', hit: 2_000_000 },
    { name: 'Joel Kiviranta', group: 'F', hit: 1_000_000 },
    { name: 'Justin Hryckowian', group: 'F', hit: 950_000 },
    { name: 'Arttu Hyry', group: 'F', hit: 875_000 },
    { name: 'Jamie Benn', group: 'F', hit: 850_000 },
    { name: 'Colin Blackwell', group: 'F', hit: 850_000 },
    { name: 'Oskar Back', group: 'F', hit: 825_000 },
    { name: 'Thomas Harley', group: 'D', hit: 10_587_000 },
    { name: 'Miro Heiskanen', group: 'D', hit: 8_450_000 },
    { name: 'Esa Lindell', group: 'D', hit: 5_250_000 },
    { name: 'Nils Lundkvist', group: 'D', hit: 1_750_000 },
    { name: 'Tyler Myers', group: 'D', hit: 1_500_000 },
    { name: 'Lian Bichsel', group: 'D', hit: 918_333 },
    { name: 'Kyle Capobianco', group: 'D', hit: 875_000 },
    { name: 'Jake Oettinger', group: 'G', hit: 8_250_000 },
    { name: 'Casey DeSmith', group: 'G', hit: 1_050_000 },
    { name: 'Bonus Carryover Overage', group: 'O', hit: 2_080_000, charge: 'buyout' },
  ],
}

export { STATUS, RUMOR_STATUS }
