'use client'

import {
  CalendarHeart,
  MapPin,
  MessageCircle,
  Music,
  Pause,
  Mail,
} from 'lucide-react'

export function BottomNav({
  playing,
  onToggleMusic,
  onLocation,
  onSaveDate,
  onCongratulate,
  onContact,
}: {
  playing: boolean
  onToggleMusic: () => void
  onLocation: () => void
  onSaveDate: () => void
  onCongratulate: () => void
  onContact: () => void
}) {
  const items = [
    { label: 'RSVP', icon: Mail, onClick: onContact },
    { label: 'Location', icon: MapPin, onClick: onLocation },
    {
      label: playing ? 'Pause' : 'Music',
      icon: playing ? Pause : Music,
      onClick: onToggleMusic,
      highlight: true,
    },
    { label: 'Save Date', icon: CalendarHeart, onClick: onSaveDate },
    { label: 'Wishes', icon: MessageCircle, onClick: onCongratulate },
  ]

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4">
      <div className="flex w-full max-w-md items-center justify-around rounded-full border border-gold/25 bg-card/70 px-2 py-2 shadow-2xl backdrop-blur-xl">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              aria-label={item.label}
              className="group flex flex-1 flex-col items-center gap-1 py-1"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                  item.highlight
                    ? 'bg-gold text-background'
                    : 'text-muted-foreground group-hover:text-gold'
                }`}
              >
                <Icon className="h-[1.1rem] w-[1.1rem]" />
              </span>
              <span className="font-sans text-[0.6rem] tracking-wide text-muted-foreground">
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
