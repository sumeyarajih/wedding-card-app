'use client'

import { Heart } from 'lucide-react'

type PhotoItem = {
    id: string
    src: string
    label: string
    labelAr: string
}

const photos: PhotoItem[] = [
    {
        id: 'bride',
        src: '/bride.jpg',
        label: 'The Bride',
        labelAr: 'العروس',
    },
    {
        id: 'together',
        src: '/groom and bride.jpg',
        label: 'Together',
        labelAr: 'معًا',
    },
]

export function CoupleSlider() {
    return (
        <div className="mb-10 px-2">
            <p className="mb-4 text-center font-sans text-[0.65rem] tracking-[0.35em] text-muted-foreground uppercase flex items-center justify-center gap-1.5">
                <Heart className="h-3 w-3 text-gold animate-pulse" />
                The Couple
            </p>

            <div className="grid grid-cols-2 gap-4">
                {photos.map((photo) => (
                    <div
                        key={photo.id}
                        className="group relative overflow-hidden rounded-2xl border border-gold/20 bg-card shadow-lg transition-all duration-300 hover:border-gold/50 hover:shadow-[0_0_20px_rgba(203,171,94,0.25)]"
                    >
                        <div className="relative aspect-[3/4] w-full overflow-hidden">
                            <img
                                src={photo.src}
                                alt={photo.label}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                            <p className="font-serif text-base font-semibold text-gold">{photo.label}</p>
                            <p className="font-arabic text-sm text-gold/70" dir="rtl">{photo.labelAr}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
