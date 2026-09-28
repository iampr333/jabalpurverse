// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [preact()],
  adapter: cloudflare({
    // P0 is static shell — skip Cloudflare Images transform binding
    imageService: 'passthrough',
  }),
  output: 'static',
});
