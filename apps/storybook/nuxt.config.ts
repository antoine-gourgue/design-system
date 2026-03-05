// https://nuxt.com/docs/api/configuration/nuxt-config
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const uiPkg = require('../../packages/ui/package.json')

export default defineNuxtConfig({
  appConfig: {
    dsVersion: uiPkg.version as string,
  },
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'design-system-antoinegourgue/module',
  ],
  nuxtDs: {
    prefix: 'Ds',
    global: true,
    injectCSS: true,
    toast: true,
  },
  tailwindcss: {
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
  },
  typescript: {
    strict: true,
    typeCheck: false,
  },
  devtools: { enabled: false },
  experimental: {
    appManifest: false,
  },
  compatibilityDate: '2025-01-01',
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },
  app: {
    head: {
      title: 'DDS — Design System',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Documentation for the DDS Design System' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' },
      ],
    },
  },
})
