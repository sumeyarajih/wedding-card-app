'use client'

import { Heart, Send, Users, Loader2 } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { forwardRef, useEffect, useState } from 'react'
import { Reveal } from './reveal'

type Wish = {
  id: string
  name: string
  message: string
  status: 'attending' | 'apologizing'
}

interface RsvpProps {
  code?: string
  guestName?: string
}

export const Rsvp = forwardRef<HTMLElement, RsvpProps>(function Rsvp(
  { code, guestName },
  ref,
) {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [confirmed, setConfirmed] = useState(0)
  const [loadingWishes, setLoadingWishes] = useState(true)
  const [status, setStatus] = useState<'attending' | 'apologizing'>('attending')
  const [guests, setGuests] = useState(1)
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!code) {
      setLoadingWishes(false)
      return
    }
    fetch(`/api/invite/${code}/wishes`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setWishes(
            data.wishes.map((w: Omit<Wish, 'id'>, i: number) => ({
              ...w,
              id: `${i}-${w.name}`,
            })),
          )
          setConfirmed(data.confirmedCount)
        }
      })
      .catch((err) => console.error('Wishes fetch error:', err))
      .finally(() => setLoadingWishes(false))
  }, [code])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim()) return

    const displayName = guestName || 'A Guest'

    // Optimistic UI update
    setWishes((prev) => [
      { id: `local-${Date.now()}`, name: displayName, message: message.trim(), status },
      ...prev,
    ])
    if (status === 'attending') {
      setConfirmed((c) => c + guests)
    }

    if (code) {
      try {
        await fetch(`/api/invite/${code}/rsvp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status,
            guests,
            message: message.trim(),
          }),
        })
      } catch (err) {
        console.error('RSVP API error:', err)
      }
    }

    setMessage('')
    setGuests(1)
    setStatus('attending')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section ref={ref} className="scroll-mt-6 px-5 py-8">
      <Reveal>
        <div className="mb-6 text-center">
          <p className="font-sans text-[0.65rem] tracking-[0.4em] text-muted-foreground uppercase">
            Be With Us
          </p>
          <h2 className="mt-2 font-serif text-3xl text-gold">RSVP</h2>
        </div>
      </Reveal>

      <div className="mx-auto lg:grid lg:max-w-5xl lg:grid-cols-2 lg:items-start lg:gap-8">
        <div>
      <Reveal>
        <div className="mx-auto mb-6 flex max-w-md items-center justify-center gap-3 rounded-2xl border border-gold/25 bg-card px-6 py-4 text-center">
          <Users className="h-5 w-5 text-gold" />
          <span className="font-serif text-2xl text-foreground tabular-nums">
            {confirmed}
          </span>
          <span className="font-sans text-sm text-muted-foreground">
            Confirmed Guests
          </span>
        </div>
      </Reveal>

      <Reveal>
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-md rounded-[2rem] border border-gold/25 bg-card p-6 shadow-xl"
        >
          {guestName && (
            <p className="mb-4 font-sans text-sm text-muted-foreground">
              Responding as <span className="text-foreground font-medium">{guestName}</span>
            </p>
          )}

          <div className="mb-4 grid grid-cols-2 gap-2">
            {(['attending', 'apologizing'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                className={`rounded-full border px-4 py-2.5 font-sans text-sm capitalize transition-colors ${
                  status === s
                    ? 'border-gold bg-gold text-background'
                    : 'border-gold/30 text-muted-foreground hover:text-foreground'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="mb-3 flex items-center justify-between rounded-xl border border-gold/20 bg-background/60 px-4 py-2.5">
            <span className="font-sans text-sm text-muted-foreground">
              Number of guests
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/40 text-gold"
                aria-label="Decrease guests"
              >
                −
              </button>
              <span className="w-5 text-center font-serif text-lg text-foreground tabular-nums">
                {guests}
              </span>
              <button
                type="button"
                onClick={() => setGuests((g) => Math.min(10, g + 1))}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/40 text-gold"
                aria-label="Increase guests"
              >
                +
              </button>
            </div>
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your congratulations…"
            required
            rows={3}
            className="mb-4 w-full resize-none rounded-xl border border-gold/20 bg-background/60 px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-gold focus:outline-none"
          />

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-sans text-sm font-medium tracking-wide text-background transition-opacity hover:opacity-90"
          >
            <Send className="h-4 w-4" />
            Send Wishes
          </button>

          <AnimatePresence>
            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 text-center font-sans text-sm text-gold"
              >
                Thank you! Your message has been added below.
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </Reveal>
        </div>

      <Reveal>
        <div className="mx-auto mt-8 max-w-md lg:mt-0">
          <h3 className="mb-4 text-center font-serif text-xl text-gold">
            Congratulations Wall
          </h3>

          {loadingWishes && (
            <div className="flex justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-gold" />
            </div>
          )}

          {!loadingWishes && wishes.length === 0 && (
            <p className="text-center font-sans text-sm text-muted-foreground py-8">
              Be the first to send your wishes!
            </p>
          )}

          <div className="flex max-h-96 flex-col gap-3 overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
              {wishes.map((w) => (
                <motion.div
                  key={w.id}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-gold/15 bg-card px-5 py-4"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-serif text-base text-foreground">
                      {w.name}
                    </span>
                    <span
                      className={`flex items-center gap-1 rounded-full px-2 py-0.5 font-sans text-[0.6rem] tracking-wide uppercase ${
                        w.status === 'attending'
                          ? 'bg-gold/15 text-gold'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <Heart className="h-3 w-3" />
                      {w.status}
                    </span>
                  </div>
                  <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                    {w.message}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
      </div>
    </section>
  )
})
