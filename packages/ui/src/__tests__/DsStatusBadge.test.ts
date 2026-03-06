import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsStatusBadge from '../runtime/components/DsStatusBadge.vue'

describe('dsStatusBadge', () => {
  it('renders with default status "online"', () => {
    const wrapper = mount(DsStatusBadge)
    expect(wrapper.text()).toContain('Online')
  })

  it.each(['online', 'offline', 'busy', 'away', 'pending'] as const)('renders status=%s with correct label', (status) => {
    const wrapper = mount(DsStatusBadge, { props: { status } })
    const label = status.charAt(0).toUpperCase() + status.slice(1)
    expect(wrapper.text()).toContain(label)
  })

  it('uses custom label when provided', () => {
    const wrapper = mount(DsStatusBadge, { props: { status: 'online', label: 'Disponible' } })
    expect(wrapper.text()).toContain('Disponible')
  })

  it('hides label when showLabel=false', () => {
    const wrapper = mount(DsStatusBadge, { props: { showLabel: false } })
    expect(wrapper.find('span.font-medium').exists()).toBe(false)
  })

  it('shows pulse animation span when pulse=true and status=online', () => {
    const wrapper = mount(DsStatusBadge, { props: { pulse: true, status: 'online' } })
    expect(wrapper.find('span.animate-ping').exists()).toBe(true)
  })

  it('does not show pulse when pulse=false', () => {
    const wrapper = mount(DsStatusBadge, { props: { pulse: false } })
    expect(wrapper.find('span.animate-ping').exists()).toBe(false)
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size=%s without error', (size) => {
    const wrapper = mount(DsStatusBadge, { props: { size } })
    expect(wrapper.exists()).toBe(true)
  })

  it('merges custom class', () => {
    const wrapper = mount(DsStatusBadge, { props: { class: 'my-status' } })
    expect(wrapper.classes()).toContain('my-status')
  })
})
