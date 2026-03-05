<script setup lang="ts">
import { cn } from '../utils/cn'
import DsSkeleton from './DsSkeleton.vue'

interface DsAlertDialogSkeletonProps {
  class?: string
}
const props = defineProps<DsAlertDialogSkeletonProps>()
</script>

<template>
  <div :class="cn('w-full max-w-md rounded-ds-xl border border-ds-border bg-ds-bg-elevated p-6 space-y-4 animate-pulse', props.class)">
    <DsSkeleton class="h-5 w-2/3 rounded-ds-md" />
    <DsSkeleton class="h-4 w-full rounded-ds-md" />
    <DsSkeleton class="h-4 w-4/5 rounded-ds-md" />
    <div class="flex justify-end gap-3 pt-2">
      <DsSkeleton class="h-9 w-20 rounded-ds-md" />
      <DsSkeleton class="h-9 w-24 rounded-ds-md" />
    </div>
  </div>
</template>
