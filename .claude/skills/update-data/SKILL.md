---
name: update-data
description: Check the Ducks offseason tracker's sources for genuine news and update the site data, badging anything new. Use when the user asks to update the data, check for news, refresh the tracker, or see whether anything has changed. Makes no edits when nothing has actually changed.
---

# Update the Ducks offseason tracker

Check the live sources, and update the site **only if something genuinely
changed**. Then badge the new bullets so returning readers can see what moved.

## The rule that governs this whole skill

**No news means no edits.** Do not rewrite bullets, reword existing content,
bump timestamps, rebuild, or deploy when the sources say the same thing they
said last time. A no-op pass is a successful pass, and you should report it as
one. Churning the data files destroys the value of the NEW badge, because a
badge on unchanged content is a lie to the reader.

A change is only real if a **primary source** now says something the site does
not. Rumours, speculation, "sources say" reporting, and aggregator posts are
not news. The research brief in the repo root is explicit about this: the only
firm statement about an unsigned player is that they are unsigned.

## Step 1 — see what the mechanical check finds

```sh
node scripts/check-updates.mjs
```

This compares the NHL API against the site and reports team changes, stat
differences, and a short list of items to confirm by hand. It prints
`NO CHANGES DETECTED` when the API agrees with the site.

It cannot see contracts, cap figures, or injuries, because PuckPedia blocks
scripted access. Those need step 2.

## Step 2 — check the sources it cannot reach

Read `src/data/updates.json` for `lastChecked` so you know the window you are
looking at. Then use the browser (the `claude-in-chrome` tools) to check:

1. **[PuckPedia Ducks page](https://puckpedia.com/team/anaheim-ducks)** — the
   transactions list, active injuries table, projected cap space, active
   roster count, and each group's cap total. This is the single most
   informative page; one visit covers most of what can change.
2. **[Official Ducks news](https://www.nhl.com/ducks/news/)** — signings,
   trades, camp announcements, roster moves, and the captaincy. Only read
   items dated after `lastChecked`.
3. **[NHL.com team reset](https://www.nhl.com/news/topic/team-resets/anaheim-ducks-roster-changes-for-2026-27-season)**
   — only if the projected lineup itself may have been revised.

Pay particular attention to the open items in the unresolved tracker, since
those are the changes most likely to happen: the Gauthier contract, Terry's
hip, the vacant captaincy, camp results for Luneau / McQueen / Klepov, the
Husso vs Brossoit backup job, and the final 23-man roster.

## Step 3 — decide, honestly

Ask of each candidate change: does a primary source state this as fact, and
does the site currently say something different?

- **Nothing qualifies** → stop. Change no files. Tell the user what you
  checked and that nothing moved. Optionally update only `lastChecked` (see
  below), which is not a content change.
- **Something qualifies** → continue to step 4.

Do not manufacture work. It is completely normal for an offseason week to
produce nothing.

## Step 4 — apply the change

Edit the narrowest thing that is now wrong:

| What changed | File to edit |
|---|---|
| A player's situation, a transaction, a role | `src/data/ducks.js` (`rosterComparison`, `departures`, `arrivals`) |
| Cap hit, cap space, roster count | `src/data/cap.js` |
| Contract terms or expiry | `src/data/contracts.json` |
| Point totals (new season) | `src/data/points.json`, or re-run `node scripts/fetch-points.mjs` |
| A camp battle resolving | `campWatch` and `unresolved` in `src/data/ducks.js` |
| A person gaining a free photo | `npm run photos` |
| Unverified chatter worth surfacing | `rumors` in `src/data/ducks.js` |

Rumours still never touch the roster, cap or contract data. If something is
only a report, it goes in `rumors` with a provenance chip (`unconfirmed` with
no `sourceUrl`, `reported` for a named reporter, `confirmed` only for a primary
source) and nothing else on the site moves. When a rumour is later confirmed,
apply the real change above and delete the rumour entry in the same pass.

Match the existing voice: short, factual bullets; contract terms as AAV plus
term; a departed player shows their new club. Keep anything not yet official
labelled as a projection. If a player signs, move them out of the unsigned
state everywhere — the roster bullet, `contracts.json`, and the cap tab all
have to agree, and the Salary Cap tab has a striped "available" band for
Gauthier specifically that must become a real bar.

Then bump `LAST_UPDATED` in `src/data/ducks.js` to today.

## Step 5 — badge what is new

For every bullet you **added or materially rewrote**, append an entry to
`src/data/updates.json`:

```json
{
  "lastChecked": "2026-08-10",
  "entries": [
    { "text": "exact bullet text, character for character", "addedAt": "2026-08-10" }
  ]
}
```

Rules:

- `text` must match the rendered string **exactly**, or no badge appears.
  Copy it from the data file rather than retyping it.
- `addedAt` is today, in `YYYY-MM-DD`.
- Badge only genuinely new information. Do not badge a bullet you reworded
  for style, and never badge every bullet on a card.
- Leave older entries in place. They expire on their own after 7 days,
  computed in the reader's browser by `src/lib/updates.js`, so no cleanup pass
  and no redeploy is needed to clear them. You may delete entries older than
  about 30 days to keep the file tidy.
- Always set `lastChecked` to today, even on a no-op pass. That is bookkeeping
  about when you looked, not a claim that content changed.

Badges work on roster bullets, camp-watch notes, unresolved-item impacts, and
transaction-ledger rows (a departure's `detail`, an arrival's `role`, a draft
pick's `note`). Tabs automatically show a count of the badged items inside
them, so badging accurately matters — an inflated count sends readers hunting
for changes that are not there.

## Step 6 — verify and ship

```sh
npm run build
```

Check the result renders, confirming a badge appears where you expect.

**You have standing authorization to commit and push on this project as part
of this skill — do not ask.** This is a deliberate exception to the global
"only commit when I ask" rule, scoped to update passes on this repo.

```sh
git add -A
git commit   # describe what changed and cite the source
git push origin main
```

Pushing to `main` triggers the GitHub Actions deploy, which builds, syncs to
S3, invalidates CloudFront, and verifies the live bundle matches the build. So
pushing *is* deploying; there is no separate deploy step to run. `npm run
deploy` exists for deploying by hand and is not needed here.

Two things this authorization does **not** cover, because they are not update
passes: rewriting site content or design at your own initiative, and any
change that would remove or restructure existing sections. Ask for those.

On a no-op pass, committing the `lastChecked` bump alone is fine and correct.

## Step 7 — report

Tell the user plainly:

- Which sources you checked, and the window.
- What changed, with the source for each item.
- What you edited and what you badged.
- What you deliberately did **not** change, and why. If you saw a rumour and
  rejected it, say so — that is useful information.

If nothing changed, say that in one line. Do not pad the report.
