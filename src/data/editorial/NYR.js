import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/NYR.json'
import draft from '../draft/NYR.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// New York Rangers editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Rangers team reset for the 2026-27 season. Cap
// figures have not been read from PuckPedia for this club yet, so there is no
// cap tab. Every "after" lineup is a projection until the club announces a
// roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'New York Rangers',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['They missed the playoffs.', 'Then paid $77 million for goals.'],
  deck:
    'A 34-39-9 season, eighth in the Metropolitan, produced the busiest ' +
    'summer in the division. Pavel Dorofeyev cost two picks and a conditional ' +
    'first, then signed for seven years and $77 million. Sean Durzi, Marcus ' +
    'Pettersson and Joonas Korpisalo all arrived; Vincent Trocheck, Will ' +
    'Borgen and a retiring Jonathan Quick left.',
}

export const ledgerRange = 'June 26 – July 1'

export const departures = [
  { date: 'Jun. 27', player: 'Adam Edstrom', pos: 'F', mechanism: 'Trade to Nashville', detail: 'Returned a 2026 fifth-round pick and forward Massimo Rizzo.' },
  { date: 'Jul. 1', player: 'Vincent Trocheck', pos: 'C', mechanism: 'Trade to Utah', detail: 'Sent for Sean Durzi, prospect Cole Beaudoin and a 2027 third after 53 points in 67 games.' },
  { date: 'Jul. 1', player: 'Will Borgen', pos: 'D', mechanism: 'Trade to Boston', detail: 'Returned a 2027 second and a conditional 2028 third.' },
  { date: 'Jul. 1', player: 'Conor Sheary', pos: 'F', mechanism: 'UFA', detail: 'Signed a one-year contract with Buffalo.' },
  { date: 'Jul. 1', player: 'Jonny Brodzinski', pos: 'F', mechanism: 'UFA', detail: 'Signed with Washington after 16 points in 55 games.' },
  { date: 'Offseason', player: 'Jonathan Quick', pos: 'G', mechanism: 'Retired', detail: 'Retired after a 6-17-2 season with a .891 save percentage.' },
]

export const arrivals = [
  { date: 'Jun. 26', player: 'Pavel Dorofeyev', pos: 'F', deal: 'Trade from Vegas; seven years, $77M ($11M AAV) signed Jun. 30', role: 'Cost the 26th and 92nd picks and a conditional 2028 first; projected second line' },
  { date: 'Jul. 1', player: 'Sean Durzi', pos: 'D', deal: 'Trade from Utah', role: 'Arrived with Cole Beaudoin and a 2027 third for Vincent Trocheck; projected second pair' },
  { date: 'Jul. 1', player: 'Marcus Pettersson', pos: 'D', deal: 'Trade from Vancouver for a conditional 2030 first', role: 'Played under Mike Sullivan in Pittsburgh; projected second pair' },
  { date: 'Jul. 1', player: 'Oliver Bjorkstrand', pos: 'F', deal: 'One year', role: 'From Tampa Bay after 32 points in 80 games; projected second line' },
  { date: 'Jul. 1', player: 'Joe Veleno', pos: 'F', deal: 'One year', role: 'From Montréal, which declined to qualify him; projected fourth line' },
  { date: 'Jul. 1', player: 'Joonas Korpisalo', pos: 'G', deal: 'Trade from Boston', role: 'Cost a 2028 fourth and Kalle Vaisanen; projected backup' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Dorofeyev signed for seven years; Trocheck traded to Utah; Bjorkstrand and Veleno added',
    rows: [
      {
        pos: 'LW', before: null, after: 'Pavel Dorofeyev', status: 'added',
        notes: [
          'Acquired from Vegas on Jun. 26 for the 26th and 92nd picks and a conditional 2028 first',
          'Signed Jun. 30 for seven years and $77M — an $11M cap hit',
          '37 goals and 64 points, then 12 goals in 22 playoff games',
        ],
      },
      {
        pos: 'C', before: 'Vincent Trocheck', after: null, status: 'departed',
        notes: [
          'Traded to Utah on Jul. 1 after waiving his no-trade clause',
          'Returned Sean Durzi, prospect Cole Beaudoin and a 2027 third; 53 points in 67 games',
        ],
      },
      {
        pos: 'C', before: 'Mika Zibanejad', after: 'Mika Zibanejad', status: 'retained',
        notes: ['Projected to centre the top line between Gabe Perreault and Alexis Lafreniere'],
      },
      {
        pos: 'RW', before: null, after: 'Oliver Bjorkstrand', status: 'added',
        notes: [
          'One year on Jul. 1 from Tampa Bay',
          'Projected on the second line with J.T. Miller and Dorofeyev',
        ],
      },
      {
        pos: 'F', before: null, after: 'Joe Veleno', status: 'added',
        notes: ['One year on Jul. 1 after Montréal declined to qualify him'],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Borgen traded to Boston; Durzi and Pettersson both acquired',
    rows: [
      {
        pos: 'RD', before: 'Adam Fox', after: 'Adam Fox', status: 'retained',
        notes: ['Projected on the top pair with Vladislav Gavrikov'],
      },
      {
        pos: 'RD', before: null, after: 'Sean Durzi', status: 'added',
        notes: [
          'Arrived from Utah on Jul. 1 in the Trocheck trade',
          '27 points and 19:16 a night in 60 games; projected second pair',
        ],
      },
      {
        pos: 'LD', before: null, after: 'Marcus Pettersson', status: 'added',
        notes: [
          'Acquired from Vancouver on Jul. 1 for a conditional 2030 first-round pick',
          'Played under Mike Sullivan in Pittsburgh from 2018 to 2025',
        ],
      },
      {
        pos: 'D', before: 'Will Borgen', after: null, status: 'departed',
        notes: ['Traded to Boston on Jul. 1 for a 2027 second and a conditional 2028 third'],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Quick retired; Korpisalo acquired from Boston behind Shesterkin',
    rows: [
      {
        pos: 'G', before: 'Igor Shesterkin', after: 'Igor Shesterkin', status: 'retained',
        notes: ['Projected starter'],
      },
      {
        pos: 'G', before: null, after: 'Joonas Korpisalo', status: 'added',
        notes: [
          'Acquired from Boston on Jul. 1 for a 2028 fourth and Kalle Vaisanen',
          'Projected backup, with Dylan Garand competing for the job',
        ],
      },
      {
        pos: 'G', before: 'Jonathan Quick', after: null, status: 'departed',
        notes: ['Retired after a 6-17-2 season'],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'Seven years and $77 million for Pavel Dorofeyev',
    body: 'He cost the 26th and 92nd picks and a conditional 2028 first on Jun. 26, then signed four days later at an $11M cap hit. He is 25 and coming off 37 goals.',
  },
  {
    title: 'A blue line rebuilt in a day',
    body: 'Will Borgen went to Boston, while Sean Durzi came from Utah in the Trocheck trade and Marcus Pettersson from Vancouver for a conditional 2030 first. All three moves landed on Jul. 1.',
  },
  {
    title: 'Missing the playoffs prompted all of it',
    body: 'New York finished 34-39-9, eighth in the Metropolitan. The reset still names a top-six left wing as the outstanding need.',
  },
]

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'Gabe Perreault', pos: 'LW', note: 'Projected onto the top line with Zibanejad and Lafreniere.' },
  { name: 'Dylan Garand', pos: 'G', note: 'Competing with Korpisalo for the backup job.' },
  { name: 'Noah Laba', pos: 'C', note: 'Projected to centre the third line.' },
]

export const unresolved = [
  { status: 'Open', item: 'A top-six left wing', impact: 'Named in the reset as the outstanding need despite the summer’s spending' },
  { status: 'Open', item: 'Korpisalo or Garand', impact: 'Backup goaltender' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Rangers 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/new-york-rangers-roster-changes-for-2026-27-season' },
  { label: 'Official Rangers news', url: 'https://www.nhl.com/rangers/news/' },
]

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}

// NYR cap data, PuckPedia, retrieved Aug. 19, 2026.
export const cap = {
  capSummary: {
    ceiling: 104_000_000,
    capHit: 101_597_024,
    space: 2_402_976,
    rosterSlots: '22 / 23',
    potentialBonuses: 637_500,
    asOf: 'Aug. 19, 2026',
  },
  capGroups: [
    { key: 'F', label: 'Forwards', color: 'var(--cap-forwards)', total: 51_104_167 },
    { key: 'D', label: 'Defense', color: 'var(--cap-defense)', total: 35_900_000 },
    { key: 'G', label: 'Goaltending', color: 'var(--cap-goalies)', total: 14_567_857 },
    { key: 'O', label: 'Retained & buyouts', color: 'var(--cap-other)', total: 25_000 },
  ],
  capHits: [
    { name: 'Pavel Dorofeyev', group: 'F', hit: 11_000_000 },
    { name: 'Mika Zibanejad', group: 'F', hit: 8_500_000 },
    { name: 'J.T. Miller', group: 'F', hit: 8_000_000 },
    { name: 'Alexis Lafreniere', group: 'F', hit: 7_450_000 },
    { name: 'Oliver Bjorkstrand', group: 'F', hit: 4_500_000 },
    { name: 'Will Cuylle', group: 'F', hit: 3_900_000 },
    { name: 'Taylor Raddysh', group: 'F', hit: 1_500_000 },
    { name: 'Tye Kartye', group: 'F', hit: 1_250_000 },
    { name: 'Joe Veleno', group: 'F', hit: 1_200_000 },
    { name: 'Matt Rempe', group: 'F', hit: 975_000 },
    { name: 'Noah Laba', group: 'F', hit: 945_000 },
    { name: 'Jaroslav Chmelar', group: 'F', hit: 942_500 },
    { name: 'Gabe Perreault', group: 'F', hit: 941_667 },
    { name: 'Adam Fox', group: 'D', hit: 9_500_000 },
    { name: 'Vladislav Gavrikov', group: 'D', hit: 7_000_000 },
    { name: 'Sean Durzi', group: 'D', hit: 6_000_000 },
    { name: 'Marcus Pettersson', group: 'D', hit: 5_500_000 },
    { name: 'Braden Schneider', group: 'D', hit: 5_500_000 },
    { name: 'Urho Vaakanainen', group: 'D', hit: 1_550_000 },
    { name: 'Matthew Robertson', group: 'D', hit: 850_000 },
    { name: 'Igor Shesterkin', group: 'G', hit: 11_567_857 },
    { name: 'Joonas Korpisalo', group: 'G', hit: 3_000_000 },
    { name: 'Juuso Parssinen', group: 'O', hit: 25_000, charge: 'buried' },
  ],
}

export { STATUS, RUMOR_STATUS }
