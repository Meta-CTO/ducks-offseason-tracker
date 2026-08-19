import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/CHI.json'
import draft from '../draft/CHI.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// Chicago Blackhawks editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Blackhawks team reset for the 2026-27 season. Cap
// figures have not been read from PuckPedia for this club yet, so there is no
// cap tab. Every "after" lineup is a projection until the club announces a
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
  { date: 'Jun. 23', player: 'Bowen Byram', pos: 'D', deal: 'Trade from Buffalo; six years from 2027-28, signed Jul. 1', role: 'Cost the fourth and 45th picks and Louis Crevier; projected top pair' },
  { date: 'Jun. 23', player: 'Jordan Greenway', pos: 'F', deal: 'Trade from Buffalo', role: 'Came with Byram; projected fourth line' },
  { date: 'Jul. 1', player: 'Ian Cole', pos: 'D', deal: 'One year', role: 'Thirty-seven; from Utah after 23 points in 82 games' },
  { date: 'Jul. 1', player: 'Cole Smith', pos: 'F', deal: 'Three years', role: 'Bottom-six forward; split last season between Nashville and Vegas' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Bedard opens the season injured; Mikheyev and Lafferty out, Greenway and Smith in',
    rows: [
      {
        pos: 'C', before: 'Connor Bedard', after: 'Connor Bedard', status: 'injured',
        notes: [
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
    ],
  },
  {
    group: 'Defense',
    summary: 'The fourth overall pick became Bowen Byram; Ian Cole added as a veteran',
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
  { status: 'Open', item: 'Cap and contract detail', impact: 'Not yet verified against PuckPedia, so this club has no cap tab' },
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

export { STATUS, RUMOR_STATUS }
