'use client'

import { useState } from 'react'

const ENDPOINT = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT || '/newsletter.php'
const PDF = '/isca/10-frutiferas-faceis.pdf'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/** Captura o e-mail e, ao confirmar, libera o download da isca digital. */
export default function IscaForm() {
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
    try {
      const resp = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: valor, origem: 'isca-10-frutiferas' }),
      })
      if (!resp.ok) throw new Error('falha')
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'lead_isca', { origem: 'isca-10-frutiferas' })
      }
      setStatus('ok')
    } catch {
      setStatus('erro')
      setMensagem('Não conseguimos registrar agora. Tente novamente em instantes.')
    }
  }

  if (status === 'ok') {
    return (
      <div className="rounded-2xl border-2 border-forest-300 bg-white p-6 text-center">
        <p className="text-lg font-bold text-forest-700 mb-1">Prontinho! 🌱</p>
        <p className="text-sm text-ink-600 mb-4">
          Seu guia está liberado. Baixe agora e comece a escolher a sua primeira frutífera.
        </p>
        <a
          href={PDF}
          download
          className="inline-flex items-center gap-2 rounded-full bg-terracotta-600 px-7 py-3.5 text-base font-bold text-white hover:bg-terracotta-700 transition"
        >
          Baixar o guia (PDF)
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
          </svg>
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={enviar} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu melhor e-mail"
          className="flex-1 rounded-full border border-cream-200 px-5 py-3.5 text-ink-900 focus:border-forest-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'enviando'}
          className="rounded-full bg-terracotta-600 px-7 py-3.5 text-base font-bold text-white hover:bg-terracotta-700 transition disabled:opacity-60"
        >
          {status === 'enviando' ? 'Enviando…' : 'Quero o guia grátis'}
        </button>
      </div>
      {mensagem && <p className="text-sm text-terracotta-700">{mensagem}</p>}
      <p className="text-xs text-ink-500">
        Ao se inscrever, você concorda em receber e-mails do Frutíferas Orgânicas. Sem spam — você pode
        sair quando quiser.
      </p>
    </form>
  )
}
