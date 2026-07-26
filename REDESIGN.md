# 💍 Wedding Card App — Redesign Guide

This app is a **reusable wedding invitation card template**. Every couple's card can be fully customised by editing just a few files.

---

## Quick-Start for a New Wedding

### 1. Edit the config file
```
lib/wedding.config.ts
```
This is the **single source of truth**. Change names, dates, venue, schedule, contacts, and story events here. All components read from it automatically.

### 2. Replace the media assets
| File | Purpose |
|------|---------|
| `public/images/hero-gown.png` | Hero / splash curtain image |
| `public/images/riyadh-bg.png` | Blurred desktop background |
| `public/audio/wedding.mp3` | Background music |

### 3. Optional — Change theme colour
In `app/globals.css`, find the `:root` block and adjust `--gold` (oklch value). That single variable controls every accent colour in the UI.

---

## Folder Structure

```
wedding card app/
│
├── app/                         ← Next.js App Router
│   ├── layout.tsx               ← Root layout (fonts, global gold rain, music)
│   ├── page.tsx                 ← Home page (hero → schedule → map → RSVP)
│   ├── photo/page.tsx           ← Guest photo gallery page
│   ├── stories/page.tsx         ← Love story timeline page
│   └── globals.css              ← Design tokens + animation keyframes
│
├── components/wedding/          ← All wedding UI components
│   ├── splash-screen.tsx        ← Glassmorphic curtain + gold rain burst
│   ├── bottom-nav.tsx           ← Responsive nav (bottom mobile / top desktop)
│   ├── hero.tsx                 ← Full-screen hero section
│   ├── invitation-card.tsx      ← Special invitation card text
│   ├── countdown.tsx            ← Live countdown timer
│   ├── calendar-card.tsx        ← Physical gold flip-calendar widget
│   ├── schedule.tsx             ← Event programme
│   ├── rules.tsx                ← Dress code / event rules
│   ├── map-section.tsx          ← Embedded venue map
│   ├── rsvp.tsx                 ← RSVP form + congratulations wall
│   ├── couple-slider.tsx        ← Horizontal groom / bride photo strip
│   ├── gold-particles.tsx       ← Continuous raining gold beads (global)
│   ├── global-effects.tsx       ← Mounts GoldParticles in root layout
│   ├── upload-modal.tsx         ← Camera / gallery photo upload
│   ├── contact-modal.tsx        ← Family coordinator contacts
│   └── reveal.tsx               ← Scroll-reveal fade wrapper
│
├── lib/
│   ├── wedding.config.ts        ← ⭐ EDIT THIS to customise any wedding card
│   └── music-context.tsx        ← Global audio state (persists across pages)
│
└── public/
    ├── images/                  ← Replace hero-gown.png + riyadh-bg.png
    └── audio/                   ← Replace wedding.mp3
```

---

## Design Theme Tokens (globals.css)

| Token | Value | Used for |
|-------|-------|----------|
| `--gold` | `oklch(0.78 0.13 85)` | All accents, borders, text |
| `--background` | `oklch(0.17 0.005 60)` | Dark warm near-black |
| `--card` | `oklch(0.22 0.006 60)` | Section card backgrounds |
| `--muted-foreground` | `oklch(0.72 0.015 80)` | Labels and subtext |

---

## Key Animation Classes (globals.css)

| Class / Keyframe | Purpose |
|------------------|---------|
| `rain-fall` | Vertical Y fall for gold rain drops |
| `gold-glow` | Box-shadow pulse glow (separate from transform) |
| `heavy-rain` | Fast burst rain on splash click |
| `pulse-ring` | Gold ring pulse on the open button |
| `animate-spin-slow` | Slow compass icon rotation |
