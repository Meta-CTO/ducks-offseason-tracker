import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/CBJ.json'
import draft from '../draft/CBJ.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// Columbus Blue Jackets editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Blue Jackets team reset for the 2026-27 season.
// Cap figures have not been read from PuckPedia for this club yet, so there is
// no cap tab. Every "after" lineup is a projection until the club announces a
// roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'Columbus Blue Jackets',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['The captain left after thirteen seasons.', 'They bought a scorer with picks.'],
  deck:
    'Boone Jenner signed in Washington after 808 games — more than anyone in ' +
    'franchise history — and five years wearing the C. Columbus spent a ' +
    'second, a third and a fifth on Valeri Nichushkin, kept Zach Werenski ' +
    'after he considered leaving, and heads to camp with the captaincy vacant ' +
    'and three restricted free agents unsigned.',
}

export const ledgerRange = 'June 25 – July 1'

export const departures = [
  { date: 'Jul. 1', player: 'Boone Jenner', pos: 'C · Captain', mechanism: 'UFA', detail: 'Signed a four-year contract with Washington after thirteen seasons, 808 games — first in franchise history — and five as captain.' },
  { date: 'Jul. 1', player: 'Mason Marchment', pos: 'F', mechanism: 'UFA', detail: 'Signed a five-year contract with San Jose after 32 points in 39 games following a December trade to Columbus.' },
  { date: 'Jul. 1', player: 'Zach Aston-Reese', pos: 'F', mechanism: 'UFA', detail: 'Signed a two-year contract with Philadelphia.' },
  { date: 'Jul. 1', player: 'Brendan Gaunce', pos: 'F', mechanism: 'UFA', detail: 'Signed a two-year two-way contract with Boston.' },
  { date: 'Jul. 1', player: 'Egor Zamula', pos: 'D', mechanism: 'Signed in the KHL', detail: 'Signed a three-year contract with CSKA Moscow.' },
]

export const arrivals = [
  { date: 'Jun. 25', player: 'Valeri Nichushkin', pos: 'F', deal: 'Trade from Colorado', role: 'Cost a 2026 second, a 2027 third and a 2028 fifth; projected top line' },
  { date: 'Jul. 1', player: 'Ryan Lomberg', pos: 'F', deal: 'Two years', role: 'From Calgary; 129 hits in 57 games; projected fourth line' },
  { date: 'Jul. 1', player: 'Phoenix Copley', pos: 'G', deal: 'One year', role: 'Thirty-four; a third goaltending option' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Jenner and Marchment out; Nichushkin bought with three picks',
    rows: [
      {
        pos: 'C', before: 'Boone Jenner', after: null, status: 'departed',
        notes: [
          'Signed a four-year contract with Washington on Jul. 1',
          'Thirteen seasons and 808 games, the most in franchise history; five of them as captain',
          'The captaincy is now vacant, with no successor named',
        ],
      },
      {
        pos: 'RW', before: null, after: 'Valeri Nichushkin', status: 'added',
        notes: [
          'Acquired from Colorado on Jun. 25 for a 2026 second, a 2027 third and a 2028 fifth',
          '49 points in 72 games; projected on the top line with Adam Fantilli and Kirill Marchenko',
        ],
      },
      {
        pos: 'C', before: 'Adam Fantilli', after: 'Adam Fantilli', status: 'retained',
        notes: [
          'Projected to centre the top line',
          'A pending restricted free agent, along with Cole Sillinger and Jet Greaves',
        ],
      },
      {
        pos: 'F', before: 'Mason Marchment', after: null, status: 'departed',
        notes: ['Signed a five-year contract with San Jose on Jul. 1'],
      },
      {
        pos: 'F', before: null, after: 'Ryan Lomberg', status: 'added',
        notes: ['Two years on Jul. 1 from Calgary; projected fourth line'],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Werenski stayed after considering leaving; Zamula went to the KHL',
    rows: [
      {
        pos: 'D', before: 'Zach Werenski', after: 'Zach Werenski', status: 'retained',
        notes: [
          'Considered a departure; the general manager framed the outcome as an alignment of goals',
          'Don Waddell: “Our goals from ownership on down and Zach’s goals are the same… to win now”',
          'Projected on the top pair with Damon Severson',
        ],
      },
      {
        pos: 'LD', before: 'Denton Mateychuk', after: 'Denton Mateychuk', status: 'retained',
        notes: ['Projected on the second pair with Ivan Provorov'],
      },
      {
        pos: 'D', before: 'Egor Zamula', after: null, status: 'departed',
        notes: ['Signed a three-year contract with CSKA Moscow on Jul. 1'],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Greaves and Merzlikins projected, with Copley signed as a third option',
    rows: [
      {
        pos: 'G', before: 'Jet Greaves', after: 'Jet Greaves', status: 'retained',
        notes: ['Projected starter, and a pending restricted free agent'],
      },
      {
        pos: 'G', before: 'Elvis Merzlikins', after: 'Elvis Merzlikins', status: 'retained',
        notes: ['Projected backup'],
      },
      {
        pos: 'G', before: null, after: 'Phoenix Copley', status: 'added',
        notes: ['One year on Jul. 1 as a potential third goaltender'],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'Thirteen seasons and the captaincy, gone',
    body: 'Boone Jenner played 808 games for Columbus, more than anyone in franchise history, and captained the club for five years. He signed a four-year contract in Washington on Jul. 1, and nobody has been named to replace him.',
  },
  {
    title: 'Three picks for Valeri Nichushkin',
    body: 'A 2026 second, a 2027 third and a 2028 fifth went to Colorado on Jun. 25. Nichushkin is projected onto the top line with Adam Fantilli.',
  },
  {
    title: 'Werenski stayed',
    body: 'The reset records that he considered departing. He is projected on the top pair, and the general manager framed the resolution as shared goals rather than a negotiation won.',
  },
]

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'Luca Del Bel Belluz', pos: 'C', note: 'Projected to centre the fourth line.' },
]

export const unresolved = [
  { status: 'Open', item: 'The captaincy', impact: 'Vacant since Jenner left; no successor named' },
  { status: 'Open', item: 'Three restricted free agents', impact: 'Fantilli, Sillinger and Greaves are all pending RFAs' },
  { status: 'Open', item: 'Isac Lundestrom’s injury', impact: 'Listed as injured in the reset' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Blue Jackets 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/columbus-blue-jackets-roster-changes-for-2026-27-season' },
  { label: 'Official Blue Jackets news', url: 'https://www.nhl.com/bluejackets/news/' },
]

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}

// CBJ cap data, PuckPedia, retrieved Aug. 19, 2026.
export const cap = {
  capSummary: {
    ceiling: 104_000_000,
    capHit: 90_504_999,
    space: 13_495_001,
    rosterSlots: '22 / 23',
    potentialBonuses: 1_000_000,
    asOf: 'Aug. 19, 2026',
  },
  capGroups: [
    { key: 'F', label: 'Forwards', color: 'var(--cap-forwards)', total: 48_034_999 },
    { key: 'D', label: 'Defense', color: 'var(--cap-defense)', total: 32_070_000 },
    { key: 'G', label: 'Goaltending', color: 'var(--cap-goalies)', total: 10_400_000 },
  ],
  capHits: [
    // Unsigned RFA: no cap hit yet. The striped band shows the projected
    // space his next deal would come out of, not a signed amount.
    { name: 'Adam Fantilli', group: 'F', hit: 13_495_001, projected: true },
    { name: 'Valeri Nichushkin', group: 'F', hit: 6_125_000 },
    { name: 'Charlie Coyle', group: 'F', hit: 6_000_000 },
    { name: 'Conor Garland', group: 'F', hit: 6_000_000 },
    { name: 'Sean Monahan', group: 'F', hit: 5_500_000 },
    { name: 'Cole Sillinger', group: 'F', hit: 4_625_000 },
    { name: 'Dmitri Voronkov', group: 'F', hit: 4_175_000 },
    { name: 'Kirill Marchenko', group: 'F', hit: 3_850_000 },
    { name: 'Mathieu Olivier', group: 'F', hit: 3_000_000 },
    { name: 'Miles Wood', group: 'F', hit: 2_500_000 },
    { name: 'Kent Johnson', group: 'F', hit: 1_800_000 },
    { name: 'Ryan Lomberg', group: 'F', hit: 1_300_000 },
    { name: 'Isac Lundestrom', group: 'F', hit: 1_300_000 },
    { name: 'Danton Heinen', group: 'F', hit: 1_000_000 },
    { name: 'Luca Del Bel Belluz', group: 'F', hit: 859_999 },
    { name: 'Zach Werenski', group: 'D', hit: 9_583_334 },
    { name: 'Ivan Provorov', group: 'D', hit: 8_500_000 },
    { name: 'Damon Severson', group: 'D', hit: 6_250_000 },
    { name: 'Dante Fabbro', group: 'D', hit: 4_125_000 },
    { name: 'Erik Gudbranson', group: 'D', hit: 1_750_000 },
    { name: 'Jake Christiansen', group: 'D', hit: 975_000 },
    { name: 'Denton Mateychuk', group: 'D', hit: 886_666 },
    { name: 'Elvis Merzlikins', group: 'G', hit: 5_400_000 },
    { name: 'Jet Greaves', group: 'G', hit: 5_000_000 },
  ],
}

export { STATUS, RUMOR_STATUS }
