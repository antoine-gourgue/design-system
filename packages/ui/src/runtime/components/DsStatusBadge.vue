<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsStatusBadgeProps {
  status?: 'online' | 'offline' | 'busy' | 'away' | 'pending'
  label?: string
  showLabel?: boolean
  pulse?: boolean
  size?: 'sm' | 'md' | 'lg'
  class?: string
}

const props = withDefaults(defineProps<DsStatusBadgeProps>(), {
  status: 'online',
  showLabel: true,
  pulse: false,
  size: 'md',
})

const colorClasses = {
  online: 'bg-ds-success',
  offline: 'bg-ds-fg-subtle',
  busy: 'bg-ds-danger',
  away: 'bg-ds-warning',
  pending: 'bg-ds-info',
}

const statusLabels = {
  online: 'Online',
  offline: 'Offline',
  busy: 'Busy',
  away: 'Away',
  pending: 'Pending',
}

const dotSizeClasses = {
  sm: 'size-1.5',
  md: 'size-2',
  lg: 'size-2.5',
}

const textSizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
}

const displayLabel = computed(() => props.label ?? statusLabels[props.status])
</script>

<template>
  <span :class="cn('inline-flex items-center gap-1.5', props.class)">
    <span class="relative flex items-center justify-center shrink-0" :class="dotSizeClasses[size]">
      <span
        v-if="pulse && status === 'online'"
        :class="cn('absolute inline-flex rounded-full opacity-75 animate-ping', dotSizeClasses[size], colorClasses[status])"
      />
      <span :class="cn('relative inline-flex rounded-full', dotSizeClasses[size], colorClasses[status])" />
    </span>
    <span v-if="showLabel" :class="cn('font-medium text-ds-fg-muted', textSizeClasses[size])">
      {{ displayLabel }}
    </span>
  </span>
</template>
