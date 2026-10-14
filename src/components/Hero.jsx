import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { PetalCanvas } from './PetalCanvas'

export function Hero() {
  const containerRef = useRef(null)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const listener = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', listener)

    const onScroll = () => {
      if (window.scrollY > 30) {
        setHasScrolled(true)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      mq.removeEventListener('change', listener)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Parallax transform on scroll out of hero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.3])

  const scrollToCreations = () => {
    const el = document.getElementById('creations')
    if (el) {
      const topOffset = 80
      const pos = el.getBoundingClientRect().top + window.pageYOffset - topOffset
      window.scrollTo({ top: pos, behavior: 'smooth' })
    }
  }

  // Split headline lines into words for masked stagger reveal
  const line1 = ['Ideas', 'into', 'stories.']
  const line2 = ['Stories', 'into', 'cinema.']

  return (
    <section
      ref={containerRef}
      className="relative w-full p-[12px] md:p-[16px] box-border overflow-hidden"
    >
      {/* Outer rounded hero frame with equal 12px/16px insets on all 4 sides */}
      <div className="relative w-full h-[calc(100svh-24px)] md:h-[calc(100svh-32px)] min-h-[640px] rounded-[28px] md:rounded-[40px] overflow-hidden border border-[rgba(23,23,23,0.08)] shadow-soft flex items-center justify-center">
        
        {/* Background Layers Container */}
        <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
          {/* Layer 1: Looping sunlit flower meadow video / poster with brightness & saturation boost */}
          {!reducedMotion ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/hero_meadow_daylight_1792017414080.jpg"
              className="w-full h-full object-cover object-center animate-kenburns"
              style={{ filter: 'brightness(1.08) saturate(1.05)' }}
            >
              {/* PLACEHOLDER: replace with Reverts original footage */}
              <source src="/videos/hero-placeholder.webm" type="video/webm" />
              <source src="/videos/hero-placeholder.mp4" type="video/mp4" />
              <img
                src="/images/hero_meadow_daylight_1792017414080.jpg"
                alt="Sunlit wildflower meadow in warm daylight"
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(1.08) saturate(1.05)' }}
              />
            </video>
          ) : (
            <img
              src="/images/hero_meadow_daylight_1792017414080.jpg"
              alt="Sunlit wildflower meadow in warm daylight"
              className="w-full h-full object-cover object-center"
              style={{ filter: 'brightness(1.08) saturate(1.05)' }}
            />
          )}

          {/* Layer 2: Soft white radial wash behind text zone for legibility */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 62% 55% at 50% 50%, rgba(250,250,247,0.55) 0%, rgba(250,250,247,0.25) 45%, transparent 75%)',
            }}
            aria-hidden="true"
          />

          {/* Layer 3: Top fade for nav readability (No dark corners or vignettes) */}
          <div
            className="absolute inset-x-0 top-0 h-[160px] pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(250,250,247,0.45), transparent 160px)',
            }}
            aria-hidden="true"
          />

          {/* Layer 4: Drifting Clouds Atmospheric Layers */}
          <div
            className="absolute -top-10 left-0 w-[140%] h-[45%] pointer-events-none opacity-25 animate-cloud-drift-1 blur-2xl bg-gradient-to-r from-transparent via-white/80 to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute top-10 left-0 w-[150%] h-[35%] pointer-events-none opacity-15 animate-cloud-drift-2 blur-3xl bg-gradient-to-r from-transparent via-amber-100/50 to-transparent"
            aria-hidden="true"
          />

          {/* Layer 5: Film Grain Texture overlay (Fine SVG noise, no repeating dots) */}
          <div className="absolute inset-0 hero-grain pointer-events-none" aria-hidden="true" />
        </div>

        {/* Floating Petal/Pollen Particles (z-10, between background and text) */}
        <PetalCanvas />

        {/* Content Stack: Centered flex column slightly above middle */}
        <motion.div
          style={{ y: headlineY, opacity: headlineOpacity }}
          className="relative z-20 w-full flex flex-col items-center justify-center text-center pt-[88px] pb-[112px] h-full"
          style={{
            paddingLeft: 'var(--hero-gutter)',
            paddingRight: 'var(--hero-gutter)',
          }}
        >
          {/* Headline: Exactly two lines, never wraps, descenders unclipped */}
          <h1
            className="font-handwritten text-[#171717] hero-headline-shadow select-none text-center"
            style={{
              maxWidth: 'min(92vw, 1200px)',
              lineHeight: 1.08,
              letterSpacing: '-0.01em',
              textWrap: 'balance',
              marginBottom: 'clamp(20px, 2.2vw, 32px)',
            }}
          >
            {/* Line 1: Ideas into stories. */}
            <span
              className="block whitespace-nowrap overflow-hidden"
              style={{
                fontSize: 'clamp(2rem, 8.2vw, 3.75rem)',
                paddingBottom: '0.14em',
                marginBottom: '-0.14em',
              }}
            >
              <span className="hidden md:inline" style={{ fontSize: 'clamp(3.5rem, 6vw, 6.25rem)' }}>
                {line1.map((word, i) => (
                  <span key={i} className="inline-block mr-[0.25em]">
                    <motion.span
                      className="inline-block"
                      initial={{ y: '115%' }}
                      animate={{ y: '0%' }}
                      transition={{
                        duration: 0.7,
                        delay: 0.15 + i * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </span>
              <span className="inline md:hidden">
                {line1.map((word, i) => (
                  <span key={i} className="inline-block mr-[0.25em]">
                    <motion.span
                      className="inline-block"
                      initial={{ y: '115%' }}
                      animate={{ y: '0%' }}
                      transition={{
                        duration: 0.7,
                        delay: 0.15 + i * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </span>
            </span>

            {/* Line 2: Stories into cinema. */}
            <span
              className="block whitespace-nowrap overflow-hidden"
              style={{
                fontSize: 'clamp(2rem, 8.2vw, 3.75rem)',
                paddingBottom: '0.14em',
                marginBottom: '-0.14em',
              }}
            >
              <span className="hidden md:inline" style={{ fontSize: 'clamp(3.5rem, 6vw, 6.25rem)' }}>
                {line2.map((word, i) => (
                  <span key={i} className="inline-block mr-[0.25em]">
                    <motion.span
                      className="inline-block"
                      initial={{ y: '115%' }}
                      animate={{ y: '0%' }}
                      transition={{
                        duration: 0.7,
                        delay: 0.35 + i * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </span>
              <span className="inline md:hidden">
                {line2.map((word, i) => (
                  <span key={i} className="inline-block mr-[0.25em]">
                    <motion.span
                      className="inline-block"
                      initial={{ y: '115%' }}
                      animate={{ y: '0%' }}
                      transition={{
                        duration: 0.7,
                        delay: 0.35 + i * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </span>
            </span>
          </h1>

          {/* Supporting Paragraph: Exactly two lines on desktop, max-width 38rem, text-wrap balance */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-center font-normal"
            style={{
              maxWidth: '38rem',
              fontSize: 'clamp(1rem, 0.5rem + 0.9vw, 1.125rem)',
              lineHeight: 1.55,
              color: 'rgba(23, 23, 23, 0.85)',
              textWrap: 'balance',
              marginBottom: 'clamp(28px, 3vw, 44px)',
            }}
          >
            We create cinematic AI videos, compelling brand stories, and scroll-stopping campaigns that turn imagination into visual experiences.
          </motion.p>

          {/* CTA Row: Primary button is mathematically centered on the headline axis */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0"
          >
            {/* Primary Pill Button (Centered element) */}
            <button
              onClick={scrollToCreations}
              className="group relative inline-flex items-center bg-white text-[#171717] rounded-pill shadow-soft border border-[rgba(23,23,23,0.08)] hover:shadow-lg hover:border-[rgba(23,23,23,0.14)] active:scale-[0.98] transition-all outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F8E78] focus-visible:ring-offset-2"
              style={{
                height: '56px',
                padding: '0 8px 0 28px',
                gap: '14px',
                fontSize: '16px',
                fontWeight: 500,
                minHeight: '44px',
                minWidth: '44px',
              }}
            >
              <span>Explore what we create</span>
              <span className="w-10 h-10 rounded-full bg-[#171717] text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0">
                <ArrowRight className="w-4 h-4 text-white" />
              </span>
            </button>

            {/* Secondary link: Absolute on desktop so primary remains dead centered; stacked on mobile */}
            <div className="md:absolute md:left-[calc(100%+24px)] md:top-1/2 md:-translate-y-1/2 whitespace-nowrap">
              <button
                onClick={scrollToCreations}
                className="group relative text-[#171717] font-medium py-1 transition-colors outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F8E78] focus-visible:ring-offset-2 rounded px-2"
                style={{
                  fontSize: 'clamp(15px, 1vw, 16px)',
                  minHeight: '44px',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                <span>See our work.</span>
                {/* Permanent 1px underline at 30% opacity drawing to 100% on hover/focus */}
                <span
                  className="absolute bottom-2 left-2 right-2 h-[1px] bg-[#171717] opacity-30 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200"
                  aria-hidden="true"
                />
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Subtle scroll cue at bottom center (never overlaps CTA) */}
        <motion.div
          animate={{ opacity: hasScrolled ? 0 : 0.75 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-[32px] left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-1.5"
        >
          <span className="text-[11px] uppercase tracking-widest text-[#171717]/70 font-medium">Scroll</span>
          <ChevronDown className="w-4 h-4 text-[#171717] animate-gentle-pulse" />
        </motion.div>
      </div>
    </section>
  )
}

export const HeroSection = Hero
