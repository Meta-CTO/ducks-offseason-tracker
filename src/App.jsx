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
import TeamPicker from './components/TeamPicker'
import TeamPage from './components/TeamPage'
import TeamBar from './components/TeamBar'
import {
  resolveTeam,
  findTeam,
  saveCookie,
  pushTeamUrl,
  hasEditorial,
} from './lib/team'

/** The full editorial tracker. Only clubs with a written brief get this. */
function EditorialTeam() {
  return (
    <>
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
    </>
  )
}

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
        <EditorialTeam />
      ) : (
        <main>
          <TeamPage team={team} />
        </main>
      )}

      <Sources />
    </div>
  )
}
