'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Github, Linkedin, ArrowBigDownDash, Volume2, VolumeX } from 'lucide-react'

export const NavIcons: React.FC<{ classStyle: string }> = ({ classStyle }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [isMuted, setIsMuted] = useState(false)
    const [hasInteracted, setHasInteracted] = useState(false)

    useEffect(() => {
        const handleUserInteraction = () => {
            if (!hasInteracted && audioRef.current && audioRef.current.paused) {
                audioRef.current.play().catch(() => { })
                setHasInteracted(true)
            }
        }

        window.addEventListener('click', handleUserInteraction)
        window.addEventListener('keydown', handleUserInteraction)

        return () => {
            window.removeEventListener('click', handleUserInteraction)
            window.removeEventListener('keydown', handleUserInteraction)
        }
    }, [hasInteracted])

    useEffect(() => {
        const handleScroll = () => {
            if (audioRef.current && !audioRef.current.muted) {
                const scrollTop = window.scrollY
                const docHeight = document.documentElement.scrollHeight - window.innerHeight
                const progress = scrollTop / docHeight
                const maxVolume = 0.75 // 
                const volume = maxVolume * (1 - progress)
                audioRef.current.volume = Math.max(0, Math.min(maxVolume, volume))
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const audio = new Audio('/audio/bg-audio.mp3')
        audio.loop = true
        audio.volume = 0.75
        audioRef.current = audio

        audio
            .play()
            .then(() => setHasInteracted(true))
            .catch(() => {
                // fallback handled by interaction
            })

        return () => {
            audio.pause()
            audioRef.current = null
        }
    }, [])


    return (
        <div className={classStyle}>
            <a href="https://github.com/HUMBLEF0OL" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="w-6 h-6 text-highlight hover:text-primary transition-colors duration-200" />
            </a>
            <a href="https://www.linkedin.com/in/amit-rana-711169183/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6 text-highlight hover:text-primary transition-colors duration-200" />
            </a>
            <a href="https://drive.google.com/file/d/1pSx7lojlNdUS6o4eggL7vDlLBVLoCuBd/view" target='_blank' download aria-label="Download Resume">
                <ArrowBigDownDash className="w-6 h-6 text-highlight hover:text-primary transition-colors duration-200" />
            </a>
        </div>
    )
}

export default NavIcons
