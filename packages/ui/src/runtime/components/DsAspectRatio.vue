<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsAspectRatioProps {
  ratio?: number
  class?: string
}

const props = withDefaults(defineProps<DsAspectRatioProps>(), {
  ratio: 16 / 9,
})

const paddingBottom = computed(() => `${(1 / props.ratio) * 100}%`)
</script>

<template>
  <div :class="cn('relative w-full overflow-hidden', props.class)" :style="{ paddingBottom }">
    <div class="absolute inset-0">
      <slot />
    </div>
  </div>
</template>
