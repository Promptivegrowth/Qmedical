# -*- coding: utf-8 -*-
"""
Añade un tamaño mayor a las fotografías de escena, sin tocar las demás.

Las cabeceras y las bandas se sirven a todo el ancho de la ventana, y el
mayor que había era de 1600 px. En una pantalla de 1920 eso ya es estirar la
imagen un 20 %, y encima el acercamiento la lleva otro 14 %: en total casi
un 40 % por encima de su tamaño, que es lo que se ve como una fotografía
blanda y sucia. Los originales miden 4592 px, así que el material está.

Genera `-2400.webp` junto a los que ya existen; los de 1600, 1000 y 640 no se
regeneran porque saldrían idénticos —misma fuente, mismo guion— y solo
ensuciarían el repositorio.

Uso:  python scripts/fotos_grandes.py
"""
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

from optimize_images import OUT, RETOCADAS, INSTALACIONES, emit_photo, preview_raw  # noqa: E402

ANCHO = 2400

# Las que se sirven a sangre —cabeceras de escena, la banda de postulación y
# el pie— llevan además un tamaño para pantallas de densidad doble: ahí la
# demanda real es el ancho de la ventana por dos, y el acercamiento todavía
# le suma algo más. Las de galería no lo necesitan: nunca ocupan el ancho
# entero.
A_SANGRE = {
    "almacen-racks-1",
    "almacen-pasillo-1",
    "almacen-pasillo-2",
    "almacen-nave-2",
    "operario-almacen",
}
ANCHO_SANGRE = 3200

P = os.path.join


def main():
    hechas, saltadas = 0, 0
    for archivo, nombre in INSTALACIONES:
        anchos = [ANCHO] + ([ANCHO_SANGRE] if nombre in A_SANGRE else [])
        faltan = [w for w in anchos
                  if not os.path.exists(P(OUT, "fotos", "%s-%d.webp" % (nombre, w)))]
        if not faltan:
            saltadas += 1
            continue
        origen = P(RETOCADAS, archivo)
        if not os.path.exists(origen):
            print("  !! FALTA %s" % origen)
            return 1
        # Los RAW se revelan igual que en el guion grande.
        fuente = preview_raw(origen) if archivo.lower().endswith(".dng") else origen
        emit_photo(fuente, nombre, widths=tuple(faltan))
        print("  %-28s %s px" % (nombre, ", ".join(str(w) for w in faltan)))
        hechas += 1

    print("Listo: %d nuevas, %d ya estaban" % (hechas, saltadas))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
