'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type SlideItem = {
    id: string
    src: string
    label: string
    subtitle: string
}

const slides: SlideItem[] = [
    {
        id: 'groom',
        src: '/placeholder-user.jpg',
        label: 'Kareem',
        subtitle: 'كريم',
    },
    {
        id: 'bride',
        src: '/images/hero-gown.png',
        label: 'Hana',
        subtitle: 'هناء',
    },
    {
        id: 'together',
        src: '/placeholder.jpg',
        label: 'Together',
        subtitle: 'معًا',
    },
]

export function CoupleSlider() {
    const scrollRef = useRef<HTMLDivElement | null>(null)

    function scroll(dir: 'left' | 'right') {
        if (!scrollRef.current) return
        scrollRef.current.scrollBy({ left: dir === 'left' ? -220 : 220, behavior: 'smooth' })
    }

    return (
        <div className="relative mb-8 px-2">
            <p className="mb-3 text-center font-sans text-[0.65rem] tracking-[0.35em] text-muted-foreground uppercase">
                The Couple
            </p>

            {/* Scroll buttons */}
            <button
                onClick={() => scroll('left')}
                aria-label="Scroll left"
                className="absolute -left-1 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 bg-card/80 text-gold shadow backdrop-blur-sm transition-colors hover:bg-gold/20"
            >
                <ChevronLeft className="h-4 w-4" />
            </button>
            <button
                onClick={() => scroll('right')}
                aria-label="Scroll right"
                className="absolute -right-1 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 bg-card/80 text-gold shadow backdrop-blur-sm transition-colors hover:bg-gold/20"
            >
                <ChevronRight className="h-4 w-4" />
            </button>

            {/* Scrollable strip */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scroll-smooth px-6 pb-2"
                style={{ scrollbarWidth: 'none' }}
            >
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className="group relative flex-shrink-0 w-40 overflow-hidden rounded-2xl border border-gold/20 bg-card shadow-lg transition-all duration-300 hover:border-gold/50 hover:shadow-[0_0_20px_rgba(203,171,94,0.25)]"
                    >
                        <div className="relative aspect-[3/4] w-full overflow-hidden">
                            <img
                                src={slide.src}
                                alt={slide.label}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                            <p className="font-serif text-base font-semibold text-gold">{slide.label}</p>
                            <p className="font-arabic text-sm text-gold/70" dir="rtl">{slide.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
