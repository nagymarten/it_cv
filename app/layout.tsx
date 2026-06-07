import { Provider } from "@/components/ui/provider"
import SmoothScroll from '@/components/SmoothScroll'
import Header from '@/components/Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <Provider>
            <Header />
            {children}
          </Provider>
        </SmoothScroll>
      </body>
    </html>
  )
}