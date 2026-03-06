<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/cn'

type DsIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | `${number}px` | `${number}rem` | `${number}em`
type DsIconTone = 'current' | 'default' | 'muted' | 'subtle' | 'primary' | 'success' | 'warning' | 'danger'

export interface DsIconProps {
  /**
   * Icon name.
   * - "user" => resolves to "lucide:user"
   * - "mdi:home" => kept as is
   */
  name: string
  /**
   * Icon size token or CSS size.
   * @default 'md'
   */
  size?: DsIconSize
  /**
   * Icon color.
   * - DS tone: "default" | "muted" | "primary" | ...
   * - Any CSS color: "#7f00ff", "rgb(127,0,255)", "var(--ds-primary)"
   * @default 'current'
   */
  color?: DsIconTone | string
  /**
   * Extra CSS classes.
   */
  class?: string
  /**
   * Accessible label when icon is not decorative.
   */
  ariaLabel?: string
  /**
   * Hide icon from assistive tech.
   * @default true
   */
  decorative?: boolean
}

const props = withDefaults(defineProps<DsIconProps>(), {
  size: 'md',
  color: 'current',
  decorative: true,
})

const resolvedName = computed(() => (
  props.name.toLowerCase().startsWith('si:')
    ? `simple-icons:${props.name.slice(3)}`
    : props.name.includes(':')
      ? props.name
      : props.name.toLowerCase().startsWith('flag-')
        ? `flagpack:${props.name.slice(5).toLowerCase()}`
        : `lucide:${props.name}`
))

const tokenSizeClass = computed(() => {
  if (typeof props.size !== 'string')
    return ''

  switch (props.size) {
    case 'xs': return 'size-3'
    case 'sm': return 'size-4'
    case 'md': return 'size-5'
    case 'lg': return 'size-6'
    case 'xl': return 'size-8'
    default: return ''
  }
})

const customSizeStyle = computed(() => {
  const style: Record<string, string> = {}

  if (typeof props.size === 'number') {
    style.width = `${props.size}px`
    style.height = `${props.size}px`
  }
  else if (typeof props.size === 'string' && !['xs', 'sm', 'md', 'lg', 'xl'].includes(props.size)) {
    style.width = props.size
    style.height = props.size
  }

  const knownTones: DsIconTone[] = ['current', 'default', 'muted', 'subtle', 'primary', 'success', 'warning', 'danger']
  if (typeof props.color === 'string' && !knownTones.includes(props.color as DsIconTone))
    style.color = props.color

  return Object.keys(style).length > 0 ? style : undefined
})

const iconRenderKey = computed(() => [
  resolvedName.value,
  props.size,
  props.color,
].join('|'))

const toneClass = computed(() => {
  switch (props.color) {
    case 'default': return 'text-ds-fg'
    case 'muted': return 'text-ds-fg-muted'
    case 'subtle': return 'text-ds-fg-subtle'
    case 'primary': return 'text-ds-primary'
    case 'success': return 'text-ds-success'
    case 'warning': return 'text-ds-warning'
    case 'danger': return 'text-ds-danger'
    default: return ''
  }
})
</script>

<template>
  <Icon
    :key="iconRenderKey"
    :name="resolvedName"
    :class="cn('inline-block shrink-0 align-middle text-current', tokenSizeClass, toneClass, props.class)"
    :style="customSizeStyle"
    :role="props.decorative ? undefined : 'img'"
    :aria-hidden="props.decorative ? true : undefined"
    :aria-label="props.decorative ? undefined : (props.ariaLabel ?? props.name)"
  />
</template>
