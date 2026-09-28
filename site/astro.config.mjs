// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [preact()],
  adapter: cloudflare({
    // P0 is static shell — skip Cloudflare Images transform binding
    imageService: 'passthrough',
  }),
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
