import { useEditorial } from '../lib/editorial'

// CC BY and CC BY-SA require attribution naming the author and license, and
// derivative works (our circular crops) must be marked as modified.
//
// Credits belong to the club whose photos are on screen. This used to import
// Anaheim's file directly, which put Ducks players — and the Ducks' name in
// the disclaimer — at the bottom of every other club's page. A club with no
// freely-licensed photos renders nothing here, because it has nothing to
// attribute.
export default function Credits() {
  const { photoCredits } = useEditorial()
  const entries = Object.values(photoCredits ?? {}).sort((a, b) =>
    a.name.localeCompare(b.name),
  )

  if (entries.length === 0) return null

  return (
    <section className="section credits">
      <h2>Photo credits</h2>
      <p className="section-caveat">
        Every photograph on this page comes from Wikimedia Commons under a free
        license and is reproduced with the attribution that license requires.
        Images are cropped and resized to fit circular avatars; no other
        changes were made. Where no freely-licensed photo exists, the page
        shows initials instead. No NHL, NHLI or club photography, logos or
        marks are used.
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
