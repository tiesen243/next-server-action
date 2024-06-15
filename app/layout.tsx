import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'

import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'
import { siteConfig } from '@/lib/site'
import './globals.css'

export const metadata = siteConfig.meta
export const viewport = siteConfig.viewport

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <html lang="en" suppressHydrationWarning>
    <body className={`${inter.variable} font-sans`}>
      <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
        <Header />
        <main className="container my-4">{children}</main>
        <Toaster />
      </ThemeProvider>
    </body>
  </html>
)

export default RootLayout
