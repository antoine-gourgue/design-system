<script setup lang="ts">
import { cn } from '../utils/cn'
import DsSkeleton from './DsSkeleton.vue'

interface DsDonutChartSkeletonProps {
  size?: number
  class?: string
}
const props = withDefaults(defineProps<DsDonutChartSkeletonProps>(), { size: 160 })
</script>

<template>
  <div :class="cn('flex items-center gap-6 animate-pulse', props.class)">
    <!-- Donut ring skeleton -->
    <div
      class="relative shrink-0 rounded-full"
      :style="{
        width: `${props.size}px`,
        height: `${props.size}px`,
        background: `conic-gradient(var(--ds-bg-muted) 0deg 360deg)`,
      }"
    >
      <!-- Inner hole -->
      <div
        class="absolute inset-0 m-auto rounded-full bg-ds-bg flex flex-col items-center justify-center"
        :style="{
          width: `${props.size * 0.55}px`,
          height: `${props.size * 0.55}px`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }"
      >
        <DsSkeleton class="h-5 w-10 rounded-ds-sm mb-1" />
        <DsSkeleton class="h-2.5 w-8 rounded-ds-sm" />
      </div>
    </div>

    <!-- Legend skeleton -->
    <div class="flex flex-col gap-2.5 flex-1 min-w-0">
      <div v-for="i in 4" :key="i" class="flex items-center gap-2.5">
        <DsSkeleton class="size-3 rounded-sm shrink-0" />
        <DsSkeleton class="h-2.5 flex-1 max-w-24 rounded-ds-sm" />
        <DsSkeleton class="h-2.5 w-8 rounded-ds-sm" />
      </div>
    </div>
  </div>
</template>
