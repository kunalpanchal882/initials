import { useState, useEffect } from 'react'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Creations } from './components/Creations'
import { ProofOfWork } from './components/ProofOfWork'
import { Process } from './components/Process'
import { Connect } from './components/Connect'
import { Footer } from './components/Footer'

export default function App() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    // Observe sections for navbar pill layoutId tracking
    const sections = ['creations', 'connect']
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    const handleScroll = () => {
      // If at top, clear active section
      if (window.scrollY < 300) {
        setActiveSection('')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-bg-primary text-text-primary selection:bg-accent/30 selection:text-text-primary">
      {/* Navigation Header */}
      <Navigation activeSection={activeSection} />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* 1. Hero: Immersive sunlit nature scene blueprint */}
        <Hero />

        {/* 2. Services: "Your vision. Our imagination." editorial sticky preview */}
        <Services />

        {/* 3. Creations (Portfolio): Filterable bento grid, marquee, video modal */}
        <Creations />

        {/* 4. Proof of Work: Featured project, before/after slider, BTS strip */}
        <ProofOfWork />

        {/* 5. Process: 4-step progressive timeline */}
        <Process />

        {/* 6. Connect: Frontend-only honest contact flow */}
        <Connect />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
