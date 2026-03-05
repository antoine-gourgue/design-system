<script setup lang="ts">
import { cn } from '../utils/cn'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('animate-pulse', props.class)">
    <div class="h-10 w-full rounded-ds-md bg-ds-bg-muted border border-ds-border flex items-center gap-2 px-3">
      <div class="size-4 rounded-full bg-ds-bg-elevated shrink-0" />
      <div class="h-3.5 w-16 rounded bg-ds-bg-elevated" />
    </div>
  </div>
</template>
