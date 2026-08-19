import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/CAR.json'
import { pointsFromLeague } from './_derive'

// Carolina Hurricanes editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Hurricanes team reset for the 2026-27 season. Cap
// figures have not been read from PuckPedia for this club yet, so there is no
// cap tab. Every "after" lineup is a projection until the club announces a
// roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'Carolina Hurricanes',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['They signed nobody.', 'That is the whole story.'],
  deck:
    'Carolina’s reset lists no arrivals at all. Frederik Andersen left for ' +
    'Edmonton after a playoff run in which he went 13-2 with a 1.89 goals ' +
    'against average, and the crease now belongs to Pyotr Kochetkov and ' +
    'Brandon Bussi. Seth Jarvis is four to six months from shoulder surgery ' +
    'and Alexander Nikishin is an unsigned restricted free agent. The general ' +
    'manager’s line: “There’s still a lot of room to improve.”',
}

export const ledgerRange = 'July 1'

export const departures = [
  { date: 'Jul. 1', player: 'Frederik Andersen', pos: 'G', mechanism: 'UFA', detail: 'Signed a one-year contract with Edmonton after going 13-2 with a 1.89 GAA and three shutouts in 16 playoff games.' },
  { date: 'Offseason', player: 'Mike Reilly', pos: 'D', mechanism: 'UFA', detail: 'Unsigned as of this brief, which is the only firm statement about him; 9 points in 42 games.' },
]

// The reset lists no arrivals. An empty array is the honest record of a club
// that did not add anyone, and it renders as an empty tab rather than a lie.
export const arrivals = []

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Nobody added; Jarvis is months from returning',
    rows: [
      {
        pos: 'RW', before: 'Seth Jarvis', after: 'Seth Jarvis', status: 'injured',
        notes: [
          'Had shoulder surgery with a four-to-six-month recovery',
          'Does not appear in the projected lineup',
        ],
      },
      {
        pos: 'C', before: 'Sebastian Aho', after: 'Sebastian Aho', status: 'retained',
        notes: ['Projected to centre the top line between Andrei Svechnikov and Jordan Martinook'],
      },
      {
        pos: 'LW', before: 'Nikolaj Ehlers', after: 'Nikolaj Ehlers', status: 'retained',
        notes: ['Projected on the third line with Jordan Staal and Jesperi Kotkaniemi'],
      },
      {
        pos: 'C', before: 'Logan Stankoven', after: 'Logan Stankoven', status: 'retained',
        notes: ['Projected to centre the second line with Taylor Hall and Jackson Blake'],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Nikishin unsigned and in trade rumours; Reilly unsigned',
    rows: [
      {
        pos: 'D', before: 'Alexander Nikishin', after: 'Alexander Nikishin', status: 'unsigned',
        notes: [
          'An unsigned restricted free agent, which is the only firm fact about his situation',
          'Projected on the third pair with Shayne Gostisbehere if he signs',
        ],
      },
      {
        pos: 'LD', before: 'Jaccob Slavin', after: 'Jaccob Slavin', status: 'retained',
        notes: ['Projected on the top pair with Jalen Chatfield'],
      },
      {
        pos: 'LD', before: 'K’Andre Miller', after: 'K’Andre Miller', status: 'retained',
        notes: ['Projected on the second pair with Sean Walker'],
      },
      {
        pos: 'D', before: 'Mike Reilly', after: null, status: 'unsigned',
        notes: ['An unsigned UFA at thirty-three'],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Andersen left for Edmonton and was not replaced',
    rows: [
      {
        pos: 'G', before: 'Frederik Andersen', after: null, status: 'departed',
        notes: [
          'Signed a one-year contract with Edmonton on Jul. 1',
          '13-2 with a 1.89 GAA and a .910 save percentage in 16 playoff games',
        ],
      },
      {
        pos: 'G', before: 'Pyotr Kochetkov', after: 'Pyotr Kochetkov', status: 'retained',
        notes: ['One of the two goaltenders in the projected lineup'],
      },
      {
        pos: 'G', before: 'Brandon Bussi', after: 'Brandon Bussi', status: 'camp',
        notes: ['Listed first among the projected goaltenders despite a limited NHL record'],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'A summer with no arrivals',
    body: 'The reset lists departures and no additions. Carolina is running back the group it had, minus its playoff goaltender.',
  },
  {
    title: 'The playoff goaltender left',
    body: 'Frederik Andersen was ordinary in the regular season and excellent in the playoffs — 13-2 with a 1.89 GAA and three shutouts. He signed a one-year deal in Edmonton, and nobody was signed to replace him.',
  },
  {
    title: 'Two open files on defense',
    body: 'Alexander Nikishin is an unsigned restricted free agent who has appeared in trade speculation, and Mike Reilly is an unsigned UFA. The projected third pair includes a player without a contract.',
  },
]

// Not researched from a primary source yet; the reset does not list picks.
export const draftClass = []

export const campWatch = [
  { name: 'Brandon Bussi', pos: 'G', note: 'Listed first among the projected goaltenders with Andersen gone.' },
]

export const unresolved = [
  { status: 'Open', item: 'Alexander Nikishin’s contract', impact: 'Unsigned RFA projected onto the third pair' },
  { status: 'Open', item: 'Seth Jarvis’ shoulder', impact: 'Four to six months from surgery; not in the projected lineup' },
  { status: 'Open', item: 'Goaltending after Andersen', impact: 'No replacement was signed' },
  { status: 'Open', item: 'Cap and contract detail', impact: 'Not yet verified against PuckPedia, so this club has no cap tab' },
]

export const rumors = [
  {
    date: 'Offseason',
    addedAt: '2026-08-19',
    player: 'Alexander Nikishin',
    topic: 'Alexander Nikishin’s contract',
    claim: 'Nikishin has been mentioned in trade speculation',
    status: 'reported',
    attribution: 'NHL.com’s Hurricanes team reset',
    sourceUrl: 'https://www.nhl.com/news/topic/team-resets/carolina-hurricanes-roster-changes-for-2026-27-season',
    detail: 'The confirmed part is only that he is an unsigned restricted free agent who needs re-signing. The reset notes he has been mentioned in trade rumours without naming a club, a return or a source for them.',
  },
]

export const sources = [
  { label: 'NHL.com Hurricanes 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/carolina-hurricanes-roster-changes-for-2026-27-season' },
  { label: 'Official Hurricanes news', url: 'https://www.nhl.com/hurricanes/news/' },
]

export const points = pointsFromLeague(league)
export const contracts = {}

export { STATUS, RUMOR_STATUS }
