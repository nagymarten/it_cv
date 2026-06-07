'use client'
import { useEffect, useRef } from 'react'
import { useScroll } from '@/context/ScrollContext'

export default function BackToTop() {
  const lenis = useScroll()
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!lenis) return
    const handler = ({ scroll }: { scroll: number }) => {
      const el = ref.current
      if (!el) return
      const show = scroll > 800
      el.classList.toggle('translate-y-0', show)
      el.classList.toggle('opacity-100', show)
      el.classList.toggle('pointer-events-none', !show)
      el.classList.toggle('translate-y-4', !show)
      el.classList.toggle('opacity-0', !show)
    }
    lenis.on('scroll', handler)
    return () => { lenis.off('scroll', handler) }
  }, [lenis])

  return (
    <a
      ref={ref}
      className="pointer-events-none fixed bottom-5 right-5 z-20 inline-flex min-h-12 translate-y-4 items-center justify-center rounded-full border border-white/10 bg-[rgba(10,10,15,0.82)] px-4 py-3 text-sm text-white opacity-0 shadow-[0_12px_30px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
      href="#top"
      style={{ bottom: 'max(1.25rem, calc(1.25rem + env(safe-area-inset-bottom)))' }}
    >
      Back to top
    </a>
  )
}
