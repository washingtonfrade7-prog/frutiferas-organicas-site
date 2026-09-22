# -*- coding: utf-8 -*-
"""Gera o card informativo (galeria -2) para as frutiferas manuais."""
import os
import sys

from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import config  # noqa: E402

DATASET = os.path.join(config.AUTOMACAO_DIR, "dataset_frutas", "imagens")
PUBLIC_FRUTAS = os.path.join(config.SITE_DIR, "public", "frutiferas")

# site_slug -> slug do frame no dataset (usa o card _001)
MAPA = {
    "jabuticaba": "Jabuticaba_hibrida",
    "araca-vermelho": "Araca_Vermelho",
    "pitanga-preta": "Pitanga_Preta",
    "araca-boi": "Araca_Boi",
    "bacupari-mirim": "Bacupari_Mirim",
    "bacupari-estalo": "Bacupari_Bico",
    "abiu-amarelo": "Abil",
    "gabiroba": "Guabiroba_Cerrado",
    "cereja-rio-grande": "Cereja_Rio_Grande",
    "grumixama-amarela": "Grumixama_Amarela",
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


for slug, frame in MAPA.items():
    p = os.path.join(DATASET, f"{frame}_001.jpg")
    if os.path.exists(p):
        otimizar(p, os.path.join(PUBLIC_FRUTAS, f"{slug}-2.jpg"))
        print(f"galeria {slug}-2.jpg <- {frame}_001.jpg")
    else:
        print(f"sem card para {slug} ({frame})")
