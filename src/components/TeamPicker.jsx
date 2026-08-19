import { groupedTeams, TEAMS } from '../lib/team'

/**
 * The landing page. Its job is to answer "whose team is this about?" before
 * anything else, so it leads with the question rather than a control label.
 *
 * Identity is carried by club colors and the three-letter code only — no
 * crests, wordmarks or logos, which this project does not use.
 */
export default function TeamPicker({ onPick, current }) {
  const grouped = groupedTeams()

  return (
    <>
      <header className="hero picker-hero">
        <p className="hero-wordmark">
          <span className="hero-wordmark-team">NHL</span>
          <span className="hero-wordmark-sub">2026 Offseason Tracker</span>
        </p>
        <h1>
          How has your team
          <br />
          changed?
        </h1>
        <p className="hero-deck">
          Every club&rsquo;s summer, from the last game of 2025&ndash;26 to the
          roster projected to open 2026&ndash;27: who left, who arrived, what it
          costs against the cap, and what training camp still has to settle.
          Pick a club to start.
        </p>
      </header>

      <section className="section picker">
        {[...grouped.entries()].map(([conference, divisions]) => (
          <div className="picker-conference" key={conference}>
            <h2 className="picker-conference-name">{conference}</h2>
            {[...divisions.entries()].map(([division, clubs]) => (
              <div className="picker-division" key={division}>
                <p className="picker-division-name">{division}</p>
                <div className="picker-grid">
                  {clubs.map((t) => (
                    <button
                      key={t.abbrev}
                      type="button"
                      className={
                        t.abbrev === current ? 'team-chip team-chip-current' : 'team-chip'
                      }
                      style={{
                        '--team-primary': t.colors[0],
                        '--team-secondary': t.colors[1],
                      }}
                      onClick={() => onPick(t.abbrev)}
                      aria-current={t.abbrev === current ? 'true' : undefined}
                    >
                      <span className="team-chip-code">{t.abbrev}</span>
                      <span className="team-chip-name">{t.common}</span>
                      <span className="team-chip-record">
                        {t.record.wins}&ndash;{t.record.losses}&ndash;
                        {t.record.otLosses}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}

        <p className="picker-footnote">
          All {TEAMS.length} clubs, each with its own transaction ledger, salary
          cap breakdown and unresolved-questions list.
        </p>
      </section>
    </>
  )
}
