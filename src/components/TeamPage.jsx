import { useEffect, useState } from 'react'
import Avatar from './Avatar'

// Per-team rosters are code-split: each club's JSON becomes its own chunk that
// is only fetched when that club is opened. Importing all 32 eagerly would add
// ~400KB to the initial bundle for data 31/32 of visitors never look at.
const LEAGUE = import.meta.glob('../data/league/*.json')

const loadTeam = async (abbrev) => {
  const key = Object.keys(LEAGUE).find((k) => k.endsWith(`/${abbrev}.json`))
  if (!key) return null
  const mod = await LEAGUE[key]()
  return mod.default ?? mod
}

const ptsLine = (s) => {
  if (!s) return 'No NHL games'
  if (s.pos === 'G') {
    const sv = s.svPct != null ? `.${Math.round(s.svPct * 1000)}` : '—'
    return `${s.w}-${s.l}-${s.otl} · ${sv} SV%`
  }
  return `${s.p} P · ${s.gp} GP`
}

const sortByProduction = (list) =>
  [...list].sort((a, b) => (b.stats?.p ?? -1) - (a.stats?.p ?? -1))

function Group({ title, players }) {
  if (!players.length) return null
  return (
    <div className="team-group">
      <h3 className="team-group-name">
        {title} <span className="team-group-count">{players.length}</span>
      </h3>
      <div className="team-grid">
        {sortByProduction(players).map((p) => (
          <div className="team-player" key={p.id}>
            <Avatar name={p.name} size={44} />
            <span className="team-player-body">
              <span className="team-player-name">
                {p.name}
                {p.number != null && <span className="team-player-num">#{p.number}</span>}
              </span>
              <span className="team-player-meta">
                {p.pos}
                {p.shoots ? ` · ${p.shoots}` : ''}
              </span>
              <span className="team-player-stats">{ptsLine(p.stats)}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * The data-only club page: roster and last season's production straight from
 * the NHL API. Clubs with a written brief render the full editorial tracker
 * instead; this is what every other club shows until its brief exists, and it
 * says so rather than implying the page is complete.
 */
export default function TeamPage({ team }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let live = true
    setData(null)
    setError(false)
    loadTeam(team.abbrev)
      .then((d) => live && (d ? setData(d) : setError(true)))
      .catch(() => live && setError(true))
    return () => {
      live = false
    }
  }, [team.abbrev])

  const { wins, losses, otLosses, points } = team.record

  return (
    <>
      <section className="section">
        <h2>{team.name}</h2>
        <p className="section-caveat">
          {team.division} · {team.conference} · {wins}–{losses}–{otLosses},{' '}
          {points} points in 2025&ndash;26.
        </p>

        <div className="team-notice">
          <p>
            <strong>Roster and scoring only.</strong> The offseason narrative —
            transaction ledger, camp battles, unresolved questions, salary cap —
            is written from a sourced research brief, and {team.name} does not
            have one yet. Rather than generate that from statistics, this page
            shows only what the NHL API actually states.
          </p>
        </div>
      </section>

      <section className="section">
        {error && (
          <p className="team-empty">
            Roster data for {team.abbrev} could not be loaded.
          </p>
        )}
        {!error && !data && <p className="team-empty">Loading roster…</p>}
        {data && (
          <>
            <Group title="Forwards" players={data.forwards} />
            <Group title="Defense" players={data.defensemen} />
            <Group title="Goaltending" players={data.goalies} />
          </>
        )}
      </section>
    </>
  )
}
