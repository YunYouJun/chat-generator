import process from 'node:process'
import lara from '@primevue/themes/lara'
import { pwa } from './app/config/pwa'
import { appDescription } from './app/constants/index'

// commit ref
Object.assign(process.env, {
  VITE_COMMIT_REF: process.env.CF_PAGES_COMMIT_SHA || '',
})
// add build time to env
import.meta.env.VITE_APP_BUILD_TIME = new Date().getTime().toString()

export default defineNuxtConfig({
  ssr: false,

  alias: {
    '@yunlefun/chat-ui': './packages/chat-ui/index.ts',
    '@chat-generator/datasets': './packages/datasets/index.ts',
  },

  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@nuxt/eslint',
    '@nuxt/content',
    '@primevue/nuxt-module',
    '@nuxt/image',
  ],

  primevue: {
    options: {
      theme: {
        preset: lara,
        options: {
          darkModeSelector: '.dark',
        },
      },
    },
  },

  components: [
    { path: '~/components', pathPrefix: false },
    { path: '~~/packages/chat-ui/vue/components', pathPrefix: false },
  ],

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
    '~/styles/css-vars.css',
    '~/styles/index.css',
    '~/styles/override.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
      meta: [
        // 禁用移动端缩放
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
      ],
      script: [
        {
          type: 'text/javascript',
          innerHTML: `<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "nzmux99byr");
</script>`,
        },
      ],
    },
  },

  pwa,

  devtools: {
    enabled: true,
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-08-14',
})
