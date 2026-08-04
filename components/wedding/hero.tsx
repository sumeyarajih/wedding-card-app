'use client'

import { useEffect, useRef } from 'react'

export function Hero({ isPlaying, onVideoEnd }: { isPlaying: boolean; onVideoEnd?: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(console.error)
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlaying])

  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-end overflow-hidden pb-16 text-center lg:min-h-screen lg:pb-24">
      {/* Full-section video background */}
      <video
        ref={videoRef}
        muted
        playsInline
        onEnded={onVideoEnd}
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero4 section.mp4"
      />

      {/* Light gradient overlay so white/brown theme flows seamlessly into the page background */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, transparent 70%, oklch(var(--background) / 60%) 90%, oklch(var(--background) / 100%) 100%)',
        }}
      />
    </section>
  )
}
