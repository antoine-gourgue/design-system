import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/module',
  ],
  clean: true,
  declaration: true,
  failOnWarn: false,
  externals: [
    '@nuxt/kit',
    '@nuxt/schema',
    'nuxt',
    'vue',
    'tailwindcss',
    'class-variance-authority',
    'clsx',
    'tailwind-merge',
  ],
  rollup: {
    emitCJS: true,
  },
})
