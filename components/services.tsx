import {
  Bot,
  Building2,
  Globe,
  MousePointerClick,
  Server,
  TrendingUp,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

const icons = [MousePointerClick, Building2, TrendingUp, Globe, Bot, Server]

export default function Services() {
  const t = useTranslations('services')

  const serviceCards = [
    { titleKey: 's1Title', descKey: 's1Desc' },
    { titleKey: 's2Title', descKey: 's2Desc' },
    { titleKey: 's3Title', descKey: 's3Desc' },
    { titleKey: 's4Title', descKey: 's4Desc' },
    { titleKey: 's5Title', descKey: 's5Desc' },
    { titleKey: 's6Title', descKey: 's6Desc' },
  ] as const

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-28 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, var(--muted) 0%, var(--background) 100%)',
      }}>
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <span className="text-xs tracking-[0.3em] uppercase font-semibold text-primary/60 mb-4 block">
            Core Offerings
          </span>
          <h2
            id="services-heading"
            className="font-heading text-4xl md:text-5xl font-light text-foreground tracking-tight">
            {t('title')}{' '}
            <span className="font-heading italic text-accent font-normal">
              &amp; Especialidades
            </span>
          </h2>
        </div>

        <div
          className="flex flex-col divide-y"
          style={{
            borderTop: '1px solid rgba(42,30,23,0.8)',
            borderBottom: '1px solid rgba(42,30,23,0.8)',
          }}>
          {serviceCards.map((card, i) => {
            const Icon = icons[i]
            const num = String(i + 1).padStart(2, '0')

            return (
              <article
                key={card.titleKey}
                className="service-row group relative flex items-start gap-6 md:gap-10 py-8 md:py-10 transition-all duration-500 cursor-default overflow-hidden"
                style={{ borderColor: 'rgba(42,30,23,0.8)' }}>
                <div
                  className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(212,178,144,0.06) 0%, transparent 100%)',
                  }}
                  aria-hidden="true"
                />

                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out"
                  style={{ background: 'var(--primary)' }}
                  aria-hidden="true"
                />

                <span
                  className="relative z-10 font-heading text-xs tracking-[0.2em] text-muted-foreground/30 group-hover:text-primary/60 transition-colors duration-500 pt-1 shrink-0 w-8 text-right"
                  aria-hidden="true">
                  {num}
                </span>

                <div className="relative z-10 w-11 h-11 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground group-hover:border-primary/50 group-hover:text-primary group-hover:bg-primary/10 transition-all duration-500 shrink-0 mt-0.5">
                  <Icon size={17} strokeWidth={1.5} aria-hidden="true" />
                </div>

                <div className="relative z-10 flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-baseline md:gap-8">
                    <h3 className="font-heading text-xl md:text-2xl font-light text-foreground tracking-tight group-hover:text-accent transition-colors duration-500 mb-2 md:mb-0 shrink-0">
                      {t(card.titleKey)}
                    </h3>
                    <div
                      className="hidden md:block flex-1 border-b border-dashed border-border/30 mb-1.5 group-hover:border-primary/20 transition-colors duration-500"
                      aria-hidden="true"
                    />
                    <p className="text-sm text-muted-foreground/70 leading-relaxed font-sans font-light md:text-right md:max-w-70 shrink-0">
                      {t(card.descKey)}
                    </p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-16 flex flex-wrap gap-px bg-border/30 rounded-lg overflow-hidden border border-border/30">
          {[
            { value: '6', label: 'Service types' },
            { value: '100%', label: 'Custom built' },
            { value: '1', label: 'Person responsible' },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="flex-1 min-w-30 bg-card/40 px-8 py-6 text-center group hover:bg-card/80 transition-colors duration-300">
              <p className="font-heading text-3xl font-light text-foreground tracking-tight group-hover:text-accent transition-colors duration-300">
                {value}
              </p>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground/50 mt-1 font-sans">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
