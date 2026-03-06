<script setup lang="ts">
import { cn } from '../utils/cn'
import DsSkeleton from './DsSkeleton.vue'

interface DsQRCodeSkeletonProps {
  size?: number
  class?: string
}
const props = withDefaults(defineProps<DsQRCodeSkeletonProps>(), { size: 200 })
</script>

<template>
  <div :class="cn('inline-flex flex-col items-center gap-2 animate-pulse', props.class)">
    <DsSkeleton
      class="rounded-ds-lg"
      :style="{ width: `${props.size}px`, height: `${props.size}px` }"
    />
    <DsSkeleton class="h-2.5 w-24 rounded-ds-sm" />
  </div>
</template>
