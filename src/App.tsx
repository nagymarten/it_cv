import { useEffect } from 'react'
import Lenis from 'lenis'

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

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    })

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }

    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(116,55,255,0.18),transparent_32%),linear-gradient(180deg,#0a0a0f_0%,#0d0d14_42%,#09090d_100%)] text-slate-100">
      <header className="sticky top-0 z-20 flex flex-col gap-4 border-b border-white/10 bg-[rgba(10,10,15,0.72)] px-4 py-4 backdrop-blur-xl md:flex-row md:items-center md:justify-between md:px-8">
        <a className="text-sm uppercase tracking-[0.18em] text-white" href="#top">
          Martin Nagy
        </a>
        <nav aria-label="Primary navigation" className="flex flex-wrap items-center justify-center gap-5 text-sm text-slate-300">
          {navItems.map((item) => (
            <a key={item.href} className="transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-violet-300/35 bg-violet-400/10 px-4 py-3 text-sm text-slate-100 transition hover:bg-violet-400/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
          href={`mailto:${contact.email}`}
        >
          Let&apos;s talk
        </a>
      </header>

      <main id="top">
        <section className="mx-auto w-[min(1120px,calc(100%-1rem))] px-0 pb-20 pt-24 md:w-[min(1120px,calc(100%-2rem))] md:pt-28">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
            <div className="flex flex-col items-start">
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

            <aside className={`${cardClass} p-7`} aria-label="Professional snapshot">
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

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {profile.stats.map((item) => (
              <div key={item.label} className={`${cardClass} rounded-2xl p-5 transition hover:-translate-y-0.5`}>
                <strong className="block text-xl text-white">{item.value}</strong>
                <span className="mt-1 block text-slate-400">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="mx-auto grid w-[min(1120px,calc(100%-1rem))] gap-8 py-16 md:w-[min(1120px,calc(100%-2rem))] lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className={sectionLabelClass}>About</p>
            <h2 className="text-4xl font-semibold text-white">{profile.name}</h2>
          </div>
          <div className="grid gap-5 text-slate-300">
            <p>{profile.summary}</p>
            <p>
              I enjoy translating complex product requirements into clean user-facing experiences, with a strong focus on maintainability, clarity, and dependable delivery.
            </p>
          </div>
        </section>

        <section id="experience" className="mx-auto w-[min(1120px,calc(100%-1rem))] py-16 md:w-[min(1120px,calc(100%-2rem))]">
          <div className="mb-6">
            <p className={sectionLabelClass}>Experience</p>
            <h2 className="text-4xl font-semibold text-white">Selected roles</h2>
          </div>
          <div className="grid gap-4">
            {experiences.map((item) => (
              <article key={`${item.company}-${item.period}`} className={`${cardClass} p-6 transition hover:-translate-y-0.5`}>
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
        </section>

        <section id="projects" className="mx-auto w-[min(1120px,calc(100%-1rem))] py-16 md:w-[min(1120px,calc(100%-2rem))]">
          <div className="mb-6">
            <p className={sectionLabelClass}>Projects</p>
            <h2 className="text-4xl font-semibold text-white">Work beyond the day job</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <article key={project.name} className={`${cardClass} min-h-[240px] p-6 transition hover:-translate-y-0.5`}>
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
        </section>

        <section className="mx-auto grid w-[min(1120px,calc(100%-1rem))] gap-8 py-14 md:w-[min(1120px,calc(100%-2rem))] lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className={sectionLabelClass}>Skills</p>
            <h2 className="text-4xl font-semibold text-white">What I work with</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-white">Frontend</h3>
              <p className="text-slate-300">{skills.frontend.join(' • ')}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Backend</h3>
              <p className="text-slate-300">{skills.backend.join(' • ')}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Tools</h3>
              <p className="text-slate-300">{skills.tools.join(' • ')}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Workflow</h3>
              <p className="text-slate-300">{skills.workflow.join(' • ')}</p>
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-[min(1120px,calc(100%-1rem))] gap-8 py-14 md:w-[min(1120px,calc(100%-2rem))] lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className={sectionLabelClass}>Education & Languages</p>
            <h2 className="text-4xl font-semibold text-white">Foundation</h2>
          </div>
          <div className="grid gap-5 text-slate-300">
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
        </section>

        <section id="contact" className={`mx-auto mb-16 w-[min(1120px,calc(100%-1rem))] p-6 md:w-[min(1120px,calc(100%-2rem))] md:p-8 ${cardClass}`}>
          <p className={sectionLabelClass}>Contact</p>
          <h2 className="mt-3 text-4xl font-semibold text-white">Let&apos;s build something solid and thoughtful.</h2>
          <p className="mt-3 max-w-4xl text-slate-300">
            Available for frontend and full stack opportunities, product-focused collaboration, and modern web projects.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <a
              className="flex min-h-14 items-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-slate-200"
              href={`mailto:${contact.email}`}
            >
              {contact.email}
            </a>
            <a
              className="flex min-h-14 items-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-slate-200"
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
            <a
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-slate-100 transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
              href="#top"
            >
              Back to top
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
