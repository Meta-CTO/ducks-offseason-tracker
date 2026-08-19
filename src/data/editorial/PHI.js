import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/PHI.json'
import draft from '../draft/PHI.json'
import { pointsFromLeague, draftFromApi } from './_derive'

// Philadelphia Flyers editorial content. Research cutoff: August 19, 2026.
//
// Primary sources: the club's own releases at nhl.com/flyers/news, NHL.com's
// Flyers team reset for the projected lineup, and PuckPedia (retrieved
// Aug. 19, 2026) for cap, contract terms and the active injury table. Every
// "after" lineup is a projection until the Flyers announce an official roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'Philadelphia Flyers',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['They swung at a franchise center.', 'They missed, and paid their own.'],
  deck:
    'Philadelphia tendered Leo Carlsson a five-year, $90 million offer sheet ' +
    'on Jul. 3 — $18 million a year, the biggest swing of the summer — and ' +
    'Anaheim matched it six days later. What followed was the fallback plan: ' +
    'Trevor Zegras and Jamie Drysdale re-signed long term, a new crease built ' +
    'around a trade with Toronto, and a top six that now leans on players the ' +
    'club drafted. Here is what changed, and what camp still has to settle.',
}

export const ledgerRange = 'June 16 – August 18'

export const seasonSnapshot = {
  capHit: '$90,217,917',
  capSpace: '$13,782,083',
  rosterSlots: '23 / 23',
  contracts: '45 / 50',
  asOf: 'Aug. 19, 2026',
}

export const departures = [
  { date: 'Jun. 16', player: 'Samuel Ersson', pos: 'G', mechanism: 'Trade to Toronto', detail: 'Went the other way in the Joseph Woll deal, ending his run as the incumbent option in goal.' },
  { date: 'Jun. 16', player: 'Emil Andrae', pos: 'D', mechanism: 'Trade to Toronto', detail: 'Included with Ersson and a 2026 third-round pick to land Woll and Simon Benoit.' },
  { date: 'Jun. 25', player: 'Garnet Hathaway', pos: 'RW', mechanism: 'Trade to Florida', detail: 'Sent with a 2026 sixth-round pick for a 2026 fifth and a 2027 fourth; Philadelphia retains $1.2M of his cap hit.' },
  { date: 'Jul. 1', player: 'Noah Juulsen', pos: 'D', mechanism: 'UFA', detail: 'Signed a two-year contract with Colorado.' },
  { date: 'Jul. 1', player: 'Luke Glendening', pos: 'C', mechanism: 'UFA', detail: 'Left as an unrestricted free agent; the fourth-line center job passes to Couturier and Acciari.' },
  { date: 'Jul. 1', player: 'Rodrigo Abols', pos: 'F', mechanism: 'UFA', detail: 'Left as an unrestricted free agent.' },
]

export const arrivals = [
  { date: 'Jun. 16', player: 'Joseph Woll', pos: 'G', deal: 'Trade from Toronto; $3.67M AAV', role: 'Acquired with Benoit for Ersson, Andrae and a 2026 third; pairs with Vladar in goal' },
  { date: 'Jun. 16', player: 'Simon Benoit', pos: 'LD/RD', deal: 'Trade from Toronto; $1.35M', role: 'Defensive depth: 194 hits and 114 blocked shots in 73 games last season' },
  { date: 'Jul. 1', player: 'Noel Acciari', pos: 'C/RW', deal: 'Two years, $2.8M AAV', role: 'Fourth-line center; 25 points in 67 games with Pittsburgh' },
  { date: 'Jul. 1', player: 'Carl Grundstrom', pos: 'LW', deal: 'One year, $1.0M', role: 'Bottom-six forward depth' },
  { date: 'Jul. 15', player: 'Trevor Zegras', pos: 'C', deal: 'Four years, $9.125M AAV', role: 'Re-signed as the top-line center after leading the team down the middle' },
  { date: 'Jul. 17', player: 'Jamie Drysdale', pos: 'RD', deal: 'Four years, $6.5M AAV', role: 'Re-signed to run the second pair alongside Cam York' },
  { date: 'Aug. 6', player: 'Nikita Grebenkin', pos: 'LW/RW', deal: 'Two years, $1.1M AAV', role: 'Depth winger kept on a cheap second contract' },
  { date: 'Aug. 18', player: 'Hunter McDonald', pos: 'LD', deal: 'Two years, $912.5K AAV', role: 'Organizational defense depth; the summer’s last piece of business' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Zegras re-signed and centering the top line; Glendening and Abols out; Acciari and Grundstrom in',
    rows: [
      {
        pos: 'C', before: 'Trevor Zegras', after: 'Trevor Zegras', status: 'retained',
        notes: [
          'Re-signed Jul. 15 for four years at $9.125M a year, the club’s second-richest cap hit',
          'Projected between Tyson Foerster and Porter Martone on the top line',
          'Signed after Anaheim matched the Carlsson offer sheet, which is the context for the term',
        ],
      },
      {
        pos: 'RW', before: 'Travis Konecny', after: 'Travis Konecny', status: 'retained',
        notes: [
          'Highest cap hit on the roster at $8.75M through 2033',
          'Projected on the second line with Christian Dvorak and Owen Tippett',
        ],
      },
      {
        pos: 'RW', before: 'Matvei Michkov', after: 'Matvei Michkov', status: 'retained',
        notes: [
          'Still on his entry-level deal at $950K, with restricted free agency due in 2027',
          'Projected on the third line alongside Noah Cates and Alex Bump',
        ],
      },
      {
        pos: 'RW', before: 'Tyson Foerster', after: 'Tyson Foerster', status: 'retained',
        notes: [
          'Carries $3.75M this season before the deal jumps to $7.1M through 2035',
          'Projected as the top-line right shot next to Zegras',
        ],
      },
      {
        pos: 'RW', before: null, after: 'Porter Martone', status: 'camp',
        notes: [
          'Nineteen years old at $977,917; NHL.com projects him straight onto the top line',
          'A projection rather than a decision — the club has announced no roster',
        ],
      },
      {
        pos: 'LW', before: 'Owen Tippett', after: 'Owen Tippett', status: 'injured',
        notes: [
          'Listed out week to week with an abdomen injury on PuckPedia’s active injury table',
          '$6.2M through 2032; projected on the second line when fit',
        ],
      },
      {
        pos: 'C', before: 'Noah Cates', after: 'Noah Cates', status: 'injured',
        notes: [
          'Listed out week to week with a foot injury',
          'Signed at $4M through 2028 and projected to centre the third line',
        ],
      },
      {
        pos: 'C', before: 'Sean Couturier', after: 'Sean Couturier', status: 'retained',
        notes: [
          'Captain, at $7.75M through 2030',
          'Projected down to the fourth line in NHL.com’s lineup, with Acciari on his wing',
        ],
      },
      {
        pos: 'C', before: 'Luke Glendening', after: null, status: 'departed',
        notes: ['Left as a UFA on Jul. 1; his bottom-six centre minutes are unassigned'],
      },
      {
        pos: 'C/RW', before: null, after: 'Noel Acciari', status: 'added',
        notes: [
          'Two years at $2.8M on Jul. 1 after 25 points in 67 games with Pittsburgh',
          'Projected on the fourth line with Couturier and Denver Barkey',
        ],
      },
      {
        pos: 'LW', before: null, after: 'Carl Grundstrom', status: 'added',
        notes: ['One year at $1.0M for bottom-six depth'],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Drysdale re-signed; Andrae and Juulsen out; Benoit in from Toronto',
    rows: [
      {
        pos: 'RD', before: 'Jamie Drysdale', after: 'Jamie Drysdale', status: 'retained',
        notes: [
          'Re-signed Jul. 17 for four years at $6.5M',
          'Projected on the second pair with Cam York',
        ],
      },
      {
        pos: 'LD', before: 'Travis Sanheim', after: 'Travis Sanheim', status: 'retained',
        notes: ['$6.25M through 2031; projected on the top pair with Rasmus Ristolainen'],
      },
      {
        pos: 'LD', before: 'Cameron York', after: 'Cameron York', status: 'retained',
        notes: ['$5.15M through 2030; projected alongside Drysdale'],
      },
      {
        pos: 'RD', before: 'Rasmus Ristolainen', after: 'Rasmus Ristolainen', status: 'retained',
        notes: ['$5.1M and an unrestricted free agent in 2027'],
      },
      {
        pos: 'RD', before: null, after: 'Oliver Bonk', status: 'camp',
        notes: [
          'Twenty-one, at $909,166, and currently a non-roster contract',
          'NHL.com projects him onto the third pair with Nick Seeler; camp decides it',
        ],
      },
      {
        pos: 'LD/RD', before: null, after: 'Simon Benoit', status: 'added',
        notes: [
          'Arrived Jun. 16 in the Woll trade at $1.35M',
          '194 hits and 114 blocked shots in 73 games last season',
        ],
      },
      {
        pos: 'D', before: 'Emil Andrae', after: null, status: 'departed',
        notes: ['Traded to Toronto on Jun. 16 in the Woll deal'],
      },
      {
        pos: 'D', before: 'Noah Juulsen', after: null, status: 'departed',
        notes: ['Signed a two-year contract with Colorado on Jul. 1'],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'The crease was rebuilt in one June trade: Ersson out, Woll in behind Vladar',
    rows: [
      {
        pos: 'G', before: 'Dan Vladar', after: 'Dan Vladar', status: 'retained',
        notes: [
          '$3.35M this season, rising to $5.5M through 2032',
          'NHL.com lists him as the projected starter',
        ],
      },
      {
        pos: 'G', before: null, after: 'Joseph Woll', status: 'added',
        notes: [
          'Acquired from Toronto on Jun. 16 with Benoit for Ersson, Andrae and a 2026 third',
          '15-16-7 with a 3.34 GAA and .899 save percentage in 39 games last season',
          '$3.67M through 2028',
        ],
      },
      {
        pos: 'G', before: 'Samuel Ersson', after: null, status: 'departed',
        notes: ['Traded to Toronto on Jun. 16; the move that changed the position'],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'The offer sheet that did not land',
    body: 'Philadelphia tendered Anaheim’s Leo Carlsson a five-year, $90 million offer sheet on Jul. 3 — $18 million a year. Anaheim matched on Jul. 9. The Flyers kept their cap space and their picks, but not the centre they went after, and the rest of the summer reads as the fallback.',
  },
  {
    title: 'They paid their own instead',
    body: 'Trevor Zegras signed for four years at $9.125M on Jul. 15 and Jamie Drysdale for four years at $6.5M on Jul. 17. Two players Philadelphia had previously acquired from Anaheim are now its top-line centre and second-pair right shot.',
  },
  {
    title: 'A new crease in a single trade',
    body: 'Joseph Woll and Simon Benoit came from Toronto on Jun. 16 for Samuel Ersson, Emil Andrae and a 2026 third-round pick. Woll slots behind Dan Vladar, who NHL.com projects as the starter.',
  },
  {
    title: 'Youth is being projected into real jobs',
    body: 'NHL.com’s projected lineup puts 19-year-old Porter Martone on the top line and 21-year-old Oliver Bonk on the third pair, with Matvei Michkov still on his entry-level deal. None of that is announced; all of it is camp’s to settle.',
  },
]

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'Porter Martone', pos: 'RW', note: 'Nineteen, and projected straight onto the top line. A projection, not a decision.' },
  { name: 'Oliver Bonk', pos: 'RD', note: 'On a non-roster contract but projected onto the third pair; camp settles whether he stays up.' },
  { name: 'Alex Bump', pos: 'LW', note: 'Projected on the third line at $972,500; one of several young forwards competing for the spot.' },
  { name: 'Denver Barkey', pos: 'C/LW', note: 'Projected on the fourth line; the roster is full at 23, so someone has to lose out.' },
]

export const unresolved = [
  { status: 'Open', item: 'Owen Tippett’s abdomen', impact: 'Second-line right wing; listed week to week' },
  { status: 'Open', item: 'Noah Cates’ foot', impact: 'Third-line centre; listed week to week' },
  { status: 'Open', item: 'A full 23-man roster', impact: 'The active roster is already at 23/23, so any addition requires a subtraction' },
  { status: 'Open', item: 'Matvei Michkov’s next contract', impact: 'Still at $950K on his entry-level deal, restricted free agent in 2027' },
  { status: 'Open', item: 'Martone and Bonk camp decisions', impact: 'Two projected lineup spots held by players with no NHL job yet' },
  { status: 'Scheduled', item: 'Home opener vs. Pittsburgh', impact: 'Announced Jul. 15; opponent confirmed, lineup not' },
]

// Nothing here yet. The rumour mill only carries claims traced to a named
// reporter or clearly marked as untraceable chatter; no Flyers item has met
// that bar since this brief was written. An empty array renders no section.
export const rumors = []

export const sources = [
  { label: 'Official Flyers news', url: 'https://www.nhl.com/flyers/news/' },
  { label: 'Flyers acquire Woll and Benoit from Toronto', url: 'https://www.nhl.com/flyers/news/flyers-acquire-joseph-woll-and-simon-benoit-from-toronto' },
  { label: 'NHL.com Flyers 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/philadelphia-flyers-roster-changes-for-2026-27-season' },
  { label: 'PuckPedia contracts/cap', url: 'https://puckpedia.com/team/philadelphia-flyers' },
]

export { STATUS, RUMOR_STATUS }

// 2025-26 production, derived from the scraped league file rather than typed
// out by hand. See _derive.js.
export const points = pointsFromLeague(league)

// No contract file: Philadelphia's terms are quoted inline in the roster notes
// from PuckPedia, and there is no cap tab for this club, so there is nothing
// for a contracts map to feed yet.
export const contracts = {}
