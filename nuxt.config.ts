import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      title: 'Webjar Blog',
      htmlAttrs: {
        dir: 'rtl',
        lang: 'fa',
      },
    },
  },
  css: ['@/assets/styles/main.css'],
  tailwindcss: {
    cssPath: '@/assets/styles/tailwind.css',
    config: {
      content: [
        `@/components/**/*.{vue,js,ts}`,
        `@/layouts/**/*.vue`,
        `@/pages/**/*.vue`,
        `@/composables/**/*.{js,ts}`,
        `@/plugins/**/*.{js,ts}`,
        `@/App.{js,ts,vue}`,
        `@/app.{js,ts,vue}`,
        `@/Error.{js,ts,vue}`,
        `@/error.{js,ts,vue}`,
      ],
      theme: {
        extend: {
          borderWidth: {
            '1': '1px',
          },
          boxShadow: {
            header: '0px 0px 40px rgba(0, 0, 0, 0.05)',
            button: '0px 5px 10px rgba(0, 200, 83, 0.25)',
            'button-pressed': 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)',
            search: '0px 0px 10px rgba(0, 0, 0, 0.05)',
            'category-box': '0px 0px 30px rgba(0, 0, 0, 0.1)',
            'search-avtive': '0px 0px 10px rgba(0, 0, 0, 0.1)',
            'blog-card': '0px 0px 30px rgba(0, 200, 83, 0.05)',
          },
        },
        colors: {
          black: 'rgb(0, 0, 0)',
          white: 'rgb(255, 255, 255)',
          gray: 'rgba(0, 0, 0, 0.2)',
          'gray-dark': 'rgb(123, 123, 123)',
          green: 'rgb(0, 200, 83)',
          'green-light': 'rgba(0, 200, 83, 0.5)',
          red: 'rgb(254, 86, 86)',
        },
      },
    },
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/apollo', 'unplugin-icons/nuxt'],
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://challenge.webjar.ir/graphql',
        tokenName: 'apollo-token',
        authType: 'Bearer',
        authHeader: 'Authorization',
        tokenStorage: 'cookie',
      },
    },
  },
})
