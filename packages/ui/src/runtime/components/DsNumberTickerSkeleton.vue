<script setup lang="ts">
import { cn } from '../utils/cn'
import DsSkeleton from './DsSkeleton.vue'

interface DsNumberTickerSkeletonProps {
  width?: string
  class?: string
}
const props = withDefaults(defineProps<DsNumberTickerSkeletonProps>(), { width: 'w-24' })
</script>

<template>
  <div :class="cn('inline-flex flex-col items-start gap-1.5 animate-pulse', props.class)">
    <DsSkeleton :class="`h-8 ${props.width} rounded-ds-md`" />
    <DsSkeleton class="h-3 w-16 rounded-ds-sm" />
  </div>
</template>
