<script setup lang="ts">
withDefaults(defineProps<{ count?: number }>(), { count: 4 })
</script>

<template>
  <ol class="relative space-y-0 animate-pulse" aria-hidden="true" role="presentation">
    <li v-for="i in count" :key="i" class="relative flex gap-4 pb-8 last:pb-0">
      <div v-if="i < count" class="absolute left-[13px] top-7 bottom-0 w-px bg-ds-border"></div>
      <div class="relative z-10 size-7 shrink-0 rounded-full bg-ds-bg-muted border-2 border-ds-border"></div>
      <div class="flex flex-col gap-2 pt-0.5 flex-1">
        <div class="flex items-center justify-between gap-4">
          <div class="h-3.5 rounded-full bg-ds-bg-muted" :style="{ width: `${80 + i * 20}px` }"></div>
          <div class="h-3 w-16 rounded-full bg-ds-bg-muted shrink-0"></div>
        </div>
        <div class="h-3 rounded-full bg-ds-bg-muted w-3/4"></div>
        <div v-if="i % 2 === 0" class="h-3 rounded-full bg-ds-bg-muted w-1/2"></div>
      </div>
    </li>
  </ol>
</template>
