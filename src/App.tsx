import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FaTwitter, FaTelegramPlane, FaDiscord, FaGlobe } from 'react-icons/fa'

function Particle({ delay = 0 }) {
  const randomX = Math.random() * 100
  const randomDelay = delay + Math.random() * 2

  return (
    <motion.div
      className="absolute w-2 h-2 bg-lucky-gold rounded-full"
      style={{ left: `${randomX}%`, bottom: '0' }}
      initial={{ y: 0, opacity: 0, scale: 0 }}
      animate={{
        y: -200,
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: 4,
        delay: randomDelay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  )
}

function Marquee({ text }: { text: string }) {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-gradient-to-r from-rich-gold via-amber-700 to-rich-gold py-5 shadow-inner">
      <div className="inline-block animate-marquee-slow">
        <span className="text-xl font-bold text-amber-50 mx-12 drop-shadow-md">{text}</span>
        <span className="text-xl font-bold text-amber-50 mx-12 drop-shadow-md">{text}</span>
        <span className="text-xl font-bold text-amber-50 mx-12 drop-shadow-md">{text}</span>
        <span className="text-xl font-bold text-amber-50 mx-12 drop-shadow-md">{text}</span>
        <span className="text-xl font-bold text-amber-50 mx-12 drop-shadow-md">{text}</span>
        <span className="text-xl font-bold text-amber-50 mx-12 drop-shadow-md">{text}</span>
      </div>
      <div className="inline-block animate-marquee-slow">
        <span className="text-xl font-bold text-amber-50 mx-12 drop-shadow-md">{text}</span>
        <span className="text-xl font-bold text-amber-50 mx-12 drop-shadow-md">{text}</span>
        <span className="text-xl font-bold text-amber-50 mx-12 drop-shadow-md">{text}</span>
        <span className="text-xl font-bold text-amber-50 mx-12 drop-shadow-md">{text}</span>
        <span className="text-xl font-bold text-amber-50 mx-12 drop-shadow-md">{text}</span>
        <span className="text-xl font-bold text-amber-50 mx-12 drop-shadow-md">{text}</span>
      </div>
    </div>
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
  const [isVisible, setIsVisible] = useState(false)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (featuresRef.current) {
      observer.observe(featuresRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: '🪙',
      title: 'Triple Fortune Power',
      description: 'The number 4 multiplied brings ultimate prosperity and abundance',
    },
    {
      icon: '🎰',
      title: 'Lucky Spin Energy',
      description: 'Every moment is a winning spin in the grand casino of life',
    },
    {
      icon: '🏮',
      title: 'Eternal Celebration',
      description: 'Join the never-ending festival of wealth and community',
    },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">
      <style>{`
        .bg-fortune {
          background-image: url('/444background.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
        }
      `}</style>

      <div className="bg-fortune fixed inset-0 -z-10" />

      <Marquee text="✦ 444 FORTUNES ✦ PROSPERITY ✦ ABUNDANCE ✦ GOOD LUCK ✦" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Particle key={i} delay={i * 0.3} />
        ))}
      </div>

      <section className="relative min-h-screen flex items-center px-4 py-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <motion.div
            className="z-10 flex items-center justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative w-64 h-80 md:w-72 md:h-96 lg:w-64 lg:h-80 xl:w-80 xl:h-[28rem] rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(139, 69, 19, 0.15)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(212, 175, 55, 0.3)',
                boxShadow: `
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.2),
                  0 8px 16px rgba(0, 0, 0, 0.4),
                  0 0 0 1px rgba(0, 0, 0, 0.3)
                `
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
              whileHover={{
                scale: 1.05,
                boxShadow: `
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.2),
                  0 12px 24px rgba(0, 0, 0, 0.5),
                  0 0 0 1px rgba(0, 0, 0, 0.3)
                `
              }}
            >
              <img
                src="/heyyi.png"
                alt="Heyyi - Prosperity Goddess"
                className="w-full h-full object-cover"
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
              <div
                className="text-xl md:text-2xl font-bold"
                style={{
                  color: '#FFE5B4',
                  letterSpacing: '3px',
                  textShadow: '1px 1px 0 #8B4513, 2px 2px 4px rgba(0, 0, 0, 0.3)'
                }}
              >
                PROSPERITY
              </div>
              <div
                className="text-xl md:text-2xl font-bold"
                style={{
                  color: '#FFE5B4',
                  letterSpacing: '3px',
                  textShadow: '1px 1px 0 #8B4513, 2px 2px 4px rgba(0, 0, 0, 0.3)'
                }}
              >
                ABUNDANCE
              </div>
              <div
                className="text-xl md:text-2xl font-bold"
                style={{
                  color: '#FFE5B4',
                  letterSpacing: '3px',
                  textShadow: '1px 1px 0 #8B4513, 2px 2px 4px rgba(0, 0, 0, 0.3)'
                }}
              >
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
            >
              JOIN THE FORTUNE
            </motion.button>
          </motion.div>

          <motion.div
            className="z-10 flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative w-64 h-80 md:w-72 md:h-96 lg:w-64 lg:h-80 xl:w-80 xl:h-[28rem] rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(139, 69, 19, 0.15)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(212, 175, 55, 0.3)',
                boxShadow: `
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.2),
                  0 8px 16px rgba(0, 0, 0, 0.4),
                  0 0 0 1px rgba(0, 0, 0, 0.3)
                `
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6, type: 'spring' }}
              whileHover={{
                scale: 1.05,
                boxShadow: `
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.2),
                  0 12px 24px rgba(0, 0, 0, 0.5),
                  0 0 0 1px rgba(0, 0, 0, 0.3)
                `
              }}
            >
              <img
                src="/cz.png"
                alt="CZ - Modern Fortune Bringer"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section ref={featuresRef} className="relative py-32 px-4">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-black text-center mb-20 text-lucky-gold"
            style={{
              textShadow: '4px 4px 0 #000, 6px 6px 0 rgba(0,0,0,0.5)',
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            THE PATH TO PROSPERITY
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative bg-gradient-to-br from-prosperity-orange to-fortune-red rounded-3xl p-8 border-8 border-black"
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.2, duration: 0.8 }}
                whileHover={{
                  y: -10,
                  boxShadow: '0 20px 60px rgba(255, 215, 0, 0.6)',
                }}
              >
                <motion.div
                  className="text-7xl mb-6"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>

                <h3 className="text-3xl font-black mb-4 text-lucky-gold">
                  {feature.title}
                </h3>

                <p className="text-lg text-white font-bold">
                  {feature.description}
                </p>

                <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-lucky-gold rounded-tr-xl" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-lucky-gold rounded-bl-xl" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="relative py-20 text-center">
        <motion.div
          className="flex justify-center items-center gap-8 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-5xl">🌸</span>
          <span className="text-6xl">福</span>
          <span className="text-5xl">🌸</span>
        </motion.div>
        <p className="text-lucky-gold text-2xl font-black">
          MAY FORTUNE SMILE UPON YOU
        </p>
      </div>

      <Marquee text="✦ JOIN 444 FORTUNES ✦ PROSPERITY AWAITS ✦ GOOD LUCK ✦" />
    </div>
  )
}

export default App
