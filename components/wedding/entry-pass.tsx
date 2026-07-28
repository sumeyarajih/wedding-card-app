'use client'

import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'

interface EntryPassProps {
  code: string
}

export function EntryPass({ code }: EntryPassProps) {
  // Computing window.location.origin during the render that has to match
  // the server would cause a hydration mismatch (server has no window, so
  // it'd render a different, shorter URL — a different-length string
  // produces a different-sized QR image). Instead: render nothing QR-shaped
  // until after mount, then fill it in — this render happens purely on the
  // client, after hydration already succeeded, so nothing to mismatch.
  const [inviteUrl, setInviteUrl] = useState<string | null>(null)

  useEffect(() => {
    setInviteUrl(`${window.location.origin}/invite/${code}`)
  }, [code])

  return (
    <section className="px-5 py-8">
      <div className="mx-auto max-w-sm rounded-[2rem] border border-gold/25 bg-card p-8 text-center shadow-2xl">
        <div className="mx-auto mb-5 h-px w-16 bg-gold/40" />

        <h2 className="font-serif text-2xl text-gold">Your Entry Pass</h2>
        <p className="mt-1 font-sans text-[0.65rem] tracking-[0.4em] text-muted-foreground uppercase">
          QR Code — Save or Screenshot
        </p>

        <div className="my-6 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gold/40" />
          <span className="text-gold">&#10047;</span>
          <span className="h-px w-10 bg-gold/40" />
        </div>

        <div className="mx-auto flex w-fit items-center justify-center rounded-2xl border border-gold/20 bg-white p-4">
          {inviteUrl ? (
            <QRCodeSVG
              value={inviteUrl}
              size={180}
              level="M"
              fgColor="#1a1a1a"
              bgColor="#ffffff"
            />
          ) : (
            <div className="h-[180px] w-[180px] animate-pulse rounded-lg bg-gold/10" />
          )}
        </div>

        <p className="mt-4 font-sans text-xs text-muted-foreground">
          Show this QR code at the entrance for check-in
        </p>
      </div>
    </section>
  )
}