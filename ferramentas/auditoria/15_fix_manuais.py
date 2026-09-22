# -*- coding: utf-8 -*-
"""Corrige capas problematicas:
- frutiferas cujo frame de video mostra pessoa/objeto -> usa o CARD (_001), que traz
  o nome popular e a imagem correta da especie;
- frutiferas extras (sem frame) -> escolhe a thumbnail mais "limpa" entre os videos.
"""
import json
import os
import re
import shutil
import sys
import urllib.request

import cv2
import numpy as np
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import config  # noqa: E402

DATASET = os.path.join(config.AUTOMACAO_DIR, "dataset_frutas", "imagens")
PUBLIC_FRUTAS = os.path.join(config.SITE_DIR, "public", "frutiferas")
TMP = os.path.join(config.OUT_DIR, "_capas_fix")
UA = {"User-Agent": "Mozilla/5.0 (compatible; FrutiferasAuditoria/1.0)"}
QUALIDADES = ["maxresdefault", "sddefault", "hqdefault"]

# slug do site -> slug do frame (usa o card _001)
CARDS = {
    "manga-uba": "Manga_Uba",
    "pinha-dos-astecas": "Pinha_dos_Astecas",
    "rambuta": "Rambuta",
    "uva-isabel": "Uva_Isabel",
    "uvaia": "Uvaia",
    "roma": "Roma",
}

# extras sem frame: reescolhe a thumbnail mais limpa
EXTRAS = ["lichia", "caju", "melancia", "sapoti", "morango"]

# forca um video especifico quando o automatico escolhe mal
FORCAR = {
    "caju": "j6GzuWloriA",      # caju anao florindo (nao ha video de fruto)
    "melancia": "7jUiuCPx820",  # muda melancia 60 dias
}


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


def nitidez(caminho):
    img = cv2.imdecode(np.fromfile(caminho, dtype=np.uint8), cv2.IMREAD_GRAYSCALE)
    return float(cv2.Laplacian(img, cv2.CV_64F).var()) if img is not None else 0.0


def flat(caminho):
    img = cv2.imdecode(np.fromfile(caminho, dtype=np.uint8), cv2.IMREAD_COLOR)
    if img is None:
        return 1.0
    small = cv2.resize(img, (80, 45), interpolation=cv2.INTER_AREA)
    q = (small // 24).astype(np.int32)
    v = q[:, :, 0] * 10000 + q[:, :, 1] * 100 + q[:, :, 2]
    _, counts = np.unique(v, return_counts=True)
    return float(counts.max() / v.size)


def carregar_extras_ts():
    txt = open(os.path.join(config.SITE_DIR, "src", "data", "frutiferas-extras.ts"), encoding="utf-8").read()
    ini = txt.index("[] = [") + len("[] = ")
    fim = txt.index("\n\nexport const", ini)
    return json.loads(txt[ini:fim].rstrip())


def baixar(video_id, dest):
    for q in QUALIDADES:
        try:
            req = urllib.request.Request(f"https://i.ytimg.com/vi/{video_id}/{q}.jpg", headers=UA)
            with urllib.request.urlopen(req, timeout=30) as r:
                data = r.read()
            if len(data) < 3000:
                continue
            with open(dest, "wb") as f:
                f.write(data)
            return True
        except Exception:
            continue
    return False


def main():
    os.makedirs(TMP, exist_ok=True)

    # 1) cards
    for slug, frame in CARDS.items():
        p = os.path.join(DATASET, f"{frame}_001.jpg")
        if os.path.exists(p):
            otimizar(p, os.path.join(PUBLIC_FRUTAS, f"{slug}.jpg"))
            print(f"[card] {slug}")
        else:
            print(f"[card] sem card para {slug}")

    # 2) extras
    frutas = {f["slug"]: f for f in carregar_extras_ts()}
    for slug in EXTRAS:
        fruta = frutas.get(slug)
        if not fruta:
            print(f"[extra] {slug} nao encontrado")
            continue
        melhor = None
        melhor_score = None
        candidatos = fruta.get("videos") or []
        if slug in FORCAR:
            candidatos = [v for v in candidatos if v["id"] == FORCAR[slug]] or candidatos[:1]
        for v in candidatos[:6]:
            raw = os.path.join(TMP, f"{slug}_{v['id']}.jpg")
            if not baixar(v["id"], raw):
                continue
            norm = os.path.join(TMP, f"{slug}_{v['id']}_n.jpg")
            try:
                otimizar(raw, norm)
            except Exception:
                continue
            f_ = flat(norm)
            nit = nitidez(norm)
            # quer thumbnail sem painel de texto e nítida
            score = (f_ <= 0.30, nit)
            if melhor_score is None or score > melhor_score:
                melhor_score = score
                melhor = norm
        if melhor:
            shutil.copy(melhor, os.path.join(PUBLIC_FRUTAS, f"{slug}.jpg"))
            print(f"[extra] {slug} <- {os.path.basename(melhor)}")
        else:
            print(f"[extra] {slug} sem thumbnail")


if __name__ == "__main__":
    main()
