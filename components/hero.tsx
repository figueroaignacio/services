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
    </section>
  )
}
