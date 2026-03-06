import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsAvatarGroup from '../runtime/components/DsAvatarGroup.vue'

const items = [
  { alt: 'Alice', initials: 'AL' },
  { alt: 'Bob', initials: 'BO' },
  { alt: 'Charlie', initials: 'CH' },
  { alt: 'Diana', initials: 'DI' },
  { alt: 'Eve', initials: 'EV' },
]

describe('dsAvatarGroup', () => {
  it('renders visible avatars up to max', () => {
    const wrapper = mount(DsAvatarGroup, { props: { items, max: 3 } })
    expect(wrapper.text()).toContain('AL')
    expect(wrapper.text()).toContain('BO')
    expect(wrapper.text()).toContain('CH')
  })

  it('shows overflow count when items exceed max', () => {
    const wrapper = mount(DsAvatarGroup, { props: { items, max: 3 } })
    expect(wrapper.text()).toContain('+2')
  })

  it('does not show overflow when items <= max', () => {
    const wrapper = mount(DsAvatarGroup, { props: { items: items.slice(0, 2), max: 4 } })
    expect(wrapper.text()).not.toContain('+')
  })

  it('uses ? for item without initials or alt', () => {
    const wrapper = mount(DsAvatarGroup, { props: { items: [{}] } })
    expect(wrapper.text()).toContain('?')
  })

  it.each(['xs', 'sm', 'md', 'lg'] as const)('renders size=%s without error', (size) => {
    const wrapper = mount(DsAvatarGroup, { props: { items: items.slice(0, 2), size } })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders img when src is provided', () => {
    const wrapper = mount(DsAvatarGroup, { props: { items: [{ src: '/img.png', alt: 'User' }] } })
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toBe('/img.png')
  })
})
