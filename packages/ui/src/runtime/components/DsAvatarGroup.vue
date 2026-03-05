<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

export interface DsAvatarGroupItem {
  src?: string
  alt?: string
  initials?: string
}

export interface DsAvatarGroupProps {
  items?: DsAvatarGroupItem[]
  max?: number
  size?: 'xs' | 'sm' | 'md' | 'lg'
  class?: string
}

const props = withDefaults(defineProps<DsAvatarGroupProps>(), {
  items: () => [],
  max: 4,
  size: 'md',
})

const sizeClasses = {
  xs: 'size-6 text-xs',
  sm: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-12 text-base',
}

const ringClasses = {
  xs: 'ring-1',
  sm: 'ring-2',
  md: 'ring-2',
  lg: 'ring-2',
}

const visible = computed(() => props.items.slice(0, props.max))
const overflow = computed(() => Math.max(0, props.items.length - props.max))
</script>

<template>
  <div :class="cn('flex items-center', props.class)">
    <div
      v-for="(item, i) in visible"
      :key="i"
      :title="item.alt"
      :style="{ zIndex: visible.length - i }"
      :class="cn(
        'relative rounded-full overflow-hidden flex items-center justify-center font-semibold bg-ds-primary-subtle text-ds-primary',
        'ring-ds-bg -ml-2 first:ml-0',
        sizeClasses[size],
        ringClasses[size],
      )"
    >
      <img v-if="item.src" :src="item.src" :alt="item.alt" class="w-full h-full object-cover" />
      <span v-else>{{ item.initials ?? item.alt?.slice(0, 2).toUpperCase() ?? '?' }}</span>
    </div>
    <div
      v-if="overflow > 0"
      :class="cn(
        'relative rounded-full flex items-center justify-center font-semibold bg-ds-bg-muted text-ds-fg-muted border border-ds-border -ml-2 shrink-0',
        sizeClasses[size],
      )"
    >
      +{{ overflow }}
    </div>
  </div>
</template>
