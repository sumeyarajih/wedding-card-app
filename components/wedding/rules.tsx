'use client'

import { CameraOff, Clock, PhoneOff, QrCode, ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Reveal } from './reveal'

const RULES = [
  {
    icon: Clock,
    title: 'Please Arrive On Time',
    detail:
      'The celebration begins promptly. We kindly ask you to arrive by 8:00 PM so you do not miss the grand entrance of the couple.',
  },
  {
    icon: PhoneOff,
    title: 'Phones On Silent',
    detail:
      'Please keep your phones on silent throughout the evening to help everyone stay present in the moment.',
  },
]

export function Rules() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="px-5 py-8">
      <Reveal>
        <div className="mb-8 text-center">
          <p className="font-sans text-[0.65rem] tracking-[0.4em] text-muted-foreground uppercase">
            Kindly Note
          </p>
          <h2 className="mt-2 font-serif text-3xl text-gold">Event Details</h2>
        </div>
      </Reveal>

      <div className="mx-auto flex max-w-md flex-col gap-3">
        {RULES.map((rule, i) => {
          const Icon = rule.icon
          const isOpen = open === i
          return (
            <Reveal key={rule.title} delay={i * 0.08}>
              <div className="overflow-hidden rounded-2xl border border-gold/20 bg-card">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex-1 font-serif text-base text-foreground">
                    {rule.title}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-gold transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                    >
                      <p className="px-5 pb-4 pl-[4.75rem] font-sans text-sm leading-relaxed text-muted-foreground">
                        {rule.detail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
