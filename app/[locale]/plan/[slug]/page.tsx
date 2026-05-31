import { allPlans } from 'content-collections'
import { ArrowLeft, ArrowRight, Check, Clock, X } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export default async function PlanPage({ params }: Props) {
  const { locale, slug } = await params
  const plan = allPlans.find((p) => p.slug === slug && p.locale === locale)

  if (!plan) notFound()

  const price = locale === 'es' ? plan.price.ars : plan.price.usd
  const monthlyPrice = locale === 'es' ? plan.price.monthlyArs : plan.price.monthlyUsd

  const otherPlans = allPlans.filter(
    (p) => p.locale === locale && p.slug !== slug,
  )

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: 'var(--background)' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,178,144,0.07) 0%, transparent 60%)',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        aria-hidden="true"
        style={{
          background: `radial-gradient(circle at 1px 1px, rgba(212,178,144,0.8) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">
        <Link
          href={`/${locale}#pricing`}
          className="plan-back-link inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold mb-16 transition-colors duration-300">
          <ArrowLeft size={13} strokeWidth={2} />
          {locale === 'es' ? 'Volver a precios' : 'Back to pricing'}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-16 items-start">
          <main>
            <header className="mb-12">
              <span
                className="text-xs tracking-[0.3em] uppercase font-semibold mb-4 block"
                style={{ color: 'var(--primary)', opacity: 0.7 }}>
                {locale === 'es' ? 'Plan' : 'Plan'}
              </span>
              <h1
                className="font-heading font-light tracking-tight leading-none mb-5"
                style={{
                  fontSize: 'clamp(3rem, 7vw, 5rem)',
                  color: 'var(--foreground)',
                }}>
                {plan.name}
              </h1>
              <p
                className="text-lg font-sans font-light leading-relaxed max-w-xl"
                style={{ color: 'var(--muted-foreground)' }}>
                {plan.tagline}
              </p>
            </header>

            <article
              className="plan-prose font-sans font-light leading-relaxed"
              style={{ color: 'var(--muted-foreground)' }}
              dangerouslySetInnerHTML={{ __html: plan.html }}
            />
          </main>

          <aside className="lg:sticky lg:top-8 flex flex-col gap-4">
            <div
              className="rounded-lg overflow-hidden border"
              style={{
                background: plan.highlighted
                  ? 'linear-gradient(160deg, #1f160f 0%, #1a1009 40%, #130c08 100%)'
                  : 'var(--card)',
                borderColor: plan.highlighted
                  ? 'rgba(212,178,144,0.25)'
                  : 'var(--border)',
              }}>
              {plan.highlighted && (
                <div
                  className="h-0.5 w-full"
                  aria-hidden="true"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(212,178,144,0.8) 40%, rgba(229,193,157,1) 50%, rgba(212,178,144,0.8) 60%, transparent 100%)',
                    boxShadow: '0 0 20px 4px rgba(212,178,144,0.25)',
                  }}
                />
              )}

              <div className="p-7 flex flex-col gap-6">
                <div>
                  <p
                    className="font-heading font-light leading-none tracking-tight"
                    style={{ fontSize: '2.2rem', color: 'var(--foreground)' }}>
                    {price}
                  </p>
                  <p
                    className="text-[10px] mt-1.5 font-sans tracking-widest uppercase flex flex-wrap gap-x-1.5 gap-y-0.5 items-center"
                    style={{ color: 'var(--muted-foreground)', opacity: 0.7 }}>
                    <span>
                      {locale === 'es' ? 'precio de partida' : 'starting price'}
                    </span>
                    <span style={{ color: 'var(--primary)' }} className="font-semibold">
                      · {monthlyPrice}
                    </span>
                  </p>
                </div>

                <div
                  className="flex items-center gap-2 text-sm font-sans"
                  style={{ color: 'var(--muted-foreground)' }}>
                  <Clock
                    size={14}
                    strokeWidth={1.5}
                    style={{ color: 'var(--primary)', opacity: 0.7 }}
                  />
                  <span>{plan.deliveryTime}</span>
                </div>

                <a
                  href={`/${locale}#contact`}
                  className={`plan-cta inline-flex items-center justify-center gap-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 active:scale-95 ${plan.highlighted ? 'plan-cta--highlighted' : 'plan-cta--default'}`}>
                  {plan.cta}
                  <ArrowRight size={12} strokeWidth={2} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div
              className="rounded-lg border p-6 flex flex-col gap-4"
              style={{
                background: 'var(--card)',
                borderColor: 'var(--border)',
              }}>
              <p
                className="text-[10px] uppercase tracking-widest font-semibold"
                style={{ color: 'var(--primary)', opacity: 0.6 }}>
                {locale === 'es' ? 'Incluye' : 'Includes'}
              </p>
              <ul className="flex flex-col" style={{ gap: 0 }}>
                {plan.includes.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 py-2.5 text-sm font-sans font-light"
                    style={{
                      borderBottom:
                        i < plan.includes.length - 1
                          ? '1px solid rgba(42,30,23,0.5)'
                          : 'none',
                      color: 'var(--muted-foreground)',
                    }}>
                    <span
                      className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: 'rgba(212,178,144,0.12)' }}
                      aria-hidden="true">
                      <Check
                        size={9}
                        strokeWidth={2.5}
                        style={{ color: 'var(--primary)' }}
                      />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {plan.notIncluded.length > 0 && (
              <div
                className="rounded-lg border p-6 flex flex-col gap-4"
                style={{
                  background: 'var(--card)',
                  borderColor: 'var(--border)',
                }}>
                <p
                  className="text-[10px] uppercase tracking-widest font-semibold"
                  style={{ color: 'var(--muted-foreground)', opacity: 0.5 }}>
                  {locale === 'es' ? 'No incluye' : 'Not included'}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {plan.notIncluded.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm font-sans font-light"
                      style={{
                        color: 'var(--muted-foreground)',
                        opacity: 0.5,
                      }}>
                      <X
                        size={13}
                        strokeWidth={2}
                        className="shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div
              className="rounded-lg border p-6 flex flex-col gap-4"
              style={{
                background: 'var(--card)',
                borderColor: 'var(--border)',
              }}>
              <p
                className="text-[10px] uppercase tracking-widest font-semibold"
                style={{ color: 'var(--primary)', opacity: 0.6 }}>
                {locale === 'es' ? 'Ideal para' : 'Ideal for'}
              </p>
              <ul className="flex flex-col gap-2">
                {plan.idealFor.map((item, i) => (
                  <li
                    key={i}
                    className="text-sm font-sans font-light leading-snug"
                    style={{ color: 'var(--muted-foreground)' }}>
                    <span
                      style={{ color: 'var(--primary)', marginRight: '0.4em' }}>
                      ·
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {otherPlans.length > 0 && (
          <section
            className="mt-24 pt-12"
            style={{ borderTop: '1px solid rgba(42,30,23,0.6)' }}>
            <p
              className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-8"
              style={{ color: 'var(--muted-foreground)', opacity: 0.5 }}>
              {locale === 'es' ? 'Otros planes' : 'Other plans'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherPlans.map((other) => (
                <Link
                  key={other.slug}
                  href={`/${locale}/plan/${other.slug}`}
                  className="plan-other-card group relative rounded-lg border p-6 flex flex-col gap-3 transition-all duration-300 overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    aria-hidden="true"
                    style={{
                      background:
                        'radial-gradient(ellipse 80% 60% at 0% 0%, rgba(212,178,144,0.05) 0%, transparent 70%)',
                    }}
                  />
                  <div className="relative z-10 flex items-center justify-between">
                    <h3
                      className="font-heading font-light text-xl tracking-tight"
                      style={{ color: 'var(--foreground)' }}>
                      {other.name}
                    </h3>
                    <ArrowRight
                      size={15}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                      style={{ color: 'var(--primary)', opacity: 0.6 }}
                      aria-hidden="true"
                    />
                  </div>
                  <p
                    className="relative z-10 text-sm font-sans font-light leading-snug"
                    style={{ color: 'var(--muted-foreground)', opacity: 0.7 }}>
                    {other.tagline}
                  </p>
                  <p
                    className="relative z-10 font-heading font-light text-lg tracking-tight mt-1 flex flex-wrap gap-x-1.5 items-center"
                    style={{ color: 'var(--primary)', opacity: 0.8 }}>
                    <span>
                      {locale === 'es' ? other.price.ars : other.price.usd}
                    </span>
                    <span className="text-xs font-sans font-normal opacity-70">
                      ({locale === 'es' ? other.price.monthlyArs : other.price.monthlyUsd})
                    </span>
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return allPlans.map((plan) => ({
    locale: plan.locale,
    slug: plan.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const plan = allPlans.find((p) => p.slug === slug && p.locale === locale)
  if (!plan) return {}
  const ogImage = `/images/og/og-image-${locale}.png`
  return {
    title: `${plan.name} Plan — Ignacio Figueroa`,
    description: plan.tagline,
    openGraph: {
      title: `${plan.name} Plan — Ignacio Figueroa`,
      description: plan.tagline,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${plan.name} Plan`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${plan.name} Plan — Ignacio Figueroa`,
      description: plan.tagline,
      images: [ogImage],
    },
  }
}
