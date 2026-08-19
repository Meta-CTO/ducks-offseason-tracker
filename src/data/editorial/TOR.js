import { STATUS, RUMOR_STATUS } from '../status'
import league from '../league/TOR.json'
import { pointsFromLeague } from './_derive'

// Toronto Maple Leafs editorial content. Research cutoff: August 19, 2026.
//
// Primary source: NHL.com's Maple Leafs team reset for the 2026-27 season. Cap
// figures have not been read from PuckPedia for this club yet, so there is no
// cap tab. Every "after" lineup is a projection until the club announces a
// roster.
//
// Sourcing note: NHL.com's Leafs reset describes Jack Roslovic and Colton
// Sissons as arriving by trade, while the Oilers and Golden Knights resets
// describe both as free-agent signings with Toronto. Two pages of the same
// publication disagree, so the ledger below states that they joined and names
// the disagreement rather than picking a side.

export const LAST_UPDATED = 'August 19, 2026'

export const hero = {
  team: 'Toronto Maple Leafs',
  subtitle: '2026 Offseason Tracker',
  stage: 'Pre-camp projection',
  headline: ['New GM, new coach, new goalie.', 'And the first overall pick.'],
  deck:
    'John Chayka replaced Brad Treliving in May, Jim Hiller replaced the fired ' +
    'Craig Berube in June, and Sergei Bobrovsky arrived from Florida with two ' +
    'Stanley Cups. Toronto also drafted Gavin McKenna first overall and signed ' +
    'Darren Raddysh to eight years. Almost every part of the organisation ' +
    'changed except the top of the forward group.',
}

export const ledgerRange = 'May 3 – July 14'

export const departures = [
  { date: 'May 13', player: 'Craig Berube', pos: 'Head coach', mechanism: 'Fired', detail: 'Dismissed after two seasons and an 84-62-18 record.' },
  { date: 'Jun. 16', player: 'Joseph Woll', pos: 'G', mechanism: 'Trade to Philadelphia', detail: 'Sent with Simon Benoit for Samuel Ersson, Emil Andrae and a 2026 third-round pick.' },
  { date: 'Jun. 16', player: 'Simon Benoit', pos: 'D', mechanism: 'Trade to Philadelphia', detail: 'Included in the Woll deal after 6 assists in 73 games.' },
  { date: 'Jun. 26', player: 'Samuel Ersson', pos: 'G', mechanism: 'Trade to Ottawa', detail: 'Acquired from Philadelphia ten days earlier, then flipped for a 2027 fifth-round pick.' },
  { date: 'Jun. 27', player: 'Brandon Carlo', pos: 'D', mechanism: 'Trade to St. Louis', detail: 'Returned two 2026 third-round picks.' },
  { date: 'Jul. 1', player: 'Matias Maccelli', pos: 'F', mechanism: 'No qualifying offer', detail: 'Signed a two-year contract with the N.Y. Islanders after 39 points in 71 games.' },
  { date: 'Jul. 1', player: 'Dennis Hildeby', pos: 'G', mechanism: 'Trade to Tampa Bay', detail: 'Sent with two picks for Nick Paul.' },
  { date: 'Jul. 14', player: 'Nicholas Robertson', pos: 'F', mechanism: 'UFA', detail: 'Signed a two-year contract with Pittsburgh after 32 points in 78 games.' },
  { date: 'Offseason', player: 'Calle Jarnkrok', pos: 'C', mechanism: 'UFA', detail: 'Unsigned as of this brief; 8 points in 56 games.' },
]

export const arrivals = [
  { date: 'May 3', player: 'John Chayka', pos: 'General manager', deal: 'Hired', role: 'Replaces Brad Treliving; ran Arizona from 2016 to 2020' },
  { date: 'Jun. 16', player: 'Emil Andrae', pos: 'D', deal: 'Trade from Philadelphia', role: 'Arrived with Samuel Ersson and a 2026 third in the Woll deal; projected third pair' },
  { date: 'Jun. 17', player: 'Jim Hiller', pos: 'Head coach', deal: 'Hired', role: 'Replaces Craig Berube; coached Los Angeles from 2023 to 2026' },
  { date: 'Jun. 19', player: 'Darren Raddysh', pos: 'D', deal: 'Eight years, sign-and-trade from Tampa Bay', role: 'Toronto-area native; led the NHL in 90-mph shot attempts; projected top pair' },
  { date: 'Jun. 26', player: 'Gavin McKenna', pos: 'F', deal: 'Entry-level contract; first overall pick', role: 'Eighteen; 51 points in 31 games at Penn State; projected second line' },
  { date: 'Jul. 1', player: 'Sergei Bobrovsky', pos: 'G', deal: 'Three years', role: 'From Florida at thirty-seven with two Stanley Cups; projected starter' },
  { date: 'Jul. 1', player: 'Nick Paul', pos: 'F', deal: 'Trade from Tampa Bay for Dennis Hildeby and two picks', role: 'Projected to centre the third line' },
  { date: 'Jul. 1', player: 'Teddy Blueger', pos: 'C', deal: 'Two years', role: 'From Vancouver; projected fourth line' },
  { date: 'Jul. 1', player: 'Brandon Duhaime', pos: 'RW', deal: 'Three years', role: 'Physicality; over 140 hits a season' },
  { date: 'Jul. 1', player: 'Jack Roslovic', pos: 'F', deal: 'Joined from Edmonton; sources differ on the mechanism', role: 'Projected on the top line; see the sourcing note in this module' },
  { date: 'Jul. 1', player: 'Colton Sissons', pos: 'C', deal: 'Joined from Vegas; sources differ on the mechanism', role: 'Projected to centre the third line' },
  { date: 'Offseason', player: 'Daniel Alfredsson', pos: 'Associate coach', deal: 'Hired', role: 'Joined from Ottawa when his contract there expired' },
]

export const rosterComparison = [
  {
    group: 'Offense',
    summary: 'The top of the lineup is intact; McKenna drafted first overall; Maccelli and Robertson out',
    rows: [
      {
        pos: 'C', before: 'Auston Matthews', after: 'Auston Matthews', status: 'retained',
        notes: ['Projected to centre the top line between Matthew Knies and Jack Roslovic'],
      },
      {
        pos: 'LW', before: null, after: 'Gavin McKenna', status: 'camp',
        notes: [
          'First overall in the 2026 draft, at eighteen, after 51 points in 31 games at Penn State',
          'Projected onto the second line with John Tavares and William Nylander — a projection, not a decision',
        ],
      },
      {
        pos: 'F', before: null, after: 'Nick Paul', status: 'added',
        notes: [
          'Acquired from Tampa Bay on Jul. 1 for Dennis Hildeby and two picks',
          'Projected to centre the third line',
        ],
      },
      {
        pos: 'F', before: 'Matias Maccelli', after: null, status: 'departed',
        notes: ['Not qualified; signed a two-year contract with the N.Y. Islanders after 39 points in 71 games'],
      },
      {
        pos: 'F', before: 'Nicholas Robertson', after: null, status: 'departed',
        notes: ['Signed a two-year contract with Pittsburgh on Jul. 14 after 32 points in 78 games'],
      },
      {
        pos: 'C', before: null, after: 'Teddy Blueger', status: 'added',
        notes: ['Two years on Jul. 1 from Vancouver; projected fourth line'],
      },
    ],
  },
  {
    group: 'Defense',
    summary: 'Raddysh signed for eight years; Carlo and Benoit traded out; the group is still called unfinished',
    rows: [
      {
        pos: 'RD', before: null, after: 'Darren Raddysh', status: 'added',
        notes: [
          'Eight years in a sign-and-trade from Tampa Bay on Jun. 19',
          'Career-high 70 points in 73 games; led the NHL in 90-mph shot attempts',
          'Projected on the top pair with Jake McCabe',
        ],
      },
      {
        pos: 'D', before: 'Brandon Carlo', after: null, status: 'departed',
        notes: ['Traded to St. Louis on Jun. 27 for two 2026 third-round picks'],
      },
      {
        pos: 'D', before: 'Simon Benoit', after: null, status: 'departed',
        notes: ['Traded to Philadelphia on Jun. 16 in the Woll deal'],
      },
      {
        pos: 'LD', before: null, after: 'Emil Andrae', status: 'added',
        notes: [
          'Arrived from Philadelphia on Jun. 16; 13 points in 61 games',
          'Projected on the third pair with Oliver Ekman-Larsson',
        ],
      },
      {
        pos: 'LD', before: 'Morgan Rielly', after: 'Morgan Rielly', status: 'retained',
        notes: [
          'Projected on the second pair with Chris Tanev',
          'The reset records that his future is uncertain amid trade rumours',
        ],
      },
    ],
  },
  {
    group: 'Goaltending',
    summary: 'Woll traded, Ersson passed through, Hildeby traded; Bobrovsky signed',
    rows: [
      {
        pos: 'G', before: null, after: 'Sergei Bobrovsky', status: 'added',
        notes: [
          'Three years on Jul. 1 at thirty-seven',
          'Won Stanley Cups with Florida in 2024 and 2025; projected starter',
        ],
      },
      {
        pos: 'G', before: 'Joseph Woll', after: null, status: 'departed',
        notes: ['Traded to Philadelphia on Jun. 16 with Simon Benoit'],
      },
      {
        pos: 'G', before: 'Anthony Stolarz', after: 'Anthony Stolarz', status: 'retained',
        notes: ['Projected backup; was Florida’s backup during their 2023-24 Cup run'],
      },
    ],
  },
  {
    group: 'Coaching',
    summary: 'Treliving and Berube both replaced; Alfredsson joins from Ottawa',
    rows: [
      {
        pos: 'General manager', before: 'Brad Treliving', after: 'John Chayka', status: 'added',
        notes: ['Chayka hired May 3 at thirty-seven; previously ran Arizona from 2016 to 2020'],
      },
      {
        pos: 'Head coach', before: 'Craig Berube', after: 'Jim Hiller', status: 'added',
        notes: [
          'Berube was fired May 13 after two seasons and an 84-62-18 record',
          'Hiller was hired Jun. 17 after coaching Los Angeles and a previous spell as a Toronto assistant',
        ],
      },
      {
        pos: 'Associate coach', before: null, after: 'Daniel Alfredsson', status: 'added',
        notes: ['Joined from Ottawa when his contract there expired'],
      },
    ],
  },
]

export const biggestChanges = [
  {
    title: 'Everything above the players changed',
    body: 'John Chayka replaced Brad Treliving as general manager on May 3, and Jim Hiller replaced the fired Craig Berube on Jun. 17. Daniel Alfredsson arrived from Ottawa as associate coach.',
  },
  {
    title: 'The first overall pick',
    body: 'Gavin McKenna, eighteen, went first in the 2026 draft after 51 points in 31 games at Penn State. NHL.com projects him onto the second line; nothing about that is announced.',
  },
  {
    title: 'A championship goaltender for three years',
    body: 'Sergei Bobrovsky signed on Jul. 1 at thirty-seven, having won two Cups in Florida. Toronto traded Joseph Woll to Philadelphia, passed Samuel Ersson through to Ottawa, and sent Dennis Hildeby to Tampa Bay.',
  },
  {
    title: 'Eight years for a defenseman, and still unfinished',
    body: 'Darren Raddysh arrived in a sign-and-trade on eight years. Even so the reset calls the blue line a work in progress, records interest in a Zach Werenski trade, and notes Morgan Rielly’s future is uncertain.',
  },
]

// Not researched from a primary source yet beyond the first overall selection.
export const draftClass = []

export const campWatch = [
  { name: 'Gavin McKenna', pos: 'LW', note: 'Eighteen, first overall, projected onto the second line. Camp decides it.' },
  { name: 'Easton Cowan', pos: 'RW', note: 'Projected onto the third line with Nick Paul.' },
  { name: 'Ben Danford', pos: 'D', note: 'Twenty, aiming for the opening-night roster.' },
  { name: 'Artur Akhtyamov', pos: 'G', note: 'Twenty-four and a recent Calder Cup playoff MVP; expected to start in the AHL.' },
]

export const unresolved = [
  { status: 'Open', item: 'The blue line', impact: 'Called a work in progress despite Raddysh and Andrae; interest in a Werenski trade is on the record' },
  { status: 'Open', item: 'Morgan Rielly’s future', impact: 'The reset records trade rumours around him' },
  { status: 'Open', item: 'Whether McKenna stays at eighteen', impact: 'Projected second-line left wing' },
  { status: 'Open', item: 'How Roslovic and Sissons arrived', impact: 'NHL.com’s own pages disagree on trade versus free-agent signing' },
  { status: 'Open', item: 'Cap and contract detail', impact: 'Not yet verified against PuckPedia, so this club has no cap tab' },
]

export const rumors = [
  {
    date: 'Offseason',
    addedAt: '2026-08-19',
    player: 'Morgan Rielly',
    topic: 'Morgan Rielly’s future',
    claim: 'Rielly is the subject of trade speculation',
    status: 'reported',
    attribution: 'NHL.com’s Maple Leafs team reset',
    sourceUrl: 'https://www.nhl.com/news/topic/team-resets/toronto-maple-leafs-roster-changes-for-2026-27-season',
    detail: 'The reset records that his future is uncertain amid trade rumours, alongside management’s stated interest in acquiring Zach Werenski. No team, terms or timeline has been reported, and Rielly is projected on the second pair.',
  },
]

export const sources = [
  { label: 'NHL.com Maple Leafs 2026–27 team reset', url: 'https://www.nhl.com/news/topic/team-resets/toronto-maple-leafs-roster-changes-for-2026-27-season' },
  { label: 'Official Maple Leafs news', url: 'https://www.nhl.com/mapleleafs/news/' },
]

export const points = pointsFromLeague(league)
export const contracts = {}

export { STATUS, RUMOR_STATUS }
