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

  // All guests belonging to this event
  const { data: eventGuests, error: guestsError } = await supabase
    .from('guests')
    .select('id')
    .eq('event_id', guest.event_id)

  if (guestsError || !eventGuests) {
    return NextResponse.json({ error: 'Failed to load gallery' }, { status: 500 })
  }

  const guestIds = eventGuests.map((g) => g.id)
  if (guestIds.length === 0) {
    return NextResponse.json({ media: [] })
  }

  const { data: media, error: mediaError } = await supabase
    .from('media')
    .select('*')
    .in('guest_id', guestIds)
    .order('uploaded_at', { ascending: false })

  if (mediaError) {
    return NextResponse.json({ error: 'Failed to load gallery' }, { status: 500 })
  }

  return NextResponse.json({ media: media ?? [] })
}
