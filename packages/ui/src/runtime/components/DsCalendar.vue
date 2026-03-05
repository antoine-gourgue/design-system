<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { cn } from '../utils/cn'

export interface DsCalendarProps {
  modelValue?: Date | null
  min?: Date
  max?: Date
  locale?: string
  disabled?: boolean
  /** Show today button */
  showToday?: boolean
}

const props = withDefaults(defineProps<DsCalendarProps>(), {
  modelValue: null,
  locale: 'en-US',
  disabled: false,
  showToday: true,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: Date | null): void
}>()

const today = new Date()

const viewYear = ref(props.modelValue?.getFullYear() ?? today.getFullYear())
const viewMonth = ref(props.modelValue?.getMonth() ?? today.getMonth())

watch(() => props.modelValue, (val) => {
  if (val) {
    viewYear.value = val.getFullYear()
    viewMonth.value = val.getMonth()
  }
})

const DAY_LABELS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

const monthLabel = computed(() =>
  new Date(viewYear.value, viewMonth.value, 1).toLocaleDateString(props.locale, {
    month: 'long',
    year: 'numeric',
  }),
)

interface CalendarDay {
  date: Date
  currentMonth: boolean
  isToday: boolean
  isSelected: boolean
  isDisabled: boolean
  isWeekend: boolean
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate()
}

const calendarDays = computed((): CalendarDay[] => {
  const year = viewYear.value
  const month = viewMonth.value
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  // Convert Sun=0 → Mon-first offset (0=Mon…6=Sun)
  const startOffset = (firstDay.getDay() + 6) % 7
  const days: CalendarDay[] = []

  // Leading days from previous month
  for (let i = startOffset - 1; i >= 0; i--) {
    const date = new Date(year, month, -i)
    days.push(makeDay(date, false))
  }

  // Current month days
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(makeDay(new Date(year, month, d), true))
  }

  // Trailing days to complete the grid (always 42 cells = 6 rows)
  let next = 1
  while (days.length < 42) {
    days.push(makeDay(new Date(year, month + 1, next++), false))
  }

  return days
})

function makeDay(date: Date, currentMonth: boolean): CalendarDay {
  const dow = date.getDay() // 0=Sun, 6=Sat
  const isDisabled = props.disabled
    || (props.min != null && date < props.min)
    || (props.max != null && date > props.max)

  return {
    date,
    currentMonth,
    isToday: isSameDay(date, today),
    isSelected: props.modelValue != null && isSameDay(date, props.modelValue),
    isDisabled: !!isDisabled,
    isWeekend: dow === 0 || dow === 6,
  }
}

function prevMonth() {
  if (viewMonth.value === 0) {
    viewMonth.value = 11
    viewYear.value--
  }
  else {
    viewMonth.value--
  }
}

function nextMonth() {
  if (viewMonth.value === 11) {
    viewMonth.value = 0
    viewYear.value++
  }
  else {
    viewMonth.value++
  }
}

function goToday() {
  viewYear.value = today.getFullYear()
  viewMonth.value = today.getMonth()
  emit('update:modelValue', new Date(today))
}

function selectDay(day: CalendarDay) {
  if (day.isDisabled)
    return
  emit('update:modelValue', new Date(day.date))
}
</script>

<template>
  <div
    :class="cn(
      'inline-flex flex-col bg-ds-bg-elevated border border-ds-border rounded-ds-xl shadow-ds-md select-none',
      disabled && 'opacity-60 pointer-events-none',
    )"
    role="application"
    aria-label="Calendar"
  >
    <!-- Header: month nav -->
    <div class="flex items-center justify-between px-4 pt-4 pb-2">
      <button
        type="button"
        class="flex items-center justify-center size-8 rounded-ds-md text-ds-fg-muted hover:text-ds-fg hover:bg-ds-bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring"
        aria-label="Previous month"
        @click="prevMonth"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <span class="text-sm font-semibold text-ds-fg capitalize">{{ monthLabel }}</span>

      <button
        type="button"
        class="flex items-center justify-center size-8 rounded-ds-md text-ds-fg-muted hover:text-ds-fg hover:bg-ds-bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring"
        aria-label="Next month"
        @click="nextMonth"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Day labels -->
    <div class="grid grid-cols-7 px-3 pb-1">
      <span
        v-for="label in DAY_LABELS"
        :key="label"
        class="flex items-center justify-center h-8 text-xs font-medium text-ds-fg-subtle"
      >
        {{ label }}
      </span>
    </div>

    <!-- Days grid -->
    <div class="grid grid-cols-7 px-3 pb-3 gap-y-0.5">
      <button
        v-for="(day, i) in calendarDays"
        :key="i"
        type="button"
        :disabled="day.isDisabled"
        :aria-label="day.date.toLocaleDateString(locale)"
        :aria-pressed="day.isSelected"
        :class="cn(
          'flex items-center justify-center size-8 rounded-ds-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring',
          // Not current month
          !day.currentMonth && 'text-ds-fg-subtle',
          // Current month, not selected, not today
          day.currentMonth && !day.isSelected && !day.isToday && 'text-ds-fg hover:bg-ds-bg-muted',
          // Weekend dimming (only if not selected/today)
          day.isWeekend && !day.isSelected && !day.isToday && 'text-ds-fg-muted',
          // Today ring
          day.isToday && !day.isSelected && 'text-ds-primary font-semibold ring-1 ring-ds-primary',
          // Selected
          day.isSelected && 'bg-ds-primary text-ds-primary-fg font-semibold hover:bg-ds-primary-hover',
          // Disabled
          day.isDisabled && 'opacity-30 cursor-not-allowed',
        )"
        @click="selectDay(day)"
      >
        {{ day.date.getDate() }}
      </button>
    </div>

    <!-- Today button -->
    <div v-if="showToday" class="px-3 pb-3">
      <button
        type="button"
        class="w-full py-1.5 text-xs font-medium text-ds-fg-muted hover:text-ds-fg border border-ds-border rounded-ds-md hover:bg-ds-bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring"
        @click="goToday"
      >
        Today
      </button>
    </div>
  </div>
</template>
