import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      style={{
        background: `radial-gradient(circle at 1px 1px, var(--grid-color) 1.5px, transparent 0)`,
        backgroundSize: '40px 40px',
      }}>
      {/* Ambient warm gradient meshes */}
      <div
        className="absolute top-0 right-0 w-125 h-125 rounded-full blur-[140px] pointer-events-none opacity-40 dark:opacity-20"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle, var(--accent) 0%, transparent 80%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-100 h-100 rounded-full blur-[120px] pointer-events-none opacity-30 dark:opacity-10"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle, var(--primary) 0%, transparent 80%)',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 py-24 relative z-10 flex flex-col justify-center">
        <div className="w-12 h-px bg-primary mb-8 animate-pulse" />

        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-light leading-[1.05] tracking-tight text-foreground mb-8">
          {t('headline').replace(t('headlineAccent'), '')}
          <span className="block sm:inline font-heading italic font-normal text-accent select-none">
            {t('headlineAccent')}
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl leading-relaxed mb-12 font-sans font-light">
          {t('subheadline')}
        </p>

        <div className="flex flex-wrap gap-4 mb-16">
          <Link
            href="#services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-accent hover:text-accent-foreground active:scale-95 transition-all duration-300 shadow-sm"
            aria-label={t('ctaPrimary')}>
            {t('ctaPrimary')}
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-border bg-card/50 text-foreground font-semibold text-sm hover:bg-accent hover:text-accent-foreground hover:border-transparent active:scale-95 transition-all duration-300"
            aria-label={t('ctaSecondary')}>
            {t('ctaSecondary')}
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs tracking-widest uppercase font-semibold text-muted-foreground/60">
            {t('capabilitiesTitle')}
          </span>
          <div className="flex flex-wrap gap-2" aria-label="Capacidades">
            {(t.raw('capabilities') as string[]).map((capability) => (
              <span
                key={capability}
                className="px-4 py-1.5 rounded-full text-xs font-medium border border-border bg-card/65 text-muted-foreground backdrop-blur-sm hover:border-accent hover:text-foreground transition-all duration-300 cursor-default">
                {capability}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Network node graph representing AI & Integrations */}
      <svg
        className="absolute right-4 bottom-10 w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] lg:w-[450px] lg:h-[450px] text-primary/8 pointer-events-none select-none z-0"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.25"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="2.5" fill="currentColor" />
        <circle cx="25" cy="30" r="2" fill="currentColor" />
        <circle cx="75" cy="30" r="2" fill="currentColor" />
        <circle cx="30" cy="70" r="2" fill="currentColor" />
        <circle cx="70" cy="70" r="2" fill="currentColor" />
        <circle cx="15" cy="50" r="1.5" fill="currentColor" />
        <circle cx="85" cy="50" r="1.5" fill="currentColor" />
        <line x1="50" y1="50" x2="25" y2="30" />
        <line x1="50" y1="50" x2="75" y2="30" />
        <line x1="50" y1="50" x2="30" y2="70" />
        <line x1="50" y1="50" x2="70" y2="70" />
        <line x1="25" y1="30" x2="15" y2="50" />
        <line x1="30" y1="70" x2="15" y2="50" />
        <line x1="75" y1="30" x2="85" y2="50" />
        <line x1="70" y1="70" x2="85" y2="50" />
        <line x1="25" y1="30" x2="75" y2="30" strokeDasharray="1 1" />
        <line x1="30" y1="70" x2="70" y2="70" strokeDasharray="1 1" />
        <circle cx="50" cy="50" r="15" strokeDasharray="1 2" />
        <circle cx="50" cy="50" r="30" strokeDasharray="1 3" />
        <text x="25" y="24" fontSize="3" fontFamily="var(--font-sans)" textAnchor="middle" fill="currentColor" fillOpacity="0.5">01</text>
        <text x="75" y="24" fontSize="3" fontFamily="var(--font-sans)" textAnchor="middle" fill="currentColor" fillOpacity="0.5">10</text>
        <text x="15" y="44" fontSize="3" fontFamily="var(--font-sans)" textAnchor="middle" fill="currentColor" fillOpacity="0.5">{"{"}</text>
        <text x="85" y="44" fontSize="3" fontFamily="var(--font-sans)" textAnchor="middle" fill="currentColor" fillOpacity="0.5">{"}"}</text>
      </svg>
    </section>
  )
}
