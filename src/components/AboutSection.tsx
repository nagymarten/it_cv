import { sectionLabelClass, revealBaseClass, profile } from '@/data/cv'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'

export default function AboutSection() {
  return (
    <Section>
      <Container className={`grid gap-8 py-16 lg:grid-cols-[0.9fr_1.1fr] ${revealBaseClass}`}>
        <div data-parallax data-depth="0.08">
          <p className={sectionLabelClass}>About</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white">{profile.name}</h2>
        </div>
        <div className="grid gap-5 text-slate-300" data-parallax data-depth="0.12">
          <p>{profile.summary}</p>
          <p>
            I enjoy translating complex product requirements into clean user-facing experiences, with a strong focus on maintainability, clarity, and dependable delivery.
          </p>
        </div>
      </Container>
    </Section>
  )
}
