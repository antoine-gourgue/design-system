<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsProgressProps {
  value?: number
  max?: number
  size?: 'xs' | 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'success' | 'warning' | 'danger'
  label?: string
  showValue?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsProgressProps>(), {
  value: 0,
  max: 100,
  size: 'md',
  variant: 'primary',
  showValue: false,
})

const percentage = computed(() =>
  Math.min(100, Math.max(0, ((props.value ?? 0) / (props.max ?? 100)) * 100)),
)

const trackClasses = computed(() =>
  cn(
    'relative w-full overflow-hidden rounded-full bg-ds-bg-muted',
    {
      xs: 'h-1',
      sm: 'h-1.5',
      md: 'h-2',
      lg: 'h-3',
    }[props.size],
    props.class,
  ),
)

const barClasses = computed(() =>
  cn(
    'h-full rounded-full transition-all duration-ds-slow ease-ds-smooth',
    {
      primary: 'bg-ds-primary',
      success: 'bg-ds-success',
      warning: 'bg-ds-warning',
      danger: 'bg-ds-danger',
    }[props.variant],
  ),
)
</script>

<template>
  <div class="w-full font-ds">
    <div v-if="label || showValue" class="mb-1.5 flex items-center justify-between">
      <span v-if="label" class="text-sm text-ds-fg-muted">{{ label }}</span>
      <span v-if="showValue" class="text-xs font-medium text-ds-fg-muted ml-auto">
        {{ Math.round(percentage) }}%
      </span>
    </div>
    <div
      :class="trackClasses"
      role="progressbar"
      :aria-valuenow="value"
      :aria-valuemin="0"
      :aria-valuemax="max"
      :aria-label="label"
    >
      <div :class="barClasses" :style="{ width: `${percentage}%` }"></div>
    </div>
  </div>
</template>
