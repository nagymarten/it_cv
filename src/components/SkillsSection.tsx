import { sectionLabelClass, cardClass, revealBaseClass, skills } from '@/data/cv'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'

export default function SkillsSection() {
  return (
    <Section>
      <Container className={`grid gap-8 py-16 lg:grid-cols-[0.9fr_1.1fr] ${revealBaseClass}`}>
        <div data-parallax data-depth="0.06">
          <p className={sectionLabelClass}>Skills</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white">What I work with</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div className={cardClass + ' p-5'}>
            <h3 className="text-base md:text-xl font-semibold text-white">Frontend</h3>
            <p className="text-slate-300">{skills.frontend.join(' • ')}</p>
          </div>
          <div className={cardClass + ' p-5'}>
            <h3 className="text-base md:text-xl font-semibold text-white">Backend</h3>
            <p className="text-slate-300">{skills.backend.join(' • ')}</p>
          </div>
          <div className={cardClass + ' p-5'}>
            <h3 className="text-base md:text-xl font-semibold text-white">Tools</h3>
            <p className="text-slate-300">{skills.tools.join(' • ')}</p>
          </div>
          <div className={cardClass + ' p-5'}>
            <h3 className="text-base md:text-xl font-semibold text-white">Workflow</h3>
            <p className="text-slate-300">{skills.workflow.join(' • ')}</p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
