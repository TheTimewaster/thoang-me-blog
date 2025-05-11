import { apiEndpoint, repositoryName } from './slicemachine.config.json';
import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  nitro: {
    compressPublicAssets: true,
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
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
    },
  },

  compatibilityDate: '2024-11-01',

  // devtools: { enabled: true },

  vue: {
    propsDestructure: true,
  },

  imports: {
    autoImport: false,
  },

  css: ['./app/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['shallowequal', 'lodash/startCase.js'],
    },
  },

  modules: ['@vueuse/nuxt', '@nuxt/image', '@nuxtjs/prismic'],

  devtools: {
    enabled: true,
  },

  prismic: {
    endpoint: apiEndpoint || repositoryName,
  },
});
