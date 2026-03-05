<script setup lang="ts">
import { cn } from '../utils/cn'
const props = defineProps<{ count?: number, class?: string }>()
</script>

<template>
  <div :class="cn('animate-pulse divide-y divide-ds-border', props.class)">
    <div
      v-for="i in (props.count ?? 3)"
      :key="i"
      class="flex items-start gap-3 px-4 py-3"
    >
      <div class="shrink-0 size-9 rounded-full bg-ds-bg-muted" />
      <div class="flex-1 space-y-2">
        <div class="h-3.5 w-2/3 rounded bg-ds-bg-muted" />
        <div class="h-3 w-full rounded bg-ds-bg-muted" />
        <div class="h-2.5 w-16 rounded bg-ds-bg-muted" />
      </div>
    </div>
  </div>
</template>
