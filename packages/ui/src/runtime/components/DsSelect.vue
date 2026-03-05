<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

export interface DsSelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface DsSelectGroup {
  label: string
  options: DsSelectOption[]
}

const selectVariants = cva(
  [
    'w-full rounded-ds-md border bg-ds-bg text-ds-fg transition-colors',
    'appearance-none pr-8',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring focus-visible:ring-offset-1',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-8 pl-3 text-xs',
        md: 'h-10 pl-3.5 text-sm',
        lg: 'h-11 pl-4 text-base',
      },
      error: {
        true: 'border-ds-danger focus-visible:ring-ds-danger',
        false: 'border-ds-border',
      },
    },
    defaultVariants: { size: 'md', error: false },
  },
)

type SelectVariants = VariantProps<typeof selectVariants>

export interface DsSelectProps {
  modelValue?: string | number | null
  options?: (DsSelectOption | DsSelectGroup)[]
  placeholder?: string
  disabled?: boolean
  size?: SelectVariants['size']
  error?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsSelectProps>(), {
  options: () => [],
  size: 'md',
  error: false,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const classes = computed(() =>
  cn(selectVariants({ size: props.size, error: props.error }), props.class),
)

function isGroup(o: DsSelectOption | DsSelectGroup): o is DsSelectGroup {
  return 'options' in o
}
</script>

<template>
  <div class="relative w-full">
    <select
      :value="modelValue ?? ''"
      :disabled="disabled"
      :class="classes"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-if="placeholder" value="" disabled :selected="modelValue == null || modelValue === ''">
        {{ placeholder }}
      </option>

      <template v-for="item in options" :key="isGroup(item) ? item.label : item.value">
        <!-- Option group -->
        <optgroup v-if="isGroup(item)" :label="item.label">
          <option
            v-for="opt in item.options"
            :key="opt.value"
            :value="opt.value"
            :disabled="opt.disabled"
          >
            {{ opt.label }}
          </option>
        </optgroup>
        <!-- Flat option -->
        <option v-else :value="item.value" :disabled="item.disabled">
          {{ item.label }}
        </option>
      </template>
    </select>

    <!-- Chevron icon -->
    <div class="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-ds-fg-muted">
      <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</template>
