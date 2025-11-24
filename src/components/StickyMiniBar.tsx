import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface StickyMiniBarProps {
    timeLeft: number
    fortunePool: number | null
}

export function StickyMiniBar({ timeLeft, fortunePool }: StickyMiniBarProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 800)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 z-50 bg-marquee-gold py-3 px-4"
            initial={{ y: -100 }}
            animate={{ y: isVisible ? 0 : -100 }}
            transition={{ duration: 0.3 }}
            style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 md:gap-8">
                    <div className="text-lg md:text-xl font-black" style={{ color: '#8B0000' }}>
                        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </div>
                    <div className="hidden md:block text-lg font-bold" style={{ color: '#8B0000' }}>
                        Fortune Pool: {fortunePool !== null ? `$${fortunePool.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : 'Loading...'}
                    </div>
                </div>
                <motion.button
                    className="px-6 py-2 md:px-8 md:py-3 text-base md:text-lg font-black rounded-full"
                    style={{
                        background: 'linear-gradient(180deg, #8B0000 0%, #600000 100%)',
                        color: '#FFE5B4',
                        boxShadow: '0 4px 0 #400000, 0 6px 12px rgba(0, 0, 0, 0.3)'
                    }}
                    whileHover={{ y: 2, boxShadow: '0 2px 0 #400000, 0 4px 8px rgba(0, 0, 0, 0.3)' }}
                    whileTap={{ y: 4, boxShadow: '0 0px 0 #400000, 0 2px 4px rgba(0, 0, 0, 0.3)' }}
                >
                    BUY $FORTUNE
                </motion.button>
            </div>
        </motion.div>
    )
}
