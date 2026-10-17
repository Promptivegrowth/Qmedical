# -*- coding: utf-8 -*-
"""
Fotografías de almacén y logotipos de la entrega de octubre de 2026.

La empresa mandó, junto con sus observaciones, la carpeta «Nuevas fotos WEB
QM». Las especialidades tienen su propio guion (fotos_especialidades.py);
aquí van las otras dos partes:

  · Fotos Almacén 1–5. Reemplazan a las del bloque del compromiso, en la
    portada, y a la galería de infraestructura, en «nosotros». Salen como
    almacen-central-1 … 5, en los anchos de siempre (640, 1000, 1600) y en
    2400 cuando el original lo permite. La 2 llegó de 1485 px y se queda
    ahí: estirarla solo la ablanda.

  · Logos de marcas asociadas. Llegan centrados en lienzos cuadrados de
    hasta 4171 px, con el logotipo ocupando a veces un quinto del ancho:
    servidos así, en el anillo de marcas se veían diminutos, que es lo que
    la empresa señaló («agrandar logos, no se ven»). Se recortan al borde
    del dibujo y salen a marcas/2026-10/, una carpeta nueva por la misma
    razón que las fotos: /img/ se sirve con caché inmutable.

Al terminar rehace src/data/fotos-anchos.json, el índice que leen las
plantillas para no ofrecer en un srcset un tamaño que no existe.

Uso:  python scripts/entrega_octubre.py            todo
      python scripts/entrega_octubre.py --logos    solo los logotipos
"""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

from PIL import Image  # noqa: E402

from optimize_images import OUT, emit_photo, save_webp, trim  # noqa: E402

P = os.path.join
ENTREGA = r"C:\Users\LUIGI\Desktop\QMEDICAL\nuevas observaciones\Nuevas fotos WEB QM"

ALMACEN = {
    "Almacén 1.png": "almacen-central-1",
    "Almacén 2.png": "almacen-central-2",
    "Almacén 3.png": "almacen-central-3",
    "Almacén 4.png": "almacen-central-4",
    "Almacén 5.png": "almacen-central-5",
}
ANCHOS = (640, 1000, 1600, 2400)

# Archivo entregado → slug de la marca en src/data/marcas.ts
LOGOS = {
    "Alleva Medical.png": "alleva-medical",
    "BAÑO FÁCIL.png": "bano-facil",
    "COMFYCLOUD.png": "comfycloud",
    "Comfort Rubber Gloves.png": "comfort-rubber-gloves",
    "GEYI.png": "geyi",
    "JIEHONG.png": "jiehong",
    "Kangbao.png": "kangbao",
    "Longood.png": "longood",
    "MAXCON.png": "maxcon",
    "Medcaptain.png": "medcaptain",
    "Medispo.png": "medispo",
    "NEX MEDICAL.png": "nex-medical",
    "Q-MEDICAL.png": "q-medical",
    "Silpak.png": "silpak",
    "TELIJIE.png": "telijie",
    "Xodus.png": "xodus",
}
CARPETA_LOGOS = "marcas/2026-10"
ALTO_LOGO = 240     # a 2x; la versión -1x es la mitad
ANCHO_MAX = 960     # un logotipo muy apaisado no necesita más: se ve por su alto


def logo(ruta, slug):
    """Recorta el lienzo al borde del dibujo y lo exporta a 2x y 1x.

    El tope de ancho es por Alleva Medical: su logotipo es una línea de
    texto finísima, y a 240 px de alto salía de 4324 de ancho y 130 KB,
    para mostrarse luego a unos 200 px."""
    im = trim(Image.open(ruta).convert("RGBA"), pad_ratio=0.0)
    escala = min(ALTO_LOGO / im.height, ANCHO_MAX / im.width)
    for factor, sufijo in ((1, ""), (0.5, "-1x")):
        w = max(1, round(im.width * escala * factor))
        h = max(1, round(im.height * escala * factor))
        save_webp(im.resize((w, h), Image.LANCZOS),
                  P(OUT, CARPETA_LOGOS, "%s%s.webp" % (slug, sufijo)), 90)


def main():
    solo_logos = "--logos" in sys.argv
    for archivo, nombre in ({} if solo_logos else ALMACEN).items():
        ruta = P(ENTREGA, "Fotos Almacén", archivo)
        if not os.path.exists(ruta):
            print("  !! FALTA %s" % ruta)
            return 1
        hechos = emit_photo(ruta, nombre, widths=ANCHOS, quality=78)
        print("  %-20s %s" % (nombre, ", ".join(sorted({h.rsplit('-', 1)[1][:-5] for h in hechos}, key=int))))

    for archivo, slug in LOGOS.items():
        ruta = P(ENTREGA, "Logos marcas asociadas", archivo)
        if not os.path.exists(ruta):
            print("  !! FALTA %s" % ruta)
            return 1
        logo(ruta, slug)
    print("  %d logotipos en %s" % (len(LOGOS), CARPETA_LOGOS))

    # El índice de anchos, leyendo la carpeta: lo que existe, y nada más.
    indice = {}
    carpeta = P(OUT, "fotos")
    for f in sorted(os.listdir(carpeta)):
        if not f.endswith(".webp"):
            continue
        nombre, _, ancho = f[:-5].rpartition("-")
        if nombre and ancho.isdigit():
            indice.setdefault(nombre, []).append(int(ancho))
    for n in indice:
        indice[n] = sorted(set(indice[n]))
    destino = P(os.path.dirname(HERE), "src", "data", "fotos-anchos.json")
    with open(destino, "w", encoding="utf-8") as fh:
        json.dump(indice, fh, ensure_ascii=False, indent=1, sort_keys=True)
    print("Índice: %d fotografías" % len(indice))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
