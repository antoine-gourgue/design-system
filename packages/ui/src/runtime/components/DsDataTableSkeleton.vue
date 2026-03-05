<script setup lang="ts">
import { cn } from '../utils/cn'
import DsSkeleton from './DsSkeleton.vue'

interface DsDataTableSkeletonProps {
  rows?: number
  columns?: number
  class?: string
}
const props = withDefaults(defineProps<DsDataTableSkeletonProps>(), { rows: 5, columns: 4 })
</script>

<template>
  <div :class="cn('w-full space-y-3 animate-pulse', props.class)">
    <!-- Search skeleton -->
    <DsSkeleton class="h-9 w-64 rounded-ds-md" />
    <!-- Table skeleton -->
    <div class="w-full rounded-ds-xl border border-ds-border overflow-hidden">
      <!-- Header -->
      <div class="flex gap-4 px-4 py-2.5 border-b border-ds-border bg-ds-bg-muted">
        <DsSkeleton v-for="c in props.columns" :key="c" class="h-3 flex-1 rounded-ds-md" />
      </div>
      <!-- Rows -->
      <div
        v-for="r in props.rows"
        :key="r"
        class="flex gap-4 px-4 py-3 border-b border-ds-border last:border-0"
      >
        <DsSkeleton
          v-for="c in props.columns"
          :key="c"
          :class="cn('h-4 flex-1 rounded-ds-md', c === 1 ? 'max-w-24' : '')"
        />
      </div>
    </div>
  </div>
</template>
