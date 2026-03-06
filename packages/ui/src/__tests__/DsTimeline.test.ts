import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsTimeline from '../runtime/components/DsTimeline.vue'

const items = [
  { title: 'Ordered', description: 'Order placed', date: 'Jan 1', status: 'done' as const },
  { title: 'Shipped', status: 'current' as const },
  { title: 'Delivered', status: 'pending' as const },
]

describe('dsTimeline', () => {
  it('renders all item titles', () => {
    const wrapper = mount(DsTimeline, { props: { items } })
    expect(wrapper.text()).toContain('Ordered')
    expect(wrapper.text()).toContain('Shipped')
    expect(wrapper.text()).toContain('Delivered')
  })

  it('renders descriptions when provided', () => {
    const wrapper = mount(DsTimeline, { props: { items } })
    expect(wrapper.text()).toContain('Order placed')
  })

  it('renders dates when provided', () => {
    const wrapper = mount(DsTimeline, { props: { items } })
    expect(wrapper.text()).toContain('Jan 1')
  })

  it('renders an ordered list', () => {
    const wrapper = mount(DsTimeline, { props: { items } })
    expect(wrapper.element.tagName).toBe('OL')
  })

  it('renders checkmark SVG for done status', () => {
    const wrapper = mount(DsTimeline, { props: { items } })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders correct number of items', () => {
    const wrapper = mount(DsTimeline, { props: { items } })
    expect(wrapper.findAll('li')).toHaveLength(3)
  })

  it('renders item without description or date', () => {
    const wrapper = mount(DsTimeline, { props: { items: [{ title: 'Step 1' }] } })
    expect(wrapper.text()).toContain('Step 1')
  })

  it('merges custom class', () => {
    const wrapper = mount(DsTimeline, { props: { items, class: 'my-timeline' } })
    expect(wrapper.classes()).toContain('my-timeline')
  })
})
