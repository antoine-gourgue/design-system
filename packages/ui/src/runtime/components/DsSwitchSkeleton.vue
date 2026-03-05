<script setup lang="ts">
withDefaults(defineProps<{ showLabel?: boolean, size?: 'sm' | 'md' | 'lg' }>(), {
  showLabel: true,
  size: 'md',
})
const trackSizes: Record<string, string> = { sm: 'w-8 h-4', md: 'w-10 h-5', lg: 'w-12 h-6' }
</script>

<template>
  <div class="flex items-center gap-3 animate-pulse" aria-hidden="true" role="presentation">
    <div class="rounded-full bg-ds-bg-muted" :class="[trackSizes[size]]"></div>
    <div v-if="showLabel" class="h-3.5 w-20 rounded-full bg-ds-bg-muted"></div>
  </div>
</template>
