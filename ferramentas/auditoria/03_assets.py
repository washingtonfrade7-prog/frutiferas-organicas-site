# -*- coding: utf-8 -*-
"""03 - Gera os assets de midia por frutifera.

- Hero: melhor thumbnail (maxres) do video de destaque -> public/frutiferas/<slug>.jpg
- Galeria: frames reais extraidos dos videos locais (ffmpeg) quando disponiveis
- Fallback de galeria: thumbnails dos proximos videos

Uso:
    python 03_assets.py

Entrada: auditoria/frutas.json
Saida:   public/frutiferas/<slug>.jpg, <slug>-2.jpg, <slug>-3.jpg
"""
import json
import os
import shutil
import subprocess
import sys
import urllib.request

from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import config  # noqa: E402

PUBLIC_FRUTAS = os.path.join(config.SITE_DIR, "public", "frutiferas")
FFMPEG = shutil.which("ffmpeg") or "ffmpeg"
FFPROBE = shutil.which("ffprobe") or "ffprobe"
UA = {"User-Agent": "Mozilla/5.0 (compatible; FrutiferasAuditoria/1.0)"}


def log(msg):
    print(f"[03] {msg}", flush=True)


def baixar(url, dest):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=40) as r, open(dest, "wb") as f:
        f.write(r.read())


def otimizar(src, dest, w=800, h=450):
    im = Image.open(src).convert("RGB")
    iw, ih = im.size
    alvo = w / h
    atual = iw / ih
    if atual > alvo:  # muito larga -> corta laterais
        nova_w = int(ih * alvo)
        x = (iw - nova_w) // 2
        im = im.crop((x, 0, x + nova_w, ih))
    else:  # muito alta -> corta topo/base
        nova_h = int(iw / alvo)
        y = (ih - nova_h) // 2
        im = im.crop((0, y, iw, y + nova_h))
    im = im.resize((w, h), Image.LANCZOS)
    im.save(dest, "JPEG", quality=82, optimize=True, progressive=True)


def duracao(mp4):
    try:
        out = subprocess.check_output(
            [FFPROBE, "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", mp4],
            text=True,
            timeout=30,
        )
        return float(out.strip())
    except Exception:
        return 0.0


def extrair_frame(mp4, t, dest):
    resultado = subprocess.run(
        [FFMPEG, "-y", "-ss", f"{t:.1f}", "-i", mp4, "-frames:v", "1", "-q:v", "2", dest],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        timeout=120,
    )
    return resultado.returncode == 0 and os.path.exists(dest)


def video_local_para(fruta):
    """Retorna o caminho de um mp4 local pertencente a frutifera, se existir."""
    if not os.path.isdir(config.COLDSTORAGE_DIR):
        return None
    ids = [v["id"] for v in fruta.get("videos", [])]
    for vid in ids:
        caminho = os.path.join(config.COLDSTORAGE_DIR, f"{vid}.mp4")
        if os.path.exists(caminho) and os.path.getsize(caminho) > 100_000:
            return caminho
    return None


def main():
    if not os.path.exists(config.FRUTAS_JSON):
        raise SystemExit("rode 04_normalizar.py antes")
    with open(config.FRUTAS_JSON, encoding="utf-8") as f:
        frutas = json.load(f)

    os.makedirs(PUBLIC_FRUTAS, exist_ok=True)
    tmp = os.path.join(config.OUT_DIR, "_tmp")
    os.makedirs(tmp, exist_ok=True)

    com_frames = 0
    total = 0
    for fruta in frutas:
        slug = fruta["slug"]
        hero = fruta.get("hero") or {}
        galeria = fruta.get("galeria") or []

        # 1) Hero a partir da melhor thumbnail
        destino_hero = os.path.join(PUBLIC_FRUTAS, f"{slug}.jpg")
        baixou_hero = False
        for url in [hero.get("thumb")] + galeria:
            if not url:
                continue
            try:
                raw = os.path.join(tmp, f"{slug}.jpg")
                baixar(url, raw)
                otimizar(raw, destino_hero)
                baixou_hero = True
                break
            except Exception as e:
                log(f"{slug}: falha no hero ({e}); tentando proxima")
        if not baixou_hero:
            log(f"{slug}: SEM hero")
            continue
        total += 1

        # 2) Galeria com frames reais do video local
        mp4 = video_local_para(fruta)
        gerou_frame = False
        if mp4:
            dur = duracao(mp4)
            if dur > 8:
                for i, frac in enumerate((0.4, 0.65), start=2):
                    raw = os.path.join(tmp, f"{slug}-{i}.png")
                    if extrair_frame(mp4, dur * frac, raw):
                        try:
                            otimizar(raw, os.path.join(PUBLIC_FRUTAS, f"{slug}-{i}.jpg"))
                            gerou_frame = True
                        except Exception:
                            pass
        if gerou_frame:
            com_frames += 1

        # 3) Completa a galeria com thumbnails dos proximos videos
        indice = 2 if gerou_frame else 2
        for url in galeria[1:4]:
            if indice > 3:
                break
            try:
                raw = os.path.join(tmp, f"{slug}-t{indice}.jpg")
                baixar(url, raw)
                otimizar(raw, os.path.join(PUBLIC_FRUTAS, f"{slug}-{indice}.jpg"))
                indice += 1
            except Exception:
                continue

        log(f"{slug}: hero ok | frames={'sim' if gerou_frame else 'nao'}")

    shutil.rmtree(tmp, ignore_errors=True)
    log(f"concluido: {total} heroes | {com_frames} com frames reais")


if __name__ == "__main__":
    main()
