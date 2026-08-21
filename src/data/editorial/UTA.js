import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/UTA.json'
import draft from '../draft/UTA.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// Utah Mammoth editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Mammoth team reset for the 2026-27 season. Cap
// figures read from PuckPedia on Aug. 19, 2026. Every "after" lineup is a projection until the club announces a
// roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'Utah Mammoth',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['They sold a 25-goal winger.', 'The prospects are the plan.'],
  deck:
    'JJ Peterka went to Boston for a 2026 first and a conditional 2028 first, ' +
    'and Vincent Trocheck and Anders Lee came in as veterans. But the ' +
    'interesting part of Utah’s summer is who is coming up: Caleb Desnoyers, ' +
    'Tij Iginla, Daniil But and Dmitri Simashev are all named as candidates. ' +
    'The general manager’s own summary — “I like our team where they’re at.”',
}

export const ledgerRange = 'June 26 – July 3'

export const departures = [
  { date: 'Jun. 26', player: 'JJ Peterka', pos: 'F', mechanism: 'Trade to Boston', detail: 'Returned a 2026 first-round pick and a conditional 2028 first after 47 points.' },
  { date: 'Jul. 1', player: 'Sean Durzi', pos: 'D', mechanism: 'Trade to N.Y. Rangers', detail: 'Part of the package that brought Vincent Trocheck the other way.' },
  { date: 'Jul. 1', player: 'Alex Kerfoot', pos: 'F', mechanism: 'UFA', detail: 'Signed a two-year contract with Nashville.' },
  { date: 'Jul. 1', player: 'Ian Cole', pos: 'D', mechanism: 'UFA', detail: 'Signed a one-year contract with Chicago.' },
  { date: 'Jul. 1', player: 'Vitek Vanecek', pos: 'G', mechanism: 'UFA', detail: 'Signed a one-year contract with the N.Y. Islanders.' },
]

export const arrivals = [
  { date: 'Jun. 26', player: 'Sebastian Cossa', pos: 'G', deal: 'Trade from Detroit; two years, signed Jun. 30', role: 'Twenty-three; 2.33 GAA and .915 in 39 AHL games; projected backup' },
  { date: 'Jul. 1', player: 'Vincent Trocheck', pos: 'F', deal: 'Trade from N.Y. Rangers', role: 'Waived his no-trade clause; 53 points in 67 games; projected top line' },
  { date: 'Jul. 1', player: 'Anders Lee', pos: 'F', deal: 'Three years', role: 'Thirty-six; captained the Islanders for eight seasons; projected second line' },
  { date: 'Jul. 3', player: 'Andrew Peeke', pos: 'D', deal: 'One year', role: 'From Boston after 14 points in 77 games; projected third pair' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Peterka sold to Boston for two first-round picks; Trocheck and Lee added as veterans — depth rows are from the roster feed and 2025–26 club stats, not individually researched',
    rows: [
      {
        pos: 'F', before: 'JJ Peterka', after: null, status: 'departed',
        notes: [
          'Traded to Boston on Jun. 26 for a 2026 first and a conditional 2028 first',
          '25 goals and 47 points last season',
        ],
      },
      {
        pos: 'C', before: 'Logan Cooley', after: 'Logan Cooley', status: 'retained',
        notes: ['Projected to centre the second line between Anders Lee and Dylan Guenther'],
      },
      {
        pos: 'RW', before: 'Clayton Keller', after: 'Clayton Keller', status: 'retained',
        notes: ['Projected on the top line with Nick Schmaltz and Trocheck'],
      },
      {
        pos: 'F', before: null, after: 'Vincent Trocheck', status: 'added',
        notes: [
          'Acquired from the N.Y. Rangers on Jul. 1 after waiving his no-trade clause',
          '53 points in 67 games at thirty-three',
        ],
      },
      {
        pos: 'LW', before: null, after: 'Anders Lee', status: 'added',
        notes: [
          'Three years on Jul. 1 at thirty-six',
          'Fourteen seasons with the Islanders, the last eight as captain',
        ],
      },
      {
        pos: 'F', before: 'Alex Kerfoot', after: null, status: 'departed',
        notes: ['Signed a two-year contract with Nashville on Jul. 1'],
      },
      {
        pos: 'L', before: 'Daniil But', after: 'Daniil But', status: 'retained',
        notes: [
          'Played 29 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'L', before: 'Michael Carcone', after: 'Michael Carcone', status: 'retained',
        notes: [
          'Played 79 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'L', before: 'Lawson Crouse', after: 'Lawson Crouse', status: 'retained',
        notes: [
          'Played 81 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'R', before: 'Dylan Guenther', after: 'Dylan Guenther', status: 'retained',
        notes: [
          'Played 79 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Barrett Hayton', after: 'Barrett Hayton', status: 'retained',
        notes: [
          'Played 67 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Jack McBain', after: 'Jack McBain', status: 'retained',
        notes: [
          'Played 75 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Liam O\'Brien', after: 'Liam O\'Brien', status: 'retained',
        notes: [
          'Played 38 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Nick Schmaltz', after: 'Nick Schmaltz', status: 'retained',
        notes: [
          'Played 82 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Kevin Stenlund', after: 'Kevin Stenlund', status: 'retained',
        notes: [
          'Played 80 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'L', before: 'Brandon Tanev', after: 'Brandon Tanev', status: 'retained',
        notes: [
          'Played 56 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'R', before: 'Kailer Yamamoto', after: 'Kailer Yamamoto', status: 'retained',
        notes: [
          'Played 59 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Liam O\'Brien', after: 'Liam O\'Brien', status: 'retained',
        notes: [
          'Played 38 games for the club in 2025–26 and is on the current roster',
        ],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Durzi traded and Cole gone; Peeke signed and Simashev expected to step in — depth rows are from the roster feed and 2025–26 club stats, not individually researched',
    rows: [
      {
        pos: 'D', before: 'Sean Durzi', after: null, status: 'departed',
        notes: ['Traded to the N.Y. Rangers on Jul. 1 in the Trocheck deal'],
      },
      {
        pos: 'D', before: 'Ian Cole', after: null, status: 'departed',
        notes: ['Signed a one-year contract with Chicago on Jul. 1'],
      },
      {
        pos: 'D', before: null, after: 'Andrew Peeke', status: 'added',
        notes: [
          'One year on Jul. 3 after 14 points in 77 games with Boston',
          'Projected on the third pair with Dmitri Simashev',
        ],
      },
      {
        pos: 'LD', before: null, after: 'Dmitri Simashev', status: 'camp',
        notes: [
          'Twenty-one, the sixth overall pick in 2023, expected in a full-time role',
          '35 points in 40 AHL games; a projection rather than an announced job',
        ],
      },
      {
        pos: 'RD', before: 'Mikhail Sergachev', after: 'Mikhail Sergachev', status: 'retained',
        notes: ['Projected on the top pair with MacKenzie Weegar'],
      },
      {
        pos: 'D', before: 'Nick DeSimone', after: 'Nick DeSimone', status: 'retained',
        notes: [
          'Played 40 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'D', before: 'Maveric Lamoureux', after: 'Maveric Lamoureux', status: 'retained',
        notes: [
          'Played 5 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'D', before: 'John Marino', after: 'John Marino', status: 'retained',
        notes: [
          'Played 80 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'D', before: 'Nate Schmidt', after: 'Nate Schmidt', status: 'retained',
        notes: [
          'Played 82 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'D', before: 'MacKenzie Weegar', after: 'MacKenzie Weegar', status: 'retained',
        notes: [
          'Played 19 games for the club in 2025–26 and is on the current roster',
        ],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Vanecek left; Cossa acquired from Detroit behind Vejmelka',
    rows: [
      {
        pos: 'G', before: 'Karel Vejmelka', after: 'Karel Vejmelka', status: 'retained',
        notes: ['Projected starter'],
      },
      {
        pos: 'G', before: null, after: 'Sebastian Cossa', status: 'added',
        notes: [
          'Acquired from Detroit on Jun. 26 and signed for two years on Jun. 30',
          '26-8-4 with a 2.33 GAA and .915 save percentage in 39 AHL games',
        ],
      },
      {
        pos: 'G', before: 'Vitek Vanecek', after: null, status: 'departed',
        notes: ['Signed a one-year contract with the N.Y. Islanders on Jul. 1'],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'Two first-round picks for a 25-goal scorer',
    body: 'JJ Peterka went to Boston on Jun. 26 for a 2026 first and a conditional 2028 first. It is the clearest sign that Utah is still accumulating rather than pushing.',
  },
  {
    title: 'Veterans on the top two lines',
    body: 'Vincent Trocheck waived a no-trade clause to come from the Rangers, and Anders Lee signed for three years at thirty-six after eight seasons as an Islanders captain.',
  },
  {
    title: 'They matched an offer sheet',
    body: 'New Jersey tendered Barrett Hayton an offer sheet on Jul. 1 and Utah matched it, keeping him at a $4,775,000 cap hit. It is the summer’s second matched offer sheet after Anaheim matched Philadelphia’s bid for Leo Carlsson, and it is recorded on the Devils reset rather than Utah’s own.',
  },
  {
    title: 'The prospect queue is the real story',
    body: 'Caleb Desnoyers (fourth overall, 2025), Tij Iginla (sixth, 2024), Daniil But and Dmitri Simashev are all named as candidates. The general manager said of Desnoyers that he “will have a chance to make the NHL roster.”',
  },
]

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'Caleb Desnoyers', pos: 'F', note: 'Nineteen, fourth overall in 2025; the GM said he will have a chance to make the roster.' },
  { name: 'Tij Iginla', pos: 'F', note: 'Nineteen, sixth overall in 2024, after 90 points in 48 WHL games.' },
  { name: 'Daniil But', pos: 'F', note: 'Twenty-one; 39 points in 41 AHL games and pushing for playing time.' },
  { name: 'Dmitri Simashev', pos: 'D', note: 'Twenty-one; expected in a full-time role on the third pair.' },
]

export const unresolved = [
  { status: 'Open', item: 'Which prospects make the roster', impact: 'Four are named as candidates for a lineup that is otherwise set' },
  { status: 'Open', item: 'Backup goaltending', impact: 'The GM named it as something to monitor; Cossa has one NHL appearance' },
  { status: 'Open', item: 'Defensive depth', impact: 'Also named by the GM, after Durzi and Cole both left' },
  { status: 'Open', item: 'A buyout that runs to 2031', impact: '$650K for Oliver Ekman-Larsson this season, then $290K a year for four more' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Mammoth 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/utah-mammoth-roster-changes-for-2026-27-season' },
  { label: 'NHL.com Devils team reset (matched Hayton offer sheet)', url: 'https://www.nhl.com/news/topic/team-resets/new-jersey-devils-roster-changes-for-2026-27-season' },
  { label: 'Official Mammoth news', url: 'https://www.nhl.com/mammoth/news/' },
]

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}

// UTA cap data, PuckPedia, retrieved Aug. 19, 2026.
//
// PuckPedia's own figures do not quite reconcile here: the stated group totals
// sum to $99,415,375 while its stated cap hit is $99,415,357, an $18 gap. Both
// were read back from the page to rule out a transcription slip — Dylan
// Guenther really is listed at $7,142,875 and the forward total at $66,392,875.
// The values below are the source's, unaltered; the $18 is noted rather than
// quietly reconciled by editing a number nobody published.
export const cap = {
  capSummary: {
    ceiling: 104_000_000,
    capHit: 99_415_357,
    space: 4_584_643,
    rosterSlots: '23 / 23',
    potentialBonuses: 1_000_000,
    asOf: 'Aug. 19, 2026',
  },
  capGroups: [
    { key: 'F', label: 'Forwards', color: 'var(--cap-forwards)', total: 66_392_875 },
    { key: 'D', label: 'Defense', color: 'var(--cap-defense)', total: 25_622_500 },
    { key: 'G', label: 'Goaltending', color: 'var(--cap-goalies)', total: 6_750_000 },
    { key: 'O', label: 'Retained & buyouts', color: 'var(--cap-other)', total: 650_000 },
  ],
  capHits: [
    { name: 'Logan Cooley', group: 'F', hit: 10_000_000 },
    { name: 'Nick Schmaltz', group: 'F', hit: 8_000_000 },
    { name: 'Clayton Keller', group: 'F', hit: 7_150_000 },
    { name: 'Dylan Guenther', group: 'F', hit: 7_142_875 },
    { name: 'Vincent Trocheck', group: 'F', hit: 5_625_000 },
    { name: 'Anders Lee', group: 'F', hit: 5_400_000 },
    { name: 'Barrett Hayton', group: 'F', hit: 4_775_000 },
    { name: 'Lawson Crouse', group: 'F', hit: 4_300_000 },
    { name: 'Jack McBain', group: 'F', hit: 4_250_000 },
    { name: 'Kevin Stenlund', group: 'F', hit: 2_750_000 },
    { name: 'Brandon Tanev', group: 'F', hit: 2_500_000 },
    { name: 'Michael Carcone', group: 'F', hit: 1_750_000 },
    { name: 'Kailer Yamamoto', group: 'F', hit: 1_750_000 },
    { name: 'Liam O\'Brien', group: 'F', hit: 1_000_000 },
    { name: 'Mikhail Sergachev', group: 'D', hit: 8_500_000 },
    { name: 'MacKenzie Weegar', group: 'D', hit: 6_250_000 },
    { name: 'John Marino', group: 'D', hit: 4_400_000 },
    { name: 'Nate Schmidt', group: 'D', hit: 3_500_000 },
    { name: 'Andrew Peeke', group: 'D', hit: 1_000_000 },
    { name: 'Nick DeSimone', group: 'D', hit: 1_000_000 },
    { name: 'Dmitri Simashev', group: 'D', hit: 972_500 },
    { name: 'Karel Vejmelka', group: 'G', hit: 4_750_000 },
    { name: 'Sebastian Cossa', group: 'G', hit: 2_000_000 },
    { name: 'LD,RD', group: 'O', hit: 650_000, charge: 'buyout' },
  ],
}

export { STATUS, RUMOR_STATUS }
