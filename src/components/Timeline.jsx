import { useState } from 'react'
import { useEditorial } from '../lib/editorial'
import { isNew, countNew } from '../lib/updates'

export default function Timeline() {
  const { departures, arrivals, draftClass, ledgerRange } = useEditorial()
  const [tab, setTab] = useState('departures')

  // A new transaction adds a row here, so these are badgeable too. Computed
  // per render rather than at module scope: the data now varies by club.
  const newCounts = {
    departures: countNew(departures.map((t) => t.detail)),
    arrivals: countNew(arrivals.map((t) => t.role)),
    draft: countNew(draftClass.map((d) => d.note)),
  }

  return (
    <section className="section">
      <h2>Transaction ledger{ledgerRange ? ` · ${ledgerRange}` : ''}</h2>
      <div className="toggle-group" role="tablist">
        {[
          ['departures', 'Departures', departures],
          ['arrivals', 'Arrivals & retentions', arrivals],
          ['draft', '2026 draft class', draftClass],
          // A club whose draft class has not been researched shows no draft
          // tab, rather than an empty panel implying it made no picks.
        ].filter(([, , rows]) => rows.length > 0).map(([key, label]) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            className={tab === key ? 'toggle active' : 'toggle'}
            onClick={() => setTab(key)}
          >
            {label}
            {newCounts[key] > 0 && (
              <span
                className="toggle-count"
                aria-label={`${newCounts[key]} new item${newCounts[key] === 1 ? '' : 's'}`}
              >
                {newCounts[key]}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === 'departures' && (
        <ol className="timeline">
          {departures.map((t) => (
            <li className="timeline-item timeline-out" key={t.player}>
              <span className="timeline-date">{t.date}</span>
              <div>
                <p className="timeline-headline">
                  <strong>{t.player}</strong> <span className="player-pos">{t.pos}</span> &middot; {t.mechanism}
                </p>
                <p className="timeline-detail">
                  {isNew(t.detail) && <span className="badge badge-new">New</span>}
                  {t.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}

      {tab === 'arrivals' && (
        <ol className="timeline">
          {arrivals.map((t) => (
            <li className="timeline-item timeline-in" key={`${t.player}-${t.date}`}>
              <span className="timeline-date">{t.date}</span>
              <div>
                <p className="timeline-headline">
                  <strong>{t.player}</strong> <span className="player-pos">{t.pos}</span> &middot; {t.deal}
                </p>
                <p className="timeline-detail">
                  {isNew(t.role) && <span className="badge badge-new">New</span>}
                  {t.role}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}

      {tab === 'draft' && (
        <div className="table-scroll">
          <table className="draft-table">
            <thead>
              <tr>
                <th>Rd.</th><th>Pick</th><th>Player</th><th>Pos.</th>
                <th>Drafted from</th><th>Outlook</th>
              </tr>
            </thead>
            <tbody>
              {draftClass.map((d) => (
                <tr key={d.pick}>
                  <td>{d.rd}</td>
                  <td>{d.pick}</td>
                  <td>{d.player}</td>
                  <td>{d.pos}</td>
                  {/* Where they were playing, from the API. The Outlook beside
                      it is written analysis, so a club without one stays blank
                      rather than having the two conflated. */}
                  <td className="draft-from">{d.from}</td>
                  <td>
                    {isNew(d.note) && <span className="badge badge-new">New</span>}
                    {d.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
