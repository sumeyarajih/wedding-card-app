'use client'

import { AnimatePresence, motion } from 'framer-motion'

export function SplashScreen({
  open,
  onOpen,
}: {
  open: boolean
  onOpen: () => void
}) {
  // Shared easing for the cinematic curtain motion.
  const curtainEase = [0.76, 0, 0.24, 1] as const

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {/* LEFT veil panel — slides out to the left */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 overflow-hidden"
            initial={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 1.1, ease: curtainEase }}
          >
            {/* Full-width image, cropped to the left half so the two panels meet seamlessly */}
            <div
              className="absolute inset-y-0 left-0 h-full w-[200%] bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/images/hero-gown.png')" }}
            />
            <div className="absolute inset-0 bg-background/45" />
            {/* Subtle seam highlight on the inner edge */}
            <div className="absolute inset-y-0 right-0 w-px bg-gold/40" />
          </motion.div>

          {/* RIGHT veil panel — slides out to the right */}
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 overflow-hidden"
            initial={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 1.1, ease: curtainEase }}
          >
            {/* Same image, shifted left so the right edge of the left panel lines up */}
            <div
              className="absolute inset-y-0 right-0 h-full w-[200%] bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/images/hero-gown.png')" }}
            />
            <div className="absolute inset-0 bg-background/45" />
            <div className="absolute inset-y-0 left-0 w-px bg-gold/40" />
          </motion.div>

          {/* Center gold button over the seam */}
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.5, ease: 'easeIn' }}
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
              onClick={onOpen}
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
                Open
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
