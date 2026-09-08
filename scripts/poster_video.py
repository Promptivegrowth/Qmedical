# -*- coding: utf-8 -*-
"""
Extrae el póster de la portada del primer fotograma del video.

Por qué no basta con el atributo `poster` de <video>: el navegador solo lo
puede mostrar cuando ya empezó a descargar el video. Aquí se saca el fotograma
una vez, en tiempo de preparación, y se publica como WebP; así la portada se
ve llena desde el primer pintado, sin haber pedido un solo byte de video.

No hace falta ffmpeg: se abre el video en un Chromium sin ventana, se dibuja
el fotograma en un canvas y se guarda el PNG resultante, que luego Pillow
convierte a WebP en los dos anchos que usa el srcset.

Uso:  python scripts/poster_video.py
"""
import base64
import io as _io
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
VIDEO = os.path.join(ROOT, 'public', 'video', 'hero.mp4')
DESTINO = os.path.join(ROOT, 'public', 'img', 'fotos')

# Segundo del que se toma el fotograma. No se usa 0: muchos videos abren con
# un fundido desde negro, y el póster quedaría oscuro.
INSTANTE = 0.6

# Anchos publicados. El video es de 1280 px: no se amplía, que solo pesaría.
ANCHOS = [1280, 800]


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


def main():
    if not os.path.exists(VIDEO):
        sys.exit('Falta public/video/hero.mp4')

    from PIL import Image

    png = fotograma(VIDEO, INSTANTE)
    img = Image.open(_io.BytesIO(png)).convert('RGB')
    print('fotograma extraido: %dx%d' % img.size)

    os.makedirs(DESTINO, exist_ok=True)
    for ancho in ANCHOS:
        if ancho > img.width:
            continue
        alto = round(img.height * ancho / img.width)
        copia = img.resize((ancho, alto), Image.LANCZOS)
        salida = os.path.join(DESTINO, 'hero-poster-%d.webp' % ancho)
        copia.save(salida, 'WEBP', quality=82, method=6)
        print('  %-28s %4d x %4d  %5.1f KB'
              % (os.path.basename(salida), ancho, alto,
                 os.path.getsize(salida) / 1024))


if __name__ == '__main__':
    main()
