'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMusic } from '@/lib/music-context'
import {
  Home,
  Camera,
  Image as ImageIcon,
  BookOpen,
  Music,
  Pause,
  PhoneCall,
  Sparkles,
} from 'lucide-react'
import { UploadModal } from './upload-modal'
import { ContactModal } from './contact-modal'

interface BottomNavProps {
  code?: string
  tier?: 'basic' | 'premium' | 'royal'
}

export function BottomNav({ code, tier }: BottomNavProps) {
  const pathname = usePathname()
  const { playing, toggleMusic } = useMusic()
  const [uploadOpen, setUploadOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  function handleUploadSuccess(url: string, caption: string, sender: string) {
    const newItem = {
      id: 'upload-' + Date.now(),
      url,
      caption,
      sender,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    }
    const saved = localStorage.getItem('wedding_gallery_uploads')
    let current = []
    if (saved) {
      try {
        current = JSON.parse(saved)
      } catch (e) {
        console.error(e)
      }
    }
    const updated = [newItem, ...current]
    localStorage.setItem('wedding_gallery_uploads', JSON.stringify(updated))
    window.dispatchEvent(new Event('storage'))
  }

  const items = [
    { label: 'Home', icon: Home, path: '/', action: null },
    { label: 'Photo', icon: ImageIcon, path: '/photo', action: null },
    { label: 'Stories', icon: BookOpen, path: '/stories', action: null },
    { label: 'Upload', icon: Camera, path: null, action: () => setUploadOpen(true) },
    {
      label: playing ? 'Pause' : 'Music',
      icon: playing ? Pause : Music,
      path: null,
      action: toggleMusic,
      highlight: true,
    },
    { label: 'Contact', icon: PhoneCall, path: null, action: () => setContactOpen(true) },
  ]

  return (
    <>
      {/* Mobile Bottom Navbar (Visible only on small viewports) */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 md:hidden">
        <div className="flex w-full max-w-md items-center justify-around rounded-full border border-gold/25 bg-card/70 px-2 py-2 shadow-2xl backdrop-blur-xl">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = item.path ? pathname === item.path : false

            const content = (
              <span className="group flex flex-1 flex-col items-center gap-1 py-1 w-full text-center">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${item.highlight
                    ? 'bg-gold text-background scale-105 active:scale-95 shadow-[0_0_15px_rgba(203,171,94,0.4)]'
                    : isActive
                      ? 'bg-gold/15 text-gold'
                      : 'text-muted-foreground group-hover:text-gold'
                    }`}
                >
                  <Icon className={`h-[1.1rem] w-[1.1rem] ${playing && item.highlight ? 'animate-pulse' : ''}`} />
                </span>
                <span className={`font-sans text-[0.6rem] tracking-wide ${isActive ? 'text-gold font-medium' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
              </span>
            )

            if (item.path) {
              return (
                <Link key={item.label} href={item.path} className="flex-1 flex flex-col items-center">
                  {content}
                </Link>
              )
            }

            return (
              <button
                key={item.label}
                type="button"
                onClick={item.action || undefined}
                className="flex-1 flex flex-col items-center bg-transparent border-none outline-none cursor-pointer"
              >
                {content}
              </button>
            )
          })}
        </div>
      </nav>

      {/* Desktop / Tablet Top Navbar (Visible on md and larger viewports) */}
      <header className="fixed inset-x-0 top-0 z-40 hidden justify-center px-6 py-4 md:flex">
        <div className="flex w-full max-w-5xl items-center justify-between rounded-full border border-gold/15 bg-card/60 px-8 py-3.5 shadow-xl backdrop-blur-xl transition-all duration-300">
          {/* Logo / Brand */}
          <Link href="/" className="group flex items-center gap-2 no-underline">
            <Sparkles className="h-5 w-5 text-gold group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-serif text-lg tracking-wider gold-gradient-text font-semibold">
              Kareem & Hana
            </span>
          </Link>

          {/* Desktop Navigation Menu Links */}
          <div className="flex items-center gap-2 font-sans text-[0.7rem] tracking-[0.15em] uppercase">
            {items.map((item) => {
              const Icon = item.icon
              const isActive = item.path ? pathname === item.path : false

              // Custom layout for top bar buttons
              const renderItem = () => (
                <span className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all duration-300 ${item.highlight
                  ? 'bg-gold text-background font-semibold shadow-[0_0_12px_rgba(203,171,94,0.3)] hover:opacity-90'
                  : isActive
                    ? 'text-gold bg-gold/10'
                    : 'text-muted-foreground hover:text-gold hover:bg-gold/5'
                  }`}>
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                  {playing && item.highlight && (
                    <span className="flex h-1.5 w-1.5 rounded-full bg-background animate-ping" />
                  )}
                </span>
              )

              if (item.path) {
                return (
                  <Link key={item.label} href={item.path} className="no-underline">
                    {renderItem()}
                  </Link>
                )
              }

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.action || undefined}
                  className="cursor-pointer border-none bg-transparent p-0 outline-none"
                >
                  {renderItem()}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      {/* Modals for Camera Upload and Call Support */}
      <UploadModal isOpen={uploadOpen} onClose={() => setUploadOpen(false)} onUploadSuccess={handleUploadSuccess} code={code} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}
