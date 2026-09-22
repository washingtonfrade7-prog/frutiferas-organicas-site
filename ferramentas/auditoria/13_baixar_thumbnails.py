# -*- coding: utf-8 -*-
"""13 - Baixa a thumbnail (YouTube) do melhor video de cada frutifera.

Usa o video de destaque de cada frutifera (ja associado na auditoria) e baixa a
thumbnail em alta resolucao (maxres -> sd -> hq), otimizando para a capa do site.

Uso:
    python 13_baixar_thumbnails.py

Saida: public/frutiferas/<slug>.jpg (sobrescreve a capa)
"""
import json
import os
import re
import sys
import urllib.request

from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import config  # noqa: E402

PUBLIC_FRUTAS = os.path.join(config.SITE_DIR, "public", "frutiferas")
TMP = os.path.join(config.OUT_DIR, "_thumbs")
UA = {"User-Agent": "Mozilla/5.0 (compatible; FrutiferasAuditoria/1.0)"}
QUALIDADES = ["maxresdefault", "sddefault", "hqdefault"]


def carregar_extras():
    caminho = os.path.join(config.SITE_DIR, "src", "data", "frutiferas-extras.ts")
    txt = open(caminho, encoding="utf-8").read()
    inicio = txt.index("[] = [") + len("[] = ")
    fim = txt.index("\n\nexport const", inicio)
    return json.loads(txt[inicio:fim].rstrip())


def baixar(video_id, dest):
    for q in QUALIDADES:
        url = f"https://i.ytimg.com/vi/{video_id}/{q}.jpg"
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=30) as r:
                data = r.read()
            if len(data) < 3000:
                continue
            with open(dest, "wb") as f:
                f.write(data)
            return q
        except Exception:
            continue
    return None


def otimizar(src, dest, w=800, h=450):
    im = Image.open(src).convert("RGB")
    iw, ih = im.size
    alvo = w / h
    if iw / ih > alvo:
        nw = int(ih * alvo)
        x = (iw - nw) // 2
        im = im.crop((x, 0, x + nw, ih))
    else:
        nh = int(iw / alvo)
        y = (ih - nh) // 2
        im = im.crop((0, y, iw, y + nh))
    im = im.resize((w, h), Image.LANCZOS)
    im.save(dest, "JPEG", quality=84, optimize=True, progressive=True)


def main():
    os.makedirs(TMP, exist_ok=True)
    frutas = carregar_extras()
    print(f"[13] frutiferas: {len(frutas)}", flush=True)

    ok = 0
    sem_video = 0
    falhou = 0
    for i, f in enumerate(frutas, 1):
        slug = f["slug"]
        videos = f.get("videos") or []
        if not videos:
            sem_video += 1
            continue
        video_id = videos[0]["id"]
        raw = os.path.join(TMP, f"{slug}.jpg")
        q = baixar(video_id, raw)
        if not q:
            falhou += 1
            continue
        try:
            otimizar(raw, os.path.join(PUBLIC_FRUTAS, f"{slug}.jpg"))
            ok += 1
        except Exception as e:
            print(f"[13] erro ao otimizar {slug}: {e}", flush=True)
            falhou += 1
        if i % 10 == 0:
            print(f"[13] {i}/{len(frutas)} (ok={ok})", flush=True)

    print(f"[13] thumbnails aplicadas: {ok} | sem video: {sem_video} | falhas: {falhou}")


if __name__ == "__main__":
    main()
