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
      autoRaf: true,
      smoothWheel: true,
      anchors: { offset: 96 },
      duration: 1.05,
      wheelMultiplier: 0.95,
      touchMultiplier: 1,
    })
    setLenis(instance)

    instance.on('scroll', () => {
      ScrollTrigger.update()
    })

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
