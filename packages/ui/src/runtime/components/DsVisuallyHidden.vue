<script setup lang="ts">
import { cn } from '../utils/cn'

const props = defineProps<{ as?: string, class?: string }>()
</script>

<template>
  <component
    :is="props.as ?? 'span'"
    :class="cn('sr-only', props.class)"
  >
    <slot></slot>
  </component>
</template>
