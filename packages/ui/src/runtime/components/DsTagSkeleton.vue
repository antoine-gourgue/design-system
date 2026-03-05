<script setup lang="ts">
withDefaults(defineProps<{ count?: number, size?: 'sm' | 'md' | 'lg' }>(), { count: 3, size: 'md' })
const heights: Record<string, string> = { sm: 'h-5', md: 'h-6', lg: 'h-7' }
const widths = ['w-14', 'w-20', 'w-16', 'w-24', 'w-12', 'w-18']
</script>

<template>
  <div class="flex flex-wrap gap-2 animate-pulse" aria-hidden="true" role="presentation">
    <div
      v-for="i in count"
      :key="i"
      class="rounded-full bg-ds-bg-muted" :class="[heights[size], widths[(i - 1) % widths.length]]"
    ></div>
  </div>
</template>
