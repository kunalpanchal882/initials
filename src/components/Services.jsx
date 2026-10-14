import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const servicesData = [
  {
    id: '01',
    title: 'AI Storytelling',
    description:
      'Turn concepts, scripts, and imaginative ideas into compelling visual narratives, short films, story-driven campaigns, and cinematic sequences.',
    image: '/images/project_clockmaker_1792017460671.jpg',
    tag: 'Narrative & Screenplay',
    aspect: '16:9',
  },
  {
    id: '02',
    title: 'AI Video Generation',
    description:
      'Create visually rich, high-quality AI videos with cinematic movement, creative environments, and distinctive visual direction.',
    image: '/images/project_forest_1792017559461.jpg',
    tag: 'Cinematography & Worldbuilding',
    aspect: '16:9',
  },
  {
    id: '03',
    title: 'AI Promotional Videos',
    description:
      'Produce attention-grabbing promotional videos for brands, products, launches, advertisements, and social media campaigns.',
    image: '/images/project_soundpods_1792017627161.jpg',
    tag: 'Campaigns & Social',
    aspect: '16:9',
  },
  {
    id: '04',
    title: 'AI Product Commercials',
    description:
      'Transform products into premium visual campaigns using cinematic scenes, imaginative settings, and polished advertising concepts.',
    image: '/images/project_parfum_1792017440854.jpg',
    tag: 'Commercials & 3D Shaders',
    aspect: '16:9',
  },
]

export function Services() {
  const [activeService, setActiveService] = useState(0)

  // Split heading into words for reveal animation
  const headingWords = 'Your vision. Our imagination.'.split(' ')

  return (
    <section id="services" className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="max-w-3xl mb-16 sm:mb-24">
        <span className="text-xs uppercase tracking-widest text-accent-dark font-medium mb-3 block">
          Creative Capabilities
        </span>
        <h2 className="font-serif italic text-4xl sm:text-6xl text-text-primary tracking-tight leading-[1.1] mb-6">
          {headingWords.map((word, idx) => (
            <span key={idx} className="inline-block mr-[0.25em]">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-text-secondary text-lg sm:text-xl font-normal leading-relaxed max-w-2xl"
        >
          From the first spark of an idea to the final frame, we create AI-powered video experiences designed to tell stories, capture attention, and move audiences.
        </motion.p>
      </div>

      {/* Editorial Non-Card Layout: Sticky List with Large Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Sticky Large Preview on Desktop */}
        <div className="hidden lg:block lg:col-span-6 sticky top-28">
          <div className="relative w-full aspect-[16/10] rounded-media overflow-hidden shadow-soft border border-border bg-bg-secondary">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1.0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <img
                  src={servicesData[activeService].image}
                  alt={servicesData[activeService].title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-accent-light/90 font-medium block mb-1">
                      {servicesData[activeService].tag}
                    </span>
                    <h3 className="font-serif italic text-2xl text-white">
                      {servicesData[activeService].title}
                    </h3>
                  </div>
                  <span className="text-sm font-mono text-white/80">
                    {servicesData[activeService].id} / 04
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Interactive Services List */}
        <div className="lg:col-span-6 flex flex-col divide-y divide-border">
          {servicesData.map((service, index) => {
            const isActive = activeService === index
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setActiveService(index)}
                onFocus={() => setActiveService(index)}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                className={`py-8 sm:py-10 group cursor-pointer transition-colors outline-none ${
                  isActive ? 'text-accent-dark' : 'text-text-primary'
                }`}
              >
                <div className="flex items-baseline justify-between mb-3">
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span className="font-mono text-sm sm:text-base text-text-secondary/70">
                      {service.id}
                    </span>
                    <h3
                      className={`text-2xl sm:text-3xl md:text-4xl font-serif italic transition-colors duration-300 relative inline-block ${
                        isActive ? 'text-text-primary' : 'text-text-primary/75 group-hover:text-text-primary'
                      }`}
                    >
                      {service.title}
                      {/* Growing Sage Underline */}
                      <span
                        className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-accent transition-transform duration-300 origin-left ${
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
                        }`}
                      />
                    </h3>
                  </div>

                  {/* Arrow nudges on hover / active */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isActive
                        ? 'border-accent bg-accent/15 text-accent-dark scale-105'
                        : 'border-border text-text-secondary group-hover:border-text-primary/30 group-hover:text-text-primary'
                    }`}
                  >
                    <ArrowUpRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isActive ? 'translate-x-0.5 -translate-y-0.5' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                      }`}
                    />
                  </div>
                </div>

                <p className="text-text-secondary text-base leading-relaxed pl-8 sm:pl-10 max-w-xl">
                  {service.description}
                </p>

                {/* Mobile Preview Image (shown under each row on mobile) */}
                <div className="lg:hidden mt-6 rounded-media overflow-hidden border border-border shadow-subtle aspect-[16/10]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
