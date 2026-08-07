'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { BottomNav } from '@/components/wedding/bottom-nav'
import { GoldParticles } from '@/components/wedding/gold-particles'
import { Reveal } from '@/components/wedding/reveal'
import { Camera, Heart } from 'lucide-react'
import type { InviteResponse } from '@/lib/types'
import { UploadModal } from '@/components/wedding/upload-modal'

export default function GalleryPage() {
  const params = useParams()
  const code = params.code as string

  const [invite, setInvite] = useState<InviteResponse | null>(null)
  const [uploadOpen, setUploadOpen] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/invite/${code}`)
        if (res.ok) setInvite(await res.json())
      } catch (err) {
        console.error('Invite load error:', err)
      }
    }
    load()
  }, [code])

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

      <main className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden pb-16">
        <GoldParticles count={16} />

        <div className="px-6 py-8 text-center shrink-0 flex flex-col items-center max-w-sm">
          <Reveal>
            <span className="font-sans text-[0.65rem] tracking-[0.4em] text-muted-foreground uppercase flex items-center justify-center gap-1.5 mb-2">
              <Heart className="h-3.5 w-3.5 text-gold animate-pulse" />
              Shared Moments
            </span>
            <h2 className="mb-8 font-serif text-3xl text-gold">Share a Photo</h2>

            <button
              onClick={() => setUploadOpen(true)}
              className="flex flex-col items-center justify-center gap-3 w-56 h-56 rounded-full border-2 border-dashed border-gold/40 bg-gold/5 transition-all hover:bg-gold/10 hover:border-gold hover:scale-105 shadow-xl"
            >
              <Camera className="h-12 w-12 text-gold opacity-80" />
              <span className="font-serif text-lg text-gold">Upload Photo</span>
            </button>
            <p className="mt-8 font-sans text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
              {invite
                ? `Join ${invite.event.host_names}'s album.`
                : 'Share your favorite moments with us.'}
            </p>
          </Reveal>
        </div>
      </main>

      <UploadModal isOpen={uploadOpen} onClose={() => setUploadOpen(false)} code={code} />

      <BottomNav
        code={code}
        tier={invite?.event.tier}
        hostNames={invite?.event.host_names}
      />
    </>
  )
}
