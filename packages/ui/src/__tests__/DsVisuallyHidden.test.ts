import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsVisuallyHidden from '../runtime/components/DsVisuallyHidden.vue'

describe('dsVisuallyHidden', () => {
  it('renders a <span> by default', () => {
    const wrapper = mount(DsVisuallyHidden)
    expect(wrapper.element.tagName).toBe('SPAN')
  })

  it('applies sr-only class', () => {
    const wrapper = mount(DsVisuallyHidden)
    expect(wrapper.classes()).toContain('sr-only')
  })

  it('renders slot content', () => {
    const wrapper = mount(DsVisuallyHidden, { slots: { default: 'hidden text' } })
    expect(wrapper.text()).toBe('hidden text')
  })

  it('renders as a different element via as prop', () => {
    const wrapper = mount(DsVisuallyHidden, { props: { as: 'div' } })
    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('merges custom class', () => {
    const wrapper = mount(DsVisuallyHidden, { props: { class: 'extra' } })
    expect(wrapper.classes()).toContain('extra')
  })
})
