/**
 * design-system-antoinegourgue — Package entry point
 *
 * Exports utilities, composables, and TypeScript types.
 * Vue components are available via the Nuxt module (auto-import)
 * or by importing from the dist/runtime path directly.
 */

// ── Module (Nuxt) ────────────────────────────────
export { default } from './module'

export type { ModuleOptions } from './module'
export type { DsBadgeSkeletonProps } from './runtime/components/DsBadgeSkeleton.vue'
// ── Component prop types (for consumers) ────────
export type { DsButtonProps } from './runtime/components/DsButton.vue'
export type { DsButtonSkeletonProps } from './runtime/components/DsButtonSkeleton.vue'
export type { DsCardSkeletonProps } from './runtime/components/DsCardSkeleton.vue'
export type { DsInputSkeletonProps } from './runtime/components/DsInputSkeleton.vue'

export type { DsTabsSkeletonProps } from './runtime/components/DsTabsSkeleton.vue'
// ── Composables ─────────────────────────────────
export { useToast } from './runtime/composables/useToast'

export type { ToastItem, ToastOptions, ToastVariant } from './runtime/composables/useToast'
// ── Utilities ───────────────────────────────────
export { cn } from './runtime/utils/cn'
