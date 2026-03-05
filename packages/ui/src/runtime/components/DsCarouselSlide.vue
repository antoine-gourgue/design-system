<script setup lang="ts">
import { cn } from '../utils/cn'

interface DsCarouselSlideProps {
  class?: string
}
const props = defineProps<DsCarouselSlideProps>()
</script>

<template>
  <div :class="cn('w-full shrink-0', props.class)">
    <slot />
  </div>
</template>
