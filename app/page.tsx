import ScrollProvider from '@/components/ScrollProvider'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import ExperienceSection from '@/components/ExperienceSection'
import AboutSection from '@/components/AboutSection'
import ProjectsSection from '@/components/ProjectsSection'
import SkillsSection from '@/components/SkillsSection'
import EducationSection from '@/components/EducationSection'
import ContactSection from '@/components/ContactSection'
import ProgressBar from '@/components/ProgressBar'
import BackToTop from '@/components/BackToTop'
import SectionReveal from '@/components/SectionReveal'

export default function Page() {
  return (
    <ScrollProvider>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(116,55,255,0.18),transparent_32%),linear-gradient(180deg,#05060b_0%,#0d0d14_42%,#08080d_100%)] text-slate-100">
        {/* Skip to main content */}
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-violet-500 focus:px-4 focus:py-2 focus:text-sm focus:text-white focus:outline-none"
        >
          Skip to main content
        </a>

        {/* Background gradient blobs */}
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

        <ProgressBar />
        <Header />

        <main id="top">
          <HeroSection />

          <SectionReveal id="about">
            <AboutSection />
          </SectionReveal>

          <SectionReveal id="experience">
            <ExperienceSection />
          </SectionReveal>

          <ProjectsSection />

          <SectionReveal id="skills">
            <SkillsSection />
          </SectionReveal>

          <SectionReveal>
            <EducationSection />
          </SectionReveal>

          <SectionReveal id="contact">
            <ContactSection />
          </SectionReveal>
        </main>

        <BackToTop />
      </div>
    </ScrollProvider>
  )
}
