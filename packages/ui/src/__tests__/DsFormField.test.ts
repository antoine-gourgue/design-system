import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsFormField from '../runtime/components/DsFormField.vue'

describe('dsFormField', () => {
  it('renders label when provided', () => {
    const wrapper = mount(DsFormField, { props: { label: 'Email' } })
    expect(wrapper.text()).toContain('Email')
  })

  it('renders description when provided', () => {
    const wrapper = mount(DsFormField, { props: { label: 'Email', description: 'We will never spam you.' } })
    expect(wrapper.text()).toContain('We will never spam you.')
  })

  it('shows required asterisk when required=true', () => {
    const wrapper = mount(DsFormField, { props: { label: 'Field', required: true } })
    expect(wrapper.text()).toContain('*')
  })

  it('shows error message when error is provided', () => {
    const wrapper = mount(DsFormField, { props: { error: 'This field is required' } })
    expect(wrapper.text()).toContain('This field is required')
  })

  it('renders error with role=alert', () => {
    const wrapper = mount(DsFormField, { props: { error: 'Invalid value' } })
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  })

  it('does not render error when error is empty', () => {
    const wrapper = mount(DsFormField)
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })

  it('renders slot content', () => {
    const wrapper = mount(DsFormField, { slots: { default: '<input data-testid="input" />' } })
    expect(wrapper.find('[data-testid="input"]').exists()).toBe(true)
  })

  it.each(['vertical', 'horizontal'] as const)('renders orientation=%s without error', (orientation) => {
    const wrapper = mount(DsFormField, { props: { orientation } })
    expect(wrapper.exists()).toBe(true)
  })
})
