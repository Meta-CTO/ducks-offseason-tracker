/**
 * Footer shown on every page — picker, data-only club, and full tracker alike.
 *
 * The disclaimer is the part that must never be conditional: it has to appear
 * wherever a club is named, so it lives here rather than inside the editorial
 * sources block, which only some clubs have.
 */
export default function SiteFooter({ sources = [], caveat = null, updated = null }) {
  return (
    <footer className="section sources">
      <p className="disclaimer">
        <strong>Unofficial fan project.</strong> This site is not affiliated
        with, authorized by, endorsed by, or in any way connected to the
        National Hockey League, any NHL club, or any of their affiliates. Team
        and league names are used descriptively to identify the subject being
        discussed. No NHL or club logos, marks or photography appear here.
        Nothing on this site is for sale and it carries no advertising.
      </p>

      {sources.length > 0 && (
        <>
          <h2>Sources</h2>
          {caveat && <p className="section-caveat">{caveat}</p>}
          <ul className="sources-list">
            {sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noreferrer">{s.label}</a>
              </li>
            ))}
          </ul>
        </>
      )}

      {updated && <p className="updated-stamp">Last updated: {updated}</p>}
    </footer>
  )
}
