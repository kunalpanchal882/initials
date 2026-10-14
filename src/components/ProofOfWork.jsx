import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { SlidersHorizontal, Sparkles, Layers, Film, CheckCircle2 } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'

export function ProofOfWork() {
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef(null)
  const sliderContainerRef = useRef(null)
  const isInView = useInView(sliderContainerRef, { once: true, amount: 0.3 })
  const [hasNudged, setHasNudged] = useState(false)

  // Gentle intro nudge animation once when scrolled into view
  useEffect(() => {
    if (isInView && !hasNudged) {
      setHasNudged(true)
      const timer1 = setTimeout(() => setSliderPos(58), 400)
      const timer2 = setTimeout(() => setSliderPos(46), 900)
      const timer3 = setTimeout(() => setSliderPos(50), 1400)
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
      }
    }
  }, [isInView, hasNudged])

  // Mouse & Touch dragging handler
  const handleMove = useCallback((clientX) => {
    if (!sliderContainerRef.current) return
    const rect = sliderContainerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPos(percent)
  }, [])

  const handleTouchMove = (e) => {
    if (!isDragging) return
    handleMove(e.touches[0].clientX)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setSliderPos((prev) => Math.max(0, prev - 5))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      setSliderPos((prev) => Math.min(100, prev + 5))
    }
  }

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchend', handleMouseUp)
    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchend', handleMouseUp)
    }
  }, [])

  // BTS pipeline steps
  const btsSteps = [
    {
      num: '01',
      title: 'Director Storyboard',
      desc: 'Cinematographer camera blocking, lighting notes, and compositional keyframes.',
      icon: Layers,
    },
    {
      num: '02',
      title: 'Generative Synthesis',
      desc: 'Diffusion motion passes, physics simulation, and temporal consistency training.',
      icon: Sparkles,
    },
    {
      num: '03',
      title: 'Pacing & Sound Design',
      desc: 'Spatial foley audio, cinematic musical score, and DaVinci color grading.',
      icon: Film,
    },
    {
      num: '04',
      title: 'Cinema Master',
      desc: 'Multi-platform 4K ProRes deliverables and high dynamic range mastering.',
      icon: CheckCircle2,
    },
  ]

  return (
    <section id="proof" className="py-24 sm:py-32 bg-bg-secondary/40 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-widest text-accent-dark font-medium mb-3 block">
            Craft & Quality
          </span>
          <h2 className="font-serif italic text-4xl sm:text-6xl text-text-primary tracking-tight leading-[1.1] mb-5">
            Don't just imagine it. See it.
          </h2>
          <p className="text-text-secondary text-lg sm:text-xl font-normal leading-relaxed">
            Our work speaks through every frame. Explore the visuals, storytelling, and creative possibilities we bring to each project.
          </p>
        </div>

        {/* Featured Case Study: Challenge -> Approach -> Result */}
        <div className="bg-surface rounded-media p-8 sm:p-12 border border-border shadow-soft mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Preview */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-border shadow-subtle bg-bg-secondary">
                <img
                  src="/images/project_ev_concept_1792017494576.jpg"
                  alt="Aeon GT Coastal Dawn cinematic frame"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/85 backdrop-blur-md px-3 py-1 rounded-pill text-xs font-semibold text-text-primary shadow-subtle border border-black/5">
                  Featured Case Study
                </div>
              </div>
            </div>

            {/* Write-up */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-accent-dark font-medium block mb-2">
                  Automotive Launch Film
                </span>
                <h3 className="font-serif italic text-3xl sm:text-4xl text-text-primary mb-6">
                  Aeon GT: Coastal Dawn
                </h3>

                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-text-primary mb-1">
                      The Challenge
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      Capture the emotional sensation of an unreleased electric grand tourer navigating sea cliff switchbacks without incurring six-figure location filming budgets.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-text-primary mb-1">
                      Our Approach
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      Custom-trained vehicle geometry LoRAs combined with real-world camera trajectory tracking and authentic golden-hour atmospheric lighting scattering.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-text-primary mb-1">
                      The Result
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      A cinematic 48-second broadcast-ready film completed in 10 days, indistinguishable from multi-camera helicopter shoots.
                    </p>
                  </motion.div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-border flex items-center justify-between text-xs text-text-secondary font-mono">
                <span>Production Cycle: 10 Days</span>
                <span>Original Concept Work</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Before / After Slider */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-accent-dark font-medium mb-2 block">
              Precision Transformation
            </span>
            <h3 className="font-serif italic text-3xl sm:text-4xl text-text-primary mb-3">
              Storyboard to Final Cinematic Master
            </h3>
            <p className="text-text-secondary text-sm sm:text-base">
              Drag the divider or use your keyboard's left/right arrow keys to see how rough director sketches translate into photorealistic AI frames.
            </p>
          </div>

          <div
            ref={sliderContainerRef}
            tabIndex={0}
            role="slider"
            aria-label="Before and after comparison slider"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={Math.round(sliderPos)}
            onKeyDown={handleKeyDown}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative w-full aspect-[16/9] max-w-5xl mx-auto rounded-media overflow-hidden border border-border shadow-soft select-none cursor-ew-resize outline-none focus-visible:ring-4 focus-visible:ring-accent"
          >
            {/* After Image (Full width background) */}
            <img
              src="/images/project_ev_concept_1792017494576.jpg"
              alt="Final photorealistic AI render"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            <div className="absolute top-5 right-5 z-20 bg-surface/90 backdrop-blur-md px-3.5 py-1.5 rounded-pill text-xs font-semibold text-text-primary shadow-subtle border border-black/5 pointer-events-none">
              Final AI Cinema Master
            </div>

            {/* Before Image (Clipped via sliderPos %) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src="/images/storyboard_sketch_1792017513986.jpg"
                alt="Pencil storyboard and camera blocking sketch"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: sliderContainerRef.current ? `${sliderContainerRef.current.offsetWidth}px` : '100%' }}
              />
              <div className="absolute top-5 left-5 z-20 bg-surface/90 backdrop-blur-md px-3.5 py-1.5 rounded-pill text-xs font-semibold text-text-primary shadow-subtle border border-black/5 pointer-events-none">
                Pencil Storyboard & Framing
              </div>
            </div>

            {/* Draggable Divider Line & Handle */}
            <div
              ref={sliderRef}
              className="absolute inset-y-0 z-30 pointer-events-none flex items-center justify-center -translate-x-1/2"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-0.5 h-full bg-white shadow-md" />
              <div className="absolute w-10 h-10 rounded-full bg-white text-text-primary shadow-soft border border-black/10 flex items-center justify-center transition-transform hover:scale-110 active:scale-95">
                <SlidersHorizontal className="w-4 h-4 rotate-90 text-text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Behind-The-Scenes Strip (reveals left to right) */}
        <div>
          <div className="max-w-2xl mb-10">
            <span className="text-xs uppercase tracking-widest text-accent-dark font-medium mb-2 block">
              Production Anatomy
            </span>
            <h3 className="font-serif italic text-3xl sm:text-4xl text-text-primary">
              Behind the Scenes Pipeline
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {btsSteps.map((step, idx) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="p-6 rounded-2xl bg-surface border border-border shadow-subtle hover:border-accent/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-sm text-text-secondary/60">{step.num}</span>
                    <div className="w-9 h-9 rounded-full bg-bg-secondary flex items-center justify-center text-text-primary">
                      <Icon className="w-4 h-4 text-accent-dark" />
                    </div>
                  </div>
                  <h4 className="font-serif italic text-xl text-text-primary mb-2">
                    {step.title}
                  </h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Honesty Note */}
        <div className="mt-14 text-center">
          <p className="text-xs text-text-secondary font-mono tracking-wide">
            Original concept work by Reverts. We do not invent client logos, statistics, or phantom reviews.
          </p>
        </div>

        {/* Optional Testimonials Section - strictly hidden behind config flag */}
        {siteConfig.flags.showTestimonials && (
          <div className="mt-16 p-8 border border-border rounded-media bg-surface">
            {/* Authenticated Client Testimonials would render here once verified */}
          </div>
        )}
      </div>
    </section>
  )
}
