<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsSwitchProps {
  id?: string
  modelValue?: boolean
  disabled?: boolean
  label?: string
  description?: string
  size?: 'sm' | 'md'
  class?: string
}

const props = withDefaults(defineProps<DsSwitchProps>(), {
  modelValue: false,
  disabled: false,
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function toggle() {
  if (!props.disabled)
    emit('update:modelValue', !props.modelValue)
}

const trackClasses = computed(() =>
  cn(
    'relative inline-flex shrink-0 items-center rounded-full border-2 border-transparent',
    'transition-colors duration-ds-base ease-ds-smooth cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ds-ring-offset',
    props.size === 'sm' ? 'h-5 w-9' : 'h-6 w-11',
    props.modelValue ? 'bg-ds-primary' : 'bg-ds-bg-muted',
    props.disabled ? 'opacity-50 cursor-not-allowed' : '',
  ),
)

const thumbClasses = computed(() =>
  cn(
    'pointer-events-none block rounded-full bg-white shadow-ds-sm',
    'transition-transform duration-ds-base ease-ds-smooth',
    props.size === 'sm' ? 'h-4 w-4' : 'h-5 w-5',
    props.modelValue
      ? (props.size === 'sm' ? 'translate-x-4' : 'translate-x-5')
      : 'translate-x-0',
  ),
)
</script>

<template>
  <div :class="cn('flex items-center gap-3', props.class)">
    <button
      :id="id"
      type="button"
      :class="trackClasses"
      :disabled="disabled"
      role="switch"
      :aria-checked="modelValue"
      @click="toggle"
      @keydown.space.prevent="toggle"
    >
      <span :class="thumbClasses"></span>
    </button>

    <div v-if="label || $slots.default" class="flex flex-col gap-0.5">
      <label
        v-if="label"
        :for="id"
        :class="cn('text-sm font-medium font-ds text-ds-fg leading-none', disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer')"
        @click="toggle"
      >
        {{ label }}
      </label>
      <slot></slot>
      <p v-if="description" class="text-xs text-ds-fg-muted leading-relaxed">
        {{ description }}
      </p>
    </div>
  </div>
</template>
