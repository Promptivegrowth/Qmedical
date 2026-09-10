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

El sitio es bilingüe: cada página existe en castellano y en inglés.

| Sección | Castellano | Inglés |
| --- | --- | --- |
| Portada con preloader temático | `/` | `/en` |
| Nosotros, certificaciones e infraestructura | `/nosotros` | `/en/about` |
| Catálogo con buscador instantáneo | `/catalogo` | `/en/catalog` |
| 10 líneas de producto | `/catalogo/<linea>` | `/en/catalog/<linea>` |
| 32 fichas de producto | `/productos/<producto>` | `/en/products/<producto>` |
| 15 marcas asociadas | `/marcas` | `/en/brands` |
| Biblioteca de 49 fichas técnicas en PDF | `/fichas-tecnicas` | `/en/datasheets` |
| Contacto y solicitud de cotización | `/contacto` | `/en/contact` |
| Libro de Reclamaciones (Ley N.° 29571) | `/libro-de-reclamaciones` | `/en/complaints-book` |

En total, 100 páginas estáticas —50 por idioma— más `sitemap-index.xml`,
`robots.txt` y `404.html`.

### Sitio bilingüe

- **El castellano no lleva prefijo.** `/catalogo` sigue siendo `/catalogo`, de modo
  que las direcciones que ya circulan y las redirecciones 301 desde la web anterior
  no se rompen. El inglés vive bajo `/en/` y traduce el tramo de la página, porque
  «/en/nosotros» no le sirve de nada a quien lee en inglés.
- **El identificador de cada producto y de cada línea es el mismo en los dos
  idiomas**: `/catalogo/via-aerea` y `/en/catalog/via-aerea`. Ese tramo identifica
  una ficha técnica y un código de fabricante; mantenerlo idéntico garantiza que
  toda página tenga su gemela exacta, que el conmutador de idioma nunca caiga en un
  404 y que las etiquetas `hreflang` se emparejen sin una tabla de 42 equivalencias
  que mantener a mano.
- **Una sola fuente de direcciones**: `src/i18n/mapa-rutas.mjs`. De ella salen los
  enlaces de las plantillas, el botón de idioma, las etiquetas `hreflang` de cada
  página y las alternativas del sitemap, así que las cuatro cosas no pueden
  discrepar. Se escribió en JavaScript llano porque la lee también
  `astro.config.mjs`.
- **Sin redirección automática por idioma del navegador.** Un visitante limeño que
  llega a `/catalogo` ve `/catalogo`, no lo desvía la configuración de su equipo. El
  cambio de idioma es siempre una decisión suya, y el botón lleva a *esta misma*
  página en el otro idioma, no a la portada.
- **Qué no se traduce, a propósito**: los códigos de fabricante (`MA1112`,
  `GYTR-III`), los nombres comerciales y las marcas registradas, y el nombre legal
  «Libro de Reclamaciones», que es la figura que exige la norma peruana. Los
  atributos `name` de los formularios se mantienen en castellano en los dos idiomas
  para que el equipo comercial reciba siempre los correos con los mismos campos; se
  añade una línea con el idioma en que escribió el visitante.
- **Las fichas técnicas en PDF son las que emite cada fabricante, en castellano.**
  La versión inglesa lo advierte junto a la descarga en vez de dar a entender que
  existe una traducción.
- **El 404 se traduce solo.** El servidor entrega un único `404.html` para cualquier
  dirección desconocida, incluidas las que empiezan por `/en/`; un guion mínimo, antes
  del primer pintado, cambia los textos y los enlaces si la dirección fallida era del
  sitio en inglés. Sin JavaScript queda en castellano.

---

### Detalles de implementación

- **Portada con video**: `public/video/hero.mp4` se reproduce en bucle infinito,
  silenciado y en línea. El póster es su primer fotograma, extraído por
  `scripts/poster_video.py`, así que la portada se ve llena desde el primer pintado
  y el video entra encima cuando está listo. La fuente no va en el HTML: la pone el
  guion solo si decide reproducir, y no lo hace con `prefers-reduced-motion`, con el
  ahorro de datos activado ni en 2G/3G. Se pausa al salir de pantalla.
- **Contraste sobre imagen**: el velo de la portada y el de la banda de cierre no
  están puestos a ojo. Se midió la relación de contraste del texto blanco contra el
  fondo real —con el texto oculto, en varios momentos del video y de 320 a 1920 px—
  y los valores se ajustaron hasta superar el mínimo AA en todos los casos.
- **Catálogo sin referencias internas**: las referencias del fabricante (MA1112,
  RIP-003…) no se publican. Se conservan en `src/data/catalogo.ts` porque emparejan
  cada variante con su ficha técnica, pero lo que se lee es la presentación —la
  capacidad, la talla, la formulación—, que es por lo que se elige. Cada línea del
  catálogo lleva además una frase en lenguaje llano que dice para qué sirve, de modo
  que el índice se entienda sin conocer el sector.
- **Respaldo**: las tres acreditaciones son placas con superficie propia y son
  enlaces de verdad —se pulsan, se tabulan y responden al foco—, con el sello
  dibujándose trazo a trazo al entrar en pantalla. El brillo que sigue al puntero
  es el único añadido con JavaScript de la sección: solo en equipos con ratón, solo
  mientras el puntero está encima, y escribiendo dos variables CSS dentro de un
  `requestAnimationFrame`. El mismo componente sirve a la portada y a `/nosotros`,
  así que las dos no pueden divergir.
- **Movimiento**: las fotografías del compromiso y el fondo de la banda de cierre
  llevan un acercamiento lento y continuo. Cada transformación vive en su propia
  capa —recorte, parallax y zoom— porque las tres comparten la propiedad
  `transform` y en un mismo elemento se anularían entre sí.
- **Preloader**: el logotipo corporativo sobre un trazo electrocardiográfico. Aparece
  una sola vez por sesión (`sessionStorage`), se cierra al terminar la carga con un
  tope de seguridad de 4 s y no se muestra con `prefers-reduced-motion` ni sin
  JavaScript.
- **Anillo de marcas**: un único aro tridimensional que envuelve al titular y gira
  solo, de forma continua. El aspecto de cada logotipo depende de dónde esté en ese
  momento —blanco y por delante del texto en la mitad cercana, apagado y por detrás
  en la lejana—. Se resuelve entero en CSS, sin un cálculo por fotograma, y se
  detiene mientras se hace scroll.
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
- **Tipografía**: el manual (pág. 07) indica **Athelas Bold** —de donde nace la Q del
  logotipo— y **Adobe Caslon Pro Bold** —de donde nace la palabra MEDICAL—. Las dos son
  comerciales y no se pueden servir en web.

  Los titulares usan **Literata**, y no por parecido casual: la dibujó TypeTogether, el
  mismo estudio de Veronika Burian y José Scaglione que dibujó Athelas. Comparten
  planteamiento —serifa contemporánea de libro, contraste bajo, serifas robustas— y
  Literata se diseñó expresamente para pantalla, con un eje óptico que ajusta el trazo
  al tamaño. El texto corrido va en **Inter**.

  Se descartó Libre Caslon Display, que se usó al principio: es una revival de Caslon de
  contraste altísimo y a cuerpo de titular sus finos se vuelven filamentos, con un aire
  de esquela que el cliente señaló. También se descartó encabezar la pila con Athelas
  —viene instalada en macOS e iOS— porque el sitio se vería distinto según el sistema
  del visitante.
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
│   ├── data/                  Contenido original, en castellano
│   │   ├── site.ts            Datos institucionales, contactos, certificaciones
│   │   ├── marcas.ts          Las 15 marcas representadas
│   │   ├── catalogo.ts        Categorías y productos (contenido técnico)
│   │   ├── especialidades.ts  Las 6 especialidades clínicas que se abastecen
│   │   └── fichas.json        Índice de PDF (generado)
│   ├── i18n/                  Capa bilingüe
│   │   ├── mapa-rutas.mjs     Tabla de direcciones (la lee también astro.config)
│   │   ├── rutas.ts           Ayudantes de enlace, idioma y alternativas
│   │   ├── textos.ts          Textos que se repiten (cabecera, pie, formularios)
│   │   ├── contenido.ts       Traducción de líneas, marcas, especialidades…
│   │   └── productos-en.ts    Contenido de los 32 productos en inglés
│   ├── plantillas/            Maqueta de cada página, parametrizada por idioma
│   ├── icons/                 Iconos de Tabler (MIT), incrustados al compilar
│   ├── layouts/Base.astro     Shell HTML, SEO, JSON-LD, hreflang
│   ├── pages/                 Rutas: castellano en la raíz, inglés bajo en/
│   └── styles/global.css      Sistema de diseño y tokens de marca
├── astro.config.mjs
└── vercel.json
```

El contenido editable del catálogo está concentrado en `src/data/`. Para cambiar un
texto, un correo o una característica de producto no hace falta tocar ninguna plantilla.

Las páginas de `src/pages/` son entradas de tres líneas: eligen el idioma y delegan
en la plantilla compartida de `src/plantillas/`. La maqueta se escribe una sola vez y
sirve a los dos idiomas, de modo que un cambio de diseño no puede quedar aplicado en
una versión y olvidado en la otra. La prosa propia de cada página vive en un bloque
`T` en su plantilla, junto a la maqueta que la usa; en `src/i18n/textos.ts` solo está
lo que se repite en varias páginas.

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
