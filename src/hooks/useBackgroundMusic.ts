import { useState, useEffect, useRef, useCallback } from 'react'

export function useBackgroundMusic(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const hasStartedRef = useRef(false)

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0.5
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [src])

  const startMusic = useCallback(() => {
    if (hasStartedRef.current || !audioRef.current) return

    audioRef.current.play()
      .then(() => {
        hasStartedRef.current = true
        setIsPlaying(true)
      })
      .catch(() => {
        // Autoplay blocked, will try again on next interaction
      })
  }, [])

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return

    const newMuted = !isMuted
    audioRef.current.muted = newMuted
    setIsMuted(newMuted)
  }, [isMuted])

  // Set up global interaction listeners to start music ASAP
  useEffect(() => {
    const events = ['click', 'touchstart', 'keydown', 'scroll', 'mousemove']

    const handleInteraction = () => {
      startMusic()
      // Remove listeners after successful start
      if (hasStartedRef.current) {
        events.forEach(event => {
          document.removeEventListener(event, handleInteraction)
        })
      }
    }

    events.forEach(event => {
      document.addEventListener(event, handleInteraction, { passive: true })
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction)
      })
    }
  }, [startMusic])

  return { isPlaying, isMuted, toggleMute, startMusic }
}
