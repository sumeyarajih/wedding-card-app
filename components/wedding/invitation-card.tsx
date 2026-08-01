'use client'

import { MapPin } from 'lucide-react'
import { forwardRef } from 'react'
import { Reveal } from './reveal'

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=The+Ritz-Carlton+Riyadh'

export const InvitationCard = forwardRef<HTMLElement>(function InvitationCard(
  _props,
  ref,
) {
  return (
    <section ref={ref} className="scroll-mt-6 px-5 py-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-gold/25 bg-card p-8 text-center shadow-2xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(circle at 50% 0%, oklch(0.3 0.03 80 / 60%), transparent 60%)',
            }}
          />
          <div className="relative">
            <span className="mx-auto mb-5 block h-10 w-px bg-gold/40" />
            <h2
              dir="rtl"
              lang="ar"
              className="font-arabic text-4xl font-bold text-gold"
            >
              دعوة خاصة
            </h2>
            <p className="mt-1 font-sans text-[0.65rem] tracking-[0.4em] text-muted-foreground uppercase">
              Special Invitation
            </p>

            <p className="mx-auto mt-6 max-w-sm font-serif text-lg leading-relaxed text-pretty text-foreground/90 italic">
              With hearts full of joy, we invite you to share in the celebration
              of love as
              <span className="text-gold"> Mohammed &amp; Sebat </span>
              begin their journey together as one.
            </p>

            <div className="my-7 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gold/40" />
              <span className="text-gold">&#10047;</span>
              <span className="h-px w-10 bg-gold/40" />
            </div>

            <p className="font-serif text-xl text-foreground">
              Dire Dawa , Ethiopia
            </p>
            <p className="mt-1 font-sans text-sm text-muted-foreground">
              Around Sami |Restirants, Dire Dawa
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
})
