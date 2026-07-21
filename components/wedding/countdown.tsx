'use client'

import { CalendarHeart } from 'lucide-react'
import { forwardRef, useEffect, useState } from 'react'
import { Reveal } from './reveal'
import { CalendarCard } from './calendar-card'

const TARGET = new Date('2026-12-30T16:49:00+03:00').getTime()

const GCAL_URL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  '&text=' +
  encodeURIComponent('Wedding of Kareem & Hana') +
  '&dates=20261230T134900Z/20261230T190000Z' +
  '&details=' +
  encodeURIComponent('Join us to celebrate the wedding of Kareem & Hana.') +
  '&location=' +
  encodeURIComponent('The Ritz-Carlton, Riyadh, Al Hada District, Riyadh, Saudi Arabia')

function getRemaining() {
  const diff = Math.max(0, TARGET - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function downloadIcs() {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Kareem and Hana//Wedding//EN',
    'BEGIN:VEVENT',
    'UID:kareem-hana-wedding@invitation',
    'DTSTAMP:20260101T000000Z',
    'DTSTART:20261230T134900Z',
    'DTEND:20261230T190000Z',
    'SUMMARY:Wedding of Kareem & Hana',
    'DESCRIPTION:Join us to celebrate the wedding of Kareem & Hana.',
    'LOCATION:The Ritz-Carlton\\, Riyadh\\, Saudi Arabia',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'kareem-and-hana-wedding.ics'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export const Countdown = forwardRef<HTMLElement>(function Countdown(
  _props,
  ref,
) {
  // Start at zeros so SSR and first client render match, then tick on the client.
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    setTime(getRemaining())
    const id = setInterval(() => setTime(getRemaining()), 1000)
    return () => clearInterval(id)
  }, [])

  const units: [string, number][] = [
    ['Days', time.days],
    ['Hours', time.hours],
    ['Minutes', time.minutes],
    ['Seconds', time.seconds],
  ]

  return (
    <section ref={ref} className="scroll-mt-6 px-5 py-8">
      {/* Physical calendar card above countdown */}
      <CalendarCard />

      <Reveal>
        <div className="rounded-[2rem] border border-gold/25 bg-card p-8 text-center shadow-xl">
          <p className="font-sans text-[0.65rem] tracking-[0.4em] text-muted-foreground uppercase">
            Counting Down To
          </p>
          <h2 className="mt-2 font-serif text-2xl text-gold">Our Special Day</h2>

          <div className="mt-7 grid grid-cols-4 gap-2 sm:gap-3">
            {units.map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-gold/20 bg-background/60 py-4"
              >
                <div className="gold-gradient-text font-serif text-3xl font-semibold tabular-nums sm:text-4xl">
                  {String(value).padStart(2, '0')}
                </div>
                <div className="mt-1 font-sans text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={downloadIcs}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-sans text-sm font-medium tracking-wide text-background transition-opacity hover:opacity-90"
            >
              <CalendarHeart className="h-4 w-4" />
              Save the Date (.ics)
            </button>
            <a
              href={GCAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 px-6 py-3 font-sans text-sm tracking-wide text-gold transition-colors hover:bg-gold/10"
            >
              Add to Google Calendar
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
})
