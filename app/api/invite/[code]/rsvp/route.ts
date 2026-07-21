import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params

  // Look up the guest first
  const { data: guest, error: guestError } = await supabase
    .from('guests')
    .select('id')
    .eq('code', code)
    .single()

  if (guestError || !guest) {
    return NextResponse.json({ error: 'Guest not found' }, { status: 404 })
  }

  const body = await request.json()
  const { status, guests, message } = body as {
    status: 'attending' | 'apologizing'
    guests: number
    message: string
  }

  if (!status || !['attending', 'apologizing'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  const { data: updatedGuest, error: updateError } = await supabase
    .from('guests')
    .update({
      rsvp_status: status,
      rsvp_guest_count: guests ?? null,
      rsvp_message: message ?? null,
    })
    .eq('id', guest.id)
    .select('*')
    .single()

  if (updateError) {
    return NextResponse.json({ error: 'Failed to update RSVP' }, { status: 500 })
  }

  return NextResponse.json(updatedGuest)
}