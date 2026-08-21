// Shared status vocabulary. These labels and colors are the same for every
// club, so they live outside any one club's editorial module.

export const STATUS = {
  retained: { label: 'Retained', color: 'retained' },
  added: { label: 'Added', color: 'added' },
  departed: { label: 'Departed', color: 'departed' },
  unsigned: { label: 'Unsigned / RFA', color: 'unsigned' },
  injured: { label: 'Injured', color: 'injured' },
  camp: { label: 'Camp candidate', color: 'camp' },
  // For staff a club lists for this season where continuity from last season
  // has not been established. `retained` would claim they were here before,
  // which the club sites do not say and Hockey-Reference covers only for the
  // head coach.
  onstaff: { label: 'On staff', color: 'onstaff' },
}

/**
 * Sourcing strength for a rumor-mill entry. This is deliberately about *who
 * said it*, not about how likely it is to be true — we do not handicap
 * outcomes, we label provenance.
 *
 *  confirmed   — a primary source is on the record: the club, the player, or
 *                the agent. An entry that reaches this state has graduated;
 *                move the fact into the roster/cap/contract data and delete
 *                the rumor.
 *  reported    — a named reporter stated specifics, but no primary source has
 *                confirmed it. Recirculation by aggregators does not promote
 *                an entry; only an independent outlet's own reporting does.
 *  unconfirmed — second-hand, anonymous, or untraceable chatter. This is the
 *                default, and the correct label whenever `sourceUrl` is absent.
 */
export const RUMOR_STATUS = {
  confirmed: { label: 'Confirmed', color: 'confirmed' },
  reported: { label: 'Reported', color: 'reported' },
  unconfirmed: { label: 'Unconfirmed', color: 'unconfirmed' },
}

/**
 * Chatter about the open items. Nothing here is a site fact, and nothing here
 * may contradict or silently update the roster, cap or contract data — those
 * files only ever move on a primary source. See CONTRIBUTING.md.
 *
 * Fields: `date` is when the claim surfaced (omit if genuinely unknown rather
 * than guessing); `attribution` is who said it; `sourceUrl` is optional, and
 * its absence is exactly why the Unconfirmed chip exists.
 *
 * `player` must match the name on that person's roster row, which is what puts
 * the Rumor chip there. `addedAt` is when *we filed it*, not when the claim
 * surfaced — the chip self-expires 7 days after it, on the same clock as the
 * NEW badge, so a July claim filed today is still flagged for a week.
 */
