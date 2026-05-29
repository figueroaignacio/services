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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Brand */}
          <div>
            <p className="font-heading text-xl font-light tracking-wide text-foreground">
              <span className="font-heading italic text-primary font-normal">D</span>ev
            </p>
            <p className="text-[11px] tracking-wide text-muted-foreground/80 font-light mt-1.5">{t('tagline')}</p>
          </div>

          {/* Nav links */}
          <nav aria-label="Navegación del pie de página">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs uppercase tracking-wider text-muted-foreground hover:text-primary transition-all duration-300 font-semibold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Language switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-secondary/80 border border-border/40" aria-label="Cambiar idioma">
            <button
              onClick={() => switchLocale('es')}
              className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full transition-all duration-300 cursor-pointer ${
                currentLocale === 'es'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground/80 hover:text-foreground'
              }`}
              aria-label="Cambiar a español"
              aria-pressed={currentLocale === 'es'}
            >
              {tNav('langEs')}
            </button>
            <button
              onClick={() => switchLocale('en')}
              className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full transition-all duration-300 cursor-pointer ${
                currentLocale === 'en'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground/80 hover:text-foreground'
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
