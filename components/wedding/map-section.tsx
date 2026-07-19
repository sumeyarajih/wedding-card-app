'use client'

import React, { forwardRef } from 'react'
import { MapPin, Navigation, Compass } from 'lucide-react'
import { Reveal } from './reveal'

export const MapSection = forwardRef<HTMLElement>(function MapSection(_props, ref) {
    const directionsUrl = 'https://maps.google.com/maps?q=The+Ritz-Carlton+Riyadh'
    const embedUrl =
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.978252285514!2d46.62680457618037!3d24.693444451792618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f1cd8f8dc1c7b%3A0x6b8bc22db0c0b388!2sThe%20Ritz-Carlton%2C%20Riyadh!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa'

    return (
        <section ref={ref} className="scroll-mt-20 px-5 py-8" id="venue-map">
            <Reveal>
                <div className="mb-6 text-center">
                    <p className="font-sans text-[0.65rem] tracking-[0.4em] text-muted-foreground uppercase flex items-center justify-center gap-1.5">
                        <Compass className="h-3.5 w-3.5 text-gold animate-spin-slow" />
                        Where & When
                    </p>
                    <h2 className="mt-2 font-serif text-3xl text-gold">The Venue Map</h2>
                </div>
            </Reveal>

            <Reveal>
                <div className="mx-auto max-w-md overflow-hidden rounded-[2rem] border border-gold/25 bg-card p-6 shadow-xl lg:max-w-3xl">
                    <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <MapPin className="mt-1 h-5 w-5 text-gold shrink-0" />
                            <div className="font-sans text-left">
                                <h4 className="font-serif text-lg text-foreground font-semibold">The Ritz-Carlton, Riyadh</h4>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Al Hada Area, Mekkah Road, Riyadh, Saudi Arabia
                                </p>
                            </div>
                        </div>

                        <a
                            href={directionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-5 py-2.5 font-sans text-xs font-semibold text-gold transition-colors hover:bg-gold/20"
                        >
                            <Navigation className="h-3.5 w-3.5" />
                            Get Directions
                        </a>
                    </div>

                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-gold/15 bg-background">
                        <iframe
                            src={embedUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="The Ritz-Carlton, Riyadh Venue Map"
                            className="absolute inset-0 h-full w-full opacity-80 filter invert-[90%] hue-rotate-[180deg] contrast-[85%]"
                        />
                    </div>
                </div>
            </Reveal>
        </section>
    )
})
