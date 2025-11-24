import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { WalletChecker } from './WalletChecker'

interface CountdownTimerProps {
    timeLeft: number
    marketCap: number | null
    fortunePool: number | null
    onStartSimulation?: () => void
}

export function CountdownTimer({ timeLeft, marketCap, fortunePool, onStartSimulation }: CountdownTimerProps) {
    const minutesRef = useRef<HTMLSpanElement>(null)
    const secondsRef = useRef<HTMLSpanElement>(null)

    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    const progress = ((20 * 60 - timeLeft) / (20 * 60)) * 100

    // GSAP number counter animation
    useEffect(() => {
        if (minutesRef.current) {
            gsap.fromTo(
                minutesRef.current,
                { opacity: 0.7, y: -5 },
                { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
            )
        }
        if (secondsRef.current) {
            gsap.fromTo(
                secondsRef.current,
                { opacity: 0.7, y: -5 },
                { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
            )
        }
    }, [minutes, seconds])

    return (
        <motion.div
            className="mascot-frame rounded-3xl p-6 md:p-8 xl:p-10"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-black mb-6 text-center" style={{
                color: '#FFE5B4',
                letterSpacing: '2px'
            }}>
                TIME REMAINING
            </h2>

            <motion.div
                className="text-6xl md:text-7xl xl:text-8xl font-black text-center mb-8"
                style={{
                    color: '#F4E5C3',
                    textShadow: '3px 3px 0 #C4A137, 5px 5px 16px rgba(0, 0, 0, 0.5)'
                }}
                animate={{ scale: timeLeft <= 10 ? [1, 1.05, 1] : 1 }}
                transition={{ duration: 0.5, repeat: timeLeft <= 10 ? Infinity : 0 }}
            >
                <span ref={minutesRef}>{String(minutes).padStart(2, '0')}</span>:<span ref={secondsRef}>{String(seconds).padStart(2, '0')}</span>
            </motion.div>

            {/* Progress Bar */}
            <div className="mb-6">
                <div className="w-full h-4 rounded-full" style={{ background: 'rgba(139, 69, 19, 0.3)' }}>
                    <motion.div
                        className="h-full rounded-full"
                        style={{
                            background: 'linear-gradient(90deg, #D4AF37 0%, #FFE5B4 100%)',
                            width: `${progress}%`
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1 }}
                    />
                </div>
            </div>

            {/* Market Cap */}
            <div className="text-center mb-6">
                <p className="text-lg md:text-xl mb-2" style={{ color: '#FFE5B4', opacity: 0.8 }}>
                    Market Cap
                </p>
                <p className="text-3xl md:text-4xl xl:text-5xl font-black" style={{
                    color: '#F4E5C3',
                    textShadow: '2px 2px 0 #C4A137, 3px 3px 8px rgba(0, 0, 0, 0.4)'
                }}>
                    {marketCap !== null
                        ? `$${marketCap.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                        : 'Loading...'}
                </p>
            </div>

            {/* Fortune Pool */}
            <div className="text-center">
                <p className="text-lg md:text-xl mb-2" style={{ color: '#FFE5B4', opacity: 0.8 }}>
                    Fortune Pool
                </p>
                <p className="text-3xl md:text-4xl xl:text-5xl font-black" style={{
                    color: '#F4E5C3',
                    textShadow: '2px 2px 0 #C4A137, 3px 3px 8px rgba(0, 0, 0, 0.4)'
                }}>
                    {fortunePool !== null
                        ? `$${fortunePool.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                        : 'Loading...'}
                </p>
            </div>

            <WalletChecker onStartSimulation={onStartSimulation} />
        </motion.div>
    )
}
