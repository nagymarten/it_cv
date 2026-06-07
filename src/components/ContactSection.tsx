import { sectionLabelClass, cardClass, revealBaseClass, contact } from '@/data/cv'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'

export default function ContactSection() {
  return (
    <Section id="contact">
      <Container className={`${cardClass} ${revealBaseClass} mb-10 overflow-hidden p-6 pb-8 md:p-8 md:pb-10`}>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
        <p className={sectionLabelClass}>Contact</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-white">Let&apos;s build something solid and thoughtful.</h2>
        <p className="mt-3 max-w-4xl text-slate-300">
          Available for frontend and full stack opportunities, product-focused collaboration, and modern web projects.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <a
            className="flex min-h-14 items-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-slate-200 transition hover:border-violet-300/35 hover:bg-white/8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 touch-manipulation"
            href={`mailto:${contact.email}`}
          >
            {contact.email}
          </a>
          <a
            className="flex min-h-14 items-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-slate-200 transition hover:border-violet-300/35 hover:bg-white/8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 touch-manipulation"
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
          <Button href={`mailto:${contact.email}`}>Start a conversation</Button>
        </div>
      </Container>
    </Section>
  )
}
