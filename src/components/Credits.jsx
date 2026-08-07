import credits from '../data/photo-credits.json'

// CC BY and CC BY-SA require attribution naming the author and license, and
// derivative works (our circular crops) must be marked as modified.
const entries = Object.values(credits).sort((a, b) =>
  a.name.localeCompare(b.name),
)

export default function Credits() {
  return (
    <section className="section credits">
      <h2>Photo credits</h2>
      <p className="section-caveat">
        Every photograph on this page comes from Wikimedia Commons under a free
        license and is reproduced with the attribution that license requires.
        Images are cropped and resized to fit circular avatars; no other
        changes were made. Where no freely-licensed photo exists, the page
        shows initials instead. No NHL, NHLI or Anaheim Ducks photography,
        logos or marks are used.
      </p>
      <ul className="credits-list">
        {entries.map((c) => (
          <li key={c.name}>
            <a href={c.sourceUrl} target="_blank" rel="noreferrer">
              {c.name}
            </a>{' '}
            &middot; {c.author}
            {', '}
            {c.licenseUrl ? (
              <a href={c.licenseUrl} target="_blank" rel="noreferrer">
                {c.license}
              </a>
            ) : (
              c.license
            )}
            , cropped.
          </li>
        ))}
      </ul>
    </section>
  )
}
