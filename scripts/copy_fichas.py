# -*- coding: utf-8 -*-
"""
Copia las fichas tecnicas (PDF) al sitio con nombres limpios y estables,
y genera src/data/fichas.json con el indice para las paginas de producto.

Uso:  python scripts/copy_fichas.py [ruta a la carpeta "Q-MEDICAL - Web"]
"""
import json
import os
import shutil
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(
    os.path.dirname(ROOT), "Q-MEDICAL - Web")
FICHAS = os.path.join(SRC, "Ficha técnica productos")
OUT = os.path.join(ROOT, "public", "fichas-tecnicas")

# (fragmento identificador del archivo original, nombre destino, titulo visible)
MAP = [
    ("ALLEVA_SUCTION LINER", "bolsa-aspiracion-vide", "Bolsa de aspiración de secreciones VIDE®"),
    ("ALLEVA_CANISTER", "canister-reusable-vide", "Cánister rígido reusable VIDE®"),
    ("BAÑO_FACIL_ALOE_VERA", "bano-facil-aloe-vera", "Paño Baño Fácil con Aloe Vera"),
    ("BAÑO_FACIL_CLORHEXIDINA", "bano-facil-clorhexidina", "Paño Baño Fácil con Clorhexidina"),
    ("BAÑO_FACIL_MANZANILLA", "bano-facil-manzanilla", "Paño Baño Fácil con Manzanilla"),
    ("COMFORT_GUANTES", "guantes-nitrilo-comfort", "Guantes de nitrilo 6.5 g COMFORT"),
    ("GEYI_TRÓCARES DESECHABLES_KITS", "trocares-geyi-kits", "Trócares desechables GEYI — Kits A / B / C"),
    ("GEYI_TRÓCARES DESECHABLES-REV", "trocares-geyi", "Trócares desechables GEYI Tipo III"),
    ("MANTA_ABSORBENTE_DE_PISO", "manta-absorbente-jiehong-piso", "Manta absorbente de fluidos para piso JIEHONG"),
    ("MANTA_ABSORBENTE_REVERSIBLE_PRECORTADA", "manta-absorbente-jiehong-precortada", "Manta absorbente reversible precortada JIEHONG"),
    ("KANGBAO_CONTADOR DE AGUJAS", "contador-agujas-kangbao", "Contador de agujas doble imán KANGBAO"),
    ("LONGOOD_TOALLITAS", "toallitas-piel-longood", "Toallitas para limpieza de piel LONGOOD"),
    ("CITOSTÁTICOS_MC1311", "contenedor-citotoxicos-mc1311-3-8l", "Contenedor citotóxicos MC1311 — 3.8 L"),
    ("CITOSTÁTICOS_MC1321", "contenedor-citotoxicos-mc1321-7-6l", "Contenedor citotóxicos MC1321 — 7.6 L"),
    ("CITOSTÁTICOS_MC1351", "contenedor-citotoxicos-mc1351-30-3l", "Contenedor citotóxicos MC1351 — 30.3 L"),
    ("CONTENEDOR_VIDRIO_MV1311", "contenedor-vidrio-mv1311-3-8l", "Contenedor para vidrios MV1311 — 3.8 L"),
    ("RESIDUOS ESPECIALES_MC1321", "contenedor-residuos-especiales-mc1321-7-6l", "Contenedor residuos especiales MC1321 — 7.6 L"),
    ("PUNZOCORTANTES_MA1112", "contenedor-punzocortantes-ma1112-0-95l", "Contenedor punzocortantes MA1112 — 0.95 L"),
    ("PUNZOCORTANTES_MA1122", "contenedor-punzocortantes-ma1122-1-89l", "Contenedor punzocortantes MA1122 — 1.89 L"),
    ("COD_1024_3L", "contenedor-punzocortantes-1024-3l", "Contenedor punzocortantes 1024 — 3 L"),
    ("COD_1033_7L", "contenedor-punzocortantes-1033-7l", "Contenedor punzocortantes 1033 — 7 L"),
    ("PUNZOCORTANTES_MA1212", "contenedor-punzocortantes-ma1212-4-7l", "Contenedor punzocortantes MA1212 — 4.7 L"),
    ("PUNZOCORTANTES_ME1282", "contenedor-punzocortantes-me1282-7-6l", "Contenedor punzocortantes ME1282 — 7.6 L"),
    ("PUNZOCORTANTES_MA1331", "contenedor-punzocortantes-ma1331-11-4l", "Contenedor punzocortantes MA1331 — 11.4 L"),
    ("PUNZOCORTANTES_MA1341", "contenedor-punzocortantes-ma1341-22-7l", "Contenedor punzocortantes MA1341 — 22.7 L"),
    ("PUNZOCORTANTES_MA1352", "contenedor-punzocortantes-ma1352-30-3l", "Contenedor punzocortantes MA1352 — 30.3 L"),
    ("MEDCAPTAIN BOMBA_NUTRICIÓN", "bomba-nutricion-enteral-ep60", "Bomba de nutrición enteral MEDCAPTAIN EP-60"),
    ("MEDCAPTAIN HOJA DE VIDEOLARINGOSCOPIO", "hojas-videolaringoscopio", "Hojas de videolaringoscopio desechables MEDCAPTAIN"),
    ("MEDCAPTAIN VIDEOLARINGOSCOPIO", "videolaringoscopio-vs10", "Videolaringoscopio MEDCAPTAIN VS-10"),
    ("HBM_PROTECTOR_TELA_PLASTICA", "protector-impermeable-medispo", "Protector de tela plástica impermeable MEDISPO"),
    ("NEX MEDICAL_APLICADORES", "aplicador-clorhexidina-2-nex-clorex", "Aplicador NEX CLOREX 2% PREP"),
    ("NEX MEDICAL_CEPILLO_ESPONJA_4", "cepillo-esponja-clorhexidina-4-nex-clorex", "Cepillo/esponja NEX CLOREX C2 CHG 4%"),
    ("NEX MEDICAL_ESPONJA 2%", "esponja-clorhexidina-2-nex-clorex", "Esponja NEX CLOREX C2 CHG 2%"),
    ("QINDAO_TAPETES_ADHESIVOS", "tapete-adhesivo-descontaminante", "Tapete adhesivo descontaminante (Clean Mat)"),
    ("Bolsas_para_conteo_esponjas", "bolsas-conteo-esponjas", "Bolsas para conteo de esponjas / gasas"),
    ("ALIMENTACIÓN_ENTERAL_0.5L", "bolsa-nutricion-enteral-500ml", "Bolsa de alimentación enteral 500 mL"),
    ("ALIMENTACIÓN_ENTERAL_1L", "bolsa-nutricion-enteral-1000ml", "Bolsa de alimentación enteral 1000 mL"),
    ("BOLSAS PARA EMESIS", "bolsa-emesis", "Bolsa para emesis / vómito"),
    ("LIMPIADOR_PUNTAS_ELECTROCAUTERIO", "limpiador-puntas-electrocauterio", "Limpiador de puntas de electrocauterio"),
    ("Marcador_de_Piel_REV", "marcador-piel-esteril", "Marcador de piel estéril desechable Q-MEDICAL"),
    ("Q_MEDICAL_Paño_Clínico", "pano-clinico-qmedical", "Paño clínico súper absorbente Q-MEDICAL"),
    ("SET_DE_ALIMENTACIÓN_ENTERAL", "set-alimentacion-enteral", "Set de alimentación enteral con rosca para frasco"),
    ("TOALLAS PARA SECADO CORPORAL", "toalla-secado-corporal", "Toalla para secado corporal Q-MEDICAL"),
    ("YANKAUER_F30A18", "tubo-succion-esteril-1-8mm", "Tubo de succión estéril F30A18 — 1.8 mm"),
    ("YANKAUER_F30A30", "tubo-succion-esteril-3mm", "Tubo de succión estéril F30A30 — 3 mm"),
    ("SILPAK_MANGUERAS", "tubuladura-silicona-silpak", "Mangueras / tubuladuras de silicona SILPAK"),
    ("HEFEI Paño_Clínico", "pano-clinico-telijie", "Paño clínico absorbente TELIJIE"),
    ("XODUS MARCADOR_ASEPTICO", "marcador-piel-no-esteril-xodus", "Marcador quirúrgico no estéril XODUS"),
    ("XODUS_MANTAS ABSORBENTES", "manta-absorbente-xodus", "Manta absorbente antideslizante The Camel — XODUS"),
]


def main():
    if not os.path.isdir(FICHAS):
        sys.exit("No se encontro la carpeta de fichas: %s" % FICHAS)
    if os.path.isdir(OUT):
        shutil.rmtree(OUT)
    os.makedirs(OUT)

    originals = []
    for dp, _dn, fn in os.walk(FICHAS):
        for f in sorted(fn):
            if f.lower().endswith(".pdf"):
                originals.append(os.path.join(dp, f))

    index = {}
    used = set()
    for frag, dest, title in MAP:
        match = next((p for p in originals
                      if frag in os.path.basename(p) and p not in used), None)
        if match is None:
            if dest not in index:
                print("  !! sin PDF para %-46s (%s)" % (dest, frag))
            continue
        used.add(match)
        shutil.copy2(match, os.path.join(OUT, dest + ".pdf"))
        index[dest] = {
            "titulo": title,
            "archivo": "/fichas-tecnicas/%s.pdf" % dest,
            "peso": round(os.path.getsize(match) / 1024),
        }
        print("  %-46s %5d KB" % (dest, index[dest]["peso"]))

    faltan = [p for p in originals if p not in used]
    for p in faltan:
        print("  !! PDF sin mapear: %s" % os.path.relpath(p, FICHAS))

    with open(os.path.join(ROOT, "src", "data", "fichas.json"), "w",
              encoding="utf-8") as fh:
        json.dump(index, fh, ensure_ascii=False, indent=1, sort_keys=True)
    print("\n%d fichas copiadas de %d PDF originales" % (len(index), len(originals)))


if __name__ == "__main__":
    main()
