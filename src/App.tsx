import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FaTwitter, FaTelegramPlane, FaDiscord, FaGlobe } from 'react-icons/fa'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

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

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(20 * 60) // 20 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 20 * 60 // Reset to 20 minutes
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-xl md:text-2xl font-bold mb-6" style={{ color: '#FFE5B4', letterSpacing: '2px' }}>
        NEXT FORTUNE DRAW
      </p>

      <motion.div
        className="text-6xl md:text-7xl font-black mb-6"
        style={{
          color: '#F4E5C3',
          textShadow: '2px 2px 0 #C4A137, 4px 4px 12px rgba(0, 0, 0, 0.4)'
        }}
        animate={{ scale: timeLeft <= 10 ? [1, 1.05, 1] : 1 }}
        transition={{ duration: 0.5, repeat: timeLeft <= 10 ? Infinity : 0 }}
      >
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </motion.div>

      {/* Lottie Animation */}
      <div className="mb-6 max-w-lg mx-auto">
        <DotLottieReact
          src="https://lottie.host/081bab50-833b-43b2-943a-a0331d7cb5fd/9WNEo75kOJ.lottie"
          loop
          autoplay
        />
      </div>

      <p className="text-lg" style={{ color: '#F4E5C3', opacity: 0.9 }}>
        {timeLeft <= 60 ? 'Fortune favors the ready...' : 'Hold strong, prosperity approaches'}
      </p>
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

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-red-900 via-red-950 to-black">
      <style>{`
        .bg-fortune {
          background-image: url('/444background.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      `}</style>

      <Marquee text="✦ 444 FORTUNES ✦ PROSPERITY ✦ ABUNDANCE ✦ GOOD LUCK ✦" />

      <section className="relative flex items-center px-4 py-12 bg-fortune" style={{ minHeight: '70vh' }}>
        <div className="absolute inset-0 bg-black opacity-25" />
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <motion.div
            className="z-10 flex items-center justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative w-64 h-80 md:w-72 md:h-96 lg:w-72 lg:h-[26rem] xl:w-80 xl:h-[30rem] rounded-3xl overflow-hidden mascot-frame"
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
            <div className="mb-12">
              <motion.div
                className="fortune-number text-8xl md:text-9xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, type: 'spring', bounce: 0.5 }}
              >
                444
              </motion.div>

              <motion.h1
                className="fortune-text text-6xl md:text-7xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                FORTUNES
              </motion.h1>
            </div>

            <motion.div
              className="w-24 h-px mx-auto mb-10"
              style={{
                background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
                boxShadow: '0 1px 3px rgba(212, 175, 55, 0.5)'
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />

            <motion.div
              className="mb-12 space-y-2 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="text-xl md:text-2xl font-bold text-subtitle-gold">
                PROSPERITY
              </div>
              <div className="text-xl md:text-2xl font-bold text-subtitle-gold">
                ABUNDANCE
              </div>
              <div className="text-xl md:text-2xl font-bold text-subtitle-gold">
                LUCK
              </div>
            </motion.div>

            <motion.div
              className="flex gap-4 mb-12 justify-center"
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
              className="relative w-64 h-80 md:w-72 md:h-96 lg:w-72 lg:h-[26rem] xl:w-80 xl:h-[30rem] rounded-3xl overflow-hidden flex items-center justify-center mascot-frame"
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

      <section ref={gameSectionRef} className="relative pt-32 pb-48 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-16"
            style={{
              color: '#F4E5C3',
              textShadow: '2px 2px 0 #C4A137, 3px 3px 8px rgba(0, 0, 0, 0.3)'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            WILL YOU BE THE MOST FORTUNATE?
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - How It Works */}
            <div>
              <motion.p
                className="text-center lg:text-left text-2xl md:text-3xl mb-12 font-bold"
                style={{
                  color: '#FFE5B4',
                  textShadow: '1px 1px 0 #8B4513, 2px 2px 4px rgba(0, 0, 0, 0.3)'
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                How It Works
              </motion.p>

              <div className="space-y-8">
            <motion.div
              className="text-left"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="flex items-start gap-6">
                <div
                  className="text-5xl md:text-6xl font-black flex-shrink-0"
                  style={{
                    color: '#FFE5B4',
                    textShadow: '2px 2px 0 #C4A137, 3px 3px 8px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  1
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black mb-3" style={{ color: '#FFE5B4' }}>
                    Purchase $FORTUNE
                  </h3>
                  <p className="text-lg md:text-xl" style={{ color: '#F4E5C3', lineHeight: '1.6' }}>
                    Your wallet, amount purchased and timestamp of tx will be added to the draw.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="text-left"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="flex items-start gap-6">
                <div
                  className="text-5xl md:text-6xl font-black flex-shrink-0"
                  style={{
                    color: '#FFE5B4',
                    textShadow: '2px 2px 0 #C4A137, 3px 3px 8px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  2
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black mb-3" style={{ color: '#FFE5B4' }}>
                    HOLD & WAIT
                  </h3>
                  <p className="text-lg md:text-xl" style={{ color: '#F4E5C3', lineHeight: '1.6' }}>
                    After 20 minutes a snapshot is taken of current holders, amount of tokens held by each wallet, and the time the tx occured.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="text-left"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div className="flex items-start gap-6">
                <div
                  className="text-5xl md:text-6xl font-black flex-shrink-0"
                  style={{
                    color: '#FFE5B4',
                    textShadow: '2px 2px 0 #C4A137, 3px 3px 8px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  3
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black mb-3" style={{ color: '#FFE5B4' }}>
                    Claim Your Fortune
                  </h3>
                  <p className="text-lg md:text-xl" style={{ color: '#F4E5C3', lineHeight: '1.6' }}>
                    50% of all token volume generated within the 20 minutes will be evenly distributed to 5 holders. Anyone can win, but your odds of winning are GREATLY increased based on hold time and amount held.
                  </p>
                </div>
              </div>
            </motion.div>

                <motion.p
                  className="mt-8 text-center lg:text-left italic text-base md:text-lg"
                  style={{ color: '#F4E5C3', opacity: 0.85, lineHeight: '1.7' }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.85 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                >
                  Your entries = Minutes held × % of supply owned. Five winners drawn randomly from the pool.
                  Example: Hold 1% of supply for 15 minutes = 15 entries. Hold 2% of supply for the full 20 minutes = 40 entries.
                  Buy more and hold longer for maximum entries.
                </motion.p>
              </div>
            </div>

            {/* Right Column - Countdown Timer */}
            <div className="lg:sticky lg:top-32">
              <CountdownTimer />
            </div>
          </div>
        </div>
      </section>

      <Marquee text="✦ JOIN 444 FORTUNES ✦ PROSPERITY AWAITS ✦ GOOD LUCK ✦" />
    </div>
  )
}

export default App
