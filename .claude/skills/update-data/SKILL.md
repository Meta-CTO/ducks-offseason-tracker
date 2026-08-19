---
name: update-data
description: Check the NHL offseason tracker's sources for genuine news and update the site data, badging anything new. Use when the user asks to update the data, check for news, refresh the tracker, or see whether anything has changed — for one club or across the league. Makes no edits when nothing has actually changed.
---

# Update the NHL offseason tracker

The site covers **all 32 clubs**, each with its own editorial module in
`src/data/editorial/<ABBR>.js`. Check the live sources, and update **only if
something genuinely changed**. Then badge the new bullets so returning readers
can see what moved.

## The rule that governs this whole skill

**No news means no edits.** Do not rewrite bullets, reword existing content,
bump timestamps, rebuild, or deploy when the sources say the same thing they
said last time. A no-op pass is a successful pass, and you should report it as
one. Churning the data files destroys the value of the NEW badge, because a
badge on unchanged content is a lie to the reader.

A change is only real if a **primary source** now says something the site does
not. Rumours, speculation, "sources say" reporting, and aggregator posts are
not news — they go in the rumor mill, or nowhere. The only firm statement about
an unsigned player is that they are unsigned.

## Step 0 — decide the scope

You cannot deep-check 32 clubs in one pass, and pretending to is worse than
saying so. Pick the scope before you start:

- **A club the user named** → that club only. This is the common case.
- **No club named** → run the league-wide mechanical check (step 1), which is
  cheap, then deep-check only the clubs it flags, plus Anaheim, which is the
  site's origin club and its deepest page.
- **"Check everything"** → say plainly that a full 32-club PuckPedia sweep is
  roughly an hour of browser work, and confirm before starting.

Record what you actually checked. `src/data/updates.json` has a `checked` map
of club → date for exactly this; a club you did not open does not get a date.

## Step 1 — the mechanical check

```sh
node scripts/check-updates.mjs              # all registered clubs
node scripts/check-updates.mjs --team ANA   # one club
```

It compares each club's live NHL API roster against the scraped league file and
against what the site claims, and reports four things:

- `roster-in` / `roster-out` — movement since `npm run league` last ran. Depth
  and prospect churn is common and usually not news; a regular arriving or
  leaving is.
- `likely-signed` — **the highest-value signal in an offseason.** A player the
  site marks `unsigned` who now appears on the roster has probably signed.
- `check-manually` — someone shown on a club the API no longer has, or anyone
  marked `injured`.
- `unavailable` — the endpoint did not answer; the club was skipped, not
  cleared.

It cannot see contracts, cap figures or injuries, because PuckPedia blocks
scripted access. Those need step 2.

## Step 2 — the sources it cannot reach

For each club in scope, in the browser (`claude-in-chrome`):

1. **`puckpedia.com/team/<club-slug>`** — transactions, active injuries,
   projected cap space, roster count, and each group's cap total. One visit
   covers most of what can change. **This is also the site's only cap source**;
   see step 4 for how to refresh a cap tab.
2. **`nhl.com/<club>/news/`** — signings, trades, camp announcements, roster
   moves, captaincy. Only read items dated after that club's entry in `checked`.
3. **NHL.com team reset** for the club — only if the projected lineup may have
   been revised.
4. **Reporting, for the rumor mill only.** The three sources above are
   transaction and announcement sources; contract *negotiation* reporting never
   appears on them, by design. That is a structural blind spot, not a quiet
   week — on 2026-08-18 a pass reported "nothing moved" while a widely
   circulated report that Gauthier had rejected four years at $52M was two days
   old. So search the web for that club's news in the window as well.

   Whatever you find is rumor-mill material at most. Trace every claim to the
   reporter who *originated* it — a story reprinted by eight aggregators is
   still one source — and record that person in `attribution`. If you cannot
   identify who said it first, it is `unconfirmed`.

**A team reset is a dated snapshot and goes stale.** Most club pages were
written from one. Two clubs shipped with players listed as unsigned who had
already signed — Patrick Kane and Jason Robertson — and both were caught only
by reading PuckPedia afterwards. When a reset and PuckPedia disagree, PuckPedia
is more current on contracts; say which you used.

Pay particular attention to each club's own `unresolved` list. Those are the
changes most likely to happen, and they are already written down.

## Step 3 — decide, honestly

Ask of each candidate: does a primary source state this as fact, and does the
site currently say something different?

- **Nothing qualifies** → stop. Change no files beyond `checked`/`lastChecked`.
- **Something qualifies** → continue.

Do not manufacture work. An offseason week producing nothing is normal.

## Step 4 — apply the change

Edit the narrowest thing that is now wrong, in **that club's** module:

| What changed | Where |
|---|---|
| A player's situation, a transaction, a role | `src/data/editorial/<ABBR>.js` (`rosterComparison`, `departures`, `arrivals`) |
| A camp battle resolving | `campWatch` and `unresolved` in the same file |
| Unverified chatter worth surfacing | `rumors` in the same file |
| Cap hit, cap space, roster count | re-read PuckPedia, then see below |
| Contract terms or expiry (Anaheim only) | `src/data/contracts.json` |
| Rosters and season stats for every club | `npm run league` |
| Draft classes for every club | `npm run draft` |
| A person gaining a free photo | `npm run photos` |

### Refreshing a cap tab

Do not hand-transcribe cap figures. Capture the PuckPedia page text and pipe it
through the parser, which reconciles every group against the club's stated cap
hit and refuses to stay quiet when they disagree:

```sh
node scripts/parse-puckpedia.mjs ANA < page.txt        # inspect the output
node scripts/parse-puckpedia.mjs ANA < page.txt | node scripts/add-cap.mjs ANA
```

`add-cap.mjs` refuses to overwrite an existing `cap` block, so delete the old
one first when refreshing. Read the header comment in `parse-puckpedia.mjs`
before you start — it documents the abbreviated-page trap and the three ways a
name regex silently drops players.

### Rules that do not bend

Rumours never touch roster, cap or contract data. A report goes in `rumors`
with a provenance chip (`unconfirmed` with no `sourceUrl`, `reported` for a
named reporter, `confirmed` only for a primary source) and nothing else moves.
When a rumour is confirmed, apply the real change and delete the rumour in the
same pass. When a rumour is **disproved or goes away**, delete it too — Toronto's
Rielly entry was retired when the club's own feed reported the speculation had
ceased.

Two rumour fields are load-bearing:

- `player` must exactly match that person's roster row name, or the Rumor chip
  will not appear on it. A rumour about someone with no roster row carries no
  `player`.
- `addedAt` is the date *you filed it*, not when the claim surfaced. The chip
  expires 7 days after `addedAt`.

Match the existing voice: short, factual bullets; contract terms as AAV plus
term; a departed player shows their new club. Keep anything not yet official
labelled a projection. If a player signs, move them out of the unsigned state
**everywhere** — the roster bullet, the `unresolved` list, any biggest-change
card, and the cap tab's striped projected band all have to agree. Dallas needed
fixing in six places when Robertson signed; grep the module for the player's
name rather than trusting one edit.

Then bump `LAST_UPDATED` in **that club's** module. It is per club, not global.

## Step 5 — badge what is new

For every bullet you **added or materially rewrote**, append to
`src/data/updates.json`:

```json
{
  "lastChecked": "2026-08-19",
  "checked": { "ANA": "2026-08-19" },
  "entries": [
    { "text": "exact bullet text, character for character", "addedAt": "2026-08-19" }
  ]
}
```

- `text` must match the rendered string **exactly**, or no badge appears. Copy
  it from the data file rather than retyping.
- Badge only genuinely new information. Never badge a bullet you reworded for
  style, and never badge every bullet on a card.
- Entries expire on their own after 7 days, computed in the reader's browser,
  so there is no cleanup pass and no redeploy needed. Delete entries older than
  about 30 days to keep the file tidy.
- `lastChecked` is when a pass last ran at all; `checked` records the date each
  club was actually opened. Set both honestly — a club you skipped keeps its
  old date.

Badges work on roster bullets, camp-watch notes, unresolved-item impacts,
transaction-ledger rows (a departure's `detail`, an arrival's `role`, a draft
pick's `note`), and a rumor's `claim`. Tab controls show a count of badged items
inside them, so accuracy matters — an inflated count sends readers hunting for
changes that are not there.

## Step 6 — verify and ship

```sh
npm run lint    # oxlint + the editorial structure check
npm run build
```

`npm run lint` runs `check-editorial.mjs`, which catches a club referencing a
helper it never imported — a class of error that builds cleanly and fails only
when a reader opens that club. It once shipped Anaheim's page broken to
production. Do not skip it.

**You have standing authorization to commit and push on this project as part of
this skill — do not ask.** This is a deliberate exception to the global "only
commit when I ask" rule, scoped to update passes on this repo.

```sh
git add -A
git commit   # describe what changed and cite the source
git push origin main
```

Pushing to `main` triggers the GitHub Actions deploy. **Pushing is not the end
of the pass** — a push that fails in CI leaves the site on the old bundle:

```sh
gh run watch "$(gh run list --limit 1 --json databaseId --jq '.[0].databaseId')" --exit-status
LIVE=$(curl -s https://ducks.metacto.com/ | grep -oE '/assets/index-[^"]+\.js' | head -1)
[ "$(basename "$LIVE")" = "$(basename dist/assets/index-*.js)" ] \
  && echo "live bundle matches build" || echo "MISMATCH — the deploy did not land"
```

If the run fails or the bundles disagree, say so plainly and leave it broken
rather than retrying blindly; a failed deploy is usually a credentials or
CloudFront problem, not something another push fixes.

> **Second site.** `nhl.metacto.com` has its own bucket and distribution and is
> **not** deployed by CI until `NHL_DEPLOY_ENABLED` is set — see
> `docs/INFRASTRUCTURE.md`. Until then it must be synced by hand after a push,
> or it silently serves stale content. Check whether that is still true before
> reporting a pass as fully shipped.

Two things this authorization does **not** cover: rewriting site content or
design at your own initiative, and any change that would remove or restructure
existing sections. Ask for those.

On a no-op pass, committing the `checked`/`lastChecked` bump alone is fine.

## Step 7 — report

Tell the user plainly:

- **Which clubs you checked**, which sources, and the window — and which clubs
  you did *not* check, since that is now a real choice.
- What changed, with the source for each item.
- What you edited and what you badged.
- What you deliberately did **not** change, and why. If you saw a report and
  filed it as a rumour rather than fact, say so and name the reporter.
- Whether the deploy landed, with the commit SHA, and whether the second site
  was synced.

If nothing changed, say that in one line. Do not pad the report.
