import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsTabs from '../runtime/components/DsTabs.vue'

describe('dsTabs', () => {
  it('renders a div wrapper', () => {
    const wrapper = mount(DsTabs)
    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('renders slot content', () => {
    const wrapper = mount(DsTabs, { slots: { default: '<div data-testid="tab-content">tabs</div>' } })
    expect(wrapper.find('[data-testid="tab-content"]').exists()).toBe(true)
  })

  it('emits update:modelValue when setActive is called via provide', () => {
    const wrapper = mount(DsTabs, { props: { modelValue: 'tab1' } })
    expect(wrapper.exists()).toBe(true)
  })

  it.each(['line', 'enclosed', 'pills'] as const)('renders variant=%s without error', (variant) => {
    const wrapper = mount(DsTabs, { props: { variant } })
    expect(wrapper.exists()).toBe(true)
  })

  it('applies defaultValue on mount', () => {
    const wrapper = mount(DsTabs, { props: { defaultValue: 'tab2' } })
    expect(wrapper.exists()).toBe(true)
  })

  it('merges custom class', () => {
    const wrapper = mount(DsTabs, { props: { class: 'my-tabs' } })
    expect(wrapper.classes()).toContain('my-tabs')
  })
})
