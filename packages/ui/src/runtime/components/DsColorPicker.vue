<script lang="ts">
const DEFAULT_SWATCHES = [
  '#ef4444', '#f97316', '#f59e0b', '#84cc16',
  '#22c55e', '#06b6d4', '#3b82f6', '#6366f1',
  '#8b5cf6', '#a855f7', '#7f00ff', '#ec4899',
  '#f43f5e', '#14b8a6', '#64748b', '#000000',
]
</script>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { cn } from '../utils/cn'

export interface DsColorPickerProps {
  modelValue?: string
  swatches?: string[]
  showInput?: boolean
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsColorPickerProps>(), {
  modelValue: '#7f00ff',
  showInput: true,
  disabled: false,
})

const effectiveSwatches = computed(() => props.swatches ?? DEFAULT_SWATCHES)

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>()

const inputValue = ref(props.modelValue ?? '#7f00ff')

watch(() => props.modelValue, (val) => {
  if (val) inputValue.value = val
})

function selectSwatch(color: string) {
  if (props.disabled) return
  inputValue.value = color
  emit('update:modelValue', color)
}

function onInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  inputValue.value = val
  if (/^#[0-9A-Fa-f]{6}$/.test(val)) emit('update:modelValue', val)
}

function onNativeInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  selectSwatch(val)
}
</script>

<template>
  <div :class="cn('space-y-3', props.class)">
    <!-- Swatches grid -->
    <div class="grid grid-cols-8 gap-1.5">
      <button
        v-for="color in effectiveSwatches"
        :key="color"
        type="button"
        :disabled="disabled"
        :title="color"
        class="size-7 rounded-ds-md border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring disabled:cursor-not-allowed"
        :style="{ backgroundColor: color }"
        :class="modelValue === color ? 'border-ds-fg scale-110 shadow-sm' : 'border-transparent hover:scale-110'"
        :aria-pressed="modelValue === color"
        @click="selectSwatch(color)"
      />
    </div>

    <!-- Input row -->
    <div v-if="showInput" class="flex items-center gap-2">
      <!-- Native color picker -->
      <label class="relative cursor-pointer">
        <input
          type="color"
          :value="modelValue"
          :disabled="disabled"
          class="sr-only"
          @input="onNativeInput"
        />
        <span
          class="flex size-9 items-center justify-center rounded-ds-md border border-ds-border overflow-hidden cursor-pointer"
          :style="{ backgroundColor: modelValue }"
        />
      </label>

      <!-- Hex input -->
      <input
        type="text"
        :value="inputValue"
        :disabled="disabled"
        maxlength="7"
        class="h-9 flex-1 rounded-ds-md border border-ds-border bg-ds-bg px-3 text-sm font-mono text-ds-fg focus:outline-none focus:ring-2 focus:ring-ds-ring disabled:opacity-50 disabled:cursor-not-allowed"
        placeholder="#000000"
        @input="onInput"
      />
    </div>
  </div>
</template>
