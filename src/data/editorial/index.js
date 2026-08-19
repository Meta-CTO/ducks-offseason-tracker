/**
 * Registry of clubs that have a written research brief, and therefore the full
 * editorial tracker rather than the data-only page.
 *
 * Each entry is a dynamic import so a club's editorial content is its own
 * chunk — opening Anaheim must not download Philadelphia's prose. Adding a
 * club means writing its brief, adding its module here, and nothing else:
 * `hasEditorial()` and the picker's "Full tracker" flag both read this map.
 */
export const EDITORIAL = {
  ANA: () => import('./ANA.js'),
  CGY: () => import('./CGY.js'),
  EDM: () => import('./EDM.js'),
  LAK: () => import('./LAK.js'),
  PHI: () => import('./PHI.js'),
  SEA: () => import('./SEA.js'),
  SJS: () => import('./SJS.js'),
  VAN: () => import('./VAN.js'),
  VGK: () => import('./VGK.js'),
}

export const EDITORIAL_ABBREVS = Object.keys(EDITORIAL)

export const hasEditorial = (abbrev) => Object.hasOwn(EDITORIAL, abbrev)

export const loadEditorial = async (abbrev) => {
  const importer = EDITORIAL[abbrev]
  if (!importer) return null
  return await importer()
}
