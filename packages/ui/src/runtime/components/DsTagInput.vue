<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '../utils/cn'

export interface DsTagInputProps {
  modelValue?: string[]
  placeholder?: string
  disabled?: boolean
  max?: number
  allowDuplicates?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsTagInputProps>(), {
  modelValue: () => [],
  placeholder: 'Add tag…',
  allowDuplicates: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const input = ref('')
const inputRef = ref<HTMLInputElement>()

function addTag() {
  const tag = input.value.trim()
  if (!tag) return
  if (props.max && (props.modelValue ?? []).length >= props.max) return
  if (!props.allowDuplicates && (props.modelValue ?? []).includes(tag)) {
    input.value = ''
    return
  }
  emit('update:modelValue', [...(props.modelValue ?? []), tag])
  input.value = ''
}

function removeTag(idx: number) {
  const next = [...(props.modelValue ?? [])]
  next.splice(idx, 1)
  emit('update:modelValue', next)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    e.preventDefault()
    addTag()
  }
  if (e.key === 'Backspace' && !input.value && (props.modelValue ?? []).length > 0) {
    removeTag((props.modelValue ?? []).length - 1)
  }
}
</script>

<template>
  <div
    :class="cn(
      'min-h-10 w-full flex flex-wrap gap-1.5 items-center px-2.5 py-1.5 rounded-ds-md border border-ds-border bg-ds-bg transition-colors cursor-text',
      'focus-within:ring-2 focus-within:ring-ds-ring focus-within:border-ds-primary hover:border-ds-border-strong',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      props.class,
    )"
    @click="inputRef?.focus()"
  >
    <span
      v-for="(tag, i) in modelValue"
      :key="i"
      class="inline-flex items-center gap-1 px-2 py-0.5 rounded-ds-full bg-ds-primary-subtle text-ds-primary text-xs font-medium"
    >
      {{ tag }}
      <button
        v-if="!disabled"
        type="button"
        :aria-label="`Remove ${tag}`"
        class="hover:text-ds-danger transition-colors focus:outline-none"
        @click.stop="removeTag(i)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </span>
    <input
      ref="inputRef"
      v-model="input"
      type="text"
      :placeholder="(modelValue ?? []).length === 0 ? placeholder : ''"
      :disabled="disabled || (!!max && (modelValue ?? []).length >= max)"
      class="flex-1 min-w-20 h-7 bg-transparent text-sm text-ds-fg placeholder:text-ds-fg-subtle focus:outline-none disabled:cursor-not-allowed"
      @keydown="onKeydown"
    >
  </div>
</template>
