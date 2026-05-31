'use client'

import { ArrowRight, Check } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

type Currency = 'ARS' | 'USD'

export default function Pricing() {
  const t = useTranslations('pricing')
  const [currency, setCurrency] = useState<Currency>('ARS')

  const tiers = [
    {
      nameKey: 'starterName',
      priceArsKey: 'starterPriceArs',
      priceUsdKey: 'starterPriceUsd',
      forKey: 'starterFor',
      featuresKey: 'starterFeatures',
      highlighted: false,
      index: 0,
    },
    {
      nameKey: 'proName',
      priceArsKey: 'proPriceArs',
      priceUsdKey: 'proPriceUsd',
      forKey: 'proFor',
      featuresKey: 'proFeatures',
      highlighted: true,
      index: 1,
    },
    {
      nameKey: 'customName',
      priceArsKey: 'customPriceArs',
      priceUsdKey: 'customPriceUsd',
      forKey: 'customFor',
      featuresKey: 'customFeatures',
      highlighted: false,
      index: 2,
    },
  ] as const

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="py-28 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, var(--background) 0%, var(--muted) 50%, var(--background) 100%)',
      }}>
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(212,178,144,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-16">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase font-semibold text-primary/60 mb-4 block">
              Investment Tiers
            </span>
            <h2
              id="pricing-heading"
              className="font-heading text-4xl md:text-5xl font-light text-foreground tracking-tight">
              {t('title')}{' '}
              <span className="font-heading italic text-accent font-normal">
                &amp; Planes
              </span>
            </h2>
          </div>

          <div
            className="pricing-toggle relative flex items-center gap-0 p-1 rounded-full w-fit shrink-0 border border-border/60"
            role="group"
            aria-label="Select currency"
            style={{ background: 'var(--muted)' }}>
            <div
              className="toggle-indicator absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-transform duration-300 ease-in-out"
              style={{
                background: 'var(--primary)',
                transform:
                  currency === 'ARS'
                    ? 'translateX(4px)'
                    : 'translateX(calc(100% + 4px))',
              }}
              aria-hidden="true"
            />
            {(['ARS', 'USD'] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                aria-pressed={currency === c}
                className="relative z-10 px-7 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-colors duration-300 cursor-pointer"
                style={{
                  color:
                    currency === c
                      ? 'var(--primary-foreground)'
                      : 'var(--muted-foreground)',
                }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.12fr_1fr] gap-px bg-border/30 rounded-xl overflow-hidden border border-border/30 items-stretch">
          {tiers.map((tier) => {
            const features = t.raw(tier.featuresKey) as string[]
            const price =
              currency === 'ARS' ? t(tier.priceArsKey) : t(tier.priceUsdKey)

            return (
              <article
                key={tier.nameKey}
                aria-label={t(tier.nameKey)}
                className={`pricing-card group relative flex flex-col overflow-hidden transition-all duration-500 ${
                  tier.highlighted ? 'pricing-card--pro' : ''
                }`}
                style={{
                  background: tier.highlighted
                    ? 'linear-gradient(160deg, #1f160f 0%, #1a1009 40%, #130c08 100%)'
                    : 'var(--card)',
                  padding: tier.highlighted ? '2.75rem 2rem' : '2.25rem 2rem',
                }}>
                {tier.highlighted && (
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent 0%, rgba(212,178,144,0.8) 40%, rgba(229,193,157,1) 50%, rgba(212,178,144,0.8) 60%, transparent 100%)',
                      boxShadow: '0 0 20px 4px rgba(212,178,144,0.25)',
                    }}
                    aria-hidden="true"
                  />
                )}

                {tier.highlighted && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    aria-hidden="true"
                    style={{
                      background:
                        'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,178,144,0.08) 0%, transparent 70%)',
                    }}
                  />
                )}

                {tier.highlighted && (
                  <div className="absolute top-6 right-6">
                    <span
                      className="text-[9px] tracking-[0.25em] uppercase font-semibold px-3 py-1 rounded-full border"
                      style={{
                        color: 'var(--primary)',
                        borderColor: 'rgba(212,178,144,0.3)',
                        background: 'rgba(212,178,144,0.08)',
                      }}>
                      {t('highlighted')}
                    </span>
                  </div>
                )}

                <div className="relative z-10 flex flex-col h-full gap-7">
                  <div>
                    <h3
                      className="font-heading font-light tracking-tight mb-2 transition-colors duration-300"
                      style={{
                        fontSize: tier.highlighted ? '1.75rem' : '1.5rem',
                        color: tier.highlighted
                          ? 'var(--accent)'
                          : 'var(--foreground)',
                      }}>
                      {t(tier.nameKey)}
                    </h3>
                    <p
                      className="text-xs font-sans font-light leading-relaxed"
                      style={{ color: 'var(--muted-foreground)' }}>
                      {t(tier.forKey)}
                    </p>
                  </div>

                  <div
                    className="pb-7"
                    style={{ borderBottom: '1px solid rgba(42,30,23,0.8)' }}>
                    <p
                      className="font-heading font-light leading-none tracking-tight"
                      style={{
                        fontSize: tier.highlighted ? '2.6rem' : '2rem',
                        color: 'var(--foreground)',
                        opacity: tier.highlighted ? 1 : 0.85,
                      }}>
                      {price}
                    </p>
                    <p
                      className="text-[10px] mt-2 font-sans tracking-widest uppercase"
                      style={{
                        color: 'var(--muted-foreground)',
                        opacity: 0.5,
                      }}>
                      {currency === 'ARS'
                        ? 'Pesos argentinos'
                        : 'US dollars · fixed'}
                    </p>
                  </div>

                  <ul
                    className="flex flex-col flex-1"
                    aria-label={`Features of ${t(tier.nameKey)}`}
                    style={{ gap: 0 }}>
                    {features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 py-3 text-sm font-sans font-light"
                        style={{
                          borderBottom:
                            i < features.length - 1
                              ? '1px solid rgba(42,30,23,0.5)'
                              : 'none',
                          color: 'var(--muted-foreground)',
                        }}>
                        <span
                          className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                          style={{
                            background: tier.highlighted
                              ? 'rgba(212,178,144,0.15)'
                              : 'rgba(212,178,144,0.07)',
                          }}
                          aria-hidden="true">
                          <Check
                            size={9}
                            strokeWidth={2.5}
                            style={{ color: 'var(--primary)' }}
                          />
                        </span>
                        <span
                          style={{
                            color: tier.highlighted
                              ? 'var(--foreground)'
                              : undefined,
                          }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    aria-label={`${t('cta')} — ${t(tier.nameKey)}`}
                    className="group/cta mt-2 inline-flex items-center justify-center gap-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 active:scale-95"
                    style={
                      tier.highlighted
                        ? {
                            padding: '0.85rem 1.5rem',
                            background: 'var(--primary)',
                            color: 'var(--primary-foreground)',
                            boxShadow: '0 0 24px -4px rgba(212,178,144,0.35)',
                          }
                        : {
                            padding: '0.75rem 1.25rem',
                            border: '1px solid rgba(42,30,23,0.9)',
                            color: 'var(--muted-foreground)',
                          }
                    }
                    onMouseEnter={(e) => {
                      if (!tier.highlighted) {
                        ;(e.currentTarget as HTMLElement).style.color =
                          'var(--foreground)'
                        ;(e.currentTarget as HTMLElement).style.borderColor =
                          'rgba(212,178,144,0.4)'
                      } else {
                        ;(e.currentTarget as HTMLElement).style.background =
                          'var(--accent)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!tier.highlighted) {
                        ;(e.currentTarget as HTMLElement).style.color =
                          'var(--muted-foreground)'
                        ;(e.currentTarget as HTMLElement).style.borderColor =
                          'rgba(42,30,23,0.9)'
                      } else {
                        ;(e.currentTarget as HTMLElement).style.background =
                          'var(--primary)'
                      }
                    }}>
                    {t('cta')}
                    <ArrowRight
                      size={12}
                      strokeWidth={2}
                      className="transition-transform duration-300 group-hover/cta:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </article>
            )
          })}
        </div>

        <p
          className="text-[11px] tracking-wide text-center font-light mt-8"
          style={{ color: 'var(--muted-foreground)', opacity: 0.5 }}>
          * {t('footnote')}
        </p>
      </div>
    </section>
  )
}
