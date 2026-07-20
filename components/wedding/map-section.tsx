'use client'

import React, { forwardRef } from 'react'
import { MapPin, Navigation, Compass } from 'lucide-react'
import { Reveal } from './reveal'

interface MapSectionProps {
  venueName?: string
  venueAddress?: string
  mapQuery?: string
}

const DEFAULT_VENUE = 'The Ritz-Carlton, Riyadh'
const DEFAULT_ADDRESS = 'Al Hada Area, Mekkah Road, Riyadh, Saudi Arabia'
const DEFAULT_MAP_QUERY = 'The+Ritz-Carlton+Riyadh'

export const MapSection = forwardRef<HTMLElement, MapSectionProps>(function MapSection(
  {
    venueName = DEFAULT_VENUE,
    venueAddress = DEFAULT_ADDRESS,
    mapQuery = DEFAULT_MAP_QUERY,
  },
  ref,
) {
    const directionsUrl = `https://maps.google.com/maps?q=${mapQuery}`
    const embedUrl = `https://www.google.com/maps/embed/v1/place?key=&q=${mapQuery}`

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
                                <h4 className="font-serif text-lg text-foreground font-semibold">{venueName}</h4>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {venueAddress}
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
                            title={`${venueName} Venue Map`}
                            className="absolute inset-0 h-full w-full opacity-80 filter invert-[90%] hue-rotate-[180deg] contrast-[85%]"
                        />
                    </div>
                </div>
            </Reveal>
        </section>
    )
})
