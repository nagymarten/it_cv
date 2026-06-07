export type ExperienceItem = {
  role: string
  company: string
  location: string
  period: string
  summary: string
  highlights: string[]
}

export type ProjectItem = {
  name: string
  stack: string
  description: string
  impact: string
}

export const profile = {
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

export const experiences: ExperienceItem[] = [
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

export const projects: ProjectItem[] = [
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

export const skills = {
  frontend: ['React', 'Next.js', 'Angular', 'TypeScript', 'Chakra UI'],
  backend: ['C#', 'API integrations', 'Async workflow concepts'],
  tools: ['Git', 'GitLab', 'Gitea', 'Jest', 'TanStack Query', 'Claude'],
  workflow: ['Teamwork', 'Communication', 'Precision', 'Code reviews'],
}

export const education = {
  school: 'University of Szeged – Faculty of Science and Informatics',
  degree: 'BSc in Computer Science',
  year: '2025',
  note: 'Graduated with a focus on software development and engineering principles.',
}

export const contact = {
  email: 'nagy.martin19@gmail.com',
  phone: '+36 30 540 2090',
  linkedin: 'LinkedIn available on request',
  github: 'GitHub available on request',
}

export const navItems = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export const sectionLabelClass = 'mb-3 inline-block text-xs font-semibold uppercase tracking-[0.22em] text-violet-300'
export const cardClass = 'rounded-3xl border border-white/10 bg-white/[0.035] shadow-[0_20px_60px_rgba(0,0,0,0.24)]'
export const revealBaseClass = 'transition duration-700 ease-out will-change-transform motion-reduce:transform-none motion-reduce:transition-none'

export const SCROLL = {
  HEADER_HEIGHT: 96,
  PROGRESS_RANGE: 2200,
  HERO_GLOW_FADE: 640,
  HERO_ATMOSPHERE_RANGE: 900,
  BACK_TO_TOP_THRESHOLD: 800,
} as const
