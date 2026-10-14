import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Pause, Volume2, VolumeX, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react'

export function VideoModal({ project, onClose, onPrev, onNext }) {
  const videoRef = useRef(null)
  const modalRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  // Keyboard controls & focus trap
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev?.()
      if (e.key === 'ArrowRight') onNext?.()
      if (e.key === ' ') {
        e.preventDefault()
        togglePlay()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext, project])

  // Video time updates
  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    setCurrentTime(videoRef.current.currentTime)
    if (videoRef.current.duration) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100)
    }
  }

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return
    setDuration(videoRef.current.duration)
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
  }

  const togglePlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(videoRef.current.muted)
  }

  const handleScrubberChange = (e) => {
    if (!videoRef.current || !videoRef.current.duration) return
    const newProgress = parseFloat(e.target.value)
    const newTime = (newProgress / 100) * videoRef.current.duration
    videoRef.current.currentTime = newTime
    setProgress(newProgress)
  }

  const toggleFullscreen = () => {
    if (!videoRef.current) return
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen()
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen()
    }
  }

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  if (!project) return null

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Backdrop (blurred ivory) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#FAFAF7]/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          ref={modalRef}
          layoutId={`project-card-${project.id}`}
          className="relative z-10 w-full max-w-5xl bg-surface rounded-media shadow-2xl border border-border overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-bg-secondary/40">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-pill bg-accent/20 text-accent-dark">
                {project.tag || 'Concept Work'}
              </span>
              <span className="text-sm font-medium text-text-secondary">
                {project.category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onPrev}
                className="p-1.5 rounded-full hover:bg-black/5 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Previous project (Left arrow key)"
                title="Previous (Left arrow)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={onNext}
                className="p-1.5 rounded-full hover:bg-black/5 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Next project (Right arrow key)"
                title="Next (Right arrow)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-black/5 text-text-secondary hover:text-text-primary transition-colors ml-2"
                aria-label="Close modal (Escape key)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="overflow-y-auto">
            {/* Video Player */}
            <div className="relative bg-black aspect-video w-full overflow-hidden group">
              <video
                ref={videoRef}
                src={project.videoSrc}
                poster={project.poster}
                loop
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onClick={togglePlay}
                className="w-full h-full object-cover cursor-pointer"
              />

              {/* Custom Player Controls Bar */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col gap-2 transition-opacity duration-300">
                {/* Scrubber Range Input */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={progress}
                  onChange={handleScrubberChange}
                  className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-accent hover:h-1.5 transition-all"
                  aria-label="Video scrubber"
                />

                <div className="flex items-center justify-between text-white text-xs sm:text-sm pt-1">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="p-1 hover:text-accent transition-colors"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />}
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      className="p-1 hover:text-accent transition-colors"
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </button>

                    <span className="font-mono text-xs text-white/80">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="p-1 hover:text-accent transition-colors"
                    aria-label="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h2 id="modal-project-title" className="font-serif italic text-3xl sm:text-4xl text-text-primary mb-2">
                  {project.title}
                </h2>
                <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
                  {project.concept}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border text-sm">
                <div className="bg-bg-secondary/50 p-4 rounded-xl">
                  <span className="text-xs uppercase tracking-wider text-text-secondary font-semibold block mb-1">
                    Creative Brief
                  </span>
                  <p className="text-text-primary/90 leading-relaxed">
                    {project.brief}
                  </p>
                </div>

                <div className="bg-bg-secondary/50 p-4 rounded-xl">
                  <span className="text-xs uppercase tracking-wider text-text-secondary font-semibold block mb-1">
                    Generative Approach
                  </span>
                  <p className="text-text-primary/90 leading-relaxed">
                    {project.approach}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border text-xs text-text-secondary">
                <span>Honesty Note: Original generative exploration by Reverts.</span>
                <span>Aspect: {project.aspect}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
