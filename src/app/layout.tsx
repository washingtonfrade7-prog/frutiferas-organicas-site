import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo'
import { site } from '@/lib/site'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} - Frutíferas orgânicas em vaso`,
    template: `%s - ${site.name}`,
  },
  description: site.description,
  keywords: [
    'frutíferas orgânicas',
    'frutíferas em vaso',
    'mudas de frutíferas',
    'cultivo em vaso',
    'frutas nativas',
    'jabuticaba em vaso',
    'pitanga preta',
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  openGraph: {
    locale: 'pt_BR',
    type: 'website',
    siteName: site.name,
    url: site.url,
    title: `${site.name} - Frutíferas orgânicas em vaso`,
    description: site.description,
    images: [{ url: '/og-logo.jpg', width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-logo.jpg'] },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1E3A27',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="flex flex-col min-h-screen">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
