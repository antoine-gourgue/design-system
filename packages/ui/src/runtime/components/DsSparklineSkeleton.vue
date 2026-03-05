<script setup lang="ts">
import { cn } from '../utils/cn'
import DsSkeleton from './DsSkeleton.vue'

interface DsSparklineSkeletonProps {
  width?: number
  height?: number
  showValue?: boolean
  class?: string
}
const props = withDefaults(defineProps<DsSparklineSkeletonProps>(), {
  width: 100,
  height: 36,
  showValue: false,
})
</script>

<template>
  <div :class="cn('inline-flex items-center gap-2 animate-pulse', props.class)">
    <DsSkeleton
      class="rounded-ds-sm"
      :style="{ width: `${props.width}px`, height: `${props.height}px` }"
    />
    <DsSkeleton v-if="showValue" class="h-3.5 w-8 rounded-ds-sm" />
  </div>
</template>
