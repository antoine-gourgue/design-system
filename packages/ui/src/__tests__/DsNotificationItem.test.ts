import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsNotificationItem from '../runtime/components/DsNotificationItem.vue'

describe('dsNotificationItem', () => {
  it('renders with role=listitem', () => {
    const wrapper = mount(DsNotificationItem)
    expect(wrapper.attributes('role')).toBe('listitem')
  })

  it('renders title when provided', () => {
    const wrapper = mount(DsNotificationItem, { props: { title: 'New message' } })
    expect(wrapper.text()).toContain('New message')
  })

  it('renders description when provided', () => {
    const wrapper = mount(DsNotificationItem, { props: { description: 'You have a new message' } })
    expect(wrapper.text()).toContain('You have a new message')
  })

  it('renders time when provided', () => {
    const wrapper = mount(DsNotificationItem, { props: { time: '2 min ago' } })
    expect(wrapper.text()).toContain('2 min ago')
  })

  it('shows unread indicator when read=false', () => {
    const wrapper = mount(DsNotificationItem, { props: { read: false } })
    expect(wrapper.find('.bg-ds-primary.rounded-full').exists()).toBe(true)
  })

  it('hides unread indicator when read=true', () => {
    const wrapper = mount(DsNotificationItem, { props: { read: true } })
    const dots = wrapper.findAll('.bg-ds-primary.rounded-full')
    expect(dots.length).toBe(0)
  })

  it('renders dismiss button', () => {
    const wrapper = mount(DsNotificationItem)
    expect(wrapper.find('[aria-label="Dismiss notification"]').exists()).toBe(true)
  })

  it('emits click when container is clicked', async () => {
    const wrapper = mount(DsNotificationItem)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeDefined()
  })

  it('emits dismiss when dismiss button is clicked', async () => {
    const wrapper = mount(DsNotificationItem)
    await wrapper.find('[aria-label="Dismiss notification"]').trigger('click')
    expect(wrapper.emitted('dismiss')).toBeDefined()
  })

  it('renders avatar initials when no src', () => {
    const wrapper = mount(DsNotificationItem, { props: { avatarInitials: 'AB' } })
    expect(wrapper.text()).toContain('AB')
  })
})
