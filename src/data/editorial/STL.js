import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/STL.json'
import { pointsFromLeague } from './_derive'

// St. Louis Blues editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Blues team reset for the 2026-27 season. Cap
// figures have not been read from PuckPedia for this club yet, so there is no
// cap tab. Every "after" lineup is a projection until the club announces a
// roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'St. Louis Blues',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['They missed the playoffs.', 'So they bought two 20-somethings.'],
  deck:
    'St. Louis finished fifth in the Central at 37-33-12 and scored 2.80 goals ' +
    'a game, 24th in the league. The response was to spend picks and a top-six ' +
    'winger on younger scoring: Mason McTavish from Anaheim for the 15th and ' +
    '29th selections, and Connor McMichael from Washington for Jordan Kyrou ' +
    'and a first. Both are now signed long term.',
}

export const ledgerRange = 'June 23 – July 16'

export const departures = [
  { date: 'Jun. 23', player: 'Jordan Kyrou', pos: 'F', mechanism: 'Trade to Washington', detail: 'Sent with Milton Gastrin and a 2026 first-round pick for Connor McMichael, after 46 points in 72 games.' },
  { date: 'Jul. 1', player: 'Matthew Kessel', pos: 'D', mechanism: 'UFA', detail: 'Signed a one-year contract with the N.Y. Islanders.' },
  { date: 'Jul. 1', player: 'Justin Holl', pos: 'D', mechanism: 'UFA', detail: 'Signed a one-year contract with Washington.' },
]

export const arrivals = [
  { date: 'Jun. 23', player: 'Connor McMichael', pos: 'F', deal: 'Trade from Washington; six years, signed Jul. 16', role: 'Cost Jordan Kyrou, Milton Gastrin and a 2026 first; 46 points in 78 games' },
  { date: 'Jun. 27', player: 'Mason McTavish', pos: 'C', deal: 'Trade from Anaheim', role: 'Cost the 15th and 29th picks and Kyle Masters; projected to centre the second line' },
  { date: 'Jun. 27', player: 'Brandon Carlo', pos: 'D', deal: 'Trade from Toronto for two 2026 thirds', role: 'Six-foot-five right shot; projected third pair' },
  { date: 'Jul. 1', player: 'Ross Johnston', pos: 'F', deal: 'Three years', role: 'From Anaheim; projected fourth line' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Kyrou traded for McMichael; McTavish bought from Anaheim with two first-round picks',
    rows: [
      {
        pos: 'C', before: null, after: 'Mason McTavish', status: 'added',
        notes: [
          'Acquired from Anaheim on Jun. 27 for the 15th and 29th overall picks and Kyle Masters',
          '41 points in 75 games at twenty-three',
          'McTavish: “especially the last year, I wasn’t happy with the way I performed, and I know I have so much better than that”',
        ],
      },
      {
        pos: 'F', before: null, after: 'Connor McMichael', status: 'added',
        notes: [
          'Acquired from Washington on Jun. 23 for Jordan Kyrou, Milton Gastrin and a 2026 first',
          'Signed for six years on Jul. 16 after 46 points in 78 games',
          'Projected on the second line with McTavish and Pavel Buchnevich',
        ],
      },
      {
        pos: 'F', before: 'Jordan Kyrou', after: null, status: 'departed',
        notes: [
          'Traded to Washington on Jun. 23 with four years still to run on his contract',
          '46 points in 72 games',
        ],
      },
      {
        pos: 'C', before: 'Robert Thomas', after: 'Robert Thomas', status: 'retained',
        notes: ['Projected to centre the top line between Dylan Holloway and Jimmy Snuggerud'],
      },
      {
        pos: 'F', before: null, after: 'Ross Johnston', status: 'added',
        notes: ['Three years on Jul. 1 after leaving Anaheim; projected fourth line'],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Carlo acquired from Toronto; Kessel and Holl left as free agents',
    rows: [
      {
        pos: 'RD', before: null, after: 'Brandon Carlo', status: 'added',
        notes: [
          'Acquired from Toronto on Jun. 27 for two 2026 third-round picks',
          'Six-foot-five and 227 pounds; projected on the third pair with Cam Fowler',
        ],
      },
      {
        pos: 'RD', before: 'Colton Parayko', after: 'Colton Parayko', status: 'retained',
        notes: ['Projected on the second pair with Theo Lindstein'],
      },
      {
        pos: 'D', before: 'Matthew Kessel', after: null, status: 'departed',
        notes: ['Signed a one-year contract with the N.Y. Islanders on Jul. 1'],
      },
      {
        pos: 'D', before: 'Justin Holl', after: null, status: 'departed',
        notes: ['Signed a one-year contract with Washington on Jul. 1'],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Unchanged: Hofer and Binnington',
    rows: [
      {
        pos: 'G', before: 'Joel Hofer', after: 'Joel Hofer', status: 'retained',
        notes: ['Listed first among the projected goaltenders'],
      },
      {
        pos: 'G', before: 'Jordan Binnington', after: 'Jordan Binnington', status: 'retained',
        notes: ['Listed second among the projected goaltenders'],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'Two first-round picks for Mason McTavish',
    body: 'Anaheim’s 23-year-old centre cost the 15th and 29th overall selections and Kyle Masters on Jun. 27. Anaheim turned those picks into Nikita Klepov and Marcus Nordmark, so the same trade appears on both clubs’ pages.',
  },
  {
    title: 'A top-six winger swapped for a younger one',
    body: 'Jordan Kyrou went to Washington with a 2026 first for Connor McMichael, who then signed for six years on Jul. 16. Both scored 46 points last season; McMichael is two years younger.',
  },
  {
    title: 'The problem being solved is scoring',
    body: 'St. Louis averaged 2.80 goals a game, 24th in the league, and missed the playoffs. Every significant move this summer was a forward.',
  },
]

// Not researched from a primary source yet; the reset does not list picks.
export const draftClass = []

export const campWatch = [
  { name: 'Dalibor Dvorsky', pos: 'C', note: 'Projected onto the third line; one of the young forwards the club is counting on.' },
  { name: 'Theo Lindstein', pos: 'D', note: 'Projected onto the second pair alongside Parayko.' },
]

export const unresolved = [
  { status: 'Open', item: 'Whether the new forwards fix the scoring', impact: '24th in goals per game last season' },
  { status: 'Open', item: 'Mason McTavish’s form', impact: 'Cost two first-round picks after a season he publicly called disappointing' },
  { status: 'Open', item: 'Cap and contract detail', impact: 'Not yet verified against PuckPedia, so this club has no cap tab' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Blues 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/st-louis-blues-roster-changes-for-2026-27-season' },
  { label: 'Official Blues news', url: 'https://www.nhl.com/blues/news/' },
]

export const points = pointsFromLeague(league)
export const contracts = {}

export { STATUS, RUMOR_STATUS }
