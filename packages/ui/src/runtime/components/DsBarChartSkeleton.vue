<script setup lang="ts">
import { cn } from '../utils/cn'
import DsSkeleton from './DsSkeleton.vue'

interface DsBarChartSkeletonProps {
  bars?: number
  height?: number
  class?: string
}
const props = withDefaults(defineProps<DsBarChartSkeletonProps>(), { bars: 6, height: 240 })

// Pseudo-random bar heights for a realistic look
const barHeights = [70, 45, 85, 55, 95, 40, 75, 60]
</script>

<template>
  <div :class="cn('w-full animate-pulse', props.class)">
    <div class="relative" :style="{ height: `${height}px` }">
      <!-- Y-axis labels -->
      <div class="absolute left-0 top-0 bottom-8 flex flex-col justify-between w-10">
        <DsSkeleton v-for="i in 5" :key="i" class="h-2.5 w-8 rounded-ds-sm" />
      </div>

      <!-- Chart area with bars -->
      <div class="absolute left-12 right-0 top-0 bottom-8 flex items-end gap-3 px-2">
        <div
          v-for="i in props.bars" :key="i"
          class="flex-1 flex flex-col items-center justify-end"
        >
          <DsSkeleton
            class="w-full rounded-t-ds-sm"
            :style="{ height: `${barHeights[(i - 1) % barHeights.length]}%` }"
          />
        </div>
      </div>

      <!-- X-axis labels -->
      <div class="absolute left-12 right-0 bottom-0 flex gap-3 px-2">
        <div v-for="i in props.bars" :key="i" class="flex-1 flex justify-center">
          <DsSkeleton class="h-2.5 w-6 rounded-ds-sm" />
        </div>
      </div>
    </div>

    <!-- Legend placeholder -->
    <div class="flex justify-center gap-5 mt-3">
      <div v-for="i in 2" :key="i" class="flex items-center gap-1.5">
        <DsSkeleton class="size-2.5 rounded-sm" />
        <DsSkeleton class="h-2.5 w-12 rounded-ds-sm" />
      </div>
    </div>
  </div>
</template>
