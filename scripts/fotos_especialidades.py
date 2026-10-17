# -*- coding: utf-8 -*-
"""
Optimiza las fotografías de las especialidades clínicas.

Se usan en dos sitios: el panel de especialidades de la portada (foto grande
y miniatura de la lista) y las seis tarjetas de «Quiénes somos».

La entrega vigente es la de octubre de 2026 —«Nuevas fotos WEB QM /
Especialidades clínicas»—: originales cuadrados de 2048 px, salvo
Enfermería, de 1086. La anterior era de unos 500 px y obligaba a no pasar de
480; con estas hay material para un 960, que es lo que pide el panel en una
pantalla de densidad doble.

Salen a una carpeta con fecha, no encima de las anteriores: /img/ se sirve
con caché inmutable de un año, y un archivo que conserva su nombre no vuelve
a pedirse. Las plantillas toman la carpeta de `src/data/especialidades.ts`
(CARPETA_FOTOS), así que una entrega nueva es cambiar la fecha en los dos
sitios.

Se recortan a cuadrado, se componen sobre blanco —el alfa no aporta nada y
pesa— y se exportan en WebP.

Uso:  python scripts/fotos_especialidades.py
"""
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

from PIL import Image  # noqa: E402

from optimize_images import OUT, save_webp  # noqa: E402

ORIGEN = (r"C:\Users\LUIGI\Desktop\QMEDICAL\nuevas observaciones"
          r"\Nuevas fotos WEB QM\Especialidades clínicas")

# El nombre del archivo que entregó la empresa → el slug de la especialidad.
MAPA = {
    "Cirugía laparoscópica.png": "cirugia-laparoscopica",
    "Bioseguridad.png": "bioseguridad",
    "Foto Antisepsia.png": "antisepsia",
    "Nutrición enteral.png": "nutricion-enteral",
    "Anestiología y vía aérea.jpg": "anestesiologia",
    "Enfermería.png": "enfermeria",
}

CARPETA = "especialidades/2026-10"
ANCHOS = (960, 480, 160)   # panel en densidad doble, panel y miniatura
P = os.path.join


def cuadrar(im):
    """Recorta al cuadrado por el centro.

    Vienen cuadradas, pero una entrega anterior llegó de 497x504, y un marco
    cuadrado con una imagen así deforma o deja franja."""
    lado = min(im.size)
    izq = (im.width - lado) // 2
    arr = (im.height - lado) // 2
    return im.crop((izq, arr, izq + lado, arr + lado))


def main():
    destino = P(OUT, CARPETA)
    os.makedirs(destino, exist_ok=True)

    for archivo, slug in MAPA.items():
        ruta = P(ORIGEN, archivo)
        if not os.path.exists(ruta):
            print("  !! FALTA %s" % ruta)
            return 1

        im = Image.open(ruta)
        if im.mode in ("RGBA", "LA", "P"):
            im = im.convert("RGBA")
            fondo = Image.new("RGBA", im.size, (255, 255, 255, 255))
            fondo.alpha_composite(im)
            im = fondo
        im = cuadrar(im.convert("RGB"))

        for w in ANCHOS:
            w = min(w, im.width)
            save_webp(im.resize((w, w), Image.LANCZOS),
                      P(destino, "%s-%d.webp" % (slug, w)), 80)
        print("  %-26s %d px de origen" % (slug, im.width))

    total = sum(
        os.path.getsize(P(destino, f)) for f in os.listdir(destino) if f.endswith(".webp")
    )
    print("Listo: %d fotografías, %.0f KB en total" % (len(MAPA), total / 1024))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
