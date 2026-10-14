import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play } from 'lucide-react'
import { categories, projects } from '../data/projects'
import { VideoModal } from './VideoModal'
import { PlayCursor } from './PlayCursor'

export function Creations() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeProjectModal, setActiveProjectModal] = useState(null)
  const [isHoveringCard, setIsHoveringCard] = useState(false)

  // Filter projects by selected category
  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  // Marquee categories list
  const marqueeItems = [
    'Brand Films',
    'AI Storytelling',
    'Product Commercials',
    'Promotional Campaigns',
    'Experimental Visuals',
    'Cinematic Worldbuilding',
    'Generative Art Direction',
  ]

  // Modal navigation index handlers
  const currentModalIndex = activeProjectModal
    ? projects.findIndex((p) => p.id === activeProjectModal.id)
    : -1

  const handlePrevProject = () => {
    if (currentModalIndex > 0) {
      setActiveProjectModal(projects[currentModalIndex - 1])
    } else {
      setActiveProjectModal(projects[projects.length - 1])
    }
  }

  const handleNextProject = () => {
    if (currentModalIndex < projects.length - 1) {
      setActiveProjectModal(projects[currentModalIndex + 1])
    } else {
      setActiveProjectModal(projects[0])
    }
  }

  return (
    <section id="creations" className="py-24 sm:py-32 relative">
      <PlayCursor isHoveringPortfolio={isHoveringCard} />

      {/* Marquee Strip above gallery */}
      <div className="w-full overflow-hidden border-y border-border py-4 sm:py-5 bg-bg-secondary/60 mb-20">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 select-none">
          {marqueeItems.concat(marqueeItems).concat(marqueeItems).map((item, idx) => (
            <span key={idx} className="flex items-center gap-8">
              <span className="font-serif italic text-xl sm:text-2xl text-text-primary/75 hover:text-text-primary transition-colors cursor-default">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs uppercase tracking-widest text-accent-dark font-medium mb-3 block">
            Portfolio & Creations
          </span>
          <h2 className="font-serif italic text-4xl sm:text-6xl text-text-primary tracking-tight leading-[1.1] mb-5">
            A few worlds we've brought to life.
          </h2>
          <p className="text-text-secondary text-lg sm:text-xl font-normal leading-relaxed">
            Every frame begins with an idea. Explore our AI-powered stories, product films, and visual campaigns.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-14 border-b border-border pb-4">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2 text-sm sm:text-base font-medium rounded-pill transition-colors ${
                  isSelected ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {cat}
                {isSelected && (
                  <motion.div
                    layoutId="category-underline"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Curated Bento / Masonry Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`${project.colSpan || 'col-span-1'} group relative rounded-media overflow-hidden border border-border shadow-soft bg-surface cursor-pointer`}
                  onClick={() => setActiveProjectModal(project)}
                  onMouseEnter={() => setIsHoveringCard(true)}
                  onMouseLeave={() => setIsHoveringCard(false)}
                >
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-bg-secondary">
                    {/* Poster Image */}
                    <img
                      src={project.poster}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Badge: Honesty Concept tag */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <span className="text-[11px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-pill bg-white/80 backdrop-blur-md text-text-primary shadow-subtle border border-black/5">
                        {project.tag}
                      </span>
                    </div>

                    {/* Play Button Indicator (scales in on hover) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md text-text-primary flex items-center justify-center shadow-soft transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                        <Play className="w-5 h-5 ml-0.5 fill-current" />
                      </div>
                    </div>

                    {/* Bottom Caption (Slides up) */}
                    <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white flex flex-col justify-end">
                      <span className="text-xs font-mono uppercase tracking-wider text-accent-light mb-1 block">
                        {project.category}
                      </span>
                      <h3 className="font-serif italic text-2xl sm:text-3xl text-white group-hover:text-accent-light transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-white/80 text-sm line-clamp-2 mt-1 font-normal opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        {project.concept}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Video Modal with Shared Element Transition */}
      {activeProjectModal && (
        <VideoModal
          project={activeProjectModal}
          onClose={() => setActiveProjectModal(null)}
          onPrev={handlePrevProject}
          onNext={handleNextProject}
        />
      )}
    </section>
  )
}
