import './globals.css'
import type { Metadata, Viewport } from 'next'
import { DM_Sans } from 'next/font/google'
import { Providers } from '@/components/providers'

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rainbownaire - Web3 Quiz Game',
  description: 'A Web3 twist on the classic "Who Wants to Be a Millionaire," built for the Rainbow Wallet community.',
  keywords: ['Web3', 'Quiz', 'Rainbow Wallet', 'Crypto', 'Game'],
  authors: [{ name: 'Rainbownaire Team' }],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Rainbownaire - Web3 Quiz Game',
    description: 'Test your Web3 knowledge and become a Rainbownaire!',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rainbownaire - Web3 Quiz Game',
    description: 'Test your Web3 knowledge and become a Rainbownaire!',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#667eea',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={dmSans.className} suppressHydrationWarning>
        <Providers>
          <main className="min-h-screen bg-white" suppressHydrationWarning>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
