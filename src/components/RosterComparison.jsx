import { useState } from 'react'
import { rosterComparison, STATUS } from '../data/ducks'
import Avatar from './Avatar'
import { slugify } from '../lib/slugify'
import CapView from './CapView'
import points from '../data/points.json'
import contracts from '../data/contracts.json'
import { isNew } from '../lib/updates'

const CAP_TAB = 'Salary Cap'

const statLine = (name) => {
  const p = points[slugify(name)]
  if (!p) return null
  return `${p.points} P · ${p.gp} GP`
}

const contractLine = (name) => {
  const c = contracts[slugify(name)]
  if (!c) return null
  if (c.note) return c.note
  return `${c.aav} thru ${c.thru.replace('-', '–')}${c.team ? ` (${c.team})` : ''}`
}

// 2025–26 NHL points for ordering; players with no NHL season sort last
const rowPoints = (row) => points[slugify(row.before ?? row.after)]?.points ?? -1

function PersonCard({ name, pos }) {
  return (
    <div className="person-card">
      <Avatar name={name} size={64} />
      <span className="person-card-body">
        <span className="person-card-name">{name}</span>
        <span className="person-card-pos">{pos}</span>
        {statLine(name) && <span className="person-card-stats">{statLine(name)}</span>}
        {contractLine(name) && (
          <span className="person-card-contract">{contractLine(name)}</span>
        )}
      </span>
    </div>
  )
}

export default function RosterComparison() {
  const [active, setActive] = useState(rosterComparison[0].group)
  const group = rosterComparison.find((g) => g.group === active)
  const rows = !group
    ? []
    : group.group === 'Coaching'
      ? group.rows
      : [...group.rows].sort((a, b) => rowPoints(b) - rowPoints(a))
  const tabs = [...rosterComparison.map((g) => g.group), CAP_TAB]

  return (
    <section className="section">
      <h2>Roster changes</h2>

      <div className="roster-tabs">
        <div className="toggle-group" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={active === tab}
            className={active === tab ? 'toggle active' : 'toggle'}
            onClick={() => setActive(tab)}
          >
            {tab}
          </button>
        ))}
        </div>
      </div>

      {active === CAP_TAB ? (
        <CapView />
      ) : (
      <div className="roster-table">
        <div className="roster-columns-head">
          <span>Player</span>
          <span className="roster-delta-head">Delta</span>
        </div>

        <div className="roster-group">
          <div className="roster-group-head">
            <p>{group.summary}</p>
          </div>
          {rows.map((row) => {
            const name = row.before ?? row.after
            return (
              <div
                className={`roster-row status-border-${row.status}`}
                key={`${row.pos}-${name}`}
              >
                <PersonCard name={name} pos={row.pos} />
                <div className="roster-delta">
                  <span className={`badge badge-${STATUS[row.status].color}`}>
                    {STATUS[row.status].label}
                  </span>
                  <ul className="roster-notes">
                    {row.notes.map((note) => (
                      <li key={note} className={isNew(note) ? 'note-new' : undefined}>
                        {isNew(note) && <span className="badge badge-new">New</span>}
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      )}

      {active !== CAP_TAB && (
        <div className="legend roster-legend">
          {Object.values(STATUS).map((s) => (
            <span key={s.label} className="legend-item">
              <span className={`legend-dot badge-${s.color}`} /> {s.label}
            </span>
          ))}
        </div>
      )}
    </section>
  )
}
