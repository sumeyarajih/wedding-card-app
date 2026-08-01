'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { COUPLE, WEDDING_DATE } from '@/lib/wedding.config'

export function Hero({ isPlaying, onVideoEnd }: { isPlaying: boolean; onVideoEnd?: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(console.error)
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlaying])

interface HeroProps {
  hostNames?: string
  dateStr?: string
  timeStr?: string
}

const DEFAULT_HOST_NAMES = 'Kareem & Hana'

function parseHostNames(hostNames: string): [string, string] {
  const parts = hostNames.split('&').map((s) => s.trim())
  if (parts.length >= 2) return [parts[0], parts.slice(1).join(' & ')]
  return [hostNames, '']
}

export function Hero({
  hostNames = DEFAULT_HOST_NAMES,
  dateStr = 'Wednesday, December 30, 2026',
  timeStr = 'at 4:49 PM',
}: HeroProps) {
  const [firstName, secondName] = parseHostNames(hostNames)
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-end overflow-hidden pb-16 text-center lg:min-h-screen lg:pb-24">
      {/* Full-section video background */}
      <video
        ref={videoRef}
        muted
        playsInline
        onEnded={onVideoEnd}
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero4 section.mp4"
      />

      {/* Light gradient overlay so white/brown theme flows seamlessly into the page background */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, transparent 70%, oklch(var(--background) / 60%) 90%, oklch(var(--background) / 100%) 100%)',
        }}
      />

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
            الأربعاء ٣٠ ديسمبر ٢٠٢٦ — الساعة ٤:٤٩ مساءً
          </p>
        </div>
      </motion.div>
    </section>
  )
}
