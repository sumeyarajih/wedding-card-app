'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BottomNav } from '@/components/wedding/bottom-nav'
import { GoldParticles } from '@/components/wedding/gold-particles'
import { Reveal } from '@/components/wedding/reveal'
import { Camera, Heart, Sparkles, ZoomIn, Calendar } from 'lucide-react'

type PhotoItem = {
    id: string
    url: string
    caption: string
    sender: string
    date: string
}

const DEFAULT_PHOTOS: PhotoItem[] = [
    {
        id: 'p1',
        url: '/images/hero-gown.png',
        caption: 'The beautiful bridal gown details',
        sender: 'Kareem & Hana',
        date: 'Dec 30, 2026',
    },
    {
        id: 'p2',
        url: '/placeholder.jpg',
        caption: 'Golden lights and Ritz-Carlton Riyadh ballroom setup',
        sender: 'Sarah (Bridesmaid)',
        date: 'Dec 30, 2026',
    },
    {
        id: 'p3',
        url: '/placeholder-user.jpg',
        caption: 'Celebrating our union with close friends',
        sender: 'Fahad (Groomsman)',
        date: 'Dec 30, 2026',
    },
]

export default function GalleryPage() {
    const [photos, setPhotos] = useState<PhotoItem[]>(DEFAULT_PHOTOS)
    const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null)

    // Sync with uploaded photos from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('wedding_gallery_uploads')
        if (saved) {
            try {
                const parsed = JSON.parse(saved) as PhotoItem[]
                setPhotos((prev) => [...parsed, ...prev])
            } catch (e) {
                console.error('Error parsing localStorage uploads:', e)
            }
        }

        // Set up a listener for storage events (if they upload from another page/tab of the same app)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'wedding_gallery_uploads') {
                try {
                    const parsed = JSON.parse(e.newValue || '[]') as PhotoItem[]
                    // Merge parsed uploads ahead of static photos
                    const uniqueUploadIds = new Set(parsed.map(p => p.id))
                    const filteredDefaults = DEFAULT_PHOTOS.filter(p => !uniqueUploadIds.has(p.id))
                    setPhotos([...parsed, ...filteredDefaults])
                } catch (e) {
                    console.error(e)
                }
            }
        }
        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [])

    return (
        <>
            {/* Desktop framing: Riyadh bg */}
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
                        <div className="mb-8 text-center">
                            <span className="font-sans text-[0.65rem] tracking-[0.4em] text-muted-foreground uppercase flex items-center justify-center gap-1.5">
                                <Heart className="h-3.5 w-3.5 text-gold animate-pulse" />
                                Shared Moments
                            </span>
                            <h2 className="mt-2 font-serif text-3xl text-gold">The Photo Gallery</h2>
                            <p className="mt-3 font-sans text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                                Take a look at key moments of Kareem & Hanna, or snap one yourself to add to the guest walls.
                            </p>
                        </div>
                    </Reveal>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {photos.map((photo, index) => (
                            <Reveal key={photo.id}>
                                <div
                                    className="group relative overflow-hidden rounded-2xl border border-gold/15 bg-card/40 transition-all duration-300 hover:border-gold/45 cursor-pointer shadow-md"
                                    onClick={() => setActivePhoto(photo)}
                                >
                                    <div className="relative aspect-square w-full overflow-hidden bg-background/50">
                                        <img
                                            src={photo.url}
                                            alt={photo.caption}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4">
                                            <ZoomIn className="absolute top-4 right-4 h-5 w-5 text-gold/80" />
                                            <p className="font-serif text-sm text-foreground">{photo.caption}</p>
                                            <p className="font-sans text-[0.7rem] text-gold mt-1">Shared by {photo.sender}</p>
                                        </div>
                                    </div>
                                    <div className="p-4 flex items-center justify-between font-sans md:hidden">
                                        <div>
                                            <p className="text-xs font-semibold text-foreground truncate max-w-[200px]">{photo.caption}</p>
                                            <p className="text-[0.65rem] text-gold mt-0.5">By {photo.sender}</p>
                                        </div>
                                        <span className="text-[0.6rem] text-muted-foreground">{photo.date}</span>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    {photos.length === 0 && (
                        <div className="text-center py-20 border border-dashed border-gold/15 rounded-2xl">
                            <Camera className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                            <p className="font-serif text-base text-gold">No photos uploaded yet</p>
                            <p className="font-sans text-xs text-muted-foreground mt-1">Tap the camera icon to upload yours!</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Lightbox Modal */}
            {activePhoto && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md cursor-zoom-out"
                    onClick={() => setActivePhoto(null)}
                >
                    <div
                        className="relative max-w-3xl w-full max-h-[85vh] overflow-hidden rounded-2xl border border-gold/25 bg-card/90 p-3 shadow-2xl flex flex-col justify-between"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full overflow-hidden rounded-xl bg-black flex-1 flex items-center justify-center">
                            <img
                                src={activePhoto.url}
                                alt={activePhoto.caption}
                                className="max-h-[60vh] max-w-full object-contain"
                            />
                        </div>
                        <div className="mt-4 px-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-gold/10 pt-3">
                            <div className="text-left">
                                <p className="font-serif text-base text-gold font-medium">{activePhoto.caption}</p>
                                <div className="flex items-center gap-1.5 mt-1 font-sans text-xs text-muted-foreground">
                                    <span>Uploaded by:</span>
                                    <span className="text-foreground font-medium">{activePhoto.sender}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 font-sans text-xs text-muted-foreground self-end sm:self-center shrink-0">
                                <Calendar className="h-3.5 w-3.5 text-gold/60" />
                                <span>{activePhoto.date}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setActivePhoto(null)}
                            className="absolute top-4 right-4 rounded-full border border-gold/30 bg-card p-1.5 text-muted-foreground transition-colors hover:text-gold"
                        >
                            <span className="sr-only">Close Lightbox</span>
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Nav */}
            <BottomNav />
        </>
    )
}
