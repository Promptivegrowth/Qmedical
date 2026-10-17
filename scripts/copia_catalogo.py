# -*- coding: utf-8 -*-
"""
Rehace la copia local del catálogo a partir del portal.

El sitio publica el catálogo que la empresa administra en el portal del Grupo
Pacheco; `src/data/catalogo-local.ts` es el respaldo que se usa si la base no
responde al compilar. Si el respaldo se queda atrás, una caída de la base
publicaría un catálogo viejo —por ejemplo, con las marcas que la empresa ya
retiró—. Esto lo pone al día:

  · reescribe las listas `categorias` y `productos` de catalogo-local.ts
    (las líneas no se tocan: llevan sus iconos y no cambian con el portal);
  · reescribe `productos` en public/img/manifest.json, la foto de cada
    presentación en el mismo orden;
  · añade a `caracteristicasEn` de src/i18n/productos-en.ts las líneas que
    traiga el portal traducidas y que la copia todavía no tenga.

Lee solo lo visible, con la clave pública: lo mismo que ve la web.

Uso:  python scripts/copia_catalogo.py
"""
import json
import os
import re
import urllib.request

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join
BASE = 'https://youlxcpbffsvokhygubh.supabase.co/rest/v1'
CLAVE = 'sb_publishable_ldYnYlLuvA4fVu8Hnlh-nw_M2C2Hkui'   # pública por diseño


def pedir(ruta):
    req = urllib.request.Request(BASE + '/' + ruta, headers={'apikey': CLAVE})
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read().decode('utf-8'))


def ts(v):
    """Literal TypeScript de una cadena, con comillas simples."""
    return "'" + v.replace('\\', '\\\\').replace("'", "\\'") + "'"


def main():
    comun = 'empresa_id=eq.qmedical&visible=is.true&order=orden.asc'
    lineas = pedir('catalogo_lineas?select=id,slug&' + comun)
    cats = pedir('catalogo_categorias?select=id,slug,nombre,linea_id&' + comun)
    prods = pedir(
        'catalogo_productos?select=slug,nombre,descripcion,destacado,categoria_id,'
        'catalogo_presentaciones(medida,marca,marca_slug,unidad,caracteristicas,'
        'caracteristicas_en,detalle,detalle_en,descripcion,imagen,orden,visible)&' + comun)
    slug_linea = {l['id']: l['slug'] for l in lineas}
    cat_de = {c['id']: c for c in cats}

    # El orden de la web: por línea, luego por categoría, luego por producto.
    orden_cat = {c['id']: i for i, c in enumerate(sorted(
        cats, key=lambda c: [l['id'] for l in lineas].index(c['linea_id'])))}
    prods.sort(key=lambda p: orden_cat.get(p['categoria_id'], 999))

    out_c = ['export const categorias: Categoria[] = [']
    for c in sorted(cats, key=lambda c: orden_cat[c['id']]):
        out_c.append('  { slug: %s, nombre: %s, linea: %s },' % (
            ts(c['slug']), ts(c['nombre']), ts(slug_linea[c['linea_id']])))
    out_c.append('];')

    out_p = ['export const productos: Producto[] = [']
    fotos, traduccion = {}, {}
    for p in prods:
        c = cat_de[p['categoria_id']]
        pres = sorted((x for x in p['catalogo_presentaciones'] if x['visible']), key=lambda x: x['orden'])
        fotos[p['slug']] = [x['imagen'] or '' for x in pres]
        out_p += ['  {',
                  '    slug: %s,' % ts(p['slug']),
                  '    nombre: %s,' % ts(p['nombre']),
                  '    linea: %s,' % ts(slug_linea[c['linea_id']]),
                  '    categoria: %s,' % ts(c['slug']),
                  '    descripcion: %s,' % ts(p['descripcion'])]
        if p['destacado']:
            out_p.append('    destacado: true,')
        out_p.append('    presentaciones: [')
        for x in pres:
            out_p += ['      {',
                      '        medida: %s,' % ts(x['medida']),
                      '        marca: %s,' % ts(x['marca'])]
            if x['marca_slug']:
                out_p.append('        marcaSlug: %s,' % ts(x['marca_slug']))
            out_p.append('        unidad: %s,' % ts(x['unidad']))
            out_p.append('        caracteristicas: [')
            out_p += ['          %s,' % ts(l) for l in x['caracteristicas']]
            out_p.append('        ],')
            if x['detalle']:
                out_p.append('        detalle: %s,' % ts(x['detalle']))
            if x['descripcion']:
                out_p.append('        descripcion: %s,' % ts(x['descripcion']))
            out_p.append('      },')
            for es, en in zip(x['caracteristicas'], x['caracteristicas_en'] or []):
                if en and en != es:
                    traduccion.setdefault(es, en)
            if x['detalle'] and x['detalle_en']:
                traduccion.setdefault(x['detalle'], x['detalle_en'])
        out_p += ['    ],', '  },']
    out_p.append('];')

    # catalogo-local.ts: se reemplazan las dos listas, nada más.
    ruta = P(RAIZ, 'src', 'data', 'catalogo-local.ts')
    s = open(ruta, encoding='utf-8').read()
    a = s.index('export const categorias: Categoria[] = [')
    b = s.index('export const productos: Producto[] = [')
    s = s[:a] + '\n'.join(out_c) + '\n\n' + s[b:]
    b = s.index('export const productos: Producto[] = [')
    s = s[:b] + '\n'.join(out_p) + '\n'
    open(ruta, 'w', encoding='utf-8').write(s)

    ruta = P(RAIZ, 'public', 'img', 'manifest.json')
    m = json.load(open(ruta, encoding='utf-8'))
    m['productos'] = fotos
    json.dump(m, open(ruta, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)

    ruta = P(RAIZ, 'src', 'i18n', 'productos-en.ts')
    s = open(ruta, encoding='utf-8').read()
    a = s.index('export const caracteristicasEn: Record<string, string> = {')
    b = s.index('\n};', a)
    bloque = s[a:b]
    nuevas = [(es, en) for es, en in sorted(traduccion.items()) if ts(es) + ':' not in bloque]
    if nuevas:
        extra = '\n  /* ── Lista PRODUCTOS 2026 V2 (octubre de 2026) ─────────────────────── */\n'
        extra += '\n'.join('  %s: %s,' % (ts(es), ts(en)) for es, en in nuevas)
        s = s[:b] + extra + s[b:]
        open(ruta, 'w', encoding='utf-8').write(s)

    print('%d categorías, %d productos, %d presentaciones; %d traducciones nuevas' % (
        len(cats), len(prods), sum(len(v) for v in fotos.values()), len(nuevas)))


if __name__ == '__main__':
    main()
