<script setup lang="ts">
withDefaults(defineProps<{ showLabel?: boolean }>(), { showLabel: true })
</script>

<template>
  <div class="flex flex-col gap-2 w-full animate-pulse" aria-hidden="true" role="presentation">
    <div v-if="showLabel" class="flex items-center justify-between">
      <div class="h-3.5 w-20 rounded-full bg-ds-bg-muted" />
      <div class="h-3.5 w-8 rounded-full bg-ds-bg-muted" />
    </div>
    <div class="h-1.5 w-full rounded-full bg-ds-bg-muted" />
    <div class="flex items-center justify-between">
      <div class="h-2.5 w-4 rounded-full bg-ds-bg-muted" />
      <div class="h-2.5 w-6 rounded-full bg-ds-bg-muted" />
    </div>
  </div>
</template>
