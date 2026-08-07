import { LAST_UPDATED } from '../data/ducks'

export default function Hero() {
  return (
    <header className="hero">
      {/* Original text wordmark. The NHL/Ducks logo is a trademark and is
          deliberately not used. Naming the team in text is nominative use. */}
      <p className="hero-wordmark">
        <span className="hero-wordmark-team">Anaheim Ducks</span>
        <span className="hero-wordmark-sub">2026 Offseason Tracker</span>
      </p>
      <p className="hero-badge">As of {LAST_UPDATED} · Pre-camp projection</p>
      <h1>
        The core stayed.
        <br />
        The blue line changed.
      </h1>
      <p className="hero-deck">
        Anaheim&rsquo;s young core broke a seven-year playoff drought and won a
        postseason round. Then the Ducks spent the summer paying Leo Carlsson,
        trading Mason McTavish and Olen Zellweger, and replacing nearly an
        entire defense corps. Here is the team that finished 2025–26, and the
        one projected to open 2026–27.
      </p>
    </header>
  )
}
