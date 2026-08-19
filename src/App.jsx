import { useCallback, useEffect, useState } from 'react'
import Hero from './components/Hero'
import RosterComparison from './components/RosterComparison'
import Timeline from './components/Timeline'
import BiggestChanges from './components/BiggestChanges'
import CampWatch from './components/CampWatch'
import Unresolved from './components/Unresolved'
import RumorMill from './components/RumorMill'
import Credits from './components/Credits'
import Sources from './components/Sources'
import SiteFooter from './components/SiteFooter'
import TeamPicker from './components/TeamPicker'
import TeamPage from './components/TeamPage'
import TeamBar from './components/TeamBar'
import { resolveTeam, findTeam, saveCookie, pushTeamUrl } from './lib/team'
import { hasEditorial, loadEditorial } from './data/editorial'
import { EditorialContext } from './lib/editorial'

/**
 * The full editorial tracker. Only clubs with a written brief get this, and
 * the brief is a separate chunk fetched on demand — opening one club must not
 * download another club's prose.
 */
function EditorialTeam({ team }) {
  const [content, setContent] = useState(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let live = true
    setContent(null)
    setFailed(false)
    loadEditorial(team.abbrev)
      .then((m) => live && (m ? setContent(m) : setFailed(true)))
      .catch(() => live && setFailed(true))
    return () => {
      live = false
    }
  }, [team.abbrev])

  if (failed) {
    return (
      <main>
        <section className="section">
          <p className="team-empty">
            The {team.name} tracker could not be loaded.
          </p>
        </section>
      </main>
    )
  }
  if (!content) {
    return (
      <main>
        <section className="section">
          <p className="team-empty">Loading the {team.name} tracker…</p>
        </section>
      </main>
    )
  }

  return (
    <EditorialContext.Provider value={content}>
      <Hero />
      <main>
        <RosterComparison />
        <Timeline />
        <BiggestChanges />
        <CampWatch />
        <Unresolved />
        <RumorMill />
        <Credits />
      </main>
      <Sources />
    </EditorialContext.Provider>
  )
}

// Data-only club pages state exactly one source, because that is all they use.
const API_SOURCE = [
  { label: 'NHL API (api-web.nhle.com) — rosters and season statistics', url: 'https://api-web.nhle.com' },
]

export default function App() {
  const [team, setTeam] = useState(() => resolveTeam())
  // Set when the visitor asks to change teams, so the picker can be shown
  // without throwing away the team they are currently on.
  const [picking, setPicking] = useState(false)

  // Back/forward should move between teams rather than leaving the app.
  useEffect(() => {
    const onPop = () => {
      const fromUrl = new URLSearchParams(window.location.search).get('team')
      setTeam(findTeam(fromUrl))
      setPicking(false)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const pick = useCallback((abbrev) => {
    const next = findTeam(abbrev)
    if (!next) return
    saveCookie(next.abbrev)
    pushTeamUrl(next.abbrev)
    setTeam(next)
    setPicking(false)
    window.scrollTo({ top: 0 })
  }, [])

  // Keep the tab title in step with what is actually on screen.
  useEffect(() => {
    document.title = !team
      ? 'NHL Offseason Tracker'
      : hasEditorial(team.abbrev)
        ? `${team.name}: 2026 Offseason Tracker`
        : `${team.name}: Roster & Scoring`
  }, [team])

  const showPicker = picking || !team

  return (
    <div className="page">
      {team && !picking && (
        <TeamBar team={team} onChange={() => setPicking(true)} />
      )}

      {showPicker ? (
        <main>
          <TeamPicker onPick={pick} current={team?.abbrev} />
        </main>
      ) : hasEditorial(team.abbrev) ? (
        <EditorialTeam team={team} />
      ) : (
        <>
          <main>
            <TeamPage team={team} />
          </main>
          <SiteFooter sources={API_SOURCE} />
        </>
      )}

      {showPicker && <SiteFooter />}
    </div>
  )
}
