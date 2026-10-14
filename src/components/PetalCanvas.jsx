import { useEffect, useRef } from 'react'

export function PetalCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Accessibility & performance checks
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isLowPower = typeof navigator !== 'undefined' && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4

    if (prefersReducedMotion || isLowPower) {
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let isVisible = true

    // Resize canvas
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    // Petal particle state: 16 petals, 6-14px soft ellipses, 0.5-0.8 opacity
    const numPetals = 16
    const petals = Array.from({ length: numPetals }, () => {
      const size = Math.random() * 8 + 6 // 6px to 14px
      return {
        x: Math.random() * (canvas.offsetWidth || window.innerWidth),
        y: Math.random() * (canvas.offsetHeight || window.innerHeight),
        size,
        speedY: Math.random() * 0.45 + 0.3,
        speedX: Math.random() * 0.35 + 0.15,
        swayOffset: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.018 + 0.008,
        opacity: Math.random() * 0.3 + 0.5, // 0.5 to 0.8
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        color: Math.random() > 0.4 ? 'rgba(255, 252, 248, ' : 'rgba(255, 242, 235, ',
        isBlurred: size > 10,
      }
    })

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      const width = canvas.offsetWidth || window.innerWidth
      const height = canvas.offsetHeight || window.innerHeight

      ctx.clearRect(0, 0, width, height)

      petals.forEach((p) => {
        p.y += p.speedY
        p.swayOffset += p.swaySpeed
        p.x += Math.sin(p.swayOffset) * 0.65 + p.speedX
        p.rotation += p.rotSpeed

        // Wrap around boundaries
        if (p.y > height + 25) {
          p.y = -25
          p.x = Math.random() * width
        }
        if (p.x > width + 25) {
          p.x = -25
        }

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)

        if (p.isBlurred && 'filter' in ctx) {
          ctx.filter = 'blur(0.8px)'
        }

        ctx.fillStyle = `${p.color}${p.opacity})`
        ctx.beginPath()
        // Draw soft natural petal ellipse
        ctx.ellipse(0, 0, p.size, p.size * 0.58, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    // IntersectionObserver to pause when hero is scrolled out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { threshold: 0.05 }
    )

    observer.observe(canvas)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      aria-hidden="true"
    />
  )
}

export const PetalField = PetalCanvas
