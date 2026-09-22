# -*- coding: utf-8 -*-
"""Avalia cobertura de videos locais (cold storage) para as frutiferas com capa ruim."""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import config  # noqa: E402

ALVOS = [
    "abacaxi", "acerola-okinawa", "amora-portuguesa", "araca-amarelo", "araca-roxo",
    "atemoia", "bacupari-de-bico", "banana-ouro", "cacau", "caja-manga-anao",
    "cambuca-jabuticaba-amarela", "cambuci", "cambui-roxo", "camu-camu", "carambola-mel",
    "cherimoya", "goiaba-amarela", "graviola", "jabuticaba-sabara", "jambo-rosa",
    "laranja-serra-dagua", "lichia", "limao-cravo-caipira", "limao-galeguinho",
    "limao-imperial", "limao-doce-tanjo", "maca-eva", "mamao", "manga-palmer",
    "manga-uba", "mangostao-fruta-da-rainha", "maracuja-gigante", "melancia",
    "melao-andino", "morango", "nectarina", "pessego-anao", "pinha",
    "pinha-dos-astecas", "pitanga-do-cerrado", "pitaya-branca", "rambuta", "roma",
    "saborosa-pytaya-do-serrado", "seriguela", "uva-brs-vitoria", "uva-isabel", "uvaia",
]


def carregar_ts(caminho):
    txt = open(caminho, encoding="utf-8").read()
    ini = txt.index("[] = [") + len("[] = ")
    fim = txt.index("\n\nexport const", ini)
    return json.loads(txt[ini:fim].rstrip())


extras = {f["slug"]: f for f in carregar_ts(os.path.join(config.SITE_DIR, "src", "data", "frutiferas-extras.ts"))}

cs = config.COLDSTORAGE_DIR
com_local = 0
sem_local = 0
sem_video = 0
for slug in ALVOS:
    fruta = extras.get(slug)
    if not fruta:
        print(f"[sem fruta] {slug}")
        sem_video += 1
        continue
    vids = fruta.get("videos") or []
    colheitas = [v for v in vids if v.get("tipo") == "colheita"] or vids
    locais = [v["id"] for v in colheitas if os.path.exists(os.path.join(cs, f"{v['id']}.mp4"))]
    if locais:
        com_local += 1
        print(f"[local] {slug}: {locais[:3]}")
    elif colheitas:
        sem_local += 1
        print(f"[online] {slug}: {[v['id'] for v in colheitas[:3]]} (tipo {colheitas[0].get('tipo')})")
    else:
        sem_video += 1
        print(f"[vazio] {slug}")

print(f"\ncom local: {com_local} | so online: {sem_local} | sem video: {sem_video} | total {len(ALVOS)}")
