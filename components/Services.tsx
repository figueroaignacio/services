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
      className="py-28 bg-muted/60 relative"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-xs tracking-widest uppercase font-semibold text-primary mb-3 block">
            Core Offerings
          </span>
          <h2
            id="services-heading"
            className="font-heading text-4xl md:text-5xl font-light text-foreground tracking-tight"
          >
            {t('title')} <span className="font-heading italic text-accent font-normal">& Especialidades</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCards.map((card, i) => {
            const Icon = icons[i];
            return (
              <article
                key={card.titleKey}
                className="group p-8 rounded-[var(--radius-lg)] border border-border/80 bg-card hover:border-primary/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-[var(--radius-sm)] bg-muted flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 text-primary">
                    <Icon
                      size={22}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-heading text-lg font-medium text-foreground mb-3 tracking-tight">
                    {t(card.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground/90 leading-relaxed font-sans font-light">
                    {t(card.descKey)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
