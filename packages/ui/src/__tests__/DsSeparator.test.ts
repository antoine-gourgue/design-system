import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsSeparator from '../runtime/components/DsSeparator.vue'

describe('dsSeparator', () => {
  it('renders a div with role=separator', () => {
    const wrapper = mount(DsSeparator)
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.attributes('role')).toBe('separator')
  })

  it('defaults to horizontal orientation', () => {
    const wrapper = mount(DsSeparator)
    expect(wrapper.attributes('aria-orientation')).toBe('horizontal')
    expect(wrapper.classes()).toContain('h-px')
    expect(wrapper.classes()).toContain('w-full')
  })

  it('uses vertical orientation when set', () => {
    const wrapper = mount(DsSeparator, { props: { orientation: 'vertical' } })
    expect(wrapper.attributes('aria-orientation')).toBe('vertical')
    expect(wrapper.classes()).toContain('h-full')
    expect(wrapper.classes()).toContain('w-px')
  })

  it('merges custom class', () => {
    const wrapper = mount(DsSeparator, { props: { class: 'my-separator' } })
    expect(wrapper.classes()).toContain('my-separator')
  })
})
