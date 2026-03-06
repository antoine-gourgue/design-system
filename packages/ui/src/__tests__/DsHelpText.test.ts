import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsHelpText from '../runtime/components/DsHelpText.vue'

describe('dsHelpText', () => {
  it('renders a <p> element', () => {
    const wrapper = mount(DsHelpText)
    expect(wrapper.element.tagName).toBe('P')
  })

  it('renders slot content', () => {
    const wrapper = mount(DsHelpText, { slots: { default: 'Must be at least 8 characters' } })
    expect(wrapper.text()).toBe('Must be at least 8 characters')
  })

  it('has role=alert when error=true', () => {
    const wrapper = mount(DsHelpText, { props: { error: true } })
    expect(wrapper.attributes('role')).toBe('alert')
  })

  it('does not have role=alert when error=false', () => {
    const wrapper = mount(DsHelpText, { props: { error: false } })
    expect(wrapper.attributes('role')).toBeUndefined()
  })

  it('sets id attribute when provided', () => {
    const wrapper = mount(DsHelpText, { props: { id: 'help-text-1' } })
    expect(wrapper.attributes('id')).toBe('help-text-1')
  })

  it('merges custom class', () => {
    const wrapper = mount(DsHelpText, { props: { class: 'my-help' } })
    expect(wrapper.classes()).toContain('my-help')
  })
})
