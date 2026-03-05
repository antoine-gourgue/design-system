<script setup lang="ts">
const colorGroups = [
  {
    title: 'Primary',
    description: 'Violet #7f00ff — the main brand color.',
    swatches: [
      { name: '--ds-primary', label: 'primary', tailwind: 'bg-ds-primary' },
      { name: '--ds-primary-hover', label: 'primary-hover', tailwind: 'bg-ds-primary-hover' },
      { name: '--ds-primary-subtle', label: 'primary-subtle', tailwind: 'bg-ds-primary-subtle', dark: true },
      { name: '--ds-primary-muted', label: 'primary-muted', tailwind: 'bg-ds-primary-muted', dark: true },
      { name: '--ds-primary-fg', label: 'primary-fg', tailwind: 'bg-ds-primary-fg', dark: true },
    ],
  },
  {
    title: 'Neutral',
    description: 'Zinc-based neutral scale for backgrounds, borders, and text.',
    swatches: [
      { name: '--ds-bg', label: 'bg', tailwind: 'bg-ds-bg', dark: true },
      { name: '--ds-bg-subtle', label: 'bg-subtle', tailwind: 'bg-ds-bg-subtle', dark: true },
      { name: '--ds-bg-muted', label: 'bg-muted', tailwind: 'bg-ds-bg-muted', dark: true },
      { name: '--ds-border', label: 'border', tailwind: 'bg-ds-border', dark: true },
      { name: '--ds-fg-subtle', label: 'fg-subtle', tailwind: 'bg-ds-fg-subtle' },
      { name: '--ds-fg-muted', label: 'fg-muted', tailwind: 'bg-ds-fg-muted' },
      { name: '--ds-fg', label: 'fg', tailwind: 'bg-ds-fg' },
    ],
  },
  {
    title: 'Semantic',
    description: 'Status colors with subtle surface variants.',
    swatches: [
      { name: '--ds-danger', label: 'danger', tailwind: 'bg-ds-danger' },
      { name: '--ds-danger-subtle', label: 'danger-subtle', tailwind: 'bg-ds-danger-subtle', dark: true },
      { name: '--ds-success', label: 'success', tailwind: 'bg-ds-success' },
      { name: '--ds-success-subtle', label: 'success-subtle', tailwind: 'bg-ds-success-subtle', dark: true },
      { name: '--ds-warning', label: 'warning', tailwind: 'bg-ds-warning' },
      { name: '--ds-warning-subtle', label: 'warning-subtle', tailwind: 'bg-ds-warning-subtle', dark: true },
      { name: '--ds-info', label: 'info', tailwind: 'bg-ds-info' },
      { name: '--ds-info-subtle', label: 'info-subtle', tailwind: 'bg-ds-info-subtle', dark: true },
    ],
  },
]

const overrideCode = `/* app/assets/theme.css */
:root {
  --ds-primary: #0070f3;        /* blue */
  --ds-primary-hover: #0060d0;
  --ds-primary-subtle: #e8f1ff;
  --ds-primary-muted: #cce0ff;
  --ds-ring: #0070f3;
}

.dark {
  --ds-primary: #60a5fa;
  --ds-primary-hover: #93c5fd;
  --ds-primary-subtle: #0c1d3e;
  --ds-primary-muted: #1a3366;
}`
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <div class="flex items-center gap-2 text-sm text-ds-fg-muted mb-6 font-ds">
      <NuxtLink to="/" class="hover:text-ds-fg transition-colors">DDS</NuxtLink>
      <span>/</span>
      <span class="text-ds-fg">Colors</span>
    </div>

    <h1 class="text-4xl font-bold text-ds-fg tracking-tight mb-3 font-ds">Colors</h1>
    <p class="text-lg text-ds-fg-muted mb-10 font-ds leading-relaxed">
      The color system is built on CSS custom properties. Override
      <code class="text-sm font-mono bg-ds-bg-muted px-1.5 py-0.5 rounded text-ds-primary">--ds-primary</code>
      to customize the entire theme.
    </p>

    <!-- Override example -->
    <div class="mb-12">
      <h2 class="text-xl font-semibold text-ds-fg mb-4 font-ds">Customization</h2>
      <DocsCodeBlock :code="overrideCode" language="css" filename="app/assets/theme.css" />
    </div>

    <!-- Color palettes -->
    <div class="space-y-10">
      <div v-for="group in colorGroups" :key="group.title">
        <h2 class="text-xl font-semibold text-ds-fg mb-1 font-ds">{{ group.title }}</h2>
        <p class="text-sm text-ds-fg-muted mb-4 font-ds">{{ group.description }}</p>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          <div
            v-for="swatch in group.swatches"
            :key="swatch.name"
            class="rounded-ds-lg overflow-hidden border border-ds-border"
          >
            <div :class="['h-14 w-full', swatch.tailwind]" />
            <div class="px-2.5 py-2 bg-ds-bg">
              <p class="text-xs font-semibold text-ds-fg font-ds">{{ swatch.label }}</p>
              <p class="text-xs text-ds-fg-subtle font-mono mt-0.5 break-all">{{ swatch.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
