<script setup lang="ts">
import { cn } from '../utils/cn'
import DsSkeleton from './DsSkeleton.vue'

interface DsGaugeChartSkeletonProps {
  size?: number
  class?: string
}
const props = withDefaults(defineProps<DsGaugeChartSkeletonProps>(), { size: 180 })

const cx = props.size / 2
const cy = props.size / 2
const r = (props.size - 28 * 2) / 2 - 4

function polarToXY(angleDeg: number): { x: number, y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  }
}

function arc(startDeg: number, endDeg: number): string {
  const s = polarToXY(startDeg)
  const e = polarToXY(endDeg)
  const large = endDeg - startDeg > 180 ? 1 : 0
  return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`
}
</script>

<template>
  <div :class="cn('inline-flex flex-col items-center animate-pulse', props.class)">
    <div class="relative" :style="{ width: `${size}px`, height: `${size}px` }">
      <svg
        :width="size"
        :height="size"
        :viewBox="`0 0 ${size} ${size}`"
        class="overflow-visible"
        aria-hidden="true"
      >
        <!-- Track -->
        <path
          :d="arc(135, 404.9)"
          fill="none"
          stroke="var(--ds-bg-muted)"
          stroke-width="14"
          stroke-linecap="round"
        />
        <!-- Fill skeleton (60%) -->
        <path
          :d="arc(135, 297)"
          fill="none"
          stroke="var(--ds-border)"
          stroke-width="14"
          stroke-linecap="round"
        />
      </svg>

      <!-- Center placeholder -->
      <div
        class="absolute inset-0 flex flex-col items-center justify-center gap-1.5"
        style="padding-top: 15%"
      >
        <DsSkeleton class="h-7 w-14 rounded-ds-md" />
        <DsSkeleton class="h-2.5 w-10 rounded-ds-sm" />
      </div>
    </div>

    <!-- Min/Max -->
    <div class="flex justify-between mt-1" :style="{ width: `${size}px` }">
      <DsSkeleton class="h-2.5 w-6 rounded-ds-sm" />
      <DsSkeleton class="h-2.5 w-8 rounded-ds-sm" />
    </div>
  </div>
</template>
