<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { cn } from '../utils/cn'

export interface DsResizableProps {
  direction?: 'horizontal' | 'vertical'
  initialSize?: number
  minSize?: number
  maxSize?: number
  handleClass?: string
  class?: string
}

const props = withDefaults(defineProps<DsResizableProps>(), {
  direction: 'horizontal',
  initialSize: 50,
  minSize: 15,
  maxSize: 85,
})

const containerRef = ref<HTMLDivElement | null>(null)
const size = ref(props.initialSize)
const isDragging = ref(false)

function startDrag(e: MouseEvent | TouchEvent) {
  e.preventDefault()
  isDragging.value = true

  const onMove = (ev: MouseEvent | TouchEvent) => {
    const container = containerRef.value
    if (!container)
      return

    const rect = container.getBoundingClientRect()
    let clientPos: number

    if ('touches' in ev) {
      clientPos = props.direction === 'horizontal' ? ev.touches[0].clientX : ev.touches[0].clientY
    }
    else {
      clientPos = props.direction === 'horizontal' ? ev.clientX : ev.clientY
    }

    const containerSize = props.direction === 'horizontal' ? rect.width : rect.height
    const offset = props.direction === 'horizontal' ? rect.left : rect.top
    const newSize = ((clientPos - offset) / containerSize) * 100

    size.value = Math.max(props.minSize, Math.min(props.maxSize, newSize))
  }

  const onEnd = () => {
    isDragging.value = false
    window.removeEventListener('mousemove', onMove as EventListener)
    window.removeEventListener('touchmove', onMove as EventListener)
    window.removeEventListener('mouseup', onEnd)
    window.removeEventListener('touchend', onEnd)
  }

  window.addEventListener('mousemove', onMove as EventListener)
  window.addEventListener('touchmove', onMove as EventListener, { passive: false })
  window.addEventListener('mouseup', onEnd)
  window.addEventListener('touchend', onEnd)
}

onUnmounted(() => {
  // Cleanup is handled per-drag-session above
})
</script>

<template>
  <div
    ref="containerRef"
    :class="cn(
      'flex overflow-hidden',
      direction === 'vertical' ? 'flex-col' : 'flex-row',
      isDragging ? (direction === 'horizontal' ? 'cursor-col-resize' : 'cursor-row-resize') : '',
      props.class,
    )"
  >
    <!-- Panel A -->
    <div
      :style="direction === 'horizontal' ? { width: `${size}%` } : { height: `${size}%` }"
      class="overflow-auto min-w-0 min-h-0"
    >
      <slot name="a"></slot>
    </div>

    <!-- Drag Handle -->
    <div
      role="separator"
      :aria-orientation="direction"
      :aria-valuenow="Math.round(size)"
      :aria-valuemin="props.minSize"
      :aria-valuemax="props.maxSize"
      :class="cn(
        'relative z-10 flex items-center justify-center shrink-0 select-none transition-colors',
        direction === 'horizontal'
          ? 'w-1.5 cursor-col-resize hover:bg-ds-primary/30 active:bg-ds-primary/50'
          : 'h-1.5 cursor-row-resize hover:bg-ds-primary/30 active:bg-ds-primary/50',
        isDragging ? 'bg-ds-primary/40' : 'bg-ds-border',
        props.handleClass,
      )"
      @mousedown="startDrag"
      @touchstart="startDrag"
    >
      <!-- Grip dots -->
      <div
        :class="cn(
          'flex gap-0.5',
          direction === 'horizontal' ? 'flex-col' : 'flex-row',
        )"
      >
        <div
          v-for="i in 3"
          :key="i"
          class="size-1 rounded-full bg-ds-fg-muted/50"
        ></div>
      </div>
    </div>

    <!-- Panel B -->
    <div
      class="flex-1 overflow-auto min-w-0 min-h-0"
    >
      <slot name="b"></slot>
    </div>
  </div>
</template>
