'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { GoldParticles } from '@/components/wedding/gold-particles'
import { Sparkles, Loader2 } from 'lucide-react'

export default function JoinPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [eventInfo, setEventInfo] = useState<{
    host_names: string
    tier: string
    event_type: string
  } | null>(null)
  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(`/api/join/${slug}`)
        if (!res.ok) {
          if (res.status === 404) {
            setError('Invitation not found')
          } else {
            setError('Something went wrong')
          }
          return
        }
        const data = await res.json()
        setEventInfo(data)

        // Basic tier: no gating, no per-guest code — straight to the video
        if (data.tier === 'basic') {
          router.push(`/watch/${slug}`)
          return
        }

        // Check if already registered in this browser
        const storedCode = localStorage.getItem(`join_${slug}`)
        if (storedCode) {
          router.push(`/invite/${storedCode}`)
          return
        }
      } catch {
        setError('Something went wrong')
      } finally {
        setLoading(false)
      }
    }
    fetchEvent()
  }, [slug, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return

    setSubmitting(true)
    try {
      const res = await fetch(`/api/join/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() }),
      })

      if (!res.ok) {
        const err = await res.json()
        setError(err.error || 'Registration failed')
        setSubmitting(false)
        return
      }

      const { code } = await res.json()
      localStorage.setItem(`join_${slug}`, code)
      router.push(`/invite/${code}`)
    } catch {
      setError('Registration failed')
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
        <GoldParticles count={8} />
        <Sparkles className="mb-4 h-10 w-10 text-gold/50" />
        <h1 className="font-serif text-3xl text-gold">Invitation Not Found</h1>
        <p className="mt-3 font-sans text-sm text-muted-foreground">
          {error}
        </p>
      </div>
    )
  }

  return (
    <div className="relative mx-auto flex min-h-screen max-w-md flex-col items-center justify-center bg-background px-6 text-center">
      <GoldParticles count={12} />

      <div className="w-full max-w-sm rounded-[2rem] border border-gold/25 bg-card p-8 shadow-2xl">
        <div className="mx-auto mb-6 h-px w-16 bg-gold/40" />

        <h1 className="font-serif text-3xl text-gold">
          {eventInfo?.host_names}
        </h1>
        <p className="mt-2 font-sans text-xs tracking-[0.3em] text-muted-foreground uppercase">
          {eventInfo?.event_type === 'wedding' ? 'Wedding Invitation' : 'Graduation Celebration'}
        </p>

        <div className="my-6 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gold/40" />
          <span className="text-gold">&#10047;</span>
          <span className="h-px w-10 bg-gold/40" />
        </div>

        <p className="mb-6 font-sans text-sm text-muted-foreground">
          Enter your name to view your personal invitation
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="w-full rounded-xl border border-gold/20 bg-background/60 px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-gold focus:outline-none"
          />

          <button
            type="submit"
            disabled={submitting || !name.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-sans text-sm font-medium tracking-wide text-background transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            View Invitation
          </button>
        </form>
      </div>
    </div>
  )
}