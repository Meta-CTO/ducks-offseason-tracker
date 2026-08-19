import { useEditorial } from '../lib/editorial'

export default function BiggestChanges() {
  const { biggestChanges } = useEditorial()
  return (
    <section className="section">
      <h2>The four biggest changes</h2>
      <div className="changes-grid">
        {biggestChanges.map((c, i) => (
          <article className="change-card" key={c.title}>
            <span className="change-number">{String(i + 1).padStart(2, '0')}</span>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
