# -*- coding: utf-8 -*-
"""Extrai frames de videos (locais ou baixados) para escolher o frame com o fruto."""
import os
import subprocess
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import config  # noqa: E402

FFMPEG = r"C:\Users\Micro\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.0.1-full_build\bin\ffmpeg.exe"
FFPROBE = FFMPEG.replace("ffmpeg.exe", "ffprobe.exe")
YTDLP = os.path.join(config.AUTOMACAO_DIR, ".venv", "Scripts", "yt-dlp.exe")

FRAMES_DIR = os.path.join(config.OUT_DIR, "_frames2")
VIDEOS_DIR = os.path.join(config.OUT_DIR, "_videos")
os.makedirs(FRAMES_DIR, exist_ok=True)
os.makedirs(VIDEOS_DIR, exist_ok=True)

ESCOLHAS = {
    "uvaia": "ed7YcwyraRg",
    "uva-brs-vitoria": "I8mGDAFHoZ8",
    "uva-isabel": "LmtqJKnzuNY",
    "saborosa-pytaya-do-serrado": "zfjVmCKMUzc",
    "roma": "xE9LweMa0MI",
    "pitanga-do-cerrado": "FmRBdQRD4Rc",
    "manga-uba": "kT7l4rqt8mI",
    "jambo-rosa": "aCCjNdeJ7Ns",
    "jabuticaba-sabara": "2raa1E2ST7Y",
    "pinha": "_qw-gbXyIRk",
    "pinha-dos-astecas": "_qw-gbXyIRk",
    "limao-imperial": "LtxsxIBlxmI",
    "limao-cravo-caipira": "dLDvSKQaKb4",
    "longan": "0gsK52N31uk",
}
N = 14


def duracao(video):
    try:
        out = subprocess.run(
            [FFPROBE, "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", video],
            capture_output=True, text=True, encoding="utf-8", errors="ignore", timeout=60,
        )
        return float(out.stdout.strip())
    except Exception:
        return 0.0


def extrair(video, slug):
    dur = duracao(video)
    if dur <= 0:
        return 0
    pasta = os.path.join(FRAMES_DIR, slug)
    os.makedirs(pasta, exist_ok=True)
    n = 0
    for i in range(N):
        t = dur * (0.06 + 0.88 * i / (N - 1))
        dest = os.path.join(pasta, f"f{i:02d}.jpg")
        subprocess.run(
            [FFMPEG, "-y", "-ss", f"{t:.1f}", "-i", video, "-frames:v", "1", "-vf", "scale=800:-2", "-q:v", "3", dest],
            capture_output=True, timeout=90,
        )
        if os.path.exists(dest) and os.path.getsize(dest) > 2000:
            n += 1
    return n


def obter_video(vid):
    local = os.path.join(config.COLDSTORAGE_DIR, f"{vid}.mp4")
    if os.path.exists(local):
        return local, "local"
    dest = os.path.join(VIDEOS_DIR, f"{vid}.mp4")
    if os.path.exists(dest) and os.path.getsize(dest) > 50000:
        return dest, "cache"
    r = subprocess.run(
        [YTDLP, "-f", "18/b[height<=480]", "--extractor-args", "youtube:player_client=android",
         "--no-playlist", "--no-warnings", "-o", dest,
         f"https://www.youtube.com/watch?v={vid}"],
        capture_output=True, text=True, encoding="utf-8", errors="ignore", timeout=900,
    )
    if os.path.exists(dest) and os.path.getsize(dest) > 50000:
        return dest, "baixado"
    print("  falha download:", (r.stderr or "").strip()[-200:])
    return None, None


def main():
    for slug, vid in ESCOLHAS.items():
        pasta = os.path.join(FRAMES_DIR, slug)
        if os.path.isdir(pasta) and len([f for f in os.listdir(pasta) if f.endswith(".jpg")]) >= 10:
            print(f"[{slug}] ja extraido")
            continue
        video, origem = obter_video(vid)
        if not video:
            print(f"[sem video] {slug} ({vid})")
            continue
        n = extrair(video, slug)
        print(f"[{slug}] {vid} ({origem}) -> {n} frames")


if __name__ == "__main__":
    main()
