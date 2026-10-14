import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function PlayCursor({ isHoveringPortfolio }) {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [visible, setVisible] = useState(false)
  const [isFinePointer, setIsFinePointer] = useState(false)

  useEffect(() => {
    // Check if device supports fine pointer (mouse/trackpad, not touch)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    setIsFinePointer(hasFinePointer)

    if (!hasFinePointer) return

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    setVisible(isFinePointer && isHoveringPortfolio)
  }, [isFinePointer, isHoveringPortfolio])

  if (!isFinePointer) return null

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center"
      style={{
        x: pos.x - 28,
        y: pos.y - 28,
      }}
      animate={{
        scale: visible ? 1 : 0,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    >
      <div className="w-14 h-14 rounded-full bg-surface/90 backdrop-blur-md border border-border shadow-soft flex items-center justify-center text-text-primary text-xs font-semibold tracking-wider uppercase">
        Play
      </div>
    </motion.div>
  )
}
