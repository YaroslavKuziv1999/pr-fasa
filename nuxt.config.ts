// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/google-fonts", "@nuxt/ui", "nuxt-icon"],
  css: ["~/assets/scss/main.scss"],
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
