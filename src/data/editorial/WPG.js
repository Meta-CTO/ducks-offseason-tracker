import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/WPG.json'
import draft from '../draft/WPG.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// Winnipeg Jets editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Jets team reset for the 2026-27 season. Cap
// figures have not been read from PuckPedia for this club yet, so there is no
// cap tab. Every "after" lineup is a projection until the club announces a
// roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'Winnipeg Jets',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['Toews retired at home.', 'Hellebuyck’s future is the question.'],
  deck:
    'Jonathan Toews played all 82 games in his hometown and then retired on ' +
    'Jun. 19, ending a career of 912 points and three Stanley Cups. Winnipeg ' +
    'signed Stuart Skinner to back up Connor Hellebuyck and extended Cole ' +
    'Perfetti for five years. The unresolved part is the goaltender himself: ' +
    'the general manager has said on the record that the club will listen to ' +
    'offers.',
}

export const ledgerRange = 'June 19 – July 15'

export const departures = [
  { date: 'Jun. 19', player: 'Jonathan Toews', pos: 'C', mechanism: 'Retired', detail: 'Retired at thirty-eight after playing all 82 games in his hometown; 912 points in 1,149 games and three Stanley Cups.' },
  { date: 'Jul. 1', player: 'Eric Comrie', pos: 'G', mechanism: 'UFA', detail: 'Signed a two-year contract with San Jose after two seasons as the backup.' },
  { date: 'Jul. 1', player: 'Colin Miller', pos: 'D', mechanism: 'Signed in Switzerland', detail: 'Signed a one-year contract with Lausanne HC.' },
  { date: 'Offseason', player: 'Gustav Nyquist', pos: 'F', mechanism: 'UFA', detail: 'Unsigned as of this brief, which is the only firm statement about him; 12 points in 51 games.' },
]

export const arrivals = [
  { date: 'Jul. 1', player: 'Stuart Skinner', pos: 'G', deal: 'Two years, $7.5M total', role: 'Backup to Connor Hellebuyck; 23-17-9 in 50 games last season' },
  { date: 'Jul. 1', player: 'Mario Ferraro', pos: 'D', deal: 'Three years', role: 'From San Jose after 23 points and 21:02 a night in 82 games' },
  { date: 'Jul. 1', player: 'Noah Gregor', pos: 'F', deal: 'One year, two-way', role: 'Forward depth; 9 points in 37 games with Florida' },
  { date: 'Jul. 2', player: 'Henry Thrun', pos: 'D', deal: 'One year, two-way', role: 'Defensive depth with 123 NHL games of experience' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Toews retired and Nyquist unsigned; Perfetti extended for five years',
    rows: [
      {
        pos: 'C', before: 'Jonathan Toews', after: null, status: 'departed',
        notes: [
          'Retired Jun. 19 at thirty-eight after playing all 82 games for his hometown club',
          '912 points in 1,149 games and three Stanley Cups',
        ],
      },
      {
        pos: 'LW', before: 'Cole Perfetti', after: 'Cole Perfetti', status: 'retained',
        notes: [
          'Signed a five-year, $30M extension on Jul. 15',
          'Projected on the second line with Adam Lowry and Alex Iafallo',
        ],
      },
      {
        pos: 'LW', before: 'Kyle Connor', after: 'Kyle Connor', status: 'retained',
        notes: ['Projected on the top line with Mark Scheifele and Gabriel Vilardi'],
      },
      {
        pos: 'F', before: 'Gustav Nyquist', after: null, status: 'unsigned',
        notes: ['An unsigned unrestricted free agent, which is the only firm fact about his situation'],
      },
      {
        pos: 'F', before: null, after: 'Noah Gregor', status: 'added',
        notes: ['One year, two-way, on Jul. 1'],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Miller left for Switzerland; Ferraro signed for three years',
    rows: [
      {
        pos: 'LD', before: 'Josh Morrissey', after: 'Josh Morrissey', status: 'retained',
        notes: ['Projected on the top pair with Dylan DeMelo'],
      },
      {
        pos: 'D', before: null, after: 'Mario Ferraro', status: 'added',
        notes: [
          'Three years on Jul. 1 after seven seasons in San Jose',
          '23 points in 82 games at 21:02 a night; projected third pair',
        ],
      },
      {
        pos: 'D', before: null, after: 'Henry Thrun', status: 'added',
        notes: ['One year, two-way, on Jul. 2'],
      },
      {
        pos: 'D', before: 'Colin Miller', after: null, status: 'departed',
        notes: ['Signed with Lausanne HC in Switzerland on Jul. 1'],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Comrie left for San Jose; Skinner signed behind Hellebuyck, whose future is unsettled',
    rows: [
      {
        pos: 'G', before: 'Connor Hellebuyck', after: 'Connor Hellebuyck', status: 'retained',
        notes: [
          'Three-time Vezina winner on an $8.5M cap hit with five seasons left',
          'The reset says he expressed frustration after the season',
          'General manager Kevin Cheveldayoff, on the record: “we’re going to listen” to trade offers',
        ],
      },
      {
        pos: 'G', before: null, after: 'Stuart Skinner', status: 'added',
        notes: [
          'Two years worth $7.5M on Jul. 1',
          '23-17-9 with a 2.92 GAA in 50 games; projected backup',
        ],
      },
      {
        pos: 'G', before: 'Eric Comrie', after: null, status: 'departed',
        notes: ['Signed a two-year contract with San Jose on Jul. 1'],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'A hometown career ended',
    body: 'Jonathan Toews retired on Jun. 19 after playing all 82 games for Winnipeg at thirty-eight. He finished with 912 points in 1,149 games and three Stanley Cups.',
  },
  {
    title: 'The goaltender the club will “listen” on',
    body: 'Connor Hellebuyck has five seasons left and three Vezina Trophies, and the reset records both his post-season frustration and Kevin Cheveldayoff’s statement that Winnipeg will listen to offers. Nothing has been agreed.',
  },
  {
    title: 'Perfetti signed for five years',
    body: 'A $30 million extension on Jul. 15 — a $6M cap hit, confirmed against PuckPedia — keeps a 24-year-old scoring winger through the rest of this core’s window.',
  },
]

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'Brad Lambert', pos: 'F', note: 'Twenty-two, a 2022 first-rounder, projected onto the third line.' },
  { name: 'Nikita Chibrikov', pos: 'F', note: 'Twenty-three; four points in sixteen career NHL games.' },
  { name: 'Brayden Yager', pos: 'F', note: 'Twenty-one; 30 points in 68 AHL games in his first professional season.' },
  { name: 'Isak Rosen', pos: 'F', note: 'Twenty-three; projected onto the fourth line after arriving from Buffalo in March.' },
]

export const unresolved = [
  { status: 'Open', item: 'Connor Hellebuyck’s future', impact: 'The GM has said publicly the club will listen to offers' },
  { status: 'Open', item: 'Replacing Toews down the middle', impact: 'A full-time centre’s minutes are unassigned' },
  { status: 'Open', item: 'Gustav Nyquist', impact: 'Still an unsigned UFA' },
]

export const rumors = [
  {
    date: 'Offseason',
    addedAt: '2026-08-19',
    player: 'Connor Hellebuyck',
    topic: 'Connor Hellebuyck’s future',
    claim: 'Hellebuyck is the subject of trade speculation',
    status: 'reported',
    attribution: 'NHL.com’s Jets team reset',
    sourceUrl: 'https://www.nhl.com/news/topic/team-resets/winnipeg-jets-roster-changes-for-2026-27-season',
    detail: 'What is confirmed is narrower than the speculation: the reset records that Hellebuyck expressed frustration after the season and quotes Kevin Cheveldayoff saying the club will listen to offers. Listening is not shopping, no team has been named, and five seasons remain on the contract.',
  },
]

export const sources = [
  { label: 'NHL.com Jets 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/winnipeg-jets-roster-changes-for-2026-27-season' },
  { label: 'Official Jets news', url: 'https://www.nhl.com/jets/news/' },
]

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}

// WPG cap data, PuckPedia, retrieved Aug. 19, 2026.
export const cap = {
  capSummary: {
    ceiling: 104_000_000,
    capHit: 99_518_332,
    space: 4_481_668,
    rosterSlots: '23 / 23',
    potentialBonuses: 1_430_000,
    asOf: 'Aug. 19, 2026',
  },
  capGroups: [
    { key: 'F', label: 'Forwards', color: 'var(--cap-forwards)', total: 56_703_332 },
    { key: 'D', label: 'Defense', color: 'var(--cap-defense)', total: 30_565_000 },
    { key: 'G', label: 'Goaltending', color: 'var(--cap-goalies)', total: 12_250_000 },
  ],
  capHits: [
    { name: 'Kyle Connor', group: 'F', hit: 12_000_000 },
    { name: 'Mark Scheifele', group: 'F', hit: 8_500_000 },
    { name: 'Gabriel Vilardi', group: 'F', hit: 7_500_000 },
    { name: 'Cole Perfetti', group: 'F', hit: 6_000_000 },
    { name: 'Adam Lowry', group: 'F', hit: 5_000_000 },
    { name: 'Nino Niederreiter', group: 'F', hit: 4_000_000 },
    { name: 'Alex Iafallo', group: 'F', hit: 3_666_666 },
    { name: 'Vladislav Namestnikov', group: 'F', hit: 3_000_000 },
    { name: 'Morgan Barron', group: 'F', hit: 1_850_000 },
    { name: 'Cole Koepke', group: 'F', hit: 1_450_000 },
    { name: 'Viggo Björck', group: 'F', hit: 1_075_000 },
    { name: 'Isak Rosén', group: 'F', hit: 925_000 },
    { name: 'Brad Lambert', group: 'F', hit: 886_666 },
    { name: 'Noah Gregor', group: 'F', hit: 850_000 },
    { name: 'Neal Pionk', group: 'D', hit: 7_000_000 },
    { name: 'Josh Morrissey', group: 'D', hit: 6_250_000 },
    { name: 'Dylan Samberg', group: 'D', hit: 5_750_000 },
    { name: 'Dylan Demelo', group: 'D', hit: 4_900_000 },
    { name: 'Mario Ferraro', group: 'D', hit: 4_000_000 },
    { name: 'Haydn Fleury', group: 'D', hit: 950_000 },
    { name: 'Elias Salomonsson', group: 'D', hit: 865_000 },
    { name: 'Jack St. Ivany', group: 'D', hit: 850_000 },
    { name: 'Connor Hellebuyck', group: 'G', hit: 8_500_000 },
    { name: 'Stuart Skinner', group: 'G', hit: 3_750_000 },
  ],
}

export { STATUS, RUMOR_STATUS }
