// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
  adapter: vercel({}),
  redirects: {
    "/credit-application": {
      status: 302,
      destination: "https://cmb.autoflp.com/credit-applications"
    }
  }
});
