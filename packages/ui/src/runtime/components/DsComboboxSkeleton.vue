<script setup lang="ts">
import { cn } from '../utils/cn'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('w-full h-10 animate-pulse rounded-ds-md bg-ds-bg-muted border border-ds-border', props.class)"></div>
</template>
