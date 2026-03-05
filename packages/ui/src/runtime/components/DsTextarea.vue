<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsTextareaProps {
  id?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  error?: boolean
  rows?: number
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  modelValue?: string
  class?: string
}

const props = withDefaults(defineProps<DsTextareaProps>(), {
  disabled: false,
  readonly: false,
  error: false,
  rows: 4,
  resize: 'vertical',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'change': [event: Event]
  'blur': [event: FocusEvent]
  'focus': [event: FocusEvent]
}>()

const wrapperClasses = computed(() =>
  cn(
    'relative flex w-full bg-ds-bg text-ds-fg border font-ds',
    'transition-all duration-ds-base ease-ds-smooth motion-reduce:transition-none',
    'focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-1',
    'px-3 py-2.5 text-sm rounded-ds-md',
    props.error
      ? 'border-ds-danger focus-within:ring-ds-danger'
      : 'border-ds-border hover:border-ds-border-strong focus-within:ring-ds-ring',
    props.disabled || props.readonly ? 'bg-ds-bg-subtle opacity-60 cursor-not-allowed' : '',
    props.class,
  ),
)

const resizeClass = computed(() => ({
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
}[props.resize ?? 'vertical']))
</script>

<template>
  <div :class="wrapperClasses">
    <textarea
      :id="id"
      :class="cn('flex-1 bg-transparent outline-none border-none text-ds-fg placeholder:text-ds-fg-subtle disabled:cursor-not-allowed w-full leading-relaxed', resizeClass)"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :rows="rows"
      :aria-invalid="error ? true : undefined"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      @change="emit('change', $event)"
      @blur="emit('blur', $event)"
      @focus="emit('focus', $event)"
    ></textarea>
  </div>
</template>
