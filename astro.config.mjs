// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

/**
 * El sitio se arma en el servidor, en Vercel.
 *
 * El catalogo lo administra la empresa en el portal del Grupo Pacheco, y con
 * salida estatica cada cambio obligaba a recompilar el sitio entero. Armando
 * cada pagina al pedirla, el cambio se ve solo.
 *
 * Que no sea estatico no significa que sea lento: el middleware marca cada
 * pagina para que la cache de Vercel la guarde, de modo que la funcion se
 * ejecuta una vez por minuto y no una vez por visita. El visitante recibe un
 * archivo del CDN, igual que antes.
 */
export default defineConfig({
  site: 'https://qmedicalsac.com',
  output: 'server',
  adapter: vercel(),
  trailingSlash: 'ignore',

  // Sitio bilingue. El castellano es el idioma de la empresa y no lleva
  // prefijo, de modo que las direcciones historicas del sitio anterior siguen
  // siendo validas; el ingles vive bajo /en/. Sin redireccion automatica por
  // idioma del navegador: un visitante limeno que llega a /catalogo debe ver
  // /catalogo, no ser desviado por la configuracion de su equipo.
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },

  build: { inlineStylesheets: 'auto' },
  // El sitemap ya no lo genera la integracion: recorre las rutas compiladas, y
  // armando las paginas al pedirlas no hay ninguna que recorrer. Lo arma
  // src/pages/sitemap.xml.ts a partir de la misma tabla de rutas y del mismo
  // catalogo, que es lo que evita que sitemap y sitio discrepen.
  integrations: [],
  vite: {
    plugins: [tailwindcss()],
    build: { assetsInlineLimit: 2048 },
  },
});
