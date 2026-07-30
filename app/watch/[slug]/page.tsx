'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { GoldParticles } from '@/components/wedding/gold-particles'
import { Loader2, Heart } from 'lucide-react'

interface EventInfo {
  host_names: string
  event_type: 'wedding' | 'graduation'
  video_url: string | null
}

export default function WatchPage() {
  const params = useParams()
  const slug = params.slug as string

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [event, setEvent] = useState<EventInfo | null>(null)

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(`/api/join/${slug}`)
        if (!res.ok) {
          setError('Invitation not found')
          return
        }
        const data = await res.json()
        setEvent(data)
      } catch {
        setError('Something went wrong')
      } finally {
        setLoading(false)
      }
    }
    fetchEvent()
  }, [slug])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
        <GoldParticles count={8} />
        <h1 className="font-serif text-3xl text-gold">Invitation Not Found</h1>
        <p className="mt-3 font-sans text-sm text-muted-foreground">
          {error || 'This invitation could not be verified.'}
        </p>
      </div>
    )
  }

  return (
    <div className="relative mx-auto flex min-h-screen max-w-md flex-col items-center justify-center bg-background px-6 py-12 text-center">
      <GoldParticles count={14} />

      <div className="mb-6 flex items-center gap-1.5 font-sans text-[0.65rem] tracking-[0.4em] text-muted-foreground uppercase">
        <Heart className="h-3.5 w-3.5 text-gold" />
        {event.event_type === 'wedding' ? 'You Are Invited' : 'Join The Celebration'}
      </div>

      <h1 className="font-serif text-3xl text-gold">{event.host_names}</h1>

      <div className="my-6 flex items-center justify-center gap-3">
        <span className="h-px w-10 bg-gold/40" />
        <span className="text-gold">&#10047;</span>
        <span className="h-px w-10 bg-gold/40" />
      </div>

      {event.video_url ? (
        <div className="w-full overflow-hidden rounded-[2rem] border border-gold/25 bg-card shadow-2xl">
          <video
            src={event.video_url}
            controls
            autoPlay
            playsInline
            className="w-full"
          />
        </div>
      ) : (
        <p className="font-sans text-sm text-muted-foreground">
          The invitation video isn&apos;t available yet — please check back soon.
        </p>
      )}
    </div>
  )
}
