import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Learn English - Interactive Language Learning',
  description: 'Master English with interactive lessons, vocabulary, grammar exercises, and more',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
