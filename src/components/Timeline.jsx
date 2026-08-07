import { useState } from 'react'
import { departures, arrivals, draftClass } from '../data/ducks'

export default function Timeline() {
  const [tab, setTab] = useState('departures')

  return (
    <section className="section">
      <h2>Transaction ledger · June 25 – July 28</h2>
      <div className="toggle-group" role="tablist">
        {[
          ['departures', 'Departures'],
          ['arrivals', 'Arrivals & retentions'],
          ['draft', '2026 draft class'],
        ].map(([key, label]) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            className={tab === key ? 'toggle active' : 'toggle'}
            onClick={() => setTab(key)}
          >
            {label}
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
                <p className="timeline-detail">{t.detail}</p>
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
                <p className="timeline-detail">{t.role}</p>
              </div>
            </li>
          ))}
        </ol>
      )}

      {tab === 'draft' && (
        <div className="table-scroll">
          <table className="draft-table">
            <thead>
              <tr><th>Rd.</th><th>Pick</th><th>Player</th><th>Pos.</th><th>Outlook</th></tr>
            </thead>
            <tbody>
              {draftClass.map((d) => (
                <tr key={d.pick}>
                  <td>{d.rd}</td>
                  <td>{d.pick}</td>
                  <td>{d.player}</td>
                  <td>{d.pos}</td>
                  <td>{d.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
