<script lang="ts">
const DONUT_COLORS = ['#7f00ff', '#06b6d4', '#f97316', '#22c55e', '#f59e0b', '#ec4899', '#6366f1', '#14b8a6']
const CX = 100
const CY = 100
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsDonutChartItem {
  label: string
  value: number
  color?: string
}

export interface DsDonutChartProps {
  data: DsDonutChartItem[]
  /** 0 = pie chart, default 28 = donut */
  thickness?: number
  radius?: number
  showLegend?: boolean
  showTotal?: boolean
  totalLabel?: string
  size?: number
  class?: string
}

const props = withDefaults(defineProps<DsDonutChartProps>(), {
  thickness: 28,
  radius: 70,
  showLegend: true,
  showTotal: true,
  totalLabel: 'Total',
  size: 200,
})

const total = computed(() => props.data.reduce((s, d) => s + d.value, 0))

// Circumference of the circle
const circumference = computed(() => 2 * Math.PI * props.radius)

// Compute each segment: dasharray + dashoffset (offset is cumulative)
interface Segment {
  item: DsDonutChartItem
  color: string
  dashArray: string
  dashOffset: number
  pct: number
}

const segments = computed<Segment[]>(() => {
  const segs: Segment[] = []
  let cumulative = 0
  for (let i = 0; i < props.data.length; i++) {
    const item = props.data[i]
    const pct = total.value > 0 ? item.value / total.value : 0
    const dash = pct * circumference.value
    const gap = circumference.value - dash
    segs.push({
      item,
      color: item.color ?? DONUT_COLORS[i % DONUT_COLORS.length],
      dashArray: `${dash.toFixed(2)} ${gap.toFixed(2)}`,
      dashOffset: -(cumulative * circumference.value),
      pct,
    })
    cumulative += pct
  }
  return segs
})

const hovered = ref<number | null>(null)

// Pie chart: use arc paths instead of stroke
function polarToCartesian(angle: number, r: number) {
  const rad = (angle - 90) * (Math.PI / 180)
  return {
    x: (CX + r * Math.cos(rad)).toFixed(2),
    y: (CY + r * Math.sin(rad)).toFixed(2),
  }
}

function arcPath(startAngle: number, endAngle: number): string {
  const outerR = props.radius
  const innerR = props.radius - props.thickness
  const start = polarToCartesian(startAngle, outerR)
  const end = polarToCartesian(endAngle, outerR)
  const startInner = polarToCartesian(startAngle, innerR)
  const endInner = polarToCartesian(endAngle, innerR)
  const large = endAngle - startAngle > 180 ? 1 : 0
  if (props.thickness === 0) {
    // Pie slice
    return `M ${CX} ${CY} L ${start.x} ${start.y} A ${outerR} ${outerR} 0 ${large} 1 ${end.x} ${end.y} Z`
  }
  // Donut segment
  return `M ${start.x} ${start.y} A ${outerR} ${outerR} 0 ${large} 1 ${end.x} ${end.y} L ${endInner.x} ${endInner.y} A ${innerR} ${innerR} 0 ${large} 0 ${startInner.x} ${startInner.y} Z`
}

interface PathSegment {
  path: string
  color: string
  label: string
  value: number
  pct: number
}

const pathSegments = computed<PathSegment[]>(() => {
  let currentAngle = 0
  return props.data.map((item, i) => {
    const pct = total.value > 0 ? item.value / total.value : 0
    const sweep = pct * 360
    const start = currentAngle
    currentAngle += sweep
    return {
      path: arcPath(start, currentAngle - 0.3),
      color: item.color ?? DONUT_COLORS[i % DONUT_COLORS.length],
      label: item.label,
      value: item.value,
      pct,
    }
  })
})

const vboxSize = 200
</script>

<template>
  <div :class="cn('w-full select-none', props.class)">
    <div class="flex flex-col sm:flex-row items-center gap-6">
      <!-- SVG Donut -->
      <div class="relative shrink-0" :style="{ width: `${size}px`, height: `${size}px` }">
        <svg
          :viewBox="`0 0 ${vboxSize} ${vboxSize}`"
          :width="size"
          :height="size"
          class="overflow-visible -rotate-0"
        >
          <!-- Background ring -->
          <circle
            :cx="CX" :cy="CY"
            :r="radius"
            fill="none"
            stroke="var(--ds-bg-muted)"
            :stroke-width="thickness"
          />

          <!-- Segments -->
          <path
            v-for="(seg, i) in pathSegments"
            :key="i"
            :d="seg.path"
            :fill="seg.color"
            :opacity="hovered === null || hovered === i ? 1 : 0.45"
            class="transition-opacity duration-150 cursor-pointer"
            :style="hovered === i ? { filter: 'brightness(1.1)' } : {}"
            @mouseenter="hovered = i"
            @mouseleave="hovered = null"
          />

          <!-- Center text -->
          <template v-if="showTotal && thickness > 0">
            <text
              :x="CX" :y="CY - 6"
              text-anchor="middle"
              font-size="22"
              font-weight="700"
              fill="var(--ds-fg)"
              font-family="system-ui, sans-serif"
            >{{ total.toLocaleString() }}</text>
            <text
              :x="CX" :y="CY + 12"
              text-anchor="middle"
              font-size="10"
              fill="var(--ds-fg-muted)"
              font-family="system-ui, sans-serif"
            >{{ hovered !== null ? pathSegments[hovered].label : totalLabel }}</text>
          </template>
        </svg>

        <!-- Hover tooltip -->
        <div
          v-if="hovered !== null"
          class="absolute -bottom-10 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap z-10 rounded-ds-lg border border-ds-border bg-ds-bg-elevated shadow-ds-lg px-3 py-1.5 text-xs"
        >
          <span class="font-semibold text-ds-fg">{{ pathSegments[hovered].label }}</span>
          <span class="text-ds-fg-muted ml-2">{{ pathSegments[hovered].value.toLocaleString() }}</span>
          <span class="text-ds-fg-muted ml-1">({{ (pathSegments[hovered].pct * 100).toFixed(1) }}%)</span>
        </div>
      </div>

      <!-- Legend -->
      <div v-if="showLegend" class="flex flex-col gap-2.5 min-w-0">
        <div
          v-for="(seg, i) in pathSegments"
          :key="i"
          class="flex items-center gap-2.5 text-sm cursor-default"
          :class="hovered === i ? 'opacity-100' : hovered !== null ? 'opacity-50' : 'opacity-100'"
          @mouseenter="hovered = i"
          @mouseleave="hovered = null"
        >
          <span class="size-3 rounded-sm shrink-0" :style="{ backgroundColor: seg.color }" />
          <span class="text-ds-fg-muted text-xs truncate">{{ seg.label }}</span>
          <span class="ml-auto pl-4 font-semibold text-xs text-ds-fg">{{ seg.value.toLocaleString() }}</span>
          <span class="text-xs text-ds-fg-muted w-10 text-right">{{ (seg.pct * 100).toFixed(1) }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>
