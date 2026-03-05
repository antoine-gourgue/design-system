<script setup lang="ts">
import { cn } from '../utils/cn'
const props = defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('inline-flex items-center justify-center animate-pulse', props.class)">
    <svg width="280" height="280" viewBox="0 0 280 280" aria-hidden="true">
      <polygon points="140,36 229,95 196,196 84,196 51,95" fill="none" stroke="currentColor" class="text-ds-bg-muted" stroke-width="1.5" />
      <polygon points="140,68 196,112 173,168 107,168 84,112" fill="none" stroke="currentColor" class="text-ds-bg-muted" stroke-width="1.5" />
      <polygon points="140,100 163,130 151,161 129,161 117,130" fill="none" stroke="currentColor" class="text-ds-bg-muted" stroke-width="1.5" />
      <line x1="140" y1="140" x2="140" y2="36" stroke="currentColor" class="text-ds-bg-muted" stroke-width="1" />
      <line x1="140" y1="140" x2="229" y2="95" stroke="currentColor" class="text-ds-bg-muted" stroke-width="1" />
      <line x1="140" y1="140" x2="196" y2="196" stroke="currentColor" class="text-ds-bg-muted" stroke-width="1" />
      <line x1="140" y1="140" x2="84" y2="196" stroke="currentColor" class="text-ds-bg-muted" stroke-width="1" />
      <line x1="140" y1="140" x2="51" y2="95" stroke="currentColor" class="text-ds-bg-muted" stroke-width="1" />
      <polygon points="140,68 202,118 175,185 105,185 78,118" fill="currentColor" class="text-ds-primary-muted opacity-40" />
    </svg>
  </div>
</template>
