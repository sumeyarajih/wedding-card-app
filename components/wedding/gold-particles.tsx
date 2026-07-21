'use client'

import { useEffect, useState } from 'react'

interface Particle {
  id: number
  left: number
  size: number
  duration: number
  delay: number
  drift: number
  shimmerDuration: number
  shimmerDelay: number
}

// Fixed viewport rain layer — renders on every page via layout.tsx GlobalEffects
export function GoldParticles({ count = 55 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        // thin elongated teardrop shape
        size: 1.8 + Math.random() * 2.5,
        // each bead gets its own looping duration so they stagger naturally
        duration: 4 + Math.random() * 9,
        delay: -(Math.random() * 12), // negative delay = pre-started loops
        drift: (Math.random() - 0.5) * 50,
        shimmerDuration: 0.7 + Math.random() * 1.4,
        shimmerDelay: -(Math.random() * 2),
      })),
    )
  }, [count])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: '-8px',
            width: `${p.size}px`,
            height: `${p.size * 2.8}px`,
            borderRadius: '50% 50% 60% 60%',
            background: 'oklch(0.78 0.13 85)',
            animationName: 'rain-drop, shimmer-bead',
            animationDuration: `${p.duration}s, ${p.shimmerDuration}s`,
            animationDelay: `${p.delay}s, ${p.shimmerDelay}s`,
            animationTimingFunction: 'linear, ease-in-out',
            animationIterationCount: 'infinite, infinite',
            animationFillMode: 'none',
            // CSS variable for the inline drift
            ['--drift' as string]: `${p.drift}px`,
            filter: 'blur(0.15px)',
            willChange: 'transform, opacity, box-shadow',
          }}
        />
      ))}
    </div>
  )
}
