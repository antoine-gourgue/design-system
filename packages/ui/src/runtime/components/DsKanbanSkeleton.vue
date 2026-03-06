<script setup lang="ts">
import { cn } from '../utils/cn'
import DsSkeleton from './DsSkeleton.vue'

interface DsKanbanSkeletonProps {
  columns?: number
  cardsPerColumn?: number[]
  class?: string
}
const props = withDefaults(defineProps<DsKanbanSkeletonProps>(), {
  columns: 3,
  cardsPerColumn: () => [3, 2, 4],
})
</script>

<template>
  <div :class="cn('flex gap-4 overflow-x-auto pb-2 animate-pulse', props.class)">
    <div
      v-for="ci in props.columns"
      :key="ci"
      class="flex flex-col gap-2 rounded-ds-xl border border-ds-border bg-ds-bg-subtle p-3 min-w-64 max-w-72 flex-shrink-0"
    >
      <!-- Column header -->
      <div class="flex items-center justify-between px-1 mb-1">
        <div class="flex items-center gap-2">
          <DsSkeleton class="size-2 rounded-full" />
          <DsSkeleton class="h-3.5 w-20 rounded-ds-sm" />
        </div>
        <DsSkeleton class="h-5 w-6 rounded-full" />
      </div>

      <!-- Cards -->
      <div
        v-for="i in (props.cardsPerColumn[ci - 1] ?? 2)"
        :key="i"
        class="rounded-ds-lg border border-ds-border bg-ds-bg p-3 space-y-2"
      >
        <DsSkeleton class="h-3 w-1/3 rounded-full" />
        <DsSkeleton class="h-3.5 w-5/6 rounded-ds-sm" />
        <DsSkeleton class="h-3 w-full rounded-ds-sm" />
        <DsSkeleton class="h-3 w-4/5 rounded-ds-sm" />
        <div class="flex gap-1 pt-1">
          <DsSkeleton class="h-4 w-12 rounded-full" />
          <DsSkeleton class="h-4 w-10 rounded-full" />
        </div>
      </div>
    </div>
  </div>
</template>
