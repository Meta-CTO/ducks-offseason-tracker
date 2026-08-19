import { useState } from 'react'
import { STATUS } from '../data/status'
import { useEditorial } from '../lib/editorial'
import Avatar from './Avatar'
import { slugify } from '../lib/slugify'
import CapView from './CapView'
import { isNew, countNew, freshRumorsFor, rowFlagCount } from '../lib/updates'

const CAP_TAB = 'Salary Cap'

const statLine = (name, points) => {
  const p = points[slugify(name)]
  if (!p) return null
  return `${p.points} P · ${p.gp} GP`
}

const contractLine = (name, contracts) => {
  const c = contracts[slugify(name)]
  if (!c) return null
  if (c.note) return c.note
  return `${c.aav} thru ${c.thru.replace('-', '–')}${c.team ? ` (${c.team})` : ''}`
}

// 2025–26 NHL points for ordering; players with no NHL season sort last
const rowPoints = (row, points) => points[slugify(row.before ?? row.after)]?.points ?? -1

function PersonCard({ name, pos, hasNewNote, rumors, points, contracts }) {
  const rumorCount = freshRumorsFor(name, rumors).length
  return (
    <div className="person-card">
      <Avatar name={name} size={64} />
      <span className="person-card-body">
        <span className="person-card-name">{name}</span>
        <span className="person-card-pos">{pos}</span>
        {(hasNewNote || rumorCount > 0) && (
          <span className="person-card-flags">
            {hasNewNote && <span className="badge badge-new">New</span>}
            {/* Rumors get their own chip rather than sharing NEW: a roster row
                is sourced content, and an unverified claim must not read as
                one of its facts. The chip jumps to the quarantined section. */}
            {rumorCount > 0 && (
              <a className="badge badge-rumor" href="#rumor-mill">
                {rumorCount === 1 ? 'Rumor' : `${rumorCount} rumors`}
              </a>
            )}
          </span>
        )}
        {statLine(name, points) && (
          <span className="person-card-stats">{statLine(name, points)}</span>
        )}
        {contractLine(name, contracts) && (
          <span className="person-card-contract">{contractLine(name, contracts)}</span>
        )}
      </span>
    </div>
  )
}

export default function RosterComparison() {
  const { rosterComparison, rumors, cap, points = {}, contracts = {} } = useEditorial()
  const [active, setActive] = useState(rosterComparison[0].group)

  // How many badged bullets sit inside each tab, so a reader can see which
  // section changed without opening every one. Computed per render rather than
  // at module scope: the data now varies by club.
  const newPerTab = Object.fromEntries(
    rosterComparison.map((g) => [
      g.group,
      g.rows.reduce((n, r) => n + rowFlagCount(r, rumors), 0),
    ]),
  )
  const group = rosterComparison.find((g) => g.group === active)
  const rows = !group
    ? []
    : group.group === 'Coaching'
      ? group.rows
      : [...group.rows].sort((a, b) => rowPoints(b, points) - rowPoints(a, points))
  // Only clubs whose module carries cap data get the tab. Rendering it
  // unconditionally would have shown Anaheim's cap table on another club's page.
  const tabs = [
    ...rosterComparison.map((g) => g.group),
    ...(cap ? [CAP_TAB] : []),
  ]

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
            {newPerTab[tab] > 0 && (
              <span
                className="toggle-count"
                aria-label={`${newPerTab[tab]} new item or rumor${newPerTab[tab] === 1 ? '' : 's'}`}
              >
                {newPerTab[tab]}
              </span>
            )}
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
                <PersonCard
                  name={name}
                  pos={row.pos}
                  hasNewNote={countNew(row.notes) > 0}
                  rumors={rumors}
                  points={points}
                  contracts={contracts}
                />
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
