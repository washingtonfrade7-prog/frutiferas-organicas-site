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

/**
 * Carrega os scripts das redes de anuncios configuradas.
 * AdSense e Ezoic podem coexistir (paralelo): o AdSense atende os slots proprios
 * e o Ezoic cuida dos anuncios automaticos dele.
 */
export function AdScripts() {
  return (
    <>
      {ADSENSE && (
        <Script
          id="adsbygoogle-init"
          async
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE}`}
        />
      )}
      {EZOIC && (
        <Script id="ezoic-init" src="https://g.ezoic.net/ezoic/ezoic.js" strategy="afterInteractive" />
      )}
    </>
  )
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

  const usarAdsense = Boolean(ADSENSE && slotId)
  const usarEzoic = !usarAdsense && EZOIC && Boolean(placeholderId)

  useEffect(() => {
    if (usarAdsense) {
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch {
        /* silencioso */
      }
    } else if (usarEzoic && placeholderId) {
      try {
        window.ezstandalone = window.ezstandalone || { cmd: [] }
        window.ezstandalone.cmd.push(() => window.ezstandalone?.showAds?.(placeholderId))
      } catch {
        /* silencioso */
      }
    }
  }, [usarAdsense, usarEzoic, placeholderId])

  if (!usarAdsense && !usarEzoic) return null

  return (
    <div className={className}>
      {rotulo && (
        <p className="text-[10px] uppercase tracking-widest text-ink-500 mb-1 text-center">
          {typeof rotulo === 'string' ? rotulo : 'Publicidade'}
        </p>
      )}
      {usarAdsense ? (
        <ins
          className="adsbygoogle block"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE}
          data-ad-slot={slotId}
          data-ad-format={formato}
          data-ad-layout={layout}
          data-full-width-responsive="true"
        />
      ) : (
        <div id={`ezoic-pub-ad-placeholder-${placeholderId}`} />
      )}
    </div>
  )
}
