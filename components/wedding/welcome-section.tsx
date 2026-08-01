'use client'

import { COUPLE, WEDDING_DATE } from '@/lib/wedding.config'
import { Reveal } from './reveal'

export function WelcomeSection() {
    return (
        <section className="px-5 pb-16 pt-10 text-center">
            <Reveal>
                <p className="mb-4 font-sans text-[0.7rem] tracking-[0.55em] text-gold uppercase">
                    The Wedding Of
                </p>
                <h1 className="gold-gradient-text font-serif text-6xl leading-none font-medium text-balance sm:text-7xl lg:text-8xl">
                    {COUPLE.groomName}
                </h1>
                <span className="my-2 block font-serif text-3xl text-muted-foreground italic lg:text-4xl text-center">
                    &amp;
                </span>
                <h1 className="gold-gradient-text font-serif text-6xl leading-none font-medium text-balance sm:text-7xl lg:text-8xl">
                    {COUPLE.brideName}
                </h1>

                <div className="mt-8 flex flex-col items-center gap-1">
                    <div className="h-px w-16 bg-gold/50" />
                    <p className="mt-4 font-sans text-sm tracking-[0.15em] text-foreground/90">
                        {WEDDING_DATE.longEnglish}
                    </p>
                    <p className="font-sans text-sm tracking-[0.15em] text-foreground/70">
                        {WEDDING_DATE.timeEnglish}
                    </p>
                    <p
                        dir="rtl"
                        className="mt-2 font-arabic text-lg text-gold/90"
                        lang="ar"
                    >
                        {WEDDING_DATE.dayNameAr} {WEDDING_DATE.dayNumber} {WEDDING_DATE.monthNameAr} {WEDDING_DATE.yearAr} — {WEDDING_DATE.timeArabic}
                    </p>
                </div>
            </Reveal>
        </section>
    )
}
