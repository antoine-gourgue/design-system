<script setup lang="ts">
withDefaults(defineProps<{ max?: number, size?: 'sm' | 'md' | 'lg' }>(), { max: 5, size: 'md' })
const sizes: Record<string, string> = { sm: 'size-4', md: 'size-6', lg: 'size-8' }
</script>

<template>
  <div class="flex items-center gap-0.5 animate-pulse" aria-hidden="true" role="presentation">
    <div v-for="i in max" :key="i" class="rounded-sm bg-ds-bg-muted" :class="[sizes[size]]"></div>
  </div>
</template>
