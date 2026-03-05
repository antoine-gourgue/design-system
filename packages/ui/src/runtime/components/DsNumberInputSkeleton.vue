<script setup lang="ts">
withDefaults(defineProps<{ size?: 'sm' | 'md' | 'lg' }>(), { size: 'md' })
const heights: Record<string, string> = { sm: 'h-8', md: 'h-10', lg: 'h-11' }
</script>

<template>
  <div
    class="inline-flex items-center rounded-ds-md bg-ds-bg-muted animate-pulse overflow-hidden w-36"
    :class="heights[size]"
    aria-hidden="true"
    role="presentation"
  >
    <div class="border-r border-ds-border/50 h-full w-10"></div>
    <div class="flex-1"></div>
    <div class="border-l border-ds-border/50 h-full w-10"></div>
  </div>
</template>
