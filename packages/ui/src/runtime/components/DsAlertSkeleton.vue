<script setup lang="ts">
withDefaults(defineProps<{ showTitle?: boolean; class?: string }>(), { showTitle: true })
</script>

<template>
  <div
    class="flex items-start gap-3 rounded-ds-lg border border-ds-border bg-ds-bg-subtle p-4 animate-pulse w-full"
    :class="props?.class"
    aria-hidden="true"
    role="presentation"
  >
    <!-- Icon -->
    <div class="size-5 rounded-full bg-ds-bg-muted shrink-0 mt-0.5" />
    <!-- Text -->
    <div class="flex-1 space-y-2">
      <div v-if="showTitle" class="h-3.5 w-32 rounded-full bg-ds-bg-muted" />
      <div class="h-3 w-full rounded-full bg-ds-bg-muted" />
      <div class="h-3 w-4/5 rounded-full bg-ds-bg-muted" />
    </div>
  </div>
</template>
