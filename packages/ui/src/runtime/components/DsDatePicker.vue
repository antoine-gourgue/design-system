<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { cn } from '../utils/cn'
import DsCalendar from './DsCalendar.vue'

export interface DsDatePickerProps {
  modelValue?: Date | null
  placeholder?: string
  /** Date format tokens: YYYY MM DD */
  format?: string
  disabled?: boolean
  min?: Date
  max?: Date
  class?: string
}

const props = withDefaults(defineProps<DsDatePickerProps>(), {
  modelValue: null,
  placeholder: 'Pick a date',
  format: 'DD/MM/YYYY',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: Date | null): void
}>()

const isOpen = ref(false)
const calendarMonth = ref<Date>(props.modelValue ?? new Date())

watch(() => props.modelValue, (val) => {
  if (val)
    calendarMonth.value = new Date(val.getFullYear(), val.getMonth(), 1)
})

function formatDate(date: Date | null): string {
  if (!date)
    return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return props.format
    .replace('YYYY', String(date.getFullYear()))
    .replace('MM', pad(date.getMonth() + 1))
    .replace('DD', pad(date.getDate()))
}

function onSelect(date: Date | null) {
  emit('update:modelValue', date)
  isOpen.value = false
}

function toggle() {
  if (!props.disabled)
    isOpen.value = !isOpen.value
}

function onOutside(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('[data-datepicker]'))
    isOpen.value = false
}

watch(isOpen, (val) => {
  if (val)
    setTimeout(() => document.addEventListener('mousedown', onOutside), 0)
  else document.removeEventListener('mousedown', onOutside)
})

const displayValue = computed(() => formatDate(props.modelValue ?? null))
</script>

<template>
  <div data-datepicker class="relative inline-flex flex-col" :class="props.class">
    <!-- Input trigger -->
    <button
      type="button"
      :disabled="disabled"
      class="flex items-center gap-2 h-9 min-w-48 rounded-ds-md border border-ds-border bg-ds-bg px-3 text-sm text-left transition-colors
             hover:border-ds-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring
             disabled:opacity-50 disabled:cursor-not-allowed"
      :class="{ 'text-ds-fg-muted': !displayValue }"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="size-4 text-ds-fg-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
      <span class="flex-1 truncate">{{ displayValue || placeholder }}</span>
      <button
        v-if="modelValue"
        type="button"
        class="text-ds-fg-muted hover:text-ds-fg"
        aria-label="Clear date"
        @click.stop="emit('update:modelValue', null)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </button>

    <!-- Calendar Popover -->
    <Transition name="datepicker-pop">
      <div
        v-if="isOpen"
        class="absolute top-full mt-2 left-0 z-40 rounded-ds-xl border border-ds-border bg-ds-bg-elevated shadow-ds-lg"
      >
        <DsCalendar
          :model-value="modelValue ?? undefined"
          :min="min"
          :max="max"
          @update:model-value="onSelect"
        />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.datepicker-pop-enter-active,
.datepicker-pop-leave-active { transition: opacity 0.12s ease, transform 0.12s ease; }
.datepicker-pop-enter-from,
.datepicker-pop-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
