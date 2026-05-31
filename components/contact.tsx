'use client'

import { sendEmail } from '@/app/actions/send-email'
import { Link2, Mail, MessageCircle, Send } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState, type SubmitEvent } from 'react'

export default function Contact() {
  const t = useTranslations('contact')
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle')

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const result = await sendEmail(formData)

      if (result.success) {
        setStatus('success')
        form.reset()
      } else {
        console.error('[contact] Submission failed:', result.error)
        setStatus('error')
      }
    } catch (err) {
      console.error('[contact] Error in client action:', err)
      setStatus('error')
    }
  }

  const socialLinks = [
    {
      icon: MessageCircle,
      label: t('whatsapp'),
      href: 'https://wa.me/5491128066862',
    },
    {
      icon: Mail,
      label: t('email'),
      href: 'mailto:contact@ignaciofigueroa.dev',
    },
    {
      icon: Link2,
      label: t('linkedin'),
      href: 'https://linkedin.com/in/figueroa-ignacio',
    },
  ]

  const inputBase =
    'w-full px-5 py-4 rounded-[var(--radius-md)] border border-border/80 bg-input text-foreground placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 shadow-sm font-sans font-light'

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-28 bg-muted/60 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <span className="text-xs tracking-widest uppercase font-semibold text-primary mb-3 block">
            Get in Touch
          </span>
          <h2
            id="contact-heading"
            className="font-heading text-4xl md:text-5xl font-light text-foreground tracking-tight mb-3">
            {t('title')}{' '}
            <span className="font-heading italic text-accent font-normal">
              & Proyectos
            </span>
          </h2>
          <p className="text-muted-foreground/90 font-light font-sans leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-3 flex flex-col gap-5"
            aria-label="Formulario de contacto"
            noValidate>
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
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-xs uppercase tracking-wider hover:bg-accent hover:text-accent-foreground active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 w-fit cursor-pointer shadow-md"
              aria-label={t('submit')}>
              <Send size={14} aria-hidden="true" />
              {status === 'sending'
                ? t('sending')
                : status === 'success'
                  ? t('success')
                  : t('submit')}
            </button>

            {status === 'error' && (
              <p
                role="alert"
                className="text-destructive text-sm font-light mt-1">
                {t('error')}
              </p>
            )}
          </form>
          <aside
            className="md:col-span-2 flex flex-col gap-4 justify-start"
            aria-label="Canales de contacto">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-5 py-4 rounded-md border border-border bg-card/50 hover:border-primary/50 hover:bg-card hover:shadow-sm transition-all duration-300 group cursor-pointer"
                aria-label={label}>
                <span className="w-10 h-10 rounded-sm bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 text-primary">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-foreground/90 group-hover:text-primary transition-colors font-sans">
                  {label}
                </span>
              </a>
            ))}
          </aside>
        </div>
      </div>
      {/* Code Editor / Terminal Viewport Watermark */}
      <svg
        className="absolute right-4 top-1/4 w-[150px] h-[150px] sm:w-[220px] sm:h-[220px] lg:w-[300px] lg:h-[300px] text-primary/8 pointer-events-none select-none translate-x-2 sm:translate-x-4 z-0"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.25"
        aria-hidden="true"
      >
        {/* Terminal box */}
        <rect x="5" y="15" width="90" height="70" rx="3" />
        {/* Title bar buttons */}
        <circle cx="12" cy="22" r="1.5" fill="currentColor" fillOpacity="0.5" />
        <circle cx="18" cy="22" r="1.5" fill="currentColor" fillOpacity="0.5" />
        <circle cx="24" cy="22" r="1.5" fill="currentColor" fillOpacity="0.5" />
        <line x1="5" y1="29" x2="95" y2="29" />

        {/* Command lines */}
        <text x="12" y="42" fontSize="4" fontFamily="var(--font-sans)" fill="currentColor" fillOpacity="0.5">&gt; npm run dev</text>
        <text x="12" y="52" fontSize="4.5" fontFamily="var(--font-sans)" fill="currentColor" fillOpacity="0.6">ready - started server on port 3000</text>
        <text x="12" y="62" fontSize="4" fontFamily="var(--font-sans)" fill="currentColor" fillOpacity="0.5">&gt; compiling...</text>
        <text x="12" y="72" fontSize="4" fontFamily="var(--font-sans)" fill="currentColor" fillOpacity="0.5">&gt; ready in 1.4s</text>
      </svg>
    </section>
  )
}
