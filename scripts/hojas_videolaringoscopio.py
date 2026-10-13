# -*- coding: utf-8 -*-
"""
Rehace las fotos de un solo producto, sin tocar el resto de public/img.

optimize_images.py vacia y regenera la carpeta entera, lo que en esta
maquina lleva horas; cuando la empresa entrega la foto de un producto —aqui,
las cinco medidas de hoja de videolaringoscopio del 12 de octubre de 2026—
no hace falta rehacer los otros doscientos archivos, que saldrian byte a
byte iguales porque la huella depende solo de la imagen.

Reutiliza emit_product del guion grande, de modo que el recorte, el tamano,
la calidad y la huella son exactamente los mismos. Despues sustituye la
entrada del producto en manifest.json y retira los archivos que quedaron
sin usar.

Uso:  python scripts/hojas_videolaringoscopio.py
"""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

from optimize_images import OUT, PRODUCTS, emit_product  # noqa: E402

SLUG = "hojas-videolaringoscopio"
P = os.path.join


def main():
    manifiesto = P(OUT, "manifest.json")
    with open(manifiesto, encoding="utf-8") as fh:
        manifest = json.load(fh)

    antes = manifest["productos"].get(SLUG, [])
    nuevos = []
    for n, src in enumerate(PRODUCTS[SLUG], start=1):
        if not src:
            nuevos.append("")
            continue
        if not os.path.exists(src):
            print("  !! FALTA %s" % src)
            return 1
        escritos = emit_product(src, SLUG, n)
        print("  %d  %s" % (n, escritos[0]))
        nuevos.append(escritos[0])

    manifest["productos"][SLUG] = nuevos
    with open(manifiesto, "w", encoding="utf-8") as fh:
        json.dump(manifest, fh, ensure_ascii=False, indent=1)

    # Los archivos de la entrega anterior que ya no referencia nadie. Se
    # comprueba contra el manifiesto entero, no contra la lista de antes:
    # dos productos pueden compartir una imagen cuando son la misma foto.
    vivos = set()
    for rels in manifest["productos"].values():
        for rel in rels:
            if rel:
                vivos.add(rel)
                vivos.add(rel.replace(".webp", "-480.webp"))

    for rel in antes:
        if not rel:
            continue
        for candidato in (rel, rel.replace(".webp", "-480.webp")):
            ruta = P(OUT, candidato)
            if candidato not in vivos and os.path.exists(ruta):
                os.remove(ruta)
                print("  retirado  %s" % candidato)

    print("Listo: %d imagenes" % len([x for x in nuevos if x]))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
