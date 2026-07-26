'use client'

import { GoldParticles } from '@/components/wedding/gold-particles'

/**
 * Shared full-page background used on every page of the wedding card.
 *
 * Renders (fixed, behind all content, z-index below main):
 *  1. A warm dark radial gradient background
 *  2. Continuous raining tiny golden beads
 *
 * To change the wedding card background colour, edit the gradient below.
 * To add a background image, replace the gradient div with an <Image fill … />.
 */
export function PageBackground({ renderRain = true }: { renderRain?: boolean }) {
  return (
    <>
      {/* ── Warm dark scenery ─────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          background: `
            radial-gradient(
              ellipse 120% 80% at 50% -10%,
              oklch(0.30 0.06 80 / 60%) 0%,
              transparent 65%
            ),
            radial-gradient(
              ellipse 80% 60% at 80% 100%,
              oklch(0.25 0.05 75 / 40%) 0%,
              transparent 60%
            ),
            oklch(0.14 0.006 60)
          `,
        }}
      />

      {/* ── Continuous tiny golden rain beads ─────────────────────────── */}
      {renderRain && <GoldParticles count={65} />}
    </>
  )
}
