<script setup lang="ts">
import { cn } from '../utils/cn'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('relative rounded-ds-xl border border-ds-border bg-ds-bg animate-pulse overflow-hidden', props.class)">
    <div class="h-40 flex items-center justify-center">
      <div class="size-8 rounded-full border-4 border-ds-bg-muted border-t-ds-primary-muted"></div>
    </div>
  </div>
</template>
