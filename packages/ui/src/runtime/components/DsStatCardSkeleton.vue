<script setup lang="ts">
withDefaults(defineProps<{
  /** Show the trend badge placeholder */
  showTrend?: boolean
  /** Show the description line placeholder */
  showDescription?: boolean
}>(), {
  showTrend: true,
  showDescription: false,
})
</script>

<template>
  <div class="bg-ds-bg-elevated border border-ds-border rounded-ds-xl px-5 py-4 flex flex-col gap-3 shadow-ds-sm animate-pulse">
    <!-- Label -->
    <div class="h-3 w-24 rounded-full bg-ds-bg-muted" />

    <!-- Value + trend row -->
    <div class="flex items-end justify-between gap-2">
      <!-- Big value -->
      <div class="h-8 w-28 rounded-ds-md bg-ds-bg-muted" />
      <!-- Trend badge -->
      <div v-if="showTrend" class="h-5 w-14 rounded-full bg-ds-bg-muted" />
    </div>

    <!-- Optional description line -->
    <div v-if="showDescription" class="h-2.5 w-36 rounded-full bg-ds-bg-muted" />
  </div>
</template>
