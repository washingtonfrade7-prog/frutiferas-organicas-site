# -*- coding: utf-8 -*-
"""OCR dos cards informativos das 100 frutiferas.

Le dataset_frutas/imagens/<Slug>_001.jpg, pre-processa e roda Tesseract (por),
extraindo os campos estruturados de cada card.

Saida: auditoria/fichas_ocr.json
"""
import json
import os
import re
import subprocess
import sys
import unicodedata

from PIL import Image, ImageOps

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import config  # noqa: E402

DATASET = os.path.join(config.AUTOMACAO_DIR, "dataset_frutas", "imagens")
TESSERACT = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
TESSDATA = r"C:\Users\Micro\AppData\Local\Temp\opencode\tessdata"
TMP = os.path.join(config.OUT_DIR, "_ocr")
SAIDA = os.path.join(config.OUT_DIR, "fichas_ocr.json")

CAMPOS = {
    "nome popular": "nomePopular",
    "nome cientifico": "nomeCientifico",
    "quantidade minima de luz solar": "luz",
    "quantidade de luz solar": "luz",
    "luz solar": "luz",
    "como plantar": "comoPlantar",
    "tempo minimo ate a producao": "tempoProducao",
    "tempo ate a producao": "tempoProducao",
    "tamanho do vaso definitivo": "vaso",
    "classificacao da dificuldade do cultivo": "dificuldade",
    "dificuldade do cultivo": "dificuldade",
    "adubacao": "adubacao",
}


def norm(t):
    t = unicodedata.normalize("NFKD", (t or "").lower())
    return "".join(c for c in t if not unicodedata.combining(c))


def preprocessar(src, dest):
    im = Image.open(src).convert("L")
    im = ImageOps.autocontrast(im, cutoff=1)
    im = im.resize((im.width * 2, im.height * 2), Image.LANCZOS)
    im.save(dest, "PNG")


def ocr(caminho):
    base = caminho[:-4]
    subprocess.run(
        [TESSERACT, caminho, base, "--tessdata-dir", TESSDATA, "-l", "por", "--psm", "6"],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=120,
    )
    txt = base + ".txt"
    if os.path.exists(txt):
        with open(txt, encoding="utf-8", errors="ignore") as f:
            return f.read()
    return ""


def parsear(texto):
    dados = {}
    numero = re.search(r"^\s*(\d{1,3})\s*$", texto, re.M)
    if numero:
        dados["numero"] = int(numero.group(1))
    for linha in texto.splitlines():
        linha = linha.strip()
        if ":" not in linha:
            continue
        chave, valor = linha.split(":", 1)
        chave_n = norm(chave).strip()
        for termo, campo in CAMPOS.items():
            if termo in chave_n:
                dados[campo] = valor.strip()
                break
    return dados


def main():
    os.makedirs(TMP, exist_ok=True)
    config.ensure_out_dir()
    if not os.path.isdir(DATASET):
        raise SystemExit(f"dataset nao encontrado: {DATASET}")

    cards = [n for n in os.listdir(DATASET) if n.lower().endswith("_001.jpg")]
    print(f"[ocr] cards encontrados: {len(cards)}", flush=True)

    resultado = {}
    for i, nome in enumerate(sorted(cards), 1):
        slug = nome[:-8]
        src = os.path.join(DATASET, nome)
        prep = os.path.join(TMP, f"{slug}.png")
        try:
            preprocessar(src, prep)
            texto = ocr(prep)
        except Exception as e:
            print(f"[ocr] erro em {slug}: {e}", flush=True)
            continue
        dados = parsear(texto)
        dados["texto"] = texto.strip()
        resultado[slug] = dados
        if i % 10 == 0:
            print(f"[ocr] {i}/{len(cards)}", flush=True)

    with open(SAIDA, "w", encoding="utf-8") as f:
        json.dump(resultado, f, ensure_ascii=False, indent=2)

    com_dados = sum(1 for v in resultado.values() if v.get("nomeCientifico"))
    print(f"[ocr] cards processados: {len(resultado)} | com nome cientifico: {com_dados}")
    print(f"[ocr] salvo: {SAIDA}")


if __name__ == "__main__":
    main()
