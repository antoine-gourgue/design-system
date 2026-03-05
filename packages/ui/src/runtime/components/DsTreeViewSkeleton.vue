<script setup lang="ts">
import { cn } from '../utils/cn'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('animate-pulse space-y-1 p-2', props.class)">
    <div class="flex items-center gap-2 px-2 py-1.5">
      <div class="size-4 rounded bg-ds-bg-muted shrink-0"></div>
      <div class="size-4 rounded bg-ds-bg-muted shrink-0"></div>
      <div class="h-3.5 w-28 rounded bg-ds-bg-muted"></div>
    </div>
    <div class="flex items-center gap-2 px-2 py-1.5 pl-10">
      <div class="size-4 rounded bg-ds-bg-muted shrink-0"></div>
      <div class="h-3.5 w-20 rounded bg-ds-bg-muted"></div>
    </div>
    <div class="flex items-center gap-2 px-2 py-1.5 pl-10">
      <div class="size-4 rounded bg-ds-bg-muted shrink-0"></div>
      <div class="h-3.5 w-24 rounded bg-ds-bg-muted"></div>
    </div>
    <div class="flex items-center gap-2 px-2 py-1.5">
      <div class="size-4 rounded bg-ds-bg-muted shrink-0"></div>
      <div class="size-4 rounded bg-ds-bg-muted shrink-0"></div>
      <div class="h-3.5 w-32 rounded bg-ds-bg-muted"></div>
    </div>
    <div class="flex items-center gap-2 px-2 py-1.5 pl-10">
      <div class="size-4 rounded bg-ds-bg-muted shrink-0"></div>
      <div class="h-3.5 w-18 rounded bg-ds-bg-muted"></div>
    </div>
  </div>
</template>
