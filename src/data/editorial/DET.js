import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/DET.json'
import { pointsFromLeague } from './_derive'

// Detroit Red Wings editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Red Wings team reset for the 2026-27 season. Cap
// figures have not been read from PuckPedia for this club yet, so there is no
// cap tab. Every "after" lineup is a projection until the club announces a
// roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'Detroit Red Wings',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['The captain asked out.', 'Then the GM stepped down.'],
  deck:
    'Dylan Larkin requested a trade on Jun. 4 and is still the captain, with ' +
    'five years left on an $69.9 million contract. Steve Yzerman stepped down ' +
    'as general manager on Jul. 15 and the search for his replacement is ' +
    'open. Between those two facts, Detroit signed Viktor Arvidsson and four ' +
    'others to short deals. Almost nothing about the shape of this team is ' +
    'settled.',
}

export const ledgerRange = 'June 4 – July 15'

export const departures = [
  { date: 'Jul. 15', player: 'Steve Yzerman', pos: 'General manager', mechanism: 'Stepped down', detail: 'Left the role with the search for a replacement under way.' },
  { date: 'Offseason', player: 'Patrick Kane', pos: 'F', mechanism: 'UFA', detail: 'Unsigned as of this brief, which is the only firm statement about him; 57 points in 67 games.' },
  { date: 'Offseason', player: 'James van Riemsdyk', pos: 'F', mechanism: 'UFA', detail: 'Unsigned as of this brief; 31 points in 72 games.' },
  { date: 'Offseason', player: 'Cam Talbot', pos: 'G', mechanism: 'UFA', detail: 'Unsigned as of this brief; a .883 save percentage across 27 decisions.' },
  { date: 'Offseason', player: 'David Perron', pos: 'F', mechanism: 'UFA', detail: 'Unsigned as of this brief; 3 goals in 16 games after arriving from Ottawa.' },
  { date: 'Offseason', player: 'Travis Hamonic', pos: 'D', mechanism: 'UFA', detail: 'Unsigned as of this brief at thirty-five.' },
]

export const arrivals = [
  { date: 'Jul. 1', player: 'Viktor Arvidsson', pos: 'F', deal: 'Two years', role: 'From Boston after 25 goals and 54 points in 69 games; projected second line' },
  { date: 'Jul. 1', player: 'Keegan Kolesar', pos: 'F', deal: 'Trade from Vegas', role: 'Cost a 2029 third and a 2027 seventh; projected fourth line' },
  { date: 'Jul. 1', player: 'Daniil Tarasov', pos: 'G', deal: 'One year', role: 'From Florida; projected backup to John Gibson' },
  { date: 'Jul. 1', player: 'Jacob Bryson', pos: 'D', deal: 'One year', role: 'Depth defenseman; split last season between Buffalo and Winnipeg' },
  { date: 'Jul. 1', player: 'Carter Mazur', pos: 'F', deal: 'Two years', role: 'Twenty-four; projected third line' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Larkin has asked to be traded; four veteran forwards are unsigned; Arvidsson and Kolesar in',
    rows: [
      {
        pos: 'C', before: 'Dylan Larkin', after: 'Dylan Larkin', status: 'retained',
        notes: [
          'Requested a trade on Jun. 4 and remains the captain',
          'Five years left on an eight-year, $69.9M contract signed in March 2023',
          'Steve Yzerman, before stepping down: “My job... is always to do what is in the best interest of the Detroit Red Wings, and I will act accordingly”',
        ],
      },
      {
        pos: 'F', before: null, after: 'Viktor Arvidsson', status: 'added',
        notes: [
          'Two years on Jul. 1 after 54 points in 69 games with Boston',
          'Projected on the second line with Alex DeBrincat and Andrew Copp',
        ],
      },
      {
        pos: 'F', before: 'Patrick Kane', after: null, status: 'unsigned',
        notes: [
          'An unsigned unrestricted free agent, which is the only firm fact about his situation',
          '57 points in 67 games while seeking a twentieth season',
        ],
      },
      {
        pos: 'F', before: 'James van Riemsdyk', after: null, status: 'unsigned',
        notes: ['An unsigned UFA seeking an eighteenth season; 31 points in 72 games'],
      },
      {
        pos: 'F', before: null, after: 'Keegan Kolesar', status: 'added',
        notes: ['Acquired from Vegas on Jul. 1; projected fourth line'],
      },
      {
        pos: 'F', before: null, after: 'Carter Mazur', status: 'added',
        notes: ['Two years on Jul. 1 at twenty-four; projected third line'],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Hamonic unsigned; Bryson added as depth behind an unchanged top four',
    rows: [
      {
        pos: 'RD', before: 'Moritz Seider', after: 'Moritz Seider', status: 'retained',
        notes: ['Projected on the top pair with Simon Edvinsson'],
      },
      {
        pos: 'D', before: null, after: 'Jacob Bryson', status: 'added',
        notes: ['One year on Jul. 1 as depth'],
      },
      {
        pos: 'D', before: 'Travis Hamonic', after: null, status: 'unsigned',
        notes: ['An unsigned UFA at thirty-five'],
      },
      {
        pos: 'RD', before: null, after: 'Axel Sandin-Pellikka', status: 'camp',
        notes: ['Projected onto the third pair with Albert Johansson; a projection, not an announced job'],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Talbot unsigned; Tarasov signed behind Gibson',
    rows: [
      {
        pos: 'G', before: 'John Gibson', after: 'John Gibson', status: 'retained',
        notes: ['Projected starter'],
      },
      {
        pos: 'G', before: null, after: 'Daniil Tarasov', status: 'added',
        notes: [
          'One year on Jul. 1 from Florida',
          'A .895 save percentage in 33 games; projected backup',
        ],
      },
      {
        pos: 'G', before: 'Cam Talbot', after: null, status: 'unsigned',
        notes: ['An unsigned UFA'],
      },
    ],
  },
  {
    group: 'Coaching',
    summary: 'Yzerman stepped down on Jul. 15 with no successor named',
    rows: [
      {
        pos: 'General manager', before: 'Steve Yzerman', after: null, status: 'departed',
        notes: [
          'Stepped down Jul. 15; the search for a replacement is under way',
          'Left with the captain having requested a trade and four veterans unsigned',
        ],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'The captain requested a trade',
    body: 'Dylan Larkin asked out on Jun. 4 and is still wearing the C, with five years and $69.9 million of term behind him. Nothing has been resolved either way.',
  },
  {
    title: 'And then the general manager left',
    body: 'Steve Yzerman stepped down on Jul. 15. Detroit therefore heads into camp with a captain who wants out, no permanent general manager, and no announced plan for either.',
  },
  {
    title: 'Four veterans are simply unsigned',
    body: 'Patrick Kane, James van Riemsdyk, Cam Talbot and David Perron all remain free agents. That is the only firm statement available about any of them.',
  },
]

// Not researched from a primary source yet; the reset does not list picks.
export const draftClass = []

export const campWatch = [
  { name: 'Emmitt Finnie', pos: 'F', note: 'Projected onto the top line beside Larkin and Lucas Raymond.' },
  { name: 'Axel Sandin-Pellikka', pos: 'RD', note: 'Projected onto the third pair; camp settles whether he stays.' },
  { name: 'Carter Mazur', pos: 'F', note: 'Signed for two years and projected onto the third line.' },
]

export const unresolved = [
  { status: 'Open', item: 'Dylan Larkin’s trade request', impact: 'The captain, with five years left on his contract' },
  { status: 'Open', item: 'Who runs hockey operations', impact: 'Yzerman stepped down Jul. 15 with no successor named' },
  { status: 'Open', item: 'Four unsigned veterans', impact: 'Kane, van Riemsdyk, Talbot and Perron are all free agents' },
  { status: 'Open', item: 'Cap and contract detail', impact: 'Not yet verified against PuckPedia, so this club has no cap tab' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Red Wings 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/detroit-red-wings-roster-changes-for-2026-27-season' },
  { label: 'Official Red Wings news', url: 'https://www.nhl.com/redwings/news/' },
]

export const points = pointsFromLeague(league)
export const contracts = {}

export { STATUS, RUMOR_STATUS }
