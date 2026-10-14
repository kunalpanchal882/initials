import { ArrowUp } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const topOffset = 80
      const pos = el.getBoundingClientRect().top + window.pageYOffset - topOffset
      window.scrollTo({ top: pos, behavior: 'smooth' })
    }
  }

  return (
    <footer className="border-t border-border bg-bg-secondary/30 py-16 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <button
            onClick={scrollToTop}
            className="font-handwritten text-3xl sm:text-4xl text-text-primary tracking-wide hover:opacity-80 transition-opacity"
          >
            {siteConfig.brand.name}
          </button>
          <p className="text-xs sm:text-sm text-text-secondary max-w-sm">
            {siteConfig.brand.description}
          </p>
        </div>

        {/* Timezone / Studio Availability Pill */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-pill bg-surface border border-border shadow-subtle text-xs text-text-secondary">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>{siteConfig.contact.location} ({siteConfig.contact.timezone.split(' ')[0]})</span>
          <span className="text-text-secondary/50">•</span>
          <span className="text-text-primary font-medium">Open for commissions</span>
        </div>

        {/* Navigation & Back To Top */}
        <div className="flex items-center gap-6 text-sm text-text-secondary">
          <button
            onClick={() => scrollToSection('creations')}
            className="hover:text-text-primary transition-colors"
          >
            Creations
          </button>
          <button
            onClick={() => scrollToSection('connect')}
            className="hover:text-text-primary transition-colors"
          >
            Connect
          </button>
          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full bg-surface border border-border shadow-subtle flex items-center justify-center text-text-primary hover:border-accent transition-colors"
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary/70">
        <p>© {new Date().getFullYear()} Reverts. All creative rights reserved.</p>
        <p className="font-mono">Pure Frontend • No remote user telemetry</p>
      </div>
    </footer>
  )
}
