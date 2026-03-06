<script setup lang="ts">
import { cn } from '../utils/cn'
import DsSkeleton from './DsSkeleton.vue'

interface DsAreaChartSkeletonProps {
  height?: number
  class?: string
}
const props = withDefaults(defineProps<DsAreaChartSkeletonProps>(), { height: 240 })
</script>

<template>
  <div :class="cn('w-full animate-pulse', props.class)">
    <div class="relative w-full" :style="{ height: `${height}px` }">
      <!-- Y-axis labels -->
      <div class="absolute left-0 top-0 bottom-8 flex flex-col justify-between w-10">
        <DsSkeleton v-for="i in 5" :key="i" class="h-2.5 w-8 rounded-ds-sm" />
      </div>

      <!-- Chart area with area fill -->
      <div class="absolute left-12 right-0 top-0 bottom-8 overflow-hidden rounded-ds-md">
        <svg class="w-full h-full" viewBox="0 0 400 180" preserveAspectRatio="none">
          <defs>
            <linearGradient id="area-sk-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--ds-border)" stop-opacity="0.5" />
              <stop offset="100%" stop-color="var(--ds-border)" stop-opacity="0.05" />
            </linearGradient>
          </defs>
          <polygon
            points="0,130 60,90 120,50 180,80 240,20 300,60 340,10 400,40 400,180 0,180"
            fill="url(#area-sk-grad)"
          />
          <polyline
            points="0,130 60,90 120,50 180,80 240,20 300,60 340,10 400,40"
            fill="none"
            stroke="var(--ds-border)"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
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
