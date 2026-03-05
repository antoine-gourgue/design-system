<script setup lang="ts">
import { cn } from '../utils/cn'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('w-full h-11 animate-pulse bg-ds-bg-muted border-b border-ds-border flex items-center gap-3 px-4', props.class)">
    <div class="size-4 rounded-full bg-ds-bg-elevated shrink-0"></div>
    <div class="flex-1 h-3.5 rounded bg-ds-bg-elevated"></div>
    <div class="size-4 rounded bg-ds-bg-elevated shrink-0"></div>
  </div>
</template>
