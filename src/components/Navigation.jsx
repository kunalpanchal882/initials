import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Navigation({ activeSection = '' }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Track window scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Body scroll lock & ESC key for mobile overlay
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setMobileMenuOpen(false)
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const scrollTo = (id) => {
    setMobileMenuOpen(false)
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const element = document.getElementById(id)
    if (element) {
      const topOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - topOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const navLinks = [
    { id: 'creations', label: 'Creations' },
    { id: 'connect', label: 'Connect' },
  ]

  // Only highlight a nav link if its section is actually in view and user has scrolled down
  const effectiveActiveSection = scrolled ? activeSection : ''

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-[20px] md:top-[28px] left-[12px] md:left-[16px] right-[12px] md:right-[16px] z-50 pointer-events-none"
        style={{
          paddingLeft: 'var(--hero-gutter)',
          paddingRight: 'var(--hero-gutter)',
        }}
      >
        <div
          className="w-full grid grid-cols-[1fr_auto_1fr] items-center pointer-events-auto"
        >
          {/* Column 1: Wordmark (left edge aligned with hero gutter) */}
          <div className="justify-self-start flex items-center">
            <button
              onClick={() => scrollTo('top')}
              className="font-handwritten text-[#171717] tracking-wide hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F8E78] focus-visible:ring-offset-2 rounded-lg leading-none"
              style={{ fontSize: 'clamp(24px, 2vw, 28px)' }}
              aria-label="Reverts - Scroll to top"
            >
              Reverts
            </button>
          </div>

          {/* Column 2: Floating Pill Navigation (mathematically centered) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center p-1 rounded-pill h-[44px] shadow-soft border border-[rgba(23,23,23,0.08)] backdrop-blur-md transition-colors duration-300 relative"
            style={{
              backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.55)',
            }}
          >
            {navLinks.map((link) => {
              const isActive = effectiveActiveSection === link.id
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`relative z-10 px-5 py-2.5 text-[14px] md:text-[15px] font-medium leading-none rounded-pill transition-colors duration-200 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F8E78] focus-visible:ring-offset-2 ${
                    isActive ? 'text-[#171717]' : 'text-[rgba(23,23,23,0.65)] hover:text-[#171717]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-white/95 rounded-pill shadow-[0_2px_8px_-2px_rgba(23,23,23,0.08)] -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </button>
              )
            })}
          </nav>

          {/* Column 3: Desktop is empty to preserve exact 1fr symmetry; Mobile holds menu button */}
          <div className="justify-self-end flex items-center">
            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-pill bg-white/70 backdrop-blur-md border border-[rgba(23,23,23,0.08)] text-[#171717] hover:bg-white transition-all shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F8E78] focus-visible:ring-offset-2"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-[#171717] rounded transition-transform duration-300 ${
                    mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-[#171717] rounded transition-opacity duration-200 ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-[#171717] rounded transition-transform duration-300 ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Ivory Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#FAFAF7] md:hidden flex flex-col justify-between p-8 pt-28"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
          >
            <div className="flex flex-col gap-8 items-start">
              <span className="text-xs uppercase tracking-widest text-text-secondary font-medium">Navigation</span>
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.08, duration: 0.3 }}
                  onClick={() => scrollTo(link.id)}
                  className="font-serif italic text-4xl sm:text-5xl text-[#171717] hover:text-[#7F8E78] transition-colors text-left"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            <div className="pt-8 border-t border-[rgba(23,23,23,0.08)] flex flex-col gap-2 text-sm text-text-secondary">
              <p className="font-handwritten text-xl text-[#171717]">Reverts</p>
              <p>Cinematic AI Video Production</p>
              <p className="text-xs text-text-secondary/70">Bhopal, India • Working worldwide</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export const Navbar = Navigation
