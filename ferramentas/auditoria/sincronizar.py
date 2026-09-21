# -*- coding: utf-8 -*-
"""sincronizar.py - Reexecuta a auditoria completa do canal.

Uso:
    python sincronizar.py

Executa em ordem:
    01_coletar_canal.py   -> auditoria/canal_bruto.json
    02_ler_transcricoes.py-> auditoria/transcricoes.json
    04_normalizar.py      -> auditoria/frutas.json, videos.json, keywords.json
    05_gerar_relatorio.py -> auditoria/relatorio_auditoria.md

Rode novamente sempre que publicar videos novos no canal.
"""
import os
import subprocess
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
ETAPAS = [
    "01_coletar_canal.py",
    "02_ler_transcricoes.py",
    "04_normalizar.py",
    "05_gerar_relatorio.py",
]


def main():
    for etapa in ETAPAS:
        caminho = os.path.join(AQUI, etapa)
        print(f"\n===== {etapa} =====", flush=True)
        resultado = subprocess.run([sys.executable, "-X", "utf8", caminho])
        if resultado.returncode != 0:
            raise SystemExit(f"falhou em {etapa} (codigo {resultado.returncode})")
    print("\nAuditoria concluida.", flush=True)


if __name__ == "__main__":
    main()
