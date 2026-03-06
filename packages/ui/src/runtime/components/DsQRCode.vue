<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'
import { generateQRMatrix } from '../utils/qr'

export interface DsQRCodeProps {
  value: string
  size?: number
  moduleSize?: number
  foreground?: string
  background?: string
  quiet?: number
  label?: string
  class?: string
}

const props = withDefaults(defineProps<DsQRCodeProps>(), {
  size: 200,
  moduleSize: 8,
  foreground: 'currentColor',
  background: 'transparent',
  quiet: 2,
})

const matrix = computed(() => generateQRMatrix(props.value))

// Dynamic: derive module count from the generated matrix dimensions
const modules = computed(() => matrix.value ? matrix.value.length : 21)

const svgSize = computed(() => {
  const total = modules.value + props.quiet * 2
  return total * props.moduleSize
})
</script>

<template>
  <div :class="cn('inline-flex flex-col items-center gap-2', props.class)">
    <!-- Error: text too long (> 134 bytes) -->
    <div
      v-if="!matrix"
      class="flex items-center justify-center rounded-ds-lg border border-ds-danger/30 bg-ds-danger/5 text-ds-danger text-xs p-4"
      :style="{ width: `${size}px`, height: `${size}px` }"
    >
      <span class="text-center">Text too long (max 134 bytes)</span>
    </div>

    <!-- QR SVG -->
    <svg
      v-else
      :width="size"
      :height="size"
      :viewBox="`0 0 ${svgSize} ${svgSize}`"
      :aria-label="label ?? `QR code: ${value}`"
      role="img"
      class="rounded-ds-md"
    >
      <!-- Background -->
      <rect
        v-if="background !== 'transparent'"
        x="0" y="0"
        :width="svgSize" :height="svgSize"
        :fill="background"
      />

      <!-- Modules -->
      <template v-for="(row, r) in matrix" :key="r">
        <rect
          v-for="(dark, c) in row"
          :key="c"
          :x="(c + quiet) * moduleSize"
          :y="(r + quiet) * moduleSize"
          :width="moduleSize"
          :height="moduleSize"
          :fill="dark ? foreground : 'transparent'"
        />
      </template>
    </svg>

    <!-- Label -->
    <span v-if="label && matrix" class="text-xs text-ds-fg-muted font-ds text-center max-w-full truncate">
      {{ label }}
    </span>
  </div>
</template>
