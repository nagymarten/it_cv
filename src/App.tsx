import { useEffect } from 'react'
import Lenis from 'lenis'
import './App.css'

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
    <div className="page-shell">
      <header className="topbar">
        <span className="brand">Martin Nagy</span>
        <nav>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero section">
          <div className="eyebrow">Full Stack Developer</div>
          <h1>Building refined web experiences with practical engineering underneath.</h1>
          <p className="hero-copy">{profile.intro}</p>
          <div className="hero-meta">
            <span>{profile.location}</span>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
          </div>
          <div className="stats-grid">
            {profile.stats.map((item) => (
              <div key={item.label} className="stat-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="section two-col">
          <div>
            <p className="section-label">About</p>
            <h2>{profile.name}</h2>
          </div>
          <div className="stacked-copy">
            <p>{profile.summary}</p>
            <ul className="bullet-list">
              {profile.strengths.map((strength) => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="section-heading">
            <p className="section-label">Experience</p>
            <h2>Selected roles</h2>
          </div>
          <div className="timeline">
            {experiences.map((item) => (
              <article key={`${item.company}-${item.period}`} className="timeline-card">
                <div className="timeline-top">
                  <div>
                    <h3>{item.role}</h3>
                    <p className="company">{item.company}</p>
                  </div>
                  <div className="timeline-meta">
                    <span>{item.period}</span>
                    <span>{item.location}</span>
                  </div>
                </div>
                <p className="summary">{item.summary}</p>
                <ul className="bullet-list">
                  {item.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-heading">
            <p className="section-label">Projects</p>
            <h2>Work beyond the day job</h2>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.name} className="project-card">
                <span className="project-stack">{project.stack}</span>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <p className="impact">{project.impact}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section two-col compact">
          <div>
            <p className="section-label">Skills</p>
            <h2>What I work with</h2>
          </div>
          <div className="skills-layout">
            <div>
              <h3>Frontend</h3>
              <p>{skills.frontend.join(' • ')}</p>
            </div>
            <div>
              <h3>Backend</h3>
              <p>{skills.backend.join(' • ')}</p>
            </div>
            <div>
              <h3>Tools</h3>
              <p>{skills.tools.join(' • ')}</p>
            </div>
            <div>
              <h3>Workflow</h3>
              <p>{skills.workflow.join(' • ')}</p>
            </div>
          </div>
        </section>

        <section className="section two-col compact">
          <div>
            <p className="section-label">Education & Languages</p>
            <h2>Foundation</h2>
          </div>
          <div className="stacked-copy">
            <div>
              <h3>{education.degree}</h3>
              <p>{education.school}</p>
              <p>{education.year} • {education.note}</p>
            </div>
            <div>
              <h3>Languages</h3>
              <p>Hungarian (Native) • English (B2) • German (Basic)</p>
            </div>
            <div>
              <h3>Certification</h3>
              <p>Euroexam B2 Complex Language Certificate in English</p>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-card">
          <p className="section-label">Contact</p>
          <h2>Let&apos;s build something solid and thoughtful.</h2>
          <p>
            Available for frontend and full stack opportunities, product-focused collaboration, and modern web projects.
          </p>
          <div className="contact-grid">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={`tel:${contact.phone.replace(/\s+/g, '')}`}>{contact.phone}</a>
            <span>{contact.linkedin}</span>
            <span>{contact.github}</span>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
