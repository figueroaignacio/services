import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/components/ThemeProvider';
import '@/app/globals.css';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = (messages as Record<string, Record<string, string>>).meta;

  return {
    title: meta?.title ?? 'Desarrollo Web Freelance — Argentina',
    description: meta?.description ?? 'Presencia digital que convierte.',
    metadataBase: new URL('https://tudominio.com'), // TODO: replace with real domain
    openGraph: {
      title: meta?.title,
      description: meta?.description,
      type: 'website',
      locale: locale,
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: '/es',
        en: '/en',
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'es' | 'en')) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${cormorant.variable} ${plusJakarta.variable} antialiased`}>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
