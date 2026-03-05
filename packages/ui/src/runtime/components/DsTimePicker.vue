<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '../utils/cn'

export interface DsTimePickerProps {
  modelValue?: string
  format?: '12' | '24'
  showSeconds?: boolean
  disabled?: boolean
  placeholder?: string
  class?: string
}

const props = withDefaults(defineProps<DsTimePickerProps>(), {
  format: '24',
  showSeconds: false,
  placeholder: '--:--',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const open = ref(false)

function parse(val?: string) {
  if (!val)
    return { h: 0, m: 0, s: 0 }
  const parts = val.split(':').map(Number)
  return { h: parts[0] ?? 0, m: parts[1] ?? 0, s: parts[2] ?? 0 }
}

const parsed = parse(props.modelValue)
const hours = ref(parsed.h)
const minutes = ref(parsed.m)
const seconds = ref(parsed.s)
const ampm = ref<'AM' | 'PM'>(parsed.h >= 12 ? 'PM' : 'AM')

function pad(n: number) {
  return String(n).padStart(2, '0')
}

const displayValue = computed(() => {
  if (!props.modelValue)
    return ''
  if (props.format === '12') {
    let h = hours.value % 12
    if (h === 0)
      h = 12
    return `${pad(h)}:${pad(minutes.value)}${props.showSeconds ? `:${pad(seconds.value)}` : ''} ${ampm.value}`
  }
  return `${pad(hours.value)}:${pad(minutes.value)}${props.showSeconds ? `:${pad(seconds.value)}` : ''}`
})

function emitValue() {
  let h = hours.value
  if (props.format === '12') {
    if (ampm.value === 'PM' && h < 12)
      h += 12
    if (ampm.value === 'AM' && h === 12)
      h = 0
  }
  emit('update:modelValue', `${pad(h)}:${pad(minutes.value)}${props.showSeconds ? `:${pad(seconds.value)}` : ''}`)
}

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val))
}

function setHours(n: number) {
  const maxH = props.format === '12' ? 12 : 23
  const minH = props.format === '12' ? 1 : 0
  hours.value = clamp(n, minH, maxH)
  emitValue()
}

function setMinutes(n: number) {
  minutes.value = clamp(n, 0, 59)
  emitValue()
}

function setSeconds(n: number) {
  seconds.value = clamp(n, 0, 59)
  emitValue()
}

function toggleAmPm() {
  ampm.value = ampm.value === 'AM' ? 'PM' : 'AM'
  emitValue()
}
</script>

<template>
  <div :class="cn('relative', props.class)">
    <button
      type="button"
      :disabled="disabled"
      :class="cn(
        'w-full flex items-center gap-2 h-10 px-3 rounded-ds-md border border-ds-border bg-ds-bg text-sm text-ds-fg transition-colors',
        'hover:border-ds-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        open ? 'ring-2 ring-ds-ring border-ds-primary' : '',
      )"
      @click="open = !open"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="size-4 text-ds-fg-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span :class="displayValue ? 'text-ds-fg' : 'text-ds-fg-subtle'">
        {{ displayValue || placeholder }}
      </span>
    </button>

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="scale-95 opacity-0"
      leave-active-class="transition duration-75 ease-in"
      leave-to-class="scale-95 opacity-0"
    >
      <div
        v-if="open"
        class="absolute z-50 mt-1 rounded-ds-lg border border-ds-border bg-ds-bg shadow-ds-md p-4 flex gap-2 items-center"
      >
        <div class="flex flex-col items-center gap-1">
          <button type="button" class="p-1 text-ds-fg-muted hover:text-ds-fg transition-colors" @click="setHours(hours + 1)">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" /></svg>
          </button>
          <input
            type="number"
            :value="pad(hours)"
            :min="format === '12' ? 1 : 0"
            :max="format === '12' ? 12 : 23"
            class="w-12 h-10 text-center text-lg font-mono font-semibold text-ds-fg bg-ds-bg-subtle rounded-ds-md border border-ds-border focus:outline-none focus:ring-2 focus:ring-ds-ring"
            @change="setHours(Number(($event.target as HTMLInputElement).value))"
          >
          <button type="button" class="p-1 text-ds-fg-muted hover:text-ds-fg transition-colors" @click="setHours(hours - 1)">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>

        <span class="text-xl font-bold text-ds-fg-muted mb-1">:</span>

        <div class="flex flex-col items-center gap-1">
          <button type="button" class="p-1 text-ds-fg-muted hover:text-ds-fg transition-colors" @click="setMinutes(minutes + 1)">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" /></svg>
          </button>
          <input
            type="number"
            :value="pad(minutes)"
            min="0" max="59"
            class="w-12 h-10 text-center text-lg font-mono font-semibold text-ds-fg bg-ds-bg-subtle rounded-ds-md border border-ds-border focus:outline-none focus:ring-2 focus:ring-ds-ring"
            @change="setMinutes(Number(($event.target as HTMLInputElement).value))"
          >
          <button type="button" class="p-1 text-ds-fg-muted hover:text-ds-fg transition-colors" @click="setMinutes(minutes - 1)">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>

        <template v-if="showSeconds">
          <span class="text-xl font-bold text-ds-fg-muted mb-1">:</span>
          <div class="flex flex-col items-center gap-1">
            <button type="button" class="p-1 text-ds-fg-muted hover:text-ds-fg transition-colors" @click="setSeconds(seconds + 1)">
              <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" /></svg>
            </button>
            <input
              type="number"
              :value="pad(seconds)"
              min="0" max="59"
              class="w-12 h-10 text-center text-lg font-mono font-semibold text-ds-fg bg-ds-bg-subtle rounded-ds-md border border-ds-border focus:outline-none focus:ring-2 focus:ring-ds-ring"
              @change="setSeconds(Number(($event.target as HTMLInputElement).value))"
            >
            <button type="button" class="p-1 text-ds-fg-muted hover:text-ds-fg transition-colors" @click="setSeconds(seconds - 1)">
              <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>
        </template>

        <button
          v-if="format === '12'"
          type="button"
          class="ml-1 px-2 py-1 rounded-ds-md border border-ds-border text-sm font-medium text-ds-fg hover:bg-ds-bg-subtle transition-colors"
          @click="toggleAmPm"
        >
          {{ ampm }}
        </button>

        <button
          type="button"
          class="ml-2 px-3 py-1.5 rounded-ds-md bg-ds-primary text-white text-sm font-medium hover:bg-ds-primary-hover transition-colors"
          @click="open = false"
        >
          OK
        </button>
      </div>
    </Transition>

    <div v-if="open" class="fixed inset-0 z-40" @click="open = false"></div>
  </div>
</template>
