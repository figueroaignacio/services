'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Quote, MessageSquarePlus, ArrowUpRight } from 'lucide-react'

export default function Testimonials() {
  const t = useTranslations('testimonials')
  const locale = useLocale()

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-28 relative overflow-hidden"
      style={{
        background: 'var(--background)',
      }}>
      {/* Glow Effect Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,178,144,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs tracking-[0.3em] uppercase font-semibold text-primary/60 mb-4 block">
            {locale === 'es' ? 'Opinión de Clientes' : 'Client Success'}
          </span>
          <h2
            id="testimonials-heading"
            className="font-heading text-4xl md:text-5xl font-light text-foreground tracking-tight">
            {t('title')}{' '}
            <span className="font-heading italic text-accent font-normal">
              {locale === 'es' ? 'Reales' : '& Feedback'}
            </span>
          </h2>
          <p
            className="mt-4 text-sm font-sans font-light leading-relaxed max-w-xl"
            style={{ color: 'var(--muted-foreground)' }}>
            {t('subtitle')}
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sofia Caero Testimonial Card */}
          <article
            className="project-card group relative rounded-lg border p-8 md:p-10 transition-all duration-500 flex flex-col justify-between"
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
            }}>
            {/* Top Glow Edge effect (similar to WhyMe) */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(212,178,144,0.6) 50%, transparent 100%)',
                boxShadow: '0 0 12px 2px rgba(212,178,144,0.2)',
              }}
              aria-hidden="true"
            />

            <div>
              {/* Quote Icon */}
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground group-hover:border-primary/50 group-hover:text-primary group-hover:bg-primary/10 transition-all duration-500">
                  <Quote size={16} strokeWidth={1.5} className="transform rotate-180" />
                </div>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-primary/40 group-hover:text-primary/60 transition-colors duration-500">
                  sofiacaero.studio
                </span>
              </div>

              {/* Quote text */}
              <p className="text-sm font-sans font-light leading-relaxed text-foreground/90 italic mb-8 relative z-10 whitespace-pre-line">
                &ldquo;{t('sofiaQuote')}&rdquo;
              </p>
            </div>

            {/* Author info */}
            <div className="pt-6 border-t border-border/40 mt-auto flex flex-col gap-1">
              <span className="font-heading text-lg font-light text-foreground group-hover:text-accent transition-colors duration-500">
                Sofia Caero
              </span>
              <a
                href="https://sofiacaero.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-primary transition-colors duration-300 inline-flex items-center gap-1 w-fit group/link">
                {t('sofiaRole')}
                <ArrowUpRight size={12} className="opacity-50 group-hover/link:opacity-100 transition-opacity duration-300" />
              </a>
            </div>
          </article>

          {/* "More Coming Soon" Card */}
          <article
            className="project-card group relative rounded-lg border border-dashed overflow-hidden transition-all duration-500 flex flex-col justify-center min-h-[320px]"
            style={{
              background: 'rgba(212, 178, 144, 0.02)',
              borderColor: 'rgba(212, 178, 144, 0.15)',
            }}>
            <div
              className="absolute inset-0 opacity-[0.08] pointer-events-none"
              aria-hidden="true"
              style={{
                background: `radial-gradient(circle at 1px 1px, rgba(212,178,144,0.4) 1px, transparent 0)`,
                backgroundSize: '24px 24px',
              }}
            />

            <div className="p-8 md:p-10 flex flex-col items-center text-center justify-center h-full">
              <div className="w-12 h-12 rounded-full border border-dashed border-primary/30 flex items-center justify-center text-primary/60 group-hover:border-primary group-hover:text-primary transition-all duration-500 mb-6 bg-primary/5">
                <MessageSquarePlus size={20} strokeWidth={1.5} className="shrink-0" />
              </div>

              <h3 className="font-heading text-xl font-light text-foreground tracking-tight mb-2">
                {t('moreComing')}
              </h3>

              <p
                className="text-xs font-sans font-light leading-relaxed mb-6 max-w-xs"
                style={{ color: 'var(--muted-foreground)' }}>
                {t('moreComingDesc')}
              </p>

              <a
                href={`/${locale}#contact`}
                className="project-link inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-semibold transition-all duration-300"
                style={{ color: 'var(--primary)' }}>
                {locale === 'es' ? 'Sumar tu proyecto' : 'Add your project'}
                <ArrowUpRight size={13} className="shrink-0" />
              </a>
            </div>
          </article>
        </div>
      </div>

      {/* SVG schematic: Client Feedback / Evolution Cycle */}
      <svg
        className="absolute right-4 top-1/4 w-[160px] h-[160px] sm:w-[250px] sm:h-[250px] lg:w-[350px] lg:h-[350px] text-primary/8 pointer-events-none select-none translate-x-4 sm:translate-x-6 z-0"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.25"
        aria-hidden="true"
      >
        <circle cx="20" cy="20" r="1" fill="currentColor" fillOpacity="0.4" />
        <rect x="8" y="24" width="24" height="10" rx="1" />
        <text x="20" y="30" fontSize="2.5" fontFamily="var(--font-sans)" textAnchor="middle" fill="currentColor" fillOpacity="0.4">1. CONCEPT</text>

        <path d="M 32 29 L 68 29" strokeDasharray="1 1" />
        
        <circle cx="80" cy="20" r="1" fill="currentColor" fillOpacity="0.4" />
        <rect x="68" y="24" width="24" height="10" rx="1" />
        <text x="80" y="30" fontSize="2.5" fontFamily="var(--font-sans)" textAnchor="middle" fill="currentColor" fillOpacity="0.4">2. BUILD</text>

        <path d="M 80 34 L 80 56" />

        <circle cx="80" cy="80" r="1" fill="currentColor" fillOpacity="0.4" />
        <rect x="68" y="56" width="24" height="10" rx="1" />
        <text x="80" y="62" fontSize="2.5" fontFamily="var(--font-sans)" textAnchor="middle" fill="currentColor" fillOpacity="0.4">3. LAUNCH</text>

        <path d="M 68 61 L 32 61" strokeDasharray="1 1" />

        <circle cx="20" cy="80" r="1" fill="currentColor" fillOpacity="0.4" />
        <rect x="8" y="56" width="24" height="10" rx="1" />
        <text x="20" y="62" fontSize="2.5" fontFamily="var(--font-sans)" textAnchor="middle" fill="currentColor" fillOpacity="0.4">4. FEEDBACK</text>

        <path d="M 20 56 L 20 34" />
        
        <path d="M 50 40 L 51 44 L 55 45 L 51 46 L 50 50 L 49 46 L 45 45 L 49 44 Z" fill="currentColor" fillOpacity="0.15" />
        <text x="50" y="54" fontSize="2" fontFamily="var(--font-sans)" textAnchor="middle" fill="currentColor" fillOpacity="0.3">EVOLUTION</text>
      </svg>
    </section>
  )
}
