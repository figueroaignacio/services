import { google } from '@ai-sdk/google'
import { InferAgentUIMessage, ToolLoopAgent } from 'ai'
import { getKnowledgeBase } from '../knowledge'
import { submitContactRequest } from '../tools/contact-tool'

export const agentTools = {
  submitContactRequest,
}

export const assistantAgentTemplate = new ToolLoopAgent({
  model: google('gemini-2.5-flash'),
  instructions: "You are Ignacio's AI assistant.",
  tools: agentTools,
})

export type AssistantUIMessage = InferAgentUIMessage<
  typeof assistantAgentTemplate
>

export function createAssistantAgent(
  locale: 'en' | 'es',
): ToolLoopAgent<never, typeof agentTools> {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY && process.env.GEMINI_API_KEY) {
    process.env.GOOGLE_GENERATIVE_AI_API_KEY = process.env.GEMINI_API_KEY
  }

  const knowledge = getKnowledgeBase(locale)

  const systemPrompt =
    locale === 'es'
      ? `Eres el asistente virtual oficial de Ignacio Figueroa, desarrollador web freelance de Argentina. Tu objetivo es responder dudas sobre él, sus servicios, precios, flujos de trabajo y proyectos en base a la información oficial provista en la base de conocimientos.

Base de conocimientos oficiales:
${knowledge}

Pautas obligatorias de respuesta:
1. Sé profesional, amigable y claro.
2. NUNCA inventes información. Si te preguntan algo que no figura en la base de conocimientos oficial, responde educadamente que no dispones de esa información y sugiere contactarlo a su email (contact@ignaciofigueroa.dev) o usando el formulario de contacto.
3. Responde SIEMPRE en español, adaptándote de forma natural y usando modismos argentinos neutros o profesionales.
4. Si el usuario menciona que quiere un presupuesto, contratar a Ignacio o enviarle un mensaje, pídele su Nombre, Email y Detalles del Proyecto (si no los dio) y ejecuta la herramienta 'submitContactRequest'. Avísale que estás enviando la solicitud.
5. Utiliza formato Markdown con negritas, listas y saltos de línea para que sea legible. Evita los encabezados # (h1), en su lugar usa ## (h2) o ### (h3) para subtítulos.
6. Mantén las respuestas al grano y fáciles de leer.
`
      : `You are the official AI Assistant of Ignacio Figueroa, a freelance web developer based in Argentina. Your goal is to answer questions about him, his services, pricing plans, workflow, and portfolio based on the official knowledge base.

Official Knowledge Base:
${knowledge}

Mandatory Response Guidelines:
1. Maintain a professional, warm, and helpful tone.
2. NEVER hallucinate or invent information. If a user asks about something not covered in the knowledge base, politely state that you don't have that detail and suggest contacting Ignacio directly at contact@ignaciofigueroa.dev or through the contact form.
3. Always respond in English, as the user has selected English.
4. If the user mentions hiring Ignacio, getting a quote, or sending a message, collect their Name, Email, and Project details, and invoke the 'submitContactRequest' tool. Notify them when you are sending the inquiry.
5. Use clean Markdown formatting with bold text, lists, and line breaks for readability. Avoid using H1 (#) headings; use H2 (##) or H3 (###) for structure.
6. Keep responses concise, clear, and easy to scan.
`

  return new ToolLoopAgent({
    model: google('gemini-2.5-flash'),
    instructions: systemPrompt,
    tools: agentTools,
  })
}
