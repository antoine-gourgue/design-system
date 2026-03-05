<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import { computed, useId } from 'vue'
import { cn } from '../utils/cn'

const props = withDefaults(defineProps<DsInputProps>(), {
  type: 'text',
  size: 'md',
  disabled: false,
  readonly: false,
  error: false,
  success: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'change': [value: string]
  'blur': [event: FocusEvent]
  'focus': [event: FocusEvent]
}>()

const inputWrapperVariants = cva(
  [
    'relative flex items-center w-full',
    'bg-ds-bg text-ds-fg',
    'border',
    'font-ds transition-all duration-ds-base ease-ds-smooth',
    'motion-reduce:transition-none',
    'focus-within:outline-none focus-within:ring-2 focus-within:ring-ds-ring focus-within:ring-offset-1',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-8 px-2.5 text-xs rounded-ds-sm gap-2',
        md: 'h-10 px-3 text-sm rounded-ds-md gap-2.5',
        lg: 'h-12 px-4 text-base rounded-ds-md gap-3',
      },
      state: {
        default: 'border-ds-border hover:border-ds-border-strong',
        error: 'border-ds-danger focus-within:ring-ds-danger',
        success: 'border-ds-success focus-within:ring-ds-success',
        disabled: 'border-ds-border-muted bg-ds-bg-subtle opacity-60 cursor-not-allowed',
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'default',
    },
  },
)

type InputVariants = VariantProps<typeof inputWrapperVariants>

export interface DsInputProps {
  /** Input id (auto-generated if not provided) */
  id?: string
  /** v-model binding */
  modelValue?: string | number
  /** HTML input type */
  type?: string
  /** Placeholder text */
  placeholder?: string
  /** Name attribute */
  name?: string
  /** Autocomplete attribute */
  autocomplete?: string
  /** Size variant */
  size?: InputVariants['size']
  /** Disabled state */
  disabled?: boolean
  /** Readonly state */
  readonly?: boolean
  /** Error state */
  error?: boolean
  /** Success state */
  success?: boolean
  /** Max length */
  maxlength?: number
  /** ID of associated help text (for aria-describedby) */
  describedBy?: string
  class?: string
}

/* Auto-generate a unique id for a11y label association */
const autoId = useId()
const inputId = computed(() => props.id ?? autoId)

const currentState = computed((): InputVariants['state'] => {
  if (props.disabled)
    return 'disabled'
  if (props.error)
    return 'error'
  if (props.success)
    return 'success'
  return 'default'
})

const wrapperClasses = computed(() =>
  cn(
    inputWrapperVariants({ size: props.size, state: currentState.value }),
    props.class,
  ),
)

const inputClasses = computed(() =>
  cn(
    'flex-1 bg-transparent outline-none border-none',
    'text-ds-fg placeholder:text-ds-fg-subtle',
    'disabled:cursor-not-allowed',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
  ),
)

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function onChange(event: Event) {
  const target = event.target as HTMLInputElement
  emit('change', target.value)
}
</script>

<template>
  <div :class="wrapperClasses">
    <!-- Leading slot (icon, prefix text, etc.) -->
    <span
      v-if="$slots.leading"
      class="shrink-0 text-ds-fg-muted flex items-center"
      aria-hidden="true"
    >
      <slot name="leading"></slot>
    </span>

    <input
      :id="inputId"
      :class="inputClasses"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :name="name"
      :autocomplete="autocomplete"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :aria-invalid="error ? true : undefined"
      :aria-describedby="describedBy"
      :aria-disabled="disabled ? true : undefined"
      @input="onInput"
      @change="onChange"
      @blur="emit('blur', $event)"
      @focus="emit('focus', $event)"
    >

    <!-- Trailing slot (icon, suffix, clear button, etc.) -->
    <span
      v-if="$slots.trailing"
      class="shrink-0 text-ds-fg-muted flex items-center"
      aria-hidden="true"
    >
      <slot name="trailing"></slot>
    </span>
  </div>
</template>
