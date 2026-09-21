# Auditoria do canal

Scripts reutilizáveis que varrem o canal **@FrutíferasOrgânicas** via YouTube Data API,
leem as transcrições locais e geram um catálogo normalizado de frutíferas.

## Requisitos

- Python do projeto de automação (`.venv`) com `google-api-python-client` e `Pillow`.
- `token.pickle` e `client_secret.json` no projeto de automação.
- Acervo local de vídeos/transcrições em `D:\Frutiferas_ColdStorage`.

Os caminhos podem ser ajustados por variáveis de ambiente:

```
FRUTIFERAS_AUTOMACAO_DIR   (padrão: C:\Users\Micro\Downloads\Projeto automação youtube)
FRUTIFERAS_COLDSTORAGE_DIR (padrão: D:\Frutiferas_ColdStorage)
```

## Uso

```powershell
# Roda a auditoria completa (recomendado)
& "C:\Users\Micro\Downloads\Projeto automação youtube\.venv\Scripts\python.exe" -X utf8 sincronizar.py
```

Ou etapa por etapa:

```powershell
python 01_coletar_canal.py    # canal, playlists e todos os vídeos
python 02_ler_transcricoes.py # transcrições .vtt locais
python 04_normalizar.py       # taxonomia + tipos + keywords
python 05_gerar_relatorio.py  # relatório markdown
```

## Saídas (`/auditoria`)

| Arquivo | Conteúdo |
|---|---|
| `canal_bruto.json` | dados brutos do canal, playlists e vídeos (não versionado) |
| `transcricoes.json` | texto das legendas locais (não versionado) |
| `frutas.json` | catálogo normalizado por frutífera (vídeos, hero, galeria, keywords) |
| `videos.json` | lista plana de vídeos com tipo e frutas associadas |
| `keywords.json` | palavras-chave por frutífera |
| `relatorio_auditoria.md` | relatório legível |

## Regras de associação

- A fruta é associada **pelo título** do vídeo (tags do canal são genéricas e a descrição
  contém um bloco fixo de links, o que geraria falsos positivos).
- A classificação de tipo (colheita, poda, plantio, adubação, cuidados, floração,
  gastronomia, tour) usa o título.
- As keywords usam título + tags + descrição (sem URLs) + transcrição.

## Atualizar o site

Depois de rodar a auditoria, use `auditoria/frutas.json` para atualizar o catálogo do site
(`src/data/frutiferas.ts`) e os assets (`public/frutiferas/`).
