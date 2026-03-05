<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsRadioOption {
  label: string
  value: string | number
  description?: string
  disabled?: boolean
}

export interface DsRadioGroupProps {
  modelValue?: string | number | null
  options?: DsRadioOption[]
  name?: string
  orientation?: 'vertical' | 'horizontal'
  disabled?: boolean
  /** Display as card-style radio buttons */
  card?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsRadioGroupProps>(), {
  options: () => [],
  orientation: 'vertical',
  disabled: false,
  card: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const groupName = computed(() => props.name ?? `radio-${Math.random().toString(36).slice(2)}`)
</script>

<template>
  <div
    role="radiogroup"
    :class="cn(
      orientation === 'horizontal' ? 'flex flex-wrap gap-3' : 'flex flex-col gap-2.5',
      props.class,
    )"
  >
    <label
      v-for="opt in options"
      :key="opt.value"
      :class="cn(
        'flex items-start gap-3 cursor-pointer group',
        card && 'rounded-ds-lg border border-ds-border px-4 py-3 transition-colors hover:bg-ds-bg-subtle',
        card && modelValue === opt.value && 'border-ds-primary bg-ds-primary-subtle/30',
        (disabled || opt.disabled) && 'opacity-50 cursor-not-allowed',
      )"
    >
      <input
        type="radio"
        :name="groupName"
        :value="opt.value"
        :checked="modelValue === opt.value"
        :disabled="disabled || opt.disabled"
        class="sr-only"
        @change="emit('update:modelValue', opt.value)"
      >

      <!-- Custom radio circle -->
      <span
        :class="cn(
          'mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors',
          modelValue === opt.value
            ? 'border-ds-primary bg-ds-primary'
            : 'border-ds-border bg-ds-bg group-hover:border-ds-border-strong',
        )"
      >
        <span
          v-if="modelValue === opt.value"
          class="size-1.5 rounded-full bg-ds-primary-fg"
        ></span>
      </span>

      <div class="flex flex-col gap-0.5 min-w-0">
        <span class="text-sm font-medium text-ds-fg leading-snug">{{ opt.label }}</span>
        <span v-if="opt.description" class="text-xs text-ds-fg-muted leading-relaxed">{{ opt.description }}</span>
      </div>
    </label>
  </div>
</template>
