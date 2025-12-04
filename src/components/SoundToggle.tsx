import { motion } from 'framer-motion'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'

interface SoundToggleProps {
  isMuted: boolean
  onToggle: () => void
  isPlaying: boolean
}

export function SoundToggle({ isMuted, onToggle, isPlaying }: SoundToggleProps) {
  if (!isPlaying) return null

  return (
    <motion.button
      onClick={onToggle}
      className="fixed bottom-4 right-4 z-50 p-3 rounded-full"
      style={{
        background: 'linear-gradient(180deg, #8B0000 0%, #600000 100%)',
        color: '#FFD700',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)'
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isMuted ? 'Unmute music' : 'Mute music'}
    >
      {isMuted ? (
        <HiVolumeOff className="w-6 h-6" />
      ) : (
        <HiVolumeUp className="w-6 h-6" />
      )}
    </motion.button>
  )
}
