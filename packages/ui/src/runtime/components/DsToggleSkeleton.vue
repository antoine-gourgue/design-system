<script setup lang="ts">
import { cn } from '../utils/cn'
import DsSkeleton from './DsSkeleton.vue'

interface DsToggleSkeletonProps {
  size?: 'sm' | 'md' | 'lg'
  class?: string
}
const props = withDefaults(defineProps<DsToggleSkeletonProps>(), { size: 'md' })

const heights: Record<string, string> = { sm: 'h-8', md: 'h-9', lg: 'h-10' }
</script>

<template>
  <DsSkeleton :class="cn(heights[props.size], 'w-24 rounded-ds-md animate-pulse', props.class)" />
</template>
