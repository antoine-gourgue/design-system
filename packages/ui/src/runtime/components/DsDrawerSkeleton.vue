<script setup lang="ts">
export interface DsDrawerSkeletonProps {
  side?: 'left' | 'right' | 'bottom'
  rows?: number
}

withDefaults(defineProps<DsDrawerSkeletonProps>(), {
  side: 'right',
  rows: 4,
})
</script>

<template>
  <div class="flex flex-col border border-ds-border rounded-ds-xl overflow-hidden bg-ds-bg-elevated w-80 h-96 shadow-ds-lg">
    <!-- Header skeleton -->
    <div class="flex items-center justify-between px-6 py-5 border-b border-ds-border">
      <div class="space-y-2 flex-1">
        <div class="h-4 w-2/5 rounded-ds-md bg-ds-bg-muted animate-pulse"></div>
        <div class="h-3 w-3/5 rounded-ds-md bg-ds-bg-muted animate-pulse"></div>
      </div>
      <div class="size-7 rounded-ds-md bg-ds-bg-muted animate-pulse shrink-0"></div>
    </div>

    <!-- Content skeleton -->
    <div class="flex-1 px-6 py-5 space-y-3">
      <div
        v-for="i in rows"
        :key="i"
        :class="i % 3 === 0 ? 'w-3/5' : i % 2 === 0 ? 'w-4/5' : 'w-full'"
        class="h-3 rounded-ds-md bg-ds-bg-muted animate-pulse"
      ></div>
    </div>

    <!-- Footer skeleton -->
    <div class="border-t border-ds-border px-6 py-4 flex gap-3">
      <div class="flex-1 h-9 rounded-ds-md bg-ds-bg-muted animate-pulse"></div>
      <div class="flex-1 h-9 rounded-ds-md bg-ds-primary/20 animate-pulse"></div>
    </div>
  </div>
</template>
