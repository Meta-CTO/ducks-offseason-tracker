import { useEditorial } from '../lib/editorial'

export default function Hero() {
  const { LAST_UPDATED, hero } = useEditorial()

  return (
    <header className="hero">
      {/* Original text wordmark. Club and league logos are trademarks and are
          deliberately not used. Naming the team in text is nominative use. */}
      <p className="hero-wordmark">
        <span className="hero-wordmark-team">{hero.team}</span>
        <span className="hero-wordmark-sub">{hero.subtitle}</span>
      </p>
      <p className="hero-badge">As of {LAST_UPDATED} · {hero.stage}</p>
      <h1>
        {hero.headline.map((line, i) => (
          <span key={line}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
      </h1>
      <p className="hero-deck">{hero.deck}</p>
    </header>
  )
}
