import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/FLA.json'
import draft from '../draft/FLA.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// Florida Panthers editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Panthers team reset for the 2026-27 season. Cap
// figures read from PuckPedia on Aug. 19, 2026. Every "after" lineup is a projection until the club announces a
// roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'Florida Panthers',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['Injuries cost them a season.', 'So they traded for the other Tkachuk.'],
  deck:
    'Two-time champions who missed the playoffs at 40-38-4, undone by a year ' +
    'in which Aleksander Barkov did not play at all and Matthew Tkachuk ' +
    'missed 47 games. Florida’s answer was to pay two first-round picks and ' +
    'more for Brady Tkachuk, rebuild the crease around Jacob Markstrom after ' +
    'Sergei Bobrovsky left for Toronto, and sign Radko Gudas for six years.',
}

export const ledgerRange = 'June 21 – July 1'

export const departures = [
  { date: 'Jun. 21', player: 'Mackie Samoskevich', pos: 'F', mechanism: 'Trade to Seattle', detail: 'Returned a 2026 first and a conditional 2027 second; signed a three-year deal with Seattle.' },
  { date: 'Jun. 29', player: 'A.J. Greer', pos: 'F', mechanism: 'Trade to Anaheim', detail: 'Went the other way in the deal that brought Radko Gudas’ rights; signed four years with the Ducks after 32 points in 78 games.' },
  { date: 'Jun. 30', player: 'Evan Rodrigues', pos: 'F', mechanism: 'Trade to New Jersey', detail: 'Sent with Jesper Boqvist and Ben Steeves for Jacob Markstrom, after 31 points in 69 games.' },
  { date: 'Jun. 30', player: 'Jesper Boqvist', pos: 'F', mechanism: 'Trade to New Jersey', detail: 'Included in the Markstrom deal.' },
  { date: 'Jul. 1', player: 'Sergei Bobrovsky', pos: 'G', mechanism: 'UFA', detail: 'Signed a three-year contract with Toronto after winning Stanley Cups in Florida in 2024 and 2025.' },
  { date: 'Jul. 1', player: 'Daniil Tarasov', pos: 'G', mechanism: 'UFA', detail: 'Signed a one-year contract with Detroit.' },
]

export const arrivals = [
  { date: 'Jun. 21', player: 'Brady Tkachuk', pos: 'F', deal: 'Trade from Ottawa; two years left on a seven-year deal', role: 'Cost the ninth and 25th picks, a conditional 2029 first and a 2027 second; joins his brother' },
  { date: 'Jun. 25', player: 'Garnet Hathaway', pos: 'F', deal: 'Trade from Philadelphia', role: 'Philadelphia retained $1.2M of his cap hit; projected fourth line' },
  { date: 'Jun. 29', player: 'Akira Schmid', pos: 'G', deal: 'Trade from Vegas for a 2028 third', role: 'Projected backup; 16-10-6 with a 2.59 GAA last season' },
  { date: 'Jun. 30', player: 'Jacob Markstrom', pos: 'G', deal: 'Trade from New Jersey; first season of a two-year deal', role: 'Cost Rodrigues, Boqvist and Ben Steeves; projected starter' },
  { date: 'Jul. 1', player: 'Radko Gudas', pos: 'D', deal: 'Six years; rights acquired from Anaheim Jun. 29', role: 'Anaheim received A.J. Greer’s rights; projected third pair' },
  { date: 'Jul. 1', player: 'Lars Eller', pos: 'F', deal: 'One year', role: 'From Ottawa; projected to centre the fourth line' },
  { date: 'Jul. 1', player: 'Alexander Petrovic', pos: 'D', deal: 'Two years', role: 'From Dallas; defensive depth' },
  { date: 'Jul. 1', player: 'Sam Lafferty', pos: 'F', deal: 'One year, two-way', role: 'From Chicago; forward depth' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Brady Tkachuk acquired to join his brother; Barkov returns from a lost season — depth rows are from the roster feed and 2025–26 club stats, not individually researched',
    rows: [
      {
        pos: 'C', before: 'Aleksander Barkov', after: 'Aleksander Barkov', status: 'retained',
        notes: [
          'Captain; missed the entire 2025-26 season after ACL and MCL surgery',
          'Projected to centre the top line between Brady Tkachuk and Sam Reinhart',
        ],
      },
      {
        pos: 'LW', before: null, after: 'Brady Tkachuk', status: 'added',
        notes: [
          'Acquired from Ottawa on Jun. 21 for the ninth and 25th picks, a conditional 2029 first and a 2027 second',
          'Ottawa’s captain for five seasons; 59 points in 60 games',
          'Two years left on the seven-year contract he signed in 2021',
        ],
      },
      {
        pos: 'LW', before: 'Matthew Tkachuk', after: 'Matthew Tkachuk', status: 'retained',
        notes: [
          'Missed the first 47 games last season after offseason surgery',
          'Projected on the second line with Sam Bennett and Carter Verhaeghe',
        ],
      },
      {
        pos: 'F', before: 'A.J. Greer', after: null, status: 'departed',
        notes: [
          'Traded to Anaheim on Jun. 29 for the rights to Radko Gudas',
          '17 goals and 32 points in 78 games; signed four years in Anaheim',
        ],
      },
      {
        pos: 'F', before: 'Mackie Samoskevich', after: null, status: 'departed',
        notes: ['Traded to Seattle on Jun. 21 for a 2026 first and a conditional 2027 second'],
      },
      {
        pos: 'C', before: null, after: 'Lars Eller', status: 'added',
        notes: ['One year on Jul. 1 from Ottawa; projected to centre the fourth line'],
      },
          {
        pos: 'C', before: 'John Beecher', after: 'John Beecher', status: 'retained',
        notes: [
          'On the current roster; no 2025–26 games for the club',
        ],
      },
      {
        pos: 'C', before: 'Sam Bennett', after: 'Sam Bennett', status: 'retained',
        notes: [
          'Played 76 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'L', before: 'Jonah Gadjovich', after: 'Jonah Gadjovich', status: 'retained',
        notes: [
          'Played 10 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'R', before: 'Garnet Hathaway', after: 'Garnet Hathaway', status: 'retained',
        notes: [
          'On the current roster; no 2025–26 games for the club',
        ],
      },
      {
        pos: 'C', before: 'Sam Lafferty', after: 'Sam Lafferty', status: 'retained',
        notes: [
          'On the current roster; no 2025–26 games for the club',
        ],
      },
      {
        pos: 'C', before: 'Anton Lundell', after: 'Anton Lundell', status: 'retained',
        notes: [
          'Played 64 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Eetu Luostarinen', after: 'Eetu Luostarinen', status: 'retained',
        notes: [
          'Played 73 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'L', before: 'Brad Marchand', after: 'Brad Marchand', status: 'retained',
        notes: [
          'Played 52 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'L', before: 'Cole Reinhardt', after: 'Cole Reinhardt', status: 'retained',
        notes: [
          'Played 15 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Sam Reinhart', after: 'Sam Reinhart', status: 'retained',
        notes: [
          'Played 64 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Cole Schwindt', after: 'Cole Schwindt', status: 'retained',
        notes: [
          'Played 29 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Carter Verhaeghe', after: 'Carter Verhaeghe', status: 'retained',
        notes: [
          'Played 77 games for the club in 2025–26 and is on the current roster',
        ],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Gudas signed for six years after his rights came from Anaheim — depth rows are from the roster feed and 2025–26 club stats, not individually researched',
    rows: [
      {
        pos: 'RD', before: null, after: 'Radko Gudas', status: 'added',
        notes: [
          'Rights acquired from Anaheim on Jun. 29 for A.J. Greer; signed for six years on Jul. 1',
          'Anaheim’s captain last season; his departure left that club’s captaincy vacant',
          'Projected on the third pair with Dmitry Kulikov',
        ],
      },
      {
        pos: 'D', before: 'Aaron Ekblad', after: 'Aaron Ekblad', status: 'retained',
        notes: ['Projected on the top pair with Gustav Forsling'],
      },
      {
        pos: 'RD', before: 'Seth Jones', after: 'Seth Jones', status: 'retained',
        notes: ['Projected on the second pair; one of many players injured last season'],
      },
      {
        pos: 'D', before: null, after: 'Alexander Petrovic', status: 'added',
        notes: ['Two years on Jul. 1 from Dallas'],
      },
          {
        pos: 'D', before: 'Uvis Balinskis', after: 'Uvis Balinskis', status: 'retained',
        notes: [
          'Played 54 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'D', before: 'Gustav Forsling', after: 'Gustav Forsling', status: 'retained',
        notes: [
          'Played 80 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'D', before: 'Dmitry Kulikov', after: 'Dmitry Kulikov', status: 'retained',
        notes: [
          'Played 19 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'D', before: 'Niko Mikkola', after: 'Niko Mikkola', status: 'retained',
        notes: [
          'Played 68 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'D', before: 'Donovan Sebrango', after: 'Donovan Sebrango', status: 'retained',
        notes: [
          'Played 40 games for the club in 2025–26 and is on the current roster',
        ],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Bobrovsky left for Toronto; Markstrom and Schmid acquired in separate trades',
    rows: [
      {
        pos: 'G', before: 'Sergei Bobrovsky', after: null, status: 'departed',
        notes: [
          'Signed a three-year contract with Toronto on Jul. 1',
          'Won Stanley Cups with Florida in 2024 and 2025',
        ],
      },
      {
        pos: 'G', before: null, after: 'Jacob Markstrom', status: 'added',
        notes: [
          'Acquired from New Jersey on Jun. 30 for Evan Rodrigues, Jesper Boqvist and Ben Steeves',
          'Projected starter',
        ],
      },
      {
        pos: 'G', before: null, after: 'Akira Schmid', status: 'added',
        notes: [
          'Acquired from Vegas on Jun. 29 for a 2028 third-round pick',
          '16-10-6 with a 2.59 GAA in 34 games; projected backup',
        ],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'Two first-round picks for a Tkachuk',
    body: 'Brady Tkachuk cost the ninth and 25th selections, a conditional 2029 first and a 2027 second. He arrives from Ottawa, where he had been captain for five seasons, to play alongside his brother Matthew.',
  },
  {
    title: 'A championship crease, replaced',
    body: 'Sergei Bobrovsky won two Stanley Cups in Florida and signed in Toronto on Jul. 1. Jacob Markstrom came from New Jersey and Akira Schmid from Vegas, in two separate trades over two days.',
  },
  {
    title: 'Eleven players are hurt right now',
    body: 'PuckPedia’s active injury table lists eleven Panthers as of Aug. 19: Marchand month to month after surgery, plus Bennett, Verhaeghe, Forsling, Jones, Mikkola, Gudas, Kulikov, Balinskis, Gadjovich and Markstrom. Florida also has $34,286 of cap space, which is what makes that list a problem rather than an inconvenience.',
  },
  {
    title: 'The season was lost to injuries',
    body: 'Barkov missed the whole year after ACL and MCL surgery, Matthew Tkachuk the first 47 games. Jones, Reinhart, Marchand, Lundell, Kulikov, Nosek and Gadjovich were all hurt too. Florida finished 40-38-4 and missed the playoffs.',
  },
  {
    title: 'The Anaheim connection',
    body: 'Radko Gudas signed for six years after Florida sent A.J. Greer’s rights to Anaheim on Jun. 29. The same trade appears on the Ducks page, where Gudas’ departure is what left their captaincy vacant.',
  },
]

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'Sandis Vilmanis', pos: 'LW', note: 'Projected onto the fourth line with Eller and Hathaway.' },
]

export const unresolved = [
  { status: 'Open', item: 'Health', impact: 'Eleven players on the active injury table, with $34,286 of cap space to absorb it' },
  { status: 'Open', item: 'Brad Marchand’s surgery', impact: 'Month to month; may miss the start of the season' },
  { status: 'Open', item: 'Whether Markstrom holds the crease', impact: 'Replacing a goaltender who won two Cups here' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Panthers 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/florida-panthers-roster-changes-for-2026-27-season' },
  { label: 'Official Panthers news', url: 'https://www.nhl.com/panthers/news/' },
]

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}

// FLA cap data, PuckPedia, retrieved Aug. 19, 2026.
export const cap = {
  capSummary: {
    ceiling: 104_000_000,
    capHit: 103_965_714,
    space: 34_286,
    rosterSlots: '22 / 23',
    potentialBonuses: 250_000,
    asOf: 'Aug. 19, 2026',
  },
  capGroups: [
    { key: 'F', label: 'Forwards', color: 'var(--cap-forwards)', total: 68_410_714 },
    { key: 'D', label: 'Defense', color: 'var(--cap-defense)', total: 27_405_000 },
    { key: 'G', label: 'Goaltending', color: 'var(--cap-goalies)', total: 8_000_000 },
    { key: 'O', label: 'Retained & buyouts', color: 'var(--cap-other)', total: 150_000 },
  ],
  capHits: [
    { name: 'Aleksander Barkov', group: 'F', hit: 10_000_000 },
    { name: 'Matthew Tkachuk', group: 'F', hit: 9_500_000 },
    { name: 'Sam Reinhart', group: 'F', hit: 8_625_000 },
    { name: 'Brady Tkachuk', group: 'F', hit: 8_205_714 },
    { name: 'Sam Bennett', group: 'F', hit: 8_000_000 },
    { name: 'Carter Verhaeghe', group: 'F', hit: 7_000_000 },
    { name: 'Brad Marchand', group: 'F', hit: 5_250_000 },
    { name: 'Anton Lundell', group: 'F', hit: 5_000_000 },
    { name: 'Eetu Luostarinen', group: 'F', hit: 3_000_000 },
    { name: 'Garnet Hathaway', group: 'F', hit: 1_200_000 },
    { name: 'Jonah Gadjovich', group: 'F', hit: 905_000 },
    { name: 'Cole Schwindt', group: 'F', hit: 875_000 },
    { name: 'Lars Eller', group: 'F', hit: 850_000 },
    { name: 'Seth Jones', group: 'D', hit: 7_000_000 },
    { name: 'Aaron Ekblad', group: 'D', hit: 6_100_000 },
    { name: 'Gustav Forsling', group: 'D', hit: 5_750_000 },
    { name: 'Niko Mikkola', group: 'D', hit: 5_000_000 },
    { name: 'Radko Gudas', group: 'D', hit: 1_500_000 },
    { name: 'Dmitry Kulikov', group: 'D', hit: 1_180_000 },
    { name: 'Uvis Balinskis', group: 'D', hit: 875_000 },
    { name: 'Jacob Markstrom', group: 'G', hit: 6_000_000 },
    { name: 'Akira Schmid', group: 'G', hit: 2_000_000 },
    { name: 'Bonus Carryover Overage', group: 'O', hit: 150_000, charge: 'buyout' },
  ],
}

export { STATUS, RUMOR_STATUS }
