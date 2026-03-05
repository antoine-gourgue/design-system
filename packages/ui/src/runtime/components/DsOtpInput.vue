<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { cn } from '../utils/cn'

export interface DsOtpInputProps {
  modelValue?: string
  length?: number
  disabled?: boolean
  error?: boolean
  type?: 'text' | 'password'
  class?: string
}

const props = withDefaults(defineProps<DsOtpInputProps>(), {
  modelValue: '',
  length: 6,
  disabled: false,
  error: false,
  type: 'text',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'complete', value: string): void
}>()

const inputs = ref<HTMLInputElement[]>([])
// Internal array of chars
const chars = ref<string[]>(Array.from({ length: props.length }, (_, i) => props.modelValue?.[i] ?? ''))

watch(() => props.modelValue, (val) => {
  chars.value = Array.from({ length: props.length }, (_, i) => val?.[i] ?? '')
})

function onInput(index: number, e: Event) {
  const target = e.target as HTMLInputElement
  const val = target.value.slice(-1) // Keep only last char
  chars.value[index] = val

  const joined = chars.value.join('')
  emit('update:modelValue', joined)

  if (val && index < props.length - 1) {
    inputs.value[index + 1]?.focus()
  }
  if (joined.length === props.length) {
    emit('complete', joined)
  }
}

function onKeydown(index: number, e: KeyboardEvent) {
  if (e.key === 'Backspace' && !chars.value[index] && index > 0) {
    chars.value[index - 1] = ''
    inputs.value[index - 1]?.focus()
    emit('update:modelValue', chars.value.join(''))
  }
  if (e.key === 'ArrowLeft' && index > 0)
    inputs.value[index - 1]?.focus()
  if (e.key === 'ArrowRight' && index < props.length - 1)
    inputs.value[index + 1]?.focus()
}

function onPaste(e: ClipboardEvent) {
  e.preventDefault()
  const text = e.clipboardData?.getData('text').replace(/\D/g, '').slice(0, props.length) ?? ''
  chars.value = Array.from({ length: props.length }, (_, i) => text[i] ?? '')
  emit('update:modelValue', chars.value.join(''))
  // Focus last filled or last input
  const nextEmpty = chars.value.findIndex(c => !c)
  const focusIdx = nextEmpty === -1 ? props.length - 1 : nextEmpty
  inputs.value[focusIdx]?.focus()
}
</script>

<template>
  <div
    :class="cn('flex items-center gap-2', props.class)"
    role="group"
    aria-label="One-time password input"
  >
    <input
      v-for="(_, i) in length"
      :key="i"
      :ref="(el) => { if (el) inputs[i] = el as HTMLInputElement }"
      :value="chars[i]"
      :type="type === 'password' ? 'password' : 'text'"
      maxlength="1"
      inputmode="numeric"
      autocomplete="one-time-code"
      :disabled="disabled"
      :aria-label="`Digit ${i + 1}`"
      :class="cn(
        'size-11 text-center text-lg font-semibold tabular-nums',
        'rounded-ds-md border bg-ds-bg text-ds-fg caret-ds-primary',
        'transition-colors outline-none',
        'focus:border-ds-primary focus:ring-2 focus:ring-ds-ring focus:ring-offset-1',
        error ? 'border-ds-danger' : 'border-ds-border',
        disabled && 'opacity-50 cursor-not-allowed',
        chars[i] && 'border-ds-primary/60',
      )"
      @input="onInput(i, $event)"
      @keydown="onKeydown(i, $event)"
      @paste="onPaste"
    >
  </div>
</template>
