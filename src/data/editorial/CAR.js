import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/CAR.json'
import draft from '../draft/CAR.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// Carolina Hurricanes editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Hurricanes team reset for the 2026-27 season. Cap
// figures read from PuckPedia on Aug. 19, 2026. Every "after" lineup is a projection until the club announces a
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
    summary: 'Nobody added; Jarvis is months from returning — projected roles are NHL.com’s',
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
      {
        pos: 'R', before: 'Jackson Blake', after: 'Jackson Blake', status: 'retained',
        notes: [
          'Projected on the second line alongside Taylor Hall and Logan Stankoven',
        ],
      },
      {
        pos: 'L', before: 'William Carrier', after: 'William Carrier', status: 'retained',
        notes: [
          'Projected on the fourth line alongside Mark Jankowski and Eric Robinson',
        ],
      },
      {
        pos: 'L', before: 'Nicolas Deslauriers', after: 'Nicolas Deslauriers', status: 'retained',
        notes: [
          'On the roster; not in NHL.com\'s projected lineup',
        ],
      },
      {
        pos: 'L', before: 'Taylor Hall', after: 'Taylor Hall', status: 'retained',
        notes: [
          'Projected on the second line alongside Logan Stankoven and Jackson Blake',
        ],
      },
      {
        pos: 'L', before: 'Mark Jankowski', after: 'Mark Jankowski', status: 'retained',
        notes: [
          'Projected to centre the fourth line between William Carrier and Eric Robinson',
        ],
      },
      {
        pos: 'C', before: 'Jesperi Kotkaniemi', after: 'Jesperi Kotkaniemi', status: 'retained',
        notes: [
          'Projected on the third line alongside Nikolaj Ehlers and Jordan Staal',
        ],
      },
      {
        pos: 'L', before: 'Jordan Martinook', after: 'Jordan Martinook', status: 'retained',
        notes: [
          'Projected on the first line alongside Andrei Svechnikov and Sebastian Aho',
        ],
      },
      {
        pos: 'L', before: 'Eric Robinson', after: 'Eric Robinson', status: 'retained',
        notes: [
          'Projected on the fourth line alongside William Carrier and Mark Jankowski',
        ],
      },
      {
        pos: 'C', before: 'Jordan Staal', after: 'Jordan Staal', status: 'retained',
        notes: [
          'Projected to centre the third line between Nikolaj Ehlers and Jesperi Kotkaniemi',
        ],
      },
      {
        pos: 'R', before: 'Andrei Svechnikov', after: 'Andrei Svechnikov', status: 'retained',
        notes: [
          'Projected on the first line alongside Sebastian Aho and Jordan Martinook',
        ],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Nikishin unsigned and in trade rumours; Reilly unsigned — projected roles are NHL.com’s',
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
      {
        pos: 'D', before: 'Jalen Chatfield', after: 'Jalen Chatfield', status: 'retained',
        notes: [
          'Projected on the top pair with Jaccob Slavin',
        ],
      },
      {
        pos: 'D', before: 'Shayne Gostisbehere', after: 'Shayne Gostisbehere', status: 'retained',
        notes: [
          'Projected on the third pair with Alexander Nikishin',
        ],
      },
      {
        pos: 'D', before: 'Sean Walker', after: 'Sean Walker', status: 'retained',
        notes: [
          'Projected on the second pair with K\'Andre Miller',
        ],
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
  {
    group: 'Coaching',
    summary: 'Rod Brind\'Amour returns behind the bench',
    rows: [
      {
        pos: 'Head coach', before: 'Rod Brind\'Amour', after: 'Rod Brind\'Amour', status: 'retained',
        notes: [
          'Listed as the club\'s head coach for both 2025–26 and 2026–27',
        ],
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

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'Brandon Bussi', pos: 'G', note: 'Listed first among the projected goaltenders with Andersen gone.' },
]

export const unresolved = [
  { status: 'Open', item: 'Alexander Nikishin’s contract', impact: 'Unsigned RFA projected onto the third pair' },
  { status: 'Open', item: 'Seth Jarvis’ shoulder', impact: 'Four to six months from surgery; not in the projected lineup' },
  { status: 'Open', item: 'Goaltending after Andersen', impact: 'No replacement was signed' },
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

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}

// CAR cap data, PuckPedia, retrieved Aug. 19, 2026.
export const cap = {
  capSummary: {
    ceiling: 104_000_000,
    capHit: 94_119_818,
    space: 9_880_182,
    rosterSlots: '21 / 23',
    potentialBonuses: 0,
    asOf: 'Aug. 19, 2026',
  },
  capGroups: [
    { key: 'F', label: 'Forwards', color: 'var(--cap-forwards)', total: 65_198_756 },
    { key: 'D', label: 'Defense', color: 'var(--cap-defense)', total: 25_021_062 },
    { key: 'G', label: 'Goaltending', color: 'var(--cap-goalies)', total: 3_900_000 },
  ],
  capHits: [
    { name: 'Sebastian Aho', group: 'F', hit: 9_750_000 },
    { name: 'Nikolaj Ehlers', group: 'F', hit: 8_500_000 },
    { name: 'Andrei Svechnikov', group: 'F', hit: 7_750_000 },
    { name: 'Seth Jarvis', group: 'F', hit: 7_420_087 },
    { name: 'Logan Stankoven', group: 'F', hit: 6_000_000 },
    { name: 'Jackson Blake', group: 'F', hit: 5_117_002 },
    { name: 'Jesperi Kotkaniemi', group: 'F', hit: 4_820_000 },
    { name: 'Taylor Hall', group: 'F', hit: 3_166_667 },
    { name: 'Jordan Martinook', group: 'F', hit: 3_125_000 },
    { name: 'Jordan Staal', group: 'F', hit: 2_975_000 },
    { name: 'William Carrier', group: 'F', hit: 2_150_000 },
    { name: 'Mark Jankowski', group: 'F', hit: 1_850_000 },
    { name: 'Eric Robinson', group: 'F', hit: 1_700_000 },
    { name: 'Nicolas Deslauriers', group: 'F', hit: 875_000 },
    // Unsigned RFA: no cap hit yet. The striped band shows the projected
    // space his next deal would come out of, not a signed amount.
    { name: 'Alexander Nikishin', group: 'D', hit: 9_880_182, projected: true },
    { name: 'K\'Andre Miller', group: 'D', hit: 7_500_000 },
    { name: 'Jaccob Slavin', group: 'D', hit: 6_396_062 },
    { name: 'Sean Walker', group: 'D', hit: 3_625_000 },
    { name: 'Shayne Gostisbehere', group: 'D', hit: 3_200_000 },
    { name: 'Jalen Chatfield', group: 'D', hit: 3_075_000 },
    { name: 'Joel Nystrom', group: 'D', hit: 1_225_000 },
    { name: 'Pyotr Kochetkov', group: 'G', hit: 2_000_000 },
    { name: 'Brandon Bussi', group: 'G', hit: 1_900_000 },
  ],
}

export { STATUS, RUMOR_STATUS }
