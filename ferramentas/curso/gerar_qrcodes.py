# -*- coding: utf-8 -*-
"""Gera os QR codes usados no e-book (pontes multimidia).

Rode com o Python do sistema (tem o segno instalado):
    py ferramentas/curso/gerar_qrcodes.py

Saida: ferramentas/curso/qrcodes/*.png  +  qrcodes.json (manifesto)
"""
import json
import os

import segno

CURSO_DIR = os.path.dirname(os.path.abspath(__file__))
OUT_DIR = os.path.join(CURSO_DIR, "qrcodes")
os.makedirs(OUT_DIR, exist_ok=True)

SITE = "https://frutiferasorganicas.com.br"
CANAL = "https://www.youtube.com/@Frut%C3%ADferasOrg%C3%A2nicas"

ALVOS = {
    "site": (SITE, "Site Frutíferas Orgânicas"),
    "canal": (CANAL, "Canal no YouTube"),
    "guia-plantio": (f"{SITE}/guias/plantio", "Guia: como plantar em vaso"),
    "guia-adubacao": (f"{SITE}/guias/adubacao", "Guia: adubação orgânica"),
    "guia-poda": (f"{SITE}/guias/poda", "Guia: poda de frutíferas"),
    "guia-colheita": (f"{SITE}/guias/colheita", "Guia: colheita no ponto"),
    "guia-cuidados": (f"{SITE}/guias/cuidados", "Guia: regas e cuidados"),
    "guia-floracao": (f"{SITE}/guias/floracao", "Guia: floração e polinização"),
    "guia-problemas": (f"{SITE}/guias/problemas", "Guia: problemas comuns"),
    "guia-especies": (f"{SITE}/guias/especies", "Guia: escolher a frutífera"),
    "guia-gastronomia": (f"{SITE}/guias/gastronomia", "Guia: gastronomia com frutas"),
    "catalogo-interativo": (
        f"{SITE}/frutiferas",
        "Catálogo interativo (filtre por situação)",
    ),
    "video-poda-jabuticaba": (
        "https://www.youtube.com/watch?v=cQAsGpzPlk0",
        "Vídeo: como podar jabuticaba",
    ),
    "video-plantio-abiu": (
        "https://www.youtube.com/watch?v=doAr8IvIzuk",
        "Vídeo: plantio de abiu amarelo",
    ),
    "oferta-bump": (f"{SITE}/curso", "Adubação Orgânica Descomplicada"),
    "oferta-upsell": (f"{SITE}/curso", "Multiplicação de Mudas na Prática"),
}

COR = "#1f3d2b"

manifesto = {}
for chave, (url, rotulo) in ALVOS.items():
    caminho = os.path.join(OUT_DIR, f"{chave}.png")
    segno.make(url, error="m").save(caminho, scale=8, border=2, dark=COR, light="white")
    manifesto[chave] = {"url": url, "rotulo": rotulo, "arquivo": f"qrcodes/{chave}.png"}
    print(f"[ok] {chave:24s} -> {url}")

with open(os.path.join(CURSO_DIR, "qrcodes.json"), "w", encoding="utf-8") as fh:
    json.dump(manifesto, fh, ensure_ascii=False, indent=2)
print(f"\n{len(manifesto)} QR codes em {OUT_DIR}")
