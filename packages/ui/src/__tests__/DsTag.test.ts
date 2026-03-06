import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsTag from '../runtime/components/DsTag.vue'

describe('dsTag', () => {
  it('renders a <span>', () => {
    const wrapper = mount(DsTag)
    expect(wrapper.element.tagName).toBe('SPAN')
  })

  it('renders slot content', () => {
    const wrapper = mount(DsTag, { slots: { default: 'JavaScript' } })
    expect(wrapper.text()).toContain('JavaScript')
  })

  it.each(['default', 'primary', 'success', 'danger', 'warning', 'info'] as const)('renders variant=%s without error', (variant) => {
    const wrapper = mount(DsTag, { props: { variant } })
    expect(wrapper.exists()).toBe(true)
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size=%s without error', (size) => {
    const wrapper = mount(DsTag, { props: { size } })
    expect(wrapper.exists()).toBe(true)
  })

  it('shows remove button when removable=true', () => {
    const wrapper = mount(DsTag, { props: { removable: true } })
    expect(wrapper.find('button[aria-label="Remove"]').exists()).toBe(true)
  })

  it('does not show remove button when removable=false', () => {
    const wrapper = mount(DsTag, { props: { removable: false } })
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('does not show remove button when disabled=true', () => {
    const wrapper = mount(DsTag, { props: { removable: true, disabled: true } })
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('emits remove event when remove button is clicked', async () => {
    const wrapper = mount(DsTag, { props: { removable: true } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('remove')).toBeDefined()
  })

  it('merges custom class', () => {
    const wrapper = mount(DsTag, { props: { class: 'my-tag' } })
    expect(wrapper.classes()).toContain('my-tag')
  })
})
