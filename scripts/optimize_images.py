# -*- coding: utf-8 -*-
"""
Optimiza y redimensiona los archivos originales de Q-MEDICAL hacia public/img.

Los originales (PNG de 4167x4167 px, ~430 MB en total, RAW .RW2 de ~360 MB y
las fotos retocadas, ~66 MB) NO se versionan en el repositorio: solo su
version optimizada en WebP.

Uso:  python scripts/optimize_images.py [ruta a la carpeta "Q-MEDICAL - Web"]
Requiere: pip install pillow

OJO con el orden: este guion vacia public/img entero antes de regenerarlo, y
el poster de la portada no sale de aqui sino del video. Despues de ejecutarlo
hay que volver a generarlo:

    python scripts/optimize_images.py
    python scripts/poster_video.py
"""
import io
import json
import os
import shutil
import sys
import unicodedata

from PIL import Image, ImageChops

Image.MAX_IMAGE_PIXELS = None

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(
    os.path.dirname(ROOT), "Q-MEDICAL - Web")
OUT = os.path.join(ROOT, "public", "img")

P = os.path.join
CAT = P(SRC, "Fotos catálogo")
FOT = P(SRC, "Fotos")
RETOCADAS = P(SRC, "fotos retocadas", "Editadas")
LOGOS = P(SRC, "Logos marcas asociadas")
QLOGO = P(SRC, "Logo Q-Medical")


# --------------------------------------------------------------------------
# utilidades
# --------------------------------------------------------------------------
def slugify(text):
    text = unicodedata.normalize("NFKD", text)
    text = "".join(c for c in text if not unicodedata.combining(c))
    out = []
    for ch in text.lower():
        if ch.isalnum():
            out.append(ch)
        elif out and out[-1] != "-":
            out.append("-")
    return "".join(out).strip("-")


def trim(im, pad_ratio=0.03):
    """Recorta el margen vacio (transparente o blanco) y anade un padding."""
    if im.mode != "RGBA":
        im = im.convert("RGBA")
    alpha = im.getchannel("A")
    box = alpha.point(lambda v: 255 if v > 8 else 0).getbbox()
    if box is None or (box[2] - box[0]) < im.width * 0.02:
        rgb = im.convert("RGB")
        bg = Image.new("RGB", rgb.size, (255, 255, 255))
        box = ImageChops.difference(rgb, bg).convert("L").point(
            lambda v: 255 if v > 10 else 0).getbbox()
    if box:
        im = im.crop(box)
    pad = int(max(im.size) * pad_ratio)
    if pad:
        canvas = Image.new("RGBA", (im.width + pad * 2, im.height + pad * 2),
                           (0, 0, 0, 0))
        canvas.alpha_composite(im, (pad, pad))
        im = canvas
    return im


def square(im, size):
    """Encaja la imagen en un lienzo cuadrado transparente."""
    im = im.copy()
    im.thumbnail((size, size), Image.LANCZOS)
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    canvas.alpha_composite(im, ((size - im.width) // 2, (size - im.height) // 2))
    return canvas


def save_webp(im, path, quality=82):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, "WEBP", quality=quality, method=6)
    return os.path.getsize(path)


def emit_product(src_path, slug, index, sizes=(900, 480)):
    im = trim(Image.open(src_path).convert("RGBA"))
    written = []
    for s in sizes:
        suffix = "" if s == sizes[0] else "-%d" % s
        rel = "productos/%s-%d%s.webp" % (slug, index, suffix)
        save_webp(square(im, s), P(OUT, rel), 84)
        written.append(rel)
    return written


def emit_photo(src, name, widths=(1600, 1000, 640), quality=76):
    im = src if isinstance(src, Image.Image) else Image.open(src)
    if im.mode == "RGBA":
        bg = Image.new("RGBA", im.size, (255, 255, 255, 255))
        bg.alpha_composite(im)
        im = bg
    im = im.convert("RGB")
    written = []
    for w in widths:
        w = min(w, im.width)
        h = round(im.height * w / im.width)
        rel = "fotos/%s-%d.webp" % (name, w)
        save_webp(im.resize((w, h), Image.LANCZOS), P(OUT, rel), quality)
        written.append(rel)
    return written


def emit_logo(src_path, name, height=120, folder="marcas"):
    im = trim(Image.open(src_path).convert("RGBA"), pad_ratio=0.0)
    for scale, suffix in ((2, ""), (1, "-1x")):
        h = height * scale
        w = max(1, round(im.width * h / im.height))
        save_webp(im.resize((w, h), Image.LANCZOS),
                  P(OUT, "%s/%s%s.webp" % (folder, name, suffix)), 90)
    return "%s/%s.webp" % (folder, name)


# --------------------------------------------------------------------------
# mapeo producto -> imagenes de origen (la primera es la principal)
# --------------------------------------------------------------------------
PRODUCTS = {
    "contenedores-punzocortantes": [
        P(CAT, "Maxcon/Contenedor de bioseguridad_Maxcon/Productos Catálogo_MA1212 - 4.7L.png"),
        P(CAT, "Maxcon/Contenedor de bioseguridad_Maxcon/Productos Catálogo_MA1112 - 0.95L.png"),
        P(CAT, "Maxcon/Contenedor de bioseguridad_Maxcon/Productos Catálogo_MA1122 - 1.89L.png"),
        P(CAT, "Maxcon/Contenedor de bioseguridad_Maxcon/Productos Catálogo_1024 - 3L.png"),
        P(CAT, "Maxcon/Contenedor de bioseguridad_Maxcon/Productos Catálogo_1033 - 7L.png"),
        P(CAT, "Maxcon/Contenedor de bioseguridad_Maxcon/Productos Catálogo_ME1282 - 7.6L.png"),
        P(CAT, "Maxcon/Contenedor de bioseguridad_Maxcon/Productos Catálogo_MA1331 - 11.4L.png"),
        P(CAT, "Maxcon/Contenedor de bioseguridad_Maxcon/Productos Catálogo_MA 1341 - 22.7L.png"),
        P(CAT, "Maxcon/Contenedor de bioseguridad_Maxcon/Productos Catálogo_MA1352 - 30.3L.png"),
    ],
    "contenedores-citotoxicos": [
        P(CAT, "Maxcon/Contenedores de bioseguridad para desechos tóxicos y especiales_Maxcon/Productos Catálogo_MC1321 - 7.6 L.png"),
        P(CAT, "Maxcon/Contenedores de bioseguridad para desechos tóxicos y especiales_Maxcon/Productos Catálogo_MC1311 3.8 L.png"),
        P(CAT, "Maxcon/Contenedores de bioseguridad para desechos tóxicos y especiales_Maxcon/Productos Catálogo_MC 1321 - 7.6L.png"),
        P(CAT, "Maxcon/Contenedores de bioseguridad para desechos tóxicos y especiales_Maxcon/Productos Catálogo_MC1351 - 30.3 L-37.png"),
        P(CAT, "Maxcon/Contenedores de bioseguridad para desechos tóxicos y especiales_Maxcon/Productos Catálogo_MC1351 - 30.3 L-40.png"),
        P(CAT, "Maxcon/Contenedores de bioseguridad para desechos tóxicos y especiales_Maxcon/Productos Catálogo_MV1311 - 3.8 L.png"),
    ],
    "alfombra-descontaminante": [
        P(CAT, "Q-Medical/Productos Catálogo_Alfombra descontaminante.png"),
    ],
    "aplicador-clorhexidina-2": [
        P(FOT, "1_Mesa de trabajo 1 copia 13.png"),
        P(CAT, "Nex Medical/Productos Catálogo sin fondo_Aplicador Nex Medical 3 mL.png"),
        P(CAT, "Nex Medical/Productos Catálogo sin fondo_Aplicador Nex Medical 10.5 mL.png"),
        P(CAT, "Nex Medical/Productos Catálogo_Aplicador Nex Medical 26 mL.png"),
    ],
    "cepillo-esponja-clorhexidina-4": [
        P(CAT, "Nex Medical/Productos Catálogo_Cepillo Esponja Clorhexidina 4%.png"),
        P(FOT, "Cepillo esponja.png"),
    ],
    "esponja-clorhexidina-2": [
        P(CAT, "Nex Medical/Productos Catálogo_Esponja Clorhexidina 2%.png"),
    ],
    "toallitas-limpieza-piel": [
        P(FOT, "Toallitas Longood.png"),
        P(CAT, "Longood/Productos Catálogo_Toallitas Longood.png"),
    ],
    "trocares-desechables": [
        P(CAT, "Geyi/Productos Catálogo_Trocar rectráctil.png"),
        P(CAT, "Geyi/Productos Catálogo_Trocar retráctil - kit A-4.png"),
        P(CAT, "Geyi/Productos Catálogo_Trocar retráctil - kit B.png"),
        P(CAT, "Geyi/Productos Catálogo_Trocar retráctil - kit C.png"),
    ],
    "bolsas-aspiracion": [
        P(FOT, "1_Mesa de trabajo 1 copia 14.png"),
        P(CAT, "Alleva Medical/Productos Catálogo - Bolsa de aspiración 1000 cc.png"),
        P(CAT, "Alleva Medical/Productos Catálogo sin fondo_Aplicador Nex Medical 3 mL copia.png"),
        P(CAT, "Alleva Medical/Productos Catálogo sin fondo_Trocar rectráctil copia.png"),
    ],
    "canister-reusable": [
        P(FOT, "1_Mesa de trabajo 1 copia 5.png"),
        P(CAT, "Alleva Medical/Productos Catálogo_Cánister 1000 ml.png"),
        P(CAT, "Alleva Medical/Productos Catálogo_Cánister 3000 mL.png"),
        P(CAT, "Alleva Medical/Productos Catálogo_.png"),
    ],
    "accesorios-aspiracion": [
        P(CAT, "Alleva Medical/Accesorios bolsa de aspiración/Productos Catálogo_Soporte 106 cm.png"),
        P(CAT, "Alleva Medical/Accesorios bolsa de aspiración/Productos Catálogo_Soporte 56 cm.png"),
        P(CAT, "Alleva Medical/Accesorios bolsa de aspiración/Productos Catálogo_Soporte 37 cm.png"),
        P(CAT, "Alleva Medical/Accesorios bolsa de aspiración/Productos Catálogo_Placa para pared.png"),
        P(CAT, "Alleva Medical/Accesorios bolsa de aspiración/Productos Catálogo_Manifol de 2.png"),
        P(CAT, "Alleva Medical/Accesorios bolsa de aspiración/Productos Catálogo_Manifol de 4.png"),
    ],
    "tubuladura-succion-esteril": [
        P(CAT, "Q-Medical/Productos Catálogo_Tubuladora de succión esteril.png"),
    ],
    "tubuladura-silicona": [
        P(CAT, "Silpak/Productos Catálogo_TUBULADORA DE SILICONA.png"),
        P(FOT, "1_Mesa de trabajo 1 copia 2.png"),
    ],
    "bomba-nutricion-enteral": [
        P(CAT, "Medcaptain/Bomba de nutricion EP60.png"),
    ],
    "bolsa-nutricion-enteral": [
        P(CAT, "Q-Medical/Productos Catálogo_Bolsa de nutrición.png"),
    ],
    "set-alimentacion-enteral": [
        P(CAT, "Q-Medical/Productos Catálogo_Set de nutrición enteral.png"),
    ],
    "videolaringoscopio": [
        P(CAT, "Medcaptain/Productos Catálogo Video Laringoscopio.png"),
    ],
    "hojas-videolaringoscopio": [
        P(CAT, "Medcaptain/Productos Catálogo_Hojas Video Laringoscopio.png"),
    ],
    "pano-bano-facil": [
        P(FOT, "Baño Fácil.png"),
        P(CAT, "Baño Fácil/Productos Catálogo_BAÑO FÁCIL ALOE VERA.png"),
        P(CAT, "Baño Fácil/Productos Catálogo_BAÑO FÁCIL CLORHEXIDINA.png"),
        P(CAT, "Baño Fácil/Productos Catálogo_BAÑO FÁCIL MANZANILLA.png"),
    ],
    "toalla-secado-corporal": [
        P(CAT, "Q-Medical/Productos Catálogo_Toalla secado corporal.png"),
    ],
    "pano-clinico-qmedical": [
        P(CAT, "Q-Medical/Productos Catálogo_Paño Clínico super absorbente.png"),
    ],
    "pano-clinico-telijie": [
        P(CAT, "Telijie/Productos Catálogo_PAÑO CLÍNICO TELIJIE.png"),
    ],
    "bolsa-vomito": [
        P(CAT, "Q-Medical/Productos Catálogo_Bolsa para vómito.png"),
    ],
    "manta-absorbente-jiehong": [
        P(CAT, "Jiehong/Productos Catálogo_Manta absorbente de fluidos.png"),
        P(CAT, "Jiehong/Productos Catálogo_Manta absorbente de fluidos pre cortada.png"),
    ],
    "manta-absorbente-xodus": [
        P(CAT, "Xodus/Productos Catálogo_Mantas absorbentes de fluidos.png"),
    ],
    "protector-impermeable": [
        P(CAT, "Medispo/Productos Catálogo_Protector impermeable descartable.png"),
    ],
    "marcador-piel-esteril": [
        P(CAT, "Q-Medical/Productos Catálogo_Lapiz Marcador de piel esteril.png"),
    ],
    "marcador-piel-no-esteril": [
        P(CAT, "Xodus/Productos Catálogo_Lápiz marcador de piel no estéril.png"),
    ],
    "limpiador-puntas-electrocauterio": [
        P(CAT, "Q-Medical/Productos Catálogo_Limpiador de punta de electrocautil.png"),
    ],
    "bolsa-conteo-gasas": [
        P(CAT, "Q-Medical/Productos Catálogo_Bolsa contador de gasa.png"),
    ],
    "cepillos-limpieza-instrumental": [
        P(FOT, "Cepillos limpieza instrumental médico.png"),
        P(CAT, "Q-Medical/Productos Catálogo_PRCB-01.png"),
        P(CAT, "Q-Medical/Productos Catálogo_PRCB - 02.png"),
        P(CAT, "Q-Medical/Productos Catálogo_PRCB-03.png"),
        P(CAT, "Q-Medical/Productos Catálogo_PRCB-04.png"),
        P(CAT, "Q-Medical/Productos Catálogo_ICB-3.png"),
    ],
    "guantes-nitrilo": [
        P(CAT, "Comfort Rubber Gloves/Productos Catálogo_Guantes de nitrilo.png"),
    ],
}

# Fotos de instalaciones. Son las retocadas que entrego la empresa y sustituyen
# por completo a la primera tanda, que salia de los RAW .RW2 sin retocar.
#
# El nombre publicado describe el plano, no el numero de archivo de la camara:
# asi se sabe que es cada foto sin abrirla, y cambiar el original manana no
# obliga a renombrar nada en las plantillas.
INSTALACIONES = [
    # Pasillos de racks. Son los planos con mas profundidad, los que aguantan
    # un texto encima y un velo oscuro.
    ("Almacén (2).jpg", "almacen-pasillo-1"),
    ("Almacén (3).jpg", "almacen-pasillo-2"),
    ("Almacén (1).jpg", "almacen-pasillo-3"),
    # Racks de cerca, sin punto de fuga.
    ("Almacén (4).png", "almacen-racks-1"),
    ("Almacén (5).jpg", "almacen-racks-2"),
    # Nave, reveladas de los RAW retocados.
    ("P1360298.dng", "almacen-nave-1"),
    ("P1360323.dng", "almacen-nave-2"),
    # El almacen de la avenida Venezuela: carga paletizada, no racks.
    ("Almacén Venezuela (1).jpg", "almacen-venezuela-1"),
    ("Almacén Venezuela (2).jpg", "almacen-venezuela-2"),
    # La empresa pidio quitar el cartel de salida que asomaba en la pared: se
    # usa la version retocada, no la original, que sigue en la carpeta.
    #
    # El nombre publicado NO puede ser el de la foto anterior. Todo /img/ se
    # sirve con Cache-Control immutable a un ano, de modo que cambiar el
    # contenido de una URL ya visitada no llega a quien ya la tiene: hay que
    # cambiar la URL. De ahi el sufijo.
    ("Almacén Venezuela (3) - sin señalética.jpg", "almacen-venezuela-3-limpia"),
    # El unico plano con figura humana.
    ("Foto operario almacen.png", "operario-almacen"),
]


def preview_raw(path):
    """Extrae el JPEG de mayor resolucion embebido en un RAW.

    Sirve igual para los .RW2 de Panasonic que para los .dng revelados: los
    dos guardan dentro una vista previa JPEG a tamano util, y asi no hace
    falta un revelador RAW para publicar la foto."""
    data = open(path, "rb").read()
    best = None
    i = 0
    while True:
        i = data.find(b"\xff\xd8\xff", i)
        if i < 0:
            break
        j = data.find(b"\xff\xd9", i)
        if j < 0:
            break
        try:
            im = Image.open(io.BytesIO(data[i:j + 2]))
            im.load()
            if best is None or im.width * im.height > best[0]:
                best = (im.width * im.height, im)
        except Exception:
            pass
        i = j + 2
    return best[1] if best else None


def main():
    if not os.path.isdir(SRC):
        sys.exit("No se encontro la carpeta de origen: %s" % SRC)
    if os.path.isdir(OUT):
        shutil.rmtree(OUT)

    manifest = {"productos": {}, "fotos": {}, "marcas": {}}
    total_in = total_out = 0

    print("== Productos ==")
    for slug, sources in PRODUCTS.items():
        rels = []
        for n, src in enumerate(sources, 1):
            if not os.path.exists(src):
                print("  !! FALTA %s" % src)
                continue
            total_in += os.path.getsize(src)
            written = emit_product(src, slug, n)
            total_out += sum(os.path.getsize(P(OUT, r)) for r in written)
            rels.append(written[0])
        manifest["productos"][slug] = rels
        print("  %-34s %d imagen(es)" % (slug, len(rels)))

    print("== Instalaciones ==")
    for archivo, key in INSTALACIONES:
        src = P(RETOCADAS, archivo)
        if not os.path.exists(src):
            print("  !! FALTA %s" % src)
            continue
        total_in += os.path.getsize(src)
        entrada = preview_raw(src) if archivo.lower().endswith(".dng") else src
        if entrada is None:
            print("  !! sin vista previa dentro de %s" % archivo)
            continue
        rels = emit_photo(entrada, key)
        peso = sum(os.path.getsize(P(OUT, r)) for r in rels)
        total_out += peso
        manifest["fotos"][key] = rels[0]
        print("  %-22s <- %-34s %6.1f KB -> %5.1f KB"
              % (key, archivo, os.path.getsize(src) / 1024, peso / 1024))

    print("== Marcas ==")
    for f in sorted(os.listdir(LOGOS)):
        if not f.lower().endswith(".png"):
            continue
        src = P(LOGOS, f)
        total_in += os.path.getsize(src)
        name = slugify(os.path.splitext(f)[0])
        rel = emit_logo(src, name, 120)
        total_out += os.path.getsize(P(OUT, rel))
        manifest["marcas"][name] = rel
        print("  %s" % name)

    print("== Logotipo Q-MEDICAL ==")
    for f, name in (("Logo Q-Medical Azul.png", "qmedical-azul"),
                    ("Logo Q-Medical Blanco.png", "qmedical-blanco"),
                    ("Logo Q-Medical Negro.png", "qmedical-negro")):
        src = P(QLOGO, f)
        if not os.path.exists(src):
            continue
        total_in += os.path.getsize(src)
        im = trim(Image.open(src).convert("RGBA"), pad_ratio=0.0)
        for h, suffix in ((260, ""), (130, "-1x")):
            w = round(im.width * h / im.height)
            total_out += save_webp(im.resize((w, h), Image.LANCZOS),
                                   P(OUT, "logo/%s%s.webp" % (name, suffix)), 92)
        w = round(im.width * 260 / im.height)
        im.resize((w, 260), Image.LANCZOS).save(
            P(OUT, "logo/%s.png" % name), "PNG", optimize=True)
        print("  %s" % name)

    with open(P(OUT, "manifest.json"), "w", encoding="utf-8") as fh:
        json.dump(manifest, fh, ensure_ascii=False, indent=1)

    print("\nOriginales : %8.1f MB" % (total_in / 1048576))
    print("Optimizado : %8.1f MB" % (total_out / 1048576))
    print("Reduccion  : %8.1f %%" % (100 - total_out * 100.0 / total_in))


if __name__ == "__main__":
    main()
