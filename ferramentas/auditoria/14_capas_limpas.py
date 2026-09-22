# -*- coding: utf-8 -*-
"""14 - Escolhe a melhor capa "limpa" para cada frutifera.

Para cada frutifera, testa as thumbnails dos videos (colheita primeiro) e escolhe
a primeira SEM texto sobreposto e com boa nitidez. Se nenhuma servir, usa o frame
real do video (dataset_frutas).

Uso:
    python 14_capas_limpas.py

Saida: public/frutiferas/<slug>.jpg
"""
import ast
import json
import os
import re
import shutil
import subprocess
import sys
import unicodedata
import urllib.request

import cv2
import numpy as np
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import config  # noqa: E402

SCRIPT_100 = os.path.join(config.AUTOMACAO_DIR, "_colab_ml", "Extrair_Frames_100_Frutas.py")
DATASET = os.path.join(config.AUTOMACAO_DIR, "dataset_frutas", "imagens")
PUBLIC_FRUTAS = os.path.join(config.SITE_DIR, "public", "frutiferas")
TMP = os.path.join(config.OUT_DIR, "_capas")
TESSERACT = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
TESSDATA = r"C:\Users\Micro\AppData\Local\Temp\opencode\tessdata"
UA = {"User-Agent": "Mozilla/5.0 (compatible; FrutiferasAuditoria/1.0)"}
QUALIDADES = ["maxresdefault", "sddefault", "hqdefault"]

MAX_CANDIDATOS = 4
MAX_FLAT = 0.24        # fracao da cor dominante acima disso = provavel painel de texto
MIN_NITIDEZ = 45.0     # variancia do Laplaciano

SKIP_NOMES = {
    "pitanga preta", "araca vermelho", "araca boi", "bacupari mirim",
    "cereja do rio grande", "grumixama amarela", "abil", "guabiroba do cerrado",
    "tomate", "costela de adao",
}


def norm(t):
    t = unicodedata.normalize("NFKD", (t or "").lower())
    return "".join(c for c in t if not unicodedata.combining(c))


def slugify(nome):
    s = norm(nome)
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s


def carregar_lista_100():
    txt = open(SCRIPT_100, encoding="utf-8").read()
    bloco = txt.split("FRUTAS = [", 1)[1].split("\n]", 1)[0]
    return ast.literal_eval("[" + bloco + "]")


def carregar_extras():
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


def contar_palavras(caminho):
    base = caminho[:-4]
    subprocess.run([TESSERACT, caminho, base, "--tessdata-dir", TESSDATA, "-l", "por", "--psm", "6"],
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=120)
    txt = base + ".txt"
    if not os.path.exists(txt):
        return 0
    conteudo = open(txt, encoding="utf-8", errors="ignore").read()
    palavras = re.findall(r"[A-Za-zÀ-ÿ]{4,}", conteudo)
    return len(palavras)


def fracao_cor_dominante(caminho):
    """Fracao de pixels da cor mais comum (painel de texto tem cor lisa grande)."""
    img = cv2.imdecode(np.fromfile(caminho, dtype=np.uint8), cv2.IMREAD_COLOR)
    if img is None:
        return 1.0
    small = cv2.resize(img, (80, 45), interpolation=cv2.INTER_AREA)
    q = (small // 24).astype(np.int32)
    flat = q[:, :, 0] * 10000 + q[:, :, 1] * 100 + q[:, :, 2]
    vals, counts = np.unique(flat, return_counts=True)
    return float(counts.max() / flat.size)


def nitidez(caminho):
    img = cv2.imdecode(np.fromfile(caminho, dtype=np.uint8), cv2.IMREAD_GRAYSCALE)
    if img is None:
        return 0.0
    return float(cv2.Laplacian(img, cv2.CV_64F).var())


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

    # mapa slug -> slug do frame (dataset)
    frames_por_slug = {}
    for ts, nome, slug_frame in carregar_lista_100():
        if norm(nome) in SKIP_NOMES:
            continue
        frames_por_slug[slugify(nome)] = slug_frame

    escolhidas_thumb = 0
    escolhidas_frame = 0
    sem_nada = 0

    for i, fruta in enumerate(frutas, 1):
        slug = fruta["slug"]
        destino = os.path.join(PUBLIC_FRUTAS, f"{slug}.jpg")
        escolhida = None
        info = ""

        for v in (fruta.get("videos") or [])[:MAX_CANDIDATOS]:
            raw = os.path.join(TMP, f"{slug}_{v['id']}_raw.jpg")
            if not baixar(v["id"], raw):
                continue
            # normaliza (recorta barras pretas / 16:9) ANTES do OCR
            norm_path = os.path.join(TMP, f"{slug}_{v['id']}_norm.jpg")
            try:
                otimizar(raw, norm_path)
            except Exception:
                continue
            palavras = fracao_cor_dominante(norm_path)
            nit = nitidez(norm_path)
            if palavras <= MAX_FLAT and nit >= MIN_NITIDEZ:
                shutil.copy(norm_path, destino)
                escolhida = "thumb"
                info = f"thumb {v['id']} (flat={palavras:.2f}, nitidez={nit:.0f})"
                break

        if escolhida is None:
            # fallback: frame real do dataset
            slug_frame = frames_por_slug.get(slug)
            if slug_frame:
                for idx in (2, 3, 1):
                    p = os.path.join(DATASET, f"{slug_frame}_{idx:03d}.jpg")
                    if os.path.exists(p):
                        otimizar(p, destino)
                        escolhida = "frame"
                        info = f"frame {os.path.basename(p)}"
                        break

        if escolhida == "thumb":
            escolhidas_thumb += 1
        elif escolhida == "frame":
            escolhidas_frame += 1
        else:
            sem_nada += 1

        if i % 10 == 0:
            print(f"[14] {i}/{len(frutas)} (thumb={escolhidas_thumb}, frame={escolhidas_frame})", flush=True)

    print(f"[14] capas: thumbnails limpas={escolhidas_thumb} | frames={escolhidas_frame} | sem capa={sem_nada}")


if __name__ == "__main__":
    main()
