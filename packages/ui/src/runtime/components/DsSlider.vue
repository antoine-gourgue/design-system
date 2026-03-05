<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsSliderProps {
  modelValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  showValue?: boolean
  label?: string
  class?: string
}

const props = withDefaults(defineProps<DsSliderProps>(), {
  modelValue: 50,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  showValue: true,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

/** Percentage for track fill gradient */
const fillPercent = computed(() => {
  const range = (props.max ?? 100) - (props.min ?? 0)
  return range === 0 ? 0 : (((props.modelValue ?? 0) - (props.min ?? 0)) / range) * 100
})

const trackStyle = computed(() => ({
  background: `linear-gradient(to right, var(--ds-primary) ${fillPercent.value}%, var(--ds-bg-muted) ${fillPercent.value}%)`,
}))
</script>

<template>
  <div :class="cn('flex flex-col gap-2 w-full', props.class)">
    <!-- Label row -->
    <div v-if="label || showValue" class="flex items-center justify-between">
      <span v-if="label" class="text-sm font-medium text-ds-fg">{{ label }}</span>
      <span v-if="showValue" class="text-sm font-semibold text-ds-primary tabular-nums">{{ modelValue }}</span>
    </div>

    <!-- Track -->
    <div class="relative flex items-center h-5">
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="modelValue"
        :disabled="disabled"
        :style="trackStyle"
        :class="cn(
          'w-full h-1.5 rounded-full appearance-none cursor-pointer',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          '[&::-webkit-slider-thumb]:appearance-none',
          '[&::-webkit-slider-thumb]:size-4',
          '[&::-webkit-slider-thumb]:rounded-full',
          '[&::-webkit-slider-thumb]:bg-ds-primary',
          '[&::-webkit-slider-thumb]:border-2',
          '[&::-webkit-slider-thumb]:border-ds-bg-elevated',
          '[&::-webkit-slider-thumb]:shadow-ds-sm',
          '[&::-webkit-slider-thumb]:cursor-pointer',
          '[&::-webkit-slider-thumb]:transition-transform',
          '[&::-webkit-slider-thumb]:hover:scale-110',
          '[&::-moz-range-thumb]:size-4',
          '[&::-moz-range-thumb]:rounded-full',
          '[&::-moz-range-thumb]:bg-ds-primary',
          '[&::-moz-range-thumb]:border-2',
          '[&::-moz-range-thumb]:border-ds-bg-elevated',
          '[&::-moz-range-thumb]:cursor-pointer',
          'focus-visible:outline-none',
          'focus-visible:[&::-webkit-slider-thumb]:ring-2',
          'focus-visible:[&::-webkit-slider-thumb]:ring-ds-ring',
        )"
        @input="emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
      >
    </div>

    <!-- Min / max labels -->
    <div class="flex items-center justify-between">
      <span class="text-xs text-ds-fg-subtle">{{ min }}</span>
      <span class="text-xs text-ds-fg-subtle">{{ max }}</span>
    </div>
  </div>
</template>
