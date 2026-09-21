import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Política de privacidade',
  description:
    'Saiba como o Frutíferas Orgânicas trata dados de navegação, cookies e links de afiliados.',
  alternates: { canonical: '/politica-de-privacidade' },
}

export default function PrivacidadePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="flex items-center gap-2 text-sm text-ink-500 mb-6">
        <Link href="/" className="hover:text-forest-600">Início</Link>
        <span>/</span>
        <span className="text-ink-900 font-medium">Política de privacidade</span>
      </nav>

      <h1 className="text-3xl font-bold mb-6">Política de privacidade</h1>

      <div className="prose prose-sm max-w-none text-ink-600 leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1">
        <p>
          Esta política descreve como o site <strong>{site.name}</strong> lida com informações ao
          ser utilizado.
        </p>

        <h2>Dados que coletamos</h2>
        <p>
          Este é um site informativo e não exige cadastro. Não coletamos diretamente dados pessoais
          como nome, e-mail ou telefone por meio de formulários.
        </p>

        <h2>Cookies e navegação</h2>
        <p>
          Podemos utilizar cookies e tecnologias semelhantes para métricas de audiência e para o
          funcionamento de links de afiliados. Você pode gerenciar cookies nas configurações do seu
          navegador.
        </p>

        <h2>Links de terceiros</h2>
        <p>
          Nosso conteúdo inclui links para lojas parceiras e para o YouTube. Ao clicar, você passa a
          estar sujeito às políticas de privacidade desses serviços, sobre as quais não temos
          controle.
        </p>

        <h2>Seus direitos</h2>
        <p>
          Em conformidade com a Lei Geral de Proteção de Dados (LGPD), você pode solicitar
          informações sobre o tratamento de dados entrando em contato pelo e-mail{' '}
          <a href={`mailto:${site.email}`} className="text-forest-600 underline">{site.email}</a>.
        </p>

        <h2>Alterações</h2>
        <p>
          Esta política pode ser atualizada periodicamente. Recomendamos revisá-la de tempos em
          tempos.
        </p>
      </div>
    </div>
  )
}
