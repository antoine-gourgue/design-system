<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '../utils/cn'

export interface DsAreaChartDataset {
  label: string
  data: number[]
  color?: string
}

export interface DsAreaChartProps {
  labels: string[]
  datasets: DsAreaChartDataset[]
  showGrid?: boolean
  showDots?: boolean
  showLegend?: boolean
  stacked?: boolean
  height?: number
  class?: string
}

const props = withDefaults(defineProps<DsAreaChartProps>(), {
  showGrid: true,
  showDots: false,
  showLegend: true,
  stacked: false,
  height: 240,
})

const COLORS = ['#7f00ff', '#06b6d4', '#f97316', '#22c55e', '#f59e0b', '#ec4899']
const VW = 600
const PAD = { top: 20, right: 20, bottom: 34, left: 50 }

function getColor(ds: DsAreaChartDataset, idx: number): string {
  return ds.color ?? COLORS[idx % COLORS.length]
}

const allValues = computed(() => {
  if (props.stacked) {
    return props.labels.map((_, i) =>
      props.datasets.reduce((sum, d) => sum + (d.data[i] ?? 0), 0),
    )
  }
  return props.datasets.flatMap(d => d.data)
})

const maxVal = computed(() => Math.max(...allValues.value) * 1.15 || 10)
const minVal = computed(() => Math.min(0, ...allValues.value))
const range = computed(() => (maxVal.value - minVal.value) || 1)

const plotW = computed(() => VW - PAD.left - PAD.right)
const plotH = computed(() => props.height - PAD.top - PAD.bottom)

function xAt(i: number): number {
  const n = props.labels.length
  return PAD.left + (n > 1 ? (i / (n - 1)) : 0.5) * plotW.value
}

function yAt(val: number): number {
  return PAD.top + (1 - (val - minVal.value) / range.value) * plotH.value
}

const yTicks = computed(() =>
  Array.from({ length: 5 }, (_, i) => {
    const val = minVal.value + (range.value * i) / 4
    return { y: yAt(val), label: Math.round(val).toLocaleString() }
  }),
)

// Stacked data: compute cumulative values per label
const stackedData = computed(() => {
  const result: number[][] = props.datasets.map(() => [])
  for (let i = 0; i < props.labels.length; i++) {
    let cum = 0
    for (let di = 0; di < props.datasets.length; di++) {
      cum += props.datasets[di].data[i] ?? 0
      result[di][i] = cum
    }
  }
  return result
})

function getEffectiveData(di: number): number[] {
  return props.stacked ? stackedData.value[di] : props.datasets[di].data
}

function getBaseData(di: number): number[] {
  if (!props.stacked || di === 0)
    return props.labels.map(() => 0)
  return stackedData.value[di - 1]
}

function linePath(data: number[]): string {
  return data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i).toFixed(1)} ${yAt(v).toFixed(1)}`).join(' ')
}

function areaPath(data: number[], baseData: number[]): string {
  const n = data.length
  if (n === 0)
    return ''
  const fwd = data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i).toFixed(1)} ${yAt(v).toFixed(1)}`).join(' ')
  const bwd = [...baseData].reverse().map((v, i) => {
    const origIdx = n - 1 - i
    return `L ${xAt(origIdx).toFixed(1)} ${yAt(v).toFixed(1)}`
  }).join(' ')
  return `${fwd} ${bwd} Z`
}

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
  const svgX = (relX / rect.width) * VW
  let closest = 0
  let minD = Infinity
  for (let i = 0; i < props.labels.length; i++) {
    const d = Math.abs(xAt(i) - svgX)
    if (d < minD) {
      minD = d
      closest = i
    }
  }
  tooltipIdx.value = closest
  tooltipLeft.value = (xAt(closest) / VW) * rect.width
  tooltipRight.value = closest < props.labels.length / 2
}

function onMouseLeave() {
  tooltipIdx.value = null
}

// Gradient IDs
function gradientId(di: number): string {
  return `area-grad-${di}`
}
</script>

<template>
  <div :class="cn('w-full select-none space-y-3', props.class)">
    <div ref="wrapperRef" class="relative" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
      <svg
        :viewBox="`0 0 ${VW} ${height}`"
        class="w-full overflow-visible"
        :style="{ height: `${height}px` }"
      >
        <defs>
          <linearGradient
            v-for="(ds, di) in datasets"
            :id="gradientId(di)"
            :key="di"
            x1="0" y1="0" x2="0" y2="1"
          >
            <stop offset="0%" :stop-color="getColor(ds, di)" stop-opacity="0.35" />
            <stop offset="100%" :stop-color="getColor(ds, di)" stop-opacity="0.02" />
          </linearGradient>
        </defs>

        <!-- Y grid + labels -->
        <template v-if="showGrid">
          <line
            v-for="(t, i) in yTicks" :key="`yg-${i}`"
            :x1="PAD.left" :y1="t.y" :x2="VW - PAD.right" :y2="t.y"
            stroke="var(--ds-border)" stroke-width="1" stroke-dasharray="4 4"
          />
          <text
            v-for="(t, i) in yTicks" :key="`yl-${i}`"
            :x="PAD.left - 6" :y="t.y + 4"
            text-anchor="end" font-size="10" fill="var(--ds-fg-muted)"
            font-family="system-ui, sans-serif"
          >{{ t.label }}</text>
        </template>

        <!-- X labels -->
        <text
          v-for="(label, i) in labels" :key="`xl-${i}`"
          :x="xAt(i)" :y="height - 6"
          text-anchor="middle" font-size="10" fill="var(--ds-fg-muted)"
          font-family="system-ui, sans-serif"
        >{{ label }}</text>

        <!-- Area fills (bottom to top for stacked) -->
        <path
          v-for="(ds, di) in [...datasets].reverse()" :key="`area-${di}`"
          :d="areaPath(getEffectiveData(datasets.length - 1 - di), getBaseData(datasets.length - 1 - di))"
          :fill="`url(#${gradientId(datasets.length - 1 - di)})`"
        />

        <!-- Lines -->
        <path
          v-for="(ds, di) in datasets" :key="`line-${di}`"
          :d="linePath(getEffectiveData(di))"
          :stroke="getColor(ds, di)"
          stroke-width="2" fill="none"
          stroke-linecap="round" stroke-linejoin="round"
        />

        <!-- Dots on hover -->
        <template v-if="showDots || tooltipIdx !== null">
          <template v-for="(ds, di) in datasets" :key="`dots-${di}`">
            <circle
              v-for="(_, vi) in ds.data" :key="vi"
              :cx="xAt(vi)" :cy="yAt(getEffectiveData(di)[vi])"
              :r="tooltipIdx === vi ? 5 : 3"
              :fill="getColor(ds, di)"
              stroke="var(--ds-bg)" stroke-width="2"
              :opacity="showDots || tooltipIdx === vi ? 1 : 0"
            />
          </template>
        </template>

        <!-- Tooltip crosshair -->
        <line
          v-if="tooltipIdx !== null"
          :x1="xAt(tooltipIdx)" :y1="PAD.top"
          :x2="xAt(tooltipIdx)" :y2="height - PAD.bottom"
          stroke="var(--ds-fg-muted)" stroke-width="1"
          stroke-dasharray="4 4" opacity="0.5"
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
          <span class="size-2 rounded-full shrink-0" :style="{ backgroundColor: getColor(ds, di) }"></span>
          <span class="text-ds-fg-muted">{{ ds.label }}</span>
          <span class="font-medium text-ds-fg ml-auto pl-3">{{ ds.data[tooltipIdx].toLocaleString() }}</span>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div v-if="showLegend && datasets.length > 1" class="flex flex-wrap gap-x-5 gap-y-1.5 justify-center">
      <div v-for="(ds, di) in datasets" :key="di" class="flex items-center gap-1.5 text-xs text-ds-fg-muted">
        <span class="size-2.5 rounded-full shrink-0" :style="{ backgroundColor: getColor(ds, di) }"></span>
        {{ ds.label }}
      </div>
    </div>
  </div>
</template>
