export interface EventData {
  id: string
  event_type: 'wedding' | 'graduation'
  tier: 'basic' | 'premium' | 'royal'
  host_names: string
  event_date: string
  venue_name: string
  venue_address: string
  map_query: string
  video_url: string | null
  public_slug: string
  created_at: string
}

export interface GuestData {
  id: string
  event_id: string
  code: string
  guest_name: string
  is_checked_in: boolean
  checked_in_at: string | null
  rsvp_status: 'attending' | 'apologizing' | null
  rsvp_guest_count: number | null
  rsvp_message: string | null
  created_at: string
}

export interface InviteResponse {
  guest: GuestData
  event: EventData
}