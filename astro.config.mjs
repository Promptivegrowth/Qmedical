// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Salida 100 % estatica: el resultado de `npm run build` (carpeta dist/) se
// publica igual en Vercel que subiendolo por FTP al public_html de cPanel.
export default defineConfig({
  site: 'https://qmedicalsac.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    // Genera /nosotros/index.html en lugar de /nosotros.html para que Apache
    // (cPanel) sirva las URL limpias sin necesidad de reescrituras.
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    build: { assetsInlineLimit: 2048 },
  },
});
