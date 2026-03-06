<script setup lang="ts">
import { cn } from '../utils/cn'
import DsSkeleton from './DsSkeleton.vue'

interface DsCopyButtonSkeletonProps {
  size?: 'sm' | 'md' | 'lg'
  class?: string
}
const props = withDefaults(defineProps<DsCopyButtonSkeletonProps>(), { size: 'md' })

const heightClass = { sm: 'h-7 w-20', md: 'h-9 w-24', lg: 'h-11 w-28' }
</script>

<template>
  <DsSkeleton
    :class="cn(`rounded-ds-md animate-pulse ${heightClass[props.size]}`, props.class)"
  />
</template>
