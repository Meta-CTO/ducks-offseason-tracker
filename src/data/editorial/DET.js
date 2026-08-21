import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/DET.json'
import draft from '../draft/DET.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// Detroit Red Wings editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Red Wings team reset for the 2026-27 season. Cap
// figures read from PuckPedia on Aug. 19, 2026. Every "after" lineup is a projection until the club announces a
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
  { date: 'Jul. 23', player: 'Patrick Kane', pos: 'F', mechanism: 'UFA', detail: 'Signed a two-year, $8M-a-year contract with Chicago after 57 points in 67 games. The Red Wings reset listed him as still unsigned; PuckPedia records the signing.' },
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
    summary: 'Larkin has asked to be traded; four veteran forwards are unsigned; Arvidsson and Kolesar in — projected roles are NHL.com’s',
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
        pos: 'F', before: 'Patrick Kane', after: null, status: 'departed',
        notes: [
          'Signed with Chicago on Jul. 23 for two years at $8M a year',
          '57 points in 67 games in his twentieth season',
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
      {
        pos: 'C', before: 'Mason Appleton', after: 'Mason Appleton', status: 'retained',
        notes: [
          'Projected on the third line alongside Carter Mazur and Marco Kasper',
        ],
      },
      {
        pos: 'L', before: 'J.T. Compher', after: 'J.T. Compher', status: 'retained',
        notes: [
          'Projected to centre the fourth line between Michael Rasmussen and Keegan Kolesar',
        ],
      },
      {
        pos: 'C', before: 'Andrew Copp', after: 'Andrew Copp', status: 'retained',
        notes: [
          'Projected to centre the second line between Alex DeBrincat and Viktor Arvidsson',
        ],
      },
      {
        pos: 'R', before: 'Alex DeBrincat', after: 'Alex DeBrincat', status: 'retained',
        notes: [
          'Projected on the second line alongside Andrew Copp and Viktor Arvidsson',
        ],
      },
      {
        pos: 'C', before: 'Emmitt Finnie', after: 'Emmitt Finnie', status: 'retained',
        notes: [
          'Projected on the first line alongside Dylan Larkin and Lucas Raymond',
        ],
      },
      {
        pos: 'C', before: 'Marco Kasper', after: 'Marco Kasper', status: 'retained',
        notes: [
          'Projected to centre the third line between Carter Mazur and Mason Appleton',
        ],
      },
      {
        pos: 'C', before: 'Michael Rasmussen', after: 'Michael Rasmussen', status: 'retained',
        notes: [
          'Projected on the fourth line alongside J.T. Compher and Keegan Kolesar',
        ],
      },
      {
        pos: 'L', before: 'Lucas Raymond', after: 'Lucas Raymond', status: 'retained',
        notes: [
          'Projected on the first line alongside Emmitt Finnie and Dylan Larkin',
        ],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Hamonic unsigned; Bryson added as depth behind an unchanged top four — projected roles are NHL.com’s',
    rows: [
      {
        pos: 'LD', before: 'Simon Edvinsson', after: 'Simon Edvinsson', status: 'unsigned',
        notes: [
          'An unsigned restricted free agent with no cap hit yet, per PuckPedia',
          'Projected on the top pair with Moritz Seider, which assumes he signs',
        ],
      },
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
      {
        pos: 'D', before: 'Jacob Bernard-Docker', after: 'Jacob Bernard-Docker', status: 'retained',
        notes: [
          'On the roster; not in NHL.com\'s projected lineup',
        ],
      },
      {
        pos: 'D', before: 'Ben Chiarot', after: 'Ben Chiarot', status: 'retained',
        notes: [
          'Projected on the second pair with Justin Faulk',
        ],
      },
      {
        pos: 'D', before: 'Justin Faulk', after: 'Justin Faulk', status: 'retained',
        notes: [
          'Projected on the second pair with Ben Chiarot',
        ],
      },
      {
        pos: 'D', before: 'Albert Johansson', after: 'Albert Johansson', status: 'retained',
        notes: [
          'Projected on the third pair with Axel Sandin-Pellikka',
        ],
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
      {
        pos: 'Assistant coach', before: 'Alex Tanguay', after: 'Alex Tanguay', status: 'onstaff',
        notes: [
          'Listed on the club\'s coaching staff for 2026–27',
        ],
      },
      {
        pos: 'Assistant coach', before: 'Trent Yawney', after: 'Trent Yawney', status: 'onstaff',
        notes: [
          'Listed on the club\'s coaching staff for 2026–27',
        ],
      },
      {
        pos: 'Goaltending coach', before: 'Michael Leighton', after: 'Michael Leighton', status: 'onstaff',
        notes: [
          'Listed on the club\'s coaching staff for 2026–27',
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
    title: 'Three veterans are still unsigned',
    body: 'James van Riemsdyk, Cam Talbot and David Perron all remain free agents. Patrick Kane, listed alongside them on the reset, signed with Chicago on Jul. 23 for two years at $8M — a correction the cap sweep surfaced.',
  },
]

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'Emmitt Finnie', pos: 'F', note: 'Projected onto the top line beside Larkin and Lucas Raymond.' },
  { name: 'Axel Sandin-Pellikka', pos: 'RD', note: 'Projected onto the third pair; camp settles whether he stays.' },
  { name: 'Carter Mazur', pos: 'F', note: 'Signed for two years and projected onto the third line.' },
]

export const unresolved = [
  { status: 'Open', item: 'Dylan Larkin’s trade request', impact: 'The captain, with five years left on his contract' },
  { status: 'Open', item: 'Who runs hockey operations', impact: 'Yzerman stepped down Jul. 15 with no successor named' },
  { status: 'Open', item: 'Three unsigned veterans', impact: 'van Riemsdyk, Talbot and Perron are still free agents; Kane signed in Chicago' },
  { status: 'Open', item: 'Simon Edvinsson’s contract', impact: 'Unsigned RFA projected onto the top defense pair' },
]

export const rumors = []

export const sources = [
  { label: 'Coaching staff (NHL.com club site)', url: 'https://www.nhl.com/redwings/team/hockey-operations' },
  { label: 'NHL.com Red Wings 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/detroit-red-wings-roster-changes-for-2026-27-season' },
  { label: 'Official Red Wings news', url: 'https://www.nhl.com/redwings/news/' },
]

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}

// DET cap data, PuckPedia, retrieved Aug. 19, 2026.
export const cap = {
  capSummary: {
    ceiling: 104_000_000,
    capHit: 84_427_916,
    space: 19_572_084,
    rosterSlots: '22 / 23',
    potentialBonuses: 2_000_000,
    asOf: 'Aug. 19, 2026',
  },
  capGroups: [
    { key: 'F', label: 'Forwards', color: 'var(--cap-forwards)', total: 52_612_083 },
    { key: 'D', label: 'Defense', color: 'var(--cap-defense)', total: 23_415_833 },
    { key: 'G', label: 'Goaltending', color: 'var(--cap-goalies)', total: 8_400_000 },
  ],
  capHits: [
    { name: 'Dylan Larkin', group: 'F', hit: 8_700_000 },
    { name: 'Lucas Raymond', group: 'F', hit: 8_075_000 },
    { name: 'Alex Debrincat', group: 'F', hit: 7_875_000 },
    { name: 'Andrew Copp', group: 'F', hit: 5_625_000 },
    { name: 'J.T. Compher', group: 'F', hit: 5_100_000 },
    { name: 'Viktor Arvidsson', group: 'F', hit: 5_000_000 },
    { name: 'Michael Rasmussen', group: 'F', hit: 3_200_000 },
    { name: 'Mason Appleton', group: 'F', hit: 2_900_000 },
    { name: 'Keegan Kolesar', group: 'F', hit: 2_500_000 },
    { name: 'Michael Brandsegg-Nygård', group: 'F', hit: 953_750 },
    { name: 'Emmitt Finnie', group: 'F', hit: 921_667 },
    { name: 'Marco Kasper', group: 'F', hit: 886_666 },
    { name: 'Carter Mazur', group: 'F', hit: 875_000 },
    // Unsigned RFA: no cap hit yet. The striped band shows the projected
    // space his next deal would come out of, not a signed amount.
    { name: 'Simon Edvinsson', group: 'D', hit: 19_572_084, projected: true },
    { name: 'Moritz Seider', group: 'D', hit: 8_550_000 },
    { name: 'Justin Faulk', group: 'D', hit: 6_500_000 },
    { name: 'Ben Chiarot', group: 'D', hit: 3_850_000 },
    { name: 'Jacob Bernard-Docker', group: 'D', hit: 1_600_000 },
    { name: 'Albert Johansson', group: 'D', hit: 1_125_000 },
    { name: 'Axel Sandin Pellikka', group: 'D', hit: 940_833 },
    { name: 'Jacob Bryson', group: 'D', hit: 850_000 },
    { name: 'John Gibson', group: 'G', hit: 6_400_000 },
    { name: 'Daniil Tarasov', group: 'G', hit: 2_000_000 },
  ],
}

export { STATUS, RUMOR_STATUS }
