import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Aviso de afiliados',
  description:
    'Entenda como funcionam os links de afiliados do Frutíferas Orgânicas e como isso mantém nosso conteúdo gratuito.',
  alternates: { canonical: '/aviso-de-afiliados' },
  robots: { index: true, follow: true },
}

export default function AvisoAfiliadosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="flex items-center gap-2 text-sm text-ink-500 mb-6">
        <Link href="/" className="hover:text-forest-600">Início</Link>
        <span>/</span>
        <span className="text-ink-900 font-medium">Aviso de afiliados</span>
      </nav>

      <h1 className="text-3xl font-bold mb-6">Aviso de afiliados</h1>

      <div className="prose prose-sm max-w-none text-ink-600 leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1">
        <p>
          O <strong>{site.name}</strong> é um portal de conteúdo e uma vitrine de marketing de
          afiliados. Não vendemos produtos diretamente e não possuímos estoque próprio.
        </p>

        <h2>Como funcionam nossos links</h2>
        <p>
          Os botões “Onde Comprar” e “Ver Oferta” direcionam você para lojas parceiras, abrindo em
          uma nova aba. Esses links são de afiliado: quando você realiza uma compra após clicar,
          podemos receber uma comissão da loja parceira.
        </p>
        <p>
          <strong>Esse custo não é repassado a você.</strong> O preço pago é o mesmo, com ou sem o
          nosso link.
        </p>

        <h2>Transparência</h2>
        <ul>
          <li>Não somos responsáveis pela venda, pelo envio, pela qualidade ou pela garantia dos produtos.</li>
          <li>Preços, disponibilidade e condições são definidos exclusivamente pelas lojas parceiras.</li>
          <li>Recomendamos sempre conferir as informações do vendedor antes de finalizar a compra.</li>
        </ul>

        <h2>Por que usamos afiliados</h2>
        <p>
          As comissões nos permitem manter a produção de conteúdo, os vídeos e as fichas de cultivo
          gratuitos para todos. Agradecemos pelo apoio!
        </p>

        <h2>Dúvidas</h2>
        <p>
          Em caso de dúvidas, fale conosco pela página de{' '}
          <Link href="/contato" className="text-forest-600 underline">Contato</Link>.
        </p>
      </div>
    </div>
  )
}
