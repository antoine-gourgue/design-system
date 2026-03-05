<script setup lang="ts">
import { cn } from '../utils/cn'

export interface DsNotificationItemProps {
  title?: string
  description?: string
  time?: string
  read?: boolean
  avatarSrc?: string
  avatarInitials?: string
  class?: string
}

const props = withDefaults(defineProps<DsNotificationItemProps>(), {
  read: false,
})

const emit = defineEmits<{
  (e: 'dismiss'): void
  (e: 'click'): void
}>()
</script>

<template>
  <div
    :class="cn(
      'group relative flex items-start gap-3 px-4 py-3 hover:bg-ds-bg-subtle cursor-pointer transition-colors border-b border-ds-border last:border-0',
      !read ? 'bg-ds-primary-subtle/20' : '',
      props.class,
    )"
    role="listitem"
    @click="emit('click')"
  >
    <div v-if="!read" class="absolute left-1.5 top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-ds-primary shrink-0"></div>

    <div class="shrink-0 size-9 rounded-full bg-ds-primary-subtle text-ds-primary flex items-center justify-center text-sm font-semibold overflow-hidden">
      <img v-if="avatarSrc" :src="avatarSrc" :alt="avatarInitials" class="size-full object-cover" />
      <span v-else>{{ avatarInitials ?? '?' }}</span>
    </div>

    <div class="flex-1 min-w-0 space-y-0.5">
      <div v-if="title" class="text-sm font-medium text-ds-fg leading-snug">{{ title }}</div>
      <div v-if="description" class="text-sm text-ds-fg-muted leading-snug line-clamp-2">{{ description }}</div>
      <div v-if="time" class="text-xs text-ds-fg-subtle">{{ time }}</div>
    </div>

    <button
      type="button"
      class="shrink-0 rounded-ds-sm p-1 text-ds-fg-subtle hover:text-ds-fg hover:bg-ds-bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring opacity-0 group-hover:opacity-100"
      aria-label="Dismiss notification"
      @click.stop="emit('dismiss')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
