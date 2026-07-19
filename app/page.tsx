'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { SplashScreen } from '@/components/wedding/splash-screen'
import { Hero } from '@/components/wedding/hero'
import { InvitationCard } from '@/components/wedding/invitation-card'
import { Countdown } from '@/components/wedding/countdown'
import { Schedule } from '@/components/wedding/schedule'
import { Rules } from '@/components/wedding/rules'
import { Rsvp } from '@/components/wedding/rsvp'
import { BottomNav } from '@/components/wedding/bottom-nav'
import { GoldParticles } from '@/components/wedding/gold-particles'

export default function Page() {
  const [splashOpen, setSplashOpen] = useState(true)
  const [playing, setPlaying] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const heroRef = useRef<HTMLDivElement | null>(null)
  const locationRef = useRef<HTMLElement | null>(null)
  const countdownRef = useRef<HTMLElement | null>(null)
  const rulesRef = useRef<HTMLDivElement | null>(null)
  const rsvpRef = useRef<HTMLElement | null>(null)

  // Holds every pending timer for the auto-scroll presentation so we can cancel
  // the whole chain the instant the guest takes control.
  const autoScrollTimers = useRef<number[]>([])

  // Clears the entire automated scroll sequence and detaches its listeners.
  function stopAutoScroll() {
    autoScrollTimers.current.forEach((id) => window.clearTimeout(id))
    autoScrollTimers.current = []
  }

  useEffect(() => stopAutoScroll, [])

  function playMusic() {
    const audio = audioRef.current
    if (!audio) return
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false))
  }

  function toggleMusic() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      playMusic()
    }
  }

  // Smoothly glide to a section, measuring its live position via its ref.
  function scrollTo(ref: React.RefObject<HTMLElement | null>) {
    const target = ref.current
    if (!target) return
    const top = target.getBoundingClientRect().top + window.scrollY - 16
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' })
  }

  // Kicks off the hands-free cinematic tour through every section. Each stop
  // pauses so the guest can read, then eases on to the next. Any manual scroll,
  // touch, or key press instantly cancels the whole chain (see handleOpen).
  function startAutoScrollPresentation() {
    stopAutoScroll()

    // Ordered stops. `pause` is the reading time after arriving before moving on.
    const sequence: {
      ref: React.RefObject<HTMLElement | null>
      pause: number
    }[] = [
      { ref: heroRef, pause: 3500 }, // Hero / details
      { ref: locationRef, pause: 3500 }, // Special invitation & venue
      { ref: countdownRef, pause: 3500 }, // Countdown & event timeline
      { ref: rulesRef, pause: 3500 }, // Event rules
      { ref: rsvpRef, pause: 0 }, // RSVP / congratulations (final, bottom)
    ]

    // Curtain finishes splitting at ~1.9s; allow ~1s of easing between stops.
    const SCROLL_EASE = 1000
    let elapsed = 1900

    sequence.forEach(({ ref, pause }) => {
      const id = window.setTimeout(() => scrollTo(ref), elapsed)
      autoScrollTimers.current.push(id)
      elapsed += SCROLL_EASE + pause
    })
  }

  function handleOpen() {
    setSplashOpen(false)
    playMusic()
    startAutoScrollPresentation()

    // The moment the guest interacts, hand full control back to them.
    const cancel = () => {
      stopAutoScroll()
      window.removeEventListener('wheel', cancel)
      window.removeEventListener('touchstart', cancel)
      window.removeEventListener('touchmove', cancel)
      window.removeEventListener('keydown', cancel)
      window.removeEventListener('pointerdown', cancel)
    }
    // Defer attaching so our own programmatic scroll doesn't self-cancel.
    window.setTimeout(() => {
      window.addEventListener('wheel', cancel, { passive: true })
      window.addEventListener('touchstart', cancel, { passive: true })
      window.addEventListener('touchmove', cancel, { passive: true })
      window.addEventListener('keydown', cancel)
      window.addEventListener('pointerdown', cancel)
    }, 1950)
  }

  return (
    <>
      {/* Desktop framing: blurred Riyadh skyline behind the mobile card */}
      <div aria-hidden="true" className="fixed inset-0 -z-10">
        <Image
          src="/images/riyadh-bg.png"
          alt=""
          fill
          className="scale-110 object-cover opacity-40 blur-xl"
        />
        <div className="absolute inset-0 bg-background/70" />
      </div>

      <audio ref={audioRef} loop preload="auto" src="/audio/wedding.mp3" />

      <main className="relative mx-auto min-h-screen max-w-md overflow-hidden bg-background shadow-[0_0_80px_rgba(0,0,0,0.6)] lg:max-w-6xl">
        <GoldParticles count={16} />

        <div className="relative pb-28">
          <div ref={heroRef}>
            <Hero />
          </div>

          {/* Invitation + Countdown sit side-by-side on large screens */}
          <div className="mx-auto lg:grid lg:max-w-5xl lg:grid-cols-2 lg:items-start lg:gap-4">
            <InvitationCard ref={locationRef} />
            <Countdown ref={countdownRef} />
          </div>

          {/* Schedule + Rules share a row on large screens */}
          <div className="mx-auto lg:grid lg:max-w-5xl lg:grid-cols-2 lg:items-start lg:gap-8">
            <Schedule />
            <div ref={rulesRef}>
              <Rules />
            </div>
          </div>

          <Rsvp ref={rsvpRef} />

          <footer className="px-6 py-10 text-center">
            <div className="mx-auto mb-4 h-px w-16 bg-gold/40" />
            <p className="font-serif text-2xl text-gold">Kareem &amp; Hana</p>
            <p className="mt-2 font-sans text-xs tracking-[0.3em] text-muted-foreground uppercase">
              30 · 12 · 2026 · Riyadh
            </p>
          </footer>
        </div>
      </main>

      {!splashOpen && (
        <BottomNav
          playing={playing}
          onToggleMusic={toggleMusic}
          onLocation={() => scrollTo(locationRef)}
          onSaveDate={() => scrollTo(countdownRef)}
          onCongratulate={() => scrollTo(rsvpRef)}
          onContact={() => scrollTo(rsvpRef)}
        />
      )}

      <SplashScreen open={splashOpen} onOpen={handleOpen} />
    </>
  )
}
