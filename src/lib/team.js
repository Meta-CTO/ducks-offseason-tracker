import teams from '../data/teams.json'

/**
 * Team selection, resolved in this order:
 *
 *   1. `?team=` in the URL, so a shared link always wins and always shows the
 *      team it names, regardless of what the visitor picked before.
 *   2. The saved cookie, so a returning visitor lands on their club.
 *   3. Nothing — the picker is shown.
 *
 * A query parameter is used rather than a path because the site is static:
 * `/boston-bruins` would 404 at CloudFront without a rewrite rule, while
 * `?team=BOS` works on any host. It also keeps `#rumor-mill` free for its
 * actual job of being an anchor.
 */

export const COOKIE = 'nhl_team'
const ONE_YEAR = 60 * 60 * 24 * 365

export const TEAMS = teams

const BY_ABBREV = new Map(teams.map((t) => [t.abbrev, t]))
const BY_SLUG = new Map(teams.map((t) => [t.slug, t]))

/** Accepts an abbreviation ("BOS") or a slug ("boston-bruins"). */
export const findTeam = (key) => {
  if (!key) return null
  const k = String(key).trim()
  return BY_ABBREV.get(k.toUpperCase()) ?? BY_SLUG.get(k.toLowerCase()) ?? null
}

export const teamFromUrl = () => {
  if (typeof window === 'undefined') return null
  return findTeam(new URLSearchParams(window.location.search).get('team'))
}

export const readCookie = () => {
  if (typeof document === 'undefined') return null
  const hit = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${COOKIE}=`))
  return hit ? findTeam(decodeURIComponent(hit.slice(COOKIE.length + 1))) : null
}

/**
 * Remember the pick for a year. This is a strictly-necessary preference
 * cookie: it stores a three-letter team code and nothing else — no identifier,
 * no analytics, nothing that would make the site's "no tracking" claim untrue.
 */
export const saveCookie = (abbrev) => {
  if (typeof document === 'undefined') return
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie =
    `${COOKIE}=${encodeURIComponent(abbrev)}; path=/; max-age=${ONE_YEAR}` +
    `; SameSite=Lax${secure}`
}

export const clearCookie = () => {
  if (typeof document === 'undefined') return
  document.cookie = `${COOKIE}=; path=/; max-age=0; SameSite=Lax`
}

/** The team to render on load, or null to show the picker. */
export const resolveTeam = () => teamFromUrl() ?? readCookie()

/**
 * Point the address bar at a team without a reload, so back/forward work and
 * the URL stays shareable.
 */
export const pushTeamUrl = (abbrev) => {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  if (abbrev) url.searchParams.set('team', abbrev)
  else url.searchParams.delete('team')
  url.hash = ''
  window.history.pushState({ team: abbrev ?? null }, '', url)
}

/** Teams grouped conference -> division, for the picker. */
export const groupedTeams = () => {
  const out = new Map()
  for (const t of teams) {
    if (!out.has(t.conference)) out.set(t.conference, new Map())
    const div = out.get(t.conference)
    if (!div.has(t.division)) div.set(t.division, [])
    div.get(t.division).push(t)
  }
  return out
}

/** Which clubs have a written editorial brief, and so a full tracker page. */
export const EDITORIAL_TEAMS = new Set(['ANA'])
export const hasEditorial = (abbrev) => EDITORIAL_TEAMS.has(abbrev)
