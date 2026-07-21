import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params

  // Look up the guest and their event
  const { data: guest, error: guestError } = await supabase
    .from('guests')
    .select('id, event_id')
    .eq('code', code)
    .single()

  if (guestError || !guest) {
    return NextResponse.json({ error: 'Guest not found' }, { status: 404 })
  }

  // Fetch the event to check tier
  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('tier, id')
    .eq('id', guest.event_id)
    .single()

  if (eventError || !event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 })
  }

  // Only royal tier can upload
  if (event.tier !== 'royal') {
    return NextResponse.json(
      { error: 'Photo uploads are only available for royal-tier events' },
      { status: 403 }
    )
  }

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const caption = (formData.get('caption') as string) || ''
  const sender = (formData.get('sender') as string) || ''

  if (!file) {
    return NextResponse.json({ error: 'File is required' }, { status: 400 })
  }

  // Upload to Supabase Storage
  const timestamp = Date.now()
  const filename = `${timestamp}-${file.name}`
  const filePath = `${guest.event_id}/${guest.id}/${filename}`

  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  const { error: uploadError } = await supabase.storage
    .from('guest-uploads')
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: false,
    })

  if (uploadError) {
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }

  // Get the public URL
  const { data: urlData } = supabase.storage
    .from('guest-uploads')
    .getPublicUrl(filePath)

  const publicUrl = urlData.publicUrl

  // Insert a row into media
  const { data: media, error: mediaError } = await supabase
    .from('media')
    .insert({
      guest_id: guest.id,
      url: publicUrl,
      caption: caption || null,
      sender_name: sender || null,
    })
    .select('*')
    .single()

  if (mediaError) {
    return NextResponse.json({ error: 'Failed to save media record' }, { status: 500 })
  }

  return NextResponse.json(media)
}