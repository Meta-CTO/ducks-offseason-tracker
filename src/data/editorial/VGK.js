import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/VGK.json'
import draft from '../draft/VGK.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// Vegas Golden Knights editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Golden Knights team reset for the 2026-27 season.
// Cap figures have not been read from PuckPedia for this club yet, so there is
// no cap tab; the one injury noted below is the one the reset states. Every
// "after" lineup is a projection until the club announces a roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'Vegas Golden Knights',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['They reached the Final.', 'Then they changed the coach.'],
  deck:
    'Vegas lost the Stanley Cup Final to Carolina and did not retain John ' +
    'Tortorella, promoting Ryan Craig from Henderson instead. The roster ' +
    'moves were subtractions: Pavel Dorofeyev, a 37-goal scorer, went to the ' +
    'Rangers for a package of picks, and Keegan Kolesar, Kaedan Korczak and ' +
    'Akira Schmid all left in separate deals. Alex Pietrangelo is hurt.',
}

export const ledgerRange = 'June 16 – July 15'

export const departures = [
  { date: 'Jun. 16', player: 'John Tortorella', pos: 'Head coach', mechanism: 'Not retained', detail: 'Had taken over in March and led the club to the Stanley Cup Final, losing to Carolina.' },
  { date: 'Jun. 26', player: 'Pavel Dorofeyev', pos: 'F', mechanism: 'Trade to N.Y. Rangers', detail: 'Returned the 26th and 92nd picks plus a conditional 2028 first, after career highs of 37 goals and 64 points and 12 playoff goals.' },
  { date: 'Jun. 29', player: 'Akira Schmid', pos: 'G', mechanism: 'Trade to Florida', detail: 'Returned a 2028 third-round pick after a 16-10-6 season.' },
  { date: 'Jun. 30', player: 'Kaedan Korczak', pos: 'D', mechanism: 'Trade to Pittsburgh', detail: 'Traded for Parker Wotherspoon after 16 points in 78 games.' },
  { date: 'Jul. 1', player: 'Keegan Kolesar', pos: 'F', mechanism: 'Trade to Detroit', detail: 'Returned a 2029 third and a 2027 seventh after 17 points in 82 games.' },
  { date: 'Jul. 1', player: 'Colton Sissons', pos: 'F', mechanism: 'UFA', detail: 'Signed a two-year contract with Toronto.' },
]

export const arrivals = [
  { date: 'Jun. 17', player: 'Ryan Craig', pos: 'Head coach', deal: 'Hired', role: 'Replaces Tortorella after three seasons coaching Henderson in the AHL' },
  { date: 'Jun. 30', player: 'Parker Wotherspoon', pos: 'D', deal: 'Trade from Pittsburgh for Kaedan Korczak', role: 'Career highs of 30 points and +17 in 80 games; projected third pair' },
  { date: 'Jul. 1', player: 'Victor Olofsson', pos: 'F', deal: 'UFA', role: 'From Calgary after 31 points in 78 games; projected third line' },
  { date: 'Jul. 1', player: 'Marc Gatcomb', pos: 'F', deal: 'UFA', role: 'Physical bottom-six forward; 16 points in 88 games' },
  { date: 'Jul. 15', player: 'Juho Piiparinen', pos: 'D', deal: 'Three-year entry-level contract', role: 'The 29th pick in 2026, signed at seventeen' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Dorofeyev sold for picks; Kolesar and Sissons out; Olofsson and Gatcomb in',
    rows: [
      {
        pos: 'F', before: 'Pavel Dorofeyev', after: null, status: 'departed',
        notes: [
          'Traded to the N.Y. Rangers on Jun. 26 for the 26th and 92nd picks and a conditional 2028 first',
          'Career highs of 37 goals and 64 points in 82 games, plus 12 playoff goals',
        ],
      },
      {
        pos: 'C', before: 'Jack Eichel', after: 'Jack Eichel', status: 'retained',
        notes: ['Projected to centre the top line between Ivan Barbashev and Mark Stone'],
      },
      {
        pos: 'RW', before: 'Mitch Marner', after: 'Mitch Marner', status: 'retained',
        notes: ['Projected on the second line with William Karlsson and Brett Howden'],
      },
      {
        pos: 'LW', before: null, after: 'Victor Olofsson', status: 'added',
        notes: [
          'Signed Jul. 1 after 31 points in 78 games split between Calgary and Colorado',
          'Projected on the third line with Tomas Hertl',
        ],
      },
      {
        pos: 'F', before: null, after: 'Marc Gatcomb', status: 'added',
        notes: ['Signed Jul. 1 as a physical presence for the bottom six'],
      },
      {
        pos: 'F', before: 'Keegan Kolesar', after: null, status: 'departed',
        notes: ['Traded to Detroit on Jul. 1 for a 2029 third and a 2027 seventh'],
      },
      {
        pos: 'F', before: 'Colton Sissons', after: null, status: 'departed',
        notes: ['Signed a two-year contract with Toronto on Jul. 1'],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Korczak swapped for Wotherspoon; Pietrangelo is hurt',
    rows: [
      {
        pos: 'D', before: 'Alex Pietrangelo', after: 'Alex Pietrangelo', status: 'injured',
        notes: ['Listed with a hip injury in the reset'],
      },
      {
        pos: 'D', before: null, after: 'Parker Wotherspoon', status: 'added',
        notes: [
          'Acquired from Pittsburgh on Jun. 30 for Kaedan Korczak',
          'Career highs of 30 points, +17 and 112 blocked shots in 80 games',
        ],
      },
      {
        pos: 'D', before: 'Kaedan Korczak', after: null, status: 'departed',
        notes: ['Traded to Pittsburgh on Jun. 30 after 16 points in 78 games'],
      },
      {
        pos: 'RD', before: 'Shea Theodore', after: 'Shea Theodore', status: 'retained',
        notes: ['Projected on the top pair with Brayden McNabb'],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Schmid traded to Florida; Hart and Hill projected as the tandem',
    rows: [
      {
        pos: 'G', before: 'Carter Hart', after: 'Carter Hart', status: 'retained',
        notes: ['Listed first among the projected goaltenders'],
      },
      {
        pos: 'G', before: 'Adin Hill', after: 'Adin Hill', status: 'retained',
        notes: ['Listed second among the projected goaltenders'],
      },
      {
        pos: 'G', before: 'Akira Schmid', after: null, status: 'departed',
        notes: [
          'Traded to Florida on Jun. 29 for a 2028 third-round pick',
          '16-10-6 with a 2.59 GAA in 34 games',
        ],
      },
    ],
  },
  {
    group: 'Coaching',
    summary: 'Tortorella not retained after the Final; Craig promoted from Henderson',
    rows: [
      {
        pos: 'Head coach', before: 'John Tortorella', after: 'Ryan Craig', status: 'added',
        notes: [
          'Tortorella took over in March and reached the Stanley Cup Final, losing to Carolina; he was not retained on Jun. 16',
          'Craig was hired Jun. 17 after three seasons coaching Henderson',
          'Craig: “This team’s been built through standards since Day 1, and those standards aren’t going to change”',
        ],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'A Final appearance, then a new coach',
    body: 'John Tortorella took over in March and took Vegas to the Stanley Cup Final, where Carolina beat them. He was not retained on Jun. 16, and Ryan Craig was promoted from Henderson the next day.',
  },
  {
    title: 'The leading goal scorer was sold',
    body: 'Pavel Dorofeyev scored 37 goals and 64 points, then added 12 in the playoffs. He went to the Rangers on Jun. 26 for the 26th and 92nd picks and a conditional 2028 first.',
  },
  {
    title: 'They are $8.7 million over the cap',
    body: 'Vegas projects at $112,661,182 against a $104 million ceiling — the largest overage in the league by some distance, with no buyouts or retained salary to unwind. Alex Pietrangelo’s $8.8M sits on a hip injury, which is the one obvious route to relief.',
  },
  {
    title: 'Four subtractions, no headline addition',
    body: 'Dorofeyev, Keegan Kolesar, Kaedan Korczak and Akira Schmid all left in separate deals. The forwards who came in — Victor Olofsson and Marc Gatcomb — are bottom-six signings.',
  },
]

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'Trevor Connelly', pos: 'F', note: 'Twenty; 49 points in 46 AHL games after being taken 19th in 2024.' },
  { name: 'Matyas Sapovaliv', pos: 'F', note: 'Twenty-two; 35 points in 72 AHL games.' },
  { name: 'Mathieu Cataford', pos: 'F', note: 'Twenty-one; 13 points in 59 AHL games.' },
  { name: 'Juho Piiparinen', pos: 'D', note: 'Seventeen, signed to a three-year entry-level deal on Jul. 15 after going 29th in 2026.' },
]

export const unresolved = [
  { status: 'Open', item: 'Getting under the ceiling', impact: '$8.66M over, the largest overage in the league, and nothing to buy out' },
  { status: 'Open', item: 'Alex Pietrangelo’s hip', impact: 'Top-four defense, and an $8.8M cap hit' },
  { status: 'Open', item: 'Who replaces 37 goals', impact: 'Dorofeyev’s scoring left and was not directly replaced' },
  { status: 'Open', item: 'How Craig differs from Tortorella', impact: 'A first-time NHL head coach after a Final run' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Golden Knights 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/vegas-golden-knights-roster-changes-for-2026-27-season' },
  { label: 'Official Golden Knights news', url: 'https://www.nhl.com/goldenknights/news/' },
]

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}

// VGK cap data, PuckPedia, retrieved Aug. 19, 2026.
export const cap = {
  capSummary: {
    ceiling: 104_000_000,
    capHit: 112_661_182,
    space: -8_661_182,
    rosterSlots: '22 / 23',
    potentialBonuses: 0,
    asOf: 'Aug. 19, 2026',
  },
  capGroups: [
    { key: 'F', label: 'Forwards', color: 'var(--cap-forwards)', total: 63_311_182 },
    { key: 'D', label: 'Defense', color: 'var(--cap-defense)', total: 41_100_000 },
    { key: 'G', label: 'Goaltending', color: 'var(--cap-goalies)', total: 8_250_000 },
  ],
  capHits: [
    { name: 'Jack Eichel', group: 'F', hit: 13_500_000 },
    { name: 'Mitch Marner', group: 'F', hit: 12_000_000 },
    { name: 'Mark Stone', group: 'F', hit: 9_500_000 },
    { name: 'Tomas Hertl', group: 'F', hit: 6_750_000 },
    { name: 'William Karlsson', group: 'F', hit: 5_900_000 },
    { name: 'Ivan Barbashev', group: 'F', hit: 5_000_000 },
    { name: 'Nic Dowd', group: 'F', hit: 3_000_000 },
    { name: 'Brett Howden', group: 'F', hit: 2_500_000 },
    { name: 'Victor Olofsson', group: 'F', hit: 1_638_330 },
    { name: 'Braeden Bowman', group: 'F', hit: 912_500 },
    { name: 'Tanner Laczynski', group: 'F', hit: 900_000 },
    { name: 'Marc Gatcomb', group: 'F', hit: 875_000 },
    { name: 'Alexander Holtz', group: 'F', hit: 835_352 },
    { name: 'Alex Pietrangelo', group: 'D', hit: 8_800_000 },
    { name: 'Rasmus Andersson', group: 'D', hit: 8_500_000 },
    { name: 'Shea Theodore', group: 'D', hit: 7_425_000 },
    { name: 'Noah Hanifin', group: 'D', hit: 7_350_000 },
    { name: 'Jeremy Lauzon', group: 'D', hit: 4_000_000 },
    { name: 'Brayden McNabb', group: 'D', hit: 3_650_000 },
    { name: 'Dylan Coghlan', group: 'D', hit: 875_000 },
    { name: 'Parker Wotherspoon', group: 'D', hit: 500_000 },
    { name: 'Adin Hill', group: 'G', hit: 6_250_000 },
    { name: 'Carter Hart', group: 'G', hit: 2_000_000 },
  ],
}

export { STATUS, RUMOR_STATUS }
