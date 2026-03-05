import { ref, readonly } from 'vue'

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info'

export interface ToastItem {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
  dismissible?: boolean
}

export interface ToastOptions {
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
  dismissible?: boolean
}

/* ── Singleton state (shared across all usages) ── */
const toasts = ref<ToastItem[]>([])

let _id = 0

function generateId(): string {
  return `toast-${++_id}-${Date.now()}`
}

/**
 * useToast — composable to push and dismiss toasts.
 *
 * @example
 * const { toast } = useToast()
 * toast({ title: 'Saved!', variant: 'success' })
 */
export function useToast() {
  function toast(options: ToastOptions): string {
    const id = generateId()
    const item: ToastItem = {
      id,
      title: options.title,
      description: options.description,
      variant: options.variant ?? 'default',
      duration: options.duration ?? 4000,
      dismissible: options.dismissible ?? true,
    }

    toasts.value.push(item)

    if (item.duration && item.duration > 0) {
      setTimeout(() => dismiss(id), item.duration)
    }

    return id
  }

  function dismiss(id: string): void {
    const idx = toasts.value.findIndex((t) => t.id === id)
    if (idx !== -1) toasts.value.splice(idx, 1)
  }

  function dismissAll(): void {
    toasts.value = []
  }

  return {
    toasts: readonly(toasts),
    toast,
    dismiss,
    dismissAll,
  }
}
