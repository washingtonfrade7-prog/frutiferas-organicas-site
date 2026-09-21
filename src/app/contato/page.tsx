import type { Metadata } from 'next'
import Link from 'next/link'
import { site, whatsappLink, youtubeChannelUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contato',
  description:
    'Fale com o Frutíferas Orgânicas por WhatsApp ou e-mail. Tire dúvidas sobre cultivo de frutíferas em vaso e parcerias.',
  alternates: { canonical: '/contato' },
  openGraph: { url: '/contato', title: `Contato - ${site.name}` },
}

export default function ContatoPage() {
  const canais = [
    {
      titulo: 'WhatsApp',
      descricao: 'Atendimento rápido para dúvidas e sugestões.',
      valor: site.whatsappLabel,
      href: whatsappLink('Olá! Vim pelo site Frutíferas Orgânicas e tenho uma dúvida.'),
      externo: true,
    },
    {
      titulo: 'E-mail',
      descricao: 'Para parcerias, imprensa e assuntos comerciais.',
      valor: site.email,
      href: `mailto:${site.email}`,
      externo: false,
    },
    {
      titulo: 'YouTube',
      descricao: 'Acompanhe os vídeos e comente suas dúvidas por lá.',
      valor: `@${site.youtubeHandle}`,
      href: youtubeChannelUrl(),
      externo: true,
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="flex items-center gap-2 text-sm text-ink-500 mb-6">
        <Link href="/" className="hover:text-forest-600">Início</Link>
        <span>/</span>
        <span className="text-ink-900 font-medium">Contato</span>
      </nav>

      <h1 className="text-3xl font-bold mb-3">Fale com a gente</h1>
      <p className="text-ink-500 mb-8">
        Escolha o canal de sua preferência. Respondemos o mais rápido possível.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {canais.map((canal) => (
          <a
            key={canal.titulo}
            href={canal.href}
            {...(canal.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="bg-white rounded-xl shadow-sm border border-cream-200 p-6 hover:shadow-md hover:border-forest-300 transition group"
          >
            <h2 className="font-semibold text-ink-900 group-hover:text-forest-700 transition mb-1">
              {canal.titulo}
            </h2>
            <p className="text-xs text-ink-500 mb-3">{canal.descricao}</p>
            <span className="text-sm font-medium text-forest-700 break-all">{canal.valor}</span>
          </a>
        ))}
      </div>

      <div className="mt-10 bg-cream-100 border border-cream-200 rounded-xl p-6 text-sm text-ink-600">
        <p>
          <strong>Importante:</strong> não vendemos mudas diretamente. Nosso site é uma vitrine de
          afiliados e direciona você para lojas parceiras. Para questões sobre pedidos, prazos e
          entregas, entre em contato diretamente com a loja onde realizou a compra.
        </p>
      </div>
    </div>
  )
}
