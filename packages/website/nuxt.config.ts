import tailwindcss from '@tailwindcss/vite';
import { apiEndpoint, repositoryName } from './slicemachine.config.json';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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

  modules: ['@vueuse/nuxt', '@nuxt/image', '@nuxtjs/prismic', '@nuxt/icon', 'nuxt-shiki'],

  icon: {
    mode: 'svg',
  },

  devtools: {
    enabled: true,
  },

  shiki: {
    bundledLangs: ['js', 'ts', 'vue', 'html', 'css', 'json', 'jsx', 'md', 'mdx', 'tsx'],
    bundledThemes: ['github-light', 'github-dark'],
    defaultTheme: 'github-light',
  },

  prismic: {
    endpoint: apiEndpoint || repositoryName,
    clientConfig: {
      routes: [{ type: 'article', path: '/blog/:uid' }],
    },
  },
});
