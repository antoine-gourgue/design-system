<script setup lang="ts">
withDefaults(defineProps<{ steps?: number }>(), { steps: 4 })
</script>

<template>
  <div class="flex items-start animate-pulse" aria-hidden="true" role="presentation">
    <div v-for="i in steps" :key="i" class="flex flex-col items-center text-center flex-1 gap-2">
      <div class="size-8 rounded-full bg-ds-bg-muted shrink-0" />
      <div class="h-3 rounded-full bg-ds-bg-muted" :style="{ width: `${40 + i * 10}px` }" />
    </div>
  </div>
</template>
