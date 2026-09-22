'use client'

import { useEffect } from 'react'
import Script from 'next/script'

function normalizarClient(valor: string): string {
  const v = (valor || '').trim()
  if (!v) return ''
  if (v.startsWith('ca-')) return v
  if (v.startsWith('pub-')) return `ca-${v}`
  return v
}

const ADSENSE = normalizarClient(process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '')
const EZOIC = process.env.NEXT_PUBLIC_EZOIC === '1'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
    ezstandalone?: { cmd: unknown[]; showAds?: (...ids: number[]) => void }
  }
}

export function AdScripts() {
  if (EZOIC) {
    return (
      <Script
        id="ezoic-init"
        src="https://g.ezoic.net/ezoic/ezoic.js"
        strategy="afterInteractive"
      />
    )
  }
  if (ADSENSE) {
    return (
      <Script
        id="adsbygoogle-init"
        async
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE}`}
        crossOrigin="anonymous"
      />
    )
  }
  return null
}

interface AdSlotProps {
  slot?: string
  /** ID numerico do placeholder do Ezoic (ex.: 101). */
  ezoicId?: number
  formato?: 'auto' | 'fluid' | 'rectangle'
  layout?: string
  className?: string
  rotulo?: string | boolean
}

export default function AdSlot({
  slot,
  ezoicId,
  formato = 'auto',
  layout,
  className = '',
  rotulo,
}: AdSlotProps) {
  const slotId = slot || process.env.NEXT_PUBLIC_ADSENSE_SLOT || ''
  const placeholderId = ezoicId ?? (slotId ? Number(slotId) : undefined)
  const ativo = EZOIC ? Boolean(placeholderId) : Boolean(ADSENSE && slotId)

  useEffect(() => {
    if (!ativo) return
    try {
      if (EZOIC && window.ezstandalone && placeholderId) {
        window.ezstandalone.cmd = window.ezstandalone.cmd || []
        window.ezstandalone.cmd.push(() => window.ezstandalone?.showAds?.(placeholderId))
      } else if (!EZOIC && ADSENSE) {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch {
      /* silencioso */
    }
  }, [ativo, placeholderId])

  if (!ativo) return null

  return (
    <div className={className}>
      {rotulo && (
        <p className="text-[10px] uppercase tracking-widest text-ink-500 mb-1 text-center">
          {typeof rotulo === 'string' ? rotulo : 'Publicidade'}
        </p>
      )}
      {EZOIC ? (
        <div id={`ezoic-pub-ad-placeholder-${placeholderId}`} />
      ) : (
        <ins
          className="adsbygoogle block"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE}
          data-ad-slot={slotId}
          data-ad-format={formato}
          data-ad-layout={layout}
          data-full-width-responsive="true"
        />
      )}
    </div>
  )
}
