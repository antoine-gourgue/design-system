import { describe, expect, it } from 'vitest'
import { resolveDsIconName } from '../runtime/utils/icon'

describe('resolveDsIconName', () => {
  it('uses lucide as default collection', () => {
    expect(resolveDsIconName('user')).toBe('lucide:user')
  })

  it('maps flag shorthand to flagpack', () => {
    expect(resolveDsIconName('flag-fr')).toBe('flagpack:fr')
  })

  it('maps simple-icons shorthand', () => {
    expect(resolveDsIconName('si:github')).toBe('simple-icons:github')
  })

  it('keeps already prefixed names', () => {
    expect(resolveDsIconName('devicon:vuejs')).toBe('devicon:vuejs')
  })
})
