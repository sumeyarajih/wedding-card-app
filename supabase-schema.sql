-- ============================================================
-- Wedding Card App — Database Schema
-- ============================================================
-- Run this in the Supabase SQL Editor to set up the database.
-- ============================================================

-- 1. EVENTS table
CREATE TABLE events (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type  text NOT NULL CHECK (event_type IN ('wedding', 'graduation')),
  tier        text NOT NULL CHECK (tier IN ('basic', 'premium', 'royal')),
  host_names  text NOT NULL,                     -- e.g. "Kareem & Hana"
  event_date  timestamptz NOT NULL,              -- full date+time for countdown
  venue_name  text NOT NULL,                     -- e.g. "The Ritz-Carlton, Riyadh"
  venue_address text NOT NULL,                   -- e.g. "Al Hada District, Riyadh, Saudi Arabia"
  map_query   text NOT NULL,                     -- for Google Maps link, e.g. "The+Ritz-Carlton+Riyadh"
  video_url   text,                              -- nullable, used only for basic tier
  public_slug text NOT NULL UNIQUE DEFAULT substr(md5(random()::text), 1, 8),
  created_at  timestamptz DEFAULT now()
);

-- 2. GUESTS table
CREATE TABLE guests (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id        uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  code            text NOT NULL UNIQUE,          -- generated at registration
  guest_name      text NOT NULL,                 -- captured at registration
  is_checked_in   boolean DEFAULT false,
  checked_in_at   timestamptz,
  rsvp_status     text CHECK (rsvp_status IN ('attending', 'apologizing')),
  rsvp_guest_count int,
  rsvp_message    text,
  created_at      timestamptz DEFAULT now()
);

-- 3. MEDIA table (guest photo uploads)
CREATE TABLE media (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_id    uuid NOT NULL REFERENCES guests(id) ON DELETE CASCADE,
  url         text NOT NULL,
  caption     text,
  sender_name text,
  uploaded_at timestamptz DEFAULT now()
);

-- 4. INDEXES
CREATE INDEX idx_guests_code ON guests(code);
CREATE INDEX idx_guests_event_id ON guests(event_id);
CREATE INDEX idx_events_public_slug ON events(public_slug);
CREATE INDEX idx_media_guest_id ON media(guest_id);