<script setup lang="ts">
import { componentDocs } from '~/data/components'
import { nav } from '~/data/nav'

const categories = nav.slice(2) // Skip Getting Started + Foundations
const totalComponents = componentDocs.length

const installCode = `npm install @my-scope/nuxt-ds`

const moduleCode = `export default defineNuxtConfig({
  modules: ['@my-scope/nuxt-ds'],
  nuxtDs: {
    prefix: 'Ds',
    injectCSS: true,
  },
})`

const usageCode = `<!-- Auto-imported, no imports needed -->
<DsButton variant="primary">
  Get started
</DsButton>`
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 py-16">
    <!-- Hero -->
    <div class="mb-16">
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-ds-primary/20 bg-ds-primary-subtle text-ds-primary text-xs font-medium font-ds mb-6">
        v0.2.0
      </div>

      <h1 class="text-5xl font-bold text-ds-fg tracking-tight leading-tight mb-4 font-ds">
        DDS Design System
      </h1>
      <p class="text-xl text-ds-fg-muted leading-relaxed max-w-2xl mb-8 font-ds">
        A minimal, production-ready component library for Nuxt 4.
        Built with TypeScript, Tailwind CSS, and a violet-first design token system.
      </p>

      <div class="flex flex-wrap gap-3">
        <NuxtLink
          to="/components/button"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-ds-md bg-ds-primary text-white text-sm font-medium font-ds hover:bg-ds-primary-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring focus-visible:ring-offset-2"
        >
          Browse Components
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
        <NuxtLink
          to="/guide/installation"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-ds-md border border-ds-border text-ds-fg text-sm font-medium font-ds hover:bg-ds-bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring focus-visible:ring-offset-2"
        >
          Installation
        </NuxtLink>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-3 gap-4 mb-16">
      <div class="rounded-ds-lg border border-ds-border p-5 bg-ds-bg">
        <p class="text-3xl font-bold text-ds-fg mb-1 font-ds">{{ totalComponents }}</p>
        <p class="text-sm text-ds-fg-muted font-ds">Components</p>
      </div>
      <div class="rounded-ds-lg border border-ds-border p-5 bg-ds-bg">
        <p class="text-3xl font-bold text-ds-fg mb-1 font-ds">100%</p>
        <p class="text-sm text-ds-fg-muted font-ds">TypeScript</p>
      </div>
      <div class="rounded-ds-lg border border-ds-border p-5 bg-ds-bg">
        <p class="text-3xl font-bold text-ds-fg mb-1 font-ds">Dark</p>
        <p class="text-sm text-ds-fg-muted font-ds">Mode support</p>
      </div>
    </div>

    <!-- Quick start -->
    <div class="mb-16">
      <h2 class="text-2xl font-bold text-ds-fg mb-6 font-ds">Quick start</h2>
      <div class="space-y-4">
        <div>
          <p class="text-sm text-ds-fg-muted mb-2 font-ds">1. Install the package</p>
          <DocsCodeBlock :code="installCode" language="bash" />
        </div>
        <div>
          <p class="text-sm text-ds-fg-muted mb-2 font-ds">2. Add the module in nuxt.config.ts</p>
          <DocsCodeBlock :code="moduleCode" language="ts" filename="nuxt.config.ts" />
        </div>
        <div>
          <p class="text-sm text-ds-fg-muted mb-2 font-ds">3. Use components anywhere (auto-imported)</p>
          <DocsCodeBlock :code="usageCode" language="vue" />
        </div>
      </div>
    </div>

    <!-- Components grid by category -->
    <div>
      <h2 class="text-2xl font-bold text-ds-fg mb-6 font-ds">Components</h2>
      <div class="space-y-8">
        <div v-for="group in categories" :key="group.title">
          <h3 class="text-sm font-semibold uppercase tracking-wider text-ds-fg-subtle mb-3 font-ds">{{ group.title }}</h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            <NuxtLink
              v-for="item in group.items"
              :key="item.href"
              :to="item.href"
              class="group flex items-center gap-2.5 px-3 py-2.5 rounded-ds-md border border-ds-border bg-ds-bg hover:border-ds-primary/40 hover:bg-ds-primary-subtle transition-all duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring"
            >
              <span class="text-sm font-medium text-ds-fg group-hover:text-ds-primary transition-colors font-ds">{{ item.title }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
