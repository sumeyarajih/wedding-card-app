'use client'

import { useEffect, useState } from 'react'

export function GoldParticles({ count = 22 }: { count?: number }) {
  const [particles, setParticles] = useState<
    {
      id: number
      left: number
      size: number
      duration: number
      delay: number
      bottom: number
    }[]
  >([])

  // Generate randomized particles on the client only to avoid hydration mismatch.
  useEffect(() => {
    setParticles(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 1 + Math.random() * 3,
        duration: 9 + Math.random() * 12,
        delay: Math.random() * 10,
        bottom: Math.random() * 40,
      })),
    )
  }, [count])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="animate-float-particle absolute rounded-full bg-gold"
          style={{
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            filter: 'blur(0.4px)',
            boxShadow: '0 0 6px var(--gold)',
          }}
        />
      ))}
    </div>
  )
}
