// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/google-fonts",
    "@nuxt/ui",
    "nuxt-icon",
    "@sidebase/nuxt-auth",
    "@nuxtjs/tailwindcss",
    "vue3-carousel-nuxt",
    '@vueuse/nuxt',
    '@pinia/nuxt'
  ],
  css: ["~/assets/scss/main.scss", "~/assets/scss/header/main.scss"],
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
  runtimeConfig: {
    //Mail
    MAILHOST: "smtp.gmail.com",
    MAILPORT: 587,
    MAILUSER: 'prfasaz@gmail.com',
    MAILPASSWORD: 'pyzj vzkt ovke fuqt',

    //Cloudinary
    cloudinaryCloudName: 'dk4hwewqj',
    cloudinaryApiKey: '982361323571352',
    cloudinaryApiSecret: 'XawRB67jvukjjI-1iml-ziOMoMg'
}
});