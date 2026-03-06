import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsBadge from '../runtime/components/DsBadge.vue'

describe('dsBadge', () => {
  it('renders a <span>', () => {
    const wrapper = mount(DsBadge)
    expect(wrapper.element.tagName).toBe('SPAN')
  })

  it('renders slot content', () => {
    const wrapper = mount(DsBadge, { slots: { default: 'New' } })
    expect(wrapper.text()).toContain('New')
  })

  it.each([
    'default',
    'primary',
    'success',
    'warning',
    'danger',
    'solid',
    'outline',
  ] as const)('renders variant=%s without error', (variant) => {
    const wrapper = mount(DsBadge, { props: { variant } })
    expect(wrapper.exists()).toBe(true)
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size=%s without error', (size) => {
    const wrapper = mount(DsBadge, { props: { size } })
    expect(wrapper.exists()).toBe(true)
  })

  it('shows dot indicator when dot=true', () => {
    const wrapper = mount(DsBadge, { props: { dot: true } })
    const dot = wrapper.find('span.inline-block.rounded-full')
    expect(dot.exists()).toBe(true)
  })

  it('does not show dot when dot=false', () => {
    const wrapper = mount(DsBadge, { props: { dot: false } })
    const dot = wrapper.find('span.inline-block.rounded-full')
    expect(dot.exists()).toBe(false)
  })

  it('applies !rounded-full when rounded=true', () => {
    const wrapper = mount(DsBadge, { props: { rounded: true } })
    expect(wrapper.classes()).toContain('!rounded-full')
  })

  it('renders icon slot', () => {
    const wrapper = mount(DsBadge, { slots: { icon: '<svg data-testid="icon" />' } })
    expect(wrapper.find('[data-testid="icon"]').exists()).toBe(true)
  })

  it('merges custom class', () => {
    const wrapper = mount(DsBadge, { props: { class: 'my-badge' } })
    expect(wrapper.classes()).toContain('my-badge')
  })
})
