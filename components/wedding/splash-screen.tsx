'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface RainBead {
  id: number
  left: number
  size: number
  duration: number
  delay: number
  drift: number
}

function SplashRain({ count = 80, fast = false }: { count?: number; fast?: boolean }) {
  const [beads, setBeads] = useState<RainBead[]>([])
  useEffect(() => {
    setBeads(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: fast ? 2 + Math.random() * 3 : 1.5 + Math.random() * 2.5,
        duration: fast ? 0.5 + Math.random() * 0.7 : 2 + Math.random() * 4,
        delay: fast ? Math.random() * 0.4 : Math.random() * 5,
        drift: (Math.random() - 0.5) * 20,
      })),
    )
  }, [count, fast])

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {beads.map((b) => (
        <span
          key={b.id}
          className={fast ? 'animate-heavy-rain absolute rounded-full bg-gold' : 'animate-rain-drop animate-shimmer-bead absolute rounded-full bg-gold'}
          style={{
            left: `${b.left}%`,
            top: '-4px',
            width: `${b.size}px`,
            height: `${b.size * (fast ? 3 : 2)}px`,
            animationDuration: fast
              ? `${b.duration}s`
              : `${b.duration}s, ${0.8 + Math.random() * 1.2}s`,
            animationDelay: `${b.delay}s`,
            '--drift': `${b.drift}px`,
            filter: 'blur(0.3px)',
            boxShadow: `0 0 6px 1px oklch(0.78 0.13 85 / 70%)`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

export function SplashScreen({
  open,
  onOpen,
}: {
  open: boolean
  onOpen: () => void
}) {
  const curtainEase = [0.76, 0, 0.24, 1] as const
  const [burst, setBurst] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleOpen() {
    // 1. Trigger the heavy gold burst
    setBurst(true)
    // 2. After 1.1s, start curtain animation then invoke parent callback
    timerRef.current = setTimeout(() => {
      setLeaving(true)
      setTimeout(() => onOpen(), 900)
    }, 1100)
  }

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  // Glassmorphic panel background — dark warm tint, no image
  const panelClass =
    'absolute inset-0 bg-gradient-to-br from-[oklch(0.14_0.007_60)] via-[oklch(0.18_0.008_65)] to-[oklch(0.13_0.005_55)]'

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {/* LEFT curtain panel */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 overflow-hidden"
            initial={{ x: 0 }}
            animate={{ x: leaving ? '-100%' : 0 }}
            transition={{ duration: 1.1, ease: curtainEase }}
          >
            <div className={panelClass} />
            {/* Raining gold beads — soft ambient */}
            <SplashRain count={50} fast={false} />
            {/* Heavy burst on click */}
            {burst && <SplashRain count={100} fast={true} />}
            {/* Gold inner seam */}
            <div className="absolute inset-y-0 right-0 w-px bg-gold/50" />
          </motion.div>

          {/* RIGHT curtain panel */}
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 overflow-hidden"
            initial={{ x: 0 }}
            animate={{ x: leaving ? '100%' : 0 }}
            transition={{ duration: 1.1, ease: curtainEase }}
          >
            <div className={panelClass} />
            <SplashRain count={50} fast={false} />
            {burst && <SplashRain count={100} fast={true} />}
            <div className="absolute inset-y-0 left-0 w-px bg-gold/50" />
          </motion.div>

          {/* Center invite button */}
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
            animate={{ opacity: leaving ? 0 : 1, scale: leaving ? 0.8 : 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.p
              className="mb-6 font-sans text-[0.7rem] tracking-[0.5em] text-foreground uppercase drop-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              You are invited
            </motion.p>

            <motion.button
              type="button"
              onClick={handleOpen}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="animate-pulse-ring group relative flex h-56 w-56 flex-col items-center justify-center rounded-full border border-gold/40 shadow-[0_0_60px_rgba(0,0,0,0.45)] transition-transform duration-500 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:h-64 sm:w-64"
              style={{
                background:
                  'radial-gradient(circle at 30% 25%, oklch(0.42 0.08 85), oklch(0.26 0.05 80) 55%, oklch(0.2 0.02 70))',
              }}
              aria-label="Open the invitation of Kareem and Hana"
            >
              <span className="pointer-events-none absolute inset-3 rounded-full border border-gold/30" />
              <span className="mb-2 font-sans text-[0.6rem] tracking-[0.4em] text-background/80 uppercase">
                The Wedding Of
              </span>
              <span className="gold-gradient-text font-serif text-2xl leading-tight font-semibold text-balance sm:text-3xl">
                Kareem
                <br />
                <span className="text-lg sm:text-xl">&amp;</span>
                <br />
                Hana
              </span>
              <span className="mt-4 rounded-full border border-gold/50 px-5 py-1 font-sans text-[0.65rem] tracking-[0.35em] text-gold uppercase transition-colors group-hover:bg-gold group-hover:text-background">
                {burst ? 'Opening…' : 'Open'}
              </span>
            </motion.button>

            <motion.p
              className="mt-8 font-sans text-xs text-foreground/90 drop-shadow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Tap to part the veil · music will begin playing
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
