'use client'
import { lazy, Suspense, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScroll } from '@/context/ScrollContext'
import { profile, contact, sectionLabelClass, cardClass } from '@/data/cv'

const HeroScene = lazy(() => import('./HeroScene').then((m) => ({ default: m.HeroScene })))

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const lenis = useScroll()
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const scrollYRef = useRef(0)

  // Keep scrollYRef updated and drive hero glow
  useEffect(() => {
    if (!lenis) return
    const handler = ({ scroll }: { scroll: number }) => {
      scrollYRef.current = scroll
      if (glowRef.current) {
        const heroAtmosphere = Math.min(scroll / 900, 1)
        glowRef.current.style.opacity = String(Math.max(0.2, 1 - scroll / 640))
        glowRef.current.style.filter = `blur(${32 + heroAtmosphere * 28}px)`
        glowRef.current.style.transform = `scale(${1 + heroAtmosphere * 0.18})`
      }
    }
    lenis.on('scroll', handler)
    return () => { lenis.off('scroll', handler) }
  }, [lenis])

  // GSAP animations
  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      if (textRef.current && visualRef.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
          .to(textRef.current, { yPercent: -18, opacity: 0.45, ease: 'none' }, 0)
          .to(visualRef.current, { yPercent: -8, rotation: 4, scale: 1.05, ease: 'none' }, 0)
      }

      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { y: 48, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 82%',
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={sectionRef} className="scroll-mt-24">
      <div className="mx-auto w-[min(1120px,calc(100%-1rem))] px-0 pb-20 pt-24 md:w-[min(1120px,calc(100%-2rem))] md:pt-28">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div
            ref={textRef}
            className="translate-y-0 opacity-100 transition duration-700 ease-out will-change-transform motion-reduce:transform-none motion-reduce:transition-none"
          >
            <div className="flex flex-col items-start" data-parallax data-depth="0.1">
              <div className={sectionLabelClass}>{profile.title}</div>
              <h1 className="mt-4 max-w-[12ch] text-5xl font-semibold leading-none text-white sm:text-6xl md:text-7xl">
                Building refined web experiences with practical engineering underneath.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{profile.intro}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 px-5 py-3 text-sm font-medium text-white shadow-[0_10px_30px_rgba(109,93,252,0.28)] transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
                  href={`mailto:${contact.email}`}
                >
                  Get in touch
                </a>
                <a
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-slate-100 transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
                  href="#projects"
                >
                  View projects
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">{profile.location}</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">{contact.email}</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">{contact.phone}</span>
              </div>
            </div>
          </div>

          <div
            ref={visualRef}
            className="relative translate-y-0 opacity-100 transition duration-700 ease-out will-change-transform motion-reduce:transform-none motion-reduce:transition-none"
          >
            <div
              ref={glowRef}
              className="pointer-events-none absolute inset-x-[6%] top-[0%] z-0 h-52 rounded-full bg-violet-400/15 transition-all duration-300"
              style={{ opacity: 1, filter: 'blur(32px)', transform: 'scale(1)' }}
            />
            <div className="absolute inset-x-[18%] top-[16%] z-0 h-32 rounded-full bg-cyan-400/12 blur-3xl" data-parallax data-depth="0.22" />
            <div className="relative z-10">
              <Suspense
                fallback={
                  <div className="h-[340px] w-full rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(139,92,246,0.18),transparent_30%),radial-gradient(circle_at_70%_60%,rgba(34,211,238,0.14),transparent_26%),linear-gradient(180deg,#05060b_0%,#0a0d14_100%)] md:h-[460px]" />
                }
              >
                <HeroScene scrollYRef={scrollYRef} />
              </Suspense>
            </div>
            <aside
              className={`${cardClass} relative z-20 -mt-16 mx-4 overflow-hidden p-6 backdrop-blur-md md:mx-8`}
              aria-label="Professional snapshot"
              data-parallax
              data-depth="0.08"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/60 to-transparent" />
              <p className={sectionLabelClass}>Snapshot</p>
              <h2 className="text-3xl font-semibold text-white">{profile.name}</h2>
              <p className="mt-4 text-slate-300">{profile.summary}</p>
              <ul className="mt-5 grid gap-3 pl-5 text-slate-200">
                {profile.strengths.map((strength) => (
                  <li key={strength}>{strength}</li>
                ))}
              </ul>
            </aside>
          </div>
        </div>

        <div ref={statsRef} className="mt-8 grid gap-4 md:grid-cols-3">
          {profile.stats.map((item) => (
            <div
              key={item.label}
              className={`${cardClass} rounded-2xl p-5 transition hover:-translate-y-0.5 translate-y-0 opacity-100 transition duration-700 ease-out will-change-transform`}
            >
              <strong className="block text-xl text-white">{item.value}</strong>
              <span className="mt-1 block text-slate-400">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
