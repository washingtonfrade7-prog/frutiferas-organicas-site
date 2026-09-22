# Deploy na Hostinger (plano Unlimited)

Site **estático** (Next.js `output: 'export'`). O pacote fica em `out/` e é empacotado em `frutiferas-site.zip`.

## 1. Gerar o pacote

```powershell
npm run build
npm run package
```

Isso cria `frutiferas-site.zip` na raiz do projeto (inclui o `.htaccess`).

Para pré-visualizar localmente (replica as regras do `.htaccess`):

```powershell
npm run preview   # http://localhost:4000
```

## 2. Enviar para a Hostinger

1. Acesse o **hPanel** → **Gerenciador de Arquivos** → entre em **`public_html`**.
2. Apague o conteúdo padrão (ex.: `default.php`).
3. Envie **`frutiferas-site.zip`** e clique em **Extrair**.
4. Confirme que o **`.htaccess`** foi extraído (ative "mostrar arquivos ocultos" se necessário).

## 3. Domínio e SSL

1. **Domínios**: `frutiferasorganicas.com.br` apontando para a hospedagem.
2. **SSL**: ative o certificado grátis (Let's Encrypt) e force **HTTPS**.

## 4. Conferência

- Home: `https://frutiferasorganicas.com.br/`
- Catálogo: `/frutiferas`
- Fruta: `/frutiferas/jabuticaba`
- Guia: `/guias/adubacao`
- SEO: `/sitemap.xml` e `/robots.txt`
- 404: qualquer URL inexistente deve mostrar a página 404 personalizada

## 5. Atualizar o site depois

```powershell
git pull
npm run build
npm run package
# enviar novamente o frutiferas-site.zip para public_html e extrair (substituir)
```

## Observações

- **`NEXT_PUBLIC_*`** (domínio, AdSense, Ezoic) são gravados no build. Após alterar, rode `npm run build && npm run package`.
- Para ativar anúncios: preencha `NEXT_PUBLIC_ADSENSE_CLIENT`/`_SLOT` **ou** `NEXT_PUBLIC_EZOIC=1` no `.env.local` e reconstrua.
