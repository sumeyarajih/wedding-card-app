# The merge, done and verified

This is `card` and `main` combined — your backend integration plus your
teammate's visual redesign, both fully intact. Verified with `tsc
--noEmit`: zero errors.

## How to apply this

Overwrite `app/`, `lib/`, `components/`, `supabase-schema.sql`,
`package.json`, and `pnpm-lock.yaml` in your local project with what's
in this zip. Then:
```
pnpm install
git add -A
git commit -m "merge: combine backend integration with visual redesign"
git push origin card
```
(Or push to `main` directly if that's where you want this to land —
either way, this is the combined, final state.)

## What merged automatically, cleanly (no risk of loss)
- `app/layout.tsx`, `app/globals.css`, `gold-particles.tsx`,
  `splash-screen.tsx` — your teammate's changes here didn't touch the
  same lines as the backend work, so git combined them with no
  intervention needed.
- `countdown.tsx` — this one's worth knowing about specifically: both
  of you edited this file. I changed it to accept real event data as
  props; your teammate added the `CalendarCard` visual above it. Since
  those were different, non-overlapping lines, git combined both
  correctly on its own — the countdown is now both dynamic *and* has
  the calendar card.

## What I resolved by hand
- **`app/page.tsx`** — this one had two genuinely incompatible versions:
  the old fully-hardcoded single invitation (your teammate's starting
  point) vs. the new minimal placeholder (since the real experience now
  lives at `/invite/[code]`). Kept the placeholder — the hardcoded
  version is what this whole project moved away from.
- **`app/photo/page.tsx` and `app/stories/page.tsx`** — I'd already
  moved and rebuilt these as `app/invite/[code]/photo/` and
  `app/invite/[code]/stories/` (so they're guest-aware and read real
  uploads from Supabase instead of `localStorage`). Your teammate had
  separately added a `CoupleSlider` component to the photo page on
  `main`. I ported that into the new dynamic version, so it's not lost
  — check the gallery page, it's there above the photo grid.

## One small cosmetic thing I didn't touch
`app/layout.tsx`'s page title/description ("Kareem & Hana — The
Wedding...") is still static — it shows in the browser tab and search
previews. Making that dynamic per-event needs a different Next.js
pattern (`generateMetadata` at the page level) than what's here now.
Minor, doesn't affect anything guests actually see on the page itself —
just flagging it so it's a known, not a surprise.
