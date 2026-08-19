import { STATUS, RUMOR_STATUS } from '../status'

// Anaheim Ducks editorial content, sourced from the 2026 offseason research
// brief. One module per club; see src/data/editorial/index.js.
// Research cutoff: August 6, 2026 (America/Los_Angeles). Every "after"
// lineup is a projection until the Ducks announce the official roster.

export const LAST_UPDATED = 'August 6, 2026'

// Hero copy. Club-specific, so it lives with the club's other editorial
// content rather than hard-coded into the Hero component.
export const hero = {
  team: 'Anaheim Ducks',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['The core stayed.', 'The blue line changed.'],
  deck:
    'Anaheim\u2019s young core broke a seven-year playoff drought and won a ' +
    'postseason round. Then the Ducks spent the summer paying Leo Carlsson, ' +
    'trading Mason McTavish and Olen Zellweger, and replacing nearly an entire ' +
    'defense corps. Here is the team that finished 2025\u201326, and the one ' +
    'projected to open 2026\u201327.',
}

// Date span covered by the transaction ledger.
export const ledgerRange = 'June 25 \u2013 July 28'


export const seasonSnapshot = {
  record: '43–33–6',
  points: 92,
  division: '3rd, Pacific',
  goalsFor: 265,
  goalsAgainst: 288,
  firstRound: 'Beat Edmonton, 4–2',
  secondRound: 'Lost to Vegas, 4–2',
  coach: 'Joel Quenneville (first season)',
  captain: 'Radko Gudas',
}

export const departures = [
  { date: 'Jun. 26', player: 'Mason McTavish', pos: 'C', mechanism: 'Trade to St. Louis', detail: 'Returned 2026 first-round picks Nos. 15 and 29; became Nikita Klepov and (after a move-up to 28) Marcus Nordmark.' },
  { date: 'Jun. 26', player: 'Olen Zellweger', pos: 'D', mechanism: 'Trade to Buffalo', detail: 'Returned Anton Wahlberg plus pick No. 45 (Jayden Kurtz).' },
  { date: 'Jun. 28–29', player: 'John Carlson', pos: 'D', mechanism: 'UFA rights traded to Carolina', detail: 'Returned pick No. 192 (Noah Kosick) and prospect Kyle Masters; Carlson later signed with Tampa Bay.' },
  { date: 'Jun. 29', player: 'Radko Gudas', pos: 'D · Captain', mechanism: 'UFA rights traded to Florida', detail: 'Returned rights to A.J. Greer; opens the captaincy.' },
  { date: 'Jul. 1', player: 'Jacob Trouba', pos: 'D', mechanism: 'UFA', detail: 'Signed with San Jose; removes a 22:50-per-game veteran and 35 points.' },
  { date: 'Jul. 1', player: 'Jeffrey Viel', pos: 'LW', mechanism: 'UFA', detail: 'Signed with Tampa Bay.' },
  { date: 'Jul. 1', player: 'Ross Johnston', pos: 'LW', mechanism: 'UFA', detail: 'Signed with St. Louis.' },
  { date: 'Jul. 1', player: 'Petr Mrazek', pos: 'G', mechanism: 'UFA', detail: 'Not re-signed; opens the backup competition behind Dostal.' },
  { date: 'Jul. 27', player: 'Sasha Pastujov', pos: 'LW (prospect)', mechanism: 'Trade to Montreal', detail: 'For Sean Farrell; an AHL/prospect swap, not an NHL-lineup trade.' },
]

export const arrivals = [
  { date: 'Jun. 25', player: 'Ian Moore', pos: 'D', deal: 'Two-year, one-way extension through 2027–28', role: 'Bottom-pair / internal replacement' },
  { date: 'Jun. 26', player: 'Anton Wahlberg', pos: 'C', deal: 'Acquired from Buffalo', role: 'AHL depth / camp candidate; not a lock' },
  { date: 'Jul. 1', player: 'A.J. Greer', pos: 'LW/RW', deal: 'Four years, $17M ($4.25M AAV)', role: 'Physical third-line winger; 32 points, 203 hits in 2025–26' },
  { date: 'Jul. 1', player: 'Nick Jensen', pos: 'RD', deal: 'Two years, $4.5M ($2.25M AAV)', role: 'Veteran top-four right-side defender; monitor knee recovery' },
  { date: 'Jul. 1', player: 'Jeff Malott', pos: 'LW', deal: 'Three years, $5.55M ($1.85M AAV)', role: 'Physical fourth-line winger' },
  { date: 'Jul. 1', player: 'Laurent Brossoit', pos: 'G', deal: 'One year, $1.1M', role: 'Competes with Ville Husso for the backup job' },
  { date: 'Jul. 5', player: 'Pavel Mintyukov', pos: 'D', deal: 'Five-year extension through 2030–31', role: 'Long-term top-four core defenseman' },
  { date: 'Jul. 7', player: 'Tyson Hinds', pos: 'D', deal: 'Two-year, one-way extension through 2027–28', role: 'NHL roster candidate after playoff usage' },
  { date: 'Jul. 9', player: 'Leo Carlsson', pos: 'C', deal: 'Matched Philadelphia offer sheet: five years, $90M ($18M AAV)', role: 'Franchise center and centerpiece' },
  { date: 'Jul. 15 / 25', player: 'Marcus Nordmark / Nikita Klepov', pos: 'RW', deal: 'Three-year entry-level contracts', role: 'First-round prospects; neither is a roster lock' },
  { date: 'Jul. 27–28', player: 'Sean Farrell', pos: 'C', deal: 'From Montreal; one-year, two-way contract', role: 'AHL scoring depth / call-up candidate' },
]

// Per-person roster diff, one row per player/coach. "notes" are news
// bullets sourced from the research brief, NHL API stat pulls, and
// PuckPedia contract/injury data (retrieved Aug 7, 2026).
export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Top six returns intact; McTavish, Viel and Johnston out; Greer and Malott in',
    rows: [
      {
        pos: 'C', before: 'Leo Carlsson', after: 'Leo Carlsson', status: 'retained',
        notes: [
          'Ducks matched Philadelphia\u2019s five-year, $90M offer sheet on Jul. 9; the defining transaction of the summer',
          '29 G, 38 A in 70 games, then 11 points in the playoff run',
          'Listed as an alternate captain; a candidate for the vacant captaincy, though nothing is announced',
        ],
      },
      {
        pos: 'LW', before: 'Cutter Gauthier', after: 'Cutter Gauthier', status: 'unsigned',
        notes: [
          'Led the team with 41 goals as the top-line winger',
          'Unsigned RFA as of the Aug. 6 research cutoff, the only firm fact; asking-price rumors are not confirmed',
          'His deal directly moves the ~$9.1M projected cap space and the top-line projection',
        ],
      },
      {
        pos: 'RW', before: 'Beckett Sennecke', after: 'Beckett Sennecke', status: 'retained',
        notes: [
          '60 points in all 82 games as a rookie',
          'Still on his entry-level deal through 2027\u201328 ($954K AAV, RFA after)',
          'Projected second-line RW alongside Granlund in NHL.com\u2019s July 10 lineup',
        ],
      },
      {
        pos: 'RW', before: 'Troy Terry', after: 'Troy Terry', status: 'injured',
        notes: [
          'Listed with a hip injury; PuckPedia carries him as month-to-month',
          '57 points in 61 games when healthy last season',
          'Top-nine composition and power-play options hinge on his recovery timeline',
        ],
      },
      {
        pos: 'LW', before: 'Chris Kreider', after: 'Chris Kreider', status: 'retained',
        notes: [
          '22 goals, 50 points in 75 games in his first Anaheim season',
          'Entering the final year of his deal ($6.5M AAV, UFA 2027)',
          'Projected first-line LW next to Carlsson',
        ],
      },
      {
        pos: 'C/LW', before: 'Mikael Granlund', after: 'Mikael Granlund', status: 'retained',
        notes: [
          '41 points in 58 games last season',
          'Signed through 2027\u201328 at $7M AAV',
          'Projected second-line center between Killorn and Sennecke',
        ],
      },
      {
        pos: 'LW', before: 'Alex Killorn', after: 'Alex Killorn', status: 'retained',
        notes: [
          '33 points in all 82 games',
          'Listed as an alternate captain',
          'Final contract year ($6.25M AAV, UFA 2027)',
        ],
      },
      {
        pos: 'RW', before: 'Frank Vatrano', after: 'Frank Vatrano', status: 'retained',
        notes: [
          'Down year: 9 points in 50 games',
          'Signed through 2027\u201328 ($4.57M AAV)',
          'Projected third-line winger with Poehling and Greer',
        ],
      },
      {
        pos: 'C', before: 'Ryan Poehling', after: 'Ryan Poehling', status: 'retained',
        notes: [
          'Projected to move up to third-line center after the McTavish trade',
          'Career-best 36 points in 75 games',
          'Currently listed out (upper body), week-to-week per PuckPedia',
          'Signed through 2029\u201330 at $3.75M AAV',
        ],
      },
      {
        pos: 'C', before: 'Washe', after: 'Washe', status: 'retained',
        notes: [
          'Projected fourth-line center',
          '5 points in 39 games as an NHL rookie',
          'RFA after 2026\u201327 ($813K)',
        ],
      },
      {
        pos: 'C', before: 'Mason McTavish', after: null, status: 'departed',
        notes: [
          'Traded to St. Louis on Jun. 26 for 2026 first-round picks Nos. 15 and 29, which became Nikita Klepov and (after a move-up to 28) Marcus Nordmark',
          '41 points in 75 games, plus 6 points in 10 playoff games',
          'Was already signed six years, $42M through 2030\u201331 when dealt; a term commitment St. Louis inherited',
        ],
      },
      {
        pos: 'LW', before: 'Jeffrey Viel', after: null, status: 'departed',
        notes: [
          'Signed five years, $12.5M with Tampa Bay ($2.5M AAV), with a no-trade clause in the first two years',
          '10 points in 45 regular-season games, then 4 points in 12 playoff games',
          'Bottom-six physicality the Ducks are replacing with Malott',
        ],
      },
      {
        pos: 'LW', before: 'Ross Johnston', after: null, status: 'departed',
        notes: [
          'Signed three years, $6M with St. Louis',
          '14 points and 107 PIM in 62 games',
          'Fourth-line size and physicality out the door alongside Viel',
        ],
      },
      {
        pos: 'LW/RW', before: null, after: 'A.J. Greer', status: 'added',
        notes: [
          'Four years, $17M on Jul. 1 ($4.25M AAV through 2029\u201330)',
          '32 points and 203 hits last season',
          'Anaheim acquired his rights from Florida for Gudas\u2019 rights before free agency opened',
        ],
      },
      {
        pos: 'LW', before: null, after: 'Jeff Malott', status: 'added',
        notes: [
          'Three years, $5.55M ($1.85M AAV through 2028\u201329)',
          '9 points in 58 games; brings the physical fourth-line profile the departures vacated',
          'Projected fourth-line LW in NHL.com\u2019s July 10 lineup',
        ],
      },
      {
        pos: 'RW', before: null, after: 'Colangelo', status: 'camp',
        notes: [
          'Internal depth promoted to 4RW in NHL.com\u2019s projection; job to be settled in camp',
          '1 point in 9 NHL games last season',
          'One year left at $850K (Group 6 UFA after)',
        ],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Four of six playoff regulars gone; Jensen is the only established outside addition',
    rows: [
      {
        pos: 'LD', before: 'Jackson LaCombe', after: 'Jackson LaCombe', status: 'retained',
        notes: [
          'Becomes the undisputed No. 1 after four veteran regulars departed',
          '58 points in 82 games at 24:15 a night',
          'Locked up long-term: $9M AAV through 2033\u201334; listed as an alternate captain',
        ],
      },
      {
        pos: 'LD', before: 'Pavel Mintyukov', after: 'Pavel Mintyukov', status: 'retained',
        notes: [
          'Signed a five-year extension through 2030\u201331 on Jul. 5 ($7.2M AAV)',
          '22 points in 73 games',
          'Projected second-pair anchor alongside Jensen',
        ],
      },
      {
        pos: 'RD', before: 'Drew Helleson', after: 'Drew Helleson', status: 'retained',
        notes: [
          'Projected top-pair partner for LaCombe',
          'Currently listed out (undisclosed), week-to-week per PuckPedia',
          '15 points in 60 games; RFA after 2026\u201327 ($1.1M)',
        ],
      },
      {
        pos: 'LD', before: 'Tyson Hinds', after: 'Tyson Hinds', status: 'retained',
        notes: [
          'Two-year, one-way extension signed Jul. 7 ($900K AAV)',
          'Promoted to a projected regular role after playoff usage',
          'Just 6 NHL games last season; a real bet on internal growth',
        ],
      },
      {
        pos: 'RD', before: 'Ian Moore', after: 'Ian Moore', status: 'retained',
        notes: [
          'Two-year, one-way extension signed Jun. 25 ($1.15M AAV)',
          '12 points in 67 games as a rookie',
          'Projected third pair with Hinds',
        ],
      },
      {
        pos: 'RD', before: 'Jacob Trouba', after: null, status: 'departed',
        notes: [
          'Signed four years, $33M with San Jose ($8.25M AAV), with a no-trade clause in the first two years',
          '35 points in 81 games at 22:50 a night; the biggest veteran-minutes hole to fill',
          'One of four playoff-regular defensemen who left this summer',
        ],
      },
      {
        pos: 'RD', before: 'Radko Gudas', after: null, status: 'departed',
        notes: [
          'Captain\u2019s rights traded to Florida on Jun. 29 for A.J. Greer\u2019s rights; captaincy now vacant',
          'Signed six years, $9M with the Panthers; a 35+ contract through 2031\u201332 at $1.5M AAV',
          'Served a five-game suspension in March for kneeing Auston Matthews; 13 points in 56 games',
        ],
      },
      {
        pos: 'RD', before: 'John Carlson', after: null, status: 'departed',
        notes: [
          'Deadline rental: 14 points in 16 regular-season games as a Duck, plus 6 assists in 12 playoff games',
          'Rights traded to Carolina on Jun. 28\u201329 for pick No. 192 (Noah Kosick) and prospect Kyle Masters',
          'Ultimately signed two years, $17M with Tampa Bay ($8.5M AAV, no-move clause)',
        ],
      },
      {
        pos: 'LD', before: 'Olen Zellweger', after: null, status: 'departed',
        notes: [
          'Traded to Buffalo on Jun. 26 for Anton Wahlberg plus pick No. 45 (Jayden Kurtz)',
          '22 points in 76 games as a puck-moving option the Ducks chose to cash in',
          'Signed three years, $9.3M with the Sabres after the trade ($3.1M AAV, RFA 2029)',
        ],
      },
      {
        pos: 'RD', before: null, after: 'Nick Jensen', status: 'added',
        notes: [
          'Two years, $4.5M on Jul. 1 ($2.25M AAV); the only established NHL defenseman added from outside',
          'Currently on IR (knee), week-to-week per PuckPedia; the recovery is worth monitoring into camp',
          '17 points in 61 games last season; veteran right-shot stabilizer for the top four',
        ],
      },
      {
        pos: 'RD', before: null, after: 'Tristan Luneau', status: 'camp',
        notes: [
          'GM Pat Verbeek has said he expects Luneau to make the team out of camp',
          '41 points in 70 AHL games; 1 NHL game last season',
          'Final entry-level year ($865K), RFA next summer; four departed regulars create the opening',
        ],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Dostal secure as the starter; open competition behind him',
    rows: [
      {
        pos: 'G', before: 'Lukas Dostal', after: 'Lukas Dostal', status: 'retained',
        notes: [
          '30\u201320\u20134 in 56 games as the No. 1',
          'Signed through 2029\u201330 at $6.5M AAV',
          'Workload management behind him is the only open goaltending question',
        ],
      },
      {
        pos: 'G', before: 'Ville Husso', after: 'Ville Husso', status: 'camp',
        notes: [
          'Competing with Brossoit for the backup job in camp',
          '20 games last season',
          'Final contract year ($2.2M, UFA 2027)',
        ],
      },
      {
        pos: 'G', before: 'Petr Mrazek', after: null, status: 'departed',
        notes: [
          'Not re-signed; still an unsigned UFA as of Aug. 7',
          '10 games with an .858 SV% for Anaheim last season',
          'His exit is what opened the Husso\u2013Brossoit competition',
        ],
      },
      {
        pos: 'G', before: null, after: 'Laurent Brossoit', status: 'added',
        notes: [
          'One year, $1.1M on Jul. 1 to push Husso for the backup job',
          'Played just one NHL game last season after injury trouble',
          'Low-cost veteran bet; the loser of the camp battle is a waiver question',
        ],
      },
    ],
  },
  {
    group: 'Coaching',
    summary: 'Entire NHL bench returns; the captaincy is the only vacancy',
    rows: [
      {
        pos: 'HC', before: 'Joel Quenneville', after: 'Joel Quenneville', status: 'retained',
        notes: [
          'Returns after a 43\u201333\u20136 debut season that ended a seven-year playoff drought',
          'Won his 1,000th NHL game in February against Edmonton',
          'First Anaheim coach to win a playoff round since 2017',
        ],
      },
      {
        pos: 'AC', before: 'Tim Army', after: 'Tim Army', status: 'retained',
        notes: [
          'Returning assistant on a fully retained NHL staff',
          'Bench continuity contrasts sharply with the roster turnover around it',
          'The organizational coaching change is below him: Dave Manson now leads AHL San Diego',
        ],
      },
      {
        pos: 'AC', before: 'Jay Woodcroft', after: 'Jay Woodcroft', status: 'retained',
        notes: [
          'Returning assistant; former Edmonton head coach adds bench experience',
          'Part of an NHL staff that returns wholesale from the playoff run',
          'Helped coach the first-round upset of his former club',
        ],
      },
      {
        pos: 'AC', before: 'Ryan McGill', after: 'Ryan McGill', status: 'retained',
        notes: [
          'Returning assistant on an unchanged NHL bench',
          'Now coaches a blue line that lost four playoff regulars; the biggest on-ice change to manage',
          'Youth (Hinds, Moore, Luneau) replaces the departed veteran structure',
        ],
      },
      {
        pos: 'AC', before: 'Andrew Brewer', after: 'Andrew Brewer', status: 'retained',
        notes: [
          'Returning assistant on a fully retained NHL staff',
          'Continuity is the stated theme behind the bench',
          'AHL affiliate staff changed (Manson, Buchberger, McCarthy) but the NHL bench did not',
        ],
      },
      {
        pos: 'GC', before: 'Peter Budaj', after: 'Peter Budaj', status: 'retained',
        notes: [
          'Returning goaltending coach and former NHL goalie',
          'Oversees Dostal\u2019s continued ascent as the clear No. 1',
          'Runs the Husso vs. Brossoit backup competition in camp',
        ],
      },
      {
        pos: 'Captain', before: 'Radko Gudas', after: 'TBD', status: 'departed',
        notes: [
          'Captaincy vacant after Gudas\u2019 rights were traded to Florida',
          'Carlsson, Killorn and LaCombe are the listed alternates',
          'The team has not signaled a successor; do not infer the next captain',
        ],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'The franchise bet',
    body: 'Philadelphia forced the decision with a five-year offer sheet worth $90 million. Anaheim matched it, keeping its 21-year-old No. 1 center after a 67-point regular season and an 11-point playoff run.',
  },
  {
    title: 'A surprise youth-for-futures trade',
    body: 'Anaheim moved 23-year-old Mason McTavish after a 41-point season, turning him into two first-round selections. Those picks became Nikita Klepov and, after a small move-up, Marcus Nordmark.',
  },
  {
    title: 'Four regulars out on defense',
    body: 'Jacob Trouba, Radko Gudas, John Carlson and Olen Zellweger all left. Jackson LaCombe and Pavel Mintyukov now anchor a younger group, with Nick Jensen the primary veteran addition and Tristan Luneau pushing for a job.',
  },
  {
    title: 'Not set yet',
    body: 'Leading scorer Cutter Gauthier remains unsigned, Troy Terry is recovering from a hip injury, the captaincy is vacant and several roster jobs will be settled in training camp.',
  },
]

export const draftClass = [
  { rd: 1, pick: 15, player: 'Nikita Klepov', pos: 'RW', note: 'Headline prospect; OHL rookie season: 67 GP, 37–60–97; possible camp push' },
  { rd: 1, pick: 28, player: 'Marcus Nordmark', pos: 'RW', note: 'First-round prospect, signed; development story rather than roster lock' },
  { rd: 2, pick: 45, player: 'Jayden Kurtz', pos: 'D', note: 'Acquired pick in Zellweger trade' },
  { rd: 2, pick: 50, player: 'Mathis Preston', pos: 'RW', note: 'Development pipeline' },
  { rd: 3, pick: 82, player: 'Rian Chudzinski', pos: 'RW', note: 'Development pipeline' },
  { rd: 5, pick: 146, player: 'Eric Frossard', pos: 'D', note: 'Development pipeline' },
  { rd: 6, pick: 178, player: 'Gleb Peshkov', pos: 'G', note: 'Development pipeline' },
  { rd: 6, pick: 192, player: 'Noah Kosick', pos: 'C', note: 'Pick obtained in John Carlson rights deal' },
  { rd: 7, pick: 210, player: 'James Rieber', pos: 'D', note: 'Development pipeline' },
]

export const campWatch = [
  { name: 'Tristan Luneau', pos: 'D', note: '41 points in 70 AHL games; GM Pat Verbeek expects him to make the team out of camp. Four departed regulars create a real opening.' },
  { name: 'Roger McQueen', pos: 'F', note: '2025 No. 10 pick; 27 points in 36 NCAA games, then seven AHL games. NHL.com says he will have a shot in camp.' },
  { name: 'Nikita Klepov', pos: 'RW', note: '2026 No. 15 pick and OHL Rookie of the Year after a 97-point season; signed to an entry-level deal.' },
  { name: 'Anton Wahlberg', pos: 'C', note: 'Acquired for Zellweger; 37 points in 68 AHL games. More likely organizational depth than immediate top-nine certainty.' },
  { name: 'Laurent Brossoit', pos: 'G', note: 'Veteran competing with Husso for the backup position.' },
]

export const unresolved = [
  { status: 'Open', item: 'Cutter Gauthier contract', impact: 'Top-line projection, cap space and long-term core' },
  { status: 'Open', item: 'Troy Terry hip recovery', impact: 'Top-nine composition and power-play options' },
  { status: 'Open', item: 'Captaincy', impact: 'Leadership module after Gudas departure' },
  { status: 'Open', item: 'Luneau / McQueen / Klepov camp results', impact: 'Youth callouts and final roster' },
  { status: 'Open', item: 'Husso vs. Brossoit', impact: 'Backup-goalie card' },
  { status: 'Open', item: 'Final 23-man roster', impact: 'Replace "projected" labels with the official roster' },
  { status: 'Scheduled', item: 'Home opener vs. Florida, Oct. 4, 2026', impact: 'Game 1 anchor and countdown' },
]

export const sources = [
  { label: 'Official Ducks news archive', url: 'https://www.nhl.com/ducks/news/' },
  { label: 'Official 2025–26 Ducks statistics', url: 'https://www.nhl.com/ducks/stats' },
  { label: 'Official current roster', url: 'https://www.nhl.com/ducks/roster/' },
  { label: 'NHL.com 2026–27 roster reset and projected lineup', url: 'https://www.nhl.com/news/topic/team-resets/anaheim-ducks-roster-changes-for-2026-27-season' },
  { label: 'NHL.com 2026–27 inside look', url: 'https://www.nhl.com/news/topic/32-in-32/anaheim-ducks-inside-look-for-2026-27-season-32-in-32' },
  { label: 'NHL.com 2026–27 top prospects', url: 'https://www.nhl.com/news/topic/32-in-32/anaheim-ducks-top-prospects-for-2026-27-season-32-in-32' },
  { label: 'Official 2026 draft class', url: 'https://www.nhl.com/ducks/fans/ducks-draft' },
  { label: 'PuckPedia contracts/cap', url: 'https://puckpedia.com/team/anaheim-ducks' },
  { label: 'Hockey-Reference 2025–26 season', url: 'https://www.hockey-reference.com/teams/ANA/2026.html' },
]

export const rumors = [
  {
    date: 'Aug. 16',
    addedAt: '2026-08-18',
    player: 'Cutter Gauthier',
    topic: 'Cutter Gauthier contract',
    claim: 'Gauthier turned down four years, $52M ($13M AAV)',
    status: 'reported',
    attribution: 'Paul Shaheen, NHL Network Radio contributor',
    sourceUrl: 'https://www.prohockeyrumors.com/2026/08/cutter-gauthier-rejects-ducks-latest-offer.html',
    detail: 'Recirculated within a day by most aggregators, but every version traces back to the same single report. The Ducks, Gauthier and agent Kurt Overhardt have all stayed silent, and PuckPedia still lists him with no contract.',
  },
  {
    date: 'Jul.',
    addedAt: '2026-08-18',
    player: 'Cutter Gauthier',
    topic: 'Cutter Gauthier contract',
    claim: 'Gauthier will not sign for less than Carlsson’s $18M AAV',
    status: 'unconfirmed',
    attribution: 'Keith Yandle, on the Spittin’ Chiclets podcast',
    detail: 'Yandle framed it himself as a "tidbit" he was fed, and did not say whether he meant the $18M annual figure or the $90M total. No reporter has since put a number to the asking price on the record.',
  },
]

export { STATUS, RUMOR_STATUS }
