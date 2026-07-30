import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import type { InviteResponse } from '@/lib/types'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params

  // Look up the guest by code, joining their event
  const { data: guest, error: guestError } = await supabase
    .from('guests')
    .select('*')
    .eq('code', code)
    .single()

  if (guestError || !guest) {
    return NextResponse.json({ error: 'Invitation not found' }, { status: 404 })
  }

  // Fetch the parent event
  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('*')
    .eq('id', guest.event_id)
    .single()

  if (eventError || !event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 })
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

  const response: InviteResponse = {
    guest,
    event,
  }

  return NextResponse.json(response)
}