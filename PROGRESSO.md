# LOG DE EXECUÇÃO — Frutíferas Orgânicas

> Atualizado a cada etapa. Em caso de queda de energia, retomar pela primeira tarefa `[ ]`.

## Estado atual
- Site Next.js 14 + TS + Tailwind em `D:\SITE FRUTÍFERAS ORGÂNICAS`
- 102 frutíferas no catálogo (10 manuais + 92 do acervo TOP 100)
- Repo: https://github.com/washingtonfrade7-prog/frutiferas-organicas-site (branch `main`)
- Último commit conhecido: `dbac269`

## Fila de tarefas

### FASE A — Correção de identificação (espécies)
- [x] A1. Criar registro de espécies (`ferramentas/auditoria/especies.json`)
- [x] A2. Desambiguar famílias com nomes repetidos (limão, laranja, araçá, pitanga, uva, amora, goiaba, pitaya, jabuticaba, grumixama, manga, ameixa, cabeludinha...)
- [x] A3. Pesquisar no canal + web nome científico e características distintas
- [x] A4. Gerar textos de "como diferenciar" por variedade
- [x] A5. Regenerar catálogo com dados corretos (91 geradas + 10 manuais = 101)
- Correções-chave: limão cravo = *Citrus × limonia*; galego = *C. × aurantifolia*; caviar = *C. australasica*; tanjo = *C. limettioides*; kinkan = *C. japonica*; jabuticaba branca = *Plinia aureana*; cambuí roxo = *Eugenia candolleana*; groselha = *Phyllanthus acidus*; cabeludinha roxa/peludinha = mesma espécie (mesclada)

### FASE B — Páginas de ensino (conteúdo + vídeos)
- [x] B1. Adubação
- [x] B2. Poda
- [x] B3. Como plantar
- [x] B4. Colheita
- [x] B5. Tour pelo pomar
- [x] B6. Texto explicativo das espécies (leitura) + vídeos
- 8 guias em `/guias/[slug]`: plantio, adubacao, poda, colheita, tour, cuidados, floracao, gastronomia (texto + passo a passo + dicas + erros + FAQ + vídeos)

### FASE C — Estilo / UX (referências de grandes sites)
- [x] C1. Navegação e breadcrumbs
- [x] C2. Cards e detalhes (galeria, badges, CTA afiliado)
- [x] C3. Links internos guias <-> frutíferas (SEO/descoberta)
- [ ] C4. Revisão fina de acessibilidade e Lighthouse

### FASE D — Monetização
- [x] D1. Google AdSense (script + slots + env `NEXT_PUBLIC_ADSENSE_CLIENT`/`_SLOT`)
- [x] D2. `ads.txt` e política de privacidade com seção de publicidade
- [x] D3. CTA de afiliados e banners
- [ ] D4. Ativar AdSense após aprovação (inserir o client ID e o slot)

### FASE E — SEO / Performance / Deploy
- [x] E1. Sitemap/robots/JSON-LD atualizados (inclui guias)
- [ ] E2. Lighthouse
- [ ] E3. Deploy Vercel (requer login do usuário)

## Histórico
- (ver commits do repositório)
