<script setup lang="ts">
import { cn } from '../utils/cn'

export interface DsVerticalNavItem {
  id: string
  label: string
  href?: string
  icon?: string // SVG path d attribute
  badge?: string | number
  disabled?: boolean
  children?: DsVerticalNavItem[]
}

export interface DsVerticalNavGroup {
  id: string
  title?: string
  items: DsVerticalNavItem[]
}

export interface DsVerticalNavProps {
  groups: DsVerticalNavGroup[]
  activeId?: string
  collapsed?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsVerticalNavProps>(), {
  collapsed: false,
})

const emit = defineEmits<{
  (e: 'select', id: string, _item: DsVerticalNavItem): void
}>()

function isActive(item: DsVerticalNavItem): boolean {
  if (props.activeId === item.id)
    return true
  if (item.children) {
    return item.children.some(child => child.id === props.activeId)
  }
  return false
}

function hasActiveChild(item: DsVerticalNavItem): boolean {
  return item.children?.some(c => c.id === props.activeId) ?? false
}

function select(item: DsVerticalNavItem) {
  if (item.disabled)
    return
  emit('select', item.id, item)
}
</script>

<template>
  <nav
    :class="cn(
      'flex flex-col gap-1 select-none',
      props.class,
    )"
    role="navigation"
  >
    <div
      v-for="group in groups"
      :key="group.id"
      class="space-y-0.5"
    >
      <!-- Group title -->
      <p
        v-if="group.title && !collapsed"
        class="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-ds-fg-subtle mb-1"
      >
        {{ group.title }}
      </p>
      <div v-else-if="group.title && collapsed" class="border-t border-ds-border my-2 mx-2"></div>

      <!-- Items -->
      <template v-for="item in group.items" :key="item.id">
        <!-- Item with possible children -->
        <div>
          <component
            :is="item.href ? 'a' : 'button'"
            :href="item.href"
            :type="!item.href ? 'button' : undefined"
            :class="cn(
              'w-full flex items-center gap-2.5 rounded-ds-md px-3 py-2 text-sm transition-all duration-100',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring',
              isActive(item) && !hasActiveChild(item)
                ? 'bg-ds-primary-subtle text-ds-primary font-medium'
                : 'text-ds-fg-muted hover:text-ds-fg hover:bg-ds-bg-muted',
              item.disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
              collapsed ? 'justify-center px-2' : '',
            )"
            :aria-current="isActive(item) && !hasActiveChild(item) ? 'page' : undefined"
            :aria-disabled="item.disabled"
            :title="collapsed ? item.label : undefined"
            @click="() => select(item)"
          >
            <!-- Icon -->
            <svg
              v-if="item.icon"
              xmlns="http://www.w3.org/2000/svg"
              class="size-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
            </svg>
            <!-- Generic dot if no icon -->
            <span
              v-else
              :class="cn(
                'size-1.5 rounded-full shrink-0 transition-all',
                isActive(item) && !hasActiveChild(item) ? 'bg-ds-primary' : 'bg-ds-fg-muted/50',
              )"
            ></span>

            <!-- Label + badge -->
            <span v-if="!collapsed" class="flex-1 truncate">{{ item.label }}</span>
            <span
              v-if="item.badge !== undefined && !collapsed"
              :class="cn(
                'ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded-full',
                isActive(item)
                  ? 'bg-ds-primary text-white'
                  : 'bg-ds-bg-muted border border-ds-border text-ds-fg-muted',
              )"
            >
              {{ item.badge }}
            </span>
          </component>

          <!-- Children / sub-items -->
          <div
            v-if="item.children && !collapsed"
            class="ml-4 pl-3 border-l border-ds-border mt-0.5 mb-0.5 space-y-0.5"
          >
            <component
              :is="child.href ? 'a' : 'button'"
              v-for="child in item.children"
              :key="child.id"
              :href="child.href"
              :type="!child.href ? 'button' : undefined"
              :class="cn(
                'w-full flex items-center gap-2 rounded-ds-md px-2.5 py-1.5 text-sm transition-all duration-100',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring',
                child.id === activeId
                  ? 'bg-ds-primary-subtle text-ds-primary font-medium'
                  : 'text-ds-fg-muted hover:text-ds-fg hover:bg-ds-bg-muted',
                child.disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
              )"
              :aria-current="child.id === activeId ? 'page' : undefined"
              @click="() => select(child)"
            >
              <span class="size-1 rounded-full bg-current opacity-50 shrink-0"></span>
              <span class="truncate">{{ child.label }}</span>
              <span
                v-if="child.badge !== undefined"
                class="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-ds-bg-muted border border-ds-border text-ds-fg-muted"
              >
                {{ child.badge }}
              </span>
            </component>
          </div>
        </div>
      </template>
    </div>
  </nav>
</template>
