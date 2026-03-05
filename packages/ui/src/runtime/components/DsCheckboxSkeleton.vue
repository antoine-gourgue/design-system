<script setup lang="ts">
withDefaults(defineProps<{ showLabel?: boolean; showDescription?: boolean }>(), {
  showLabel: true,
  showDescription: false,
})
</script>

<template>
  <div class="flex items-start gap-3 animate-pulse" aria-hidden="true" role="presentation">
    <div class="size-4 rounded-ds-sm bg-ds-bg-muted shrink-0 mt-0.5" />
    <div v-if="showLabel || showDescription" class="flex flex-col gap-1.5">
      <div v-if="showLabel" class="h-3.5 w-28 rounded-full bg-ds-bg-muted" />
      <div v-if="showDescription" class="h-3 w-44 rounded-full bg-ds-bg-muted" />
    </div>
  </div>
</template>
