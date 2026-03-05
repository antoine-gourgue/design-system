// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@my-scope/nuxt-ds/module',
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
  app: {
    head: {
      title: 'DDS — Design System',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Documentation for the DDS Design System' },
      ],
    },
  },
})
