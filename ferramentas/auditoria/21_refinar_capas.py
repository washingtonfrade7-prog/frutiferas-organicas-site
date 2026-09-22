# -*- coding: utf-8 -*-
"""Terceira passada: escolhe a melhor foto por pontuacao e filtra ruins."""
import json
import os
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import config  # noqa: E402
from _wiki_util import baixar, commons_fotos, otimizar  # noqa: E402

PUBLIC_FRUTAS = os.path.join(config.SITE_DIR, "public", "frutiferas")
CREDITOS = os.path.join(config.OUT_DIR, "creditos_imagens.json")

FIXES = {
    "banana-ouro": ["banana fruit bunch", "Musa paradisiaca fruit"],
    "araca-amarelo": ["Psidium cattleianum lucidum", "yellow strawberry guava fruit"],
    "cambuca-jabuticaba-amarela": ["Plinia edulis fruit", "cambucá fruta"],
    "cambuci": ["Campomanesia phaea fruit", "cambuci fruto"],
    "camu-camu": ["Myrciaria dubia fruit", "camu camu fruit"],
    "mangostao-fruta-da-rainha": ["mangosteen fruit", "Garcinia mangostana fruit"],
    "nectarina": ["nectarine fruit", "Nectarine fruit red"],
}

RUINS = [
    "illustration", "drawing", "botanical", "herbarium", "codex", "engraving",
    "lithograph", "plate", "painting", "diagram", "chart", "map", "logo", "flag",
    "tomato", "cracked", "field", "plantation", "farm", "foliage", "leaf only",
    "butterfly", "poppyseed", "ants", "dessert", "cake", "muffin", "juice", "stamp",
]
BONS = ["fruit", "fruto", "fruta", "fruits", "berries", "pod", "pods"]


def pontuar(url):
    nome = url.lower()
    if any(r in nome for r in RUINS):
        return -1
    s = sum(2 for b in BONS if b in nome)
    return s


def escolher(termos):
    melhor, melhor_termo, melhor_pts = None, None, -1
    for termo in termos:
        try:
            fotos = commons_fotos(termo, 25)
        except Exception:
            fotos = []
        for url in fotos:
            p = pontuar(url)
            if p > melhor_pts:
                melhor, melhor_termo, melhor_pts = url, termo, p
        if melhor_pts >= 2:
            break
        time.sleep(0.2)
    return melhor, melhor_termo


def main():
    creditos = json.load(open(CREDITOS, encoding="utf-8")) if os.path.exists(CREDITOS) else {}
    ok, falhas = 0, []
    for slug, termos in FIXES.items():
        url, termo = escolher(termos)
        if not url:
            print(f"[sem foto] {slug}")
            falhas.append(slug)
            continue
        raw = os.path.join(config.OUT_DIR, "_wiki", f"{slug}_v3.jpg")
        try:
            baixar(url, raw)
            otimizar(raw, os.path.join(PUBLIC_FRUTAS, f"{slug}.jpg"))
            creditos[slug] = {"termo": termo, "fonte": url}
            ok += 1
            print(f"[ok] {slug} <- {url.split('/')[-1][:70]}")
        except Exception as e:
            print(f"[erro] {slug}: {e}")
            falhas.append(slug)
    json.dump(creditos, open(CREDITOS, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print(f"\nok: {ok} | falhas: {len(falhas)} -> {falhas}")


if __name__ == "__main__":
    main()
