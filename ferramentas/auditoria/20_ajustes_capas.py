# -*- coding: utf-8 -*-
"""Segunda passada: refina capas com termos melhores e filtro de nomes ruins."""
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
    "limao-doce-tanjo": ["Citrus limettioides", "limão doce"],
    "saborosa-pytaya-do-serrado": ["Selenicereus megalanthus", "yellow pitaya fruit"],
    "mamao": ["Carica papaya fruit tree", "papaya fruit"],
    "cambuca-jabuticaba-amarela": ["Plinia edulis", "Marlierea edulis"],
    "cambuci": ["Campomanesia phaea", "cambuci fruta"],
    "nectarina": ["Nectarine fruit", "nectarine"],
}

RUINS = [
    "butterfly", "poppyseed", "ants", "ant ", "map", "illustration", "drawing",
    "diagram", "chart", "logo", "flag", "fountain", "street", "city", "coat of arms",
    "dessert", "cake", "muffin", "juice", "jam", "seed", "leaf only", "herbarium",
    "stamp", "coin", "painting", "portrait",
]


def escolher(termos):
    for termo in termos:
        try:
            for url in commons_fotos(termo, 20):
                nome = url.lower()
                if any(r in nome for r in RUINS):
                    continue
                return url, termo
        except Exception:
            pass
        time.sleep(0.2)
    return None, None


def main():
    creditos = json.load(open(CREDITOS, encoding="utf-8")) if os.path.exists(CREDITOS) else {}
    ok, falhas = 0, []
    for slug, termos in FIXES.items():
        url, termo = escolher(termos)
        if not url:
            print(f"[sem foto] {slug}")
            falhas.append(slug)
            continue
        raw = os.path.join(config.OUT_DIR, "_wiki", f"{slug}_v2.jpg")
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
