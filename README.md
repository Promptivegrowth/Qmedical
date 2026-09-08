# Q-MEDICAL S.A.C. — Sitio web corporativo

Rediseño completo del sitio de [qmedicalsac.com](https://qmedicalsac.com): droguería
peruana de dispositivos médicos y bioseguridad, certificada en Buenas Prácticas de
Almacenamiento por DIGEMID.

Construido con **Astro 5** y **Tailwind CSS 4**, con salida **100 % estática**: el
mismo `dist/` funciona en Vercel (vía GitHub) y en un hosting compartido de cPanel
sin ningún cambio.

---

## Puesta en marcha

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # genera dist/
npm run preview    # sirve dist/ localmente
```

Requiere Node.js 20 o superior.

---

## Qué incluye

| Sección | Ruta |
| --- | --- |
| Portada con preloader temático | `/` |
| Nosotros, certificaciones e infraestructura | `/nosotros` |
| Catálogo con buscador instantáneo | `/catalogo` |
| 10 líneas de producto | `/catalogo/<linea>` |
| 32 fichas de producto | `/productos/<producto>` |
| 15 marcas asociadas | `/marcas` |
| Biblioteca de 49 fichas técnicas en PDF | `/fichas-tecnicas` |
| Contacto y solicitud de cotización | `/contacto` |
| Libro de Reclamaciones (Ley N.° 29571) | `/libro-de-reclamaciones` |

En total, 51 páginas estáticas más `sitemap-index.xml`, `robots.txt` y `404.html`.

### Detalles de implementación

- **Preloader**: el logotipo corporativo sobre un trazo electrocardiográfico. Aparece
  una sola vez por sesión (`sessionStorage`), se cierra al terminar la carga con un
  tope de seguridad de 4 s y no se muestra con `prefers-reduced-motion` ni sin
  JavaScript.
- **Carrusel de marcas**: desplazamiento continuo en CSS puro, en escala de grises
  que recupera el color al pasar el cursor; se detiene al enfocar o pasar el mouse.
- **Fichas técnicas**: las 49 fichas oficiales se publican como PDF descargable, tanto
  en cada ficha de producto como en la biblioteca general con buscador.
- **Búsqueda**: índice embebido en la página, filtrado en el navegador. Sin peticiones
  ni dependencias. Acepta enlaces directos: `/catalogo?q=clorhexidina`.
- **Rendimiento**: ~48 KB de CSS y unos pocos KB de JS por página; todas las imágenes
  en WebP con `srcset`; sin bibliotecas de terceros en el cliente.
- **SEO**: metadatos Open Graph y Twitter, `canonical`, datos estructurados
  JSON-LD (`MedicalBusiness`, `Product`, `BreadcrumbList`), sitemap automático y
  redirecciones 301 desde las URL de la web anterior en WordPress.

---

## Identidad de marca

El diseño sigue el *Manual de Identidad Corporativa* de la empresa:

- **Azul corporativo** `#152E7F` (Pantone Blue del manual, pág. 05), blanco y negro.
  La escala `brand-50…950` de `src/styles/global.css` se deriva de ese azul.
- **Tipografía**: el manual indica Athelas Bold y Adobe Caslon Pro Bold. Para web se
  usa **Source Serif 4** en los titulares (equivalente libre de esa familia serif) e
  **Inter** en el texto corrido.
- **Logotipo**: se muestra siempre íntegro y sin alterar, conforme al punto 08 del
  manual. La única excepción es el favicon, donde por restricción técnica se usa el
  isotipo (la Q) en blanco sobre el azul corporativo, el mismo criterio que la empresa
  ya aplicaba en su sitio anterior.

---

## Imágenes y documentos

Los originales viven fuera del repositorio, en `../Q-MEDICAL - Web/` (unos 800 MB
entre PNG de 4167 × 4167 px y RAW `.RW2`). El repositorio solo guarda la versión
optimizada.

```bash
pip install pillow

python scripts/optimize_images.py    # originales -> public/img (WebP)
python scripts/copy_fichas.py        # PDF -> public/fichas-tecnicas + índice JSON
python scripts/make_favicons.py      # favicon, apple-touch-icon e íconos PWA
```

`optimize_images.py` recorta el margen vacío de cada producto conservando la
transparencia, genera dos tamaños por imagen (900 px y 480 px) y extrae la previsualización
JPEG embebida en los RAW `.RW2` de las fotos del almacén. **575 MB → 8,3 MB (−98,6 %).**

Para añadir o cambiar un producto:

1. Coloque la foto en la carpeta de originales.
2. Añada la ruta al diccionario `PRODUCTS` de `scripts/optimize_images.py` y ejecútelo.
3. Añada la entrada correspondiente en `src/data/catalogo.ts`.

---

## Formularios

El sitio es estático, así que los formularios de cotización y del Libro de
Reclamaciones se envían mediante [Web3Forms](https://web3forms.com) (gratuito, sin
servidor propio, funciona igual en Vercel y en cPanel).

**Para activarlos:**

1. Cree una clave gratuita en <https://web3forms.com> con el correo
   `cotizaciones_licitaciones@qmedicalsac.com`.
2. Defina la variable de entorno `PUBLIC_FORM_ACCESS_KEY` con esa clave:
   - En Vercel: *Settings → Environment Variables*.
   - En local o para el build de cPanel: cree un archivo `.env` con
     `PUBLIC_FORM_ACCESS_KEY=su-clave`.
3. Vuelva a compilar.

**Mientras la clave esté vacía** los formularios siguen siendo funcionales: validan
los campos y abren el gestor de correo del visitante con el mensaje ya redactado.
Nunca queda un botón que no hace nada.

---

## Despliegue

### Vercel (a través de GitHub)

Vercel detecta Astro automáticamente. No hace falta configurar nada: `vercel.json` ya
trae las cabeceras de caché y seguridad y las redirecciones desde las URL antiguas.

1. *Add New → Project* e importe el repositorio.
2. Añada la variable `PUBLIC_FORM_ACCESS_KEY`.
3. Apunte el dominio `qmedicalsac.com` a Vercel.

Cada `git push` a `main` publica una nueva versión.

### cPanel de Namecheap

```bash
npm run build
```

Suba **el contenido de `dist/`** (no la carpeta) a `public_html` por FTP o por el
Administrador de archivos de cPanel. Incluya el archivo `.htaccess`, que va dentro de
`dist/` y activa compresión, caché, cabeceras de seguridad, URL limpias, HTTPS
forzado y las redirecciones 301 desde la web anterior.

> En el Administrador de archivos active **Configuración → Mostrar archivos ocultos**
> para ver `.htaccess`.

Si el dominio debe servirse **con** `www`, ajuste esa regla de `.htaccess`; por
defecto está configurado sin `www`.

---

## Estructura

```
qmedical-web/
├── public/
│   ├── .htaccess              Configuración de Apache para cPanel
│   ├── img/                   Imágenes optimizadas (generadas)
│   └── fichas-tecnicas/       49 fichas técnicas en PDF (generadas)
├── scripts/                   Utilidades Python de preparación de recursos
├── src/
│   ├── components/            Header, Footer, Preloader, tarjetas, formularios…
│   ├── data/
│   │   ├── site.ts            Datos institucionales, contactos, certificaciones
│   │   ├── marcas.ts          Las 15 marcas representadas
│   │   ├── catalogo.ts        Categorías y productos (contenido técnico)
│   │   └── fichas.json        Índice de PDF (generado)
│   ├── layouts/Base.astro     Shell HTML, SEO, JSON-LD
│   ├── pages/                 Rutas del sitio
│   └── styles/global.css      Sistema de diseño y tokens de marca
├── astro.config.mjs
└── vercel.json
```

El contenido editable del catálogo está concentrado en `src/data/`. Para cambiar un
texto, un correo o una característica de producto no hace falta tocar ninguna plantilla.

---

## Pendiente de confirmar con la empresa

- **RUC 20505719396**: obtenido del registro público para el Libro de Reclamaciones.
  Conviene verificarlo antes de publicar.
- **Clave de Web3Forms** para activar el envío de formularios.
- **Regiones atendidas (25)** y **años de operación**: la cifra de regiones es una
  estimación de «todas las regiones del país»; ajústela en `src/data/site.ts` si se
  prefiere otra redacción.
- Seis productos del catálogo anterior (bomba de infusión, iluminador de venas, anillo
  retractor, contador de agujas, pieza manual laparoscópica y organizador de cepillos)
  no tenían foto en el material entregado y aparecen listados como «disponibles bajo
  consulta» en `/catalogo`. Al recibir sus fotos pueden convertirse en fichas completas.
