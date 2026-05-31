import '@/app/globals.css'
import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google'
import { notFound } from 'next/navigation'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const BASE_URL = 'https://services.ignaciofigueroa.dev'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'es' | 'en')) {
    notFound()
  }

  const messages = await getMessages({ locale })

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${plusJakarta.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const messages = await getMessages({ locale })
  const meta = (messages as Record<string, Record<string, string>>).meta

  return {
    title: meta?.title ?? 'Desarrollo Web Freelance — Argentina',
    description: meta?.description ?? 'Presencia digital que convierte.',
    metadataBase: new URL(BASE_URL),
    openGraph: {
      title: meta?.title,
      description: meta?.description,
      type: 'website',
      url: `${BASE_URL}/${locale}`,
      siteName: 'Ignacio Figueroa — Dev',
      locale: locale === 'es' ? 'es_AR' : 'en_US',
      alternateLocale: locale === 'es' ? ['en_US'] : ['es_AR'],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta?.title,
      description: meta?.description,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        es: `${BASE_URL}/es`,
        en: `${BASE_URL}/en`,
        'x-default': `${BASE_URL}/es`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': 160,
        'max-image-preview': 'large',
      },
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ignacio Figueroa',
  url: BASE_URL,
  jobTitle: 'Freelance Web Developer',
  description:
    'Freelance web developer specializing in Next.js, TypeScript, React, Node.js, AI integrations, and multilingual (i18n) web applications. Based in Argentina.',
  knowsAbout: [
    'Next.js',
    'TypeScript',
    'React',
    'Node.js',
    'PostgreSQL',
    'AI Integration',
    'i18n',
    'REST APIs',
  ],
  email: 'contact@ignaciofigueroa.dev',
  sameAs: ['https://linkedin.com/in/figueroa-ignacio'],
  offers: {
    '@type': 'Offer',
    description:
      'Freelance web development services: landing pages, institutional websites, marketing sites, i18n, AI bots, and backend APIs.',
    url: BASE_URL,
  },
}
