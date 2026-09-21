# -*- coding: utf-8 -*-
"""08 - Revisao de completude da auditoria do canal.

Uso:
    python 08_revisao.py

Le auditoria/canal_bruto.json, frutas.json, videos.json, transcricoes.json
e imprime um diagnostico de cobertura e lacunas.
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


def pct(a, b):
    return f"{(100.0 * a / b):.1f}%" if b else "0%"


def main():
    bruto = carregar(config.CANAL_BRUTO, {})
    frutas = carregar(config.FRUTAS_JSON, [])
    videos = carregar(config.VIDEOS_JSON, [])
    transcricoes = carregar(config.TRANSCRICOES, {})

    raw = bruto.get("videos", [])
    canal = bruto.get("channel", {})
    playlists = bruto.get("playlists", [])

    n = len(raw)
    com_desc = sum(1 for v in raw if (v.get("description") or "").strip())
    com_tags = sum(1 for v in raw if v.get("tags"))
    com_thumb = sum(1 for v in raw if v.get("thumbnails"))
    com_maxres = sum(1 for v in raw if (v.get("thumbnails") or {}).get("maxres"))
    curtos = sum(1 for v in raw if v.get("_fallback") is False and False)

    print("=" * 64)
    print("REVISAO DE COMPLETUDE DA AUDITORIA")
    print("=" * 64)
    print(f"Canal..............: {canal.get('title')} ({canal.get('customUrl')})")
    print(f"Inscritos..........: {canal.get('subscribers')}")
    print(f"videoCount (API)...: {canal.get('videoCount')}")
    print(f"Videos coletados...: {n}")
    print("-" * 64)
    print(f"Com descricao......: {com_desc} ({pct(com_desc, n)})")
    print(f"Com tags...........: {com_tags} ({pct(com_tags, n)})")
    print(f"Com thumbnails.....: {com_thumb} ({pct(com_thumb, n)})")
    print(f"Com maxres.........: {com_maxres} ({pct(com_maxres, n)})")
    print(f"Fallback (yt-dlp)..: {sum(1 for v in raw if v.get('_fallback'))}")
    print("-" * 64)
    print(f"Transcricoes locais: {len(transcricoes)} ({pct(len(transcricoes), n)} dos videos)")
    print(f"Playlists..........: {len(playlists)}")
    print("-" * 64)

    tipos = Counter(v.get("tipo") for v in videos)
    print("Tipos:", dict(tipos))
    sem_fruta = [v for v in videos if not v.get("frutas")]
    print(f"Videos com fruta...: {len(videos) - len(sem_fruta)} ({pct(len(videos) - len(sem_fruta), len(videos))})")
    print(f"Videos sem fruta...: {len(sem_fruta)}")
    print("-" * 64)

    print(f"Frutiferas no catalogo: {len(frutas)}")
    magras = [f for f in frutas if f.get("totalVideos", 0) < 4]
    print(f"Frutiferas com <4 videos: {len(magras)}")
    for f in magras:
        print(f"   - {f['nome']} ({f['totalVideos']})")

    # Lacunas
    print("=" * 64)
    print("LACUNAS IDENTIFICADAS")
    print("-" * 64)
    print("[ ] Mapeamento playlist -> videos (apenas contagem foi salva)")
    print("[ ] Transcricoes para os videos sem .vtt local")
    print("[ ] Frutiferas com <4 videos nao entraram no site")
    print("[ ] Alguns videos longos sao compilacoes/tours (nao ligados a fruta)")


if __name__ == "__main__":
    main()
