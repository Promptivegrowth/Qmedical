import type { APIRoute } from 'astro';
import { lineas, categorias, productos } from '../data/catalogo';
import { gemelas } from '../i18n/mapa-rutas.mjs';

/**
 * Sitemap.
 *
 * Lo armaba la integración de Astro recorriendo las páginas compiladas. Desde
 * que el sitio se arma al pedirlo no hay páginas que recorrer, así que se
 * enumeran aquí: las fijas a mano y las del catálogo desde el propio
 * catálogo, que es lo que garantiza que un producto nuevo entre al sitemap el
 * mismo día en que la empresa lo publica en el portal.
 *
 * Cada dirección lleva sus dos versiones en `xhtml:link`, igual que el
 * hreflang de la página, y por la misma tabla de rutas: sitemap y etiquetas
 * no pueden discrepar porque salen del mismo sitio.
 */

/** Páginas que no dependen del catálogo. */
const FIJAS = [
  '/',
  '/nosotros',
  '/catalogo',
  '/marcas',
  '/contacto',
  '/libro-de-reclamaciones',
];

const escapar = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = ({ site }) => {
  const base = (site?.origin ?? 'https://qmedicalsac.com').replace(/\/$/, '');

  const rutas = [
    ...FIJAS,
    ...lineas.map((l) => `/catalogo/${l.slug}`),
    ...categorias.map((c) => `/catalogo/${c.linea}/${c.slug}`),
    ...productos.map((p) => `/productos/${p.slug}`),
  ];

  const entradas: string[] = [];
  for (const ruta of rutas) {
    const par = gemelas(ruta);
    if (!par) continue;
    /* Una entrada por idioma, y cada una declara las dos: es lo que pide
       Google para un sitio bilingüe. */
    for (const idioma of ['es', 'en'] as const) {
      entradas.push(
        `  <url>\n` +
          `    <loc>${escapar(base + par[idioma])}</loc>\n` +
          `    <xhtml:link rel="alternate" hreflang="es" href="${escapar(base + par.es)}"/>\n` +
          `    <xhtml:link rel="alternate" hreflang="en" href="${escapar(base + par.en)}"/>\n` +
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapar(base + par.es)}"/>\n` +
          `  </url>`,
      );
    }
  }

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' +
    'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    entradas.join('\n') +
    '\n</urlset>\n';

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=600, stale-while-revalidate=86400',
    },
  });
};
