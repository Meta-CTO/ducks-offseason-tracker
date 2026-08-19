import updates from '../data/updates.json'

// A NEW badge lives for exactly this long after the update pass added it.
// The check runs in the browser at render time, so badges expire on their own
// without needing a redeploy.
export const NEW_WINDOW_DAYS = 7

const MS_PER_DAY = 86_400_000

const freshTexts = () => {
  const now = Date.now()
  const live = new Set()
  for (const entry of updates.entries ?? []) {
    const added = Date.parse(entry.addedAt)
    if (Number.isNaN(added)) continue
    if ((now - added) / MS_PER_DAY < NEW_WINDOW_DAYS) live.add(entry.text)
  }
  return live
}

const FRESH = freshTexts()

/** True when this exact bullet was added by a recent update pass. */
export const isNew = (text) => FRESH.has(text)

/**
 * How many of the given strings are currently badged. Used for the counts on
 * tab controls, so a reader can see which section changed without opening
 * each one. Ignores null/undefined so callers can pass optional fields.
 */
export const countNew = (texts) =>
  texts.reduce((n, t) => (t && FRESH.has(t) ? n + 1 : n), 0)

/** How many bullets are currently badged, for the "what changed" summary. */
export const newCount = () => FRESH.size

export const lastChecked = updates.lastChecked

/**
 * Rumors filed about a player within the NEW window. Keyed on `addedAt` (when
 * the pass filed it) rather than `date` (when the claim surfaced), so an old
 * claim we only just picked up still gets flagged, and every flag expires on
 * the same 7-day clock as the NEW badge without a redeploy.
 */
export const freshRumorsFor = (name, rumors = []) => {
  const now = Date.now()
  return rumors.filter((r) => {
    if (r.player !== name) return false
    const added = Date.parse(r.addedAt)
    if (Number.isNaN(added)) return false
    return (now - added) / MS_PER_DAY < NEW_WINDOW_DAYS
  })
}

/** How many roster-visible flags a player row carries: new bullets + rumors. */
export const rowFlagCount = (row, rumors = []) =>
  countNew(row.notes) + freshRumorsFor(row.before ?? row.after, rumors).length
