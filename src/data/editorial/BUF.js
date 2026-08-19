import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/BUF.json'
import draft from '../draft/BUF.json'
import { pointsFromLeague, draftFromApi, creditsFrom } from './_derive'

// Buffalo Sabres editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Sabres team reset for the 2026-27 season. Cap
// figures have not been read from PuckPedia for this club yet, so there is no
// cap tab. Every "after" lineup is a projection until the club announces a
// roster.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'Buffalo Sabres',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['They sold their two best trade chips.', 'They bought defensemen.'],
  deck:
    'Bowen Byram went to Chicago for the fourth overall pick, and Alex Tuch ' +
    'signed an eight-year deal and was immediately traded to Washington. In ' +
    'came Olen Zellweger from Anaheim and Louis Crevier from Chicago — three ' +
    'defensemen acquired in a summer that moved a 33-goal scorer out. The ' +
    'general manager’s framing: not desperate to add anything right now.',
}

export const ledgerRange = 'June 17 – July 7'

export const departures = [
  { date: 'Jun. 17', player: 'Michael Kesselring', pos: 'D', mechanism: 'Trade to San Jose', detail: 'Sent with the 27th pick for the 20th; signed a three-year, $13.5M contract with San Jose on Jun. 29.' },
  { date: 'Jun. 23', player: 'Bowen Byram', pos: 'D', mechanism: 'Trade to Chicago', detail: 'Sent with Jordan Greenway for the fourth and 45th picks and Louis Crevier, after 42 points in 82 games.' },
  { date: 'Jun. 23', player: 'Jordan Greenway', pos: 'F', mechanism: 'Trade to Chicago', detail: 'Included in the Byram deal.' },
  { date: 'Jun. 26', player: 'Alex Tuch', pos: 'F', mechanism: 'Sign-and-trade to Washington', detail: 'Agreed an eight-year contract, then was traded for David Kampf and a 2027 third; 33 goals and 66 points last season.' },
  { date: 'Jul. 1', player: 'Devon Levi', pos: 'G', mechanism: 'Trade to Edmonton', detail: 'Sent with a 2028 seventh for a 2028 third.' },
  { date: 'Jul. 7', player: 'David Kampf', pos: 'F', mechanism: 'Signed in Czechia', detail: 'Acquired in the Tuch trade and immediately signed a three-year deal with HC Litvinov.' },
]

export const arrivals = [
  { date: 'Jun. 23', player: 'Louis Crevier', pos: 'D', deal: 'Trade from Chicago', role: 'Came with the fourth and 45th picks in the Byram deal; 25 points and 95 blocks in 78 games' },
  { date: 'Jun. 26', player: 'Olen Zellweger', pos: 'D', deal: 'Trade from Anaheim; three years, signed Jul. 1', role: 'Cost a 2026 second and prospect Anton Wahlberg; projected third pair' },
  { date: 'Jul. 1', player: 'Conor Sheary', pos: 'F', deal: 'One year', role: 'Returns to Buffalo after 18 points in 62 games with the Rangers' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'Tuch signed and traded on the same day; Sheary returns',
    rows: [
      {
        pos: 'F', before: 'Alex Tuch', after: null, status: 'departed',
        notes: [
          'Agreed an eight-year contract on Jun. 26 and was traded to Washington the same day',
          '33 goals and 66 points; Buffalo received David Kampf and a 2027 third',
        ],
      },
      {
        pos: 'RW', before: 'Tage Thompson', after: 'Tage Thompson', status: 'retained',
        notes: ['Projected on the top line with Zach Benson and Josh Norris'],
      },
      {
        pos: 'F', before: 'Jordan Greenway', after: null, status: 'departed',
        notes: ['Traded to Chicago on Jun. 23 in the Byram deal'],
      },
      {
        pos: 'F', before: null, after: 'Conor Sheary', status: 'added',
        notes: ['One year on Jul. 1 at thirty-four, returning after two seasons in Buffalo from 2018 to 2020'],
      },
      {
        pos: 'C', before: null, after: 'Konsta Helenius', status: 'camp',
        notes: [
          'Twenty, with 63 points in 63 AHL games',
          'Projected to centre the third line, which camp still has to confirm',
        ],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Byram and Kesselring sold; Zellweger and Crevier acquired',
    rows: [
      {
        pos: 'LD', before: 'Bowen Byram', after: null, status: 'departed',
        notes: [
          'Traded to Chicago on Jun. 23 with Greenway for the fourth and 45th picks and Louis Crevier',
          '42 points in 82 games, then 7 more in 13 playoff games',
          'Signed a six-year contract with Chicago on Jul. 1',
        ],
      },
      {
        pos: 'LD', before: null, after: 'Olen Zellweger', status: 'added',
        notes: [
          'Acquired from Anaheim on Jun. 26 for a 2026 second and prospect Anton Wahlberg',
          'Signed for three years on Jul. 1 after 22 points in 76 games',
          'Projected on the third pair with Connor Timmins',
        ],
      },
      {
        pos: 'D', before: null, after: 'Louis Crevier', status: 'added',
        notes: [
          'Arrived from Chicago on Jun. 23 in the Byram trade',
          '25 points and 95 blocked shots in 78 games; projected second pair',
        ],
      },
      {
        pos: 'LD', before: 'Rasmus Dahlin', after: 'Rasmus Dahlin', status: 'retained',
        notes: ['Projected on the top pair with Mattias Samuelsson'],
      },
      {
        pos: 'D', before: 'Michael Kesselring', after: null, status: 'departed',
        notes: ['Traded to San Jose on Jun. 17 in a pick swap'],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Levi traded to Edmonton; Luukkonen and Lyon projected',
    rows: [
      {
        pos: 'G', before: 'Ukko-Pekka Luukkonen', after: 'Ukko-Pekka Luukkonen', status: 'retained',
        notes: ['Projected starter'],
      },
      {
        pos: 'G', before: 'Devon Levi', after: null, status: 'departed',
        notes: ['Traded to Edmonton on Jul. 1 with a 2028 seventh for a 2028 third'],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'The fourth overall pick, then spent',
    body: 'Bowen Byram and Jordan Greenway went to Chicago for the fourth and 45th selections and Louis Crevier. Byram signed for six years in Chicago a week later.',
  },
  {
    title: 'Sign-and-trade: 66 points out the door',
    body: 'Alex Tuch agreed an eight-year contract on Jun. 26 and was traded to Washington the same day for David Kampf and a 2027 third. Kampf never played a game for Buffalo — he signed in Czechia on Jul. 7.',
  },
  {
    title: 'Three defensemen in',
    body: 'Olen Zellweger came from Anaheim for a second-round pick and Anton Wahlberg, Crevier arrived in the Byram deal, and Conor Sheary returned up front. The general manager: “by no means we’re desperate to add anything right now.”',
  },
]

export const draftClass = draftFromApi(draft)

export const campWatch = [
  { name: 'Konsta Helenius', pos: 'C', note: 'Twenty, with 63 points in 63 AHL games, projected to centre the third line.' },
  { name: 'Zach Metsa', pos: 'D', note: 'Twenty-seven and a late bloomer; +16 across 43 NHL games.' },
]

export const unresolved = [
  { status: 'Open', item: 'Replacing Tuch’s 33 goals', impact: 'The scoring left and the returns were a defenseman and picks' },
  { status: 'Open', item: 'The power play', impact: '19.5% last season, 21st in the league' },
  { status: 'Open', item: 'Cap and contract detail', impact: 'Not yet verified against PuckPedia, so this club has no cap tab' },
]

export const rumors = []

export const sources = [
  { label: 'NHL.com Sabres 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/buffalo-sabres-roster-changes-for-2026-27-season' },
  { label: 'Official Sabres news', url: 'https://www.nhl.com/sabres/news/' },
]

export const photoCredits = creditsFrom(rosterComparison, campWatch)
export const points = pointsFromLeague(league)
export const contracts = {}

export { STATUS, RUMOR_STATUS }
