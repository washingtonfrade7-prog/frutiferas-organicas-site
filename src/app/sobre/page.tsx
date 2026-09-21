import type { Metadata } from 'next'
import Link from 'next/link'
import { site, youtubeChannelUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Sobre o projeto',
  description:
    'Conheça o Frutíferas Orgânicas, portal de conteúdo e vitrine de marketing de afiliados dedicado ao cultivo de frutíferas orgânicas em vaso.',
  alternates: { canonical: '/sobre' },
  openGraph: { url: '/sobre', title: `Sobre - ${site.name}` },
}

export default function SobrePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="flex items-center gap-2 text-sm text-ink-500 mb-6">
        <Link href="/" className="hover:text-forest-600">Início</Link>
        <span>/</span>
        <span className="text-ink-900 font-medium">Sobre</span>
      </nav>

      <h1 className="text-3xl font-bold mb-6">Sobre o Frutíferas Orgânicas</h1>

      <div className="prose prose-sm max-w-none text-ink-600 leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1">
        <p>
          O <strong>Frutíferas Orgânicas</strong> é um portal de conteúdo e uma vitrine de
          marketing de afiliados dedicado a quem quer produzir frutas de verdade em casa, mesmo com
          pouco espaço.
        </p>
        <p>
          Nosso objetivo é ensinar, de forma simples e prática, como cultivar frutíferas nativas,
          raras e exóticas em vaso, com manejo orgânico, sem agrotóxicos e respeitando o ritmo da
          natureza.
        </p>

        <h2>O que você encontra aqui</h2>
        <ul>
          <li>Fichas completas de cultivo de cada frutífera (luz, rega, solo, vaso e dicas).</li>
          <li>Vídeos práticos de plantio, poda, adubação e colheita.</li>
          <li>Indicação de lojas parceiras para comprar mudas e insumos com segurança.</li>
        </ul>

        <h2>Como ganhamos</h2>
        <p>
          Este site participa de programas de afiliados. Quando você compra por meio dos nossos
          links, podemos receber uma comissão das lojas parceiras, <strong>sem nenhum custo
          adicional para você</strong>. Isso nos ajuda a manter o conteúdo gratuito e atualizado.
        </p>
        <p>
          Veja mais detalhes na página de{' '}
          <Link href="/aviso-de-afiliados" className="text-forest-600 underline">Aviso de afiliados</Link>.
        </p>

        <h2>Acompanhe o canal</h2>
        <p>
          Grande parte do nosso conteúdo nasce no YouTube, onde mostramos o dia a dia do cultivo em
          vaso.{' '}
          <a href={youtubeChannelUrl()} target="_blank" rel="noopener noreferrer" className="text-forest-600 underline">
            Inscreva-se no canal
          </a>{' '}
          para não perder os próximos vídeos.
        </p>
      </div>
    </div>
  )
}
