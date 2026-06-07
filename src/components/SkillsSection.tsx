import { sectionLabelClass, cardClass, revealBaseClass, skills } from '@/data/cv'

export default function SkillsSection() {
  return (
    <section className="scroll-mt-28">
      <div className={`mx-auto grid w-[min(1120px,calc(100%-1rem))] gap-8 py-12 md:w-[min(1120px,calc(100%-2rem))] lg:grid-cols-[0.9fr_1.1fr] ${revealBaseClass}`}>
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
  )
}
