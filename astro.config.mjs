// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { gemelas } from './src/i18n/mapa-rutas.mjs';

// Salida 100 % estatica: el resultado de `npm run build` (carpeta dist/) se
// publica igual en Vercel que subiendolo por FTP al public_html de cPanel.
export default defineConfig({
  site: 'https://qmedicalsac.com',
  output: 'static',
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

  build: {
    // Genera /nosotros/index.html en lugar de /nosotros.html para que Apache
    // (cPanel) sirva las URL limpias sin necesidad de reescrituras.
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  integrations: [
    sitemap({
      // No se usa la opcion i18n de la integracion: empareja las paginas por
      // coincidencia de ruta, y aqui el tramo esta traducido (/nosotros frente
      // a /en/about), de modo que solo habria acertado con la portada. Las
      // parejas se declaran con la misma tabla de la que salen los enlaces del
      // sitio, asi que sitemap y hreflang no pueden discrepar.
      serialize(item) {
        const par = gemelas(new URL(item.url).pathname);
        if (!par) return item;
        const base = new URL(item.url).origin;
        item.links = [
          { lang: 'es', url: base + par.es },
          { lang: 'en', url: base + par.en },
          { lang: 'x-default', url: base + par.es },
        ];
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: { assetsInlineLimit: 2048 },
  },
});
