<script setup lang="ts">
useHead({ title: 'Installation — DDS' })

const installCode = `npm install design-system-antoinegourgue`

const peerCode = `npm install nuxt @nuxtjs/tailwindcss`

const moduleCode = `// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    'design-system-antoinegourgue/module',
    '@nuxtjs/tailwindcss',
  ],
  tailwindcss: {
    configPath: './tailwind.config.ts',
    cssPath: '~/assets/main.css',
  },
})`

const tailwindCode = `// tailwind.config.ts
import type { Config } from 'tailwindcss'
import dsPreset from 'design-system-antoinegourgue/tailwind/preset'

export default {
  presets: [dsPreset],
  content: [
    './app/**/*.{vue,ts,js}',
    // Scan library components so Tailwind generates their utility classes
    './node_modules/design-system-antoinegourgue/dist/**/*.{js,mjs,vue}',
  ],
} satisfies Config`

const cssCode = `/* app/assets/main.css */
@import 'design-system-antoinegourgue/dist/runtime/assets/base.css';

@tailwind base;
@tailwind components;
@tailwind utilities;`

const appCode = `<!-- app/app.vue -->
<template>
  <div>
    <DsToastProvider />
    <NuxtPage />
  </div>
</template>`

const usageCode = `<!-- All Ds* components are auto-imported, no import needed -->
<template>
  <DsButton variant="primary" @click="save" :loading="loading">
    Save changes
  </DsButton>

  <DsAlert variant="success" title="Saved" description="Your changes have been saved." />

  <DsCard hoverable>
    <DsCardHeader>
      <h3 class="font-semibold text-ds-fg">Dashboard</h3>
    </DsCardHeader>
    <DsCardContent>
      <p class="text-sm text-ds-fg-muted">Welcome back.</p>
    </DsCardContent>
  </DsCard>
</template>`
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <div class="flex items-center gap-2 text-sm text-ds-fg-muted mb-6 font-ds">
      <NuxtLink to="/" class="hover:text-ds-fg transition-colors">DDS</NuxtLink>
      <span>/</span>
      <span class="text-ds-fg">Installation</span>
    </div>

    <h1 class="text-4xl font-bold text-ds-fg tracking-tight mb-3 font-ds">
      Installation
    </h1>
    <p class="text-lg text-ds-fg-muted mb-10 font-ds leading-relaxed">
      Integrate DDS into a Nuxt 4 project in 5 steps.
    </p>

    <div class="space-y-12">
      <!-- Step 1 -->
      <section>
        <div class="flex items-center gap-3 mb-4">
          <span class="flex size-7 items-center justify-center rounded-full bg-ds-primary text-white text-sm font-bold font-ds shrink-0">1</span>
          <h2 class="text-xl font-semibold text-ds-fg font-ds">Install the package</h2>
        </div>
        <DocsCodeBlock :code="installCode" language="bash" />
        <p class="text-sm text-ds-fg-muted mt-3 font-ds">
          Peer dependencies (if not already installed):
        </p>
        <DocsCodeBlock :code="peerCode" language="bash" class="mt-2" />
      </section>

      <!-- Step 2 -->
      <section>
        <div class="flex items-center gap-3 mb-2">
          <span class="flex size-7 items-center justify-center rounded-full bg-ds-primary text-white text-sm font-bold font-ds shrink-0">2</span>
          <h2 class="text-xl font-semibold text-ds-fg font-ds">Add the Nuxt module</h2>
        </div>
        <p class="text-sm text-ds-fg-muted mb-4 ml-10 font-ds leading-relaxed">
          Register the module and point <code class="font-mono text-ds-primary">cssPath</code> to the CSS file you will create in step 4.
        </p>
        <DocsCodeBlock :code="moduleCode" language="ts" filename="nuxt.config.ts" />
      </section>

      <!-- Step 3 -->
      <section>
        <div class="flex items-center gap-3 mb-2">
          <span class="flex size-7 items-center justify-center rounded-full bg-ds-primary text-white text-sm font-bold font-ds shrink-0">3</span>
          <h2 class="text-xl font-semibold text-ds-fg font-ds">Configure the Tailwind preset</h2>
        </div>
        <p class="text-sm text-ds-fg-muted mb-4 ml-10 font-ds leading-relaxed">
          The preset maps every design token to a Tailwind utility class (<code class="font-mono text-ds-primary">bg-ds-primary</code>, <code class="font-mono text-ds-primary">text-ds-fg</code>, etc.).
          The <code class="font-mono text-ds-primary">content</code> array must include the library's dist files so Tailwind generates all the component classes.
        </p>
        <DocsCodeBlock :code="tailwindCode" language="ts" filename="tailwind.config.ts" />
      </section>

      <!-- Step 4 -->
      <section>
        <div class="flex items-center gap-3 mb-2">
          <span class="flex size-7 items-center justify-center rounded-full bg-ds-primary text-white text-sm font-bold font-ds shrink-0">4</span>
          <h2 class="text-xl font-semibold text-ds-fg font-ds">Create the CSS entry point</h2>
        </div>
        <p class="text-sm text-ds-fg-muted mb-4 ml-10 font-ds leading-relaxed">
          This file imports the design tokens (CSS variables) from the library and adds the standard Tailwind directives.
        </p>
        <DocsCodeBlock :code="cssCode" language="css" filename="app/assets/main.css" />
      </section>

      <!-- Step 5 -->
      <section>
        <div class="flex items-center gap-3 mb-2">
          <span class="flex size-7 items-center justify-center rounded-full bg-ds-primary text-white text-sm font-bold font-ds shrink-0">5</span>
          <h2 class="text-xl font-semibold text-ds-fg font-ds">Add DsToastProvider to the app root</h2>
        </div>
        <p class="text-sm text-ds-fg-muted mb-4 ml-10 font-ds leading-relaxed">
          The <code class="font-mono text-ds-primary">DsToastProvider</code> renders the toast stack. Place it once at the root of your app.
        </p>
        <DocsCodeBlock :code="appCode" language="vue" filename="app/app.vue" />
      </section>

      <!-- Usage -->
      <section>
        <h2 class="text-xl font-semibold text-ds-fg mb-2 font-ds">You're ready</h2>
        <p class="text-sm text-ds-fg-muted mb-4 font-ds leading-relaxed">
          All <code class="font-mono text-ds-primary">Ds*</code> components are globally auto-imported. No explicit imports needed in your templates.
        </p>
        <DocsCodeBlock :code="usageCode" language="vue" />
      </section>

      <!-- Tip -->
      <div class="rounded-ds-lg border border-ds-info/20 bg-ds-info-subtle p-5 text-sm font-ds">
        <p class="font-semibold text-ds-fg mb-1">Custom component prefix</p>
        <p class="text-ds-fg-muted leading-relaxed">
          Set <code class="font-mono text-ds-primary">nuxtDs: &#123; prefix: 'My' &#125;</code> in
          <code class="font-mono text-ds-primary">nuxt.config.ts</code> to use
          <code class="font-mono text-ds-primary">MyButton</code> instead of
          <code class="font-mono text-ds-primary">DsButton</code>.
        </p>
      </div>
    </div>
  </div>
</template>
