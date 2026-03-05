<script setup lang="ts">
import { cn } from '../utils/cn'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('inline-flex items-center gap-1.5 animate-pulse', props.class)">
    <div class="size-2 rounded-full bg-ds-bg-muted shrink-0"></div>
    <div class="h-3 w-12 rounded bg-ds-bg-muted"></div>
  </div>
</template>
