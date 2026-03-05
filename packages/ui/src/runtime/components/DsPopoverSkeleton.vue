<script setup lang="ts">
import { cn } from '../utils/cn'
import DsSkeleton from './DsSkeleton.vue'

interface DsPopoverSkeletonProps {
  class?: string
}
const props = defineProps<DsPopoverSkeletonProps>()
</script>

<template>
  <div :class="cn('inline-flex flex-col gap-3 animate-pulse', props.class)">
    <!-- Trigger placeholder -->
    <DsSkeleton class="h-9 w-32 rounded-ds-md" />
    <!-- Panel placeholder -->
    <div class="w-56 rounded-ds-lg border border-ds-border bg-ds-bg-elevated p-3 space-y-2">
      <DsSkeleton class="h-4 w-full rounded-ds-md" />
      <DsSkeleton class="h-4 w-3/4 rounded-ds-md" />
      <DsSkeleton class="h-4 w-5/6 rounded-ds-md" />
    </div>
  </div>
</template>
