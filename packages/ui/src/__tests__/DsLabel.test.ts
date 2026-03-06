import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsLabel from '../runtime/components/DsLabel.vue'

describe('dsLabel', () => {
  it('renders a <label> element', () => {
    const wrapper = mount(DsLabel)
    expect(wrapper.element.tagName).toBe('LABEL')
  })

  it('renders slot content', () => {
    const wrapper = mount(DsLabel, { slots: { default: 'Email address' } })
    expect(wrapper.text()).toContain('Email address')
  })

  it('sets for attribute', () => {
    const wrapper = mount(DsLabel, { props: { for: 'email-input' } })
    expect(wrapper.attributes('for')).toBe('email-input')
  })

  it('shows asterisk when required=true', () => {
    const wrapper = mount(DsLabel, { props: { required: true } })
    expect(wrapper.text()).toContain('*')
  })

  it('does not show asterisk when required=false', () => {
    const wrapper = mount(DsLabel, { props: { required: false } })
    expect(wrapper.find('span').exists()).toBe(false)
  })

  it('merges custom class', () => {
    const wrapper = mount(DsLabel, { props: { class: 'my-label' } })
    expect(wrapper.classes()).toContain('my-label')
  })
})
