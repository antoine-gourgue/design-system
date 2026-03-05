<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsRadarChartAxis {
  label: string
  value: number
}

export interface DsRadarChartProps {
  data?: DsRadarChartAxis[]
  color?: string
  size?: number
  showLabels?: boolean
  showGrid?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsRadarChartProps>(), {
  data: () => [],
  color: '#7f00ff',
  size: 280,
  showLabels: true,
  showGrid: true,
})

const cx = computed(() => props.size / 2)
const cy = computed(() => props.size / 2)
const radius = computed(() => (props.size / 2) * 0.68)
const n = computed(() => props.data.length)

function toPoint(angle: number, r: number) {
  const rad = (angle - 90) * (Math.PI / 180)
  return {
    x: cx.value + r * Math.cos(rad),
    y: cy.value + r * Math.sin(rad),
  }
}

const axes = computed(() => props.data.map((d, i) => {
  const angle = (360 / n.value) * i
  return {
    ...d,
    angle,
    tip: toPoint(angle, radius.value),
    label: toPoint(angle, radius.value * 1.22),
  }
}))

const gridLevels = [0.25, 0.5, 0.75, 1.0]

function gridPolygon(level: number): string {
  return axes.value.map((_, i) => {
    const pt = toPoint((360 / n.value) * i, radius.value * level)
    return `${pt.x},${pt.y}`
  }).join(' ')
}

const dataPolygon = computed(() =>
  props.data.map((d, i) => {
    const pt = toPoint((360 / n.value) * i, radius.value * (Math.max(0, Math.min(100, d.value)) / 100))
    return `${pt.x},${pt.y}`
  }).join(' '),
)
</script>

<template>
  <div :class="cn('inline-flex flex-col items-center', props.class)">
    <svg
      :width="size"
      :height="size"
      :viewBox="`0 0 ${size} ${size}`"
      aria-hidden="true"
      role="img"
    >
      <g v-if="showGrid">
        <polygon
          v-for="level in gridLevels"
          :key="level"
          :points="gridPolygon(level)"
          fill="none"
          stroke="currentColor"
          class="text-ds-border"
          stroke-width="1"
        />
        <line
          v-for="(axis, i) in axes"
          :key="`spoke-${i}`"
          :x1="cx"
          :y1="cy"
          :x2="axis.tip.x"
          :y2="axis.tip.y"
          stroke="currentColor"
          class="text-ds-border"
          stroke-width="1"
        />
      </g>

      <polygon
        v-if="data.length >= 3"
        :points="dataPolygon"
        :fill="color"
        fill-opacity="0.18"
        :stroke="color"
        stroke-width="2"
        stroke-linejoin="round"
      />

      <circle
        v-for="(d, i) in data"
        :key="`pt-${i}`"
        :cx="toPoint((360 / n) * i, radius * (Math.max(0, Math.min(100, d.value)) / 100)).x"
        :cy="toPoint((360 / n) * i, radius * (Math.max(0, Math.min(100, d.value)) / 100)).y"
        r="3.5"
        :fill="color"
        stroke="white"
        stroke-width="1.5"
      />

      <template v-if="showLabels">
        <text
          v-for="(axis, i) in axes"
          :key="`label-${i}`"
          :x="axis.label.x"
          :y="axis.label.y"
          text-anchor="middle"
          dominant-baseline="middle"
          fill="currentColor"
          class="text-ds-fg-muted"
          font-size="11"
          font-family="inherit"
        >
          {{ axis.label }}
        </text>
      </template>
    </svg>
  </div>
</template>
