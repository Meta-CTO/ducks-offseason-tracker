import Hero from './components/Hero'
import RosterComparison from './components/RosterComparison'
import Timeline from './components/Timeline'
import BiggestChanges from './components/BiggestChanges'
import CampWatch from './components/CampWatch'
import Unresolved from './components/Unresolved'
import RumorMill from './components/RumorMill'
import Credits from './components/Credits'
import Sources from './components/Sources'

export default function App() {
  return (
    <div className="page">
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
    </div>
  )
}
