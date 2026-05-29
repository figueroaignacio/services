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

  return (
    <section
      id="why-me"
      aria-labelledby="why-me-heading"
      className="py-24"
    >
      <div className="max-w-4xl mx-auto px-6">
        <h2
          id="why-me-heading"
          className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12"
        >
          {t('title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card, i) => {
            const Icon = icons[i];
            return (
              <article
                key={card.titleKey}
                className="group p-6 rounded-[var(--radius-lg)] border border-border bg-muted transition-colors hover:bg-card"
              >
                <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-secondary flex items-center justify-center mb-4 transition-colors group-hover:bg-primary/10">
                  <Icon
                    size={20}
                    className="text-primary"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                  {t(card.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
