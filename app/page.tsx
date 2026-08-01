'use client'

import { useEffect, useRef, useState } from 'react'
import { SplashScreen } from '@/components/wedding/splash-screen'
import { Hero } from '@/components/wedding/hero'
import { WelcomeSection } from '@/components/wedding/welcome-section'
import { InvitationCard } from '@/components/wedding/invitation-card'
import { Countdown } from '@/components/wedding/countdown'
import { EventProgram } from '@/components/wedding/event-program'
import { Rules } from '@/components/wedding/rules'
import { Rsvp } from '@/components/wedding/rsvp'
import { MapSection } from '@/components/wedding/map-section'
import { BottomNav } from '@/components/wedding/bottom-nav'
import { CoupleSlider } from '@/components/wedding/couple-slider'
import { PageBackground } from '@/components/wedding/page-background'
import { Reveal } from '@/components/wedding/reveal'
import { useMusic } from '@/lib/music-context'
import { COUPLE, WEDDING_DATE } from '@/lib/wedding.config'

export default function Page() {
  const [splashOpen, setSplashOpen] = useState(true)
  const { playMusic } = useMusic()

  const heroRef = useRef<HTMLDivElement | null>(null)
  const locationRef = useRef<HTMLElement | null>(null)
  const countdownRef = useRef<HTMLElement | null>(null)
  const rulesRef = useRef<HTMLDivElement | null>(null)
  const rsvpRef = useRef<HTMLElement | null>(null)
  const mapRef = useRef<HTMLElement | null>(null)

  // requestAnimationFrame id for smooth continuous scroll
  const rafRef = useRef<number | null>(null)
  // speed in px/frame — Increased speed significantly per user request
  const SCROLL_SPEED = 3.5

  function stopContinuousScroll() {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }

  function startContinuousScroll() {
    stopContinuousScroll()
    // Make sure page starts at the very top (hero)
    window.scrollTo({ top: 0, behavior: 'instant' })

    function tick() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (window.scrollY >= maxScroll) {
        stopContinuousScroll()
        return
      }
      window.scrollBy({ top: SCROLL_SPEED, left: 0 })
      rafRef.current = requestAnimationFrame(tick)
    }

    // Start immediately after curtains fully part (~1.2 s)
    setTimeout(() => {
      rafRef.current = requestAnimationFrame(tick)
    }, 1400)
  }

  useEffect(() => {
    // Make sure we start at top of page under the transparent splash screen
    if (splashOpen) {
      window.scrollTo(0, 0)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      stopContinuousScroll()
      document.body.style.overflow = ''
    }
  }, [splashOpen])

  function handleOpen() {
    setSplashOpen(false)
    document.body.style.overflow = ''
    window.scrollTo({ top: 0, behavior: 'instant' })
    playMusic()
    // We no longer start continuous scroll immediately; 
    // it will instead be triggered by `onVideoEnd` down in the Hero component!

    // Any deliberate user scroll/touch/key cancels the drift
    const cancel = () => {
      stopContinuousScroll()
      window.removeEventListener('wheel', cancel)
      window.removeEventListener('touchstart', cancel)
      window.removeEventListener('touchmove', cancel)
      window.removeEventListener('keydown', cancel)
      window.removeEventListener('pointerdown', cancel)
    }
    // Defer attaching listeners until slightly after the splash opens
    setTimeout(() => {
      window.addEventListener('wheel', cancel, { passive: true })
      window.addEventListener('touchstart', cancel, { passive: true })
      window.addEventListener('touchmove', cancel, { passive: true })
      window.addEventListener('keydown', cancel)
      window.addEventListener('pointerdown', cancel)
    }, 1600)
  }

  return (
    <>
      {/* Shared scenic background with gold rain */}
      <PageBackground renderRain={!splashOpen} />

      <main className="relative mx-auto min-h-screen max-w-md overflow-hidden bg-background shadow-[0_0_80px_rgba(0,0,0,0.6)] lg:max-w-6xl">
        <div className="relative pb-28">
          <div ref={heroRef}>
            <Hero isPlaying={!splashOpen} onVideoEnd={startContinuousScroll} />
          </div>

          <WelcomeSection />

          {/* Invitation + Countdown side-by-side on large screens */}
          <Reveal>
            <div className="mx-auto lg:grid lg:max-w-5xl lg:grid-cols-2 lg:items-start lg:gap-4">
              <InvitationCard ref={locationRef} />
              <Countdown ref={countdownRef} />
            </div>
          </Reveal>

          {/* Event Program + Rules */}
          <div className="mx-auto lg:grid lg:max-w-5xl lg:grid-cols-2 lg:items-center lg:gap-8 mt-16">
            <EventProgram />
            <div ref={rulesRef}>
              <Reveal>
                <Rules />
              </Reveal>
            </div>
          </div>

          {/* Photo slider ribbon — before the map */}
          <Reveal>
            <div className="mt-8">
              <CoupleSlider />
            </div>
          </Reveal>

          {/* Map */}
          <Reveal>
            <MapSection ref={mapRef} />
          </Reveal>

          {/* RSVP */}
          <Reveal>
            <Rsvp ref={rsvpRef} />
          </Reveal>

          <footer className="px-6 py-10 text-center">
            <div className="mx-auto mb-4 h-px w-16 bg-gold/40" />
            <p className="font-serif text-2xl text-gold">
              {COUPLE.groomName} &amp; {COUPLE.brideName}
            </p>
            <p className="mt-2 font-sans text-xs tracking-[0.3em] text-muted-foreground uppercase">
              {WEDDING_DATE.dayNumber} · {WEDDING_DATE.monthNumber} · {WEDDING_DATE.yearEnglish} · Dire Dawa
            </p>
          </footer>
        </div>
      </main>

      {!splashOpen && <BottomNav />}

      <SplashScreen open={splashOpen} onOpen={handleOpen} />
    </>
  )
}
