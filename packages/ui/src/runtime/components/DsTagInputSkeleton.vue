<script setup lang="ts">
import { cn } from '../utils/cn'
const props = defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('animate-pulse', props.class)">
    <div class="h-10 w-full rounded-ds-md bg-ds-bg-muted border border-ds-border flex items-center gap-1.5 px-2.5">
      <div class="h-5 w-16 rounded-full bg-ds-primary-muted opacity-60" />
      <div class="h-5 w-20 rounded-full bg-ds-primary-muted opacity-60" />
      <div class="h-5 w-12 rounded-full bg-ds-primary-muted opacity-60" />
    </div>
  </div>
</template>
