<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsSparklineProps {
  data: number[]
  type?: 'line' | 'bar'
  color?: string
  showArea?: boolean
  width?: number
  height?: number
  /** Show last value as label */
  showValue?: boolean
  /** Auto-color based on trend (up=green, down=red) */
  trendColor?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsSparklineProps>(), {
  type: 'line',
  color: '#7f00ff',
  showArea: true,
  width: 100,
  height: 36,
  showValue: false,
  trendColor: false,
})

const W = computed(() => props.width)
const H = computed(() => props.height)

const minVal = computed(() => Math.min(...props.data))
const maxVal = computed(() => Math.max(...props.data))
const range = computed(() => (maxVal.value - minVal.value) || 1)

function xAt(i: number): number {
  const n = props.data.length
  return n > 1 ? (i / (n - 1)) * W.value : W.value / 2
}

function yAt(val: number): number {
  return H.value - ((val - minVal.value) / range.value) * (H.value - 4) - 2
}

// For line chart
const linePath = computed(() =>
  props.data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i).toFixed(1)} ${yAt(v).toFixed(1)}`).join(' ')
)

const areaPath = computed(() => {
  const n = props.data.length
  return `${linePath.value} L ${xAt(n - 1).toFixed(1)} ${H.value} L ${xAt(0).toFixed(1)} ${H.value} Z`
})

// Trend: is last value > first?
const trend = computed(() => {
  if (props.data.length < 2) return 0
  return props.data[props.data.length - 1] - props.data[0]
})

const effectiveColor = computed(() => {
  if (!props.trendColor) return props.color
  if (trend.value > 0) return '#22c55e'
  if (trend.value < 0) return '#ef4444'
  return '#64748b'
})

// For bar chart
const barW = computed(() => {
  const n = props.data.length
  return n > 0 ? W.value / n - 2 : 10
})

function barH(val: number): number {
  return ((val - minVal.value) / range.value) * (H.value - 4)
}

function barX(i: number): number {
  const n = props.data.length
  return i * (W.value / n)
}

const lastValue = computed(() => props.data[props.data.length - 1])
</script>

<template>
  <div :class="cn('inline-flex items-center gap-2', props.class)">
    <svg
      :width="width"
      :height="height"
      :viewBox="`0 0 ${width} ${height}`"
      class="overflow-visible"
    >
      <!-- Line sparkline -->
      <template v-if="type === 'line'">
        <path
          v-if="showArea"
          :d="areaPath"
          :fill="effectiveColor"
          fill-opacity="0.15"
        />
        <path
          :d="linePath"
          :stroke="effectiveColor"
          stroke-width="1.75"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <!-- Last dot -->
        <circle
          :cx="xAt(data.length - 1)"
          :cy="yAt(data[data.length - 1])"
          r="2.5"
          :fill="effectiveColor"
        />
      </template>

      <!-- Bar sparkline -->
      <template v-else-if="type === 'bar'">
        <rect
          v-for="(val, i) in data"
          :key="i"
          :x="barX(i) + 1"
          :y="H - barH(val) - 2"
          :width="barW"
          :height="barH(val)"
          :fill="effectiveColor"
          :opacity="i === data.length - 1 ? 1 : 0.55"
          rx="1"
        />
      </template>
    </svg>

    <!-- Optional value label -->
    <span v-if="showValue" class="text-xs font-semibold" :style="{ color: effectiveColor }">
      {{ lastValue?.toLocaleString() }}
    </span>
  </div>
</template>
