import { slugify } from '../../lib/slugify'

/**
 * Build a club's points map from its scraped league file.
 *
 * Statistics come from the NHL API and are already stored in
 * src/data/league/<ABBR>.json, so a brief should derive them rather than
 * retype them — one source of truth, and no second copy to drift.
 *
 * Skaters only: goalie cards show record and save percentage, not points.
 */
export const pointsFromLeague = (league) =>
  Object.fromEntries(
    [...league.forwards, ...league.defensemen, ...league.goalies]
      .filter((p) => p.stats && p.stats.pos !== 'G')
      .map((p) => [
        slugify(p.name),
        {
          playerId: String(p.id),
          gp: p.stats.gp,
          goals: p.stats.g,
          assists: p.stats.a,
          points: p.stats.p,
        },
      ]),
  )
