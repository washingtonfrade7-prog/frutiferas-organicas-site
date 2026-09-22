'use client'

import { useState } from 'react'
import { site } from '@/lib/site'

interface NewsletterFormProps {
  origem?: string
  className?: string
  compacto?: boolean
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const ENDPOINT = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT || '/newsletter.php'

export default function NewsletterForm({
  origem = 'site',
  className = '',
  compacto = false,
}: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'enviando' | 'ok' | 'erro'>('idle')
  const [mensagem, setMensagem] = useState('')

  async function enviar(e: React.FormEvent) {
    e.preventDefault()
    const valor = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
      setStatus('erro')
      setMensagem('Digite um e-mail válido.')
      return
    }

    setStatus('enviando')
    setMensagem('')

    function abrirEmail() {
      const assunto = encodeURIComponent('Quero entrar na lista de espera')
      const corpo = encodeURIComponent(`E-mail: ${valor}\nOrigem: ${origem}\n`)
      window.location.href = `mailto:${site.email}?subject=${assunto}&body=${corpo}`
    }

    try {
      const resp = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: valor, origem }),
      })
      if (!resp.ok) throw new Error('falha')

      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'newsletter_signup', { origem })
      }
      setStatus('ok')
      setMensagem('Pronto! Você está na lista. Vamos te avisar em primeira mão.')
      setEmail('')
    } catch {
      abrirEmail()
      setStatus('ok')
      setMensagem('Abrimos seu e-mail para confirmar a inscrição. Se não abrir, escreva para nós.')
      setEmail('')
    }
  }

  return (
    <form onSubmit={enviar} className={`w-full ${className}`}>
      <div className={`flex flex-col ${compacto ? 'sm:flex-row' : 'sm:flex-row'} gap-2`}>
        <label htmlFor={`news-${origem}`} className="sr-only">
          Seu e-mail
        </label>
        <input
          id={`news-${origem}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu melhor e-mail"
          className="flex-1 rounded-full border border-cream-200 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-100"
        />
        <button
          type="submit"
          disabled={status === 'enviando'}
          className="shrink-0 rounded-full bg-terracotta-600 hover:bg-terracotta-700 disabled:opacity-60 text-white px-5 py-2.5 text-sm font-medium transition"
        >
          {status === 'enviando' ? 'Enviando...' : 'Quero entrar na lista'}
        </button>
      </div>
      {mensagem && (
        <p
          className={`mt-2 text-xs ${status === 'ok' ? 'text-forest-700' : 'text-terracotta-700'}`}
          role="status"
        >
          {mensagem}
        </p>
      )}
      <p className="mt-2 text-[11px] text-ink-500">
        Sem spam. Você pode sair da lista quando quiser.
      </p>
    </form>
  )
}
