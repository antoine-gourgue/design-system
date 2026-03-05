<script setup lang="ts">
import { cn } from '../utils/cn'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('w-full min-h-10 animate-pulse rounded-ds-md bg-ds-bg-muted border border-ds-border flex items-center gap-1.5 px-2.5 py-1.5', props.class)">
    <div class="h-5 w-16 rounded-full bg-ds-bg-elevated"></div>
    <div class="h-5 w-20 rounded-full bg-ds-bg-elevated"></div>
  </div>
</template>
