# -*- coding: utf-8 -*-
"""Extrai frames de videos especificos (colheita/degustacao) por frutifera."""
import os
import subprocess
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import config  # noqa: E402

FFMPEG = r"C:\Users\Micro\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.0.1-full_build\bin\ffmpeg.exe"
FFPROBE = FFMPEG.replace("ffmpeg.exe", "ffprobe.exe")
YTDLP = os.path.join(config.AUTOMACAO_DIR, ".venv", "Scripts", "yt-dlp.exe")
FRAMES_DIR = os.path.join(config.OUT_DIR, "_frames3")
VIDEOS_DIR = os.path.join(config.OUT_DIR, "_videos")
os.makedirs(FRAMES_DIR, exist_ok=True)
os.makedirs(VIDEOS_DIR, exist_ok=True)

ESCOLHAS = {
    "amora-portuguesa": ["scxp14TGUxQ", "ly3vfzcJLVs", "6X_mvfgxoWk"],
    "laranja-champagne": ["r93GgYvqRo0", "-BpmfmSzV9o", "m6N5ELGv_e8"],
}
N = 12


def duracao(video):
    try:
        out = subprocess.run([FFPROBE, "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", video],
                             capture_output=True, text=True, encoding="utf-8", errors="ignore", timeout=60)
        return float(out.stdout.strip())
    except Exception:
        return 0.0


def extrair(video, pasta):
    dur = duracao(video)
    if dur <= 0:
        return 0
    os.makedirs(pasta, exist_ok=True)
    n = 0
    for i in range(N):
        t = dur * (0.05 + 0.9 * i / (N - 1))
        dest = os.path.join(pasta, f"f{i:02d}.jpg")
        subprocess.run([FFMPEG, "-y", "-ss", f"{t:.1f}", "-i", video, "-frames:v", "1", "-vf", "scale=800:-2", "-q:v", "3", dest],
                       capture_output=True, timeout=90)
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
    r = subprocess.run([YTDLP, "-f", "18/b[height<=480]", "--extractor-args", "youtube:player_client=android",
                        "--no-playlist", "--no-warnings", "-o", dest, f"https://www.youtube.com/watch?v={vid}"],
                       capture_output=True, text=True, encoding="utf-8", errors="ignore", timeout=900)
    if os.path.exists(dest) and os.path.getsize(dest) > 50000:
        return dest, "baixado"
    print("  falha:", (r.stderr or "").strip()[-160:])
    return None, None


def main():
    for slug, vids in ESCOLHAS.items():
        for vid in vids:
            pasta = os.path.join(FRAMES_DIR, f"{slug}__{vid}")
            if os.path.isdir(pasta) and len([f for f in os.listdir(pasta) if f.endswith('.jpg')]) >= 8:
                print(f"[{slug}] {vid} ja extraido")
                continue
            video, origem = obter_video(vid)
            if not video:
                print(f"[sem video] {slug} {vid}")
                continue
            n = extrair(video, pasta)
            print(f"[{slug}] {vid} ({origem}) -> {n} frames")


if __name__ == "__main__":
    main()
