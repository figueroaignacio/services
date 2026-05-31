import { defineCollection, defineConfig } from '@content-collections/core'
import { marked } from 'marked'
import { z } from 'zod'

const plans = defineCollection({
  name: 'plans',
  directory: 'content/plans',
  include: '**/*.mdx',
  schema: z.object({
    slug: z.string(),
    locale: z.enum(['en', 'es']),
    name: z.string(),
    tagline: z.string(),
    price: z.object({
      ars: z.string(),
      usd: z.string(),
      monthlyArs: z.string(),
      monthlyUsd: z.string(),
    }),
    idealFor: z.array(z.string()),
    includes: z.array(z.string()),
    notIncluded: z.array(z.string()),
    deliveryTime: z.string(),
    highlighted: z.boolean().optional(),
    cta: z.string(),
    content: z.string().optional(),
  }),
  transform: async (doc) => {
    const html = await marked(doc.content ?? '')
    return { ...doc, html }
  },
})

const projects = defineCollection({
  name: 'projects',
  directory: 'content/projects',
  include: '**/*.mdx',
  schema: z.object({
    slug: z.string(),
    locale: z.enum(['en', 'es']),
    name: z.string(),
    description: z.string(),
    livePreview: z.string(),
    image: z.string(),
    content: z.string().optional(),
  }),
  transform: async (doc) => {
    const html = await marked(doc.content ?? '')
    return { ...doc, html }
  },
})

export default defineConfig({
  content: [plans, projects],
})
