<script setup lang="ts">
withDefaults(defineProps<{ steps?: number }>(), { steps: 3 })
const widths = ['w-14', 'w-20', 'w-16', 'w-24', 'w-12']
</script>

<template>
  <div class="flex items-center gap-2 animate-pulse" aria-hidden="true" role="presentation">
    <template v-for="i in steps" :key="i">
      <div class="h-3.5 rounded-full bg-ds-bg-muted" :class="[widths[(i - 1) % widths.length]]"></div>
      <div v-if="i < steps" class="h-3 w-3 rounded-sm bg-ds-bg-muted shrink-0 opacity-50"></div>
    </template>
  </div>
</template>
