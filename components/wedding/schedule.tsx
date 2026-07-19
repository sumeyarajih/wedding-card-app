'use client'

import { GlassWater, PartyPopper, UtensilsCrossed, Camera } from 'lucide-react'
import { Reveal } from './reveal'

const EVENTS = [
  {
    time: '8:00 PM',
    title: 'Guest Arrival & Welcome',
    icon: GlassWater,
  },
  {
    time: '9:00 PM',
    title: 'Grand Entrance of the Couple',
    icon: PartyPopper,
  },
  {
    time: '10:00 PM',
    title: 'Dinner is Served',
    icon: UtensilsCrossed,
  },
  {
    time: '11:00 PM',
    title: 'Photography & Celebration',
    icon: Camera,
  },
]

export function Schedule() {
  return (
    <section className="px-5 py-8">
      <Reveal>
        <div className="mb-8 text-center">
          <p className="font-sans text-[0.65rem] tracking-[0.4em] text-muted-foreground uppercase">
            The Evening
          </p>
          <h2 className="mt-2 font-serif text-3xl text-gold">Event Schedule</h2>
        </div>
      </Reveal>

      <div className="relative mx-auto max-w-md pl-2">
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[1.35rem] w-px bg-gold/25"
        />
        <ul className="flex flex-col gap-6">
          {EVENTS.map((e, i) => {
            const Icon = e.icon
            return (
              <Reveal key={e.title} delay={i * 0.1}>
                <li className="relative flex items-center gap-4">
                  <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-card text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="flex-1 rounded-2xl border border-gold/15 bg-card px-5 py-3">
                    <p className="font-sans text-xs tracking-[0.2em] text-gold uppercase">
                      {e.time}
                    </p>
                    <p className="mt-0.5 font-serif text-lg text-foreground">
                      {e.title}
                    </p>
                  </div>
                </li>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
