'use client'

import React from 'react'

export function CalendarCard() {
    return (
        <div className="flex justify-center px-5 pb-6">
            <div className="relative w-48 select-none">
                {/* ── Binding rings ── */}
                <div className="absolute -top-3.5 left-0 right-0 z-10 flex justify-around px-8">
                    {[0, 1].map((i) => (
                        <div key={i} className="h-7 w-7 overflow-hidden rounded-full border-[3px] border-gold bg-card shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                            <div className="h-full w-full rounded-full border-[2px] border-gold/40 bg-gradient-to-br from-gold/40 to-background" />
                        </div>
                    ))}
                </div>

                {/* ── Calendar body ── */}
                <div className="overflow-hidden rounded-2xl border border-gold/40 shadow-2xl">
                    {/* Top bar — gold gradient */}
                    <div
                        className="px-3 pt-5 pb-2 text-center"
                        style={{
                            background: 'linear-gradient(160deg, var(--gold), var(--gold-soft))',
                        }}
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-sans text-[0.55rem] tracking-[0.2em] text-background/80 uppercase">أغسطس</span>
                            <span className="font-sans text-[0.55rem] tracking-[0.2em] text-background/80 uppercase">٢٠٢٦</span>
                        </div>
                        <div className="mt-0.5 font-sans text-[0.5rem] tracking-widest text-background/60 uppercase">
                            August 2026
                        </div>
                    </div>

                    {/* White parchment sheet */}
                    <div className="bg-[oklch(0.96_0.02_85)] px-4 pb-5 pt-4 text-center">
                        {/* Big day number */}
                        <div
                            className="font-serif text-7xl font-bold leading-none"
                            style={{
                                background: 'linear-gradient(160deg, var(--gold), var(--foreground))',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            8
                        </div>

                        {/* Divider */}
                        <div className="mx-auto my-2 h-px w-16 bg-gold/30" />

                        {/* Arabic day name */}
                        <p
                            className="font-arabic text-sm font-semibold"
                            dir="rtl"
                            style={{ color: 'var(--foreground)' }}
                        >
                            السبت
                        </p>
                        <p className="mt-1 font-sans text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">
                            Saturday
                        </p>

                        {/* Time */}
                        <div className="mt-2 flex items-center justify-center gap-1">
                            <span
                                className="font-sans text-[0.65rem] font-semibold"
                                style={{ color: 'var(--foreground)' }}
                            >
                                2:00 AM
                            </span>
                        </div>
                    </div>
                </div>

                {/* Gold glow under card */}
                <div className="pointer-events-none absolute -bottom-4 left-4 right-4 h-8 rounded-full bg-gold/20 blur-xl" />
            </div>
        </div>
    )
}
