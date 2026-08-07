'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { InviteResponse } from '@/lib/types'
import { SplashScreen } from '@/components/wedding/splash-screen'
import { Hero } from '@/components/wedding/hero'
import { InvitationCard } from '@/components/wedding/invitation-card'
import { Countdown } from '@/components/wedding/countdown'
import { Rules } from '@/components/wedding/rules'
import { Rsvp } from '@/components/wedding/rsvp'
import { MapSection } from '@/components/wedding/map-section'
import { BottomNav } from '@/components/wedding/bottom-nav'
import { GoldParticles } from '@/components/wedding/gold-particles'
import { EntryPass } from '@/components/wedding/entry-pass'
import { useMusic } from '@/lib/music-context'
import { EventProgram } from '@/components/wedding/event-program'
import { VENUE, WEDDING_DATE } from '@/lib/wedding.config'

interface Props {
  data: InviteResponse
}

export function InviteClient({ data }: Props) {
  const { guest, event } = data
  const [splashOpen, setSplashOpen] = useState(true)
  const { playMusic } = useMusic()

  const heroRef = useRef<HTMLDivElement | null>(null)
  const locationRef = useRef<HTMLElement | null>(null)
  const countdownRef = useRef<HTMLElement | null>(null)
  const rulesRef = useRef<HTMLDivElement | null>(null)
  const rsvpRef = useRef<HTMLElement | null>(null)
  const mapRef = useRef<HTMLElement | null>(null)

  const autoScrollTimers = useRef<number[]>([])

  function stopAutoScroll() {
    autoScrollTimers.current.forEach((id) => window.clearTimeout(id))
    autoScrollTimers.current = []
  }

  useEffect(() => stopAutoScroll, [])

  function scrollTo(ref: React.RefObject<HTMLElement | null>) {
    const target = ref.current
    if (!target) return
    const top = target.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' })
  }

  function startAutoScrollPresentation() {
    stopAutoScroll()

    const sequence: {
      ref: React.RefObject<HTMLElement | null>
      pause: number
    }[] = [
        { ref: heroRef, pause: 3500 },
        { ref: locationRef, pause: 3500 },
        { ref: countdownRef, pause: 3500 },
        { ref: rulesRef, pause: 3500 },
        { ref: mapRef, pause: 3500 },
        { ref: rsvpRef, pause: 0 },
      ]

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

    // Immediately scroll to very top so hero video is visible
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // If no video, start auto-scroll immediately
    if (!event.video_url) {
      startAutoScrollPresentation()
    }
    // If there IS a video, auto-scroll will be triggered by onVideoEnded

    const cancel = () => {
      stopAutoScroll()
      window.removeEventListener('wheel', cancel)
      window.removeEventListener('touchstart', cancel)
      window.removeEventListener('touchmove', cancel)
      window.removeEventListener('keydown', cancel)
      window.removeEventListener('pointerdown', cancel)
    }
    window.setTimeout(() => {
      window.addEventListener('wheel', cancel, { passive: true })
      window.addEventListener('touchstart', cancel, { passive: true })
      window.addEventListener('touchmove', cancel, { passive: true })
      window.addEventListener('keydown', cancel)
      window.addEventListener('pointerdown', cancel)
    }, 1950)
  }

  function handleVideoEnded() {
    // Video finished — now slowly auto-scroll down through the rest of the page
    startAutoScrollPresentation()
  }

  // Use config-driven date instead of dynamic DB date
  const dateStr = WEDDING_DATE.longEnglish
  const timeStr = WEDDING_DATE.timeEnglish

  return (
    <>
      <div aria-hidden="true" className="fixed inset-0 -z-10">
        <Image
          src="/images/riyadh-bg.png"
          alt=""
          fill
          className="scale-110 object-cover opacity-40 blur-xl"
        />
        <div className="absolute inset-0 bg-background/70" />
      </div>

      <main className="relative mx-auto min-h-screen max-w-md overflow-hidden bg-background shadow-[0_0_80px_rgba(0,0,0,0.6)] lg:max-w-6xl">
        <GoldParticles count={16} />

        <div className="relative pb-28 pt-4 md:pt-8">
          <div ref={heroRef}>
            <Hero
              hostNames={event.host_names}
              dateStr={dateStr}
              timeStr={timeStr}
              videoUrl={event.video_url}
              onVideoEnded={handleVideoEnded}
            />
          </div>

          <div className="mx-auto lg:grid lg:max-w-5xl lg:grid-cols-2 lg:items-start lg:gap-4">
            <InvitationCard
              ref={locationRef}
              hostNames={event.host_names}
              venueName={event.venue_name}
              venueAddress={event.venue_address}
              mapQuery={event.map_query}
            />
            <Countdown
              ref={countdownRef}
              targetDate={WEDDING_DATE.iso}
              hostNames={event.host_names}
              venueName={event.venue_name || VENUE.nameEnglish}
              venueAddress={event.venue_address || VENUE.address}
            />
          </div>

          <div className="mx-auto lg:grid lg:max-w-5xl lg:grid-cols-2 lg:items-start lg:gap-8">
            <EventProgram />
            <div ref={rulesRef}>
              <Rules />
            </div>
          </div>

          <MapSection
            ref={mapRef}
            venueName={event.venue_name || VENUE.nameEnglish}
            venueAddress={event.venue_address || VENUE.address}
            mapQuery={event.map_query}
            directionsUrl={VENUE.mapsUrl}
          />

          <Rsvp
            ref={rsvpRef}
            code={guest.code}
            guestName={guest.guest_name}
          />

          {/* Entry Pass for premium/royal */}
          {(event.tier === 'premium' || event.tier === 'royal') && (
            <EntryPass code={guest.code} />
          )}

          <footer className="px-6 py-10 text-center">
            <div className="mx-auto mb-4 h-px w-16 bg-gold/40" />
            <p className="font-serif text-2xl text-gold">{event.host_names}</p>
            <p className="mt-2 font-sans text-xs tracking-[0.3em] text-muted-foreground uppercase">
              {dateStr} &middot; {event.venue_name || VENUE.nameEnglish}
            </p>
          </footer>
        </div>
      </main>

      {!splashOpen && (
        <BottomNav
          code={guest.code}
          tier={event.tier}
          hostNames={event.host_names}
        />
      )}

      <SplashScreen open={splashOpen} onOpen={handleOpen} />
    </>
  )
}