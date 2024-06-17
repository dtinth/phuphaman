import { defineConfig } from 'astro/config';
import robotsTxt from 'astro-robots-txt';
import sitemap from '@astrojs/sitemap';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://promptpage.org/',
  integrations: [robotsTxt(), sitemap(), tailwind()]
});