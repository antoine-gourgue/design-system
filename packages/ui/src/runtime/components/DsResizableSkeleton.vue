<script setup lang="ts">
import { cn } from '../utils/cn'
import DsSkeleton from './DsSkeleton.vue'

interface DsResizableSkeletonProps {
  direction?: 'horizontal' | 'vertical'
  class?: string
}
const props = withDefaults(defineProps<DsResizableSkeletonProps>(), { direction: 'horizontal' })
</script>

<template>
  <div
    :class="cn(
      'w-full animate-pulse rounded-ds-lg border border-ds-border overflow-hidden',
      direction === 'vertical' ? 'flex flex-col' : 'flex flex-row',
      props.class,
    )"
    style="height: 200px"
  >
    <!-- Panel A -->
    <div :class="direction === 'horizontal' ? 'w-1/2 p-4 space-y-2' : 'h-1/2 p-4 space-y-2'">
      <DsSkeleton class="h-4 w-3/4 rounded-ds-md" />
      <DsSkeleton class="h-3 w-full rounded-ds-sm" />
      <DsSkeleton class="h-3 w-5/6 rounded-ds-sm" />
      <DsSkeleton class="h-3 w-4/6 rounded-ds-sm" />
    </div>

    <!-- Handle -->
    <div
      :class="cn(
        'bg-ds-border shrink-0 flex items-center justify-center',
        direction === 'horizontal' ? 'w-1.5' : 'h-1.5',
      )"
    >
    </div>

    <!-- Panel B -->
    <div :class="direction === 'horizontal' ? 'flex-1 p-4 bg-ds-bg-subtle space-y-2' : 'flex-1 p-4 bg-ds-bg-subtle space-y-2'">
      <DsSkeleton class="h-4 w-2/3 rounded-ds-md" />
      <DsSkeleton class="h-3 w-full rounded-ds-sm" />
      <DsSkeleton class="h-3 w-4/5 rounded-ds-sm" />
    </div>
  </div>
</template>
