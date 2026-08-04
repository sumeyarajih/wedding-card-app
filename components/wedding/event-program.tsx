'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { SCHEDULE } from '@/lib/wedding.config'

// Unified theme using CSS variables
const THEME = {
    bg: 'var(--background)',
    gold: 'var(--gold)',
    goldSoft: 'var(--gold-soft)',
    foreground: 'var(--foreground)',
}

// Icons matched to each schedule event
const ICONS = ['✨', '💍', '🕌', '🎶', '🎉']

interface ScheduleRow {
    time: string
    label: string
    labelAr: string
    icon: string
}

const SCHEDULE_ROWS: ScheduleRow[] = SCHEDULE.map((item, i) => ({
    ...item,
    labelAr: (item as { labelAr?: string }).labelAr ?? '',
    icon: ICONS[i] ?? '✨',
}))

function TimelineRow({
    item,
    index,
    total,
    scrollYProgress,
    startProgress,
    endProgress,
}: {
    item: ScheduleRow
    index: number
    total: number
    scrollYProgress: MotionValue<number>
    startProgress: number
    endProgress: number
}) {
    const step = total > 1 ? (endProgress - startProgress) / (total - 1) : 0
    const triggerPoint = startProgress + index * step
    const revealStart = Math.max(0, triggerPoint - 0.08)

    const opacity = useTransform(scrollYProgress, [revealStart, triggerPoint], [0, 1])
    const y = useTransform(scrollYProgress, [revealStart, triggerPoint], [15, 0])
    const scale = useTransform(scrollYProgress, [revealStart, triggerPoint], [0.3, 1])

    return (
        <div className="grid grid-cols-[90px_24px_1fr] relative items-center w-full" style={{ minHeight: '80px' }}>
            {/* LEFT: Time */}
            <div className="text-right pr-4">
                <motion.span
                    style={{ opacity, y, color: THEME.gold }}
                    className="block font-sans text-xs sm:text-sm font-bold tracking-wider whitespace-nowrap"
                >
                    {item.time}
                </motion.span>
            </div>

            {/* CENTER: Dot */}
            <div className="flex justify-center items-center h-full relative z-10">
                <motion.div
                    style={{ backgroundColor: THEME.gold, opacity, scale }}
                    className="w-1.5 h-1.5 rounded-full"
                />
            </div>

            {/* RIGHT: Icon + English + Arabic */}
            <div className="pl-4">
                <motion.div
                    style={{ opacity, y }}
                    className="flex flex-col leading-tight"
                >
                    <div className="flex items-center gap-1.5">
                        <span className="text-sm">{item.icon}</span>
                        <span className="font-serif text-sm sm:text-base" style={{ color: THEME.foreground }}>
                            {item.label}
                        </span>
                    </div>
                    {item.labelAr && (
                        <span
                            className="font-arabic text-xs mt-0.5"
                            dir="rtl"
                            lang="ar"
                            style={{ color: THEME.gold, opacity: 0.75 }}
                        >
                            {item.labelAr}
                        </span>
                    )}
                </motion.div>
            </div>
        </div>
    )
}

export function EventProgram() {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 75%', 'end 25%'],
    })

    const [stars, setStars] = useState<
        { id: number; left: string; top: string; delay: string; duration: string; size: string; opacity: number }[]
    >([])

    useEffect(() => {
        setStars(
            Array.from({ length: 40 }).map((_, i) => ({
                id: i,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                delay: `${Math.random() * 3}s`,
                duration: `${2 + Math.random() * 3}s`,
                size: `${Math.max(1, Math.random() * 2)}px`,
                opacity: 0.1 + Math.random() * 0.4,
            }))
        )
    }, [])

    const START_PROGRESS = 0.2
    const END_PROGRESS = 0.8

    const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1])
    const headingY = useTransform(scrollYProgress, [0, 0.15], [-15, 0])

    const lineHeight = useTransform(scrollYProgress, [START_PROGRESS, END_PROGRESS], ['0%', '100%'])
    const dotOpacity = useTransform(scrollYProgress, [START_PROGRESS - 0.05, START_PROGRESS], [0, 1])

    return (
        <section className="scroll-mt-6 px-4 py-8">
            <div
                ref={containerRef}
                className="relative mx-auto w-full max-w-[480px] overflow-hidden rounded-[2rem] p-8 shadow-2xl border border-gold/15"
                style={{
                    backgroundColor: THEME.bg,
                    backdropFilter: 'blur(12px)',
                    boxShadow: `inset 0 0 10px rgba(203,163,94,0.05), 0 20px 40px rgba(0,0,0,0.5)`,
                }}
            >
                {/* Starfield Background */}
                <div className="absolute inset-0 pointer-events-none">
                    {stars.map((star) => (
                        <div
                            key={star.id}
                            className="absolute animate-pulse rounded-full bg-white"
                            style={{
                                left: star.left,
                                top: star.top,
                                width: star.size,
                                height: star.size,
                                animationDuration: star.duration,
                                animationDelay: star.delay,
                                opacity: star.opacity,
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 flex flex-col items-center w-full">
                    {/* HEADING */}
                    <motion.div
                        style={{ opacity: headingOpacity, y: headingY }}
                        className="mb-10 text-center"
                    >
                        <h2
                            className="font-sans text-sm tracking-[0.4em] font-semibold uppercase"
                            style={{ color: THEME.foreground, letterSpacing: '0.4em' }}
                        >
                            Event Program
                        </h2>
                        <p
                            className="font-arabic text-sm mt-1"
                            dir="rtl"
                            lang="ar"
                            style={{ color: THEME.gold, opacity: 0.8 }}
                        >
                            برنامج الحفل
                        </p>
                        <p className="font-sans text-[0.65rem] tracking-[0.2em] mt-1 text-muted-foreground uppercase">
                            Saturday · August 8, 2026 · 2:00 AM
                        </p>
                    </motion.div>

                    {/* TIMELINE TRACK */}
                    <div className="relative w-full">
                        {/* Background track line */}
                        <div
                            className="absolute top-[40px] bottom-[40px] left-[101px] w-[2px] z-0"
                            style={{ backgroundColor: 'oklch(0.7 0.08 55 / 15%)' }}
                        />

                        {/* Growing gold line */}
                        <div className="absolute top-[40px] bottom-[40px] left-[101px] w-[2px] z-10">
                            <motion.div
                                className="absolute top-0 w-full"
                                style={{ backgroundColor: THEME.goldSoft, height: lineHeight }}
                            >
                                {/* Traveling dot */}
                                <motion.div
                                    className="absolute -bottom-1.5 -left-[6px] w-3.5 h-3.5 rounded-full z-20 animate-pulse"
                                    style={{
                                        backgroundColor: THEME.goldSoft,
                                        boxShadow: `0 0 15px 6px oklch(0.7 0.08 55 / 45%)`,
                                        opacity: dotOpacity,
                                    }}
                                />
                            </motion.div>
                        </div>

                        {/* Rows */}
                        <div className="flex flex-col relative z-20">
                            {SCHEDULE_ROWS.map((item, index) => (
                                <TimelineRow
                                    key={item.time}
                                    item={item}
                                    index={index}
                                    total={SCHEDULE_ROWS.length}
                                    scrollYProgress={scrollYProgress}
                                    startProgress={START_PROGRESS}
                                    endProgress={END_PROGRESS}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
