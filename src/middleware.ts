import type { MiddlewareHandler } from 'astro';
import { refrescar } from './data/catalogo';

/**
 * Lo que ocurre antes de armar cada página.
 *
 * 1. Se refresca el catálogo si el que hay en memoria ya cumplió su minuto.
 *    La función que atiende las visitas puede seguir viva horas, así que sin
 *    esto una edición hecha en el portal no se vería hasta que Vercel
 *    levantara una función nueva.
 *
 * 2. Se marca la página para que la guarde la caché de Vercel. Es lo que
 *    hace que armar las páginas al pedirlas no sea más lento que publicarlas
 *    de antemano: la función se ejecuta una vez por minuto y el resto de las
 *    visitas reciben un archivo del CDN.
 *
 *    `stale-while-revalidate` es la parte que importa: pasado el minuto, el
 *    CDN sigue entregando al instante lo que tenía y pide la versión nueva
 *    por detrás. Nadie espera nunca a que se arme una página, y el cambio del
 *    portal aparece en la visita siguiente.
 */
export const onRequest: MiddlewareHandler = async (contexto, siguiente) => {
  await refrescar();

  const respuesta = await siguiente();

  const tipo = respuesta.headers.get('content-type') ?? '';
  if (tipo.includes('text/html') || tipo.includes('xml')) {
    /* El navegador no la guarda (max-age=0): así un cambio del portal se ve
       al recargar, sin tener que vaciar la caché. Quien la guarda es el CDN
       (s-maxage), que sí sabe cuándo soltarla. */
    respuesta.headers.set(
      'Cache-Control',
      'public, max-age=0, s-maxage=60, stale-while-revalidate=86400',
    );
  }

  // El Libro de Reclamaciones y las páginas de gracias no se cachean: la
  // primera lleva una constancia con número de hoja, y la segunda es el
  // acuse de un envío concreto.
  const ruta = new URL(contexto.request.url).pathname;
  if (/(libro-de-reclamaciones|complaints-book|gracias|thank-you)/.test(ruta)) {
    respuesta.headers.set('Cache-Control', 'no-store');
  }

  return respuesta;
};
