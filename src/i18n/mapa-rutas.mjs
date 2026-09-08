/**
 * Tabla de direcciones del sitio, en JavaScript llano.
 *
 * Vive aparte de rutas.ts porque la lee también astro.config.mjs, que se carga
 * antes de que exista compilación de TypeScript. De aquí salen los enlaces de
 * las páginas, el conmutador de idioma, las etiquetas hreflang y las
 * alternativas del sitemap: una sola fuente para las cuatro cosas.
 */

/** clave de página -> dirección en cada idioma. */
export const MAPA = {
  inicio: { es: '/', en: '/en' },
  nosotros: { es: '/nosotros', en: '/en/about' },
  catalogo: { es: '/catalogo', en: '/en/catalog' },
  categoria: { es: '/catalogo', en: '/en/catalog' },
  producto: { es: '/productos', en: '/en/products' },
  marcas: { es: '/marcas', en: '/en/brands' },
  contacto: { es: '/contacto', en: '/en/contact' },
  fichas: { es: '/fichas-tecnicas', en: '/en/datasheets' },
  reclamos: { es: '/libro-de-reclamaciones', en: '/en/complaints-book' },
  gracias: { es: '/gracias', en: '/en/thank-you' },
};

/** Quita la barra final, salvo en la raíz. */
function normalizar(camino) {
  return camino.replace(/\/+$/, '') || '/';
}

/**
 * Dada una dirección del sitio, devuelve las dos suyas: la castellana y la
 * inglesa. Empareja por el tramo más largo, de modo que /catalogo/via-aerea
 * se resuelva contra «catalogo» y no contra la raíz, y conserva el
 * identificador del producto o de la línea, que es común a los dos idiomas.
 *
 * Devuelve null si la dirección no pertenece a ninguna página conocida.
 */
export function gemelas(camino) {
  const ruta = normalizar(camino);
  const idioma = /^\/en(\/|$)/.test(ruta) ? 'en' : 'es';
  const otro = idioma === 'en' ? 'es' : 'en';

  let mejor = null;
  for (const par of Object.values(MAPA)) {
    const base = normalizar(par[idioma]);
    const calza = ruta === base || (base !== '/' && ruta.startsWith(base + '/'));
    if (!calza) continue;
    if (!mejor || base.length > normalizar(mejor[idioma]).length) mejor = par;
  }
  if (!mejor) return null;

  const resto = ruta.slice(normalizar(mejor[idioma]).length);
  return {
    [idioma]: ruta,
    [otro]: normalizar(mejor[otro]) + resto,
  };
}
