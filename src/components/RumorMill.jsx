import { rumors, RUMOR_STATUS } from '../data/ducks'
import { isNew } from '../lib/updates'

/**
 * Unverified chatter, kept deliberately separate from the sourced sections so
 * a reader can never mistake one for the other. The dashed border and the
 * provenance chip are the whole point: everything above this section is
 * backed by a primary source, and nothing in it is.
 */
export default function RumorMill() {
  if (rumors.length === 0) return null

  return (
    <section className="section" id="rumor-mill">
      <h2>Rumor mill</h2>
      <p className="section-caveat">
        None of this is confirmed, and none of it has moved the roster, cap or
        contract data elsewhere on this page — those only change on a primary
        source. Entries are labelled by who said it, not by how likely they are
        to be true. Worth knowing while you read: an unsigned RFA who has not
        signed by Dec. 1 is ineligible for the rest of the season.
      </p>
      <div className="rumor-list">
        {rumors.map((r) => {
          const status = RUMOR_STATUS[r.status] ?? RUMOR_STATUS.unconfirmed
          return (
            <article className={`rumor-card rumor-${status.color}`} key={r.claim}>
              <div className="rumor-head">
                <span className={`badge badge-${status.color}`}>{status.label}</span>
                {r.date && <span className="rumor-date">{r.date}</span>}
                {r.topic && <span className="rumor-topic">{r.topic}</span>}
              </div>
              <p className="rumor-claim">
                {isNew(r.claim) && <span className="badge badge-new">New</span>}
                {r.claim}
              </p>
              <p className="rumor-detail">{r.detail}</p>
              <p className="rumor-source">
                {r.attribution}
                {r.sourceUrl ? (
                  <>
                    {' · '}
                    <a href={r.sourceUrl} target="_blank" rel="noopener noreferrer">
                      write-up
                    </a>
                  </>
                ) : (
                  <span className="rumor-nosource"> · no linkable source</span>
                )}
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
