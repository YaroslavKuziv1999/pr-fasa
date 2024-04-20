// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/google-fonts",
    "@nuxt/ui",
    "nuxt-icon",
    "@sidebase/nuxt-auth",
    "@nuxtjs/tailwindcss"
  ],
  css: ["~/assets/scss/main.scss"],
  colorMode: {
    preference: "light",
  },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.tailgrids.com/tailgrids-fallback.css",
        },
      ],
    },
  },
  googleFonts: {
    families: {
      "Rozha One": true,
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/variables.scss" as *;',
        },
      },
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});