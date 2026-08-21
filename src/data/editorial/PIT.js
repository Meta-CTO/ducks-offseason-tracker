import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/PIT.json'
import draft from '../draft/PIT.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// Pittsburgh Penguins editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Penguins team reset for the 2026-27 season. Cap
// figures read from PuckPedia on Aug. 19, 2026. Every "after" lineup is a projection until the club announces a
// roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'Pittsburgh Penguins',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['They chose not to act.', 'Malkin signed for a 21st season.'],
  deck:
    'Pittsburgh let its leading scorer walk, replaced him with a one-year ' +
    'signing, and swapped a defenseman for a defenseman. The general manager ' +
    'said so plainly: rather than doing something for the sake of it, he would ' +
    'rather admit the options were not there. Evgeni Malkin extended for a ' +
    '21st season at thirty-nine, alongside Sidney Crosby.',
}

export const ledgerRange = 'May 26 – July 15'

export const departures = [
  { date: 'Jun. 30', player: 'Parker Wotherspoon', pos: 'D', mechanism: 'Trade to Vegas', detail: 'Sent for Kaedan Korczak after career highs of 30 points and +17 in 80 games as Erik Karlsson’s partner.' },
  { date: 'Jul. 1', player: 'Stuart Skinner', pos: 'G', mechanism: 'UFA', detail: 'Signed a two-year contract with Winnipeg, having arrived from Edmonton in December in the Tristan Jarry trade.' },
  { date: 'Jul. 1', player: 'Noel Acciari', pos: 'F', mechanism: 'UFA', detail: 'Signed a two-year contract with Philadelphia; a penalty-killing specialist.' },
  { date: 'Jul. 15', player: 'Anthony Mantha', pos: 'RW', mechanism: 'UFA', detail: 'Signed a two-year contract with New Jersey after leading Pittsburgh with 33 goals and 64 points in his only season.' },
]

export const arrivals = [
  { date: 'May 26', player: 'Evgeni Malkin', pos: 'C', deal: 'One-year extension; $5.5M cap hit', role: 'Re-signed for a 21st season at thirty-nine; projected second line' },
  { date: 'Offseason', player: 'Ville Koivunen', pos: 'RW', deal: 'Eight years, $4M AAV', role: 'Re-signed long term at twenty-three; recorded on PuckPedia rather than the reset' },
  { date: 'Jun. 25', player: 'Hendrix Lapierre', pos: 'F', deal: 'Trade from Washington', role: 'Cost a 2027 third and a 2028 fifth; recorded on the Capitals reset' },
  { date: 'Jun. 30', player: 'Kaedan Korczak', pos: 'D', deal: 'Trade from Vegas for Parker Wotherspoon', role: 'Twenty-five; projected third pair' },
  { date: 'Jul. 1', player: 'Andrei Kuzmenko', pos: 'F', deal: 'One year', role: 'From Los Angeles; recovering from February meniscus surgery; signed to replace Mantha' },
  { date: 'Jul. 1', player: 'Trevor van Riemsdyk', pos: 'D', deal: 'Two years', role: 'From Washington; projected to partner Erik Karlsson' },
  { date: 'Jul. 1', player: 'Nicholas Robertson', pos: 'F', deal: 'Trade from Toronto; two years, signed Jul. 14', role: 'Career-high 32 points in 78 games; projected third line' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Mantha and his 33 goals left; Kuzmenko and Robertson signed to replace them — depth rows are from the roster feed and 2025–26 club stats, not individually researched',
    rows: [
      {
        pos: 'C', before: 'Sidney Crosby', after: 'Sidney Crosby', status: 'retained',
        notes: ['Projected to centre the top line between Rickard Rakell and Bryan Rust'],
      },
      {
        pos: 'C', before: 'Evgeni Malkin', after: 'Evgeni Malkin', status: 'retained',
        notes: [
          'Signed a one-year extension on May 26 for a 21st season, at thirty-nine',
          'Projected on the second line with Tommy Novak and Egor Chinakhov',
        ],
      },
      {
        pos: 'RW', before: 'Anthony Mantha', after: null, status: 'departed',
        notes: [
          'Signed a two-year contract with New Jersey on Jul. 15',
          'Led Pittsburgh with 33 goals and 64 points in his only season, after returning from ACL surgery',
        ],
      },
      {
        pos: 'F', before: null, after: 'Andrei Kuzmenko', status: 'added',
        notes: [
          'One year on Jul. 1 from Los Angeles, explicitly as the Mantha replacement',
          'Recovering from meniscus surgery in February',
        ],
      },
      {
        pos: 'F', before: null, after: 'Nicholas Robertson', status: 'added',
        notes: [
          'Acquired from Toronto on Jul. 1 and signed for two years on Jul. 14',
          'A career-high 32 points in 78 games; projected third line',
        ],
      },
          {
        pos: 'R', before: 'Justin Brazeau', after: 'Justin Brazeau', status: 'retained',
        notes: [
          'Played 64 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'R', before: 'Egor Chinakhov', after: 'Egor Chinakhov', status: 'retained',
        notes: [
          'Played 43 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Connor Dewar', after: 'Connor Dewar', status: 'retained',
        notes: [
          'Played 78 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Ben Kindel', after: 'Ben Kindel', status: 'retained',
        notes: [
          'Played 77 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'R', before: 'Ville Koivunen', after: 'Ville Koivunen', status: 'retained',
        notes: [
          'Played 39 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Hendrix Lapierre', after: 'Hendrix Lapierre', status: 'retained',
        notes: [
          'On the current roster; no 2025–26 games for the club',
        ],
      },
      {
        pos: 'C', before: 'Blake Lizotte', after: 'Blake Lizotte', status: 'retained',
        notes: [
          'Played 55 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Tommy Novak', after: 'Tommy Novak', status: 'retained',
        notes: [
          'Played 82 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'R', before: 'Rickard Rakell', after: 'Rickard Rakell', status: 'retained',
        notes: [
          'Played 60 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'L', before: 'Nick Robertson', after: 'Nick Robertson', status: 'retained',
        notes: [
          'On the current roster; no 2025–26 games for the club',
        ],
      },
      {
        pos: 'R', before: 'Bryan Rust', after: 'Bryan Rust', status: 'retained',
        notes: [
          'Played 72 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'L', before: 'Elmer Soderblom', after: 'Elmer Soderblom', status: 'retained',
        notes: [
          'Played 20 games for the club in 2025–26 and is on the current roster',
        ],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Wotherspoon swapped for Korczak; van Riemsdyk signed to partner Karlsson — depth rows are from the roster feed and 2025–26 club stats, not individually researched',
    rows: [
      {
        pos: 'RD', before: 'Erik Karlsson', after: 'Erik Karlsson', status: 'retained',
        notes: ['Projected on the top pair, now with Trevor van Riemsdyk'],
      },
      {
        pos: 'D', before: null, after: 'Trevor van Riemsdyk', status: 'added',
        notes: [
          'Two years on Jul. 1 from Washington at thirty-four',
          'A 2015 Stanley Cup champion; projected to partner Karlsson',
        ],
      },
      {
        pos: 'D', before: 'Parker Wotherspoon', after: null, status: 'departed',
        notes: [
          'Traded to Vegas on Jun. 30 for Kaedan Korczak',
          'Career highs of 30 points and +17 in 80 games as Karlsson’s partner',
        ],
      },
      {
        pos: 'D', before: null, after: 'Kaedan Korczak', status: 'added',
        notes: ['Arrived from Vegas on Jun. 30; projected third pair with Ryan Graves'],
      },
          {
        pos: 'D', before: 'Declan Carlile', after: 'Declan Carlile', status: 'retained',
        notes: [
          'On the current roster; no 2025–26 games for the club',
        ],
      },
      {
        pos: 'D', before: 'Samuel Girard', after: 'Samuel Girard', status: 'retained',
        notes: [
          'Played 20 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'D', before: 'Kris Letang', after: 'Kris Letang', status: 'retained',
        notes: [
          'Played 74 games for the club in 2025–26 and is on the current roster',
        ],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Skinner left for Winnipeg; Silovs and Murashov projected',
    rows: [
      {
        pos: 'G', before: 'Arturs Silovs', after: 'Arturs Silovs', status: 'retained',
        notes: ['Listed first among the projected goaltenders'],
      },
      {
        pos: 'G', before: 'Sergei Murashov', after: 'Sergei Murashov', status: 'camp',
        notes: ['The reset names his development as an open question'],
      },
      {
        pos: 'G', before: 'Stuart Skinner', after: null, status: 'departed',
        notes: ['Signed a two-year contract with Winnipeg on Jul. 1'],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'A deliberate decision not to act',
    body: 'Kyle Dubas: “Rather than just doing something for the sake of doing it, I’d rather come here and say, ‘Yeah, we aspire to do it and the options weren’t there.’” Pittsburgh’s largest addition was a one-year deal.',
  },
  {
    title: 'The leading scorer left',
    body: 'Anthony Mantha scored 33 goals and 64 points in his only season in Pittsburgh, then signed in New Jersey on Jul. 15. Andrei Kuzmenko, on one year and coming off meniscus surgery, is the stated replacement.',
  },
  {
    title: 'Malkin for a 21st season',
    body: 'A one-year extension signed May 26 keeps him alongside Sidney Crosby at thirty-nine.',
  },
]

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'Ben Kindel', pos: 'C', note: 'Projected to centre the third line between Kuzmenko and Robertson.' },
  { name: 'Sergei Murashov', pos: 'G', note: 'Named in the reset as a potential future starter; development still open.' },
  { name: 'Harrison Brunicke', pos: 'D', note: 'The reset asks whether he can find a path to the NHL roster.' },
  { name: 'Rutger McGroarty', pos: 'F', note: 'A former first-round prospect whose growth the reset flags as a question.' },
]

export const unresolved = [
  { status: 'Open', item: 'Replacing 33 goals', impact: 'Mantha left and the replacement is on a one-year deal, coming off surgery' },
  { status: 'Open', item: 'Goaltending', impact: 'Skinner left; Silovs and Murashov are the projected pair' },
  { status: 'Open', item: 'Sergei Murashov’s development', impact: 'Named in the reset as a potential future starter, at a $936,110 cap hit' },
  { status: 'Open', item: 'Money owed to players who left', impact: '$3.28M burying Ryan Graves and $500K retained on Parker Wotherspoon, now in Vegas' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Penguins 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/pittsburgh-penguins-roster-changes-for-2026-27-season' },
  { label: 'NHL.com Capitals team reset (Lapierre trade)', url: 'https://www.nhl.com/news/topic/team-resets/washington-capitals-roster-changes-for-2026-27-season' },
  { label: 'Official Penguins news', url: 'https://www.nhl.com/penguins/news/' },
]

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}

// PIT cap data, PuckPedia, retrieved Aug. 19, 2026.
export const cap = {
  capSummary: {
    ceiling: 104_000_000,
    capHit: 93_097_360,
    space: 10_902_640,
    rosterSlots: '23 / 23',
    potentialBonuses: 4_000_000,
    asOf: 'Aug. 19, 2026',
  },
  capGroups: [
    { key: 'F', label: 'Forwards', color: 'var(--cap-forwards)', total: 55_736_250 },
    { key: 'D', label: 'Defense', color: 'var(--cap-defense)', total: 29_850_000 },
    { key: 'G', label: 'Goaltending', color: 'var(--cap-goalies)', total: 3_736_110 },
    { key: 'O', label: 'Retained & buyouts', color: 'var(--cap-other)', total: 3_775_000 },
  ],
  capHits: [
    { name: 'Sidney Crosby', group: 'F', hit: 8_700_000 },
    { name: 'Egor Chinakhov', group: 'F', hit: 6_250_000 },
    { name: 'Evgeni Malkin', group: 'F', hit: 5_500_000 },
    { name: 'Bryan Rust', group: 'F', hit: 5_125_000 },
    { name: 'Rickard Rakell', group: 'F', hit: 5_000_000 },
    { name: 'Andrei Kuzmenko', group: 'F', hit: 5_000_000 },
    { name: 'Ville Koivunen', group: 'F', hit: 4_000_000 },
    { name: 'Tommy Novak', group: 'F', hit: 3_500_000 },
    { name: 'Nicholas Robertson', group: 'F', hit: 3_250_000 },
    { name: 'Connor Dewar', group: 'F', hit: 2_250_000 },
    { name: 'Blake Lizotte', group: 'F', hit: 2_250_000 },
    { name: 'Justin Brazeau', group: 'F', hit: 1_500_000 },
    { name: 'Hendrix Lapierre', group: 'F', hit: 1_300_000 },
    { name: 'Elmer Soderblom', group: 'F', hit: 1_125_000 },
    { name: 'Ben Kindel', group: 'F', hit: 986_250 },
    { name: 'Erik Karlsson', group: 'D', hit: 10_000_000 },
    { name: 'Kris Letang', group: 'D', hit: 6_100_000 },
    { name: 'Samuel Girard', group: 'D', hit: 5_000_000 },
    { name: 'Trevor van Riemsdyk', group: 'D', hit: 4_000_000 },
    { name: 'Kaedan Korczak', group: 'D', hit: 3_250_000 },
    { name: 'Declan Carlile', group: 'D', hit: 1_500_000 },
    { name: 'Arturs Silovs', group: 'G', hit: 2_800_000 },
    { name: 'Sergei Murashov', group: 'G', hit: 936_110 },
    { name: 'Ryan Graves', group: 'O', hit: 3_275_000, charge: 'buried' },
    { name: 'RETAINED', group: 'O', hit: 500_000, charge: 'retained' },
  ],
}

export { STATUS, RUMOR_STATUS }
