/**
 * Persistent header strip: which club you are viewing, and the way back to the
 * picker. Tinted with the club's colors, which alongside the three-letter code
 * is the only identity this project uses — no crests or wordmarks.
 */
export default function TeamBar({ team, onChange }) {
  return (
    <div
      className="team-bar"
      style={{ '--team-primary': team.colors[0], '--team-secondary': team.colors[1] }}
    >
      <div className="team-bar-inner">
        <span className="team-bar-id">
          <span className="team-bar-code">{team.abbrev}</span>
          <span className="team-bar-name">{team.name}</span>
        </span>
        <button type="button" className="team-bar-change" onClick={onChange}>
          Change team
        </button>
      </div>
    </div>
  )
}
