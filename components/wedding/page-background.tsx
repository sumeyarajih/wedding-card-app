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
      {/* ── Light white scenery ─────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          background: `
            radial-gradient(
              ellipse 120% 80% at 50% -10%,
              oklch(0.96 0.02 70 / 80%) 0%,
              transparent 65%
            ),
            radial-gradient(
              ellipse 80% 60% at 80% 100%,
              oklch(0.95 0.04 65 / 50%) 0%,
              transparent 60%
            ),
            oklch(0.98 0.01 70)
          `,
        }}
      />

      {/* ── Continuous tiny white gold rain beads ─────────────────────────── */}
      {renderRain && <GoldParticles count={25} />}
    </>
  )
}
