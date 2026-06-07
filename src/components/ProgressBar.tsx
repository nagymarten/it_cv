'use client'
import { useEffect, useRef } from 'react'
import { useScroll } from '@/context/ScrollContext'

export default function ProgressBar() {
  const lenis = useScroll()
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!lenis) return
    const handler = ({ scroll }: { scroll: number }) => {
      if (barRef.current) {
        barRef.current.style.width = `${Math.min(scroll / 2200, 1) * 100}%`
      }
    }
    lenis.on('scroll', handler)
    return () => { lenis.off('scroll', handler) }
  }, [lenis])

  return (
    <div className="fixed left-0 right-0 top-0 z-30 h-[2px] bg-white/5">
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 transition-[width] duration-200"
        style={{ width: '0%' }}
      />
    </div>
  )
}
