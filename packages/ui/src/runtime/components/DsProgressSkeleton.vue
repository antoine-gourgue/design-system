<script setup lang="ts">
withDefaults(defineProps<{ showLabel?: boolean; size?: 'sm' | 'md' | 'lg'; class?: string }>(), {
  showLabel: true,
  size: 'md',
})
const heights: Record<string, string> = { sm: 'h-1', md: 'h-2', lg: 'h-3' }
</script>

<template>
  <div class="flex flex-col gap-2 w-full animate-pulse" aria-hidden="true" role="presentation">
    <div v-if="showLabel" class="flex items-center justify-between">
      <div class="h-3 w-20 rounded-full bg-ds-bg-muted" />
      <div class="h-3 w-8 rounded-full bg-ds-bg-muted" />
    </div>
    <div :class="['w-full rounded-full bg-ds-bg-muted', heights[size]]" />
  </div>
</template>
