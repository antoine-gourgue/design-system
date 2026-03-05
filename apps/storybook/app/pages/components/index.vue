<script setup lang="ts">
import { componentDocs } from '~/data/components'
import { nav } from '~/data/nav'

const categories = nav.filter(g => !['Getting Started', 'Foundations'].includes(g.title))

function getCategoryDocs(groupTitle: string) {
  const group = nav.find(g => g.title === groupTitle)
  if (!group) return []
  return group.items
    .map(item => {
      const slug = item.href.replace('/components/', '')
      return componentDocs.find(c => c.slug === slug)
    })
    .filter(Boolean)
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <!-- Header -->
    <div class="mb-10">
      <div class="flex items-center gap-2 text-sm text-ds-fg-muted mb-3 font-ds">
        <NuxtLink to="/" class="hover:text-ds-fg transition-colors">DDS</NuxtLink>
        <span>/</span>
        <span class="text-ds-fg">Components</span>
      </div>
      <h1 class="text-4xl font-bold text-ds-fg tracking-tight mb-3 font-ds">Components</h1>
      <p class="text-lg text-ds-fg-muted font-ds">
        {{ componentDocs.length }} components with TypeScript, dark mode, and accessibility built-in.
      </p>
    </div>

    <!-- Categories -->
    <div class="space-y-10">
      <div v-for="group in categories" :key="group.title">
        <h2 class="text-sm font-semibold uppercase tracking-wider text-ds-fg-subtle mb-4 font-ds">
          {{ group.title }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <NuxtLink
            v-for="item in group.items"
            :key="item.href"
            :to="item.href"
            class="group flex flex-col gap-1.5 p-4 rounded-ds-lg border border-ds-border bg-ds-bg hover:border-ds-primary/40 hover:shadow-ds-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring"
          >
            <span class="font-semibold text-sm text-ds-fg group-hover:text-ds-primary transition-colors font-ds">
              {{ item.title }}
            </span>
            <span
              v-if="getCategoryDocs(group.title).find(c => c?.slug === item.href.replace('/components/', ''))?.description"
              class="text-xs text-ds-fg-muted leading-relaxed line-clamp-2"
            >
              {{ getCategoryDocs(group.title).find(c => c?.slug === item.href.replace('/components/', ''))?.description }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
