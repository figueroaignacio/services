'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { MessageCircle, Mail, Link2, Send } from 'lucide-react';

export default function Contact() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const socialLinks = [
    {
      icon: MessageCircle,
      label: t('whatsapp'),
      href: 'https://wa.me/549XXXXXXXXXX', // TODO: replace with real WhatsApp number
    },
    {
      icon: Mail,
      label: t('email'),
      href: 'mailto:tu@email.com', // TODO: replace with real email
    },
    {
      icon: Link2,
      label: t('linkedin'),
      href: 'https://linkedin.com/in/tu-perfil', // TODO: replace with real LinkedIn
    },
  ];

  const inputBase =
    'w-full px-4 py-3 rounded-[var(--radius-md)] border border-border bg-input text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow';

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 bg-muted/40"
    >
      <div className="max-w-4xl mx-auto px-6">
        <h2
          id="contact-heading"
          className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3"
        >
          {t('title')}
        </h2>
        <p className="text-muted-foreground mb-10">{t('subtitle')}</p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-3 flex flex-col gap-4"
            aria-label="Formulario de contacto"
            noValidate
          >
            <div>
              <label htmlFor="contact-name" className="sr-only">
                {t('namePlaceholder')}
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                placeholder={t('namePlaceholder')}
                className={inputBase}
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="sr-only">
                {t('emailPlaceholder')}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder={t('emailPlaceholder')}
                className={inputBase}
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="sr-only">
                {t('messagePlaceholder')}
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                placeholder={t('messagePlaceholder')}
                className={`${inputBase} resize-none`}
                aria-required="true"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending' || status === 'success'}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 w-fit"
              aria-label={t('submit')}
            >
              <Send size={14} aria-hidden="true" />
              {status === 'sending'
                ? t('sending')
                : status === 'success'
                ? t('success')
                : t('submit')}
            </button>

            {status === 'error' && (
              <p role="alert" className="text-destructive text-sm">
                {t('error')}
              </p>
            )}
          </form>

          {/* Social links */}
          <aside
            className="md:col-span-2 flex flex-col gap-4 justify-start pt-2"
            aria-label="Canales de contacto"
          >
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] border border-border bg-card hover:border-primary/40 hover:bg-accent transition-colors group"
                aria-label={label}
              >
                <span className="w-8 h-8 rounded-[var(--radius-sm)] bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Icon size={16} className="text-primary" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-foreground">{label}</span>
              </a>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
