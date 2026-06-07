import HeroSection from '@/components/sections/HeroSection'
import IntroSection from '@/components/sections/IntroSection'
import GridSection from '@/components/sections/GridSection'
import QuoteSection from '@/components/sections/QuoteSection'

export default function Page() {
  return (
    <main id="top" style={{ paddingTop: '64px' }}>
      <HeroSection />
      <IntroSection />
      <GridSection />
      <QuoteSection />
    </main>
  )
}