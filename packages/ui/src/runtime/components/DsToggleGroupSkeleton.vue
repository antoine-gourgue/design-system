<script setup lang="ts">
import { cn } from '../utils/cn'
import DsSkeleton from './DsSkeleton.vue'

interface DsToggleGroupSkeletonProps {
  count?: number
  size?: 'sm' | 'md' | 'lg'
  class?: string
}
const props = withDefaults(defineProps<DsToggleGroupSkeletonProps>(), { count: 3, size: 'md' })

const heights: Record<string, string> = { sm: 'h-6', md: 'h-7', lg: 'h-8' }
</script>

<template>
  <div :class="cn('inline-flex items-center gap-1 rounded-ds-lg border border-ds-border bg-ds-bg p-1 animate-pulse', props.class)">
    <DsSkeleton
      v-for="i in props.count"
      :key="i"
      :class="cn(heights[props.size], 'w-20 rounded-ds-md')"
    />
  </div>
</template>
