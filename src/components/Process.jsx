import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const processSteps = [
  {
    num: '01',
    title: 'Discover',
    tagline: 'Listening & Intent',
    description:
      'We dive deep into your brand, audience, aesthetic sensibilities, core objectives, and the emotional resonance of the story you want to tell.',
  },
  {
    num: '02',
    title: 'Concept',
    tagline: 'Script & Visual Architecture',
    description:
      'We craft the screenplay, cinematic moodboards, director camera angles, lighting prompt maps, and keyframe sketches for alignment.',
  },
  {
    num: '03',
    title: 'Create',
    tagline: 'Generative Cinema & Audio',
    description:
      'We synthesize photorealistic AI visuals, refine camera choreographies, compose spatial sound design, and grade colors in DaVinci Resolve.',
  },
  {
    num: '04',
    title: 'Deliver',
    tagline: 'Mastering & Formats',
    description:
      'We deliver pristine 4K ProRes and web-optimized masters tailored across widescreen, vertical 9:16, social cutdowns, and campaign edits.',
  },
]

export function Process() {
  const containerRef = useRef(null)

  // Track scroll progress through the Process section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  // Desktop horizontal line scaleX
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  // Mobile vertical line scaleY
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={containerRef} id="process" className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="max-w-3xl mb-20 sm:mb-28">
        <span className="text-xs uppercase tracking-widest text-accent-dark font-medium mb-3 block">
          Our Methodology
        </span>
        <h2 className="font-serif italic text-4xl sm:text-6xl text-text-primary tracking-tight leading-[1.1] mb-5">
          From a simple idea to the final frame.
        </h2>
        <p className="text-text-secondary text-lg sm:text-xl font-normal leading-relaxed">
          A disciplined four-step creative pipeline built to turn abstract imagination into world-class cinematic visual experiences.
        </p>
      </div>

      {/* Process Flow */}
      <div className="relative">
        {/* Desktop Progress Line Track */}
        <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-[2px] bg-border z-0">
          <motion.div
            style={{ scaleX, transformOrigin: 'left' }}
            className="h-full bg-accent"
          />
        </div>

        {/* Mobile Vertical Progress Line Track */}
        <div className="lg:hidden absolute top-8 bottom-8 left-[18px] w-[2px] bg-border z-0">
          <motion.div
            style={{ scaleY, transformOrigin: 'top' }}
            className="w-full bg-accent"
          />
        </div>

        {/* Four Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
          {processSteps.map((step, index) => {
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="flex flex-row lg:flex-col items-start gap-6 lg:gap-8 group"
              >
                {/* Step Indicator Dot / Number Header */}
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface border-2 border-border group-hover:border-accent flex items-center justify-center shadow-subtle transition-colors duration-300">
                    <div className="w-3.5 h-3.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors duration-300" />
                  </div>
                </div>

                {/* Step Body */}
                <div className="flex-1 pt-1 lg:pt-0">
                  <span className="font-serif italic text-4xl sm:text-5xl text-text-secondary/50 group-hover:text-accent-dark transition-colors block mb-2">
                    {step.num}
                  </span>
                  <h3 className="font-serif italic text-2xl sm:text-3xl text-text-primary mb-1">
                    {step.title}
                  </h3>
                  <span className="text-xs uppercase tracking-wider text-accent-dark font-medium block mb-3">
                    {step.tagline}
                  </span>
                  <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
