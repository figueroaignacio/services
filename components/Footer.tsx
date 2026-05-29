'use client';

import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.startsWith('/en') ? 'en' : 'es';
  const year = new Date().getFullYear();

  const switchLocale = (locale: string) => {
    const newPath = pathname.replace(/^\/(es|en)/, `/${locale}`);
    router.push(newPath);
  };

  const footerLinks = [
    { href: '#services', label: t('services') },
    { href: '#pricing', label: t('pricing') },
    { href: '#contact', label: t('contact') },
  ];

  return (
    <footer
      className="border-t border-border py-10"
      role="contentinfo"
      aria-label="Pie de página"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Brand */}
          <div>
            <p className="font-heading text-lg font-bold text-foreground">
              <span className="text-primary">{'<'}</span>Dev<span className="text-primary">{'/>'}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">{t('tagline')}</p>
          </div>

          {/* Nav links */}
          <nav aria-label="Navegación del pie de página">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Language switcher */}
          <div className="flex items-center gap-1" aria-label="Cambiar idioma">
            <button
              onClick={() => switchLocale('es')}
              className={`text-xs font-semibold px-2 py-1 rounded-md transition-colors cursor-pointer ${
                currentLocale === 'es'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-label="Cambiar a español"
              aria-pressed={currentLocale === 'es'}
            >
              {tNav('langEs')}
            </button>
            <button
              onClick={() => switchLocale('en')}
              className={`text-xs font-semibold px-2 py-1 rounded-md transition-colors cursor-pointer ${
                currentLocale === 'en'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-label="Switch to English"
              aria-pressed={currentLocale === 'en'}
            >
              {tNav('langEn')}
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            © {year} — {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
