'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { BottomNav } from '@/components/wedding/bottom-nav'
import { Reveal } from '@/components/wedding/reveal'
import { BookOpen, Sparkles, Heart } from 'lucide-react'
import type { InviteResponse } from '@/lib/types'

type StoryEvent = {
  year: string
  title: string
  description: string
  arabicTitle: string
}

const STORIES: StoryEvent[] = [
  {
    year: '2023',
    title: 'The First Encounter',
    arabicTitle: 'اللقاء الأول',
    description:
      'Under the beautiful skies of Riyadh, our paths crossed. A simple introduction sparkled an endless conversation filled with shared laughter, core values, and mutual dreams.',
  },
  {
    year: '2024',
    title: 'The Shared Dreams',
    arabicTitle: 'رؤية مشتركة',
    description:
      'Over countless discussions and family gatherings, we realized we wanted to craft a life of commitment together. Our love flourished through support and deep friendship.',
  },
  {
    year: '2025',
    title: 'The Golden Engagement',
    arabicTitle: 'الخطوبة المباركة',
    description:
      'With the blessings of our beloved families, we promised our hearts to another in an intimate ceremony, sealing our commitment and beginning the countdown to our big night.',
  },
  {
    year: '2026',
    title: 'The Marriage Covenant',
    arabicTitle: 'الميثاق الغليظ',
    description:
      'Celebrating the start of forever, surrounded by the warmth of our relatives and friends, we embark on this sacred journey.',
  },
]

export default function StoriesPage() {
  const params = useParams()
  const code = params.code as string
  const [invite, setInvite] = useState<InviteResponse | null>(null)

  useEffect(() => {
    fetch(`/api/invite/${code}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setInvite(data))
      .catch(() => {})
  }, [code])

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

      <main className="relative mx-auto min-h-screen max-w-md overflow-hidden bg-background shadow-[0_0_80px_rgba(0,0,0,0.6)] pb-28 pt-16 md:pt-24 lg:max-w-6xl">
        <div className="px-6 py-8">
          <Reveal>
            <div className="mb-12 text-center">
              <span className="font-sans text-[0.65rem] tracking-[0.4em] text-muted-foreground uppercase flex items-center justify-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-gold" />
                Our Journey
              </span>
              <h2 className="mt-2 font-serif text-3xl text-gold">The Love Story</h2>
              <p className="mt-3 font-sans text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                {invite
                  ? `A glimpse into the milestones that brought ${invite.event.host_names} to this celebration.`
                  : 'A glimpse into the milestones that brought us to this celebration.'}
              </p>
            </div>
          </Reveal>

          <div className="relative mx-auto max-w-lg border-l border-gold/20 pl-6 space-y-10 py-4 font-sans">
            {STORIES.map((story, index) => (
              <Reveal key={story.title}>
                <div className="relative">
                  <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold shadow-[0_0_10px_rgba(203,171,94,0.6)]">
                    <Heart className="h-2 w-2 text-background" />
                  </span>

                  <div className="group rounded-[1.5rem] border border-gold/15 bg-card/50 p-5 shadow-lg transition-all duration-300 hover:border-gold/30 hover:bg-card/75">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-serif text-lg font-bold text-gold">{story.year}</span>
                      <span className="font-arabic text-sm text-gold/60">{story.arabicTitle}</span>
                    </div>

                    <h3 className="mt-2 font-serif text-base text-foreground font-semibold flex items-center gap-1.5">
                      {story.title}
                      {index === STORIES.length - 1 && (
                        <Sparkles className="h-4 w-4 text-gold animate-bounce" />
                      )}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {story.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </main>

      <BottomNav
        code={code}
        tier={invite?.event.tier}
        hostNames={invite?.event.host_names}
      />
    </>
  )
}
