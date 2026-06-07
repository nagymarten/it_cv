'use client'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { revealBaseClass } from '@/data/cv'

type Props = {
  id?: string
  children: ReactNode
  className?: string
}

export default function SectionReveal({ id, children, className }: Props) {
  const [revealed, setRevealed] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: '-20% 0px -20% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      id={id}
      data-nav-section
      className={`scroll-mt-28 ${revealBaseClass} ${revealed ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} ${className ?? ''}`}
    >
      {children}
    </div>
  )
}
