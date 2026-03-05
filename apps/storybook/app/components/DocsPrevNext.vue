<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { componentNavItems } from '~/data/nav'

const route = useRoute()

const currentIndex = computed(() =>
  componentNavItems.findIndex(item => item.href === route.path),
)

const prev = computed(() => currentIndex.value > 0 ? componentNavItems[currentIndex.value - 1] : null)
const next = computed(() => currentIndex.value < componentNavItems.length - 1 ? componentNavItems[currentIndex.value + 1] : null)
</script>

<template>
  <div v-if="prev || next" class="flex items-center justify-between pt-8 mt-8 border-t border-ds-border">
    <!-- Previous -->
    <NuxtLink
      v-if="prev"
      :to="prev.href"
      class="group flex items-center gap-3 text-sm text-ds-fg-muted hover:text-ds-fg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring rounded-ds-md p-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      <div>
        <p class="text-xs text-ds-fg-subtle mb-0.5">Previous</p>
        <p class="font-medium text-ds-fg group-hover:text-ds-primary transition-colors">{{ prev.title }}</p>
      </div>
    </NuxtLink>
    <div v-else />

    <!-- Next -->
    <NuxtLink
      v-if="next"
      :to="next.href"
      class="group flex items-center gap-3 text-sm text-ds-fg-muted hover:text-ds-fg transition-colors text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring rounded-ds-md p-2"
    >
      <div>
        <p class="text-xs text-ds-fg-subtle mb-0.5">Next</p>
        <p class="font-medium text-ds-fg group-hover:text-ds-primary transition-colors">{{ next.title }}</p>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" class="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </NuxtLink>
    <div v-else />
  </div>
</template>
