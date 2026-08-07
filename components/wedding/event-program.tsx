'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

// Unified theme using CSS variables
const THEME = {
    bg: 'var(--background)',
    gold: 'var(--gold)',
    goldSoft: 'var(--gold-soft)',
    foreground: 'var(--foreground)',
}

interface ScheduleItem {
    time: string
    label: string
    icon: React.ReactNode
}

interface EventProgramProps {
    schedule?: ScheduleItem[]
}

import { SCHEDULE } from '@/lib/wedding.config'
const ICONS = ['✨', '💍', '🍽️', '🎭', '📷', '🎉', '🥂']

const DEFAULT_SCHEDULE: ScheduleItem[] = SCHEDULE.map((s, i) => ({
    time: s.time,
    label: s.label,
    icon: (s as any).icon || ICONS[i % ICONS.length],
}))

function TimelineRow({
    item,
    index,
    total,
    scrollYProgress,
    startProgress,
    endProgress,
}: {
    item: ScheduleItem
    index: number
    total: number
    scrollYProgress: MotionValue<number>
    startProgress: number
    endProgress: number
}) {
    const step = total > 1 ? (endProgress - startProgress) / (total - 1) : 0

    // triggerPoint is the exact moment the line tip touches the center of this exact row
    const triggerPoint = startProgress + index * step

    // We reveal the text just slightly *before* the line touches it so it feels smooth
    const revealStart = Math.max(0, triggerPoint - 0.08)

    const opacity = useTransform(scrollYProgress, [revealStart, triggerPoint], [0, 1])
    const y = useTransform(scrollYProgress, [revealStart, triggerPoint], [15, 0])

    // The dot pops in scaling up as the line hits it
    const scale = useTransform(scrollYProgress, [revealStart, triggerPoint], [0.3, 1])

    return (
        <div className="grid grid-cols-[85px_24px_1fr] relative h-[70px] items-center w-full">
            {/* LEFT: Time */}
            <div className="text-right pr-4">
                <motion.span
                    style={{ opacity, y, color: THEME.gold }}
                    className="block font-sans text-xs sm:text-sm font-bold tracking-wider whitespace-nowrap"
                >
                    {item.time}
                </motion.span>
            </div>

            {/* CENTER: Fixed dot placeholder */}
            <div className="flex justify-center items-center h-full relative z-10">
                <motion.div
                    style={{ backgroundColor: THEME.gold, opacity, scale }}
                    className="w-1.5 h-1.5 rounded-full"
                />
            </div>

            {/* RIGHT: Icon & Label */}
            <div className="pl-4">
                <motion.div
                    style={{ opacity, y, color: THEME.foreground }}
                    className="flex flex-col sm:flex-row sm:items-start sm:gap-2 leading-tight"
                >
                    <span className="text-sm sm:text-base mb-0.5 sm:mb-0">{item.icon}</span>
                    <span className="font-serif text-sm sm:text-base">{item.label}</span>
                </motion.div>
            </div>
        </div>
    )
}

export function EventProgram({ schedule = DEFAULT_SCHEDULE }: EventProgramProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    // Bind animation entirely to the page scroll!
    const { scrollYProgress } = useScroll({
        target: containerRef,
        // "start 75%" means start tracking when the Top of the container reaches 75% point of viewport
        // "end 25%" means stop tracking when Bottom of container reaches 25% point of viewport
        offset: ["start 75%", "end 25%"]
    })

    // Generate random stars on mount to avoid hydration mismatch
    const [stars, setStars] = useState<{ id: number; left: string; top: string; delay: string; duration: string }[]>([])

    useEffect(() => {
        setStars(
            Array.from({ length: 40 }).map((_, i) => ({
                id: i,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                delay: `${Math.random() * 3}s`,
                duration: `${2 + Math.random() * 3}s`,
            }))
        )
    }, [])

    // The actual animation line starts drawing at scrollY=0.2 and finishes drawing at scrollY=0.8
    const START_PROGRESS = 0.2
    const END_PROGRESS = 0.8

    const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1])
    const headingY = useTransform(scrollYProgress, [0, 0.15], [-15, 0])

    // Map the animated height of the line physically mapped to scroll translation percentages
    const lineHeight = useTransform(
        scrollYProgress,
        [START_PROGRESS, END_PROGRESS],
        ["0%", "100%"]
    )

    // Only show the traveling dot after the line starts moving
    const dotOpacity = useTransform(scrollYProgress, [START_PROGRESS - 0.05, START_PROGRESS], [0, 1])

    return (
        <section className="scroll-mt-6 px-4 py-8">
            <div
                ref={containerRef}
                className="relative mx-auto w-full max-w-[480px] overflow-hidden rounded-[2rem] p-8 shadow-2xl border border-gold/15"
                style={{
                    backgroundColor: THEME.bg,
                    backdropFilter: 'blur(12px)',
                    boxShadow: `inset 0 0 10px rgba(203,163,94,0.05), 0 20px 40px rgba(0,0,0,0.5)`
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
                                width: `${Math.max(1, Math.random() * 2)}px`,
                                height: `${Math.max(1, Math.random() * 2)}px`,
                                animationDuration: star.duration,
                                animationDelay: star.delay,
                                opacity: 0.1 + Math.random() * 0.4,
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 flex flex-col items-center w-full">
                    {/* HEADING */}
                    <motion.h2
                        style={{ opacity: headingOpacity, y: headingY, color: THEME.foreground, letterSpacing: '0.4em' }}
                        className="font-sans text-sm tracking-[0.4em] font-semibold uppercase mb-10"
                    >
                        Event Program
                    </motion.h2>

                    {/* TIMELINE TRACK */}
                    <div className="relative w-full">

                        {/* Underlying dull gold track line spanning exact bounds from center of dot 0 to center of dot N */}
                        <div
                            className="absolute top-[35px] bottom-[35px] left-[96px] w-[2px] z-0"
                            style={{ backgroundColor: 'oklch(0.7 0.08 55 / 15%)' }}
                        />

                        {/* The dynamic SCROLL-DRIVEN growing GOLD line container */}
                        <div className="absolute top-[35px] bottom-[35px] left-[96px] w-[2px] z-10">
                            <motion.div
                                className="absolute top-0 w-full"
                                style={{ backgroundColor: THEME.goldSoft, height: lineHeight }}
                            >
                                {/* 
                  Traveling dot anchored perfectly to the bottom edge *of the fill*.
                  Because the height of the fill directly matches the user's scroll depth,
                  this dot stays locked in place relative to the viewport while the page slides behind it!
                */}
                                <motion.div
                                    className="absolute -bottom-1.5 -left-[6px] w-3.5 h-3.5 rounded-full z-20 animate-pulse"
                                    style={{
                                        backgroundColor: THEME.goldSoft,
                                        boxShadow: `0 0 15px 6px oklch(0.7 0.08 55 / 45%)`,
                                        opacity: dotOpacity
                                    }}
                                />
                            </motion.div>
                        </div>

                        {/* Rows Mapping */}
                        <div className="flex flex-col relative z-20">
                            {schedule.map((item, index) => (
                                <TimelineRow
                                    key={item.time}
                                    item={item}
                                    index={index}
                                    total={schedule.length}
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
