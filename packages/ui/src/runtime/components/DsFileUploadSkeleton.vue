<script setup lang="ts">
import { cn } from '../utils/cn'
import DsSkeleton from './DsSkeleton.vue'

interface DsFileUploadSkeletonProps {
  class?: string
}
const props = defineProps<DsFileUploadSkeletonProps>()
</script>

<template>
  <div :class="cn('w-full space-y-3 animate-pulse', props.class)">
    <!-- Drop zone skeleton -->
    <div class="flex flex-col items-center justify-center gap-3 rounded-ds-xl border-2 border-dashed border-ds-border px-6 py-10">
      <DsSkeleton class="size-12 rounded-full" />
      <div class="space-y-1.5 flex flex-col items-center">
        <DsSkeleton class="h-4 w-48 rounded-ds-md" />
        <DsSkeleton class="h-3 w-32 rounded-ds-md" />
      </div>
    </div>
    <!-- File item skeleton -->
    <div class="flex items-center gap-3 rounded-ds-lg border border-ds-border bg-ds-bg px-3 py-2.5">
      <DsSkeleton class="size-4 rounded shrink-0" />
      <div class="flex-1 space-y-1">
        <DsSkeleton class="h-3.5 w-40 rounded-ds-md" />
        <DsSkeleton class="h-3 w-16 rounded-ds-md" />
      </div>
    </div>
  </div>
</template>
