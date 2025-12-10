import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FaTelegramPlane, FaDiscord, FaGlobe } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTokenStream } from './hooks/useTokenStream'
import { useBackgroundMusic } from './hooks/useBackgroundMusic'
import { Marquee } from './components/Marquee'
import { CountdownTimer } from './components/CountdownTimer'
import { CompactStepper } from './components/CompactStepper'
import { StickyMiniBar } from './components/StickyMiniBar'
import { SocialButton } from './components/SocialButton'
import { BuyFeed } from './components/BuyFeed'
import { SoundToggle } from './components/SoundToggle'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const gameSectionRef = useRef<HTMLDivElement>(null)
  const [timeLeft, setTimeLeft] = useState(20 * 60)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  // Background music - starts on first user interaction
  const { isPlaying, isMuted, toggleMute } = useBackgroundMusic('/hype-music.mp3')

  // Use custom hook for data logic
  const { marketCap, fortunePool, buyEvents, topHolders, startSimulation, startTime } = useTokenStream()

  // Timer Logic
  useEffect(() => {
    if (startTime) {
      setIsTimerRunning(true)
    }
  }, [startTime])

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isTimerRunning && startTime) {
      // Immediate update
      const updateTimer = () => {
        const now = Date.now()
        const elapsedSeconds = Math.floor((now - startTime) / 1000)
        const remaining = Math.max(0, (20 * 60) - elapsedSeconds)
        setTimeLeft(remaining)
      }

      updateTimer() // Run once immediately
      timer = setInterval(updateTimer, 1000)
    } else if (isTimerRunning && !startTime) {
      // Fallback if manually started without server sync (shouldn't happen often)
      // But for consistency, let's just wait for startTime
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isTimerRunning, startTime])

  const handleStartSimulation = () => {
    // Optimistic start
    const now = Date.now()
    setIsTimerRunning(true)
    startSimulation(now)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-red-900 via-red-950 to-black">
      <style>{`
        .bg-fortune {
          background-image: url('/444background.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .bg-game {
          background-image: url('/gamebackground.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      `}</style>

      <Marquee text="✦ 444 FORTUNES ✦ PROSPERITY ✦ ABUNDANCE ✦ GOOD LUCK ✦" />

      <section className="relative flex items-center px-4 py-12 md:py-16 bg-fortune" style={{ minHeight: '70vh' }}>
        <div className="absolute inset-0 bg-black opacity-25" />
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 xl:gap-10 items-center">
          <motion.div
            className="z-10 flex items-center justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative w-64 h-80 md:w-72 md:h-96 xl:w-80 xl:h-[30rem] rounded-3xl overflow-hidden mascot-frame"
              style={{ willChange: 'transform' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2, ease: 'easeOut' }
              }}
            >
              <img
                src="/heyyi.webp"
                alt="Heyyi - Prosperity Goddess"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="z-10 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-8 md:mb-12">
              <motion.div
                className="fortune-number text-7xl md:text-8xl xl:text-9xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, type: 'spring', bounce: 0.5 }}
              >
                444
              </motion.div>

              <motion.h1
                className="fortune-text text-5xl md:text-6xl xl:text-7xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                FORTUNES
              </motion.h1>
            </div>

            <motion.div
              className="w-24 h-px mx-auto mb-8 md:mb-10"
              style={{
                background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
                boxShadow: '0 1px 3px rgba(212, 175, 55, 0.5)'
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />

            <motion.div
              className="mb-8 md:mb-12 space-y-2 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="text-lg md:text-xl font-bold text-subtitle-gold">
                PROSPERITY
              </div>
              <div className="text-lg md:text-xl font-bold text-subtitle-gold">
                ABUNDANCE
              </div>
              <div className="text-lg md:text-xl font-bold text-subtitle-gold">
                LUCK
              </div>
            </motion.div>

            <motion.div
              className="flex gap-3 md:gap-4 mb-8 md:mb-12 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <SocialButton icon={FaXTwitter} href="https://x.com/444Fortune" label="X" />
              <SocialButton icon={FaTelegramPlane} href="#" label="Telegram" />
              <SocialButton icon={FaDiscord} href="#" label="Discord" />
              <SocialButton icon={FaGlobe} href="#" label="Website" />
            </motion.div>

            <motion.a
              href="https://four.meme/token/0xc8ed6bf586dc181a5366444a87c1f80f06c84444"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-6 text-2xl rounded-full cta-button-3d inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              whileHover={{
                y: 3,
                boxShadow: '0 5px 0 #B8960B, 0 9px 16px rgba(0, 0, 0, 0.3)'
              }}
              whileTap={{
                y: 6,
                boxShadow: '0 2px 0 #B8960B, 0 6px 12px rgba(0, 0, 0, 0.3)'
              }}
            >
              BUY $FORTUNE
            </motion.a>
          </motion.div>

          <motion.div
            className="z-10 flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative w-64 h-80 md:w-72 md:h-96 xl:w-80 xl:h-[30rem] rounded-3xl overflow-hidden flex items-center justify-center mascot-frame"
              style={{ willChange: 'transform' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6, type: 'spring' }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2, ease: 'easeOut' }
              }}
            >
              <img
                src="/cz.webp"
                alt="CZ - Modern Fortune Bringer"
                className="w-full h-full object-cover"
                style={{ objectPosition: '44% 50%' }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Marquee text="✦ JOIN 444 FORTUNES ✦ PROSPERITY AWAITS ✦ GOOD LUCK ✦" />

      <StickyMiniBar timeLeft={timeLeft} fortunePool={fortunePool} />

      <section ref={gameSectionRef} className="relative pt-16 md:pt-24 xl:pt-32 pb-20 md:pb-32 xl:pb-40 px-4 bg-game">
        <div className="absolute inset-0 bg-black opacity-25" />
        <div className="max-w-7xl mx-auto relative z-10 space-y-8 md:space-y-10 xl:space-y-12">
          {/* Two-column layout: Countdown | How It Works */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 xl:gap-12">
            {/* Left Column - Countdown with Fortune Pool */}
            <CountdownTimer
              timeLeft={timeLeft}
              marketCap={marketCap}
              fortunePool={fortunePool}
              onStartSimulation={handleStartSimulation}
            />

            {/* Right Column - Compact Stepper */}
            <CompactStepper />
          </div>

          {/* Full-width Buy Feed */}
          <BuyFeed buyEvents={buyEvents} topHolders={topHolders} />
        </div>
      </section>

      <Marquee text="✦ JOIN 444 FORTUNES ✦ PROSPERITY AWAITS ✦ GOOD LUCK ✦" />

      <SoundToggle isPlaying={isPlaying} isMuted={isMuted} onToggle={toggleMute} />
    </div>
  )
}

export default App
