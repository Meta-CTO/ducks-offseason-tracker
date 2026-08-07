// 2026–27 cap data per PuckPedia, retrieved Aug 7, 2026.
// Cap-counting active roster only (22/23 slots). Gauthier is an unsigned RFA
// and carries no cap hit yet; non-roster/AHL contracts are excluded.

export const capSummary = {
  ceiling: 104_000_000,
  capHit: 94_926_605,
  space: 9_073_395,
  rosterSlots: '22 / 23',
  potentialBonuses: 3_450_000,
  asOf: 'Aug. 7, 2026',
}

export const capGroups = [
  { key: 'F', label: 'Forwards', color: 'var(--cap-forwards)', total: 62_661_605 },
  { key: 'D', label: 'Defense', color: 'var(--cap-defense)', total: 22_465_000 },
  { key: 'G', label: 'Goaltending', color: 'var(--cap-goalies)', total: 9_800_000 },
]

export const capHits = [
  { name: 'Leo Carlsson', group: 'F', hit: 18_000_000 },
  // Unsigned RFA: no cap hit yet. The band shows the full projected cap
  // space as the room available for his next deal.
  { name: 'Cutter Gauthier', group: 'F', hit: 9_073_395, projected: true },
  { name: 'Mikael Granlund', group: 'F', hit: 7_000_000 },
  { name: 'Troy Terry', group: 'F', hit: 7_000_000 },
  { name: 'Chris Kreider', group: 'F', hit: 6_500_000 },
  { name: 'Alex Killorn', group: 'F', hit: 6_250_000 },
  { name: 'Frank Vatrano', group: 'F', hit: 4_571_189 },
  { name: 'A.J. Greer', group: 'F', hit: 4_250_000 },
  { name: 'Ryan Poehling', group: 'F', hit: 3_750_000 },
  { name: 'Jeff Malott', group: 'F', hit: 1_850_000 },
  { name: 'Beckett Sennecke', group: 'F', hit: 953_750 },
  { name: 'Nathan Gaucher', group: 'F', hit: 886_666 },
  { name: 'Nikita Nesterenko', group: 'F', hit: 837_500 },
  { name: 'Washe', group: 'F', hit: 812_500 },
  { name: 'Jackson LaCombe', group: 'D', hit: 9_000_000 },
  { name: 'Pavel Mintyukov', group: 'D', hit: 7_200_000 },
  { name: 'Nick Jensen', group: 'D', hit: 2_250_000 },
  { name: 'Ian Moore', group: 'D', hit: 1_150_000 },
  { name: 'Drew Helleson', group: 'D', hit: 1_100_000 },
  { name: 'Tyson Hinds', group: 'D', hit: 900_000 },
  { name: 'Tristan Luneau', group: 'D', hit: 865_000 },
  { name: 'Lukas Dostal', group: 'G', hit: 6_500_000 },
  { name: 'Ville Husso', group: 'G', hit: 2_200_000 },
  { name: 'Laurent Brossoit', group: 'G', hit: 1_100_000 },
]

export const fmtM = (n) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 1 : 2)}M`
    : `$${Math.round(n / 1000)}K`

export const pctOfCap = (n) => `${((n / capSummary.ceiling) * 100).toFixed(1)}%`
