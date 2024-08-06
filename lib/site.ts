import type { Metadata, Viewport } from 'next'

export type SiteConfig = {
  meta: Metadata
  viewport: Viewport
}

export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return window.location.origin
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const siteConfig: SiteConfig = {
  meta: {
    metadataBase: new URL(getBaseUrl()),
    icons: { icon: '/favicon.ico' },
    title: 'Next.js Server Action',
    applicationName: 'Next.js Server Action',
    description: 'Next.js Server Action Starter Template with TypeScript, Tailwind CSS',
    openGraph: { images: '/og', url: getBaseUrl() },
    alternates: { canonical: getBaseUrl() },
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
