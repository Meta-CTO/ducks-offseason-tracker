import { sources, LAST_UPDATED } from '../data/ducks'

export default function Sources() {
  return (
    <footer className="section sources">
      <p className="disclaimer">
        <strong>Unofficial fan project.</strong> This page is not affiliated
        with, authorized by, endorsed by, or in any way connected to the
        Anaheim Ducks, the National Hockey League, or any of their affiliates.
        Team and league names are used descriptively to identify the subject
        being discussed. No NHL or Ducks logos, marks or photography appear
        here. Nothing on this page is for sale and it carries no advertising.
      </p>

      <h2>Sources</h2>
      <p className="section-caveat">
        Statistics, transactions and contract terms are facts compiled from the
        sources below: official Ducks/NHL releases first, then NHL.com
        editorial for lineup projections, PuckPedia (timestamped) for cap and
        contract data, and Hockey-Reference for season totals. Every
        &ldquo;projected&rdquo; lineup remains a projection until the official
        opening-night roster is announced.
      </p>
      <ul className="sources-list">
        {sources.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noreferrer">{s.label}</a>
          </li>
        ))}
      </ul>
      <p className="updated-stamp">Last updated: {LAST_UPDATED}</p>
    </footer>
  )
}
