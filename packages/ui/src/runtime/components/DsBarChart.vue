<script lang="ts">
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '../utils/cn'

export interface DsBarChartDataset {
  label: string
  data: number[]
  color?: string
}

export interface DsBarChartProps {
  labels: string[]
  datasets: DsBarChartDataset[]
  showGrid?: boolean
  showValues?: boolean
  showLegend?: boolean
  grouped?: boolean
  height?: number
  gap?: number
  class?: string
}

const props = withDefaults(defineProps<DsBarChartProps>(), {
  showGrid: true,
  showValues: false,
  showLegend: true,
  grouped: true,
  height: 240,
  gap: 4,
})

const BAR_COLORS = ['#7f00ff', '#06b6d4', '#f97316', '#22c55e', '#f59e0b', '#ec4899', '#6366f1', '#14b8a6']
const BAR_VW = 600
const BAR_PAD = { top: 20, right: 20, bottom: 34, left: 50 }

const allValues = computed(() => props.datasets.flatMap(d => d.data))
const maxVal = computed(() => Math.max(...allValues.value) * 1.15 || 10)
const minVal = computed(() => Math.min(0, ...allValues.value))
const range = computed(() => (maxVal.value - minVal.value) || 1)

const plotW = computed(() => BAR_VW - BAR_PAD.left - BAR_PAD.right)
const plotH = computed(() => props.height - BAR_PAD.top - BAR_PAD.bottom)

const groupCount = computed(() => props.labels.length)
const dsCount = computed(() => props.datasets.length)

const groupW = computed(() => plotW.value / groupCount.value)
const barW = computed(() => {
  const usable = groupW.value - props.gap * 2
  return props.grouped ? usable / dsCount.value - props.gap : usable
})

function barX(groupIdx: number, dsIdx: number): number {
  const base = BAR_PAD.left + groupIdx * groupW.value + props.gap
  return props.grouped ? base + dsIdx * (barW.value + props.gap) : base
}

function barY(val: number): number {
  return BAR_PAD.top + (1 - (Math.max(val, 0) - minVal.value) / range.value) * plotH.value
}

function barH(val: number): number {
  return ((Math.max(val, 0) - minVal.value) / range.value) * plotH.value
}

function groupCenter(idx: number): number {
  return BAR_PAD.left + idx * groupW.value + groupW.value / 2
}

function getColor(ds: DsBarChartDataset, idx: number): string {
  return ds.color ?? BAR_COLORS[idx % BAR_COLORS.length]
}

const yTicks = computed(() =>
  Array.from({ length: 5 }, (_, i) => {
    const val = minVal.value + (range.value * i) / 4
    return { y: BAR_PAD.top + (1 - i / 4) * plotH.value, label: Math.round(val).toLocaleString() }
  }),
)

// Tooltip
const tooltipIdx = ref<number | null>(null)
const tooltipLeft = ref(0)
const tooltipRight = ref(true)
const wrapperRef = ref<HTMLDivElement | null>(null)

function onMouseMove(e: MouseEvent) {
  const el = wrapperRef.value
  if (!el)
    return
  const rect = el.getBoundingClientRect()
  const relX = e.clientX - rect.left
  const svgX = (relX / rect.width) * BAR_VW
  let closest = 0
  let minD = Infinity
  for (let i = 0; i < props.labels.length; i++) {
    const d = Math.abs(groupCenter(i) - svgX)
    if (d < minD) {
      minD = d
      closest = i
    }
  }
  tooltipIdx.value = closest
  tooltipLeft.value = (groupCenter(closest) / BAR_VW) * rect.width
  tooltipRight.value = closest < props.labels.length / 2
}

function onMouseLeave() {
  tooltipIdx.value = null
}
</script>

<template>
  <div :class="cn('w-full select-none space-y-3', props.class)">
    <div ref="wrapperRef" class="relative" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
      <svg
        :viewBox="`0 0 ${BAR_VW} ${height}`"
        class="w-full overflow-visible"
        :style="{ height: `${height}px` }"
      >
        <!-- Y grid + labels -->
        <template v-if="showGrid">
          <line
            v-for="(t, i) in yTicks" :key="`yg-${i}`"
            :x1="BAR_PAD.left" :y1="t.y" :x2="BAR_VW - BAR_PAD.right" :y2="t.y"
            stroke="var(--ds-border)" stroke-width="1" stroke-dasharray="4 4"
          />
          <text
            v-for="(t, i) in yTicks" :key="`yl-${i}`"
            :x="BAR_PAD.left - 6" :y="t.y + 4"
            text-anchor="end" font-size="10" fill="var(--ds-fg-muted)"
            font-family="system-ui, sans-serif"
          >{{ t.label }}</text>
        </template>

        <!-- Baseline -->
        <line
          :x1="BAR_PAD.left" :y1="barY(0) + barH(0)"
          :x2="BAR_VW - BAR_PAD.right" :y2="barY(0) + barH(0)"
          stroke="var(--ds-border)" stroke-width="1.5"
        />

        <!-- Bars -->
        <template v-for="(ds, di) in datasets" :key="`ds-${di}`">
          <rect
            v-for="(val, gi) in ds.data" :key="`bar-${di}-${gi}`"
            :x="barX(gi, di)"
            :y="barY(val)"
            :width="barW"
            :height="barH(val)"
            :fill="getColor(ds, di)"
            :opacity="tooltipIdx === null || tooltipIdx === gi ? 1 : 0.6"
            rx="3" ry="3"
            class="transition-opacity duration-100"
          />
          <!-- Values on bars -->
          <template v-if="showValues">
            <text
              v-for="(val, gi) in ds.data" :key="`val-${di}-${gi}`"
              :x="barX(gi, di) + barW / 2"
              :y="barY(val) - 4"
              text-anchor="middle" font-size="10"
              :fill="getColor(ds, di)"
              font-weight="600"
              font-family="system-ui, sans-serif"
            >{{ val.toLocaleString() }}</text>
          </template>
        </template>

        <!-- X labels -->
        <text
          v-for="(label, i) in labels" :key="`xl-${i}`"
          :x="groupCenter(i)" :y="height - 6"
          text-anchor="middle" font-size="10" fill="var(--ds-fg-muted)"
          font-family="system-ui, sans-serif"
        >{{ label }}</text>

        <!-- Hover highlight -->
        <rect
          v-if="tooltipIdx !== null"
          :x="BAR_PAD.left + tooltipIdx * groupW"
          :y="BAR_PAD.top"
          :width="groupW"
          :height="plotH"
          fill="var(--ds-fg-muted)"
          opacity="0.05"
          rx="3"
        />
      </svg>

      <!-- Tooltip -->
      <div
        v-if="tooltipIdx !== null"
        class="absolute top-1 pointer-events-none z-10 min-w-32 rounded-ds-lg border border-ds-border bg-ds-bg-elevated shadow-ds-lg px-3 py-2 text-xs space-y-1"
        :style="{
          left: `${tooltipLeft}px`,
          transform: tooltipRight ? 'translateX(10px)' : 'translateX(calc(-100% - 10px))',
        }"
      >
        <p class="font-semibold text-ds-fg pb-1">
          {{ labels[tooltipIdx] }}
        </p>
        <div v-for="(ds, di) in datasets" :key="di" class="flex items-center gap-2">
          <span class="size-2 rounded-sm shrink-0" :style="{ backgroundColor: getColor(ds, di) }"></span>
          <span class="text-ds-fg-muted">{{ ds.label }}</span>
          <span class="font-medium text-ds-fg ml-auto pl-3">{{ ds.data[tooltipIdx].toLocaleString() }}</span>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div v-if="showLegend && datasets.length > 1" class="flex flex-wrap gap-x-5 gap-y-1.5 justify-center">
      <div v-for="(ds, di) in datasets" :key="di" class="flex items-center gap-1.5 text-xs text-ds-fg-muted">
        <span class="size-2.5 rounded-sm shrink-0" :style="{ backgroundColor: getColor(ds, di) }"></span>
        {{ ds.label }}
      </div>
    </div>
  </div>
</template>
