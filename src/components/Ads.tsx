'use client'

import { useEffect } from 'react'
import Script from 'next/script'

const CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || ''

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

export function AdSenseScript() {
  if (!CLIENT) return null
  return (
    <Script
      id="adsbygoogle-init"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT}`}
      crossOrigin="anonymous"
    />
  )
}

interface AdSlotProps {
  slot?: string
  formato?: 'auto' | 'fluid' | 'rectangle'
  layout?: string
  className?: string
  rotulo?: string | boolean
}

export default function AdSlot({ slot, formato = 'auto', layout, className = '', rotulo }: AdSlotProps) {
  const slotId = slot || process.env.NEXT_PUBLIC_ADSENSE_SLOT || ''

  useEffect(() => {
    if (!CLIENT || !slotId) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      /* silencioso */
    }
  }, [slotId])

  if (!CLIENT || !slotId) return null

  return (
    <div className={className}>
      {rotulo && (
        <p className="text-[10px] uppercase tracking-widest text-ink-500 mb-1 text-center">
          {typeof rotulo === 'string' ? rotulo : 'Publicidade'}
        </p>
      )}
      <ins
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client={CLIENT}
        data-ad-slot={slotId}
        data-ad-format={formato}
        data-ad-layout={layout}
        data-full-width-responsive="true"
      />
    </div>
  )
}
