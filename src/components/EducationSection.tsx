import { sectionLabelClass, revealBaseClass, education } from '@/data/cv'

export default function EducationSection() {
  return (
    <section className="scroll-mt-28">
      <div className={`mx-auto grid w-[min(1120px,calc(100%-1rem))] gap-8 py-10 md:w-[min(1120px,calc(100%-2rem))] lg:grid-cols-[0.9fr_1.1fr] ${revealBaseClass}`}>
        <div data-parallax data-depth="0.05">
          <p className={sectionLabelClass}>Education &amp; Languages</p>
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
  )
}
