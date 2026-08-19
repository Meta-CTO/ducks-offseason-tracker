import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/FLA.json'
import draft from '../draft/FLA.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// Florida Panthers editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Panthers team reset for the 2026-27 season. Cap
// figures have not been read from PuckPedia for this club yet, so there is no
// cap tab. Every "after" lineup is a projection until the club announces a
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
    summary: 'Brady Tkachuk acquired to join his brother; Barkov returns from a lost season',
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
    ],
  },
  {
    group: 'Defense',
    summary: 'Gudas signed for six years after his rights came from Anaheim',
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
  { status: 'Open', item: 'Health', impact: 'The reset frames the whole season around recovering from a year of injuries' },
  { status: 'Open', item: 'Whether Markstrom holds the crease', impact: 'Replacing a goaltender who won two Cups here' },
  { status: 'Open', item: 'Cap and contract detail', impact: 'Not yet verified against PuckPedia, so this club has no cap tab' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Panthers 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/florida-panthers-roster-changes-for-2026-27-season' },
  { label: 'Official Panthers news', url: 'https://www.nhl.com/panthers/news/' },
]

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}

export { STATUS, RUMOR_STATUS }
