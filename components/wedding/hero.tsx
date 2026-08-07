'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { WEDDING_DATE } from '@/lib/wedding.config'

interface HeroProps {
  hostNames?: string
  dateStr?: string
  timeStr?: string
  videoUrl?: string | null
  onVideoEnded?: () => void
}

const DEFAULT_HOST_NAMES = 'Mohammed Ali & Sebat Mohammed'

function parseHostNames(hostNames: string): [string, string] {
  const parts = hostNames.split('&').map((s) => s.trim())
  if (parts.length >= 2) return [parts[0], parts.slice(1).join(' & ')]
  return [hostNames, '']
}

export function Hero({
  hostNames = DEFAULT_HOST_NAMES,
  dateStr = WEDDING_DATE.longEnglish,
  timeStr = WEDDING_DATE.timeEnglish,
  videoUrl,
  onVideoEnded,
}: HeroProps) {
  const [firstName, secondName] = parseHostNames(hostNames)
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <section className="relative flex flex-col items-center pt-2 pb-10 text-center sm:pt-4 lg:pb-24">
      {/* Video plays in its own block, immediately on mount — visible faintly
          through the splash screen's translucent curtains before the guest
          taps "Open"; the curtains simply slide away to reveal it already in
          motion. Only rendered when this event actually has a video. */}
      {videoUrl && (
        <div className="relative mb-8 w-full max-w-md overflow-hidden rounded-b-[2.5rem] shadow-2xl lg:rounded-[2.5rem]">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="aspect-[9/16] w-full object-cover"
            src={videoUrl}
            onEnded={onVideoEnded}
          />
        </div>
      )}

      <motion.div
        className="relative z-10 flex flex-col items-center px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <p className="mb-4 font-sans text-[0.7rem] tracking-[0.55em] text-gold/90 uppercase">
          The Wedding Of
        </p>
        <h1 className="gold-gradient-text font-serif text-6xl leading-none font-medium text-balance sm:text-7xl lg:text-8xl">
          {firstName}
        </h1>
        <span className="my-2 font-serif text-3xl text-foreground/80 italic lg:text-4xl">
          &
        </span>
        <h1 className="gold-gradient-text font-serif text-6xl leading-none font-medium text-balance sm:text-7xl lg:text-8xl">
          {secondName}
        </h1>

        <div className="mt-8 flex flex-col items-center gap-1">
          <div className="h-px w-16 bg-gold/50" />
          <p className="mt-4 font-sans text-sm tracking-[0.15em] text-foreground/90">
            {dateStr}
          </p>
          <p className="font-sans text-sm tracking-[0.15em] text-foreground/70">
            {timeStr}
          </p>
          <p
            dir="rtl"
            className="mt-2 font-arabic text-lg text-gold/90"
            lang="ar"
          >
            {WEDDING_DATE.longArabic} — {WEDDING_DATE.timeArabic}
          </p>
        </div>
      </motion.div>
    </section>
  )
}