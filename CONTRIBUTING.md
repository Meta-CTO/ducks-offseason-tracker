# Contributing

Thanks for taking a look. This is a small, single-purpose fan project, so the
bar for contributing is low and the scope is narrow.

## Getting set up

```sh
npm install
npm run dev      # http://localhost:5183
```

You need Node 18+ (the scripts use the built-in `fetch`).

## The two rules that actually matter

**1. No NHL or Ducks imagery, ever.** No league logos, team marks, or
NHL/NHLI photography, not even temporarily and not even hotlinked. Every photo
here comes from Wikimedia Commons under a free license, with attribution
recorded in `src/data/photo-credits.json` and rendered on the page. If you add
a photo, it must be CC0, public domain, CC BY, or CC BY-SA, and it must go
through `scripts/fetch-commons-photos.mjs` so the license metadata is captured
automatically. People without a freely-licensed photo get an initials avatar,
and that is a perfectly good outcome.

**2. Facts need sources, and projections need labels.** Anything presented as
fact should trace to NHL.com, PuckPedia, or Hockey-Reference. Anything not yet
official — a projected lineup, an expected role — must read as a projection.
Do not turn a rumour into a stated fact. When a real transaction happens, the
data changes, not the framing.

## Where things live

| Path | What it is |
|---|---|
| `src/data/ducks.js` | Roster, transactions, notes. Most content edits go here. |
| `src/data/cap.js` | Salary-cap figures. |
| `src/data/contracts.json` | Contract terms per player. |
| `src/data/points.json` | 2025-26 point totals. |
| `src/data/photo-credits.json` | Photo attribution. Generated, do not hand-edit. |
| `src/components/` | One component per page section. |
| `scripts/` | Photo sourcing, face cropping, deploy, metrics. |

## Updating content

Edit the relevant file in `src/data/` and bump `LAST_UPDATED` in
`src/data/ducks.js`. The research brief in the repo root lists what to
re-verify after training camp and before opening night.

## Photos

```sh
npm run photos   # fetch from Commons, then crop to faces
```

Cropping uses Apple's Vision framework via `scripts/detect-faces.swift`, so
that step is macOS-only. A short `MANUAL` table in `scripts/crop-faces.mjs`
handles the shots Vision cannot resolve, mostly goalie masks. Full-size
originals stay in `.photo-originals/` (gitignored) so re-running crops from
pristine sources rather than cropping a crop.

## Before opening a pull request

```sh
npm run lint
npm run build
```

Check the result at a phone width too; the roster and cap layouts change
meaningfully under 680px.

## Deploying

Deployment is specific to this project's AWS account and is not needed for
most contributions. If you are running your own copy, see the deploy section
of the README and `.env.deploy.example`.
