'use client'

import React from 'react'
import { X, Phone, MessageSquare, Heart } from 'lucide-react'

interface ContactModalProps {
    isOpen: boolean
    onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
    if (!isOpen) return null

    const contacts = [
        {
            name: 'Fahad (Groom\'s Brother — RSVP Officer)',
            phone: '+966 50 123 4567',
            whatsapp: 'https://wa.me/966501234567',
        },
        {
            name: 'Sarah (Bride\'s Sister — Family Coordinator)',
            phone: '+966 55 987 6543',
            whatsapp: 'https://wa.me/966559876543',
        },
    ]

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
            <div className="relative w-full max-w-sm overflow-hidden rounded-[2rem] border border-gold/30 bg-card p-6 shadow-2xl">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-gold shrink-0" />
                        <h3 className="font-serif text-xl text-gold">Contact & RSVP Support</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-full border border-gold/20 bg-background/40 p-1.5 text-muted-foreground transition-colors hover:text-gold"
                        aria-label="Close modal"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Info */}
                <p className="mb-4 font-sans text-xs text-muted-foreground leading-relaxed">
                    Need help registering your RSVP, sharing photos, or finding the Ritz-Carlton venue? Feel free to reach out to our event organizers:
                </p>

                {/* Contacts list */}
                <div className="space-y-4">
                    {contacts.map((contact) => (
                        <div
                            key={contact.name}
                            className="rounded-2xl border border-gold/15 bg-background/50 p-4 font-sans"
                        >
                            <h4 className="font-medium text-sm text-foreground mb-3">{contact.name}</h4>
                            <div className="grid grid-cols-2 gap-2">
                                <a
                                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                                    className="flex items-center justify-center gap-2 rounded-xl border border-gold/25 bg-gold/10 px-3 py-2 text-xs font-semibold text-gold transition-colors hover:bg-gold/20"
                                >
                                    <Phone className="h-3.5 w-3.5" />
                                    Call
                                </a>
                                <a
                                    href={contact.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 rounded-xl bg-gold px-3 py-2 text-xs font-semibold text-background transition-opacity hover:opacity-90"
                                >
                                    <MessageSquare className="h-3.5 w-3.5" />
                                    WhatsApp
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
