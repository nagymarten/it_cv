import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'

const HeroScene = lazy(() => import('./components/HeroScene').then((module) => ({ default: module.HeroScene })))

gsap.registerPlugin(ScrollTrigger)

type ExperienceItem = {
  role: string
  company: string
  location: string
  period: string
  summary: string
  highlights: string[]
}

type ProjectItem = {
  name: string
  stack: string
  description: string
  impact: string
}

const profile = {
  name: 'Martin Nagy',
  title: 'Full Stack Developer',
  location: 'Szeged, Hungary',
  summary:
    'Software developer with hands-on experience building modern web products with React, Angular, TypeScript, and C#. I care about clean implementation, strong UX, and shipping reliable features with a collaborative team.',
  intro:
    'I build polished, practical digital products, from multilingual marketing sites to complex internal tools with async workflows, data validation, and scalable frontend architecture.',
  strengths: [
    'Modern frontend engineering with React, Next.js, and Angular',
    'Full stack product delivery with TypeScript and C#',
    'Clear communication, teamwork, and precision in execution',
  ],
  stats: [
    { label: 'Core stack', value: 'React, TS, C#' },
    { label: 'Languages', value: 'HU, EN, DE' },
    { label: 'Focus', value: 'Web apps and UX' },
  ],
}

const experiences: ExperienceItem[] = [
  {
    role: 'Fullstack Developer',
    company: 'Integrate ltd. (constructor)',
    location: 'Helsingborg, Sweden',
    period: 'Oct 2025 – Present',
    summary:
      'Revamped a detailed data transformation tool inside a lead management system using React and TypeScript.',
    highlights: [
      'Implemented advanced flows including third-party API integrations, validation rules, and VLOOKUP-style reference list matching in a multi-step wizard.',
      'Built custom TanStack Query hooks, a styled UI, and a rule builder architecture based on discriminated unions.',
      'Integrated async job concepts on the frontend, supported feature flags, and maintained reliability with Jest tests and disciplined Git workflows.',
    ],
  },
  {
    role: 'Fullstack Developer',
    company: 'Sinnsmart (Ingenimind Kft.)',
    location: 'Szeged, Hungary',
    period: 'Jul 2025 – Sep 2025',
    summary:
      'Built a contemporary, multilingual landing page designed for responsiveness, maintainability, and brand consistency.',
    highlights: [
      'Developed reusable React and Next.js components with Chakra UI and next-intl for localization.',
      'Focused on mobile responsiveness and a sleek, user-friendly presentation aligned with the company brand.',
      'Helped shape a Vercel-backed foundation for potential future job posting functionality.',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'MUD (Ingenimind Kft.)',
    location: 'Szeged, Hungary',
    period: 'Sep 2023 – Apr 2024',
    summary:
      'Contributed to frontend development work in a professional team setup using Angular-based tooling and Git platforms.',
    highlights: [
      'Worked with Angular in an active product environment.',
      'Used Gitea and GitLab as part of the development workflow.',
      'Strengthened collaboration habits around implementation and version control.',
    ],
  },
]

const projects: ProjectItem[] = [
  {
    name: 'Api Loom',
    stack: 'Angular, OpenAPI, Swagger',
    description:
      'An open source specification editor and viewer for Swagger 2.0 and OpenAPI 3.x documents with a visual editing experience.',
    impact:
      'Makes API documentation and contract management more approachable for teams through a practical UI-driven workflow.',
  },
  {
    name: 'Human Benchmark for Garmin',
    stack: 'Monkey C, Garmin',
    description:
      'An interactive watch application designed to measure reaction time, focus, and memory through lightweight cognitive exercises.',
    impact:
      'Combines playful UX with a custom formula that estimates brain age from user performance data.',
  },
]

const skills = {
  frontend: ['React', 'Next.js', 'Angular', 'TypeScript', 'Chakra UI'],
  backend: ['C#', 'API integrations', 'Async workflow concepts'],
  tools: ['Git', 'GitLab', 'Gitea', 'Jest', 'TanStack Query', 'Claude'],
  workflow: ['Teamwork', 'Communication', 'Precision', 'Code reviews'],
}

const education = {
  school: 'University of Szeged – Faculty of Science and Informatics',
  degree: 'BSc in Computer Science',
  year: '2025',
  note: 'Graduated with a focus on software development and engineering principles.',
}

const contact = {
  email: 'nagy.martin19@gmail.com',
  phone: '+36 30 540 2090',
  linkedin: 'LinkedIn available on request',
  github: 'GitHub available on request',
}

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

const sectionLabelClass = 'mb-3 inline-block text-xs font-semibold uppercase tracking-[0.22em] text-violet-300'
const cardClass = 'rounded-3xl border border-white/10 bg-white/[0.035] shadow-[0_20px_60px_rgba(0,0,0,0.24)]'
const revealBaseClass = 'transition duration-700 ease-out will-change-transform motion-reduce:transform-none motion-reduce:transition-none'

function App() {
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState('#about')
  const [revealed, setRevealed] = useState<Record<string, boolean>>({ hero: true })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const appRef = useRef<HTMLDivElement | null>(null)
  const heroSectionRef = useRef<HTMLElement | null>(null)
  const heroTextRef = useRef<HTMLDivElement | null>(null)
  const heroVisualRef = useRef<HTMLDivElement | null>(null)
  const heroStatsRef = useRef<HTMLDivElement | null>(null)
  const projectsSectionRef = useRef<HTMLElement | null>(null)
  const projectCardsRef = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      anchors: { offset: 96 },
      stopInertiaOnNavigate: true,
      duration: 1.05,
      wheelMultiplier: 0.95,
      touchMultiplier: 1,
    })

    const handleScroll = ({ scroll }: { scroll: number }) => {
      setScrollY(scroll)
      ScrollTrigger.update()
    }

    lenis.on('scroll', handleScroll)

    return () => {
      lenis.off('scroll', handleScroll)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        setRevealed((prev) => {
          const next = { ...prev }
          for (const entry of entries) {
            const id = entry.target.id
            if (!id) continue
            if (entry.isIntersecting) {
              next[id] = true
            }
          }
          return next
        })

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target?.id) {
          setActiveSection(`#${visible.target.id}`)
        }
      },
      {
        threshold: [0.2, 0.45, 0.7],
        rootMargin: '-20% 0px -20% 0px',
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const ctx = gsap.context(() => {
      if (heroTextRef.current && heroVisualRef.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
          .to(heroTextRef.current, { yPercent: -18, opacity: 0.45, ease: 'none' }, 0)
          .to(heroVisualRef.current, { yPercent: -8, rotation: 4, scale: 1.05, ease: 'none' }, 0)
      }

      if (heroStatsRef.current) {
        gsap.fromTo(
          heroStatsRef.current.children,
          { y: 48, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heroStatsRef.current,
              start: 'top 82%',
            },
          },
        )
      }

      projectCardsRef.current.forEach((card, index) => {
        if (!card) return

        gsap.fromTo(
          card,
          {
            y: 120,
            opacity: 0,
            rotateX: -14,
            scale: 0.94,
            transformPerspective: 1200,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 1.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: projectsSectionRef.current,
              start: 'top 72%',
            },
            delay: index * 0.08,
          },
        )
      })

      if (projectsSectionRef.current) {
        const cards = projectCardsRef.current.filter(Boolean)
        gsap.timeline({
          scrollTrigger: {
            trigger: projectsSectionRef.current,
            start: 'top top+=80',
            end: '+=500',
            scrub: 1,
            pin: window.innerWidth >= 1024,
          },
        })
          .to(projectsSectionRef.current.querySelector('[data-projects-heading]'), {
            y: -36,
            opacity: 0.4,
            ease: 'none',
          }, 0)
          .to(cards, {
            y: (_, target) => (target === cards[0] ? -20 : 24),
            rotate: (_, target) => (target === cards[0] ? -2.5 : 2.5),
            scale: (_, target) => (target === cards[0] ? 1.02 : 0.98),
            ease: 'none',
            stagger: 0.08,
          }, 0)
      }

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
    }, appRef)

    return () => ctx.revert()
  }, [])

  const heroOffset = Math.min(scrollY * 0.08, 36)
  const heroGlowOpacity = Math.max(0.2, 1 - scrollY / 640)
  const navScrolled = scrollY > 20
  const progress = Math.min(scrollY / 2200, 1)
  const showBackToTop = scrollY > 800
  const heroAtmosphere = Math.min(scrollY / 900, 1)

  const revealClass = (key: string) =>
    `${revealBaseClass} ${revealed[key] ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`

  const heroSceneDepth = useMemo(
    () => ({
      glowScale: 1 + heroAtmosphere * 0.18,
      glowBlur: 32 + heroAtmosphere * 28,
    }),
    [heroAtmosphere],
  )

  return (
    <div
      ref={appRef}
      className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(116,55,255,0.18),transparent_32%),linear-gradient(180deg,#05060b_0%,#0d0d14_42%,#08080d_100%)] text-slate-100"
    >
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute left-[-12%] top-[-8%] h-[28rem] w-[28rem] rounded-full bg-violet-500/18 blur-[120px]"
          data-parallax
          data-depth="0.18"
        />
        <div
          className="absolute right-[-10%] top-[18%] h-[26rem] w-[26rem] rounded-full bg-cyan-400/12 blur-[120px]"
          data-parallax
          data-depth="0.24"
        />
        <div
          className="absolute bottom-[-14%] left-[24%] h-[24rem] w-[24rem] rounded-full bg-fuchsia-500/10 blur-[140px]"
          data-parallax
          data-depth="0.14"
        />
      </div>

      <div className="fixed left-0 right-0 top-0 z-30 h-[2px] bg-white/5">
        <div className="h-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 transition-[width] duration-200" style={{ width: `${progress * 100}%` }} />
      </div>

      <header
        className={`sticky top-0 z-20 border-b px-4 py-4 backdrop-blur-xl transition-all duration-300 md:px-8 ${
          navScrolled
            ? 'border-white/10 bg-[rgba(10,10,15,0.82)] shadow-[0_10px_40px_rgba(0,0,0,0.18)]'
            : 'border-white/5 bg-[rgba(10,10,15,0.58)]'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <a className="text-sm uppercase tracking-[0.18em] text-white" href="#top">
            Martin Nagy
          </a>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <span className="text-lg leading-none">{mobileMenuOpen ? '×' : '☰'}</span>
          </button>

          <nav aria-label="Primary navigation" className="hidden items-center justify-center gap-5 text-sm text-slate-300 md:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.href
              return (
                <a
                  key={item.href}
                  className={`rounded-full px-3 py-2 transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 ${
                    isActive ? 'bg-white/8 text-white' : 'hover:text-white'
                  }`}
                  href={item.href}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>

          <a
            className="hidden min-h-12 items-center justify-center rounded-full border border-violet-300/35 bg-violet-400/10 px-4 py-3 text-sm text-slate-100 transition hover:bg-violet-400/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 md:inline-flex"
            href={`mailto:${contact.email}`}
          >
            Let&apos;s talk
          </a>
        </div>

        {mobileMenuOpen && (
          <div className="mt-4 grid gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-4 md:hidden">
            {navItems.map((item) => {
              const isActive = activeSection === item.href
              return (
                <a
                  key={item.href}
                  className={`rounded-2xl px-4 py-3 text-sm transition ${isActive ? 'bg-white/8 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              )
            })}
            <a
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-violet-300/35 bg-violet-400/10 px-4 py-3 text-sm text-slate-100 transition hover:bg-violet-400/20"
              href={`mailto:${contact.email}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Let&apos;s talk
            </a>
          </div>
        )}
      </header>

      <main id="top">
        <section id="hero" ref={heroSectionRef} className="scroll-mt-24">
          <div className="mx-auto w-[min(1120px,calc(100%-1rem))] px-0 pb-20 pt-24 md:w-[min(1120px,calc(100%-2rem))] md:pt-28">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div ref={heroTextRef} className={revealClass('hero')} style={{ transform: `translateY(${heroOffset}px)` }}>
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

              <div ref={heroVisualRef} className={`${revealClass('hero')} relative`}>
                <div
                  className="pointer-events-none absolute inset-x-[6%] top-[0%] z-0 h-52 rounded-full bg-violet-400/15 transition-all duration-300"
                  style={{
                    opacity: heroGlowOpacity,
                    filter: `blur(${heroSceneDepth.glowBlur}px)`,
                    transform: `scale(${heroSceneDepth.glowScale})`,
                  }}
                />
                <div className="absolute inset-x-[18%] top-[16%] z-0 h-32 rounded-full bg-cyan-400/12 blur-3xl" data-parallax data-depth="0.22" />
                <div className="relative z-10">
                  <Suspense
                    fallback={
                      <div className="h-[340px] w-full rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(139,92,246,0.18),transparent_30%),radial-gradient(circle_at_70%_60%,rgba(34,211,238,0.14),transparent_26%),linear-gradient(180deg,#05070d_0%,#0a0d16_100%)] md:h-[460px]" />
                    }
                  >
                    <HeroScene scrollY={scrollY} />
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

            <div ref={heroStatsRef} className="mt-8 grid gap-4 md:grid-cols-3">
              {profile.stats.map((item) => (
                <div key={item.label} className={`${cardClass} ${revealClass('hero')} rounded-2xl p-5 transition hover:-translate-y-0.5`}>
                  <strong className="block text-xl text-white">{item.value}</strong>
                  <span className="mt-1 block text-slate-400">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-28">
          <div className={`mx-auto grid w-[min(1120px,calc(100%-1rem))] gap-8 py-16 md:w-[min(1120px,calc(100%-2rem))] lg:grid-cols-[0.9fr_1.1fr] ${revealClass('about')}`}>
            <div data-parallax data-depth="0.08">
              <p className={sectionLabelClass}>About</p>
              <h2 className="text-4xl font-semibold text-white">{profile.name}</h2>
            </div>
            <div className="grid gap-5 text-slate-300" data-parallax data-depth="0.12">
              <p>{profile.summary}</p>
              <p>
                I enjoy translating complex product requirements into clean user-facing experiences, with a strong focus on maintainability, clarity, and dependable delivery.
              </p>
            </div>
          </div>
        </section>

        <section id="experience" className="scroll-mt-28">
          <div className="mx-auto w-[min(1120px,calc(100%-1rem))] py-16 md:w-[min(1120px,calc(100%-2rem))]">
            <div className={`mb-6 ${revealClass('experience')}`} data-parallax data-depth="0.06">
              <p className={sectionLabelClass}>Experience</p>
              <h2 className="text-4xl font-semibold text-white">Selected roles</h2>
            </div>
            <div className="grid gap-4">
              {experiences.map((item, index) => (
                <article
                  key={`${item.company}-${item.period}`}
                  className={`${cardClass} ${revealClass('experience')} p-6 transition hover:-translate-y-0.5`}
                  style={{ transitionDelay: `${index * 90}ms` }}
                  data-parallax
                  data-depth={index % 2 === 0 ? '0.08' : '0.12'}
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">{item.role}</h3>
                      <p className="text-slate-400">{item.company}</p>
                    </div>
                    <div className="grid gap-1 text-sm text-slate-400 md:text-right">
                      <span>{item.period}</span>
                      <span>{item.location}</span>
                    </div>
                  </div>
                  <p className="my-4 text-slate-300">{item.summary}</p>
                  <ul className="grid gap-3 pl-5 text-slate-200">
                    {item.highlights.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" ref={projectsSectionRef} className="scroll-mt-28">
          <div className="mx-auto w-[min(1120px,calc(100%-1rem))] py-16 md:w-[min(1120px,calc(100%-2rem))]">
            <div className={`mb-6 ${revealClass('projects')}`} data-projects-heading>
              <p className={sectionLabelClass}>Projects</p>
              <h2 className="text-4xl font-semibold text-white">Work beyond the day job</h2>
              <p className="mt-4 max-w-2xl text-slate-300">
                A short cinematic pause helps the projects land with more presence, depth, and focus.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((project, index) => (
                <article
                  key={project.name}
                  ref={(element) => {
                    projectCardsRef.current[index] = element
                  }}
                  className={`${cardClass} ${revealClass('projects')} min-h-[260px] overflow-hidden p-6 transition hover:-translate-y-0.5`}
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
          </div>
        </section>

        <section className="scroll-mt-28">
          <div className={`mx-auto grid w-[min(1120px,calc(100%-1rem))] gap-8 py-12 md:w-[min(1120px,calc(100%-2rem))] lg:grid-cols-[0.9fr_1.1fr] ${revealClass('skills')}`}>
            <div data-parallax data-depth="0.06">
              <p className={sectionLabelClass}>Skills</p>
              <h2 className="text-4xl font-semibold text-white">What I work with</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className={cardClass + ' p-5'}>
                <h3 className="text-xl font-semibold text-white">Frontend</h3>
                <p className="text-slate-300">{skills.frontend.join(' • ')}</p>
              </div>
              <div className={cardClass + ' p-5'}>
                <h3 className="text-xl font-semibold text-white">Backend</h3>
                <p className="text-slate-300">{skills.backend.join(' • ')}</p>
              </div>
              <div className={cardClass + ' p-5'}>
                <h3 className="text-xl font-semibold text-white">Tools</h3>
                <p className="text-slate-300">{skills.tools.join(' • ')}</p>
              </div>
              <div className={cardClass + ' p-5'}>
                <h3 className="text-xl font-semibold text-white">Workflow</h3>
                <p className="text-slate-300">{skills.workflow.join(' • ')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="scroll-mt-28">
          <div className={`mx-auto grid w-[min(1120px,calc(100%-1rem))] gap-8 py-10 md:w-[min(1120px,calc(100%-2rem))] lg:grid-cols-[0.9fr_1.1fr] ${revealClass('education')}`}>
            <div data-parallax data-depth="0.05">
              <p className={sectionLabelClass}>Education & Languages</p>
              <h2 className="text-4xl font-semibold text-white">Foundation</h2>
            </div>
            <div className="grid gap-5 text-slate-300" data-parallax data-depth="0.1">
              <div>
                <h3 className="text-xl font-semibold text-white">{education.degree}</h3>
                <p>{education.school}</p>
                <p>
                  {education.year} • {education.note}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Languages</h3>
                <p>Hungarian (Native) • English (B2) • German (Basic)</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Certification</h3>
                <p>Euroexam B2 Complex Language Certificate in English</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-28">
          <div className={`${cardClass} ${revealClass('contact')} mx-auto mb-10 w-[min(1120px,calc(100%-1rem))] overflow-hidden p-6 pb-8 md:w-[min(1120px,calc(100%-2rem))] md:p-8 md:pb-10`}>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
            <p className={sectionLabelClass}>Contact</p>
            <h2 className="mt-3 text-4xl font-semibold text-white">Let&apos;s build something solid and thoughtful.</h2>
            <p className="mt-3 max-w-4xl text-slate-300">
              Available for frontend and full stack opportunities, product-focused collaboration, and modern web projects.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <a
                className="flex min-h-14 items-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-slate-200 transition hover:border-violet-300/35 hover:bg-white/8"
                href={`mailto:${contact.email}`}
              >
                {contact.email}
              </a>
              <a
                className="flex min-h-14 items-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-slate-200 transition hover:border-violet-300/35 hover:bg-white/8"
                href={`tel:${contact.phone.replace(/\s+/g, '')}`}
              >
                {contact.phone}
              </a>
              <span className="flex min-h-14 items-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
                {contact.linkedin}
              </span>
              <span className="flex min-h-14 items-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
                {contact.github}
              </span>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 px-5 py-3 text-sm font-medium text-white shadow-[0_10px_30px_rgba(109,93,252,0.28)] transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
                href={`mailto:${contact.email}`}
              >
                Start a conversation
              </a>
            </div>
          </div>
        </section>
      </main>

      <a
        className={`fixed bottom-5 right-5 z-20 inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 bg-[rgba(10,10,15,0.82)] px-4 py-3 text-sm text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 ${
          showBackToTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
        href="#top"
      >
        Back to top
      </a>
    </div>
  )
}

export default App
