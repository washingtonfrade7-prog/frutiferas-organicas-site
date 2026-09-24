import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/lib/site'

const ICS_PATH = '/Calendario-Frutiferas-90-dias.ics'
const ICS_URL = `${site.url}${ICS_PATH}`
const ICS_WEBCAL = `webcal://${site.url.replace(/^https?:\/\//, '')}${ICS_PATH}`
const ICS_NOME = 'Frutíferas em Vaso - 90 dias'

export const metadata: Metadata = {
  title: 'Calendário de cuidados — 90 dias',
  description:
    'Adicione os 43 lembretes de cultivo ao seu calendário com um toque: teste do dedo, inspeção de pragas, bokashi, adubo líquido e poda.',
  alternates: { canonical: '/calendario' },
  // Página de apoio ao aluno: não precisa competir com o produto na busca.
  robots: { index: false, follow: false },
}

export default function CalendarioPage() {
  const botoes = [
    {
      nome: 'Google Agenda',
      dica: 'Abre no navegador e sincroniza sozinho',
      href: `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(ICS_URL)}`,
      externo: true,
      destaque: true,
    },
    {
      nome: 'iPhone / iPad',
      dica: 'Abre direto no app Calendário',
      href: ICS_WEBCAL,
      externo: false,
      destaque: true,
    },
    {
      nome: 'Outlook',
      dica: 'Outlook.com e Office 365',
      href: `https://outlook.live.com/calendar/0/addfromweb?url=${encodeURIComponent(ICS_URL)}&name=${encodeURIComponent(ICS_NOME)}`,
      externo: true,
      destaque: false,
    },
    {
      nome: 'Android / outros',
      dica: 'Baixa o arquivo para abrir no app de calendário',
      href: ICS_PATH,
      externo: false,
      destaque: false,
    },
  ]

  const tarefas = [
    ['Teste do dedo e registro', '1x por semana'],
    ['Inspeção de pragas (5 min)', '1x por semana'],
    ['Adubo líquido (chá de húmus)', 'a cada 15 dias'],
    ['Bokashi na borda do vaso', 'a cada 30 a 45 dias'],
    ['Poda de limpeza', 'dia 60'],
    ['Balanço dos 90 dias', 'dia 90'],
    ['Renovação do substrato', 'a cada 2 anos'],
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="flex items-center gap-2 text-sm text-ink-500 mb-6">
        <Link href="/" className="hover:text-forest-600">Início</Link>
        <span>/</span>
        <span className="text-ink-900 font-medium">Calendário de cuidados</span>
      </nav>

      <h1 className="text-3xl font-bold mb-3">Calendário de cuidados — 90 dias</h1>
      <p className="text-ink-600 mb-2">
        São <strong>43 lembretes automáticos</strong> para você não depender da memória: o celular
        avisa na hora certa de regar, adubar, inspecionar e podar.
      </p>
      <p className="text-ink-500 mb-8 text-sm">
        Escolha o seu calendário abaixo. Em um toque os lembretes entram na sua agenda — com aviso
        automático, sem baixar arquivo e sem configurar nada.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {botoes.map((b) => (
          <a
            key={b.nome}
            href={b.href}
            {...(b.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={`rounded-xl border p-5 transition group ${
              b.destaque
                ? 'bg-forest-700 border-forest-700 hover:bg-forest-800'
                : 'bg-white border-cream-200 hover:border-forest-300 hover:shadow-md'
            }`}
          >
            <span
              className={`block font-semibold mb-1 ${
                b.destaque ? 'text-white' : 'text-ink-900 group-hover:text-forest-700'
              }`}
            >
              {b.nome}
            </span>
            <span className={`text-xs ${b.destaque ? 'text-cream-200' : 'text-ink-500'}`}>
              {b.dica}
            </span>
          </a>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-3">O que vai cair na sua agenda</h2>
      <div className="bg-white rounded-xl border border-cream-200 overflow-hidden mb-10">
        <table className="w-full text-sm">
          <tbody>
            {tarefas.map(([tarefa, quando], i) => (
              <tr key={tarefa} className={i % 2 ? 'bg-cream-50' : ''}>
                <td className="px-4 py-2.5 text-ink-800">{tarefa}</td>
                <td className="px-4 py-2.5 text-ink-500 text-right whitespace-nowrap">{quando}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-cream-100 border border-cream-200 rounded-xl p-5 text-sm text-ink-600">
        <p className="mb-2">
          <strong>Começou agora?</strong> O calendário já está ajustado para quem planta hoje — o
          primeiro lembrete cai amanhã, no dia 1 do plano.
        </p>
        <p>
          Se preferir, também dá para{' '}
          <a href={ICS_PATH} download className="text-forest-700 font-medium hover:underline">
            baixar o arquivo .ics
          </a>{' '}
          e importar manualmente. Mas o caminho mais rápido é o botão acima.
        </p>
      </div>

      <p className="text-xs text-ink-400 mt-8">
        Dúvida? Escreva para{' '}
        <a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a>.
      </p>
    </div>
  )
}
