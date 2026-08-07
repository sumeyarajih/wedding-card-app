'use client'

import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { AUDIO } from '@/lib/wedding.config'

type MusicContextType = {
    playing: boolean
    playMusic: () => void
    pauseMusic: () => void
    toggleMusic: () => void
}

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export function MusicProvider({ children }: { children: React.ReactNode }) {
    const [playing, setPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    function playMusic() {
        const audio = audioRef.current
        if (!audio) return
        audio
            .play()
            .then(() => setPlaying(true))
            .catch(() => setPlaying(false))
    }

    function pauseMusic() {
        const audio = audioRef.current
        if (!audio) return
        audio.pause()
        setPlaying(false)
    }

    function toggleMusic() {
        if (playing) {
            pauseMusic()
        } else {
            playMusic()
        }
    }

    return (
        <MusicContext.Provider value={{ playing, playMusic, pauseMusic, toggleMusic }}>
            {children}
            <audio ref={audioRef} loop preload="auto" src={AUDIO.src} />
        </MusicContext.Provider>
    )
}

export function useMusic() {
    const context = useContext(MusicContext)
    if (!context) {
        throw new Error('useMusic must be used within a MusicProvider')
    }
    return context
}