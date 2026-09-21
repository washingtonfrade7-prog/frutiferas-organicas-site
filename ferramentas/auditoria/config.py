# -*- coding: utf-8 -*-
"""Configuracao dos scripts de auditoria do canal Frutiferas Organicas.

Os caminhos podem ser sobrescritos por variaveis de ambiente.
"""
import os

# Projeto de automacao (onde ficam token.pickle, client_secret.json e catalogos)
AUTOMACAO_DIR = os.environ.get(
    "FRUTIFERAS_AUTOMACAO_DIR",
    r"C:\Users\Micro\Downloads\Projeto automação youtube",
)

# Acervo local de videos/transcricoes
COLDSTORAGE_DIR = os.environ.get("FRUTIFERAS_COLDSTORAGE_DIR", r"D:\Frutiferas_ColdStorage")

# Raiz do site (ferramentas/auditoria/config.py -> raiz)
SITE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT_DIR = os.path.join(SITE_DIR, "auditoria")

# Credenciais e catalogos do projeto de automacao
TOKEN_PATH = os.path.join(AUTOMACAO_DIR, "token.pickle")
CLIENT_SECRET_PATH = os.path.join(AUTOMACAO_DIR, "client_secret.json")
CATALOGO_PATH = os.path.join(AUTOMACAO_DIR, "catalogo_canal_completo.json")
BIBLIOTECA_PATH = os.path.join(AUTOMACAO_DIR, "biblioteca_frutiferas.json")
RELATORIO_FONTES_PATH = os.path.join(AUTOMACAO_DIR, "relatorio_canal_frutiferas.md")

# Canal oficial
CHANNEL_ID = "UCLbYiikrQyRwu91HJjc-H8A"

# Arquivos de saida
CANAL_BRUTO = os.path.join(OUT_DIR, "canal_bruto.json")
TRANSCRICOES = os.path.join(OUT_DIR, "transcricoes.json")
FRUTAS_JSON = os.path.join(OUT_DIR, "frutas.json")
VIDEOS_JSON = os.path.join(OUT_DIR, "videos.json")
KEYWORDS_JSON = os.path.join(OUT_DIR, "keywords.json")
RELATORIO_MD = os.path.join(OUT_DIR, "relatorio_auditoria.md")


def ensure_out_dir():
    os.makedirs(OUT_DIR, exist_ok=True)
