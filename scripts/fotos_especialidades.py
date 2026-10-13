# -*- coding: utf-8 -*-
"""
Optimiza las fotografías de las especialidades clínicas.

La empresa entregó una por servicio, en PNG de unos 500x500 px y con canal
alfa. Aquí se recortan a cuadrado, se componen sobre blanco —el alfa no
aporta nada y pesa— y se exportan en WebP en dos tamaños: el del panel y el
de la miniatura de la lista.

Ojo con el techo: 500 px es lo que hay. Ni el panel de la portada ni las
tarjetas de «nosotros» deben mostrarlas más grandes, o se verán blandas, y
en pantallas de densidad doble el límite real es la mitad. Si la empresa
manda los originales a mayor tamaño, basta con subir ANCHOS y volver a
correr esto.

Uso:  python scripts/fotos_especialidades.py
"""
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

from PIL import Image  # noqa: E402

from optimize_images import OUT, save_webp  # noqa: E402

ORIGEN = r"C:\Users\LUIGI\Desktop\QMEDICAL\imagenes para servicios"

# El nombre del archivo que entregó la empresa → el slug de la especialidad.
# Se mapea a mano porque los archivos vienen sin criterio: «cirujia»,
# «nutrituon», «via aerea».
MAPA = {
    "cirujia.png": "cirugia-laparoscopica",
    "bioseguridad.png": "bioseguridad",
    "Antisepsia.png": "antisepsia",
    "nutrituon.png": "nutricion-enteral",
    "via aerea.png": "anestesiologia",
    "enfermeria.png": "enfermeria",
}

ANCHOS = (480, 160)   # panel y miniatura de la lista
P = os.path.join


def cuadrar(im):
    """Recorta al cuadrado por el centro.

    Vienen casi cuadradas, pero no exactamente, y un marco cuadrado con una
    imagen de 497x504 deforma o deja franja."""
    lado = min(im.size)
    izq = (im.width - lado) // 2
    arr = (im.height - lado) // 2
    return im.crop((izq, arr, izq + lado, arr + lado))


def main():
    destino = P(OUT, "especialidades")
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
