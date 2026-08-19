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

/**
 * A club's draft class from the scraped API file, optionally merged with
 * hand-written outlooks keyed by overall pick.
 *
 * The API supplies who was taken and where they were playing; only a person
 * supplies what it means. Clubs with no written outlook show the factual
 * "drafted from" column and leave Outlook blank, rather than inventing one.
 */
export const draftFromApi = (picks, notes = {}) =>
  picks.map((p) => ({
    rd: p.rd,
    pick: p.pick,
    player: p.player,
    pos: p.pos,
    from: p.from,
    note: notes[p.pick] ?? null,
  }))
