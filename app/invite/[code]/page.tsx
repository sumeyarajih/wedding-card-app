import { supabase } from '@/lib/supabase'
import type { InviteResponse } from '@/lib/types'
import { InviteClient } from './invite-client'

interface Props {
  params: Promise<{ code: string }>
}

export default async function InvitePage({ params }: Props) {
  const { code } = await params

  // Fetch guest + event data server-side
  const { data: guest, error: guestError } = await supabase
    .from('guests')
    .select('*')
    .eq('code', code)
    .single()

  if (guestError || !guest) {
    return <NotFoundState />
  }

  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('*')
    .eq('id', guest.event_id)
    .single()

  if (eventError || !event) {
    return <NotFoundState />
  }

  // For premium and royal tiers, this single lookup IS the check-in.
  // Mark checked in if not already (idempotent).
  if (
    (event.tier === 'premium' || event.tier === 'royal') &&
    !guest.is_checked_in
  ) {
    await supabase
      .from('guests')
      .update({
        is_checked_in: true,
        checked_in_at: new Date().toISOString(),
      })
      .eq('id', guest.id)
  }

  const data: InviteResponse = { guest, event }

  return <InviteClient data={data} />
}

function NotFoundState() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div className="mx-auto mb-6 h-px w-16 bg-gold/40" />
      <h1 className="font-serif text-3xl text-gold">Invitation Not Found</h1>
      <p className="mt-3 font-sans text-sm text-muted-foreground">
        This invitation could not be verified. Please check your link or
        contact the event host.
      </p>
      <div className="mt-8 mx-auto h-px w-16 bg-gold/40" />
    </div>
  )
}