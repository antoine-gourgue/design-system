<script setup lang="ts">
import { cn } from '../utils/cn'
import DsSkeleton from './DsSkeleton.vue'

interface DsHoverCardSkeletonProps {
  class?: string
}
const props = defineProps<DsHoverCardSkeletonProps>()
</script>

<template>
  <div :class="cn('w-72 rounded-ds-xl border border-ds-border bg-ds-bg-elevated p-4 space-y-3 animate-pulse', props.class)">
    <div class="flex items-center gap-3">
      <DsSkeleton class="size-10 rounded-full shrink-0" />
      <div class="flex-1 space-y-1.5">
        <DsSkeleton class="h-3.5 w-28 rounded-ds-md" />
        <DsSkeleton class="h-3 w-20 rounded-ds-md" />
      </div>
    </div>
    <DsSkeleton class="h-3 w-full rounded-ds-md" />
    <DsSkeleton class="h-3 w-5/6 rounded-ds-md" />
  </div>
</template>
