import { Provider } from "@/components/ui/provider"
import SmoothScroll from '@/components/SmoothScroll'
import Header from '@/components/Header'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SmoothScroll>
          <Provider>
            <Header />
            {children}
            <SpeedInsights />
          </Provider>
        </SmoothScroll>
      </body>
    </html>
  )
}