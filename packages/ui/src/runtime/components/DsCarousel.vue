<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { cn } from '../utils/cn'

export interface DsCarouselProps {
  /** Number of slides (used when using slot-based approach) */
  count?: number
  autoplay?: boolean
  interval?: number
  arrows?: boolean
  dots?: boolean
  loop?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsCarouselProps>(), {
  count: 1,
  autoplay: false,
  interval: 4000,
  arrows: true,
  dots: true,
  loop: true,
})

const current = ref(0)
let timer: ReturnType<typeof setInterval>

const total = computed(() => props.count)

function goTo(index: number) {
  if (props.loop) {
    current.value = (index + total.value) % total.value
  }
  else {
    current.value = Math.max(0, Math.min(index, total.value - 1))
  }
}

function prev() {
  goTo(current.value - 1)
}
function next() {
  goTo(current.value + 1)
}

function startAutoplay() {
  if (props.autoplay) {
    timer = setInterval(next, props.interval)
  }
}

function stopAutoplay() {
  clearInterval(timer)
}

onMounted(startAutoplay)
onUnmounted(stopAutoplay)

watch(() => props.autoplay, (val) => {
  if (val)
    startAutoplay()
  else stopAutoplay()
})
</script>

<template>
  <div
    :class="cn('relative w-full overflow-hidden rounded-ds-xl', props.class)"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
  >
    <!-- Slides wrapper -->
    <div
      class="flex transition-transform duration-300 ease-out"
      :style="{ transform: `translateX(-${current * 100}%)` }"
    >
      <slot></slot>
    </div>

    <!-- Arrows -->
    <template v-if="arrows && total > 1">
      <button
        class="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex size-9 items-center justify-center rounded-full bg-ds-bg/80 border border-ds-border shadow-ds-md backdrop-blur-sm text-ds-fg hover:bg-ds-bg transition-colors"
        aria-label="Previous slide"
        :disabled="!loop && current === 0"
        @click="prev"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        class="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex size-9 items-center justify-center rounded-full bg-ds-bg/80 border border-ds-border shadow-ds-md backdrop-blur-sm text-ds-fg hover:bg-ds-bg transition-colors"
        aria-label="Next slide"
        :disabled="!loop && current === total - 1"
        @click="next"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </template>

    <!-- Dots -->
    <div v-if="dots && total > 1" class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
      <button
        v-for="i in total"
        :key="i"
        class="rounded-full transition-all"
        :class="i - 1 === current ? 'w-5 h-2 bg-ds-primary' : 'size-2 bg-ds-bg/70 hover:bg-ds-bg'"
        :aria-label="`Go to slide ${i}`"
        :aria-current="i - 1 === current"
        @click="goTo(i - 1)"
      ></button>
    </div>
  </div>
</template>
