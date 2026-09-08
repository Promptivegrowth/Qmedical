# -*- coding: utf-8 -*-
"""
Genera el favicon y los iconos de aplicacion a partir del logotipo corporativo.

Para el formato cuadrado se usa el isotipo (la Q), recortado del logotipo
oficial, en blanco sobre el azul corporativo #152E7F: es el mismo criterio que
la empresa ya aplica hoy en su favicon, y es el unico que resulta legible a
16 px. El logotipo completo se sigue usando sin alterar en la web.

Uso:  python scripts/make_favicons.py [ruta a la carpeta "Q-MEDICAL - Web"]
"""
import base64
import io
import os
import sys

from PIL import Image

Image.MAX_IMAGE_PIXELS = None

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(
    os.path.dirname(ROOT), "Q-MEDICAL - Web")
LOGO = os.path.join(SRC, "Logo Q-Medical", "Logo Q-Medical Blanco.png")
PUB = os.path.join(ROOT, "public")

AZUL = (21, 46, 127)


def isotipo():
    """Recorta la Q del logotipo (la parte superior, sobre la palabra)."""
    im = Image.open(LOGO).convert("RGBA")
    im = im.crop(im.getbbox())
    # La palabra "Q-MEDICAL" ocupa la banda inferior; la Q, la superior.
    alto_q = int(im.height * 0.55)
    q = im.crop((0, 0, im.width, alto_q))
    q = q.crop(q.getbbox())
    return q


def tile(q, size, radio_ratio=0.22, escala=0.66):
    """Compone la Q blanca centrada sobre un cuadrado azul redondeado."""
    from PIL import ImageDraw

    ss = 4  # supermuestreo para que el redondeo quede limpio
    big = size * ss
    fondo = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    mask = Image.new("L", (big, big), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        [0, 0, big - 1, big - 1], radius=int(big * radio_ratio), fill=255)
    fondo.paste(Image.new("RGBA", (big, big), AZUL + (255,)), (0, 0), mask)

    marca = q.copy()
    marca.thumbnail((int(big * escala), int(big * escala)), Image.LANCZOS)
    fondo.alpha_composite(
        marca, ((big - marca.width) // 2, (big - marca.height) // 2))
    return fondo.resize((size, size), Image.LANCZOS)


def main():
    if not os.path.exists(LOGO):
        sys.exit("No se encontro el logotipo: %s" % LOGO)
    q = isotipo()
    print("isotipo recortado:", q.size)

    os.makedirs(PUB, exist_ok=True)

    # PNG para manifest y iOS
    for size, nombre in ((512, "icon-512.png"), (192, "icon-192.png"),
                         (180, "apple-touch-icon.png")):
        tile(q, size).save(os.path.join(PUB, nombre), "PNG", optimize=True)
        print(" ", nombre)

    # ICO clasico (varios tamanos en un solo archivo)
    tile(q, 256).save(os.path.join(PUB, "favicon.ico"), "ICO",
                      sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    print("  favicon.ico")

    # SVG vectorial: rectangulo redondeado + el isotipo embebido como PNG
    buf = io.BytesIO()
    marca = q.copy()
    marca.thumbnail((320, 320), Image.LANCZOS)
    marca.save(buf, "PNG", optimize=True)
    b64 = base64.b64encode(buf.getvalue()).decode("ascii")
    w, h = marca.size
    escala = 320.0  # lienzo interno del SVG
    mw = escala * 0.66
    mh = mw * h / w
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">'
        '<rect width="512" height="512" rx="112" fill="#152E7F"/>'
        '<image href="data:image/png;base64,%s" x="%.1f" y="%.1f" '
        'width="%.1f" height="%.1f"/></svg>'
    ) % (b64, (512 - mw * 512 / escala) / 2, (512 - mh * 512 / escala) / 2,
         mw * 512 / escala, mh * 512 / escala)
    with open(os.path.join(PUB, "favicon.svg"), "w", encoding="utf-8") as fh:
        fh.write(svg)
    print("  favicon.svg (%d KB)" % (len(svg) // 1024))

    # Vista previa para revisar el resultado
    prev = Image.new("RGB", (620, 200), (246, 248, 252))
    x = 20
    for s in (16, 32, 48, 96, 180):
        prev.paste(tile(q, s), (x, (200 - s) // 2), tile(q, s))
        x += s + 26
    prev.paste(tile(q, 140), (x, 30), tile(q, 140))
    prev.save(os.path.join(HERE, "_favicon_preview.png"))
    print("  vista previa: scripts/_favicon_preview.png")


if __name__ == "__main__":
    main()
