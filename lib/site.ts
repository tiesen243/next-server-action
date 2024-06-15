import type { Metadata, Viewport } from 'next'
import { env } from 'process'

export type SiteConfig = {
  meta: Metadata
  viewport: Viewport
}

export const baseUrl =
  env.NODE_ENV === 'production' && env.APP_URL ? `https://${env.APP_URL}` : 'http://localhost:3000'

export const siteConfig: SiteConfig = {
  meta: {
    metadataBase: new URL(baseUrl),
    title: 'Next.js Server Action',
    applicationName: 'Next.js Server Action',
    description: 'Next.js Server Action Starter Template with TypeScript, Tailwind CSS',
    openGraph: { images: ['/og'] },
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
  },
  viewport: {
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: 'hsl(0 0% 100%)' },
      { media: '(prefers-color-scheme: dark)', color: 'hsl(240 10% 3.9%)' },
    ],
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}
