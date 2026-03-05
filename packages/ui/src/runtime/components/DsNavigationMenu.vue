<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '../utils/cn'

export interface DsNavMenuItem {
  label: string
  href?: string
  description?: string
  children?: DsNavMenuItem[]
}

export interface DsNavigationMenuProps {
  items?: DsNavMenuItem[]
  class?: string
}

const props = withDefaults(defineProps<DsNavigationMenuProps>(), {
  items: () => [],
})

const activeMenu = ref<number | null>(null)

function openMenu(i: number) {
  activeMenu.value = i
}

function closeAll() {
  activeMenu.value = null
}
</script>

<template>
  <nav
    :class="cn('relative flex items-center gap-1', props.class)"
    @mouseleave="closeAll"
  >
    <div
      v-for="(item, i) in items"
      :key="i"
      class="relative"
      @mouseenter="item.children?.length ? openMenu(i) : undefined"
    >
      <component
        :is="item.href ? 'a' : 'button'"
        :href="item.href"
        type="button"
        :class="cn(
          'flex items-center gap-1 px-3 py-2 rounded-ds-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-ring',
          activeMenu === i ? 'text-ds-fg bg-ds-bg-subtle' : 'text-ds-fg-muted hover:text-ds-fg hover:bg-ds-bg-subtle',
        )"
        @click="item.children?.length ? (activeMenu === i ? closeAll() : openMenu(i)) : undefined"
      >
        {{ item.label }}
        <svg
          v-if="item.children?.length"
          xmlns="http://www.w3.org/2000/svg"
          class="size-3.5 transition-transform"
          :class="activeMenu === i ? 'rotate-180' : ''"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </component>

      <Transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        leave-active-class="transition duration-75 ease-in"
        leave-to-class="translate-y-1 opacity-0"
      >
        <div
          v-if="item.children?.length && activeMenu === i"
          class="absolute left-0 top-full mt-1.5 min-w-52 rounded-ds-lg border border-ds-border bg-ds-bg shadow-ds-md py-1.5 z-50"
        >
          <a
            v-for="child in item.children"
            :key="child.label"
            :href="child.href ?? '#'"
            class="flex flex-col px-3 py-2 hover:bg-ds-bg-subtle transition-colors"
          >
            <span class="text-sm font-medium text-ds-fg">{{ child.label }}</span>
            <span v-if="child.description" class="text-xs text-ds-fg-muted mt-0.5">{{ child.description }}</span>
          </a>
        </div>
      </Transition>
    </div>
  </nav>
</template>
