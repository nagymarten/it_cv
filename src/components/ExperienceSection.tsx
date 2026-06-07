import { sectionLabelClass, cardClass, revealBaseClass, experiences } from '@/data/cv'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'

export default function ExperienceSection() {
  return (
    <Section>
      <Container className="py-16">
        <div className={`mb-6 ${revealBaseClass}`} data-parallax data-depth="0.06">
          <p className={sectionLabelClass}>Experience</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white">Selected roles</h2>
        </div>
        <div className="grid gap-4">
          {experiences.map((item, index) => (
            <article
              key={`${item.company}-${item.period}`}
              className={`${cardClass} ${revealBaseClass} p-6 transition hover:-translate-y-0.5`}
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
      </Container>
    </Section>
  )
}
