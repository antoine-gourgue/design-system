<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

const props = withDefaults(defineProps<{
  size?: 'sm' | 'md' | 'lg'
  class?: string
}>(), { size: 'md' })

const heights: Record<string, string> = { sm: 'h-8', md: 'h-10', lg: 'h-11' }
const classes = computed(() => cn('w-full rounded-ds-md bg-ds-bg-muted animate-pulse', heights[props.size ?? 'md'], props.class))
</script>

<template>
  <div :class="classes" aria-hidden="true" role="presentation" />
</template>
