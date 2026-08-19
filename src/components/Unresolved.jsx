import { useEditorial } from '../lib/editorial'
import { isNew } from '../lib/updates'

export default function Unresolved() {
  const { unresolved } = useEditorial()
  return (
    <section className="section">
      <h2>Still unresolved</h2>
      <p className="section-caveat">
        Recheck after training camp and again immediately before opening night.
      </p>
      <div className="unresolved-list">
        {unresolved.map((u) => (
          <div className="unresolved-item" key={u.item}>
            <span className={`badge ${u.status === 'Open' ? 'badge-unsigned' : 'badge-camp'}`}>
              {u.status}
            </span>
            <div>
              <p className="unresolved-title">{u.item}</p>
              <p className="unresolved-impact">
                {isNew(u.impact) && <span className="badge badge-new">New</span>}
                {u.impact}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
