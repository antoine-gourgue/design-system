<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '../utils/cn'

export interface DsDateRangePickerProps {
  modelValue?: { start: Date | null, end: Date | null }
  placeholder?: string
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsDateRangePickerProps>(), {
  modelValue: () => ({ start: null, end: null }),
  placeholder: 'Pick a date range',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: { start: Date | null, end: Date | null }): void
}>()

const open = ref(false)
const hoveredDate = ref<Date | null>(null)

const today = new Date()
const leftMonth = ref(new Date(today.getFullYear(), today.getMonth(), 1))
const rightMonth = computed(() => new Date(leftMonth.value.getFullYear(), leftMonth.value.getMonth() + 1, 1))

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function prevMonth() {
  leftMonth.value = new Date(leftMonth.value.getFullYear(), leftMonth.value.getMonth() - 1, 1)
}
function nextMonth() {
  leftMonth.value = new Date(leftMonth.value.getFullYear(), leftMonth.value.getMonth() + 1, 1)
}

function getDays(monthStart: Date): (Date | null)[] {
  const days: (Date | null)[] = []
  const firstDay = monthStart.getDay()
  for (let i = 0; i < firstDay; i++) days.push(null)
  const daysInMonth = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate()
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(new Date(monthStart.getFullYear(), monthStart.getMonth(), d))
  }
  return days
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function isStart(d: Date) {
  return props.modelValue?.start ? isSameDay(d, props.modelValue.start) : false
}

function isEnd(d: Date) {
  return props.modelValue?.end ? isSameDay(d, props.modelValue.end) : false
}

function isInRange(d: Date) {
  const start = props.modelValue?.start
  const end = props.modelValue?.end ?? hoveredDate.value
  if (!start || !end)
    return false
  const [from, to] = start <= end ? [start, end] : [end, start]
  return d > from && d < to
}

function isToday(d: Date) {
  return isSameDay(d, today)
}

function selectDate(d: Date) {
  const { start, end } = props.modelValue ?? { start: null, end: null }
  if (!start || (start && end)) {
    emit('update:modelValue', { start: d, end: null })
  }
  else {
    if (d < start)
      emit('update:modelValue', { start: d, end: start })
    else emit('update:modelValue', { start, end: d })
    open.value = false
  }
}

const displayText = computed(() => {
  const { start, end } = props.modelValue ?? {}
  if (!start && !end)
    return ''
  const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  if (start && end)
    return `${fmt(start)} – ${fmt(end)}`
  if (start)
    return `${fmt(start)} – …`
  return ''
})
</script>

<template>
  <div :class="cn('relative', props.class)">
    <button
      type="button"
      :disabled="disabled"
      :class="cn(
        'w-full flex items-center gap-2 h-10 px-3 rounded-ds-md border border-ds-border bg-ds-bg text-sm transition-colors',
        'hover:border-ds-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        open ? 'ring-2 ring-ds-ring border-ds-primary' : '',
      )"
      @click="open = !open"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="size-4 text-ds-fg-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span :class="displayText ? 'text-ds-fg' : 'text-ds-fg-subtle'">
        {{ displayText || placeholder }}
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
        class="absolute z-50 mt-1 flex gap-4 p-4 rounded-ds-xl border border-ds-border bg-ds-bg shadow-ds-lg"
      >
        <!-- Left calendar -->
        <div
          v-for="(monthStart, mi) in [leftMonth, rightMonth]"
          :key="mi"
          class="w-56"
        >
          <div class="flex items-center justify-between mb-3">
            <button
              v-if="mi === 0"
              type="button"
              class="p-1 rounded-ds-sm hover:bg-ds-bg-subtle text-ds-fg-muted hover:text-ds-fg transition-colors"
              @click="prevMonth"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span v-else class="w-6"></span>
            <span class="text-sm font-semibold text-ds-fg">
              {{ monthNames[monthStart.getMonth()] }} {{ monthStart.getFullYear() }}
            </span>
            <button
              v-if="mi === 1"
              type="button"
              class="p-1 rounded-ds-sm hover:bg-ds-bg-subtle text-ds-fg-muted hover:text-ds-fg transition-colors"
              @click="nextMonth"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <span v-else class="w-6"></span>
          </div>

          <div class="grid grid-cols-7 gap-0.5 mb-1">
            <div
              v-for="day in dayNames"
              :key="day"
              class="h-7 flex items-center justify-center text-xs font-medium text-ds-fg-muted"
            >
              {{ day }}
            </div>
          </div>

          <div class="grid grid-cols-7 gap-0.5">
            <div
              v-for="(day, di) in getDays(monthStart)"
              :key="di"
            >
              <button
                v-if="day"
                type="button"
                :class="cn(
                  'w-full h-7 text-xs rounded-ds-sm transition-colors font-medium',
                  isStart(day) || isEnd(day) ? 'bg-ds-primary text-white' : '',
                  isInRange(day) ? 'bg-ds-primary-subtle text-ds-primary' : '',
                  !isStart(day) && !isEnd(day) && !isInRange(day) ? 'text-ds-fg hover:bg-ds-bg-subtle' : '',
                  isToday(day) && !isStart(day) && !isEnd(day) ? 'ring-1 ring-ds-primary/50' : '',
                )"
                @click="selectDate(day)"
                @mouseenter="hoveredDate = day"
                @mouseleave="hoveredDate = null"
              >
                {{ day.getDate() }}
              </button>
              <div v-else class="w-full h-7"></div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <div v-if="open" class="fixed inset-0 z-40" @click="open = false"></div>
  </div>
</template>
