import HeroSection from '@/components/sections/HeroSection'
import IntroSection from '@/components/sections/IntroSection'

export default function Page() {
  return (
    <main id="top" style={{ paddingTop: '64px' }}>
      <HeroSection />
      <IntroSection />
    </main>
  )
}