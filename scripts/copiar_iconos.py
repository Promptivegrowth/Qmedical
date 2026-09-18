# -*- coding: utf-8 -*-
"""
Copia a src/icons/ los SVG de Tabler Icons que usa el sitio, con su nombre
semántico, y les quita lo que no necesitamos: el <svg> exterior, las clases
del paquete y el rectángulo transparente de guarda que Tabler añade al inicio
de cada icono (rompería el trazado animado y añadiría una forma fantasma).

Tabler Icons — MIT © Paweł Kuna — https://tabler.io/icons

Uso:  npm i -D @tabler/icons && python scripts/copiar_iconos.py
"""
import io
import os
import re
import shutil
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SRC = os.path.join(ROOT, 'node_modules', '@tabler', 'icons', 'icons', 'outline')
OUT = os.path.join(ROOT, 'src', 'icons')

# nombre semántico del sitio  ->  archivo de Tabler
MAPA = {
    # ── Especialidades clínicas (se muestran a 56–72 px) ──────────────────
    'esp-laparoscopia': 'medical-cross',
    'esp-bioseguridad': 'biohazard',
    'esp-antisepsia': 'hand-sanitizer',
    'esp-nutricion': 'vaccine-bottle',
    'esp-via-aerea': 'lungs',
    'esp-cuidado': 'nurse',

    # ── Líneas de producto ────────────────────────────────────────────────
    'bioseguridad': 'biohazard',
    'antisepsia': 'hand-sanitizer',
    'laparoscopia': 'medical-cross',
    'aspiracion': 'flask-2',
    'nutricion': 'vaccine-bottle',
    'viaAerea': 'lungs',
    'higiene': 'wash',
    'absorbentes': 'stack-2',
    'instrumental': 'tools',
    'proteccion': 'hand-stop',

    # ── Institucional ─────────────────────────────────────────────────────
    'certificado': 'certificate',
    'escudo': 'shield-check',
    'hoja': 'leaf',
    'almacen': 'building-warehouse',
    'entrega': 'truck-delivery',
    'equipo': 'users',
    'documento': 'file-text',
    'descarga': 'download',
    'buscar': 'search',
    'reticula': 'grid-dots',

    # ── Contacto ──────────────────────────────────────────────────────────
    'correo': 'mail',
    'telefono': 'phone',
    'lugar': 'map-pin',
    'reloj': 'clock',
    'whatsapp': 'brand-whatsapp',
    'libro': 'book',

    # ── Interfaz ──────────────────────────────────────────────────────────
    'flecha': 'arrow-right',
    'flechaDiag': 'arrow-up-right',
    'chevron': 'chevron-right',
    'visto': 'check',
    'menu': 'menu-2',
    'cerrar': 'x',
    'mas': 'plus',

    # ── Redes ─────────────────────────────────────────────────────────────
    'facebook': 'brand-facebook',
    'instagram': 'brand-instagram',
    'linkedin': 'brand-linkedin',
    'youtube': 'brand-youtube',
}


ATRIBUCION = '''Tabler Icons
============

Los iconos del sitio provienen de Tabler Icons, con licencia MIT.

  MIT License — Copyright (c) 2020-2026 Pawel Kuna
  https://tabler.io/icons

El paquete @tabler/icons es una dependencia de desarrollo: los SVG que el
sitio usa se copian a src/icons/ con nombre semantico mediante

    python scripts/copiar_iconos.py

y se incrustan en la compilacion. El sitio publicado no descarga nada de
terceros por este concepto.

Los seis iconos de PROPIOS (acreditacion, balanza, hoja-ambiental, brujula,
horizonte, compromiso) NO son de Tabler: estan dibujados para este sitio
sobre la misma reticula de 24 y con el mismo grosor de trazo, para que
convivan con los demas sin desentonar.
'''


# ── Iconos propios ───────────────────────────────────────────────────────
#
# Tabler no tiene una pieza que diga lo que estas seis tienen que decir: una
# acreditacion sanitaria, una norma antisoborno, una ambiental, y los tres
# principios de la empresa. Estan dibujados aqui sobre la reticula de 24 y con
# el mismo grosor, y viven en el guion —no sueltos en la carpeta— porque main()
# vacia src/icons/ en cada pasada y se perderian.
PROPIOS = {
    # Medalla con lazo: la acreditacion de la DIGEMID (BPA).
    'acreditacion':
        '<circle cx="12" cy="9.2" r="5.6" /> '
        '<path d="M9.6 9.3l1.8 1.8l3.2 -3.6" /> '
        '<path d="M8.8 13.9l-1.4 7.1l4.6 -2.4l4.6 2.4l-1.4 -7.1" />',

    # Balanza: la norma antisoborno (ISO 37001) habla de conducta, no de
    # proteccion, asi que un escudo la contaba mal.
    'balanza':
        '<circle cx="12" cy="3.7" r="1.2" /> '
        '<path d="M12 4.9v15.1" /> <path d="M8.4 20h7.2" /> '
        '<path d="M4.6 7.2h14.8" /> '
        '<path d="M4.6 7.2l-2.4 5.4" /> <path d="M4.6 7.2l2.4 5.4" /> '
        '<path d="M2.2 12.6a2.4 2.4 0 0 0 4.8 0" /> '
        '<path d="M19.4 7.2l-2.4 5.4" /> <path d="M19.4 7.2l2.4 5.4" /> '
        '<path d="M17 12.6a2.4 2.4 0 0 0 4.8 0" />',

    # Hoja para la norma ambiental (ISO 14001). Sin nervios secundarios a
    # proposito: con ellos, a 26 px la silueta leia como una pluma.
    'hoja-ambiental':
        '<path d="M6.4 17.6c-.9 -7 3.7 -11.6 11.2 -11.6c.6 7.8 -4.2 12.3 '
        '-11.2 11.6z" /> <path d="M7 17l9 -9" /> <path d="M4 20l3 -3" />',

    # Brujula: la mision es el rumbo.
    'brujula':
        '<circle cx="12" cy="12" r="8.6" /> '
        '<path d="M15.4 8.6l-1.7 5.1l-5.1 1.7l1.7 -5.1z" /> '
        '<path d="M12 1.9v1.6" /> <path d="M12 20.5v1.6" /> '
        '<path d="M1.9 12h1.6" /> <path d="M20.5 12h1.6" />',

    # Sol sobre el horizonte: la vision es a donde se llega.
    'horizonte':
        '<path d="M3.2 18.6h17.6" /> '
        '<path d="M7.2 18.6a4.8 4.8 0 0 1 9.6 0" /> '
        '<path d="M12 4.6v2.6" /> '
        '<path d="M5.9 7.3l1.8 1.8" /> <path d="M18.1 7.3l-1.8 1.8" /> '
        '<path d="M3.4 14.2h2.2" /> <path d="M18.4 14.2h2.2" />',

    # Corazon con linea de pulso: la filosofia, dicha en el lenguaje del
    # sector al que se sirve.
    'compromiso':
        '<path d="M19.6 8.8c0 4.6 -7.6 9.5 -7.6 9.5s-7.6 -4.9 -7.6 -9.5a4.2 '
        '4.2 0 0 1 7.6 -2.4a4.2 4.2 0 0 1 7.6 2.4z" /> '
        '<path d="M4.8 10.6h3l1.4 -2.6l2 5l1.6 -3.2l1 .8h4.6" />',
}


def limpiar(svg: str) -> str:
    """Devuelve solo las formas, sin el <svg> exterior ni la guarda."""
    dentro = re.search(r'<svg[^>]*>(.*)</svg>', svg, re.S)
    cuerpo = dentro.group(1) if dentro else svg
    # Tabler abre cada icono con un rectángulo invisible de 24x24
    cuerpo = re.sub(r'<path\s+stroke="none"[^>]*fill="none"\s*/>', '', cuerpo)
    cuerpo = re.sub(r'\s+', ' ', cuerpo).strip()
    return cuerpo


def main():
    if not os.path.isdir(SRC):
        sys.exit('Falta @tabler/icons. Ejecute: npm i -D @tabler/icons')
    if os.path.isdir(OUT):
        shutil.rmtree(OUT)
    os.makedirs(OUT)

    faltan = []
    for nombre, archivo in MAPA.items():
        origen = os.path.join(SRC, archivo + '.svg')
        if not os.path.exists(origen):
            faltan.append('%s -> %s' % (nombre, archivo))
            continue
        cuerpo = limpiar(open(origen, encoding='utf-8').read())
        with open(os.path.join(OUT, nombre + '.svg'), 'w', encoding='utf-8') as fh:
            fh.write(cuerpo)

    # La carpeta se recrea en cada pasada, asi que la atribucion se vuelve a
    # escribir aqui: si viviera solo en el disco, un `rmtree` la borraria.
    with io.open(os.path.join(OUT, 'LEEME.txt'), 'w', encoding='utf-8') as fh:
        fh.write(ATRIBUCION)

    for nombre, cuerpo in PROPIOS.items():
        with io.open(os.path.join(OUT, nombre + '.svg'), 'w', encoding='utf-8') as fh:
            fh.write(cuerpo)

    print('%d iconos copiados de Tabler y %d propios a src/icons/'
          % (len(MAPA) - len(faltan), len(PROPIOS)))
    for f in faltan:
        print('  !! no encontrado: %s' % f)
    if faltan:
        sys.exit(1)


if __name__ == '__main__':
    main()
