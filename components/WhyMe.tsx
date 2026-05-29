import { useTranslations } from 'next-intl';
import { Code2, Layers, MessageSquare, DollarSign } from 'lucide-react';

const icons = [Code2, Layers, MessageSquare, DollarSign];

export default function WhyMe() {
  const t = useTranslations('whyMe');

  const cards = [
    { titleKey: 'card1Title', descKey: 'card1Desc' },
    { titleKey: 'card2Title', descKey: 'card2Desc' },
    { titleKey: 'card3Title', descKey: 'card3Desc' },
    { titleKey: 'card4Title', descKey: 'card4Desc' },
  ] as const;

  // Split title manually for luxury styling
  const titleText = t('title');
  const hasY = titleText.includes(' y ');
  const hasNot = titleText.includes(', not');
  
  let formattedTitle = (
    <h2
      id="why-me-heading"
      className="font-heading text-4xl md:text-5xl font-light text-foreground mb-16 tracking-tight"
    >
      {titleText}
    </h2>
  );

  if (hasY) {
    const parts = titleText.split(' y ');
    formattedTitle = (
      <h2
        id="why-me-heading"
        className="font-heading text-4xl md:text-5xl font-light text-foreground mb-16 tracking-tight"
      >
        {parts[0]} <span className="font-heading italic text-accent font-normal">y {parts[1]}</span>
      </h2>
    );
  } else if (hasNot) {
    const parts = titleText.split(', not');
    formattedTitle = (
      <h2
        id="why-me-heading"
        className="font-heading text-4xl md:text-5xl font-light text-foreground mb-16 tracking-tight"
      >
        {parts[0]}<span className="font-heading italic text-accent font-normal">, not {parts[1]}</span>
      </h2>
    );
  }

  return (
    <section
      id="why-me"
      aria-labelledby="why-me-heading"
      className="py-28 relative overflow-hidden"
    >
      {/* Decorative vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-border/40 pointer-events-none hidden md:block" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-2">
          {formattedTitle}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => {
            const Icon = icons[i];
            return (
              <article
                key={card.titleKey}
                className="group p-8 rounded-[var(--radius-lg)] border border-border bg-card/40 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-lg dark:hover:shadow-black/20"
              >
                <div className="w-12 h-12 rounded-[var(--radius-sm)] bg-secondary flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground text-primary">
                  <Icon
                    size={22}
                    className="transition-colors"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-heading text-xl font-medium text-foreground mb-3 tracking-tight">
                  {t(card.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground/90 leading-relaxed font-sans font-light">
                  {t(card.descKey)}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
