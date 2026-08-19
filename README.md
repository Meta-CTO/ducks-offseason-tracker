# Anaheim Ducks 2026 Offseason Tracker

[![CI](https://github.com/Meta-CTO/ducks-offseason-tracker/actions/workflows/ci.yml/badge.svg)](https://github.com/Meta-CTO/ducks-offseason-tracker/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Live: [ducks.metacto.com](https://ducks.metacto.com/)**

A single-page app tracking how NHL rosters changed over the 2026 offseason.
All 32 clubs are selectable; the Anaheim Ducks carry the full editorial
tracker — who stayed, who left, what it costs against the cap, and what is
still unresolved heading into training camp.

## Teams

Visitors pick a club once and the choice is remembered on that browser in an
`nhl_team` cookie, so a return visit goes straight there. A `?team=BOS` link
always overrides the saved pick, which keeps shared links honest. The site is
static, so team selection is a query parameter rather than a path — a path
would need a CloudFront rewrite to avoid 404s.

Clubs come in two depths:

- **Full tracker** — the editorial page, written from a sourced research brief:
  roster narrative, transaction ledger, camp battles, unresolved tracker, cap
  and rumor mill. Anaheim has one.
- **Roster and scoring** — every other club, generated from the official NHL
  API: roster by position with 2025-26 production. These pages say plainly
  that the narrative is missing rather than inventing one from statistics.

A club is promoted from the second to the first by writing its brief and
adding it to `EDITORIAL_TEAMS` in `src/lib/team.js`.

Refresh league data with `npm run league`, which rebuilds `src/data/teams.json`
and one file per club in `src/data/league/`. The NHL API rate-limits a full
sweep, so requests are serialised and paced; a club whose fetch fails keeps its
existing file rather than being overwritten with nothing. Player headshots are
stripped on the way in — they are league photography, which this project does
not use.

> **Unofficial fan project.** Not affiliated with, authorized by, or endorsed
> by the Anaheim Ducks or the National Hockey League. Contains no NHL or Ducks
> logos, marks, or league photography. Free, no ads, no tracking.

## What's in it

- **Roster changes** by group (offense, defense, goaltending, coaching), each
  person with their 2025-26 points, contract terms, and news bullets
  explaining what changed.
- **Salary cap** utilization for 2026-27, per player, against the $104M
  ceiling, including the space reserved for an unsigned Cutter Gauthier.
- **Transaction ledger** from June 25 to July 28, plus the 2026 draft class.
- **Camp battles** and an **unresolved tracker** for what is still open.
- A **rumor mill** for unverified chatter, quarantined from everything above
  it and chipped by provenance — Unconfirmed, Reported, or Confirmed.

Every "projected" lineup stays labelled as a projection until the Ducks
announce an official opening-night roster. Nothing in the rumor mill feeds the
roster, cap or contract data; those move only on a primary source.

## Stack

React 19 and Vite, with no other runtime dependencies. All content lives in
plain data files under `src/data/`, so updating the site is a data edit rather
than a code change.

## Quick start

```sh
npm install
npm run dev      # http://localhost:5183
```

Requires Node 18+.

```sh
npm run build    # production build to dist/
npm run preview  # serve the build locally
npm run lint
```

## Updating content

Edit the relevant file in `src/data/` and bump `LAST_UPDATED` in
`src/data/ducks.js`:

| File | Contents |
|---|---|
| `ducks.js` | Roster rows, transactions, per-person news bullets |
| `cap.js` | Cap hits and summary figures |
| `contracts.json` | Contract terms per player |
| `points.json` | 2025-26 point totals |
| `photo-credits.json` | Photo attribution (generated) |

The research brief in the repo root lists exactly what to re-verify after
training camp and before opening night.

## Keeping the data current

```
/update-data
```

A Claude Code skill (`.claude/skills/update-data/`) that checks the live
sources, updates the data **only when something genuinely changed**, and
badges the new bullets.

It runs `node scripts/check-updates.mjs` for the mechanically-checkable half —
across all 32 clubs, or one with `--team ABBR`. That compares each club's live
NHL API roster against the scraped league file and against what the site
claims, and its highest-value signal is a player the site marks unsigned who
has appeared on a roster.

Contracts, cap figures and injuries need a browser, because PuckPedia blocks
scripted access. Since a full 32-club sweep is an hour of that, a pass picks a
scope and records it: `src/data/updates.json` carries a `checked` map of club →
date, so a club nobody opened does not get credit for being checked.

The governing rule is that **no news means no edits**. A pass that changes
nothing is a successful pass. Churning the data would make the NEW badge
meaningless.

Bullets added by an update pass get a **NEW** badge recorded in
`src/data/updates.json`:

```json
{ "text": "exact bullet text", "addedAt": "2026-08-10" }
```

The badge expires 7 days after `addedAt`, computed in the reader's browser by
`src/lib/updates.js` — so badges clear themselves without a redeploy. Badges
work on roster bullets, camp-watch notes, unresolved-item impacts, and
transaction-ledger rows.

Tabs carry a count of the badged items inside them, so a reader can see which
section changed without opening each one. The counts disappear along with the
badges they summarise.

## Usage metrics

```
/stats
```

A Claude Code skill (`.claude/skills/stats/`) that runs the rollup and
interprets it. Or run it directly:

```sh
npm run rollup       # last 7 days
npm run rollup 1     # last 24 hours
npm run rollup 30    # last 30 days
npm run stats        # older, simpler variant (hours, not days)
```

The rollup reports page views and unique visitors with a trend against the
previous equal period, a per-day breakdown, top pages, traffic sources,
devices and rough geography.

Two caveats worth remembering. "Page views" counts HTML responses excluding
bots and file requests — because the SPA serves `index.html` for every
unmatched path, a missing `favicon.ico` would otherwise register as a view.
And "unique visitors" is distinct IPs, which undercounts shared networks and
overcounts mobile users whose IP changes.

A CloudWatch dashboard covers the same ground visually: requests over time,
requests per day, bytes out, and error rates.

Two data sources feed this:

| Source | What it gives | Cost |
|---|---|---|
| CloudFront CloudWatch metrics | requests, bytes, error rates; 15-month retention | free |
| CloudFront access logs (v2 delivery to S3) | per-request URI, referrer, user-agent, edge location | ~pennies |

Logs land in the configured logs bucket under
`AWSLogs/<account>/CloudFront/cf/<dist-id>/YYYY/MM/DD/`, auto-expire after 90
days, and appear a few minutes behind real time. Note that log delivery uses
the modern v2 API, so the distribution's legacy `Logging.Enabled` field stays
`false` — that is expected, not a misconfiguration.

A "page view" is counted from the response content-type being HTML rather than
by file extension, since the SPA serves `index.html` for every non-asset path.

## Social preview and icons

`scripts/og-template.html` and `scripts/favicon-template.html` are the sources
for `public/og-image.png` (1200x630) and the favicon set. Regenerate with
headless Chrome:

```sh
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --screenshot=public/og-image.png --window-size=1200,630 \
  "file://$PWD/scripts/og-template.html"
"$CHROME" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --screenshot=public/apple-touch-icon.png --window-size=180,180 \
  "file://$PWD/scripts/favicon-template.html"
cp public/apple-touch-icon.png public/favicon-32.png && sips -Z 32 public/favicon-32.png
cp public/apple-touch-icon.png public/favicon-16.png && sips -Z 16 public/favicon-16.png
```

Both are text/shape only, so the share card and icons carry no photo
attribution obligations. The icon is an original "AD" monogram.

## Photos, licensing and publishing

This page is built to be publishable as an unofficial fan project. **No NHL,
NHLI or Anaheim Ducks photography, logos or marks are used anywhere.** The
hero uses an original text wordmark; naming the team in text is nominative
use, reproducing its logo is not.

Every photo comes from Wikimedia Commons under a free license (CC0, CC BY or
CC BY-SA). `node scripts/fetch-commons-photos.mjs` finds each person's
Wikipedia page, verifies the image license against an allowlist, rejects
anything non-free, and records the author, license and source URL in
`src/data/photo-credits.json`. That file drives both the avatars and the
on-page **Photo credits** section, which renders the attribution those
licenses require (author, license, and a "cropped" note, since the circular
crops are adaptations). 30 of 43 people have a freely-licensed photo; the
rest — mostly depth players and unsigned draftees — show initials avatars.

`node scripts/crop-faces.mjs` crops each photo to a square centred on the
subject's face, because Commons images are action shots rather than
headshots. Face boxes come from Apple's Vision framework via
`scripts/detect-faces.swift`; a short `MANUAL` table in the script covers the
few Vision can't resolve (goalie masks, a visor, and one wide arena shot
where it locks onto a spectator). Full-size originals are kept in
`.photo-originals/` (gitignored, outside `public/`) so re-running crops from
pristine sources rather than cropping a crop.

The footer carries a not-affiliated disclaimer. Statistics, transactions and
contract terms are facts compiled from NHL.com, PuckPedia and
Hockey-Reference, cited in the Sources section; `src/data/points.json` was
pulled from the NHL public API and `src/data/contracts.json` transcribed from
PuckPedia on Aug 7, 2026.

## Updating content

Edit `src/data/ducks.js` and bump `LAST_UPDATED`. The pre-publication
checklist in the research brief lists what to re-verify after training camp
and before opening night (Gauthier contract, Terry health, captaincy, final
roster, backup goalie).

## License

Code is MIT licensed; see [LICENSE](LICENSE).

**The photographs are not.** They come from Wikimedia Commons under CC0,
CC BY, and CC BY-SA licenses and remain under those terms, with per-image
attribution in [CREDITS.md](CREDITS.md) and rendered on the site itself.
Several are ShareAlike, which carries onto the cropped versions. Read
[CREDITS.md](CREDITS.md) before reusing any image.

Statistics and transactions are facts and are not copyrightable; they are
compiled from NHL.com, PuckPedia, and Hockey-Reference, all credited on the
site.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). The two rules that matter: no NHL or
Ducks imagery ever, and facts need sources while projections need labels.
