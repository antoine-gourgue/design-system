<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsGaugeChartProps {
  value: number
  min?: number
  max?: number
  label?: string
  unit?: string
  size?: number
  color?: string
  showValue?: boolean
  showMinMax?: boolean
  thickness?: number
  class?: string
}

const props = withDefaults(defineProps<DsGaugeChartProps>(), {
  min: 0,
  max: 100,
  size: 180,
  showValue: true,
  showMinMax: true,
  thickness: 14,
})

const COLORS = ['#7f00ff', '#06b6d4', '#22c55e', '#f97316', '#ec4899', '#f59e0b']

const percent = computed(() => {
  const clamped = Math.max(props.min, Math.min(props.max, props.value))
  return (clamped - props.min) / (props.max - props.min)
})

// Gauge is a 270° arc (from 135° to 405°, i.e. 135° to 45° going through bottom)
const START_ANGLE = 135
const END_ANGLE = 405
const TOTAL_ANGLE = END_ANGLE - START_ANGLE // 270°

const cx = computed(() => props.size / 2)
const cy = computed(() => props.size / 2)
const r = computed(() => (props.size - props.thickness * 2) / 2 - 4)

function polarToXY(angleDeg: number, radius: number): { x: number, y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: cx.value + radius * Math.cos(rad),
    y: cy.value + radius * Math.sin(rad),
  }
}

function describeArc(startAngle: number, endAngle: number, radius: number): string {
  const start = polarToXY(startAngle, radius)
  const end = polarToXY(endAngle, radius)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`
}

const trackPath = computed(() => describeArc(START_ANGLE, END_ANGLE, r.value))

const fillEndAngle = computed(() => START_ANGLE + percent.value * TOTAL_ANGLE)
const fillPath = computed(() => {
  if (percent.value <= 0)
    return ''
  if (percent.value >= 1)
    return describeArc(START_ANGLE, END_ANGLE - 0.01, r.value)
  return describeArc(START_ANGLE, fillEndAngle.value, r.value)
})

const fillColor = computed(() => props.color ?? COLORS[0])

const displayValue = computed(() => {
  if (props.unit)
    return `${props.value.toLocaleString()}${props.unit}`
  return props.value.toLocaleString()
})

const percentDisplay = computed(() => `${Math.round(percent.value * 100)}%`)

// Gradient ID (unique per instance via a simple approach)
const gradId = `gauge-grad-${Math.random().toString(36).slice(2, 7)}`
</script>

<template>
  <div :class="cn('inline-flex flex-col items-center', props.class)">
    <div class="relative" :style="{ width: `${size}px`, height: `${size}px` }">
      <svg
        :width="size"
        :height="size"
        :viewBox="`0 0 ${size} ${size}`"
        class="overflow-visible"
        role="img"
        :aria-label="`Gauge: ${displayValue}`"
      >
        <defs>
          <linearGradient :id="gradId" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" :stop-color="fillColor" stop-opacity="0.7" />
            <stop offset="100%" :stop-color="fillColor" />
          </linearGradient>
        </defs>

        <!-- Track -->
        <path
          :d="trackPath"
          fill="none"
          stroke="var(--ds-bg-muted)"
          :stroke-width="thickness"
          stroke-linecap="round"
        />

        <!-- Fill -->
        <path
          v-if="fillPath"
          :d="fillPath"
          fill="none"
          :stroke="`url(#${gradId})`"
          :stroke-width="thickness"
          stroke-linecap="round"
          class="transition-all duration-700 ease-out"
        />
      </svg>

      <!-- Center content -->
      <div
        v-if="showValue"
        class="absolute inset-0 flex flex-col items-center justify-center"
        style="padding-top: 15%"
      >
        <span class="text-2xl font-bold text-ds-fg font-ds leading-none tabular-nums">
          {{ displayValue }}
        </span>
        <span v-if="label" class="text-xs text-ds-fg-muted mt-1 font-ds">
          {{ label }}
        </span>
        <span class="text-xs text-ds-fg-subtle mt-0.5 font-ds">
          {{ percentDisplay }}
        </span>
      </div>
    </div>

    <!-- Min/Max labels -->
    <div
      v-if="showMinMax"
      class="flex justify-between w-full px-1 -mt-2"
      :style="{ width: `${size}px` }"
    >
      <span class="text-xs text-ds-fg-muted font-ds">{{ min }}</span>
      <span class="text-xs text-ds-fg-muted font-ds">{{ max }}</span>
    </div>
  </div>
</template>
