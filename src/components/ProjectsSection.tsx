'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects, sectionLabelClass, cardClass } from '@/data/cv'
import { Container } from '@/components/layout/Container'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let mm: gsap.MatchMedia

    const ctx = gsap.context(() => {
      // Entry animation for each card
      cardsRef.current.forEach((card, index) => {
        if (!card) return
        gsap.fromTo(
          card,
          { y: 120, opacity: 0, rotateX: -14, scale: 0.94, transformPerspective: 1200 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 1.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
            delay: index * 0.08,
          },
        )
      })

      const cards = cardsRef.current.filter(Boolean)
      const heading = sectionRef.current?.querySelector('[data-projects-heading]') ?? null
      mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top+=80',
            end: '+=500',
            scrub: 1,
            pin: true,
          },
        })
        if (heading) tl.to(heading, { y: -36, opacity: 0.4, ease: 'none' }, 0)
        tl.to(cards, {
          y: (_: number, target: Element) => (target === cards[0] ? -20 : 24),
          rotate: (_: number, target: Element) => (target === cards[0] ? -2.5 : 2.5),
          scale: (_: number, target: Element) => (target === cards[0] ? 1.02 : 0.98),
          ease: 'none',
          stagger: 0.08,
        }, 0)
      })

      mm.add('(max-width: 1023px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top+=80',
            end: '+=500',
            scrub: 1,
            pin: false,
          },
        })
        if (heading) tl.to(heading, { y: -36, opacity: 0.4, ease: 'none' }, 0)
        tl.to(cards, {
          y: (_: number, target: Element) => (target === cards[0] ? -20 : 24),
          rotate: (_: number, target: Element) => (target === cards[0] ? -2.5 : 2.5),
          scale: (_: number, target: Element) => (target === cards[0] ? 1.02 : 0.98),
          ease: 'none',
          stagger: 0.08,
        }, 0)
      })
    }, sectionRef)

    return () => {
      mm.revert()
      ctx.revert()
    }
  }, [])

  return (
    <section id="projects" ref={sectionRef} data-nav-section className="scroll-mt-28">
      <Container className="py-16">
        <div className="mb-6" data-projects-heading>
          <p className={sectionLabelClass}>Projects</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white">Work beyond the day job</h2>
          <p className="mt-4 max-w-2xl text-slate-300">
            A short cinematic pause helps the projects land with more presence, depth, and focus.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={project.name}
              ref={(el) => { cardsRef.current[index] = el }}
              className={`${cardClass} min-h-[260px] overflow-hidden p-6 transition hover:-translate-y-0.5 relative`}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/50 to-transparent" />
              <span className={sectionLabelClass}>{project.stack}</span>
              <h3 className="text-2xl font-semibold text-white">{project.name}</h3>
              <p className="mt-4 text-slate-300">{project.description}</p>
              <p className="my-4 text-slate-300">{project.impact}</p>
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-400">
                <span>Case study available on request</span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
