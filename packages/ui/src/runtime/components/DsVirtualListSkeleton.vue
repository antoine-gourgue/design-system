<script setup lang="ts">
import { cn } from '../utils/cn'
import DsSkeleton from './DsSkeleton.vue'

interface DsVirtualListSkeletonProps {
  rows?: number
  height?: number
  class?: string
}
const props = withDefaults(defineProps<DsVirtualListSkeletonProps>(), { rows: 6, height: 400 })

const widths = ['w-3/4', 'w-full', 'w-5/6', 'w-2/3', 'w-4/5', 'w-1/2']
</script>

<template>
  <div
    :class="cn('w-full border border-ds-border rounded-ds-lg overflow-hidden animate-pulse', props.class)"
    :style="{ height: `${height}px` }"
  >
    <div
      v-for="i in props.rows"
      :key="i"
      class="flex items-center gap-3 px-4 py-3 border-b border-ds-border last:border-0"
    >
      <DsSkeleton class="size-8 rounded-full shrink-0" />
      <div class="flex-1 space-y-1.5">
        <DsSkeleton :class="`h-3.5 ${widths[(i - 1) % widths.length]} rounded-ds-sm`" />
        <DsSkeleton class="h-2.5 w-1/2 rounded-ds-sm" />
      </div>
      <DsSkeleton class="h-6 w-14 rounded-ds-md shrink-0" />
    </div>
  </div>
</template>
