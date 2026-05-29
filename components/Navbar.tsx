'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  // Determine current locale from path
  const currentLocale = pathname.startsWith('/en') ? 'en' : 'es';

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = (locale: string) => {
    const newPath = pathname.replace(/^\/(es|en)/, `/${locale}`);
    router.push(newPath);
  };

  const navLinks = [
    { href: '#services', label: t('services') },
    { href: '#why-me', label: t('whyMe') },
    { href: '#pricing', label: t('pricing') },
    { href: '#contact', label: t('contact') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={`/${currentLocale}`}
          className="font-heading text-xl font-bold text-foreground hover:text-primary transition-colors"
          aria-label="Inicio"
        >
          <span className="text-primary">{'<'}</span>
          Dev
          <span className="text-primary">{'/>'}</span>
        </Link>

        {/* Nav Links */}
        <nav aria-label="Navegación principal">
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
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
              {t('langEs')}
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
              {t('langEn')}
            </button>
          </div>

          {/* Dark mode toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
              aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
            >
              {theme === 'dark' ? (
                <Sun size={16} aria-hidden="true" />
              ) : (
                <Moon size={16} aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
