'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { BottomNav } from '@/components/wedding/bottom-nav'
import { GoldParticles } from '@/components/wedding/gold-particles'
import { Reveal } from '@/components/wedding/reveal'
import { CoupleSlider } from '@/components/wedding/couple-slider'
import { Camera, Heart, ZoomIn, Calendar, Loader2 } from 'lucide-react'
import type { InviteResponse } from '@/lib/types'

type MediaItem = {
  id: string
  url: string
  caption: string | null
  sender_name: string | null
  uploaded_at: string
}

export default function GalleryPage() {
  const params = useParams()
  const code = params.code as string

  const [invite, setInvite] = useState<InviteResponse | null>(null)
  const [photos, setPhotos] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activePhoto, setActivePhoto] = useState<MediaItem | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const [inviteRes, galleryRes] = await Promise.all([
          fetch(`/api/invite/${code}`),
          fetch(`/api/invite/${code}/gallery`),
        ])
        if (inviteRes.ok) setInvite(await inviteRes.json())
        if (galleryRes.ok) {
          const { media } = await galleryRes.json()
          setPhotos(media)
        }
      } catch (err) {
        console.error('Gallery load error:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [code])

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

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
                {invite
                  ? `Moments shared by ${invite.event.host_names}'s guests.`
                  : 'Moments shared by fellow guests.'}
              </p>
            </div>
          </Reveal>

          {loading && (
            <div className="flex justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-gold" />
            </div>
          )}

          <CoupleSlider />

          {!loading && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((photo) => (
                <Reveal key={photo.id}>
                  <div
                    className="group relative overflow-hidden rounded-2xl border border-gold/15 bg-card/40 transition-all duration-300 hover:border-gold/45 cursor-pointer shadow-md"
                    onClick={() => setActivePhoto(photo)}
                  >
                    <div className="relative aspect-square w-full overflow-hidden bg-background/50">
                      <img
                        src={photo.url}
                        alt={photo.caption || 'Shared moment'}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4">
                        <ZoomIn className="absolute top-4 right-4 h-5 w-5 text-gold/80" />
                        <p className="font-serif text-sm text-foreground">{photo.caption}</p>
                        <p className="font-sans text-[0.7rem] text-gold mt-1">
                          Shared by {photo.sender_name || 'Anonymous Guest'}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between font-sans md:hidden">
                      <div>
                        <p className="text-xs font-semibold text-foreground truncate max-w-[200px]">
                          {photo.caption}
                        </p>
                        <p className="text-[0.65rem] text-gold mt-0.5">
                          By {photo.sender_name || 'Anonymous Guest'}
                        </p>
                      </div>
                      <span className="text-[0.6rem] text-muted-foreground">
                        {formatDate(photo.uploaded_at)}
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {!loading && photos.length === 0 && (
            <div className="text-center py-20 border border-dashed border-gold/15 rounded-2xl">
              <Camera className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
              <p className="font-serif text-base text-gold">No photos uploaded yet</p>
              <p className="font-sans text-xs text-muted-foreground mt-1">
                {invite?.event.tier === 'royal'
                  ? 'Tap the camera icon to upload yours!'
                  : 'Check back after the celebration.'}
              </p>
            </div>
          )}
        </div>
      </main>

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
                alt={activePhoto.caption || 'Shared moment'}
                className="max-h-[60vh] max-w-full object-contain"
              />
            </div>
            <div className="mt-4 px-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-gold/10 pt-3">
              <div className="text-left">
                <p className="font-serif text-base text-gold font-medium">{activePhoto.caption}</p>
                <div className="flex items-center gap-1.5 mt-1 font-sans text-xs text-muted-foreground">
                  <span>Uploaded by:</span>
                  <span className="text-foreground font-medium">
                    {activePhoto.sender_name || 'Anonymous Guest'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 font-sans text-xs text-muted-foreground self-end sm:self-center shrink-0">
                <Calendar className="h-3.5 w-3.5 text-gold/60" />
                <span>{formatDate(activePhoto.uploaded_at)}</span>
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

      <BottomNav
        code={code}
        tier={invite?.event.tier}
        hostNames={invite?.event.host_names}
      />
    </>
  )
}
