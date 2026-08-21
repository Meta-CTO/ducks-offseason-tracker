import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/OTT.json'
import draft from '../draft/OTT.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// Ottawa Senators editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Senators team reset for the 2026-27 season. Cap
// figures read from PuckPedia on Aug. 19, 2026. Every "after" lineup is a projection until the club announces a
// roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'Ottawa Senators',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['They traded their captain.', 'They say it is not a step back.'],
  deck:
    'Brady Tkachuk went to Florida on Jun. 21 to play with his brother, ' +
    'ending five seasons as captain and 463 points in 572 games. Ottawa took ' +
    'two first-round picks and more, then spent the ninth of them on William ' +
    'Eklund. The captaincy is vacant, the reset still names a top-six forward ' +
    'as the need, and the general manager insists the direction has not ' +
    'changed.',
}

export const ledgerRange = 'June 21 – July 1'

export const departures = [
  { date: 'Jun. 21', player: 'Brady Tkachuk', pos: 'LW · Captain', mechanism: 'Trade to Florida', detail: 'Returned the ninth and 25th picks, a conditional 2029 first and a 2027 second; 463 points in 572 games across five seasons as captain.' },
  { date: 'Offseason', player: 'Daniel Alfredsson', pos: 'Assistant coach', mechanism: 'Contract expired', detail: 'Joined Toronto as an associate coach; a franchise legend with 1,108 career points.' },
  { date: 'Jul. 1', player: 'Lars Eller', pos: 'C', mechanism: 'UFA', detail: 'Signed a one-year contract with Florida.' },
]

export const arrivals = [
  { date: 'Jun. 23', player: 'William Eklund', pos: 'F', deal: 'Trade from San Jose', role: 'Cost the ninth overall pick; arrived with Kasper Halttunen and Brandon Svoboda; projected top line' },
  { date: 'Jun. 26', player: 'Andre Burakovsky', pos: 'F', deal: 'Trade from Chicago for a 2027 sixth', role: '33 points in 75 games; projected third line' },
  { date: 'Jun. 26', player: 'Samuel Ersson', pos: 'G', deal: 'Trade from Toronto; two years, $4.4M', role: 'Cost a 2027 fifth; projected backup to Linus Ullmark' },
  { date: 'Jul. 1', player: 'Sammy Blais', pos: 'F', deal: 'Two years', role: 'Bottom-six forward; eight points last season across Toronto and Montréal' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Tkachuk traded to Florida; Eklund bought with the pick it returned — depth rows are from the roster feed and 2025–26 club stats, not individually researched',
    rows: [
      {
        pos: 'LW', before: 'Brady Tkachuk', after: null, status: 'departed',
        notes: [
          'Traded to Florida on Jun. 21 for the ninth and 25th picks, a conditional 2029 first and a 2027 second',
          'Captain for five seasons; 463 points in 572 games',
          'The captaincy is now vacant, with nobody named',
        ],
      },
      {
        pos: 'F', before: null, after: 'William Eklund', status: 'added',
        notes: [
          'Acquired from San Jose on Jun. 23 for the ninth overall pick — the selection the Tkachuk trade produced',
          '53 points in 78 games; projected on the top line with Tim Stutzle and Drake Batherson',
        ],
      },
      {
        pos: 'C', before: 'Tim Stutzle', after: 'Tim Stutzle', status: 'retained',
        notes: [
          'Projected to centre the top line',
          'The reset says Ottawa still needs a top-six forward to take pressure off him and Batherson',
        ],
      },
      {
        pos: 'F', before: null, after: 'Andre Burakovsky', status: 'added',
        notes: [
          'Acquired from Chicago on Jun. 26 for a 2027 sixth-round pick',
          '33 points in 75 games; projected third line',
        ],
      },
      {
        pos: 'RW', before: null, after: 'Claude Giroux', status: 'retained',
        notes: [
          'Re-signed for one year; the reset suggests he may take on leadership after Tkachuk’s departure',
          'Projected on the second line with Ridly Greig and Dylan Cozens',
        ],
      },
      {
        pos: 'C', before: 'Lars Eller', after: null, status: 'departed',
        notes: ['Signed a one-year contract with Florida on Jul. 1'],
      },
          {
        pos: 'R', before: 'Michael Amadio', after: 'Michael Amadio', status: 'retained',
        notes: [
          'Played 81 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'R', before: 'Drake Batherson', after: 'Drake Batherson', status: 'retained',
        notes: [
          'Played 79 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Nick Cousins', after: 'Nick Cousins', status: 'retained',
        notes: [
          'Played 81 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Dylan Cozens', after: 'Dylan Cozens', status: 'retained',
        notes: [
          'Played 82 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'L', before: 'Warren Foegele', after: 'Warren Foegele', status: 'retained',
        notes: [
          'Played 21 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Ridly Greig', after: 'Ridly Greig', status: 'retained',
        notes: [
          'Played 77 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Stephen Halliday', after: 'Stephen Halliday', status: 'retained',
        notes: [
          'Played 30 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'R', before: 'Hayden Hodgson', after: 'Hayden Hodgson', status: 'retained',
        notes: [
          'Played 10 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'L', before: 'Kurtis MacDermid', after: 'Kurtis MacDermid', status: 'retained',
        notes: [
          'Played 19 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Shane Pinto', after: 'Shane Pinto', status: 'retained',
        notes: [
          'Played 72 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'L', before: 'Fabian Zetterlund', after: 'Fabian Zetterlund', status: 'retained',
        notes: [
          'Played 82 games for the club in 2025–26 and is on the current roster',
        ],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Unchanged; Yakemchuk gets a look at camp — depth rows are from the roster feed and 2025–26 club stats, not individually researched',
    rows: [
      {
        pos: 'LD', before: 'Jake Sanderson', after: 'Jake Sanderson', status: 'retained',
        notes: ['Projected on the top pair with Artem Zub'],
      },
      {
        pos: 'LD', before: 'Thomas Chabot', after: 'Thomas Chabot', status: 'retained',
        notes: ['Projected on the second pair with Tyler Kleven’s partner Jordan Spence'],
      },
      {
        pos: 'RD', before: null, after: 'Carter Yakemchuk', status: 'camp',
        notes: [
          'Twenty, with a two-game NHL debut behind him',
          'The reset says he “will get a long look at training camp”',
        ],
      },
          {
        pos: 'D', before: 'Cameron Crotty', after: 'Cameron Crotty', status: 'retained',
        notes: [
          'Played 6 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'D', before: 'Tyler Kleven', after: 'Tyler Kleven', status: 'retained',
        notes: [
          'Played 70 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'D', before: 'Nikolas Matinpalo', after: 'Nikolas Matinpalo', status: 'retained',
        notes: [
          'Played 50 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'D', before: 'Jordan Spence', after: 'Jordan Spence', status: 'retained',
        notes: [
          'Played 73 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'D', before: 'Artem Zub', after: 'Artem Zub', status: 'retained',
        notes: [
          'Played 81 games for the club in 2025–26 and is on the current roster',
        ],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Ersson acquired from Toronto to back up Ullmark — depth rows are from the roster feed and 2025–26 club stats, not individually researched',
    rows: [
      {
        pos: 'G', before: 'Linus Ullmark', after: 'Linus Ullmark', status: 'retained',
        notes: ['Projected starter'],
      },
      {
        pos: 'G', before: null, after: 'Samuel Ersson', status: 'added',
        notes: [
          'Acquired from Toronto on Jun. 26 for a 2027 fifth, on a two-year, $4.4M contract',
          'Had gone Philadelphia to Toronto ten days earlier in the Joseph Woll trade',
        ],
      },
          {
        pos: 'G', before: 'Leevi Meriläinen', after: 'Leevi Meriläinen', status: 'retained',
        notes: [
          'Played 20 games for the club in 2025–26 and is on the current roster',
        ],
      },
    ],
  },
  {
    group: 'Coaching',
    summary: 'Alfredsson left for Toronto when his contract expired',
    rows: [
      {
        pos: 'Assistant coach', before: 'Daniel Alfredsson', after: null, status: 'departed',
        notes: [
          'Contract expired; joined Toronto as an associate coach',
          'A franchise legend with 1,108 career points',
        ],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'The captain went to play with his brother',
    body: 'Brady Tkachuk was traded to Florida on Jun. 21 for the ninth and 25th picks, a conditional 2029 first and a 2027 second. He had captained Ottawa for five seasons.',
  },
  {
    title: 'The ninth pick immediately became William Eklund',
    body: 'Two days after the Tkachuk trade, Ottawa sent that selection to San Jose for Eklund, a 53-point winger who is 23. The picks did not sit long.',
  },
  {
    title: 'Nobody has been named captain',
    body: 'The reset records no successor. Claude Giroux, re-signed for a year, is the player it suggests may take on the leadership.',
  },
  {
    title: 'A goaltender who changed hands twice in ten days',
    body: 'Samuel Ersson went Philadelphia to Toronto on Jun. 16 in the Joseph Woll trade, then Toronto to Ottawa on Jun. 26 for a fifth-round pick.',
  },
]

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'Carter Yakemchuk', pos: 'RD', note: 'Twenty; the reset says he will get a long look at training camp.' },
]

export const unresolved = [
  { status: 'Open', item: 'The captaincy', impact: 'Vacant since the Tkachuk trade, with no successor named' },
  { status: 'Open', item: 'A top-six forward', impact: 'Named in the reset as the need, to take pressure off Stutzle and Batherson' },
  { status: 'Open', item: 'Carter Yakemchuk’s roster spot', impact: 'Third defense pair' },
  { status: 'Open', item: 'Salary still owed elsewhere', impact: '$875K buying out Colin White and $1M retained on Joonas Korpisalo, now a Ranger' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Senators 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/ottawa-senators-roster-changes-for-2026-27-season' },
  { label: 'Official Senators news', url: 'https://www.nhl.com/senators/news/' },
]

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}

// OTT cap data, PuckPedia, retrieved Aug. 19, 2026.
export const cap = {
  capSummary: {
    ceiling: 104_000_000,
    capHit: 99_804_167,
    space: 4_195_833,
    rosterSlots: '23 / 23',
    potentialBonuses: 4_000_000,
    asOf: 'Aug. 19, 2026',
  },
  capGroups: [
    { key: 'F', label: 'Forwards', color: 'var(--cap-forwards)', total: 57_312_500 },
    { key: 'D', label: 'Defense', color: 'var(--cap-defense)', total: 29_066_667 },
    { key: 'G', label: 'Goaltending', color: 'var(--cap-goalies)', total: 11_550_000 },
    { key: 'O', label: 'Retained & buyouts', color: 'var(--cap-other)', total: 1_875_000 },
  ],
  capHits: [
    { name: 'Tim Stutzle', group: 'F', hit: 8_350_000 },
    { name: 'Shane Pinto', group: 'F', hit: 7_500_000 },
    { name: 'Dylan Cozens', group: 'F', hit: 7_100_000 },
    { name: 'William Eklund', group: 'F', hit: 5_600_000 },
    { name: 'Andre Burakovsky', group: 'F', hit: 5_500_000 },
    { name: 'Drake Batherson', group: 'F', hit: 4_975_000 },
    { name: 'Fabian Zetterlund', group: 'F', hit: 4_275_000 },
    { name: 'Warren Foegele', group: 'F', hit: 3_500_000 },
    { name: 'Ridly Greig', group: 'F', hit: 3_250_000 },
    { name: 'Michael Amadio', group: 'F', hit: 2_600_000 },
    { name: 'Claude Giroux', group: 'F', hit: 2_000_000 },
    { name: 'Nick Cousins', group: 'F', hit: 1_587_500 },
    { name: 'Stephen Halliday', group: 'F', hit: 1_075_000 },
    { name: 'Jake Sanderson', group: 'D', hit: 8_050_000 },
    { name: 'Thomas Chabot', group: 'D', hit: 8_000_000 },
    { name: 'Jordan Spence', group: 'D', hit: 5_000_000 },
    { name: 'Artem Zub', group: 'D', hit: 4_600_000 },
    { name: 'Tyler Kleven', group: 'D', hit: 1_600_000 },
    { name: 'Carter Yakemchuk', group: 'D', hit: 941_667 },
    { name: 'Nikolas Matinpalo', group: 'D', hit: 875_000 },
    { name: 'Linus Ullmark', group: 'G', hit: 8_250_000 },
    { name: 'Samuel Ersson', group: 'G', hit: 2_200_000 },
    { name: 'Leevi Merilainen', group: 'G', hit: 1_100_000 },
    { name: 'C,RW', group: 'O', hit: 875_000, charge: 'buyout' },
    { name: 'RETAINED', group: 'O', hit: 1_000_000, charge: 'retained' },
  ],
}

export { STATUS, RUMOR_STATUS }
