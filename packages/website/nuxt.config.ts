import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Gloock&family=Inter:wght@400;800&display=swap',
        },
      ],
      bodyAttrs: {
        class:
          'bg-peach text-lavender-extra-dark dark:bg-lavender-extra-dark dark:text-peach md:px-8 px-4 xl:px-16 transition-colors',
      },
    },
  },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  vue: {
    propsDestructure: true,
  },

  imports: {
    autoImport: false,
  },

  css: ['./app/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  modules: ['@vueuse/nuxt', '@nuxt/image', '@nuxtjs/sanity'],
  sanity: {
    projectId: process.env.NUXT_SANITY_PROJECT_ID,
    dataset: process.env.NUXT_SANITY_DATASET,
  },
});
