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

/** How many bullets are currently badged, for the "what changed" summary. */
export const newCount = () => FRESH.size

export const lastChecked = updates.lastChecked
