<script setup lang="ts">
import { computed, getCurrentInstance, provide } from 'vue'
import { cn } from '../utils/cn'

export interface DsFormFieldProps {
  label?: string
  description?: string
  error?: string
  required?: boolean
  disabled?: boolean
  id?: string
  orientation?: 'vertical' | 'horizontal'
  class?: string
}

const props = withDefaults(defineProps<DsFormFieldProps>(), {
  orientation: 'vertical',
})

// Generate a unique ID for this field
const instance = getCurrentInstance()
const autoId = `ds-field-${instance?.uid ?? Math.random().toString(36).slice(2, 7)}`
const fieldId = computed(() => props.id ?? autoId)
const descId = computed(() => `${fieldId.value}-desc`)
const errorId = computed(() => `${fieldId.value}-error`)

// Provide context to nested inputs
provide('ds-form-field', {
  id: fieldId,
  descId,
  errorId,
  hasError: computed(() => !!props.error),
  disabled: computed(() => !!props.disabled),
  required: computed(() => !!props.required),
})
</script>

<template>
  <div
    :class="cn(
      'w-full',
      orientation === 'horizontal' ? 'flex items-start gap-4' : 'flex flex-col gap-1.5',
      disabled && 'opacity-60',
      props.class,
    )"
  >
    <!-- Label area (horizontal: fixed width) -->
    <div
      v-if="label || description"
      :class="cn(
        orientation === 'horizontal' ? 'w-40 shrink-0 pt-2.5' : '',
      )"
    >
      <label
        v-if="label"
        :for="fieldId"
        :class="cn(
          'block text-sm font-medium text-ds-fg leading-none',
          error && 'text-ds-danger',
        )"
      >
        {{ label }}
        <span v-if="required" class="text-ds-danger ml-0.5" aria-hidden="true">*</span>
      </label>
      <p
        v-if="description"
        :id="descId"
        class="text-xs text-ds-fg-muted mt-1 leading-snug"
      >
        {{ description }}
      </p>
    </div>

    <!-- Input slot + error -->
    <div :class="cn('flex-1 w-full', orientation === 'vertical' ? 'flex flex-col gap-1' : '')">
      <!-- The actual input -->
      <slot :id="fieldId" :error="!!error" :disabled="disabled" :required="required"></slot>

      <!-- Error message -->
      <Transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <p
          v-if="error"
          :id="errorId"
          role="alert"
          class="flex items-center gap-1.5 text-xs text-ds-danger mt-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-3.5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path stroke-linecap="round" d="M12 8v4m0 4h.01" />
          </svg>
          {{ error }}
        </p>
      </Transition>
    </div>
  </div>
</template>
