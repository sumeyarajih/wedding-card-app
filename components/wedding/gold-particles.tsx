'use client'

import { useEffect, useState } from 'react'

interface Particle {
  id: number
  left: string        // final left % — random, fixed
  size: number        // width in px (height = 2.2x)
  fallDur: number     // rain-fall animation duration
  fallDelay: number   // negative = pre-started, never waits
  glowDur: number     // gold-glow animation duration
  glowDelay: number
}

/**
 * Renders a fixed-viewport layer of tiny shining golden rain drops.
 * Two completely separate animations are used:
 *   - rain-fall  → animates transform: translateY only
 *   - gold-glow  → animates box-shadow + opacity only
 * This avoids the "two animations conflict over `transform`" bug.
 *
 * Particles start at negative delay so they are already in-flight
 * on first render — there is no initial pause, the rain never stops.
 */
export function GoldParticles({ count = 60 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: `${(Math.random() * 98 + 1).toFixed(2)}%`,
        size: 0.8 + Math.random() * 1.5,
        fallDur: 5 + Math.random() * 9,
        fallDelay: -(Math.random() * 14),   // already mid-fall on mount
        glowDur: 0.8 + Math.random() * 1.6,
        glowDelay: -(Math.random() * 2),
      })),
    )
  }, [count])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 9998,       // above everything except modals (z-50 = 50 < 9998)
      }}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            top: '-5px',
            left: p.left,
            width: `${p.size}px`,
            height: `${(p.size * 2.5).toFixed(1)}px`,
            borderRadius: '50% 50% 55% 55%',
            background: 'oklch(0.7 0.08 55)',
            boxShadow: '0 0 3px oklch(0.7 0.08 55 / 40%)',
            // rain-fall controls Y position only
            animationName: 'rain-fall, gold-glow',
            animationDuration: `${p.fallDur}s, ${p.glowDur}s`,
            animationDelay: `${p.fallDelay}s, ${p.glowDelay}s`,
            animationTimingFunction: 'linear, ease-in-out',
            animationIterationCount: 'infinite, infinite',
            animationDirection: 'normal, alternate',
            animationFillMode: 'none, none',
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  )
}
