# -*- coding: utf-8 -*-
"""
Prepara el video de la portada y su poster.

    python scripts/video_portada.py <video original>

Hace tres cosas:

  1. Comprime el original. Los videos que entrega la empresa vienen a la tasa
     de la camara —7 Mbps para 720p en el ultimo caso—, que es muchisimo mas
     de lo que necesita un fondo en bucle. Se recomprime a H.264 con CRF y sin
     pista de sonido, porque se reproduce silenciado.

  2. Saca el poster del primer fotograma. El atributo `poster` de <video> solo
     se puede mostrar cuando el navegador ya empezo a descargar el video; aqui
     el fotograma se extrae una vez, en preparacion, y se publica como WebP.
     Asi la portada se ve llena desde el primer pintado, sin haber pedido un
     solo byte de video.

  3. Les pone a los tres archivos un nombre con la huella del contenido y
     anota los nombres en public/video/manifest.json, que es de donde los lee
     la portada.

     Lo tercero no es un adorno. /video/ y /img/ se sirven con cache
     `immutable`: un archivo que conserva su nombre no vuelve a pedirse nunca,
     de modo que reemplazar hero.mp4 dejaria viendo el video viejo a todo el
     que ya hubiera entrado. Con la huella en el nombre, el archivo nuevo es
     una direccion nueva.

No hace falta tener ffmpeg instalado: se usa el que trae imageio-ffmpeg. El
fotograma se saca con un Chromium sin ventana (Playwright).
"""
import base64
import hashlib
import io as _io
import json
import os
import subprocess
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(AQUI)
DESTINO_VIDEO = os.path.join(RAIZ, 'public', 'video')
# El poster vive junto al video y no en public/img: optimize_images.py vacia
# esa carpeta cada vez que se ejecuta, y se llevaba por delante un archivo
# que no es suyo.
DESTINO_POSTER = DESTINO_VIDEO
MANIFIESTO = os.path.join(DESTINO_VIDEO, 'manifest.json')

# Segundo del que se toma el fotograma. No se usa 0: muchos videos abren con
# un fundido desde negro, y el poster quedaria oscuro.
INSTANTE = 0.6

# Anchos publicados del poster. El video es de 1280 px: no se amplia.
ANCHOS = [1280, 800]

# Calidad del video. 26 es el punto en el que un plano de almacen deja de
# mejorar a simple vista y solo empieza a pesar mas.
CRF = 26
ANCHO_MAXIMO = 1280


def ffmpeg():
    import imageio_ffmpeg
    return imageio_ffmpeg.get_ffmpeg_exe()


def comprimir(origen, destino):
    """H.264, sin audio, listo para empezar a reproducirse mientras baja."""
    orden = [
        ffmpeg(), '-y', '-i', origen,
        '-an',                                   # se reproduce silenciado
        '-c:v', 'libx264',
        '-preset', 'slow',
        '-crf', str(CRF),
        '-profile:v', 'main', '-level', '4.0',
        '-pix_fmt', 'yuv420p',                   # compatible con todo
        '-vf', 'scale=%d:-2:flags=lanczos' % ANCHO_MAXIMO,
        # El indice al principio: sin esto el navegador tiene que bajar el
        # archivo entero antes de poder mostrar el primer fotograma.
        '-movflags', '+faststart',
        destino,
    ]
    r = subprocess.run(orden, capture_output=True)
    if r.returncode != 0:
        sys.exit(r.stderr.decode('utf-8', 'replace')[-2000:])


def fotograma(ruta_video, segundo):
    """Devuelve el fotograma como PNG en bytes."""
    from playwright.sync_api import sync_playwright

    datos = open(ruta_video, 'rb').read()
    fuente = 'data:video/mp4;base64,' + base64.b64encode(datos).decode('ascii')

    with sync_playwright() as pw:
        navegador = pw.chromium.launch()
        pagina = navegador.new_page()
        pagina.set_content('<video id="v" muted playsinline></video>')
        b64 = pagina.evaluate(
            """async ([fuente, segundo]) => {
                const v = document.getElementById('v');
                v.src = fuente;
                await new Promise((ok, mal) => {
                  v.onloadeddata = ok;
                  v.onerror = () => mal(new Error('no se pudo leer el video'));
                });
                await new Promise((ok) => { v.onseeked = ok; v.currentTime = segundo; });
                const c = document.createElement('canvas');
                c.width = v.videoWidth;
                c.height = v.videoHeight;
                c.getContext('2d').drawImage(v, 0, 0);
                return c.toDataURL('image/png').split(',')[1];
            }""",
            [fuente, segundo],
        )
        navegador.close()
    return base64.b64decode(b64)


def huella(ruta):
    with open(ruta, 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest()[:8]


def limpiar(carpeta, prefijo, sufijo, conservar):
    """Borra las versiones anteriores, que ya no referencia nadie."""
    for n in os.listdir(carpeta):
        if n.startswith(prefijo) and n.endswith(sufijo) and n not in conservar:
            os.remove(os.path.join(carpeta, n))
            print('  retirado %s' % n)


def main():
    if len(sys.argv) < 2:
        sys.exit('Uso: python scripts/video_portada.py <video original>')
    origen = sys.argv[1]
    if not os.path.exists(origen):
        sys.exit('No existe: %s' % origen)

    os.makedirs(DESTINO_VIDEO, exist_ok=True)
    os.makedirs(DESTINO_POSTER, exist_ok=True)

    temporal = os.path.join(DESTINO_VIDEO, '_nuevo.mp4')
    print('comprimiendo %s …' % os.path.basename(origen))
    comprimir(origen, temporal)

    h = huella(temporal)
    nombre_video = 'hero-%s.mp4' % h
    ruta_video = os.path.join(DESTINO_VIDEO, nombre_video)
    if os.path.exists(ruta_video):
        os.remove(ruta_video)
    os.rename(temporal, ruta_video)

    antes = os.path.getsize(origen) / 1024 / 1024
    ahora = os.path.getsize(ruta_video) / 1024 / 1024
    print('  %-28s %5.2f MB  (antes %5.2f MB, -%d %%)'
          % (nombre_video, ahora, antes, round(100 - ahora * 100 / antes)))

    from PIL import Image
    png = fotograma(ruta_video, INSTANTE)
    img = Image.open(_io.BytesIO(png)).convert('RGB')
    print('fotograma extraido: %dx%d' % img.size)

    posters = {}
    for ancho in ANCHOS:
        if ancho > img.width:
            continue
        alto = round(img.height * ancho / img.width)
        copia = img.resize((ancho, alto), Image.LANCZOS)
        nombre = 'hero-poster-%s-%d.webp' % (h, ancho)
        salida = os.path.join(DESTINO_POSTER, nombre)
        copia.save(salida, 'WEBP', quality=82, method=6)
        posters[str(ancho)] = nombre
        print('  %-28s %4d x %4d  %5.1f KB'
              % (nombre, ancho, alto, os.path.getsize(salida) / 1024))

    limpiar(DESTINO_VIDEO, 'hero', '.mp4', {nombre_video})
    limpiar(DESTINO_POSTER, 'hero-poster', '.webp', set(posters.values()))

    with open(MANIFIESTO, 'w', encoding='utf-8', newline='\n') as f:
        json.dump({'video': 'video/' + nombre_video, 'poster': posters},
                  f, indent=2, ensure_ascii=False)
        f.write('\n')
    print('anotado en public/video/manifest.json')


if __name__ == '__main__':
    main()
