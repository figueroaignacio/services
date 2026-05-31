'use client'

import type { AssistantUIMessage } from '@/lib/agents/assistant-agent'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import {
  AlertCircle,
  Check,
  HelpCircle,
  Loader2,
  MessageCircle,
  RefreshCw,
  Send,
  Sparkles,
  User,
  X,
} from 'lucide-react'
import { marked } from 'marked'
import { useLocale, useTranslations } from 'next-intl'
import React, { useEffect, useRef, useState } from 'react'

marked.setOptions({
  gfm: true,
  breaks: true,
})

function Markdown({ content }: { content: string }) {
  try {
    const html = marked(content) as string
    return (
      // eslint-disable-next-line react-hooks/error-boundaries
      <div
        className="text-[14px] leading-relaxed wrap-break-word text-foreground/90
          [&_p]:mb-2 [&_p:last-child]:mb-0
          [&_h2]:text-[16px] [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-3 [&_h2]:mb-1
          [&_h3]:text-[15px] [&_h3]:font-medium [&_h3]:text-foreground [&_h3]:mt-2 [&_h3]:mb-1
          [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:mb-2
          [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:mb-2
          [&_li]:mb-1 [&_strong]:font-semibold [&_strong]:text-primary
          [&_a]:text-primary [&_a]:underline"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  } catch {
    return (
      <p className="text-[14px] leading-relaxed text-foreground/90">
        {content}
      </p>
    )
  }
}

export default function Chatbot() {
  const locale = (useLocale() as 'en' | 'es') || 'es'
  const t = useTranslations('chatbot')
  const quickQuestions = [t('q1'), t('q2'), t('q3'), t('q4')]

  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [mounted, setMounted] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status, error, regenerate, clearError } =
    useChat<AssistantUIMessage>({
      transport: new DefaultChatTransport({
        api: '/api/chat',
        body: { locale },
      }),
    })

  const isGenerating = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const lastMessageText = messages[messages.length - 1]?.parts
    .filter((p) => p.type === 'text')
    .map((p) => p.text)
    .join('')

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages.length, lastMessageText, isOpen])

  // Focus input when chat window opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [isOpen])

  if (!mounted) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isGenerating) return

    const textToSend = input
    setInput('')
    clearError()

    try {
      await sendMessage({ text: textToSend })
    } catch (err) {
      console.error('Failed to send chat message:', err)
    }
  }

  const handleQuickQuestionClick = async (question: string) => {
    if (isGenerating) return
    clearError()
    try {
      await sendMessage({ text: question })
    } catch (err) {
      console.error('Failed to send quick question:', err)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label="Toggle assistant chat">
        {isOpen ? (
          <X className="w-6 h-6 transition-transform duration-300 rotate-90" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-primary animate-pulse" />
          </div>
        )}
      </button>

      <div
        className={`fixed bottom-24 right-6 z-50 w-180 max-w-[calc(100vw-2rem)] h-165 max-h-[calc(100vh-8rem)] rounded-md bg-card/95 border border-border shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-out origin-bottom-right ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
        }`}>
        {/* Header */}
        <div className="px-4 py-3 bg-secondary/80 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-card" />
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-foreground tracking-tight leading-none">
                {t('title')}
              </h3>
              <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                <span className="inline-block w-1 h-1 rounded-full bg-emerald-500" />
                {t('statusOnline')}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
            aria-label="Close chat">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-border">
          {/* Welcome Message (Static) */}
          <div className="flex gap-2.5 mr-8">
            <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="p-3 rounded-md rounded-tl-sm bg-input border border-border">
              <p className="text-[14px] text-foreground/90 leading-relaxed">
                {t('welcome')}
              </p>
            </div>
          </div>

          {/* Chat History */}
          {messages.map((message) => {
            const isUser = message.role === 'user'
            return (
              <div
                key={message.id}
                className={`flex gap-2.5 ${
                  isUser ? 'justify-end ml-8' : 'mr-8'
                }`}>
                {!isUser && (
                  <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-md ${
                    isUser
                      ? 'bg-secondary border border-border rounded-tr-sm text-foreground'
                      : 'bg-input border border-border rounded-tl-sm text-foreground/90'
                  } space-y-2`}>
                  {message.parts.map((part, index) => {
                    if (part.type === 'text') {
                      return <Markdown key={index} content={part.text} />
                    }

                    if (part.type === 'tool-submitContactRequest') {
                      const isPending =
                        part.state === 'input-streaming' ||
                        part.state === 'input-available'
                      const isSuccess =
                        part.state === 'output-available' &&
                        part.output?.success
                      const isError =
                        part.state === 'output-available' &&
                        !part.output?.success

                      return (
                        <div
                          key={index}
                          className="my-2 p-3 bg-secondary/40 rounded-md border border-border text-xs flex flex-col gap-2 min-w-50">
                          <div className="flex items-center gap-2">
                            {isPending && (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                                <span className="text-muted-foreground font-medium">
                                  {t('toolDrafting')}
                                </span>
                              </>
                            )}
                            {isSuccess && (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                <span className="text-emerald-400 font-semibold">
                                  Inquiry Sent
                                </span>
                              </>
                            )}
                            {isError && (
                              <>
                                <AlertCircle className="w-3.5 h-3.5 text-destructive shrink-0" />
                                <span className="text-destructive font-semibold">
                                  Failed to Send
                                </span>
                              </>
                            )}
                          </div>

                          {(part.state === 'input-available' ||
                            part.state === 'output-available') &&
                            part.input && (
                              <div className="pl-4 border-l-2 border-border/80 space-y-1 text-[11px] text-muted-foreground">
                                <div>
                                  <span className="font-semibold text-foreground/80">
                                    Name:
                                  </span>{' '}
                                  {part.input.name}
                                </div>
                                <div>
                                  <span className="font-semibold text-foreground/80">
                                    Email:
                                  </span>{' '}
                                  {part.input.email}
                                </div>
                                <div>
                                  <span className="font-semibold text-foreground/80">
                                    Inquiry:
                                  </span>{' '}
                                  {part.input.message}
                                </div>
                              </div>
                            )}
                          {part.state === 'output-available' && part.output && (
                            <div className="text-[11px] pt-1">
                              {part.output.success ? (
                                <span className="text-emerald-400">
                                  {t('toolSuccess')}
                                </span>
                              ) : (
                                <span className="text-destructive">
                                  {part.output.error || t('toolError')}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    }

                    return null
                  })}
                </div>
                {isUser && (
                  <div className="w-7 h-7 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground shrink-0">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            )
          })}

          {/* Typing Indicator */}
          {isGenerating && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex gap-2.5 mr-8">
              <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="px-3.5 py-3 rounded-xl rounded-tl-sm bg-input border border-border flex items-center justify-center">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce" />
                </div>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="p-3.5 bg-destructive/10 border border-destructive/20 rounded-xl flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="w-4 h-4" />
                <span className="font-semibold">{t('errorOccurred')}</span>
              </div>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                {error.message || 'Verification of GEMINI_API_KEY failed.'}
              </p>
              <button
                type="button"
                onClick={() => regenerate()}
                className="mt-1 px-3 py-1 bg-destructive text-white rounded-md text-[11px] font-medium self-start hover:bg-destructive/90 transition-colors flex items-center gap-1.5 cursor-pointer">
                <RefreshCw className="w-3 h-3" />
                {t('retry')}
              </button>
            </div>
          )}
          {messages.length === 0 && (
            <div className="pt-2 pl-9 space-y-2">
              <span className="text-[10px] text-muted-foreground flex items-center gap-1 uppercase tracking-wider font-semibold">
                <HelpCircle className="w-3 h-3" /> {t('suggestionsHeader')}
              </span>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickQuestionClick(q)}
                    disabled={isGenerating}
                    className="text-left text-xs bg-secondary/50 border border-border hover:border-primary/40 hover:bg-secondary text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-3 border-t border-border bg-input/60 flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('placeholder')}
            disabled={isGenerating}
            className="flex-1 bg-transparent border-0 outline-none focus:ring-0 text-[13px] text-foreground placeholder:text-muted-foreground/60 px-2 h-9"
          />
          <button
            type="submit"
            disabled={!input.trim() || isGenerating}
            className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer ${
              input.trim() && !isGenerating
                ? 'bg-primary text-primary-foreground hover:scale-105 active:scale-95'
                : 'text-muted-foreground/40 bg-secondary/30 pointer-events-none'
            }`}
            aria-label={t('send')}>
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>
      </div>
    </>
  )
}
