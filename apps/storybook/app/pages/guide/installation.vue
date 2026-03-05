<script setup lang="ts">
useHead({ title: 'Installation — DDS' })

const installCode = `npm install design-system-antoinegourgue`

const moduleCode = `// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'design-system-antoinegourgue',
  ],
  nuxtDs: {
    prefix: 'Ds',     // Component prefix: <DsButton />
    global: true,     // Auto-import everywhere
    injectCSS: true,  // Inject design tokens CSS
    toast: true,      // Enable useToast() composable
  },
})`

const tailwindCode = `// tailwind.config.ts
import type { Config } from 'tailwindcss'
import dsPreset from 'design-system-antoinegourgue/tailwind/preset'

export default {
  presets: [dsPreset],
  content: [
    './app/**/*.{vue,ts,js}',
  ],
} satisfies Config`

const usageCode = `<!-- All components are auto-imported -->
<DsButton variant="primary">
  Get started
</DsButton>

<DsAlert variant="success" title="Done">
  Everything is set up.
</DsAlert>`
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <div class="flex items-center gap-2 text-sm text-ds-fg-muted mb-6 font-ds">
      <NuxtLink to="/" class="hover:text-ds-fg transition-colors">DDS</NuxtLink>
      <span>/</span>
      <span class="text-ds-fg">Installation</span>
    </div>

    <h1 class="text-4xl font-bold text-ds-fg tracking-tight mb-3 font-ds">Installation</h1>
    <p class="text-lg text-ds-fg-muted mb-10 font-ds leading-relaxed">
      Get started with DDS in a Nuxt 4 project in a few steps.
    </p>

    <div class="space-y-10">
      <!-- Step 1 -->
      <section>
        <div class="flex items-center gap-3 mb-4">
          <span class="flex size-7 items-center justify-center rounded-full bg-ds-primary text-white text-sm font-bold font-ds shrink-0">1</span>
          <h2 class="text-xl font-semibold text-ds-fg font-ds">Install the package</h2>
        </div>
        <DocsCodeBlock :code="installCode" language="bash" />
      </section>

      <!-- Step 2 -->
      <section>
        <div class="flex items-center gap-3 mb-4">
          <span class="flex size-7 items-center justify-center rounded-full bg-ds-primary text-white text-sm font-bold font-ds shrink-0">2</span>
          <h2 class="text-xl font-semibold text-ds-fg font-ds">Add the Nuxt module</h2>
        </div>
        <DocsCodeBlock :code="moduleCode" language="ts" filename="nuxt.config.ts" />
      </section>

      <!-- Step 3 -->
      <section>
        <div class="flex items-center gap-3 mb-4">
          <span class="flex size-7 items-center justify-center rounded-full bg-ds-primary text-white text-sm font-bold font-ds shrink-0">3</span>
          <h2 class="text-xl font-semibold text-ds-fg font-ds">Configure Tailwind</h2>
        </div>
        <DocsCodeBlock :code="tailwindCode" language="ts" filename="tailwind.config.ts" />
      </section>

      <!-- Step 4 -->
      <section>
        <div class="flex items-center gap-3 mb-4">
          <span class="flex size-7 items-center justify-center rounded-full bg-ds-primary text-white text-sm font-bold font-ds shrink-0">4</span>
          <h2 class="text-xl font-semibold text-ds-fg font-ds">Use components</h2>
        </div>
        <DocsCodeBlock :code="usageCode" language="vue" />
      </section>

      <!-- Custom prefix note -->
      <div class="rounded-ds-lg border border-ds-info/20 bg-ds-info-subtle p-4 text-sm text-ds-fg font-ds">
        <p class="font-semibold mb-1">Custom prefix</p>
        <p class="text-ds-fg-muted leading-relaxed">
          Set <code class="font-mono text-ds-primary">prefix: 'My'</code> to use
          <code class="font-mono text-ds-primary">MyButton</code> instead of <code class="font-mono text-ds-primary">DsButton</code>.
        </p>
      </div>
    </div>
  </div>
</template>
