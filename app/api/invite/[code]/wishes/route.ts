import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params

  // Resolve the guest's event first
  const { data: guest, error: guestError } = await supabase
    .from('guests')
    .select('event_id')
    .eq('code', code)
    .single()

  if (guestError || !guest) {
    return NextResponse.json({ error: 'Invitation not found' }, { status: 404 })
  }

  const { data: eventGuests, error: guestsError } = await supabase
    .from('guests')
    .select('guest_name, rsvp_status, rsvp_guest_count, rsvp_message, rsvp_submitted_at')
    .eq('event_id', guest.event_id)

  if (guestsError || !eventGuests) {
    return NextResponse.json({ error: 'Failed to load wishes' }, { status: 500 })
  }

  const wishes = eventGuests
    .filter((g) => g.rsvp_message)
    .sort((a, b) => {
      const aTime = a.rsvp_submitted_at ? new Date(a.rsvp_submitted_at).getTime() : 0
      const bTime = b.rsvp_submitted_at ? new Date(b.rsvp_submitted_at).getTime() : 0
      return bTime - aTime
    })
    .map((g) => ({
      name: g.guest_name || 'A Guest',
      message: g.rsvp_message,
      status: g.rsvp_status,
    }))

  const confirmedCount = eventGuests
    .filter((g) => g.rsvp_status === 'attending')
    .reduce((sum, g) => sum + (g.rsvp_guest_count || 1), 0)

  return NextResponse.json({ wishes, confirmedCount })
}
