<script setup lang="ts">
import { cn } from '../utils/cn'
import DsSkeleton from './DsSkeleton.vue'

interface DsLineChartSkeletonProps {
  height?: number
  class?: string
}
const props = withDefaults(defineProps<DsLineChartSkeletonProps>(), { height: 240 })
</script>

<template>
  <div :class="cn('w-full animate-pulse', props.class)">
    <div class="relative w-full" :style="{ height: `${height}px` }">
      <!-- Y-axis label placeholders -->
      <div class="absolute left-0 top-0 bottom-8 flex flex-col justify-between w-10">
        <DsSkeleton v-for="i in 5" :key="i" class="h-2.5 w-8 rounded-ds-sm" />
      </div>

      <!-- Chart area -->
      <div class="absolute left-12 right-0 top-0 bottom-8 flex flex-col justify-between">
        <!-- Grid lines -->
        <DsSkeleton v-for="i in 5" :key="i" class="h-px w-full rounded-none opacity-50" />
      </div>

      <!-- Fake polyline using SVG skeleton -->
      <div class="absolute left-12 right-0 top-0 bottom-8 overflow-hidden rounded-ds-md">
        <svg class="w-full h-full" viewBox="0 0 400 180" preserveAspectRatio="none">
          <polyline
            points="0,140 60,100 120,60 180,90 240,30 300,70 340,20 400,50"
            fill="none"
            stroke="var(--ds-border)"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <polygon
            points="0,140 60,100 120,60 180,90 240,30 300,70 340,20 400,50 400,180 0,180"
            fill="var(--ds-border)"
            opacity="0.3"
          />
        </svg>
      </div>

      <!-- X-axis labels -->
      <div class="absolute left-12 right-0 bottom-0 flex justify-between">
        <DsSkeleton v-for="i in 6" :key="i" class="h-2.5 w-8 rounded-ds-sm" />
      </div>
    </div>

    <!-- Legend placeholder -->
    <div class="flex justify-center gap-5 mt-3">
      <div v-for="i in 2" :key="i" class="flex items-center gap-1.5">
        <DsSkeleton class="size-2.5 rounded-full" />
        <DsSkeleton class="h-2.5 w-12 rounded-ds-sm" />
      </div>
    </div>
  </div>
</template>
