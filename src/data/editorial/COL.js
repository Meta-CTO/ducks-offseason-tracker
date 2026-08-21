import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/COL.json'
import draft from '../draft/COL.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// Colorado Avalanche editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Avalanche team reset for the 2026-27 season. Cap
// figures read from PuckPedia on Aug. 19, 2026. Every "after" lineup is a projection until the club announces a
// roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'Colorado Avalanche',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['They won the Presidents’ Trophy.', 'Then they lost their GM.'],
  deck:
    'Colorado went 55-16-11, the best record in the league, and lost the ' +
    'Western Conference Final to Vegas in four games. Then Chris MacFarland ' +
    'left to run Nashville, Joe Sakic took the general manager’s job back, and ' +
    'three forwards were traded away for picks and younger players. The ' +
    'contract that matters most has not been signed: Cale Makar can become an ' +
    'unrestricted free agent after this season.',
}

export const ledgerRange = 'June 2 – July 2'

export const departures = [
  { date: 'Jun. 2', player: 'Chris MacFarland', pos: 'General manager', mechanism: 'Left for Nashville', detail: 'Became president of hockey operations and general manager of the Predators after four seasons in Colorado.' },
  { date: 'Jun. 16', player: 'Ross Colton', pos: 'F', mechanism: 'Trade to Nashville', detail: 'Returned goaltender Magnus Chrona and third-round picks in 2026 and 2027.' },
  { date: 'Jun. 24', player: 'Jack Drury', pos: 'F', mechanism: 'Trade to Nashville', detail: 'Sent with prospect Chase Bradley and a 2029 third-round pick after 27 points in 82 games.' },
  { date: 'Jun. 25', player: 'Valeri Nichushkin', pos: 'F', mechanism: 'Trade to Columbus', detail: 'Returned a 2026 second, a 2027 third and a 2028 fifth after 49 points in 72 games.' },
]

export const arrivals = [
  { date: 'Jun. 24', player: 'Fedor Svechkov', pos: 'F', deal: 'Trade from Nashville; two years from 2026-27', role: 'Twenty-three; projected to centre the fourth line' },
  { date: 'Jun. 24', player: 'Zachary L’Heureux', pos: 'F', deal: 'Trade from Nashville', role: 'Twenty-three; projected on the third line' },
  { date: 'Jul. 1', player: 'Noah Juulsen', pos: 'D', deal: 'Two years', role: 'From Philadelphia after 10 points in 52 games' },
  { date: 'Jul. 2', player: 'Jaden Schwartz', pos: 'F', deal: 'Three years', role: 'From Seattle; won the Stanley Cup with St. Louis in 2019' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Nichushkin, Drury and Colton traded; Schwartz, Svechkov and L’Heureux in — depth rows are from the roster feed and 2025–26 club stats, not individually researched',
    rows: [
      {
        pos: 'C', before: 'Nathan MacKinnon', after: 'Nathan MacKinnon', status: 'retained',
        notes: ['Projected to centre the top line between Artturi Lehkonen and Martin Necas'],
      },
      {
        pos: 'F', before: 'Valeri Nichushkin', after: null, status: 'departed',
        notes: [
          'Traded to Columbus on Jun. 25 for a 2026 second, a 2027 third and a 2028 fifth',
          '49 points in 72 games',
        ],
      },
      {
        pos: 'F', before: null, after: 'Jaden Schwartz', status: 'added',
        notes: [
          'Three years on Jul. 2 after 26 points in 50 games with Seattle',
          'Thirty-four, and a Stanley Cup winner with St. Louis in 2019',
        ],
      },
      {
        pos: 'F', before: null, after: 'Zachary L’Heureux', status: 'added',
        notes: [
          'Arrived from Nashville on Jun. 24 with Svechkov',
          'Projected on the third line with Brock Nelson and Schwartz',
        ],
      },
      {
        pos: 'C', before: null, after: 'Fedor Svechkov', status: 'added',
        notes: [
          'Arrived from Nashville on Jun. 24 and signed for two years',
          'Projected to centre the fourth line',
        ],
      },
      {
        pos: 'F', before: 'Jack Drury', after: null, status: 'departed',
        notes: ['Traded to Nashville on Jun. 24 after 27 points in 82 games'],
      },
      {
        pos: 'F', before: 'Ross Colton', after: null, status: 'departed',
        notes: ['Traded to Nashville on Jun. 16 after 24 points in 73 games'],
      },
          {
        pos: 'C', before: 'Vinnie Hinostroza', after: 'Vinnie Hinostroza', status: 'retained',
        notes: [
          'On the current roster; no 2025–26 games for the club',
        ],
      },
      {
        pos: 'C', before: 'Nazem Kadri', after: 'Nazem Kadri', status: 'retained',
        notes: [
          'Played 16 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Parker Kelly', after: 'Parker Kelly', status: 'retained',
        notes: [
          'Played 82 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'L', before: 'Gabriel Landeskog', after: 'Gabriel Landeskog', status: 'retained',
        notes: [
          'Played 60 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'L', before: 'Artturi Lehkonen', after: 'Artturi Lehkonen', status: 'retained',
        notes: [
          'Played 70 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Martin Necas', after: 'Martin Necas', status: 'retained',
        notes: [
          'Played 78 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Brock Nelson', after: 'Brock Nelson', status: 'retained',
        notes: [
          'Played 81 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'R', before: 'Logan O\'Connor', after: 'Logan O\'Connor', status: 'retained',
        notes: [
          'Played 13 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Nicolas Roy', after: 'Nicolas Roy', status: 'retained',
        notes: [
          'Played 15 games for the club in 2025–26 and is on the current roster',
        ],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Intact at the top, with Makar’s contract the outstanding question — depth rows are from the roster feed and 2025–26 club stats, not individually researched',
    rows: [
      {
        pos: 'RD', before: 'Cale Makar', after: 'Cale Makar', status: 'retained',
        notes: [
          'Can become an unrestricted free agent after 2026-27; the reset names an extension as the outstanding need',
          'Projected on the top pair with Devon Toews',
        ],
      },
      {
        pos: 'RD', before: 'Brent Burns', after: 'Brent Burns', status: 'retained',
        notes: ['Projected on the second pair with Josh Manson'],
      },
      {
        pos: 'D', before: null, after: 'Noah Juulsen', status: 'added',
        notes: ['Two years on Jul. 1 after 10 points in 52 games with Philadelphia'],
      },
          {
        pos: 'D', before: 'Brett Kulak', after: 'Brett Kulak', status: 'retained',
        notes: [
          'Played 27 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'D', before: 'Sam Malinski', after: 'Sam Malinski', status: 'retained',
        notes: [
          'Played 82 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'D', before: 'Josh Manson', after: 'Josh Manson', status: 'retained',
        notes: [
          'Played 79 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'D', before: 'Devon Toews', after: 'Devon Toews', status: 'retained',
        notes: [
          'Played 68 games for the club in 2025–26 and is on the current roster',
        ],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Unchanged: Wedgewood and Blackwood',
    rows: [
      {
        pos: 'G', before: 'Scott Wedgewood', after: 'Scott Wedgewood', status: 'retained',
        notes: ['Listed first among the projected goaltenders'],
      },
      {
        pos: 'G', before: 'Mackenzie Blackwood', after: 'Mackenzie Blackwood', status: 'retained',
        notes: ['Listed second among the projected goaltenders'],
      },
    ],
  },
  {
    group: 'Coaching',
    summary: 'MacFarland left for Nashville; Joe Sakic took the general manager’s job',
    rows: [
      {
        pos: 'General manager', before: 'Chris MacFarland', after: 'Joe Sakic', status: 'added',
        notes: [
          'MacFarland left on Jun. 2 to run Nashville after four seasons',
          'Sakic took the role back',
        ],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'The best regular season, and then out in four',
    body: 'Colorado won the Presidents’ Trophy at 55-16-11 and lost the Western Conference Final to Vegas in four games. Everything that followed reads against that result.',
  },
  {
    title: 'The general manager left for a rival',
    body: 'Chris MacFarland went to Nashville on Jun. 2 as president of hockey operations and general manager. Joe Sakic took the job back — and Nashville then acquired three Colorado forwards.',
  },
  {
    title: 'Three forwards out, younger ones in',
    body: 'Valeri Nichushkin went to Columbus for three picks; Jack Drury and Ross Colton both went to Nashville. Jaden Schwartz, Fedor Svechkov and Zachary L’Heureux came the other way.',
  },
  {
    title: 'Makar’s contract is unfinished business',
    body: 'Cale Makar can reach unrestricted free agency after this season, and the reset names an extension as the outstanding need. Nothing has been announced.',
  },
]

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'Zachary L’Heureux', pos: 'F', note: 'Twenty-three, projected onto the third line after arriving from Nashville.' },
  { name: 'Fedor Svechkov', pos: 'C', note: 'Projected to centre the fourth line in his first season in Colorado.' },
]

export const unresolved = [
  { status: 'Open', item: 'Cale Makar’s extension', impact: 'Can become a UFA after 2026-27; the reset names it as the priority' },
  { status: 'Open', item: 'Replacing Nichushkin’s scoring', impact: '49 points traded for picks' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Avalanche 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/colorado-avalanche-roster-changes-for-2026-27-season' },
  { label: 'Official Avalanche news', url: 'https://www.nhl.com/avalanche/news/' },
]

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}

// COL cap data, PuckPedia, retrieved Aug. 19, 2026.
export const cap = {
  capSummary: {
    ceiling: 104_000_000,
    capHit: 103_595_841,
    space: 404_159,
    rosterSlots: '22 / 23',
    potentialBonuses: 2_150_000,
    asOf: 'Aug. 19, 2026',
  },
  capGroups: [
    { key: 'F', label: 'Forwards', color: 'var(--cap-forwards)', total: 62_154_000 },
    { key: 'D', label: 'Defense', color: 'var(--cap-defense)', total: 31_400_000 },
    { key: 'G', label: 'Goaltending', color: 'var(--cap-goalies)', total: 7_750_000 },
    { key: 'O', label: 'Retained & buyouts', color: 'var(--cap-other)', total: 2_291_841 },
  ],
  capHits: [
    { name: 'Nathan MacKinnon', group: 'F', hit: 12_604_000 },
    { name: 'Martin Necas', group: 'F', hit: 11_500_000 },
    { name: 'Brock Nelson', group: 'F', hit: 7_500_000 },
    { name: 'Gabriel Landeskog', group: 'F', hit: 7_000_000 },
    { name: 'Nazem Kadri', group: 'F', hit: 5_600_000 },
    { name: 'Artturi Lehkonen', group: 'F', hit: 4_500_000 },
    { name: 'Jaden Schwartz', group: 'F', hit: 3_250_000 },
    { name: 'Nicolas Roy', group: 'F', hit: 3_000_000 },
    { name: 'Logan O\'Connor', group: 'F', hit: 2_500_000 },
    { name: 'Parker Kelly', group: 'F', hit: 1_700_000 },
    { name: 'Fedor Svechkov', group: 'F', hit: 1_250_000 },
    { name: 'Zachary L\'Heureux', group: 'F', hit: 875_000 },
    { name: 'Gavin Brindley', group: 'F', hit: 875_000 },
    { name: 'Cale Makar', group: 'D', hit: 9_000_000 },
    { name: 'Devon Toews', group: 'D', hit: 7_250_000 },
    { name: 'Sam Malinski', group: 'D', hit: 4_750_000 },
    { name: 'Brett Kulak', group: 'D', hit: 4_500_000 },
    { name: 'Josh Manson', group: 'D', hit: 3_950_000 },
    { name: 'Noah Juulsen', group: 'D', hit: 1_100_000 },
    { name: 'Brent Burns', group: 'D', hit: 850_000 },
    { name: 'Mackenzie Blackwood', group: 'G', hit: 5_250_000 },
    { name: 'Scott Wedgewood', group: 'G', hit: 2_500_000 },
    { name: 'Bonus Carryover Overage', group: 'O', hit: 2_291_841, charge: 'buyout' },
  ],
}

export { STATUS, RUMOR_STATUS }
