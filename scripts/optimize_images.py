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
import hashlib
import io
import json
import os
import shutil
import sys
import unicodedata

from PIL import Image, ImageChops, ImageDraw, ImageFilter

Image.MAX_IMAGE_PIXELS = None

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(
    os.path.dirname(ROOT), "Q-MEDICAL - Web")
OUT = os.path.join(ROOT, "public", "img")

P = os.path.join
CAT = P(SRC, "Fotos catálogo")
CAT26 = P(SRC, "Catalogo 2026")
FOT = P(SRC, "Fotos")
RETOCADAS = P(SRC, "fotos retocadas", "Editadas")
LOGOS = P(SRC, "Logos marcas asociadas")
INSTITUCIONES = P(SRC, "Logos instituciones")
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


def despegar_fondo(im, umbral=12):
    """Vuelve transparente el fondo liso de una imagen opaca.

    Los originales del catalogo llegan casi todos en PNG recortado, y se
    apoyan sobre la tarjeta blanca sin que se note su caja. Los que llegan en
    JPEG traen un fondo que casi nunca es blanco puro —el de la tubuladura de
    silicona es (247, 247, 247)— y se publicaban como un rectangulo gris
    visible en medio de la tarjeta.

    Se inunda desde las cuatro esquinas y no por color: asi solo desaparece el
    fondo que toca el borde. Importa porque estos productos son casi tan
    claros como su fondo —la silicona es color crema— y un umbral aplicado a
    toda la imagen se comeria el producto.

    Solo actua cuando el fondo es claro y uniforme en las cuatro esquinas. Con
    cualquier otra cosa devuelve la imagen intacta: una foto de ambiente no
    tiene por que perder su fondo.
    """
    if im.mode != "RGBA":
        im = im.convert("RGBA")
    if im.getchannel("A").getextrema()[0] < 255:
        return im                                   # ya trae transparencia

    rgb = im.convert("RGB")
    esquinas = [rgb.getpixel(q) for q in
                ((0, 0), (rgb.width - 1, 0), (0, rgb.height - 1), (rgb.width - 1, rgb.height - 1))]
    if min(min(c) for c in esquinas) < 230:
        return im                                   # el fondo no es claro
    if max(max(c) - min(c) for c in zip(*esquinas)) > 6:
        return im                                   # las esquinas no coinciden

    CENTINELA = (255, 0, 255)
    marca = rgb.copy()
    for q in ((0, 0), (marca.width - 1, 0), (0, marca.height - 1), (marca.width - 1, marca.height - 1)):
        ImageDraw.floodfill(marca, q, CENTINELA, thresh=umbral)

    # Opaco donde el relleno NO llego. El desenfoque de medio pixel suaviza el
    # borde: sin el, el recorte queda dentado sobre el blanco de la tarjeta.
    fuera = ImageChops.difference(marca, Image.new("RGB", marca.size, CENTINELA))
    alfa = fuera.convert("L").point(lambda v: 0 if v < 8 else 255)
    alfa = alfa.filter(ImageFilter.GaussianBlur(0.6))
    im = im.copy()
    im.putalpha(alfa)
    return im


def trim(im, pad_ratio=0.03):
    """Recorta el margen vacio (transparente o blanco) y anade un padding."""
    if im.mode != "RGBA":
        im = im.convert("RGBA")
    alpha = im.getchannel("A")
    box = alpha.point(lambda v: 255 if v > 8 else 0).getbbox()
    # Un JPEG llega opaco entero, de modo que su caja alfa es la imagen
    # completa y no recortaba nada: el producto quedaba pequeno dentro de su
    # marco, con mucho blanco alrededor, mientras los PNG con transparencia
    # de al lado si se ajustaban. Cuando la alfa no dice nada util se busca
    # el margen por diferencia contra el blanco.
    inutil = box is None or box == (0, 0, im.width, im.height)
    if inutil or (box[2] - box[0]) < im.width * 0.02:
        rgb = im.convert("RGB")
        bg = Image.new("RGB", rgb.size, (255, 255, 255))
        blanco = ImageChops.difference(rgb, bg).convert("L").point(
            lambda v: 255 if v > 10 else 0).getbbox()
        if blanco:
            box = blanco
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
    """Exporta la foto de un producto, con un resumen del contenido en el
    nombre.

    Todo /img/ se sirve con Cache-Control immutable a un ano. Cambiar la foto
    de un producto conservando el nombre no llegaria a ningun navegador que ya
    la tuviera: hay que cambiar la URL. La huella lo hace solo, y cuando la
    foto no cambia el nombre tampoco, asi que no se reescribe medio catalogo
    en cada pasada.

    Las plantillas no se enteran de nada: las rutas de producto salen todas
    del manifiesto (manifest.productos), nunca escritas a mano.
    """
    im = trim(despegar_fondo(Image.open(src_path).convert("RGBA")))
    # La huella sale de la imagen ya recortada y a su tamano final, no del
    # archivo de origen: reexportar el mismo original no cambia la URL, y dos
    # originales que acaban en la misma imagen la comparten.
    base = square(im, sizes[0])
    huella = hashlib.sha256(base.tobytes()).hexdigest()[:8]
    written = []
    for s in sizes:
        suffix = "" if s == sizes[0] else "-%d" % s
        rel = "productos/%s-%d-%s%s.webp" % (slug, index, huella, suffix)
        save_webp(base if s == sizes[0] else square(im, s), P(OUT, rel), 84)
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
# Fotografias del catalogo 2026, una por presentacion.
#
# El orden importa: manifest["productos"][slug][i] es la foto de la
# presentacion i del producto, de modo que la galeria de la ficha y la
# lista de presentaciones van siempre emparejadas.
#
# Las presentaciones sin foto llevan una cadena vacia para no descolocar
# ese emparejamiento; el guion las salta y la ficha muestra el hueco.
PRODUCTS = {
    "contenedores-punzocortantes": [
        P(CAT26, "1. BIOSEGURIDAD/CONTENEDORES DE BIOSEGURIDAD/CONTENEDORES DE BIOSEGURIDAD PARA PUNZOCORTANTES - MA1112 - 0.95L.png"),
        P(CAT26, "1. BIOSEGURIDAD/CONTENEDORES DE BIOSEGURIDAD/CONTENEDORES DE BIOSEGURIDAD PARA PUNZOCORTANTES - MA1122 - 1.89L.png"),
        P(CAT26, "1. BIOSEGURIDAD/CONTENEDORES DE BIOSEGURIDAD/CONTENEDORES DE BIOSEGURIDAD PARA PUNZOCORTANTES - MA1212 - 4.7L.png"),
        P(CAT26, "1. BIOSEGURIDAD/CONTENEDORES DE BIOSEGURIDAD/CONTENEDORES DE BIOSEGURIDAD PARA PUNZOCORTANTES - ME1282 - 7.6L.png"),
        P(CAT26, "1. BIOSEGURIDAD/CONTENEDORES DE BIOSEGURIDAD/CONTENEDORES DE BIOSEGURIDAD PARA PUNZOCORTANTES - MA1331 - 11.4L.png"),
        P(CAT26, "1. BIOSEGURIDAD/CONTENEDORES DE BIOSEGURIDAD/CONTENEDORES DE BIOSEGURIDAD PARA PUNZOCORTANTES - MA 1341 - 22.7L.png"),
        P(CAT26, "1. BIOSEGURIDAD/CONTENEDORES DE BIOSEGURIDAD/CONTENEDORES DE BIOSEGURIDAD PARA PUNZOCORTANTES - MA1352 - 30.3L.png"),
    ],
    "contenedores-residuos-citotoxicos": [
        P(CAT26, "1. BIOSEGURIDAD/CONTENEDORES DE BIOSEGURIDAD/CONTENEDORES PARA RESIDUOS CITOTÓXICOS  - MC1311 3.8 L.png"),
        P(CAT26, "1. BIOSEGURIDAD/CONTENEDORES DE BIOSEGURIDAD/CONTENEDORES PARA RESIDUOS CITOTÓXICOS  - MC 1321 - 7.6L.png"),
        P(CAT26, "1. BIOSEGURIDAD/CONTENEDORES DE BIOSEGURIDAD/CONTENEDORES PARA RESIDUOS CITOTÓXICOS  - MC1351 - 30.3 L-37.png"),
    ],
    "contenedores-residuos-vidrio": [
        P(CAT26, "1. BIOSEGURIDAD/CONTENEDORES DE BIOSEGURIDAD/CONTENEDORES PARA RESIDUOS DE VIDRIOS O ESPECIALES - MV1311 - 3.8 L.png"),
        P(CAT26, "1. BIOSEGURIDAD/CONTENEDORES DE BIOSEGURIDAD/CONTENEDORES PARA RESIDUOS DE VIDRIOS O ESPECIALES - MC1321 - 7.6 L.png"),
        P(CAT26, "1. BIOSEGURIDAD/CONTENEDORES DE BIOSEGURIDAD/CONTENEDORES PARA RESIDUOS DE VIDRIOS O ESPECIALES - MC1351 - 30.3 L-40.png"),
    ],
    "tapete-adhesivo-descontaminante": [
        P(CAT26, "1. BIOSEGURIDAD/TAPETE ADHESIVO DESCONTAMINANTE/TAPETE ADHESIVO DESCONTAMINANTE 36_ X 45_ - Q-MEDICAL.png"),
    ],
    "trocar-para-cirugia-laparoscopica": [
        P(CAT26, "2. INSTRUMENTAL PARA CIRUGÍA LAPAROSCÓPICA/TROCAR PARA CIRUGÍA LAPAROSCÓPICA/TROCAR PARA CIRUGÍA LAPAROSCÓPICA 5 MM - GEYI.png"),
        P(CAT26, "2. INSTRUMENTAL PARA CIRUGÍA LAPAROSCÓPICA/TROCAR PARA CIRUGÍA LAPAROSCÓPICA/TROCAR PARA CIRUGÍA LAPAROSCÓPICA 10 MM - GEYI.png"),
        P(CAT26, "2. INSTRUMENTAL PARA CIRUGÍA LAPAROSCÓPICA/TROCAR PARA CIRUGÍA LAPAROSCÓPICA/TROCAR PARA CIRUGÍA LAPAROSCÓPICA 12 MM - GEYI.png"),
        P(CAT26, "2. INSTRUMENTAL PARA CIRUGÍA LAPAROSCÓPICA/TROCAR PARA CIRUGÍA LAPAROSCÓPICA/TROCAR PARA CIRUGÍA LAPAROSCÓPICA KIT A - GEYI.png"),
        P(CAT26, "2. INSTRUMENTAL PARA CIRUGÍA LAPAROSCÓPICA/TROCAR PARA CIRUGÍA LAPAROSCÓPICA/TROCAR PARA CIRUGÍA LAPAROSCÓPICA KIT B - GEYI.png"),
        P(CAT26, "2. INSTRUMENTAL PARA CIRUGÍA LAPAROSCÓPICA/TROCAR PARA CIRUGÍA LAPAROSCÓPICA/TROCAR PARA CIRUGÍA LAPAROSCÓPICA KIT C - GEYI.png"),
    ],
    "disector-monopolar-maryland": [
        P(CAT26, "2. INSTRUMENTAL PARA CIRUGÍA LAPAROSCÓPICA/PINZAS PARA CIRUGÍA LAPAROSCÓPICA/DISECTOR MONOPOLAR DESECHABLE - GRASPER - KANGJI.png"),
    ],
    "pinza-agarre-clinch": [
        P(CAT26, "2. INSTRUMENTAL PARA CIRUGÍA LAPAROSCÓPICA/PINZAS PARA CIRUGÍA LAPAROSCÓPICA/PINZA DE AGARRE O TENAZA MONOPOLAR DESECHABLE - CLINCH - KANGJI.png"),
    ],
    "pinza-agarre-fenestrated-grasper": [
        P(CAT26, "2. INSTRUMENTAL PARA CIRUGÍA LAPAROSCÓPICA/PINZAS PARA CIRUGÍA LAPAROSCÓPICA/PINZA DE AGARRE O TENAZA MONOPOLAR DESECHABLE - FENESTRATED GRASPER - KANGJI.png"),
    ],
    "tijeras-monopolares-curved-scissor": [
        P(CAT26, "2. INSTRUMENTAL PARA CIRUGÍA LAPAROSCÓPICA/PINZAS PARA CIRUGÍA LAPAROSCÓPICA/TIJERAS MONOPOLARES DESECHABLES - CURVED SCISSOR - KANGJI.png"),
    ],
    "bolsa-aspiracion-secreciones": [
        P(CAT26, "3. ASPIRACIÓN/BOLSAS DE ASPIRACIÓN/BOLSA DE ASPIRACIÓN DE SECRECIONES CON VÁLVULA Y FILTRO ANTIBACTERIANO 1 L - Vide_Alleva Medical.png"),
        P(CAT26, "3. ASPIRACIÓN/BOLSAS DE ASPIRACIÓN/BOLSA DE ASPIRACIÓN DE SECRECIONES CON VÁLVULA Y FILTRO ANTIBACTERIANO 1.5 L - Vide_Alleva Medical.png"),
        P(CAT26, "3. ASPIRACIÓN/BOLSAS DE ASPIRACIÓN/BOLSA DE ASPIRACIÓN DE SECRECIONES CON VÁLVULA Y FILTRO ANTIBACTERIANO 3 L - Vide_Alleva Medical.png"),
        P(CAT26, "3. ASPIRACIÓN/BOLSAS DE ASPIRACIÓN/BOLSA DE ASPIRACIÓN DE SECRECIONES CON VÁLVULA Y FILTRO ANTIBACTERIANO 1.5 L - QUICK FIT_BEMIS.png"),
        P(CAT26, "3. ASPIRACIÓN/BOLSAS DE ASPIRACIÓN/BOLSA DE ASPIRACIÓN DE SECRECIONES CON VÁLVULA Y FILTRO ANTIBACTERIANO 3 L - QUICK FIT_BEMIS.png"),
    ],
    "canister-rigido-reusable": [
        P(CAT26, "3. ASPIRACIÓN/ACCESORIOS PARA ASPIRACIÓN/CÁNISTER RÍGIDO REUSABLE/CÁNISTER RÍGIDO REUSABLE 1 L - Vide_Alleva Medical.png"),
        P(CAT26, "3. ASPIRACIÓN/ACCESORIOS PARA ASPIRACIÓN/CÁNISTER RÍGIDO REUSABLE/CÁNISTER RÍGIDO REUSABLE 1.5 L - Vide_Alleva Medical.png"),
        P(CAT26, "3. ASPIRACIÓN/ACCESORIOS PARA ASPIRACIÓN/CÁNISTER RÍGIDO REUSABLE/CÁNISTER RÍGIDO REUSABLE  3 L - Vide_Alleva Medical.png"),
        P(CAT26, "3. ASPIRACIÓN/ACCESORIOS PARA ASPIRACIÓN/CÁNISTER RÍGIDO REUSABLE/CÁNISTER RÍGIDO REUSABLE  1.5 L - QUICK FIT_BEMIS.png"),
        P(CAT26, "3. ASPIRACIÓN/ACCESORIOS PARA ASPIRACIÓN/CÁNISTER RÍGIDO REUSABLE/CÁNISTER RÍGIDO REUSABLE  3 L - QUICK FIT_BEMIS.png"),
    ],
    "coches-rodables": [
        P(CAT26, "3. ASPIRACIÓN/ACCESORIOS PARA ASPIRACIÓN/COCHES RODABLES/COCHE RODABLE  37 cm - Vide_Alleva Medical.png"),
        P(CAT26, "3. ASPIRACIÓN/ACCESORIOS PARA ASPIRACIÓN/COCHES RODABLES/COCHE RODABLE  56 cm - Vide_Alleva Medical.png"),
        P(CAT26, "3. ASPIRACIÓN/ACCESORIOS PARA ASPIRACIÓN/COCHES RODABLES/COCHE RODABLE  106 cm - Vide_Alleva Medical.png"),
    ],
    "placas-de-anclaje-para-pared": [
        P(CAT26, "3. ASPIRACIÓN/ACCESORIOS PARA ASPIRACIÓN/PLACA ANCLAJE PARA PARED/PLACAS DE ANCLAJE PARA PARED - Vide_Alleva Medical.png"),
    ],
    "manifold": [
        P(CAT26, "3. ASPIRACIÓN/ACCESORIOS PARA ASPIRACIÓN/MANIFOLD/MANIFOLD DE 2 VÍAS - Vide_Alleva Medical.png"),
        P(CAT26, "3. ASPIRACIÓN/ACCESORIOS PARA ASPIRACIÓN/MANIFOLD/MANIFOLD DE 4 VÍAS - Vide_Alleva Medical.png"),
    ],
    "tubo-succion-sin-yankauer": [
        P(CAT26, "3. ASPIRACIÓN/TUBOS DE SUCCIÓN ESTÉRIL/TUBO DE SUCCIÓN SIN YANKAUER CON CONECTORES Y ADAPTADOR DE 9-32_ (7 MM) - Q-MEDICAL.png"),
        P(CAT26, "3. ASPIRACIÓN/TUBOS DE SUCCIÓN ESTÉRIL/TUBO DE SUCCIÓN SIN YANKAUER CON CONECTORES Y ADAPTADOR DE 9-32_ (7 MM) - Q-MEDICAL.png"),
    ],
    "manguera-o-tubuladura-de-silicona": [
        P(CAT26, "3. ASPIRACIÓN/MANGUERA O TUBULADURA DE SILICONA/MANGUERA O TUBULADURA DE SILICONA 25 M - SILPAK.png"),
        P(CAT26, "3. ASPIRACIÓN/MANGUERA O TUBULADURA DE SILICONA/MANGUERA O TUBULADURA DE SILICONA 25 M - SILPAK.png"),
        P(CAT26, "3. ASPIRACIÓN/MANGUERA O TUBULADURA DE SILICONA/MANGUERA O TUBULADURA DE SILICONA 25 M - SILPAK.png"),
        P(CAT26, "3. ASPIRACIÓN/MANGUERA O TUBULADURA DE SILICONA/MANGUERA O TUBULADURA DE SILICONA 25 M - SILPAK.png"),
    ],
    # Los aplicadores no llegaron con fotografia: el material de ANTISEPSIA
    # solo trae dos, la del cepillo-esponja y la de la esponja. Van vacias,
    # que es lo que corresponde, y no la del cepillo: tres productos
    # distintos con la misma foto en un catalogo de dispositivos medicos
    # invitan a pedir el que no es.
    "aplicadores-clorhexidina-2": [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
    ],
    "cepillo-esponja-clorhexidina-4": [
        P(CAT26, "4. ANTISEPSIA/CEPILLO ESPONJA CON 20 ML DE GLUCONATO DE CLORHEXIDINA AL 4_/CEPILLO ESPONJA CON 20 ML GLUCONATO DE CLORHEXIDINA AL 4_ - NEX CLOREX C2.png"),
    ],
    "esponja-clorhexidina-2": [
        P(CAT26, "4. ANTISEPSIA/ESPONJA CON GLUCONATO DE CLORHEXIDINA AL 2_ (20 ML)/ESPONJA CON GLUCONATO DE CLORHEXIDINA AL 2_ (20 ML) - NEX CLOREX C2.png"),
    ],
    "toallita-limpieza-piel-clorhexidina": [
        "",
    ],
    "bolsas-de-nutricion-enteral": [
        P(CAT26, "5. NUTRICIÓN ENTERAL/BOLSA DE NUTRICIÓN ENTERAL/BOLSA DE NUTRICIÓN ENTERAL 500 ML - Q-MEDICAL.png"),
        P(CAT26, "5. NUTRICIÓN ENTERAL/BOLSA DE NUTRICIÓN ENTERAL/BOLSA DE NUTRICIÓN ENTERAL 1000 ML - Q-MEDICAL.png"),
    ],
    "set-de-nutricion-enteral": [
        P(CAT26, "5. NUTRICIÓN ENTERAL/SET DE NUTRICIÓN ENTERAL/SET DE NUTRICIÓN ENTERAL - Q-MEDICAL.png"),
    ],
    "bomba-de-nutricion-enteral": [
        P(CAT26, "5. NUTRICIÓN ENTERAL/BOMBA DE NUTRICIÓN ENTERAL/BOMBA DE NUTRICIÓN ENTERAL EP-60 - MEDCAPTAIN.png"),
    ],
    "pano-bano-facil": [
        P(CAT26, "6. HIGIENE DEL PACIENTE/PAÑO BAÑO FÁCIL/PAÑO BAÑO FÁCIL MANZANILLA.png"),
        P(CAT26, "6. HIGIENE DEL PACIENTE/PAÑO BAÑO FÁCIL/PAÑO BAÑO FÁCIL ALOE VERA.png"),
        P(CAT26, "6. HIGIENE DEL PACIENTE/PAÑO BAÑO FÁCIL/PAÑO BAÑO FÁCIL CLORHEXIDINA.png"),
    ],
    "toalla-para-secado-corporal": [
        P(CAT26, "6. HIGIENE DEL PACIENTE/TOALLA SECADO CORPORAL/TOALLA SECADO CORPORAL - Q-MEDICAL.png"),
    ],
    "pano-clinico-absorbente": [
        P(CAT26, "6. HIGIENE DEL PACIENTE/PAÑO CLÍNICO ABSORBENTE/PAÑO CLÍNICO ABSORBENTE - Q-MEDICAL.png"),
        P(CAT26, "6. HIGIENE DEL PACIENTE/PAÑO CLÍNICO ABSORBENTE/PAÑO CLÍNICO ABSORBENTE - HEFEI.png"),
    ],
    "bolsa-emesis": [
        P(CAT26, "6. HIGIENE DEL PACIENTE/BOLSA PARA EMESIS O BOLSA PARA VÓMITO/BOLSA PARA EMESIS O VÓMITO - Q-MEDICAL.png"),
    ],
    "manta-absorbente-de-fluidos-antideslizante": [
        P(CAT26, "7. ABSORBENTE/MANTAS ABSORBENTES DE FLUIDOS/MANTA ABSORBENTE DE FLUIDOS ANTIDESLIZANTE Q101 - HUAXINHONG.png"),
    ],
    "manta-absorbente-de-fluidos-precortada": [
        P(CAT26, "7. ABSORBENTE/MANTAS ABSORBENTES DE FLUIDOS/MANTA ABSORBENTE DE FLUIDOS PRECORTADA Q202 - HUAXINHONG.png"),
    ],
    "mantas-super-absorbentes": [
        P(CAT26, "7. ABSORBENTE/MANTAS ABSORBENTES DE FLUIDOS/MANTAS SÚPER ABSORBENTES IMPERMEABLES Y ANTIDESLIZANTES Q303 - COMFYCLOUD.png"),
    ],
    "protector-tela-impermeable": [
        P(CAT26, "7. ABSORBENTE/PROTECTOR DE TELA PLÁSTICA IMPERMEABLE/PROTECTOR DE TELA PLÁSTICA IMPERMEABLE - MEDISPO.png"),
    ],
    "guantes-nitrilo-sin-polvo": [
        P(CAT26, "8. PROTECCIÓN PERSONAL/GUANTES DE NITRILO SIN POLVO 6.5 GR/GUANTES PARA EXAMEN DESCARTABLES DE NITRILO SIN POLVO 6.5 GR - COMFORT.png"),
        P(CAT26, "8. PROTECCIÓN PERSONAL/GUANTES DE NITRILO SIN POLVO 6.5 GR/GUANTES PARA EXAMEN DESCARTABLES DE NITRILO SIN POLVO 6.5 GR - COMFORT.png"),
        P(CAT26, "8. PROTECCIÓN PERSONAL/GUANTES DE NITRILO SIN POLVO 6.5 GR/GUANTES PARA EXAMEN DESCARTABLES DE NITRILO SIN POLVO 6.5 GR - COMFORT.png"),
        P(CAT26, "8. PROTECCIÓN PERSONAL/GUANTES DE NITRILO SIN POLVO 6.5 GR/GUANTES PARA EXAMEN DESCARTABLES DE NITRILO SIN POLVO 6.5 GR - COMFORT.png"),
    ],
    "marcador-piel-esteril": [
        P(CAT26, "9. MATERIAL MÉDICO NO INSTRUMENTAL/MARCADOR DE PIEL/MARCADOR DE PIEL ESTÉRIL DESECHABLE - Q-MEDICAL.png"),
    ],
    "marcador-piel-no-esteril": [
        P(CAT26, "9. MATERIAL MÉDICO NO INSTRUMENTAL/MARCADOR DE PIEL/MARCADOR QUIRÚRGICO NO ESTÉRIL PARA PIEL - XODUS.png"),
    ],
    "contador-de-aguja-doble-iman": [
        P(CAT26, "9. MATERIAL MÉDICO NO INSTRUMENTAL/CONTADOR DE AGUJA/CONTADOR DE AGUJA DOBLE IMAN 30 RECUENTOS - KANGBAO.png"),
    ],
    "bolsas-para-contar-gasas": [
        P(CAT26, "9. MATERIAL MÉDICO NO INSTRUMENTAL/BOLSAS PARA CONTAR GASAS/BOLSAS PARA CONTAR GASAS - Q-MEDICAL.png"),
    ],
    "limpiador-puntas-electrocauterio": [
        P(CAT26, "9. MATERIAL MÉDICO NO INSTRUMENTAL/LIMPIADOR DE PUNTAS DE ELECTROCAUTERIO/CONTADOR DE PUNTAS DE ELECTROCAUTERIO - Q-MEDICAL.png"),
    ],
    "cepillo-limpieza-instrumental-dental": [
        P(CAT26, "9. MATERIAL MÉDICO NO INSTRUMENTAL/CEPILLOS PARA LIMPIEZA DE INSTRUMENTAL MÉDICO/CEPILLO DE LIMPIEZA DE INSTRUMENTAL MÉDICO TIPO CEPILLO DENTAL - PRCB-01 - Q-MEDICAL.png"),
        P(CAT26, "9. MATERIAL MÉDICO NO INSTRUMENTAL/CEPILLOS PARA LIMPIEZA DE INSTRUMENTAL MÉDICO/CEPILLO DE LIMPIEZA DE INSTRUMENTAL MÉDICO TIPO CEPILLO DENTAL DOBLE CABEZA - PRCB-04 - Q-MEDICAL.png"),
        P(CAT26, "9. MATERIAL MÉDICO NO INSTRUMENTAL/CEPILLOS PARA LIMPIEZA DE INSTRUMENTAL MÉDICO/CEPILLO DE LIMPIEZA DE INSTRUMENTAL MÉDICO TIPO CEPILLO DENTAL - ICB-3 - Q-MEDICAL.png"),
    ],
    "escobilla-nailon-doble-cabeza": [
        P(CAT26, "9. MATERIAL MÉDICO NO INSTRUMENTAL/CEPILLOS PARA LIMPIEZA DE INSTRUMENTAL MÉDICO/ESCOBILLA DE NAILON DOBLE CABEZA EXTREMOS - PRCB - 02 - Q-MEDICAL.png"),
    ],
    "cepillo-nailon-mango-ancho": [
        P(CAT26, "9. MATERIAL MÉDICO NO INSTRUMENTAL/CEPILLOS PARA LIMPIEZA DE INSTRUMENTAL MÉDICO/CEPILLO DE NAILON MANGO ANCHO BLANCO - PRCB-03 - Q-MEDICAL.png"),
    ],
    "videolaringoscopio-vs-10h": [
        P(CAT26, "10. VÍA AÉREA/VIDEOLARINGOSCÓPIO/VIDEOLARINGOSCOPIO VS-10H.png"),
    ],
    "hojas-videolaringoscopio": [
        P(CAT26, "10. VÍA AÉREA/HOJAS DE VIDEOLARINGOSCOPIO/HOJAS DESCARTABLES PARA VIDEOLARINGOSCOPIO.png"),
        P(CAT26, "10. VÍA AÉREA/HOJAS DE VIDEOLARINGOSCOPIO/HOJAS DESCARTABLES PARA VIDEOLARINGOSCOPIO.png"),
        P(CAT26, "10. VÍA AÉREA/HOJAS DE VIDEOLARINGOSCOPIO/HOJAS DESCARTABLES PARA VIDEOLARINGOSCOPIO.png"),
        P(CAT26, "10. VÍA AÉREA/HOJAS DE VIDEOLARINGOSCOPIO/HOJAS DESCARTABLES PARA VIDEOLARINGOSCOPIO.png"),
        P(CAT26, "10. VÍA AÉREA/HOJAS DE VIDEOLARINGOSCOPIO/HOJAS DESCARTABLES PARA VIDEOLARINGOSCOPIO.png"),
    ],
    "bomba-de-infusion-hp-60": [
        P(CAT26, "11. NUTRICIÓN PARENTERAL/BOMBA DE INFUSIÓN/BOMBA DE INFUSIÓN HP-60 - MEDCAPTAIN.png"),
    ],
    "bomba-de-jeringa-hp-30": [
        P(CAT26, "11. NUTRICIÓN PARENTERAL/BOMBA DE JERINGA/BOMBA DE JERINGA - HP-30 - MEDCAPTAIN.png"),
    ],
    "bomba-de-jeringa-hp-tci": [
        P(CAT26, "11. NUTRICIÓN PARENTERAL/BOMBA DE JERINGA/BOMBA DE JERINGA HP TCI - MEDCAPTAIN.png"),
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

    manifest = {"productos": {}, "fotos": {}, "marcas": {}, "clientes": {}}
    total_in = total_out = 0

    print("== Productos ==")
    for slug, sources in PRODUCTS.items():
        rels = []
        for n, src in enumerate(sources, 1):
            if not src:
                rels.append("")          # presentacion sin foto entregada
                continue
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

    print("== Instituciones atendidas ==")
    if os.path.isdir(INSTITUCIONES):
        manifest["clientes"] = {}
        for f in sorted(os.listdir(INSTITUCIONES)):
            if not f.lower().endswith(".png"):
                continue
            src = P(INSTITUCIONES, f)
            total_in += os.path.getsize(src)
            name = os.path.splitext(f)[0]
            # Mas bajos que los de marca: son muchos y van en una retícula.
            rel = emit_logo(src, name, height=88, folder="clientes")
            total_out += sum(os.path.getsize(P(OUT, r)) for r in
                             (rel, rel.replace(".webp", "-1x.webp")))
            manifest["clientes"][name] = rel
        print("  %d logotipos" % len(manifest["clientes"]))

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
