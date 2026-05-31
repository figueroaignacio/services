'use client'

import { ArrowUpRight } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

interface Project {
  slug: string
  name: string
  description: string
  livePreview: string
  image: string
}

interface ProjectsProps {
  projects: Project[]
}

export default function Projects({ projects }: ProjectsProps) {
  const t = useTranslations('projects')
  const locale = useLocale()

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-28 relative overflow-hidden"
      style={{
        background: 'var(--background)',
      }}>
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,178,144,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <span className="text-xs tracking-[0.3em] uppercase font-semibold text-primary/60 mb-4 block">
            {locale === 'es' ? 'Casos de Éxito' : 'Bespoke Work'}
          </span>
          <h2
            id="projects-heading"
            className="font-heading text-4xl md:text-5xl font-light text-foreground tracking-tight">
            {t('title')}{' '}
            <span className="font-heading italic text-accent font-normal">
              {locale === 'es' ? 'Destacado' : '& Case Studies'}
            </span>
          </h2>
          <p
            className="mt-4 text-sm font-sans font-light leading-relaxed max-w-xl"
            style={{ color: 'var(--muted-foreground)' }}>
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => {
            return (
              <article
                key={project.slug}
                className="project-card group relative rounded-lg border overflow-hidden transition-all duration-500 flex flex-col"
                style={{
                  background: 'var(--card)',
                  borderColor: 'var(--border)',
                }}>
                <div className="relative aspect-[1.6] w-full overflow-hidden border-b border-border/40 bg-[#160f0b]">
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    aria-hidden="true"
                    style={{
                      background: `radial-gradient(circle at 1px 1px, rgba(212,178,144,0.4) 1px, transparent 0)`,
                      backgroundSize: '24px 24px',
                    }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-700 group-hover:opacity-60"
                    aria-hidden="true"
                    style={{
                      background:
                        'radial-gradient(circle at 50% 50%, rgba(212,178,144,0.12) 0%, transparent 60%)',
                    }}
                  />

                  <div className="absolute top-3 left-4 right-4 h-6 flex items-center justify-between z-20">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-border/60" />
                      <span className="w-2 h-2 rounded-full bg-border/60" />
                      <span className="w-2 h-2 rounded-full bg-border/60" />
                    </div>
                    <div
                      className="text-[9px] font-sans tracking-wider px-3 py-0.5 rounded-full border border-border/40 bg-background/50 backdrop-blur-sm"
                      style={{
                        color: 'var(--muted-foreground)',
                        opacity: 0.8,
                      }}>
                      {project.name}
                    </div>
                    <div className="w-6" />
                  </div>

                  <div className="absolute inset-0 top-10 px-6 pb-6 flex items-center justify-center">
                    <div className="relative w-full h-full rounded border border-border/30 overflow-hidden shadow-2xl bg-background/20 backdrop-blur-[2px] transition-transform duration-700 ease-out group-hover:scale-[1.03] flex items-center justify-center">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-95 transition-opacity duration-500"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-linear-to-t from-[#160f0b]/80 via-transparent to-transparent pointer-events-none">
                        <span className="font-heading font-light text-sm tracking-widest text-primary/40 uppercase group-hover:text-primary/75 transition-colors duration-500">
                          {project.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <h3 className="font-heading text-2xl font-light text-foreground tracking-tight group-hover:text-accent transition-colors duration-500 mb-3">
                    {project.name}
                  </h3>
                  <p
                    className="text-sm font-sans font-light leading-relaxed mb-8 flex-1"
                    style={{ color: 'var(--muted-foreground)' }}>
                    {project.description}
                  </p>

                  <div className="flex items-center gap-6 mt-auto">
                    <a
                      href={project.livePreview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold transition-all duration-300"
                      style={{ color: 'var(--primary)' }}>
                      {t('livePreview')}
                      <ArrowUpRight size={14} className="shrink-0" />
                    </a>
                  </div>
                </div>
              </article>
            )
          })}

          <article
            className="project-card group relative rounded-[var(--radius-lg)] border border-dashed overflow-hidden transition-all duration-500 flex flex-col justify-center min-h-[350px]"
            style={{
              background: 'rgba(212, 178, 144, 0.02)',
              borderColor: 'rgba(212, 178, 144, 0.15)',
            }}>
            <div
              className="absolute inset-0 opacity-[0.08] pointer-events-none"
              aria-hidden="true"
              style={{
                background: `radial-gradient(circle at 1px 1px, rgba(212,178,144,0.4) 1px, transparent 0)`,
                backgroundSize: '24px 24px',
              }}
            />
            
            <div className="p-8 flex flex-col items-center text-center justify-center h-full">
              <div className="w-12 h-12 rounded-full border border-dashed border-primary/30 flex items-center justify-center text-primary/60 group-hover:border-primary group-hover:text-primary transition-all duration-500 mb-6 bg-primary/5">
                <span className="text-xl font-light font-sans">+</span>
              </div>
              
              <h3 className="font-heading text-xl font-light text-foreground tracking-tight mb-2">
                {t('moreComing')}
              </h3>
              
              <p
                className="text-xs font-sans font-light leading-relaxed mb-6 max-w-xs"
                style={{ color: 'var(--muted-foreground)' }}>
                {t('moreComingDesc')}
              </p>
              
              <a
                href={`/${locale}#contact`}
                className="project-link inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-semibold transition-all duration-300"
                style={{ color: 'var(--primary)' }}>
                {locale === 'es' ? 'Comenzar un proyecto' : 'Start a project'}
                <ArrowUpRight size={13} className="shrink-0" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
