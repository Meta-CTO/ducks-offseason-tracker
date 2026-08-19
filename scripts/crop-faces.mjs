// Crops each Commons photo to a square centred on the subject's face so it
// reads correctly in the circular avatars.
//
// Face boxes come from Apple's Vision framework via scripts/detect-faces.swift
// (largest face in frame = the subject). MANUAL holds the handful Vision
// misses — a helmet-and-visor closeup it can't resolve, and a wide net shot
// where it locks onto a spectator instead of the goalie.
//
// Re-runnable: crops are applied to a pristine copy in .originals/, so running
// twice never crops a crop.
//
// Usage: node scripts/crop-faces.mjs

import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { mkdir, copyFile, readFile, readdir, access } from 'node:fs/promises'
import path from 'node:path'

const run = promisify(execFile)
const DIR = path.resolve('public/headshots')
// Kept OUTSIDE public/ so full-size originals never ship in the build.
const ORIG = path.resolve('.photo-originals')
const DETECT = path.resolve('scripts/detect-faces.swift')

// slug: [centreX, centreY, side] — fractions of the source image. These are
// the shots Vision can't handle: goalie masks and visors read as helmets
// rather than faces, and in wide arena shots it prefers a clear spectator
// face over the small, partly-obscured subject.
const MANUAL = {
  'alex-killorn': [0.61, 0.21, 0.34], // visor + shadow
  'chris-kreider': [0.27, 0.24, 0.44], // detected box sat too low
  'peter-budaj': [0.61, 0.20, 0.34], // masked goalie
  'petr-mrazek': [0.32, 0.21, 0.30], // masked goalie; Vision found a fan
}

// A Vision face box covers roughly brow-to-chin; widen it for head and
// shoulders, and lift it slightly so hair isn't clipped.
const PAD = 2.4
const LIFT = 0.1

const dims = async (file) => {
  const { stdout } = await run('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', file])
  return {
    w: +stdout.match(/pixelWidth:\s*(\d+)/)[1],
    h: +stdout.match(/pixelHeight:\s*(\d+)/)[1],
  }
}

const credits = JSON.parse(
  await readFile(path.resolve('src/data/photo-credits.json'), 'utf8'),
)
await mkdir(ORIG, { recursive: true })

// Stash pristine copies before any cropping, then always crop from those.
for (const meta of Object.values(credits)) {
  const live = path.join(DIR, meta.file)
  const pristine = path.join(ORIG, meta.file)
  await access(pristine).catch(() => copyFile(live, pristine))
  await copyFile(pristine, live)
}

// Detect faces on the pristine originals.
const originals = (await readdir(ORIG)).filter((f) => /\.(jpe?g|png)$/i.test(f))
const { stdout } = await run(
  'swift',
  [DETECT, ...originals.map((f) => path.join(ORIG, f))],
  { maxBuffer: 1024 * 1024 * 8 },
)

const detected = {}
for (const line of stdout.trim().split('\n')) {
  const [slug, cx, cy, size] = line.split('\t')
  if (cx === 'NONE' || cx === 'ERROR') continue
  detected[slug] = [+cx, +cy, +size]
}

let cropped = 0
for (const [slug, meta] of Object.entries(credits)) {
  const live = path.join(DIR, meta.file)
  const manual = MANUAL[slug]
  const face = detected[slug]

  let cx, cy, side
  if (manual) {
    ;[cx, cy, side] = manual
  } else if (face) {
    const [fx, fy, fsize] = face
    side = Math.min(1, fsize * PAD)
    cx = fx
    cy = fy - side * LIFT
  } else {
    // No face box. Leaving the file alone used to mean shipping the pristine
    // Commons original — several were multi-megabyte images rendered into a
    // 44px circle, and 21 of them accounted for most of public/headshots.
    // A centred square is a worse crop than a detected face but an enormously
    // better asset, so fall back to one rather than skipping.
    cx = 0.5
    cy = 0.4 // faces sit above centre far more often than below
    side = 1
    console.log(`  ~     ${slug} — no face box, centred square fallback`)
  }

  const { w, h } = await dims(live)
  const px = Math.round(side * Math.min(w, h))
  const clamp = (v, max) => Math.max(0, Math.min(Math.round(v), max - px))
  const offX = clamp(cx * w - px / 2, w)
  const offY = clamp(cy * h - px / 2, h)

  await run('sips', ['-c', String(px), String(px),
    '--cropOffset', String(offY), String(offX), live])
  await run('sips', ['-Z', '256', live])
  cropped++
  console.log(`  ok    ${slug}${manual ? ' (manual)' : ''} — ${px}px from ${w}x${h}`)
}

console.log(`\n${cropped}/${Object.keys(credits).length} cropped; originals in ${path.relative(process.cwd(), ORIG)}/`)
