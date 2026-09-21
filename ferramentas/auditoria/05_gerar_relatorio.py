# -*- coding: utf-8 -*-
"""05 - Gera o relatorio markdown da auditoria.

Uso:
    python 05_gerar_relatorio.py

Entrada: auditoria/canal_bruto.json, frutas.json, videos.json
Saida:   auditoria/relatorio_auditoria.md
"""
import json
import os
import sys
from collections import Counter

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import config  # noqa: E402


def carregar(caminho, padrao):
    if os.path.exists(caminho):
        with open(caminho, encoding="utf-8") as f:
            return json.load(f)
    return padrao


def mmss(seg):
    seg = int(seg or 0)
    return f"{seg // 60}:{seg % 60:02d}"


def main():
    bruto = carregar(config.CANAL_BRUTO, {})
    frutas = carregar(config.FRUTAS_JSON, [])
    videos = carregar(config.VIDEOS_JSON, [])
    transcricoes = carregar(config.TRANSCRICOES, {})

    canal = bruto.get("channel", {})
    playlists = bruto.get("playlists", [])

    tipos = Counter(v["tipo"] for v in videos)
    com_transcricao = sum(1 for v in videos if v["temTranscricao"])
    curtos = sum(1 for v in videos if v["curto"])
    horas = sum(v["duracaoSeg"] for v in videos) / 3600

    linhas = [
        "# Auditoria do Canal - Frutiferas Organicas",
        "",
        "## Canal",
        "",
        f"- Nome: **{canal.get('title', 'N/D')}**",
        f"- Custom URL: {canal.get('customUrl', 'N/D')}",
        f"- ID: `{canal.get('id', 'N/D')}`",
        f"- Inscritos: **{canal.get('subscribers', 0):,}**".replace(",", "."),
        f"- Videos no canal: **{canal.get('videoCount', 0):,}**".replace(",", "."),
        f"- Views totais: **{canal.get('viewCount', 0):,}**".replace(",", "."),
        f"- Playlists: **{len(playlists)}**",
        "",
        "## Acervo auditado",
        "",
        f"- Videos analisados: **{len(videos)}**",
        f"- Horas de conteudo: **{horas:.1f} h**",
        f"- Videos curtos (<60s): **{curtos}**",
        f"- Videos com transcricao local: **{com_transcricao}** de {len(transcricoes)} arquivos .vtt",
        "",
        "### Distribuicao por tipo",
        "",
        "| Tipo | Videos |",
        "|---|---|",
    ]
    for tipo, qtd in tipos.most_common():
        linhas.append(f"| {tipo} | {qtd} |")

    linhas += ["", "## Frutiferas com conteudo", "", "| Frutifera | Videos | Colheita | Nome cientifico |", "|---|---|---|---|"]
    for f in frutas:
        linhas.append(f"| {f['nome']} | {f['totalVideos']} | {f['videosColheita']} | *{f['nomeCientifico']}* |")

    linhas += ["", "## Detalhe por frutifera", ""]
    for f in frutas:
        linhas.append(f"### {f['nome']} ({f['totalVideos']} videos)")
        linhas.append("")
        if f.get("hero"):
            linhas.append(f"- Hero sugerido: `{f['hero']['id']}` - {f['hero']['titulo']}")
        if f["keywords"]:
            linhas.append(f"- Keywords: {', '.join(f['keywords'][:10])}")
        linhas.append("")
        for v in f["videos"][:20]:
            linhas.append(
                f"- `{v['id']}` | {v['tipo']} | {mmss(v['duracaoSeg'])} | {v['titulo']}"
            )
        linhas.append("")

    with open(config.RELATORIO_MD, "w", encoding="utf-8") as fh:
        fh.write("\n".join(linhas))
    print(f"[05] relatorio salvo: {config.RELATORIO_MD}", flush=True)


if __name__ == "__main__":
    main()
