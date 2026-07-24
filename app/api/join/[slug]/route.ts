import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { nanoid } from 'nanoid'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const { data: event, error } = await supabase
    .from('events')
    .select('id, event_type, tier, host_names, public_slug, video_url')
    .eq('public_slug', slug)
    .single()

  if (error || !event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 })
  }

  return NextResponse.json(event)
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  // Look up the event first
  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('id, tier')
    .eq('public_slug', slug)
    .single()

  if (eventError || !event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 })
  }

  // Basic tier should not use per-guest codes
  if (event.tier === 'basic') {
    return NextResponse.json(
      { error: 'Basic events do not use guest registration' },
      { status: 400 }
    )
  }

  const body = await request.json()
  const { name } = body as { name: string }

  if (!name || !name.trim()) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }

  // Generate a unique code
  const code = nanoid(12)

  const { data: guest, error: insertError } = await supabase
    .from('guests')
    .insert({
      event_id: event.id,
      code,
      guest_name: name.trim(),
    })
    .select('code')
    .single()

  if (insertError) {
    return NextResponse.json({ error: 'Failed to register guest' }, { status: 500 })
  }

  return NextResponse.json({ code: guest.code })
}