# -*- coding: utf-8 -*-
"""Gera os PDFs do produto a partir dos markdowns:
   - CURSO-EBOOK.md  -> Frutiferas-em-Vaso-ebook.pdf
   - CURSO-BONUS.md  -> Frutiferas-em-Vaso-bonus.pdf  (checklist + fichas)

Converte markdown -> HTML (com CSS de impressao) e usa o Microsoft Edge em
modo headless para imprimir em PDF.
"""
import json
import os
import subprocess
import sys

import markdown

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "auditoria"))
import config  # noqa: E402

EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
OUT_DIR = os.path.join(config.SITE_DIR, "ferramentas", "curso", "out")
os.makedirs(OUT_DIR, exist_ok=True)

CSS = """
@page { size: A4; margin: 20mm 18mm; }
* { box-sizing: border-box; }
body { font-family: Georgia, 'Times New Roman', serif; color: #222; line-height: 1.6; font-size: 12pt; }
h1 { font-size: 26pt; line-height: 1.15; margin: 0 0 10px; color: #1f3d2b; }
h2 { font-size: 18pt; margin: 28px 0 10px; color: #1f3d2b; page-break-before: always; border-bottom: 2px solid #d9a62e; padding-bottom: 6px; }
h3 { font-size: 14pt; margin: 20px 0 8px; color: #2e5b3a; }
p { margin: 0 0 10px; }
ul, ol { margin: 0 0 12px; padding-left: 22px; }
li { margin-bottom: 4px; }
hr { border: none; border-top: 1px solid #ddd; margin: 22px 0; }
strong { color: #111; }
em { color: #444; }
blockquote { border-left: 4px solid #d9a62e; margin: 12px 0; padding: 4px 14px; color: #555; }
table { border-collapse: collapse; width: 100%; margin: 12px 0; font-size: 11pt; }
th, td { border: 1px solid #ddd; padding: 6px 8px; text-align: left; }
th { background: #f3f3ee; }
.cover { height: 250mm; display: flex; flex-direction: column; justify-content: center; text-align: center; page-break-after: always; }
.cover .tag { letter-spacing: 3px; text-transform: uppercase; font-size: 10pt; color: #8f4c25; margin-bottom: 18px; }
.cover h1 { font-size: 34pt; margin-bottom: 16px; }
.cover .sub { font-size: 13pt; color: #555; }
.cover .by { margin-top: 40px; font-size: 12pt; color: #333; }
"""

COVER = """
<div class="cover">
  <div class="tag">Frutíferas Orgânicas</div>
  <h1>{titulo}</h1>
  <div class="sub">{subtitulo}</div>
  <div class="by">por Washington Frade<br/>canal Frutíferas Orgânicas</div>
</div>
"""


def md_para_pdf(md_path, pdf_nome, titulo, subtitulo):
    texto = open(md_path, encoding="utf-8").read()
    corpo = markdown.markdown(texto, extensions=["extra", "sane_lists", "toc"])
    html = (
        "<!DOCTYPE html><html lang='pt-BR'><head><meta charset='utf-8'>"
        f"<title>{titulo}</title><style>{CSS}</style></head><body>"
        + COVER.format(titulo=titulo, subtitulo=subtitulo)
        + corpo
        + "</body></html>"
    )
    html_path = os.path.join(OUT_DIR, pdf_nome.replace(".pdf", ".html"))
    open(html_path, "w", encoding="utf-8").write(html)

    pdf_path = os.path.join(OUT_DIR, pdf_nome)
    if os.path.exists(pdf_path):
        os.remove(pdf_path)
    subprocess.run(
        [EDGE, "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
         f"--print-to-pdf={pdf_path}", "file:///" + html_path.replace("\\", "/")],
        capture_output=True, timeout=180,
    )
    ok = os.path.exists(pdf_path)
    print(f"[{'ok' if ok else 'falhou'}] {pdf_nome} -> {pdf_path if ok else html_path}")
    return ok


def carregar_extras():
    txt = open(os.path.join(config.SITE_DIR, "src", "data", "frutiferas-extras.ts"), encoding="utf-8").read()
    ini = txt.index("[] = [") + len("[] = ")
    fim = txt.index("\n\nexport const", ini)
    return {f["slug"]: f for f in json.loads(txt[ini:fim].rstrip())}


SELECAO = [
    "abacaxi", "acerola-okinawa", "pitanga-do-cerrado", "manga-palmer",
    "limao-cravo-caipira", "lichia", "atemoia", "graviola",
    "seriguela", "melancia", "morango", "carambola-mel",
]


def gerar_bonus():
    extras = carregar_extras()
    linhas = [
        "# Bônus: Checklist e Fichas de Cultivo",
        "",
        "Material de apoio do e-book **Frutíferas em Vaso: do plantio à colheita**.",
        "",
        "---",
        "",
        "## Checklist de rega e adubação",
        "",
        "### Rega (teste do dedo)",
        "",
        "- [ ] Enfiar o dedo 2 cm no substrato antes de regar",
        "- [ ] Só regar se estiver seco",
        "- [ ] Regar pela manhã, na base (nunca nas folhas)",
        "- [ ] Esvaziar o pratinho depois da rega",
        "- [ ] Reduzir a frequência em dias frios e aumentar em dias quentes",
        "",
        "### Adubação (por fase)",
        "",
        "| Fase | Produto | Frequência |",
        "|---|---|---|",
        "| Plantio | Húmus de minhoca misturado ao substrato | 1 vez |",
        "| Crescimento | Bokashi na borda do vaso | A cada 30-45 dias |",
        "| Floração | Organomineral com mais fósforo/potássio | A cada 30 dias |",
        "| Frutificação | Adubo líquido diluído na rega | A cada 15-20 dias |",
        "| Repouso (frio/pós-colheita) | Suspender ou reduzir | - |",
        "",
        "### Inspeção semanal de pragas",
        "",
        "- [ ] Olhar o verso das folhas",
        "- [ ] Checar as pontas novas (pulgão)",
        "- [ ] Verificar o caule (cochonilha)",
        "- [ ] Observar se há formigas subindo no vaso",
        "",
        "---",
        "",
        "## Fichas rápidas de cultivo",
        "",
    ]
    for slug in SELECAO:
        f = extras.get(slug)
        if not f:
            continue
        linhas += [
            f"### {f['nome']}",
            f"*{f.get('nomeCientifico', '')}*",
            "",
            f"- **Luz:** {f.get('luz', '-')}",
            f"- **Rega:** {f.get('rega', '-')}",
            f"- **Solo:** {f.get('solo', '-')}",
            f"- **Vaso:** {f.get('vaso', '-')}",
            f"- **Dificuldade:** {f.get('dificuldade', '-')}",
            f"- **Tempo até produzir:** {f.get('tempoProducao', '-')}",
            f"- **Frutificação:** {f.get('frutificacao', '-')}",
            "",
        ]
    caminho = os.path.join(config.SITE_DIR, "CURSO-BONUS.md")
    open(caminho, "w", encoding="utf-8").write("\n".join(linhas))
    print(f"bonus gerado: {caminho}")


def main():
    gerar_bonus()
    md_para_pdf(
        os.path.join(config.SITE_DIR, "CURSO-EBOOK.md"),
        "Frutiferas-em-Vaso-ebook.pdf",
        "Frutíferas em Vaso",
        "do plantio à colheita",
    )
    md_para_pdf(
        os.path.join(config.SITE_DIR, "CURSO-BONUS.md"),
        "Frutiferas-em-Vaso-bonus.pdf",
        "Bônus do Aluno",
        "checklist de rega e adubação + fichas de cultivo",
    )


if __name__ == "__main__":
    main()
