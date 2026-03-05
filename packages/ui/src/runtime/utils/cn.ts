import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * cn — Merge Tailwind CSS classes with conflict resolution.
 * Combines clsx (conditional classes) + tailwind-merge (deduplication).
 *
 * @example
 * cn('px-2 py-1', 'px-4')         // → 'py-1 px-4'
 * cn('text-red-500', props.class)  // → merges correctly
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
