import { campWatch, STATUS } from '../data/ducks'
import Avatar from './Avatar'
import { isNew } from '../lib/updates'

export default function CampWatch() {
  return (
    <section className="section">
      <h2>Watch camp</h2>
      <p className="section-caveat">
        These players belong in a camp-battle rail, not the main projected
        lineup, until roster decisions are made.
      </p>
      <div className="camp-rail">
        {campWatch.map((p) => (
          <article className="camp-card" key={p.name}>
            <div className="player-card-head">
              <Avatar name={p.name} size={44} />
              <span className="player-name">{p.name}</span>
              <span className="player-pos">{p.pos}</span>
            </div>
            <p className="player-note">
              {isNew(p.note) && <span className="badge badge-new">New</span>}
              {p.note}
            </p>
            <span className={`badge badge-${STATUS.camp.color}`}>{STATUS.camp.label}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
