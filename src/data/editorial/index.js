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
  BOS: () => import('./BOS.js'),
  BUF: () => import('./BUF.js'),
  CGY: () => import('./CGY.js'),
  CHI: () => import('./CHI.js'),
  COL: () => import('./COL.js'),
  DAL: () => import('./DAL.js'),
  DET: () => import('./DET.js'),
  EDM: () => import('./EDM.js'),
  FLA: () => import('./FLA.js'),
  LAK: () => import('./LAK.js'),
  MIN: () => import('./MIN.js'),
  MTL: () => import('./MTL.js'),
  NSH: () => import('./NSH.js'),
  OTT: () => import('./OTT.js'),
  PHI: () => import('./PHI.js'),
  SEA: () => import('./SEA.js'),
  SJS: () => import('./SJS.js'),
  STL: () => import('./STL.js'),
  TBL: () => import('./TBL.js'),
  TOR: () => import('./TOR.js'),
  UTA: () => import('./UTA.js'),
  VAN: () => import('./VAN.js'),
  VGK: () => import('./VGK.js'),
  WPG: () => import('./WPG.js'),
}

export const EDITORIAL_ABBREVS = Object.keys(EDITORIAL)

export const hasEditorial = (abbrev) => Object.hasOwn(EDITORIAL, abbrev)

export const loadEditorial = async (abbrev) => {
  const importer = EDITORIAL[abbrev]
  if (!importer) return null
  return await importer()
}
