'use client'
import { useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollContext } from '@/context/ScrollContext'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const instance = new Lenis({
      autoRaf: false,
      smoothWheel: true,
      anchors: { offset: 96 },
      duration: 1.05,
      wheelMultiplier: 0.95,
      touchMultiplier: 1,
    })

    // Let GSAP's ticker drive Lenis (same frame as ScrollTrigger)
    const rafCallback = (time: number) => { instance.raf(time * 1000) }
    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    setLenis(instance)

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
        const depth = Number(element.dataset.depth ?? 0.16)
        gsap.to(element, {
          yPercent: -depth * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.1,
          },
        })
      })
    })

    return () => {
      gsap.ticker.remove(rafCallback)
      instance.destroy()
      ctx.revert()
      setLenis(null)
    }
  }, [])

  return (
    <ScrollContext.Provider value={lenis}>
      {children}
    </ScrollContext.Provider>
  )
}
