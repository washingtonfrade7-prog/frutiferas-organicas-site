# -*- coding: utf-8 -*-
"""Gera o calendario de 90 dias do produto (arquivo .ics).

O aluno importa o .ics no celular e passa a receber notificacoes automaticas
de rega, adubacao (bokashi), inspecao de pragas, poda e renovacao.

Rode com o Python do sistema ou do venv:
    python ferramentas/curso/gerar_calendario.py
"""
import os
from datetime import date, timedelta

CURSO_DIR = os.path.dirname(os.path.abspath(__file__))
OUT_DIR = os.path.join(CURSO_DIR, "out")
os.makedirs(OUT_DIR, exist_ok=True)

INICIO = date.today() + timedelta(days=1)
PRODID = "-//Frutiferas Organicas//Guia Completo//PT-BR"

eventos = []


def add(dia, titulo, descricao, hora=None):
    """dia = dias a partir do inicio (1 = primeiro dia)."""
    eventos.append({"dia": dia, "titulo": titulo, "descricao": descricao, "hora": hora})


# --- Primeiros passos ---------------------------------------------------------
add(1, "Dia 1 - Escolher o local e o vaso",
    "Meça quantas horas de sol direto o local recebe (mínimo 4 a 6h). Escolha a frutífera e o vaso "
    "(20 L para começar; 40 a 90 L para jabuticaba, citros e manga). Compre substrato, húmus, "
    "argila expandida e manta de drenagem.")
add(2, "Dia 2 - Montar drenagem e substrato",
    "Argila expandida no fundo + manta de drenagem. Substrato: 50% terra vegetal, 30% matéria "
    "orgânica, 20% drenagem.")
add(3, "Dia 3 - Plantar",
    "Plante sem enterrar o colo (deve ficar na altura em que estava no saquinho). Primeira rega até "
    "a água sair pelos furos. Aclimatar em meia-sombra por 3 a 5 dias.")
add(5, "Dia 5 - Aumentar a exposição ao sol",
    "Comece a expor a muda ao sol da manhã, aumentando aos poucos ao longo de 1 a 2 semanas.")

# --- Rotina semanal (13 semanas) ---------------------------------------------
for semana in range(1, 14):
    dia = semana * 7
    add(dia, f"Semana {semana} - Teste do dedo e registro",
        "Enfie o dedo 2 cm no substrato: só regue se estiver seco. Anote no diário (altura, folhas, "
        "o que observou).")
    add(dia + 1, f"Semana {semana} - Inspeção de pragas (5 min)",
        "Olhe o verso das folhas, as pontas novas e o caule. Procure cochonilha, pulgão e "
        "mosca-branca. Trate no começo.")

# --- Adubacao ----------------------------------------------------------------
add(21, "Adubar com bokashi (1ª vez)",
    "1 a 2 colheres de sopa na borda do vaso, longe do caule. Cubra com substrato e regue. "
    "Repita a cada 30 a 45 dias.")
for d in (61, 101):
    add(d, "Adubar com bokashi",
        "Reposição de bokashi na borda do vaso (a cada 30 a 45 dias).")

for d in (30, 45, 60, 75, 90):
    add(d, "Adubo líquido (chá de húmus)",
        "Regue com o adubo líquido já diluído (1 parte de caldo para 5 a 10 de água), em substrato "
        "úmido.")

add(21, "Instalar a cobertura morta",
    "Casca de pinus, folhas secas ou palha (2 a 3 cm) sobre o substrato: reduz a evaporação e vira "
    "adubo.")

# --- Manejo ------------------------------------------------------------------
add(60, "Poda de limpeza",
    "Remova só o seco, o doente e o que cruza. Corte acima de uma gema, sem deixar toco.")
add(90, "Balanço dos 90 dias",
    "Compare com a foto do dia do plantio. Revise o que funcionou e o que vai mudar na próxima "
    "safra.")
add(120, "Checar sinal de floração",
    "Na fase de floração, reduza o nitrogênio e aumente fósforo e potássio (farinha de osso e cinza).")
add(730, "Renovar o substrato (2 anos)",
    "Tire a planta do vaso, faça poda leve de raízes (até 1/3 das velhas), renove parte do "
    "substrato, adube e, se possível, aumente o vaso.")


def escapar(t):
    return (t.replace("\\", "\\\\").replace(";", "\\;").replace(",", "\\,")
             .replace("\n", "\\n"))


def dobra(t):
    """Quebra o texto em linhas de ~70 caracteres para o padrao iCalendar."""
    palavras, linhas, atual = t.split(), [], ""
    for p in palavras:
        if len(atual) + len(p) + 1 > 68:
            linhas.append(atual)
            atual = p
        else:
            atual = f"{atual} {p}".strip()
    if atual:
        linhas.append(atual)
    return "\r\n ".join(linhas)


linhas = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    f"PRODID:{PRODID}",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Frutíferas em Vaso - 90 dias",
    "X-WR-CALDESC:Acompanhamento do guia Cultivo de Frutíferas Orgânicas em Vasos",
]

for i, ev in enumerate(eventos):
    d = INICIO + timedelta(days=ev["dia"] - 1)
    d2 = d + timedelta(days=1)
    uid = f"frutiferas-{d.strftime('%Y%m%d')}-{i}@frutiferasorganicas.com.br"
    linhas += [
        "BEGIN:VEVENT",
        f"UID:{uid}",
        f"DTSTAMP:{date.today().strftime('%Y%m%d')}T120000Z",
        f"DTSTART;VALUE=DATE:{d.strftime('%Y%m%d')}",
        f"DTEND;VALUE=DATE:{d2.strftime('%Y%m%d')}",
        f"SUMMARY:{escapar(ev['titulo'])}",
        f"DESCRIPTION:{dobra(escapar(ev['descricao']))}",
        "BEGIN:VALARM",
        "TRIGGER:-PT15H",
        "ACTION:DISPLAY",
        f"DESCRIPTION:{escapar(ev['titulo'])}",
        "END:VALARM",
        "END:VEVENT",
    ]

linhas.append("END:VCALENDAR")

destino = os.path.join(OUT_DIR, "Calendario-Frutiferas-90-dias.ics")
with open(destino, "w", encoding="utf-8", newline="") as fh:
    fh.write("\r\n".join(linhas) + "\r\n")

print(f"[ok] {len(eventos)} eventos -> {destino}")
print(f"     inicio: {INICIO.strftime('%d/%m/%Y')} | fim: {(INICIO + timedelta(days=729)).strftime('%d/%m/%Y')}")
