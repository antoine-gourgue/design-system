<script setup lang="ts">
import { cn } from '../utils/cn'
import DsSkeleton from './DsSkeleton.vue'

interface DsPhoneInputSkeletonProps {
  class?: string
}
const props = defineProps<DsPhoneInputSkeletonProps>()
</script>

<template>
  <div :class="cn('flex items-center rounded-ds-md border border-ds-border overflow-hidden animate-pulse', props.class)">
    <DsSkeleton class="h-9 w-24 rounded-none border-r border-ds-border" />
    <DsSkeleton class="h-9 flex-1 rounded-none" />
  </div>
</template>
