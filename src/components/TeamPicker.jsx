import { groupedTeams } from '../lib/team'
import { hasEditorial } from '../data/editorial'

/**
 * The 32-team chooser. Identity is carried by club colors and the three-letter
 * code only — no crests, wordmarks or logos, which this project does not use.
 */
export default function TeamPicker({ onPick, current }) {
  const grouped = groupedTeams()

  return (
    <section className="section picker">
      <h2>Pick your team</h2>
      <p className="section-caveat">
        We&rsquo;ll remember it on this browser and take you straight there next
        time. You can change it any time from the header, and a{' '}
        <code>?team=</code> link always overrides the saved pick.
      </p>

      {[...grouped.entries()].map(([conference, divisions]) => (
        <div className="picker-conference" key={conference}>
          <h3 className="picker-conference-name">{conference}</h3>
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
                    {hasEditorial(t.abbrev) && (
                      <span className="team-chip-flag">Full tracker</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  )
}
