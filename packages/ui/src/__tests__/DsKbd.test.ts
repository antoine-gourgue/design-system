import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsKbd from '../runtime/components/DsKbd.vue'

describe('dsKbd', () => {
  it('renders a <kbd> element', () => {
    const wrapper = mount(DsKbd)
    expect(wrapper.element.tagName).toBe('KBD')
  })

  it('renders slot content', () => {
    const wrapper = mount(DsKbd, { slots: { default: '⌘K' } })
    expect(wrapper.text()).toBe('⌘K')
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size=%s without error', (size) => {
    const wrapper = mount(DsKbd, { props: { size } })
    expect(wrapper.exists()).toBe(true)
  })

  it('applies font-mono class', () => {
    const wrapper = mount(DsKbd)
    expect(wrapper.classes()).toContain('font-mono')
  })

  it('merges custom class', () => {
    const wrapper = mount(DsKbd, { props: { class: 'my-kbd' } })
    expect(wrapper.classes()).toContain('my-kbd')
  })
})
