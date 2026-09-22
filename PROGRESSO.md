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
- [ ] C1. Breadcrumbs + navegação
- [ ] C2. Cards e detalhes (galeria, badges, CTA afiliado)
- [ ] C3. Trust signals / prova social / newsletter
- [ ] C4. Responsividade e acessibilidade

### FASE D — Monetização
- [ ] D1. Google AdSense (script + slots + env)
- [ ] D2. `ads.txt` e páginas de política
- [ ] D3. Otimização de afiliados (CTA, banners)

### FASE E — SEO / Performance / Deploy
- [ ] E1. Sitemap/robots/JSON-LD atualizados
- [ ] E2. Lighthouse
- [ ] E3. Deploy Vercel

## Histórico
- (ver commits do repositório)
