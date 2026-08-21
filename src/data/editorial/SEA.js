import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/SEA.json'
import draft from '../draft/SEA.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// Seattle Kraken editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Kraken team reset for the 2026-27 season. Cap
// figures read from PuckPedia on Aug. 19, 2026. Every "after" lineup is a projection
// until the club announces a roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'Seattle Kraken',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['They bought a 23-year-old winger.', 'They paid in picks.'],
  deck:
    'Seattle sent a 2026 first and a 2027 second to Florida for Mackie ' +
    'Samoskevich, then signed him for three years at $3.85 million. Jaden ' +
    'Schwartz and Jamie Oleksiak left in free agency and Eeli Tolvanen is ' +
    'still unsigned. The bet is that a young winger takes off in Lane ' +
    'Lambert’s system — the general manager has said so out loud.',
}

export const ledgerRange = 'June 21 – July 2'

export const departures = [
  { date: 'Jul. 1', player: 'Jamie Oleksiak', pos: 'D', mechanism: 'UFA', detail: 'Signed a two-year contract with Vancouver after 15 points in 78 games.' },
  { date: 'Jul. 2', player: 'Jaden Schwartz', pos: 'F', mechanism: 'UFA', detail: 'Signed a three-year contract with Colorado after 26 points in 50 games.' },
  { date: 'Jul. 1', player: 'Eeli Tolvanen', pos: 'F', mechanism: 'UFA', detail: 'Unsigned as of this brief, which is the only firm statement about him; 36 points in 78 games last season.' },
]

export const arrivals = [
  { date: 'Jun. 21', player: 'Mackie Samoskevich', pos: 'F', deal: 'Trade from Florida; three years, $11.5M ($3.85M AAV) signed Jul. 1', role: 'Cost a 2026 first-round pick and a 2027 second; projected third line' },
  { date: 'Jul. 1', player: 'Curtis Douglas', pos: 'F', deal: 'Two years, $2.5M ($1.25M AAV)', role: 'Forward depth; played for Tampa Bay and Vancouver last season' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Schwartz gone and Tolvanen unsigned; Samoskevich bought with picks and signed for three years — projected roles are NHL.com’s',
    rows: [
      {
        pos: 'F', before: null, after: 'Mackie Samoskevich', status: 'added',
        notes: [
          'Acquired from Florida on Jun. 21 for a 2026 first-round pick and a 2027 second',
          'Signed Jul. 1 for three years, $11.5M — a $3.85M cap hit',
          'Twenty-three; the general manager said “we think his numbers are really going to take off here”',
        ],
      },
      {
        pos: 'C', before: 'Matty Beniers', after: 'Matty Beniers', status: 'retained',
        notes: ['Projected to centre the top line between Bobby McMann and Jordan Eberle'],
      },
      {
        pos: 'C', before: 'Shane Wright', after: 'Shane Wright', status: 'retained',
        notes: ['Projected to centre the second line with Jared McCann and Berkly Catton'],
      },
      {
        pos: 'F', before: 'Jaden Schwartz', after: null, status: 'departed',
        notes: ['Signed a three-year contract with Colorado on Jul. 2 after 26 points in 50 games'],
      },
      {
        pos: 'F', before: 'Eeli Tolvanen', after: null, status: 'unsigned',
        notes: [
          'An unsigned unrestricted free agent, which is the only firm fact about his situation',
          '36 points in 78 games last season',
        ],
      },
      {
        pos: 'F', before: null, after: 'Curtis Douglas', status: 'added',
        notes: ['Two years at $1.25M a season on Jul. 1'],
      },
      {
        pos: 'C', before: 'Berkly Catton', after: 'Berkly Catton', status: 'retained',
        notes: [
          'Projected on the second line alongside Jared McCann and Shane Wright',
        ],
      },
      {
        pos: 'R', before: 'Jordan Eberle', after: 'Jordan Eberle', status: 'retained',
        notes: [
          'Projected on the first line alongside Bobby McMann and Matty Beniers',
        ],
      },
      {
        pos: 'C', before: 'Frederick Gaudreau', after: 'Frederick Gaudreau', status: 'retained',
        notes: [
          'Projected to centre the fourth line between Ryan Winterton and Jacob Melanson',
        ],
      },
      {
        pos: 'R', before: 'Kaapo Kakko', after: 'Kaapo Kakko', status: 'retained',
        notes: [
          'Projected on the third line alongside Mackie Samoskevich and Chandler Stephenson',
        ],
      },
      {
        pos: 'L', before: 'Jared McCann', after: 'Jared McCann', status: 'retained',
        notes: [
          'Projected on the second line alongside Shane Wright and Berkly Catton',
        ],
      },
      {
        pos: 'C', before: 'Bobby McMann', after: 'Bobby McMann', status: 'retained',
        notes: [
          'Projected on the first line alongside Matty Beniers and Jordan Eberle',
        ],
      },
      {
        pos: 'C', before: 'Ben Meyers', after: 'Ben Meyers', status: 'retained',
        notes: [
          'On the roster; not in NHL.com\'s projected lineup',
        ],
      },
      {
        pos: 'C', before: 'Chandler Stephenson', after: 'Chandler Stephenson', status: 'retained',
        notes: [
          'Projected to centre the third line between Mackie Samoskevich and Kaapo Kakko',
        ],
      },
      {
        pos: 'C', before: 'Ryan Winterton', after: 'Ryan Winterton', status: 'retained',
        notes: [
          'Projected on the fourth line alongside Frederick Gaudreau and Jacob Melanson',
        ],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Oleksiak left for Vancouver; the rest of the group is projected intact — projected roles are NHL.com’s',
    rows: [
      {
        pos: 'D', before: 'Jamie Oleksiak', after: null, status: 'departed',
        notes: ['Signed a two-year contract with Vancouver on Jul. 1 after 15 points in 78 games'],
      },
      {
        pos: 'LD', before: 'Vince Dunn', after: 'Vince Dunn', status: 'retained',
        notes: ['Projected on the top pair with Adam Larsson'],
      },
      {
        pos: 'RD', before: 'Brandon Montour', after: 'Brandon Montour', status: 'retained',
        notes: ['Projected on the second pair'],
      },
      {
        pos: 'D', before: 'Ryker Evans', after: 'Ryker Evans', status: 'retained',
        notes: [
          'Projected on the second pair with Brandon Montour',
        ],
      },
      {
        pos: 'D', before: 'Cale Fleury', after: 'Cale Fleury', status: 'retained',
        notes: [
          'Projected on the third pair with Ryan Lindgren',
        ],
      },
      {
        pos: 'D', before: 'Adam Larsson', after: 'Adam Larsson', status: 'retained',
        notes: [
          'Projected on the top pair with Vince Dunn',
        ],
      },
      {
        pos: 'D', before: 'Ryan Lindgren', after: 'Ryan Lindgren', status: 'retained',
        notes: [
          'Projected on the third pair with Cale Fleury',
        ],
      },
      {
        pos: 'D', before: 'Joshua Mahura', after: 'Joshua Mahura', status: 'retained',
        notes: [
          'On the roster; not in NHL.com\'s projected lineup',
        ],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Unchanged: Daccord and Grubauer',
    rows: [
      {
        pos: 'G', before: 'Joey Daccord', after: 'Joey Daccord', status: 'retained',
        notes: ['Projected starter'],
      },
      {
        pos: 'G', before: 'Philipp Grubauer', after: 'Philipp Grubauer', status: 'retained',
        notes: ['Projected backup'],
      },
    ],
  },
  {
    group: 'Coaching',
    summary: 'Lane Lambert returns behind the bench',
    rows: [
      {
        pos: 'Head coach', before: 'Lane Lambert', after: 'Lane Lambert', status: 'retained',
        notes: [
          'Listed as the club\'s head coach for both 2025–26 and 2026–27',
        ],
      },
      {
        pos: 'Assistant coach', before: 'Chris Taylor', after: 'Chris Taylor', status: 'onstaff',
        notes: [
          'Listed on the club\'s coaching staff for 2026–27',
        ],
      },
      {
        pos: 'Assistant coach', before: 'Aaron Schneekloth', after: 'Aaron Schneekloth', status: 'onstaff',
        notes: [
          'Listed on the club\'s coaching staff for 2026–27',
        ],
      },
      {
        pos: 'Assistant coach', before: 'Pascal Vincent', after: 'Pascal Vincent', status: 'onstaff',
        notes: [
          'Listed on the club\'s coaching staff for 2026–27',
        ],
      },
      {
        pos: 'Goaltending coach', before: 'Colin Zulianello', after: 'Colin Zulianello', status: 'onstaff',
        notes: [
          'Listed on the club\'s coaching staff for 2026–27',
        ],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'A first-round pick for a 23-year-old',
    body: 'Mackie Samoskevich cost a 2026 first and a 2027 second, then signed for three years at $3.85 million. Seattle is buying the development curve rather than the production to date.',
  },
  {
    title: 'Two regulars walked in free agency',
    body: 'Jaden Schwartz signed with Colorado and Jamie Oleksiak with Vancouver, both on Jul. 1–2. Eeli Tolvanen remains unsigned.',
  },
]

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'Berkly Catton', pos: 'C/LW', note: 'Projected onto the second line; a projection, not an announced job.' },
  { name: 'Logan Morrison', pos: 'F', note: 'Named as a call-up candidate if a roster spot opens.' },
  { name: 'Jagger Firkus', pos: 'F', note: 'Named as a call-up candidate if a roster spot opens.' },
  { name: 'Ryden Evers', pos: 'F', note: 'Named as a call-up candidate if a roster spot opens.' },
]

export const unresolved = [
  { status: 'Open', item: 'Eeli Tolvanen', impact: 'Still an unsigned UFA; 36 points of scoring unaccounted for' },
  { status: 'Open', item: 'What to do with $18.4M', impact: 'The most projected cap space in the league, and a roster already at 23' },
  { status: 'Open', item: 'Whether Samoskevich takes the step', impact: 'The club paid a first-round pick and three years on the premise that he will' },
]

export const rumors = []

export const sources = [
  { label: 'Coaching staff (NHL.com club site)', url: 'https://www.nhl.com/kraken/team/coaching-staff/' },
  { label: 'NHL.com Kraken 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/seattle-kraken-roster-changes-for-2026-27-season' },
  { label: 'Official Kraken news', url: 'https://www.nhl.com/kraken/news/' },
]

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}

// SEA cap data, PuckPedia, retrieved Aug. 19, 2026.
export const cap = {
  capSummary: {
    ceiling: 104_000_000,
    capHit: 85_594_463,
    space: 18_405_537,
    rosterSlots: '23 / 23',
    potentialBonuses: 4_062_500,
    asOf: 'Aug. 19, 2026',
  },
  capGroups: [
    { key: 'F', label: 'Forwards', color: 'var(--cap-forwards)', total: 46_224_939 },
    { key: 'D', label: 'Defense', color: 'var(--cap-defense)', total: 28_090_357 },
    { key: 'G', label: 'Goaltending', color: 'var(--cap-goalies)', total: 10_900_000 },
    { key: 'O', label: 'Retained & buyouts', color: 'var(--cap-other)', total: 379_167 },
  ],
  capHits: [
    { name: 'Matty Beniers', group: 'F', hit: 7_142_857 },
    { name: 'Chandler Stephenson', group: 'F', hit: 6_250_000 },
    { name: 'Bobby McMann', group: 'F', hit: 5_750_000 },
    { name: 'Jordan Eberle', group: 'F', hit: 5_500_000 },
    { name: 'Jared McCann', group: 'F', hit: 5_000_000 },
    { name: 'Kaapo Kakko', group: 'F', hit: 4_525_000 },
    { name: 'Mackie Samoskevich', group: 'F', hit: 3_850_000 },
    { name: 'Frederick Gaudreau', group: 'F', hit: 2_100_000 },
    { name: 'Curtis Douglas', group: 'F', hit: 1_250_000 },
    { name: 'Ryan Winterton', group: 'F', hit: 1_125_000 },
    { name: 'Ben Meyers', group: 'F', hit: 1_000_000 },
    { name: 'Berkly Catton', group: 'F', hit: 953_750 },
    { name: 'Jani Nyman', group: 'F', hit: 891_666 },
    { name: 'Shane Wright', group: 'F', hit: 886_666 },
    { name: 'Vince Dunn', group: 'D', hit: 7_350_000 },
    { name: 'Brandon Montour', group: 'D', hit: 7_142_857 },
    { name: 'Adam Larsson', group: 'D', hit: 5_250_000 },
    { name: 'Ryan Lindgren', group: 'D', hit: 4_500_000 },
    { name: 'Ryker Evans', group: 'D', hit: 2_050_000 },
    { name: 'Joshua Mahura', group: 'D', hit: 907_500 },
    { name: 'Cale Fleury', group: 'D', hit: 890_000 },
    { name: 'Philipp Grubauer', group: 'G', hit: 5_900_000 },
    { name: 'Joey Daccord', group: 'G', hit: 5_000_000 },
    { name: 'C,LW', group: 'O', hit: 379_167, charge: 'buyout' },
  ],
}

export { STATUS, RUMOR_STATUS }
