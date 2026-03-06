<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { cn } from '../utils/cn'

export interface DsNumberTickerProps {
  value: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  separator?: string
  easing?: 'linear' | 'ease-out' | 'ease-in-out'
  class?: string
}

const props = withDefaults(defineProps<DsNumberTickerProps>(), {
  duration: 1200,
  decimals: 0,
  separator: ',',
  easing: 'ease-out',
})

const displayValue = ref(0)
let animFrame: number | null = null
let startTime: number | null = null
let startValue = 0
let targetValue = 0

function easingFn(t: number): number {
  switch (props.easing) {
    case 'linear':
      return t
    case 'ease-in-out':
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    case 'ease-out':
    default:
      return 1 - (1 - t) ** 3
  }
}

function animate(timestamp: number) {
  if (startTime === null)
    startTime = timestamp
  const elapsed = timestamp - startTime
  const progress = Math.min(elapsed / props.duration, 1)
  const easedProgress = easingFn(progress)
  displayValue.value = startValue + (targetValue - startValue) * easedProgress

  if (progress < 1) {
    animFrame = requestAnimationFrame(animate)
  }
  else {
    displayValue.value = targetValue
    animFrame = null
  }
}

function startAnimation(from: number, to: number) {
  if (animFrame !== null) {
    cancelAnimationFrame(animFrame)
    animFrame = null
  }
  startTime = null
  startValue = from
  targetValue = to

  if (typeof requestAnimationFrame !== 'undefined') {
    animFrame = requestAnimationFrame(animate)
  }
  else {
    displayValue.value = to
  }
}

onMounted(() => {
  startAnimation(0, props.value)
})

watch(() => props.value, (newVal) => {
  startAnimation(displayValue.value, newVal)
})

onUnmounted(() => {
  if (animFrame !== null) {
    cancelAnimationFrame(animFrame)
  }
})

function formatNumber(n: number): string {
  const fixed = n.toFixed(props.decimals)
  if (!props.separator)
    return fixed

  const [int, dec] = fixed.split('.')
  const formatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, props.separator)
  return dec !== undefined ? `${formatted}.${dec}` : formatted
}
</script>

<template>
  <span :class="cn('tabular-nums font-ds', props.class)">
    <span v-if="prefix" class="opacity-70">{{ prefix }}</span>
    <span>{{ formatNumber(displayValue) }}</span>
    <span v-if="suffix" class="opacity-70">{{ suffix }}</span>
  </span>
</template>
