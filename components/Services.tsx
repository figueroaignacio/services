import { useTranslations } from 'next-intl';
import {
  MousePointerClick,
  Building2,
  TrendingUp,
  Globe,
  Bot,
  Server,
} from 'lucide-react';

const icons = [MousePointerClick, Building2, TrendingUp, Globe, Bot, Server];

export default function Services() {
  const t = useTranslations('services');

  const serviceCards = [
    { titleKey: 's1Title', descKey: 's1Desc' },
    { titleKey: 's2Title', descKey: 's2Desc' },
    { titleKey: 's3Title', descKey: 's3Desc' },
    { titleKey: 's4Title', descKey: 's4Desc' },
    { titleKey: 's5Title', descKey: 's5Desc' },
    { titleKey: 's6Title', descKey: 's6Desc' },
  ] as const;

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-24 bg-muted/40"
    >
      <div className="max-w-4xl mx-auto px-6">
        <h2
          id="services-heading"
          className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12"
        >
          {t('title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {serviceCards.map((card, i) => {
            const Icon = icons[i];
            return (
              <article
                key={card.titleKey}
                className="group p-6 rounded-[var(--radius-lg)] border border-border bg-card hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <Icon
                    size={20}
                    className="text-primary"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-heading text-base font-bold text-foreground mb-2">
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
