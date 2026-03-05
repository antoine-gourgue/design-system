<script setup lang="ts">
import { cn } from '../utils/cn'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface DsBreadcrumbProps {
  items: BreadcrumbItem[]
  class?: string
}

const props = defineProps<DsBreadcrumbProps>()
</script>

<template>
  <nav :class="cn('font-ds', props.class)" aria-label="Breadcrumb">
    <ol class="flex flex-wrap items-center gap-1.5 text-sm">
      <li v-for="(item, index) in items" :key="index" class="flex items-center gap-1.5">
        <!-- Separator -->
        <svg
          v-if="index > 0"
          class="size-3.5 text-ds-fg-subtle shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>

        <!-- Last item (current) -->
        <span
          v-if="index === items.length - 1"
          class="font-medium text-ds-fg"
          :aria-current="'page'"
        >
          {{ item.label }}
        </span>

        <!-- Link -->
        <a
          v-else-if="item.href"
          :href="item.href"
          class="text-ds-fg-muted transition-colors duration-ds-fast hover:text-ds-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring rounded-ds-xs"
        >
          {{ item.label }}
        </a>

        <!-- Non-link item -->
        <span v-else class="text-ds-fg-muted">
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>
