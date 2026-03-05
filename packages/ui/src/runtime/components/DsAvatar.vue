<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import { computed, ref } from 'vue'
import { cn } from '../utils/cn'

const props = withDefaults(defineProps<DsAvatarProps>(), {
  size: 'md',
  shape: 'circle',
})

const avatarVariants = cva(
  'relative inline-flex items-center justify-center shrink-0 overflow-hidden font-medium font-ds select-none',
  {
    variants: {
      size: {
        xs: 'size-6 text-xs rounded-ds-sm',
        sm: 'size-8 text-xs rounded-ds-md',
        md: 'size-10 text-sm rounded-ds-lg',
        lg: 'size-12 text-base rounded-ds-lg',
        xl: 'size-16 text-lg rounded-ds-xl',
      },
      shape: {
        rounded: '',
        circle: '!rounded-full',
        square: '!rounded-none',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'circle',
    },
  },
)

type AvatarVariants = VariantProps<typeof avatarVariants>

export interface DsAvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: AvatarVariants['size']
  shape?: AvatarVariants['shape']
  class?: string
}

const imageError = ref(false)

function handleError() {
  imageError.value = true
}

const initials = computed(() => {
  if (!props.fallback)
    return '?'
  const parts = props.fallback.trim().split(/\s+/)
  if (parts.length >= 2)
    return (parts[0][0] + parts[1][0]).toUpperCase()
  return props.fallback.slice(0, 2).toUpperCase()
})

const classes = computed(() => cn(avatarVariants({ size: props.size, shape: props.shape }), props.class))
</script>

<template>
  <span :class="classes">
    <!-- Image -->
    <img
      v-if="src && !imageError"
      :src="src"
      :alt="alt ?? fallback ?? ''"
      class="h-full w-full object-cover"
      @error="handleError"
    >
    <!-- Fallback initials -->
    <span
      v-else
      class="flex h-full w-full items-center justify-center bg-ds-primary-muted text-ds-primary"
      aria-hidden="true"
    >
      {{ initials }}
    </span>
  </span>
</template>
