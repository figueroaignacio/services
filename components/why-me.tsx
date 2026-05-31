import { Code2, DollarSign, Layers, MessageSquare } from 'lucide-react'
import { useTranslations } from 'next-intl'

const icons = [Code2, Layers, MessageSquare, DollarSign]

const orbs = [
  'radial-gradient(ellipse 80% 60% at 110% 120%, rgba(212,178,144,0.13) 0%, transparent 70%)',
  'radial-gradient(ellipse 70% 70% at -10% 110%, rgba(229,193,157,0.10) 0%, transparent 65%)',
  'radial-gradient(ellipse 90% 50% at 110% -10%, rgba(212,178,144,0.10) 0%, transparent 70%)',
  'radial-gradient(ellipse 60% 80% at -10% -10%, rgba(229,193,157,0.12) 0%, transparent 65%)',
]

export default function WhyMe() {
  const t = useTranslations('whyMe')

  const cards = [
    { titleKey: 'card1Title', descKey: 'card1Desc' },
    { titleKey: 'card2Title', descKey: 'card2Desc' },
    { titleKey: 'card3Title', descKey: 'card3Desc' },
    { titleKey: 'card4Title', descKey: 'card4Desc' },
  ] as const

  const titleText = t('title')
  const hasY = titleText.includes(' y ')
  const hasNot = titleText.includes(', not')

  let formattedTitle = (
    <h2
      id="why-me-heading"
      className="font-heading text-4xl md:text-5xl font-light text-foreground mb-16 tracking-tight">
      {titleText}
    </h2>
  )
  if (hasY) {
    const parts = titleText.split(' y ')
    formattedTitle = (
      <h2
        id="why-me-heading"
        className="font-heading text-4xl md:text-5xl font-light text-foreground mb-16 tracking-tight">
        {parts[0]}{' '}
        <span className="font-heading italic text-accent font-normal">
          y {parts[1]}
        </span>
      </h2>
    )
  } else if (hasNot) {
    const parts = titleText.split(', not')
    formattedTitle = (
      <h2
        id="why-me-heading"
        className="font-heading text-4xl md:text-5xl font-light text-foreground mb-16 tracking-tight">
        {parts[0]}
        <span className="font-heading italic text-accent font-normal">
          , not{parts[1]}
        </span>
      </h2>
    )
  }

  return (
    <section
      id="why-me"
      aria-labelledby="why-me-heading"
      className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,178,144,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="mb-2">{formattedTitle}</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/30 rounded-lg overflow-hidden border border-border/30">
          {cards.map((card, i) => {
            const Icon = icons[i]
            const num = String(i + 1).padStart(2, '0')

            return (
              <article
                key={card.titleKey}
                className="why-me-card group relative overflow-hidden bg-card/60 backdrop-blur-sm p-10 transition-all duration-700"
                style={{ '--orb': orbs[i] } as React.CSSProperties}>
                <div
                  className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: orbs[i] }}
                  aria-hidden="true"
                />

                <div
                  className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(212,178,144,0.7) 50%, transparent 100%)',
                    boxShadow: '0 0 12px 2px rgba(212,178,144,0.3)',
                  }}
                  aria-hidden="true"
                />

                <div
                  className="absolute top-0 right-0 font-heading font-bold leading-none select-none pointer-events-none"
                  style={{
                    fontSize: 'clamp(6rem, 12vw, 10rem)',
                    letterSpacing: '-0.06em',
                    color: 'rgba(212,178,144,0.055)',
                    lineHeight: 0.85,
                    transform: 'translate(8%, -8%)',
                    transition: 'color 0.7s ease',
                  }}
                  aria-hidden="true">
                  {num}
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-heading text-xs tracking-[0.25em] uppercase text-primary/50 group-hover:text-primary transition-colors duration-500">
                      {num}
                    </span>
                    <div className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground group-hover:border-primary/60 group-hover:text-primary group-hover:bg-primary/10 transition-all duration-500">
                      <Icon size={17} strokeWidth={1.5} aria-hidden="true" />
                    </div>
                  </div>

                  <div
                    className="h-px bg-border/40 mb-8 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"
                    aria-hidden="true"
                  />

                  <h3 className="font-heading text-2xl font-light text-foreground tracking-tight mb-4 leading-snug">
                    {t(card.titleKey)}
                  </h3>

                  <p className="text-sm text-muted-foreground/80 leading-relaxed font-sans font-light mt-auto">
                    {t(card.descKey)}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
