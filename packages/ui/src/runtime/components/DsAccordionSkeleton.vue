<script setup lang="ts">
withDefaults(defineProps<{ items?: number; showContent?: boolean }>(), {
  items: 3,
  showContent: false,
})
</script>

<template>
  <div class="w-full divide-y divide-ds-border border border-ds-border rounded-ds-lg overflow-hidden animate-pulse" aria-hidden="true" role="presentation">
    <div
      v-for="i in items"
      :key="i"
      class="px-4"
    >
      <!-- Header row -->
      <div class="flex items-center justify-between py-4 gap-4">
        <div class="h-3.5 rounded-full bg-ds-bg-muted" :style="{ width: `${100 + i * 30}px` }" />
        <div class="size-4 rounded-sm bg-ds-bg-muted shrink-0" />
      </div>
      <!-- Expanded content (only first item) -->
      <div v-if="showContent && i === 1" class="pb-4 space-y-2">
        <div class="h-3 w-full rounded-full bg-ds-bg-muted" />
        <div class="h-3 w-5/6 rounded-full bg-ds-bg-muted" />
        <div class="h-3 w-3/4 rounded-full bg-ds-bg-muted" />
      </div>
    </div>
  </div>
</template>
