# -*- coding: utf-8 -*-
"""
Copia a src/icons/ los SVG de Tabler Icons que usa el sitio, con su nombre
semántico, y les quita lo que no necesitamos: el <svg> exterior, las clases
del paquete y el rectángulo transparente de guarda que Tabler añade al inicio
de cada icono (rompería el trazado animado y añadiría una forma fantasma).

Tabler Icons — MIT © Paweł Kuna — https://tabler.io/icons

Uso:  npm i -D @tabler/icons && python scripts/copiar_iconos.py
"""
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

    print('%d iconos copiados a src/icons/' % (len(MAPA) - len(faltan)))
    for f in faltan:
        print('  !! no encontrado: %s' % f)
    if faltan:
        sys.exit(1)


if __name__ == '__main__':
    main()
