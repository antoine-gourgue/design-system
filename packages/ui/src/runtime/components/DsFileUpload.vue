<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '../utils/cn'

export interface DsFileUploadProps {
  modelValue?: File[]
  accept?: string
  multiple?: boolean
  maxSize?: number
  maxFiles?: number
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsFileUploadProps>(), {
  modelValue: () => [],
  multiple: false,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', files: File[]): void
  (e: 'error', message: string): void
}>()

const isDragging = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
const errors = ref<string[]>([])

function formatBytes(bytes: number): string {
  if (bytes < 1024)
    return `${bytes} B`
  if (bytes < 1024 * 1024)
    return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function validateAndAdd(newFiles: File[]) {
  errors.value = []
  const valid: File[] = []

  for (const file of newFiles) {
    if (props.maxSize && file.size > props.maxSize) {
      errors.value.push(`"${file.name}" exceeds max size of ${formatBytes(props.maxSize)}`)
      continue
    }
    if (props.accept) {
      const acceptedTypes = props.accept.split(',').map(s => s.trim())
      const isAccepted = acceptedTypes.some((type) => {
        if (type.startsWith('.'))
          return file.name.endsWith(type)
        if (type.endsWith('/*'))
          return file.type.startsWith(type.replace('/*', ''))
        return file.type === type
      })
      if (!isAccepted) {
        errors.value.push(`"${file.name}" has an unsupported format`)
        continue
      }
    }
    valid.push(file)
  }

  const current = props.modelValue ?? []
  const combined = props.multiple ? [...current, ...valid] : valid
  const limited = props.maxFiles ? combined.slice(0, props.maxFiles) : combined
  emit('update:modelValue', limited)
}

function onInputChange(e: Event) {
  const files = Array.from((e.target as HTMLInputElement).files ?? [])
  validateAndAdd(files)
  if (inputRef.value)
    inputRef.value.value = ''
}

function onDrop(e: DragEvent) {
  isDragging.value = false
  if (props.disabled)
    return
  const files = Array.from(e.dataTransfer?.files ?? [])
  validateAndAdd(files)
}

function removeFile(index: number) {
  const updated = [...(props.modelValue ?? [])]
  updated.splice(index, 1)
  emit('update:modelValue', updated)
}

function openPicker() {
  if (!props.disabled)
    inputRef.value?.click()
}
</script>

<template>
  <div :class="cn('w-full space-y-3', props.class)">
    <!-- Drop zone -->
    <div
      role="button"
      tabindex="0"
      :class="cn(
        'relative flex flex-col items-center justify-center gap-3 rounded-ds-xl border-2 border-dashed px-6 py-10 transition-colors text-center cursor-pointer',
        isDragging ? 'border-ds-primary bg-ds-primary-subtle' : 'border-ds-border hover:border-ds-primary/60 hover:bg-ds-bg-muted',
        disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
      )"
      @click="openPicker"
      @keydown.enter="openPicker"
      @keydown.space.prevent="openPicker"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="onDrop"
    >
      <input
        ref="inputRef"
        type="file"
        class="sr-only"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled"
        @change="onInputChange"
      >

      <div class="flex size-12 items-center justify-center rounded-full bg-ds-bg-muted border border-ds-border">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-6 text-ds-fg-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      </div>

      <div>
        <p class="text-sm font-medium text-ds-fg">
          <span class="text-ds-primary underline underline-offset-2">Click to upload</span>
          or drag and drop
        </p>
        <p v-if="accept" class="mt-1 text-xs text-ds-fg-muted">
          {{ accept }}
        </p>
        <p v-if="maxSize" class="mt-0.5 text-xs text-ds-fg-muted">
          Max {{ formatBytes(maxSize) }}
        </p>
      </div>
    </div>

    <!-- Errors -->
    <div v-if="errors.length" class="space-y-1">
      <p v-for="err in errors" :key="err" class="text-xs text-ds-danger">
        {{ err }}
      </p>
    </div>

    <!-- File list -->
    <ul v-if="(modelValue ?? []).length" class="space-y-2">
      <li
        v-for="(file, i) in (modelValue ?? [])"
        :key="i"
        class="flex items-center gap-3 rounded-ds-lg border border-ds-border bg-ds-bg px-3 py-2.5"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4 text-ds-fg-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-ds-fg truncate">
            {{ file.name }}
          </p>
          <p class="text-xs text-ds-fg-muted">
            {{ formatBytes(file.size) }}
          </p>
        </div>
        <button
          type="button"
          class="shrink-0 text-ds-fg-muted hover:text-ds-danger transition-colors"
          aria-label="Remove file"
          @click="removeFile(i)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>
