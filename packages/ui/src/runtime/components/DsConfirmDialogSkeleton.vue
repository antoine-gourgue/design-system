<script setup lang="ts">
import { cn } from '../utils/cn'
const props = defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('w-full max-w-sm mx-auto animate-pulse p-6 rounded-ds-xl border border-ds-border bg-ds-bg space-y-4', props.class)">
    <div class="mx-auto size-10 rounded-full bg-ds-bg-muted" />
    <div class="space-y-2 text-center">
      <div class="mx-auto h-4 w-32 rounded bg-ds-bg-muted" />
      <div class="mx-auto h-3 w-48 rounded bg-ds-bg-muted" />
    </div>
    <div class="flex gap-3 pt-1">
      <div class="flex-1 h-10 rounded-ds-md bg-ds-bg-muted" />
      <div class="flex-1 h-10 rounded-ds-md bg-ds-bg-muted" />
    </div>
  </div>
</template>
