import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/VAN.json'
import draft from '../draft/VAN.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// Vancouver Canucks editorial content. Research cutoff: August 19, 2026.
//
// Scope note: Marco Rossi, Liam Ohgren and Zeev Buium appear in the projected
// lineup but not in the ledger below, because they arrived from Minnesota in a
// mid-December in-season trade for Quinn Hughes. This tracker covers the
// offseason, so that deal is carried as context rather than as a summer move.
//
// Primary source: NHL.com's Canucks team reset for the 2026-27 season. Cap
// figures and the active injury table have not been read from PuckPedia for
// this club yet, so there is no cap tab. Every "after" lineup is a projection
// until the club announces a roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'Vancouver Canucks',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['They rebuilt the front office first.', 'The scoring problem remains.'],
  deck:
    'Vancouver finished 25-49-8, last in the Pacific, and scored 210 goals — ' +
    '31st in the league. So the changes started above the roster: a new ' +
    'general manager in May, the Sedins installed as co-presidents of hockey ' +
    'operations, and Manny Malhotra promoted from Abbotsford to head coach. ' +
    'The players who arrived are veterans on short deals. The goals have to ' +
    'come from somewhere else.',
}

export const ledgerRange = 'April 17 – July 1'

export const departures = [
  { date: 'Jun. 29', player: 'Nils Hoglander', pos: 'F', mechanism: 'Trade to Nashville', detail: 'Returned a 2029 third-round pick after 5 points in 38 games.' },
  { date: 'Jul. 1', player: 'Marcus Pettersson', pos: 'D', mechanism: 'Trade to N.Y. Rangers', detail: 'Returned a conditional 2030 first-round pick after 18 points in 82 games.' },
  { date: 'Jul. 1', player: 'Teddy Blueger', pos: 'F', mechanism: 'UFA', detail: 'Signed a two-year contract with Toronto.' },
  { date: 'Offseason', player: 'Evander Kane', pos: 'F', mechanism: 'UFA', detail: 'Unsigned as of this brief, which is the only firm statement about him; 31 points in 71 games last season.' },
  { date: 'May 19', player: 'Adam Foote', pos: 'Head coach', mechanism: 'Fired', detail: 'Dismissed in May; Manny Malhotra hired Jun. 1.' },
  { date: 'Apr. 17', player: 'Patrik Allvin', pos: 'General manager', mechanism: 'Fired', detail: 'Dismissed in April; Ryan Johnson promoted May 14.' },
]

export const arrivals = [
  { date: 'May 14', player: 'Ryan Johnson', pos: 'General manager', deal: 'Promoted', role: 'Nine seasons as Abbotsford GM and two as Vancouver assistant GM' },
  { date: 'May 14', player: 'Henrik and Daniel Sedin', pos: 'Co-presidents, hockey operations', deal: 'Appointed', role: 'Installed above the general manager' },
  { date: 'Jun. 1', player: 'Manny Malhotra', pos: 'Head coach', deal: 'Hired', role: 'Won the Calder Cup with Abbotsford in 2025; played three seasons in Vancouver' },
  { date: 'Jun. 2', player: 'Ilya Safonov', pos: 'F', deal: 'One year, two-way', role: 'From the KHL after 33 points in 68 games' },
  { date: 'Jun. 29', player: 'Brendan Gallagher', pos: 'F', deal: 'Trade from Montreal for future considerations', role: 'Thirty-four; projected fourth line' },
  { date: 'Jul. 1', player: 'Jamie Oleksiak', pos: 'D', deal: 'Two years', role: 'From Seattle; projected second pair' },
  { date: 'Jul. 1', player: 'Luke Schenn', pos: 'D', deal: 'One year, $2.25M', role: 'Third stint in Vancouver; projected third pair' },
  { date: 'Jul. 1', player: 'Paul Cotter', pos: 'F', deal: 'One year', role: 'From New Jersey; projected fourth line' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Blueger and Hoglander out, Kane unsigned; Gallagher, Cotter and Safonov in on short deals',
    rows: [
      {
        pos: 'C', before: 'Elias Pettersson', after: 'Elias Pettersson', status: 'retained',
        notes: [
          'Led the club with 51 points in 74 games, which tied for 123rd in the league',
          'Projected to centre the top line between Jake DeBrusk and Linus Karlsson',
        ],
      },
      {
        pos: 'F', before: 'Evander Kane', after: null, status: 'unsigned',
        notes: [
          'An unsigned unrestricted free agent, which is the only firm fact about his situation',
          '31 points in 71 games last season',
        ],
      },
      {
        pos: 'F', before: 'Teddy Blueger', after: null, status: 'departed',
        notes: ['Signed a two-year contract with Toronto on Jul. 1'],
      },
      {
        pos: 'F', before: 'Nils Hoglander', after: null, status: 'departed',
        notes: ['Traded to Nashville on Jun. 29 for a 2029 third-round pick'],
      },
      {
        pos: 'RW', before: null, after: 'Brendan Gallagher', status: 'added',
        notes: [
          'Acquired from Montreal on Jun. 29 for future considerations',
          'Thirty-four, with 23 points in 77 games; projected fourth line',
        ],
      },
      {
        pos: 'F', before: null, after: 'Paul Cotter', status: 'added',
        notes: ['One year on Jul. 1 after 15 points in 79 games with New Jersey'],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Marcus Pettersson traded to the Rangers; Oleksiak and Schenn signed as veterans',
    rows: [
      {
        pos: 'D', before: 'Marcus Pettersson', after: null, status: 'departed',
        notes: [
          'Traded to the N.Y. Rangers on Jul. 1 for a conditional 2030 first-round pick',
          '18 points in all 82 games',
        ],
      },
      {
        pos: 'D', before: null, after: 'Jamie Oleksiak', status: 'added',
        notes: [
          'Two years on Jul. 1 from Seattle',
          'Projected on the second pair with Tom Willander',
        ],
      },
      {
        pos: 'D', before: null, after: 'Luke Schenn', status: 'added',
        notes: [
          'One year at $2.25M on Jul. 1; a third stint with the club at thirty-six',
        ],
      },
      {
        pos: 'RD', before: 'Filip Hronek', after: 'Filip Hronek', status: 'retained',
        notes: ['Projected on the top pair'],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Unchanged: Demko and Lankinen',
    rows: [
      {
        pos: 'G', before: 'Thatcher Demko', after: 'Thatcher Demko', status: 'retained',
        notes: ['Projected starter'],
      },
      {
        pos: 'G', before: 'Kevin Lankinen', after: 'Kevin Lankinen', status: 'retained',
        notes: ['Projected backup'],
      },
    ],
  },
  {
    group: 'Coaching',
    summary: 'A full front-office turnover: Allvin and Foote out, Johnson, Malhotra and the Sedins in',
    rows: [
      {
        pos: 'Head coach', before: 'Adam Foote', after: 'Manny Malhotra', status: 'added',
        notes: [
          'Foote was fired May 19; Malhotra hired Jun. 1',
          'Malhotra coached Abbotsford for two seasons and won the Calder Cup in 2025',
        ],
      },
      {
        pos: 'General manager', before: 'Patrik Allvin', after: 'Ryan Johnson', status: 'added',
        notes: [
          'Allvin was fired Apr. 17; Johnson promoted May 14 after nine seasons as Abbotsford GM',
        ],
      },
      {
        pos: 'Hockey operations', before: null, after: 'Henrik and Daniel Sedin', status: 'added',
        notes: ['Named co-presidents of hockey operations on May 14'],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'The change started above the roster',
    body: 'Patrik Allvin was fired in April, Adam Foote in May. Ryan Johnson was promoted to general manager, the Sedin twins were installed as co-presidents of hockey operations, and Manny Malhotra came up from Abbotsford with a Calder Cup.',
  },
  {
    title: 'A scoring problem the signings do not obviously fix',
    body: 'Vancouver scored 210 goals, 31st in the league, and Elias Pettersson’s team-leading 51 points tied for 123rd. The forwards added since are Gallagher, Cotter and Safonov, all on one-year terms.',
  },
  {
    title: 'Quinn Hughes was traded in December, not this summer',
    body: 'The captain went to Minnesota mid-season for Marco Rossi, Liam Ohgren, Zeev Buium and a 2026 first-round pick. It is the reason the projected lineup looks so different and it sits outside the offseason window this page covers, so it appears here as context rather than in the ledger.',
  },
  {
    title: 'A first-round pick for Marcus Pettersson',
    body: 'The defenseman went to the Rangers on Jul. 1 for a conditional 2030 first, and Jamie Oleksiak and Luke Schenn were signed to replace the minutes.',
  },
]

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'Tom Willander', pos: 'D', note: 'Projected onto the second pair with Oleksiak.' },
  { name: 'Jonathan Lekkerimaki', pos: 'RW', note: 'Projected on the third line; one of the few internal answers to the scoring problem.' },
  { name: 'Ilya Safonov', pos: 'F', note: 'On a one-year two-way deal from the KHL, so camp decides whether he is in Vancouver or Abbotsford.' },
]

export const unresolved = [
  { status: 'Open', item: 'Where the goals come from', impact: '31st in scoring last season; the reset names this as the primary need' },
  { status: 'Open', item: 'Evander Kane', impact: 'Still an unsigned UFA' },
  { status: 'Open', item: 'How Malhotra deploys the young forwards', impact: 'A new coach with no NHL head-coaching record to read' },
  { status: 'Open', item: 'Cap and contract detail', impact: 'Not yet verified against PuckPedia, so this club has no cap tab' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Canucks 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/vancouver-canucks-roster-changes-for-2026-27-season' },
  { label: 'Hughes traded to Wild by Canucks (Dec. 2025)', url: 'https://www.nhl.com/news/quinn-hughes-traded-to-minnesota-wild-by-vancouver-canucks' },
  { label: 'Official Canucks news', url: 'https://www.nhl.com/canucks/news/' },
]

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}

export { STATUS, RUMOR_STATUS }
