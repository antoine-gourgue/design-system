import { describe, expect, it } from 'vitest'
import { cn } from '../runtime/utils/cn'

describe('cn', () => {
  it('merges simple class names', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1')
  })

  it('resolves Tailwind conflicts with last class winning', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
  })

  it('supports conditional object syntax', () => {
    expect(cn('base', { active: true, disabled: false })).toBe('base active')
  })
})
