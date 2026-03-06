<script setup lang="ts" generic="T">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { cn } from '../utils/cn'

export interface DsVirtualListProps<T> {
  items: T[]
  itemHeight: number
  containerHeight?: number
  overscan?: number
  keyField?: string
  class?: string
}

const props = withDefaults(defineProps<DsVirtualListProps<T>>(), {
  containerHeight: 400,
  overscan: 3,
})

const scrollTop = ref(0)
const containerRef = ref<HTMLDivElement | null>(null)

const totalHeight = computed(() => props.items.length * props.itemHeight)

const visibleStart = computed(() => {
  const start = Math.floor(scrollTop.value / props.itemHeight) - props.overscan
  return Math.max(0, start)
})

const visibleEnd = computed(() => {
  const end = Math.ceil((scrollTop.value + props.containerHeight) / props.itemHeight) + props.overscan
  return Math.min(props.items.length - 1, end)
})

const visibleItems = computed(() => {
  return props.items.slice(visibleStart.value, visibleEnd.value + 1).map((item, i) => ({
    item,
    index: visibleStart.value + i,
    key: props.keyField ? (item as Record<string, unknown>)[props.keyField] as string : visibleStart.value + i,
  }))
})

const offsetTop = computed(() => visibleStart.value * props.itemHeight)

function onScroll(e: Event) {
  scrollTop.value = (e.target as HTMLDivElement).scrollTop
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  if (containerRef.value && typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      // Trigger recompute on resize
      if (containerRef.value)
        scrollTop.value = containerRef.value.scrollTop
    })
    resizeObserver.observe(containerRef.value)
  }
})

onUnmounted(() => {
  resizeObserver?.disconnect()
})
</script>

<template>
  <div
    ref="containerRef"
    :class="cn('overflow-y-auto relative', props.class)"
    :style="{ height: `${containerHeight}px` }"
    @scroll="onScroll"
  >
    <!-- Total height spacer -->
    <div :style="{ height: `${totalHeight}px`, position: 'relative' }">
      <!-- Visible items positioned absolutely -->
      <div
        :style="{ transform: `translateY(${offsetTop}px)` }"
      >
        <div
          v-for="{ item, index, key } in visibleItems"
          :key="key"
          :style="{ height: `${itemHeight}px` }"
          class="overflow-hidden"
        >
          <slot :item="item" :index="index"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
