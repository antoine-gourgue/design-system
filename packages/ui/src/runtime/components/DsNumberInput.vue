<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsNumberInputProps {
  modelValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
  placeholder?: string
  class?: string
}

const props = withDefaults(defineProps<DsNumberInputProps>(), {
  modelValue: 0,
  step: 1,
  disabled: false,
  size: 'md',
  error: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const canDecrement = computed(() => {
  if (props.disabled)
    return false
  return props.min === undefined || (props.modelValue ?? 0) > props.min
})

const canIncrement = computed(() => {
  if (props.disabled)
    return false
  return props.max === undefined || (props.modelValue ?? 0) < props.max
})

function clamp(v: number) {
  let r = v
  if (props.min !== undefined)
    r = Math.max(props.min, r)
  if (props.max !== undefined)
    r = Math.min(props.max, r)
  return r
}

function increment() {
  emit('update:modelValue', clamp((props.modelValue ?? 0) + (props.step ?? 1)))
}

function decrement() {
  emit('update:modelValue', clamp((props.modelValue ?? 0) - (props.step ?? 1)))
}

const sizeClasses = computed(() => ({
  sm: { root: 'h-8', input: 'text-xs', btn: 'px-2 text-sm' },
  md: { root: 'h-10', input: 'text-sm', btn: 'px-2.5 text-base' },
  lg: { root: 'h-11', input: 'text-base', btn: 'px-3 text-lg' },
}[props.size ?? 'md']))
</script>

<template>
  <div
    :class="cn(
      'inline-flex items-center border border-ds-border rounded-ds-md overflow-hidden bg-ds-bg',
      'focus-within:ring-2 focus-within:ring-ds-ring focus-within:ring-offset-1',
      error && 'border-ds-danger focus-within:ring-ds-danger',
      disabled && 'opacity-50 cursor-not-allowed',
      sizeClasses.root,
      props.class,
    )"
  >
    <!-- Decrement -->
    <button
      type="button"
      :disabled="!canDecrement"
      aria-label="Decrease"
      :class="cn(
        'flex items-center justify-center border-r border-ds-border text-ds-fg-muted h-full',
        'hover:bg-ds-bg-muted hover:text-ds-fg transition-colors',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        sizeClasses.btn,
      )"
      @click="decrement"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
      </svg>
    </button>

    <!-- Input -->
    <input
      type="number"
      :value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :placeholder="placeholder"
      :class="cn(
        'flex-1 min-w-0 bg-transparent text-center tabular-nums text-ds-fg h-full px-1',
        'outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
        sizeClasses.input,
      )"
      @input="emit('update:modelValue', clamp(Number(($event.target as HTMLInputElement).value)))"
    >

    <!-- Increment -->
    <button
      type="button"
      :disabled="!canIncrement"
      aria-label="Increase"
      :class="cn(
        'flex items-center justify-center border-l border-ds-border text-ds-fg-muted h-full',
        'hover:bg-ds-bg-muted hover:text-ds-fg transition-colors',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        sizeClasses.btn,
      )"
      @click="increment"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  </div>
</template>
