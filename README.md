# Anaheim Ducks 2026 Offseason Tracker

[![CI](https://github.com/Meta-CTO/ducks-offseason-tracker/actions/workflows/ci.yml/badge.svg)](https://github.com/Meta-CTO/ducks-offseason-tracker/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Live: [ducks.metacto.com](https://ducks.metacto.com/)**

A single-page app tracking how the Ducks' breakthrough 2025-26 playoff roster
changed over the 2026 offseason: who stayed, who left, what it costs against
the cap, and what is still unresolved heading into training camp.

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

Every "projected" lineup stays labelled as a projection until the Ducks
announce an official opening-night roster.

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

It runs `node scripts/check-updates.mjs` for the mechanically-checkable half
(team changes, stat differences via the NHL API), then checks PuckPedia and
the official Ducks news for contracts, cap figures, injuries and transactions,
which block scripted access and need a browser.

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
work on roster bullets, camp-watch notes, and unresolved-item impact lines.

## Usage metrics

```sh
npm run stats        # last 24h
npm run stats 168    # last 7 days
```

Prints requests, data transferred, page views, unique IPs, top pages, external
referrers, rough geography and device split.

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
