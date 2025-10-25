import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FaTwitter, FaTelegramPlane, FaDiscord, FaGlobe } from 'react-icons/fa'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Marquee({ text }: { text: string }) {
  const repetitions = Array.from({ length: 6 }, (_, i) => i)

  return (
    <div className="overflow-hidden whitespace-nowrap py-5 bg-marquee-gold">
      <div className="inline-block animate-marquee-slow">
        {repetitions.map(i => (
          <span key={`a-${i}`} className="marquee-text">{text}</span>
        ))}
      </div>
      <div className="inline-block animate-marquee-slow">
        {repetitions.map(i => (
          <span key={`b-${i}`} className="marquee-text">{text}</span>
        ))}
      </div>
    </div>
  )
}

function CountdownTimer({ timeLeft }: { timeLeft: number }) {
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

      {/* Current Pot */}
      <div className="text-center">
        <p className="text-lg md:text-xl mb-2" style={{ color: '#FFE5B4', opacity: 0.8 }}>
          Current Pot
        </p>
        <p className="text-3xl md:text-4xl xl:text-5xl font-black" style={{
          color: '#F4E5C3',
          textShadow: '2px 2px 0 #C4A137, 3px 3px 8px rgba(0, 0, 0, 0.4)'
        }}>
          $12,847
        </p>
      </div>
    </motion.div>
  )
}

function CompactStepper() {
  return (
    <motion.div
      className="mascot-frame rounded-3xl p-6 md:p-8 xl:p-10"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h3 className="text-3xl md:text-4xl xl:text-5xl font-black mb-8 text-center" style={{
        color: '#FFE5B4',
        letterSpacing: '1px'
      }}>
        How It Works
      </h3>

      <div className="space-y-6">
        {/* Step 1 */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black text-lg md:text-xl" style={{
            background: 'linear-gradient(135deg, #FFE5B4 0%, #D4AF37 100%)',
            color: '#8B0000',
            boxShadow: '0 4px 0 #B8960B'
          }}>
            1
          </div>
          <div>
            <h4 className="text-xl md:text-2xl font-black mb-2" style={{ color: '#FFE5B4' }}>
              PURCHASE $FORTUNE
            </h4>
            <p className="text-base md:text-lg" style={{ color: '#F4E5C3', opacity: 0.9, lineHeight: '1.7' }}>
              Wallet address, amount, and timestamp recorded
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black text-lg md:text-xl" style={{
            background: 'linear-gradient(135deg, #FFE5B4 0%, #D4AF37 100%)',
            color: '#8B0000',
            boxShadow: '0 4px 0 #B8960B'
          }}>
            2
          </div>
          <div>
            <h4 className="text-xl md:text-2xl font-black mb-2" style={{ color: '#FFE5B4' }}>
              HOLD & WAIT
            </h4>
            <p className="text-base md:text-lg" style={{ color: '#F4E5C3', opacity: 0.9, lineHeight: '1.7' }}>
              When timer expires a snapshot is taken: all holders, balances, and transaction times
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black text-lg md:text-xl" style={{
            background: 'linear-gradient(135deg, #FFE5B4 0%, #D4AF37 100%)',
            color: '#8B0000',
            boxShadow: '0 4px 0 #B8960B'
          }}>
            3
          </div>
          <div>
            <h4 className="text-xl md:text-2xl font-black mb-2" style={{ color: '#FFE5B4' }}>
              RECEIVE YOUR FORTUNE
            </h4>
            <p className="text-base md:text-lg" style={{ color: '#F4E5C3', opacity: 0.9, lineHeight: '1.7' }}>
              50% of volume auto-distributed to 5 winners. Odds weighted by hold time and amount
            </p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm md:text-base text-center italic" style={{ color: '#F4E5C3', opacity: 0.5, lineHeight: '1.6' }}>
        Entries = Minutes held × % of supply. Example: 1% for 15min = 15 entries, 2% for 20min = 40 entries
      </p>
    </motion.div>
  )
}

function StickyMiniBar({ timeLeft }: { timeLeft: number }) {
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
            Pot: $12,847
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

function SocialButton({ icon: Icon, href, label }: { icon: any; href: string; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl social-button-3d"
      whileHover={{
        y: 2,
        boxShadow: '0 4px 0 #B8960B, 0 8px 12px rgba(0, 0, 0, 0.3)'
      }}
      whileTap={{
        y: 4,
        boxShadow: '0 2px 0 #B8960B, 0 4px 8px rgba(0, 0, 0, 0.3)'
      }}
      aria-label={label}
    >
      <Icon />
    </motion.a>
  )
}


function App() {
  const gameSectionRef = useRef<HTMLDivElement>(null)
  const [timeLeft, setTimeLeft] = useState(20 * 60)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 20 * 60
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

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
                src="/heyyi.png"
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
              <SocialButton icon={FaTwitter} href="#" label="Twitter" />
              <SocialButton icon={FaTelegramPlane} href="#" label="Telegram" />
              <SocialButton icon={FaDiscord} href="#" label="Discord" />
              <SocialButton icon={FaGlobe} href="#" label="Website" />
            </motion.div>

            <motion.button
              className="px-12 py-6 text-2xl rounded-full cta-button-3d"
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
              onClick={() => {
                gameSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
            >
              BUY $FORTUNE
            </motion.button>
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
                src="/cz.png"
                alt="CZ - Modern Fortune Bringer"
                className="w-full h-full object-cover"
                style={{ objectPosition: '44% 50%' }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Marquee text="✦ JOIN 444 FORTUNES ✦ PROSPERITY AWAITS ✦ GOOD LUCK ✦" />

      <StickyMiniBar timeLeft={timeLeft} />

      <section ref={gameSectionRef} className="relative pt-16 md:pt-24 xl:pt-32 pb-20 md:pb-32 xl:pb-40 px-4 bg-game">
        <div className="absolute inset-0 bg-black opacity-25" />
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Two-column layout: Countdown | How It Works */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 xl:gap-12">
            {/* Left Column - Countdown with Pot */}
            <CountdownTimer timeLeft={timeLeft} />

            {/* Right Column - Compact Stepper */}
            <CompactStepper />
          </div>
        </div>
      </section>

      <Marquee text="✦ JOIN 444 FORTUNES ✦ PROSPERITY AWAITS ✦ GOOD LUCK ✦" />
    </div>
  )
}

export default App
