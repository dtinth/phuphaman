import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // site: "https://promptpage.org/",
  integrations: [robotsTxt(), sitemap(), tailwind()],
  image: {
    domains: ["prod-files-secure.s3.us-west-2.amazonaws.com"],
  },
});
