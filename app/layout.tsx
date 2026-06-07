import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Martin Nagy — Full Stack Developer',
  description: 'Software developer with hands-on experience building modern web products with React, Angular, TypeScript, and C#.',
  openGraph: {
    title: 'Martin Nagy — Full Stack Developer',
    description: 'Software developer building modern web products.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu">
      <body>{children}</body>
    </html>
  )
}
