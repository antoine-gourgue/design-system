<script setup lang="ts">
import { cn } from '../utils/cn'

export interface DsCollapsibleProps {
  modelValue?: boolean
  title?: string
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsCollapsibleProps>(), {
  modelValue: false,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

function toggle() {
  if (props.disabled)
    return
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <div :class="cn('w-full', props.class)">
    <!-- Trigger -->
    <div class="flex items-center justify-between">
      <slot name="trigger" :open="modelValue" :toggle="toggle">
        <button
          type="button"
          :disabled="disabled"
          :aria-expanded="modelValue"
          :class="cn(
            'flex items-center justify-between w-full gap-3 py-2 text-sm font-medium text-ds-fg text-left',
            'hover:text-ds-primary transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring rounded-ds-sm',
            disabled && 'opacity-50 cursor-not-allowed',
          )"
          @click="toggle"
        >
          <span>{{ title }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-4 text-ds-fg-muted transition-transform duration-200 shrink-0"
            :class="modelValue ? 'rotate-180' : ''"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </slot>
    </div>

    <!-- Content -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out overflow-hidden"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-96"
      leave-active-class="transition-all duration-150 ease-in overflow-hidden"
      leave-from-class="opacity-100 max-h-96"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-if="modelValue" class="pt-1">
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>
