<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsCheckboxProps {
  id?: string
  modelValue?: boolean | 'indeterminate'
  disabled?: boolean
  label?: string
  description?: string
  class?: string
}

const props = withDefaults(defineProps<DsCheckboxProps>(), {
  modelValue: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'change': [event: Event]
}>()

const isChecked = computed(() => props.modelValue === true)
const isIndeterminate = computed(() => props.modelValue === 'indeterminate')

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', event)
}

const boxClasses = computed(() =>
  cn(
    'size-4 shrink-0 rounded-ds-xs border-2 flex items-center justify-center',
    'transition-all duration-ds-fast ease-ds-smooth',
    'focus-within:ring-2 focus-within:ring-ds-ring focus-within:ring-offset-2 focus-within:ring-offset-ds-ring-offset',
    isChecked.value || isIndeterminate.value
      ? 'bg-ds-primary border-ds-primary'
      : 'bg-ds-bg border-ds-border-strong',
    props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-ds-primary',
  ),
)
</script>

<template>
  <div :class="cn('flex items-start gap-2.5', props.class)">
    <div class="relative flex items-center justify-center">
      <input
        :id="id"
        type="checkbox"
        :checked="isChecked"
        :disabled="disabled"
        class="sr-only"
        @change="handleChange"
      >
      <label :for="id" :class="boxClasses" :aria-checked="isIndeterminate ? 'mixed' : isChecked">
        <!-- Checkmark -->
        <svg
          v-if="isChecked"
          class="size-2.5 text-white shrink-0"
          viewBox="0 0 12 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 5l3.5 3.5L11 1"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <!-- Indeterminate -->
        <span v-else-if="isIndeterminate" class="block w-2 h-0.5 bg-white rounded-full"></span>
      </label>
    </div>

    <div v-if="label || $slots.default" class="flex flex-col gap-0.5">
      <label
        v-if="label"
        :for="id"
        :class="cn('text-sm font-medium font-ds text-ds-fg leading-none', disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer')"
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
