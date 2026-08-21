import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/CHI.json'
import draft from '../draft/CHI.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// Chicago Blackhawks editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Blackhawks team reset for the 2026-27 season. Cap
// figures read from PuckPedia on Aug. 19, 2026. Every "after" lineup is a projection until the club announces a
// roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'Chicago Blackhawks',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['They bought a defenseman with the fourth pick.', 'Bedard starts hurt.'],
  deck:
    'Chicago sent the fourth overall selection, a second-rounder and Louis ' +
    'Crevier to Buffalo for Bowen Byram, then signed him for six years. It is ' +
    'a rebuilding club spending picks on a 25-year-old — and it does so with ' +
    'Connor Bedard recovering from left shoulder surgery and not expected back ' +
    'until November, which hands real minutes to players who would not ' +
    'otherwise get them.',
}

export const ledgerRange = 'June 23 – July 1'

export const departures = [
  { date: 'Jun. 26', player: 'Andre Burakovsky', pos: 'F', mechanism: 'Trade to Ottawa', detail: 'Returned a 2027 sixth-round pick after 33 points in 75 games. Recorded on the Senators reset rather than the Blackhawks one.' },
  { date: 'Jul. 1', player: 'Ilya Mikheyev', pos: 'F', mechanism: 'UFA', detail: 'Signed a four-year contract with Tampa Bay after 36 points in 77 games.' },
  { date: 'Jul. 1', player: 'Sam Lafferty', pos: 'F', mechanism: 'UFA', detail: 'Signed a one-year two-way contract with Florida after a season spent mostly as a healthy scratch.' },
  { date: 'Offseason', player: 'Matt Grzelcyk', pos: 'D', mechanism: 'UFA', detail: 'Unsigned as of this brief, which is the only firm statement about him; missed the end of last season with an upper-body injury.' },
]

export const arrivals = [
  { date: 'Jul. 18', player: 'Connor Bedard', pos: 'C', deal: 'Five years, $15M AAV', role: 'Re-signed as the franchise centre; recorded on PuckPedia rather than the reset' },
  { date: 'Jul. 23', player: 'Patrick Kane', pos: 'RW', deal: 'Two years, $8M AAV', role: 'Signed at thirty-seven after a season in Detroit; recorded on PuckPedia rather than the reset' },
  { date: 'Jun. 23', player: 'Bowen Byram', pos: 'D', deal: 'Trade from Buffalo; six years from 2027-28, signed Jul. 1', role: 'Cost the fourth and 45th picks and Louis Crevier; projected top pair' },
  { date: 'Jun. 23', player: 'Jordan Greenway', pos: 'F', deal: 'Trade from Buffalo', role: 'Came with Byram; projected fourth line' },
  { date: 'Jul. 1', player: 'Ian Cole', pos: 'D', deal: 'One year', role: 'Thirty-seven; from Utah after 23 points in 82 games' },
  { date: 'Jul. 1', player: 'Cole Smith', pos: 'F', deal: 'Three years', role: 'Bottom-six forward; split last season between Nashville and Vegas' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Bedard opens the season injured; Mikheyev and Lafferty out, Greenway and Smith in — depth rows are from the roster feed and 2025–26 club stats, not individually researched',
    rows: [
      {
        pos: 'C', before: 'Connor Bedard', after: 'Connor Bedard', status: 'injured',
        notes: [
          'Re-signed Jul. 18 for five years at $15M a year — the largest cap hit on the roster',
          'Had left shoulder surgery and is not expected back until November',
          'His absence is why the reset projects Roman Kantserov onto the top line',
        ],
      },
      {
        pos: 'C', before: 'Frank Nazar', after: 'Frank Nazar', status: 'retained',
        notes: ['Projected to centre the top line between Tyler Bertuzzi and Roman Kantserov'],
      },
      {
        pos: 'RW', before: null, after: 'Roman Kantserov', status: 'camp',
        notes: [
          'Twenty-one, and projected onto the top line while Bedard is out',
          'A projection created by an injury rather than an announced job',
        ],
      },
      {
        pos: 'RW', before: null, after: 'Patrick Kane', status: 'added',
        notes: [
          'Signed Jul. 23 for two years at $8M a year, at thirty-seven',
          'Arrives from Detroit, whose reset still listed him as an unsigned free agent',
        ],
      },
      {
        pos: 'F', before: 'Ilya Mikheyev', after: null, status: 'departed',
        notes: ['Signed a four-year contract with Tampa Bay on Jul. 1 after 36 points in 77 games'],
      },
      {
        pos: 'F', before: null, after: 'Jordan Greenway', status: 'added',
        notes: [
          'Arrived Jun. 23 in the Byram trade',
          'Projected on the fourth line with Sacha Boisvert and Cole Smith',
        ],
      },
      {
        pos: 'F', before: null, after: 'Cole Smith', status: 'added',
        notes: ['Three years on Jul. 1 after a season split between Nashville and Vegas'],
      },
      {
        pos: 'L', before: 'Tyler Bertuzzi', after: 'Tyler Bertuzzi', status: 'retained',
        notes: [
          'Played 79 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Sacha Boisvert', after: 'Sacha Boisvert', status: 'retained',
        notes: [
          'Played 7 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Ryan Donato', after: 'Ryan Donato', status: 'retained',
        notes: [
          'Played 82 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Anton Frondell', after: 'Anton Frondell', status: 'retained',
        notes: [
          'Played 12 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Ryan Greene', after: 'Ryan Greene', status: 'retained',
        notes: [
          'Played 81 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'L', before: 'Nick Lardis', after: 'Nick Lardis', status: 'retained',
        notes: [
          'Played 41 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'L', before: 'Andrew Mangiapane', after: 'Andrew Mangiapane', status: 'retained',
        notes: [
          'Played 10 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Oliver Moore', after: 'Oliver Moore', status: 'retained',
        notes: [
          'Played 51 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'L', before: 'Landon Slaggert', after: 'Landon Slaggert', status: 'retained',
        notes: [
          'Played 53 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Teuvo Teravainen', after: 'Teuvo Teravainen', status: 'retained',
        notes: [
          'Played 75 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'C', before: 'Dominic Toninato', after: 'Dominic Toninato', status: 'retained',
        notes: [
          'Played 8 games for the club in 2025–26 and is on the current roster',
        ],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'The fourth overall pick became Bowen Byram; Ian Cole added as a veteran — depth rows are from the roster feed and 2025–26 club stats, not individually researched',
    rows: [
      {
        pos: 'LD', before: null, after: 'Bowen Byram', status: 'added',
        notes: [
          'Acquired from Buffalo on Jun. 23 for the fourth and 45th picks and Louis Crevier',
          'Signed Jul. 1 to six years beginning in 2027-28',
          '42 points in 82 games; projected on the top pair with Alex Vlasic',
        ],
      },
      {
        pos: 'D', before: null, after: 'Ian Cole', status: 'added',
        notes: [
          'One year on Jul. 1 at thirty-seven, after 23 points in 82 games with Utah',
          'Projected on the third pair with Sam Rinzel',
        ],
      },
      {
        pos: 'D', before: 'Matt Grzelcyk', after: null, status: 'unsigned',
        notes: [
          'An unsigned free agent, which is the only firm fact about his situation',
        ],
      },
      {
        pos: 'RD', before: 'Artyom Levshunov', after: 'Artyom Levshunov', status: 'retained',
        notes: ['Projected on the second pair with Wyatt Kaiser'],
      },
      {
        pos: 'D', before: 'Wyatt Kaiser', after: 'Wyatt Kaiser', status: 'retained',
        notes: [
          'Played 77 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'D', before: 'Sam Rinzel', after: 'Sam Rinzel', status: 'retained',
        notes: [
          'Played 54 games for the club in 2025–26 and is on the current roster',
        ],
      },
      {
        pos: 'D', before: 'Alex Vlasic', after: 'Alex Vlasic', status: 'retained',
        notes: [
          'Played 81 games for the club in 2025–26 and is on the current roster',
        ],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Unchanged: Knight and Soderblom',
    rows: [
      {
        pos: 'G', before: 'Spencer Knight', after: 'Spencer Knight', status: 'retained',
        notes: ['Projected starter'],
      },
      {
        pos: 'G', before: 'Arvid Soderblom', after: 'Arvid Soderblom', status: 'retained',
        notes: ['Projected backup'],
      },
    ],
  },
  {
    group: 'Coaching',
    summary: 'Jeff Blashill returns behind the bench',
    rows: [
      {
        pos: 'Head coach', before: 'Jeff Blashill', after: 'Jeff Blashill', status: 'retained',
        notes: [
          'Listed as the club\'s head coach for both 2025–26 and 2026–27',
        ],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'A rebuilding team spent the fourth pick',
    body: 'Bowen Byram cost the fourth and 45th selections plus Louis Crevier, then signed for six years beginning in 2027-28. The general manager called his traits “elite ones” that “demand a significant reward.”',
  },
  {
    title: 'Bedard is not there for the start',
    body: 'Left shoulder surgery keeps Chicago’s franchise centre out until roughly November. The projected lineup already reflects it, with 21-year-old Roman Kantserov on the top line.',
  },
]

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'Roman Kantserov', pos: 'RW', note: 'Twenty-one, projected onto the top line because Bedard is hurt.' },
  { name: 'Sacha Boisvert', pos: 'C', note: 'Twenty; centre depth the injury has opened up.' },
  { name: 'Sam Rinzel', pos: 'RD', note: 'Projected onto the third pair alongside Ian Cole.' },
]

export const unresolved = [
  { status: 'Open', item: 'Connor Bedard’s shoulder', impact: 'Out until roughly November after surgery' },
  { status: 'Open', item: 'Matt Grzelcyk', impact: 'Still an unsigned free agent' },
  { status: 'Open', item: 'Who holds the top line until Bedard returns', impact: 'Kantserov is projected there, not assigned' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Blackhawks 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/chicago-blackhawks-roster-changes-for-2026-27-season' },
  { label: 'NHL.com Senators team reset (Burakovsky trade)', url: 'https://www.nhl.com/news/topic/team-resets/ottawa-senators-roster-changes-for-2026-27-season' },
  { label: 'Official Blackhawks news', url: 'https://www.nhl.com/blackhawks/news/' },
]

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}

// CHI cap data, PuckPedia, retrieved Aug. 19, 2026.
export const cap = {
  capSummary: {
    ceiling: 104_000_000,
    capHit: 101_580_824,
    space: 2_419_176,
    rosterSlots: '22 / 23',
    potentialBonuses: 13_350_000,
    asOf: 'Aug. 19, 2026',
  },
  capGroups: [
    { key: 'F', label: 'Forwards', color: 'var(--cap-forwards)', total: 60_930_825 },
    { key: 'D', label: 'Defense', color: 'var(--cap-defense)', total: 24_716_667 },
    { key: 'G', label: 'Goaltending', color: 'var(--cap-goalies)', total: 8_583_333 },
    { key: 'O', label: 'Retained & buyouts', color: 'var(--cap-other)', total: 7_349_999 },
  ],
  capHits: [
    { name: 'Connor Bedard', group: 'F', hit: 15_000_000 },
    { name: 'Patrick Kane', group: 'F', hit: 8_000_000 },
    { name: 'Frank Nazar', group: 'F', hit: 6_599_991 },
    { name: 'Tyler Bertuzzi', group: 'F', hit: 5_500_000 },
    { name: 'Teuvo Teravainen', group: 'F', hit: 5_400_000 },
    { name: 'Ryan Donato', group: 'F', hit: 4_000_000 },
    { name: 'Jordan Greenway', group: 'F', hit: 4_000_000 },
    { name: 'Andrew Mangiapane', group: 'F', hit: 3_600_000 },
    { name: 'Cole Smith', group: 'F', hit: 3_000_000 },
    { name: 'Roman Kantserov', group: 'F', hit: 1_075_000 },
    { name: 'Anton Frondell', group: 'F', hit: 986_250 },
    { name: 'Sacha Boisvert', group: 'F', hit: 977_917 },
    { name: 'Ryan Greene', group: 'F', hit: 950_000 },
    { name: 'Oliver Moore', group: 'F', hit: 941_667 },
    { name: 'Landon Slaggert', group: 'F', hit: 900_000 },
    { name: 'Ryan Ellis', group: 'D', hit: 6_250_000 },
    { name: 'Bowen Byram', group: 'D', hit: 6_250_000 },
    { name: 'Alex Vlasic', group: 'D', hit: 4_600_000 },
    { name: 'Ian Cole', group: 'D', hit: 4_000_000 },
    { name: 'Wyatt Kaiser', group: 'D', hit: 1_700_000 },
    { name: 'Artyom Levshunov', group: 'D', hit: 975_000 },
    { name: 'Sam Rinzel', group: 'D', hit: 941_667 },
    { name: 'Spencer Knight', group: 'G', hit: 5_833_333 },
    { name: 'Arvid Soderblom', group: 'G', hit: 2_750_000 },
    { name: 'Performance Bonus Cushion', group: 'O', hit: 4_591_666, charge: 'buyout' },
    { name: 'BUYOUT', group: 'O', hit: 258_333, charge: 'buyout' },
    { name: 'RETAINED', group: 'O', hit: 2_500_000, charge: 'retained' },
  ],
}

export { STATUS, RUMOR_STATUS }
