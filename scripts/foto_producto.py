# -*- coding: utf-8 -*-
"""
Cambia la foto de una presentación, sin tocar el resto de public/img.

Hace lo mismo que hojas_videolaringoscopio.py pero para una sola foto y
cualquier producto: reutiliza emit_product del guion grande —mismo recorte,
tamaño, calidad y huella en el nombre—, la anota en manifest.json en la
posición de la presentación y retira el archivo anterior si ya no lo usa
nadie.

Recuerde que en producción la foto la sirve el portal: después de desplegar,
corra desde el panel `node scripts/sincronizar-fotos.mjs <ruta a
qmedical-web> --aplicar`.

Uso:  python scripts/foto_producto.py <slug> <n.º de presentación, desde 1> <archivo>
Ej.:  python scripts/foto_producto.py mantas-super-absorbentes 1 "foto faltante.jpeg"
"""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

from optimize_images import OUT, emit_product  # noqa: E402

P = os.path.join


def main():
    if len(sys.argv) != 4:
        print(__doc__)
        return 1
    slug, n, origen = sys.argv[1], int(sys.argv[2]), sys.argv[3]
    if not os.path.exists(origen):
        print("  !! FALTA %s" % origen)
        return 1

    ruta = P(OUT, "manifest.json")
    manifest = json.load(open(ruta, encoding="utf-8"))
    fotos = manifest["productos"].get(slug)
    if fotos is None or n > len(fotos):
        print("  !! %s no tiene una presentación %d en el manifiesto" % (slug, n))
        return 1

    anterior = fotos[n - 1]
    nueva = emit_product(origen, slug, n)[0]
    fotos[n - 1] = nueva
    json.dump(manifest, open(ruta, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print("  %s · %d  →  %s" % (slug, n, nueva))

    vivos = {r for rels in manifest["productos"].values() for r in rels if r}
    if anterior and anterior != nueva and anterior not in vivos:
        for c in (anterior, anterior.replace(".webp", "-480.webp")):
            if os.path.exists(P(OUT, c)):
                os.remove(P(OUT, c))
                print("  retirado  %s" % c)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
