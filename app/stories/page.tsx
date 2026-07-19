'use client'

import React from 'react'
import Image from 'next/image'
import { BottomNav } from '@/components/wedding/bottom-nav'
import { GoldParticles } from '@/components/wedding/gold-particles'
import { Reveal } from '@/components/wedding/reveal'
import { BookOpen, Sparkles, Heart } from 'lucide-react'

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
        description: 'Under the beautiful skies of Riyadh, our paths crossed. A simple introduction sparkled an endless conversation filled with shared laughter, core values, and mutual dreams.',
    },
    {
        year: '2024',
        title: 'The Shared Dreams',
        arabicTitle: 'رؤية مشتركة',
        description: 'Over countess discussions and family gatherings, Kareem & Hana realized they wanted to craft a life of commitment together. Their love flourished through support and deep friendship.',
    },
    {
        year: '2025',
        title: 'The Golden Engagement',
        arabicTitle: 'الخطوبة المباركة',
        description: 'With the blessings of our beloved families, we promised our hearts to another in an intimate ceremony, sealing our commitment and beginning the countdown to our big night.',
    },
    {
        year: '2026',
        title: 'The Marriage Covenant',
        arabicTitle: 'الميثاق الغليظ',
        description: 'Celebrating the start of forever on December 30, 2026 at The Ritz-Carlton, Riyadh. Surrounded by the warmth of our relatives and friends, we embark on this sacred journey.',
    },
]

export default function StoriesPage() {
    return (
        <>
            {/* Desktop framing */}
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
                <GoldParticles count={16} />

                <div className="px-6 py-8">
                    <Reveal>
                        <div className="mb-12 text-center">
                            <span className="font-sans text-[0.65rem] tracking-[0.4em] text-muted-foreground uppercase flex items-center justify-center gap-1.5">
                                <BookOpen className="h-3.5 w-3.5 text-gold" />
                                Our Journey
                            </span>
                            <h2 className="mt-2 font-serif text-3xl text-gold">The Love Story</h2>
                            <p className="mt-3 font-sans text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                                Take a glimpse into the milestones and special moments that brought Kareem & Hana to this beautiful wedding union.
                            </p>
                        </div>
                    </Reveal>

                    {/* Timeline Layout */}
                    <div className="relative mx-auto max-w-lg border-l border-gold/20 pl-6 space-y-10 py-4 font-sans">
                        {STORIES.map((story, index) => (
                            <Reveal key={story.title}>
                                <div className="relative">
                                    {/* Circle Indicator */}
                                    <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold shadow-[0_0_10px_rgba(203,171,94,0.6)]">
                                        <Heart className="h-2 w-2 text-background" />
                                    </span>

                                    {/* Card content */}
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

            {/* Nav */}
            <BottomNav />
        </>
    )
}
