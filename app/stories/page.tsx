'use client'

import React from 'react'
import { BottomNav } from '@/components/wedding/bottom-nav'
import { PageBackground } from '@/components/wedding/page-background'
import { Reveal } from '@/components/wedding/reveal'
import { BookOpen, Heart } from 'lucide-react'
import { LOVE_STORY, COUPLE } from '@/lib/wedding.config'

export default function StoriesPage() {
    return (
        <>
            <PageBackground />

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
                                A glimpse into the beautiful journey that brought {COUPLE.groomName} &amp; {COUPLE.brideName} together.
                            </p>
                        </div>
                    </Reveal>

                    {/* Story Cards */}
                    <div className="relative mx-auto max-w-lg space-y-6 py-4">
                        {LOVE_STORY.map((story) => (
                            <Reveal key={story.title}>
                                <div className="group rounded-[1.5rem] border border-gold/20 bg-card/60 p-6 shadow-xl transition-all duration-300 hover:border-gold/40 hover:bg-card/80">
                                    {/* Arabic title top-right */}
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 shadow-[0_0_10px_rgba(203,171,94,0.3)]">
                                                <Heart className="h-4 w-4 text-gold" />
                                            </span>
                                            <h3 className="font-serif text-lg font-semibold text-gold">{story.title}</h3>
                                        </div>
                                        <span className="font-arabic text-base text-gold/60 shrink-0" dir="rtl">
                                            {story.titleAr}
                                        </span>
                                    </div>

                                    <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                                        {story.description}
                                    </p>
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
