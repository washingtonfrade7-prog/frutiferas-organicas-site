# -*- coding: utf-8 -*-
"""07 - Gera src/data/guias.ts (videos de tecnica agrupados por tema).

Uso:
    python 07_gerar_guias.py
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import config  # noqa: E402

SAIDA_TS = os.path.join(config.SITE_DIR, "src", "data", "guias.ts")

GUIAS = [
    {"slug": "plantio", "nome": "Como plantar em vaso", "descricao": "Escolha do vaso, substrato e plantio correto das frutíferas orgânicas."},
    {"slug": "poda", "nome": "Poda e formação", "descricao": "Podas de formação, limpeza e produção para a planta render mais."},
    {"slug": "adubacao", "nome": "Adubação orgânica", "descricao": "Como adubar, o que usar e quando nutrir suas frutíferas."},
    {"slug": "cuidados", "nome": "Cuidados e problemas", "descricao": "Pragas, folhas caindo, rega e recuperação de plantas."},
    {"slug": "floracao", "nome": "Floração e polinização", "descricao": "Como garantir flores e frutos bem formados."},
    {"slug": "gastronomia", "nome": "Gastronomia", "descricao": "Receitas, sucos e aproveitamento das frutas colhidas."},
]

LIMITE = 12


def main():
    with open(config.VIDEOS_JSON, encoding="utf-8") as f:
        videos = json.load(f)

    guias_out = []
    for guia in GUIAS:
        itens = [v for v in videos if v.get("tipo") == guia["slug"] and not v.get("curto")]
        itens.sort(key=lambda v: -v.get("views", 0))
        escolhidos = [{"id": v["id"], "titulo": v["titulo"]} for v in itens[:LIMITE] if v.get("titulo")]
        guias_out.append(
            {
                "slug": guia["slug"],
                "nome": guia["nome"],
                "descricao": guia["descricao"],
                "videos": escolhidos,
            }
        )

    ts = (
        "// GERADO AUTOMATICAMENTE por ferramentas/auditoria/07_gerar_guias.py\n"
        "// Nao edite a mao: rode a auditoria novamente para atualizar.\n"
        "export interface Guia {\n"
        "  slug: string\n  nome: string\n  descricao: string\n  videos: { id: string; titulo: string }[]\n}\n\n"
        "export const guias: Guia[] = "
        + json.dumps(guias_out, ensure_ascii=False, indent=2)
        + "\n"
    )
    with open(SAIDA_TS, "w", encoding="utf-8") as f:
        f.write(ts)
    total = sum(len(g["videos"]) for g in guias_out)
    print(f"[07] guias: {len(guias_out)} | videos: {total} | salvo: {SAIDA_TS}", flush=True)


if __name__ == "__main__":
    main()
