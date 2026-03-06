import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsAlert from '../runtime/components/DsAlert.vue'

describe('dsAlert', () => {
  it('renders with role=alert', () => {
    const wrapper = mount(DsAlert)
    expect(wrapper.attributes('role')).toBe('alert')
  })

  it('renders slot content', () => {
    const wrapper = mount(DsAlert, { slots: { default: 'Something went wrong' } })
    expect(wrapper.text()).toContain('Something went wrong')
  })

  it('renders title when provided', () => {
    const wrapper = mount(DsAlert, { props: { title: 'Error occurred' } })
    expect(wrapper.text()).toContain('Error occurred')
  })

  it('does not render title element when not provided', () => {
    const wrapper = mount(DsAlert)
    expect(wrapper.find('p').exists()).toBe(false)
  })

  it.each([
    'default',
    'info',
    'success',
    'warning',
    'destructive',
  ] as const)('renders variant=%s without error', (variant) => {
    const wrapper = mount(DsAlert, { props: { variant } })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders an icon SVG', () => {
    const wrapper = mount(DsAlert)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('merges custom class', () => {
    const wrapper = mount(DsAlert, { props: { class: 'my-alert' } })
    expect(wrapper.classes()).toContain('my-alert')
  })
})
