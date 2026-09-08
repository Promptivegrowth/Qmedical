/**
 * Direcciones del sitio en los dos idiomas.
 *
 * Criterio de las URL
 * -------------------
 * El castellano no lleva prefijo: /catalogo sigue siendo /catalogo, de modo
 * que las direcciones que ya circulan —y las redirecciones desde el sitio
 * anterior— no se rompen. El inglés vive bajo /en/ y traduce el tramo de la
 * página (/en/catalog, /en/about), porque «/en/nosotros» no le sirve de nada
 * a quien lee en inglés.
 *
 * En cambio el identificador de cada producto y de cada línea es el mismo en
 * los dos idiomas: /catalogo/via-aerea y /en/catalog/via-aerea. No es un
 * descuido. Ese tramo identifica una ficha técnica y un código de fabricante,
 * y mantenerlo idéntico asegura que toda página tenga su gemela exacta, que
 * el conmutador de idioma nunca caiga en un 404 y que las etiquetas hreflang
 * se emparejen sin una tabla de 42 equivalencias que mantener a mano.
 *
 * Esta tabla es la única fuente: de ella salen los enlaces, el botón de
 * idioma y las alternativas hreflang de cada página.
 */

import { MAPA } from './mapa-rutas.mjs';

export type Idioma = 'es' | 'en';

export const IDIOMAS = ['es', 'en'] as const;
export const IDIOMA_POR_DEFECTO: Idioma = 'es';

/** Cómo se nombra cada idioma, en su propia lengua. */
export const NOMBRE_IDIOMA: Record<Idioma, string> = {
  es: 'Español',
  en: 'English',
};

/** Valor del atributo lang y de og:locale. */
export const ETIQUETA_HTML: Record<Idioma, string> = {
  es: 'es-PE',
  en: 'en',
};
export const ETIQUETA_OG: Record<Idioma, string> = {
  es: 'es_PE',
  en: 'en_US',
};
/** Valor de hreflang. El castellano se declara como raíz del idioma. */
export const ETIQUETA_HREF: Record<Idioma, string> = {
  es: 'es',
  en: 'en',
};

/** Páginas del sitio. Las que llevan slug lo reciben aparte. */
export type Clave =
  | 'inicio'
  | 'nosotros'
  | 'catalogo'
  | 'categoria'
  | 'producto'
  | 'marcas'
  | 'contacto'
  | 'fichas'
  | 'reclamos'
  | 'gracias';

// La tabla vive en mapa-rutas.mjs porque astro.config.mjs tambien la lee.
const TABLA = MAPA as Record<Clave, Record<Idioma, string>>;

/**
 * Dirección de una página.
 * @param slug  identificador de la línea o del producto, cuando corresponda
 * @param ancla fragmento sin almohadilla, p. ej. 'cotizar'
 */
export function ruta(idioma: Idioma, clave: Clave, slug?: string, ancla?: string): string {
  const base = TABLA[clave][idioma];
  const camino = slug ? `${base}/${slug}` : base;
  return ancla ? `${camino}#${ancla}` : camino;
}

/** Las dos direcciones de una misma página, para hreflang y para el botón. */
export function alternas(clave: Clave, slug?: string): Record<Idioma, string> {
  return { es: ruta('es', clave, slug), en: ruta('en', clave, slug) };
}

/** El otro idioma. Con dos, basta. */
export function otroIdioma(idioma: Idioma): Idioma {
  return idioma === 'es' ? 'en' : 'es';
}

/** Deduce el idioma a partir de la dirección; sirve para el 404. */
export function idiomaDe(pathname: string): Idioma {
  return /^\/en(\/|$)/.test(pathname) ? 'en' : 'es';
}
