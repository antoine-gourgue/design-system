<script setup lang="ts">
import { cn } from '../utils/cn'

export type TimelineStatus = 'done' | 'current' | 'pending'

export interface DsTimelineItem {
  title: string
  description?: string
  date?: string
  status?: TimelineStatus
}

export interface DsTimelineProps {
  items: DsTimelineItem[]
  class?: string
}

const props = defineProps<DsTimelineProps>()

const dotClasses: Record<TimelineStatus, string> = {
  done: 'bg-ds-success border-ds-success text-ds-success-fg',
  current: 'bg-ds-primary border-ds-primary text-ds-primary-fg ring-4 ring-ds-primary/20',
  pending: 'bg-ds-bg border-ds-border text-ds-fg-muted',
}
</script>

<template>
  <ol :class="cn('relative space-y-0', props.class)">
    <li
      v-for="(item, i) in items"
      :key="i"
      class="relative flex gap-4 pb-8 last:pb-0"
    >
      <!-- Vertical line -->
      <div
        v-if="i < items.length - 1"
        class="absolute left-[13px] top-7 bottom-0 w-px bg-ds-border"
        aria-hidden="true"
      ></div>

      <!-- Dot -->
      <div
        :class="cn(
          'relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border-2 transition-all',
          dotClasses[item.status ?? 'pending'],
        )"
        :aria-label="item.status ?? 'pending'"
      >
        <!-- Done checkmark -->
        <svg v-if="item.status === 'done'" xmlns="http://www.w3.org/2000/svg" class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <!-- Current dot -->
        <span v-else-if="item.status === 'current'" class="size-2 rounded-full bg-ds-primary-fg"></span>
        <!-- Pending circle -->
        <span v-else class="size-2 rounded-full bg-ds-border"></span>
      </div>

      <!-- Content -->
      <div class="flex flex-col gap-1 pt-0.5 min-w-0">
        <div class="flex items-baseline justify-between gap-4 flex-wrap">
          <p
            :class="cn(
              'text-sm font-semibold',
              item.status === 'done' ? 'text-ds-fg' : item.status === 'current' ? 'text-ds-primary' : 'text-ds-fg-muted',
            )"
          >
            {{ item.title }}
          </p>
          <span v-if="item.date" class="text-xs text-ds-fg-subtle shrink-0">{{ item.date }}</span>
        </div>
        <p v-if="item.description" class="text-sm text-ds-fg-muted leading-relaxed">
          {{ item.description }}
        </p>
      </div>
    </li>
  </ol>
</template>
