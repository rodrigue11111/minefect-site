// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// MINEFECT — apex domain on GitHub Pages.
// FR at root, EN at /en/. Clean directory URLs (/products/), trailing slash always.
export default defineConfig({
  site: 'https://minefect.com',
  base: '/',
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
