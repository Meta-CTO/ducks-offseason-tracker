import { fmtM, pctOfCap } from '../data/cap'
import Avatar from './Avatar'
import { slugify } from '../lib/slugify'
import { useEditorial } from '../lib/editorial'

const expiryLabel = (name, contracts) => {
  const c = contracts[slugify(name)]
  if (!c) return null
  if (c.note) return c.note
  // "thru 2030-31" → seasons remaining counting 2026-27 as year one
  const years = parseInt(c.thru.slice(0, 4), 10) - 2026 + 1
  return `${years} yr${years === 1 ? '' : 's'} left · ${c.expiry}`
}

function StatTile({ label, value, sub }) {
  return (
    <div className="cap-tile">
      <span className="cap-tile-label">{label}</span>
      <span className="cap-tile-value">{value}</span>
      {sub && <span className="cap-tile-sub">{sub}</span>}
    </div>
  )
}

function UtilizationBar() {
  const { cap: { capSummary, capGroups } } = useEditorial()
  const segments = [
    ...capGroups.map((g) => ({
      label: g.label,
      value: g.total,
      color: g.color,
    })),
    { label: 'Cap space', value: capSummary.space, color: 'var(--cap-space)' },
  ]
  return (
    <div className="cap-util">
      <div className="cap-util-bar" role="img" aria-label="2026–27 cap utilization by position group">
        {segments.map((s) => (
          <div
            key={s.label}
            className="cap-util-seg"
            style={{ width: `${(s.value / capSummary.ceiling) * 100}%`, background: s.color }}
            title={`${s.label}: ${fmtM(s.value)} (${pctOfCap(s.value)})`}
          />
        ))}
      </div>
      <div className="legend cap-legend">
        {segments.map((s) => (
          <span key={s.label} className="legend-item">
            <span className="legend-dot" style={{ background: s.color }} />
            {s.label} · {fmtM(s.value)} · {pctOfCap(s.value)}
          </span>
        ))}
      </div>
    </div>
  )
}

function PlayerBars({ group }) {
  const { cap: { capHits }, contracts } = useEditorial()
  const maxHit = Math.max(...capHits.map((p) => p.hit))
  const players = capHits.filter((p) => p.group === group.key)
  return (
    <div className="cap-group">
      <h3 className="cap-group-head">
        <span className="legend-dot" style={{ background: group.color }} />
        {group.label}
        <span className="cap-group-total">
          {fmtM(group.total)} · {pctOfCap(group.total)} of cap
        </span>
      </h3>
      {players.map((p) => (
        <div
          className="cap-row"
          key={p.name}
          title={
            p.projected
              ? `${p.name}: unsigned RFA, up to ${fmtM(p.hit)} of cap space available for his next deal`
              : `${p.name}: ${fmtM(p.hit)} cap hit (${pctOfCap(p.hit)} of the $104M ceiling)`
          }
        >
          <span className="cap-row-name">
            <Avatar name={p.name} size={26} />
            <span className="cap-row-id">
              {p.name}
              {expiryLabel(p.name, contracts) && (
                <span className="cap-row-expiry">{expiryLabel(p.name, contracts)}</span>
              )}
            </span>
          </span>
          <span className="cap-row-track">
            <span
              className={p.projected ? 'cap-row-bar cap-row-bar-projected' : 'cap-row-bar'}
              style={
                p.projected
                  ? { width: `${(p.hit / maxHit) * 100}%` }
                  : { width: `${(p.hit / maxHit) * 100}%`, background: group.color }
              }
            />
          </span>
          <span className="cap-row-value">
            {p.projected ? (
              <>up to {fmtM(p.hit)} <span className="cap-row-pct">available</span></>
            ) : (
              <>{fmtM(p.hit)} <span className="cap-row-pct">{pctOfCap(p.hit)}</span></>
            )}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function CapView() {
  const { cap: { capSummary, capGroups, capHits } } = useEditorial()
  const maxHit = Math.max(...capHits.map((p) => p.hit))
  return (
    <div className="cap-view">
      <div className="cap-tiles">
        <StatTile label="Cap ceiling" value={fmtM(capSummary.ceiling)} sub="2026–27 upper limit" />
        <StatTile label="Projected cap hit" value={fmtM(capSummary.capHit)} sub={`${pctOfCap(capSummary.capHit)} of ceiling`} />
        <StatTile label="Projected space" value={fmtM(capSummary.space)} sub="Before a Gauthier deal" />
        <StatTile label="Active roster" value={capSummary.rosterSlots} sub="Contracts counting" />
      </div>

      <UtilizationBar />

      {capGroups.map((g) => (
        <PlayerBars key={g.key} group={g} />
      ))}

      <p className="cap-footnote">
        Cap figures per PuckPedia as of {capSummary.asOf}; live numbers move
        with every transaction. Cutter Gauthier is an unsigned RFA with no cap
        hit yet; his striped band shows the full {fmtM(capSummary.space)}{' '}
        of projected space available for his next deal, not a signed amount,
        and it is excluded from the group totals. Potential performance bonuses
        total {fmtM(capSummary.potentialBonuses)}. Bars are scaled to the
        largest cap hit (Carlsson, {fmtM(maxHit)}).
      </p>
    </div>
  )
}
