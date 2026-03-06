import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsToggle from '../runtime/components/DsToggle.vue'

describe('dsToggle', () => {
  it('renders a button with role=switch', () => {
    const wrapper = mount(DsToggle)
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('role')).toBe('switch')
  })

  it('sets aria-pressed to false when modelValue=false', () => {
    const wrapper = mount(DsToggle, { props: { modelValue: false } })
    expect(wrapper.attributes('aria-pressed')).toBe('false')
  })

  it('sets aria-pressed to true when modelValue=true', () => {
    const wrapper = mount(DsToggle, { props: { modelValue: true } })
    expect(wrapper.attributes('aria-pressed')).toBe('true')
  })

  it('sets data-state=on when modelValue=true', () => {
    const wrapper = mount(DsToggle, { props: { modelValue: true } })
    expect(wrapper.attributes('data-state')).toBe('on')
  })

  it('sets data-state=off when modelValue=false', () => {
    const wrapper = mount(DsToggle, { props: { modelValue: false } })
    expect(wrapper.attributes('data-state')).toBe('off')
  })

  it('emits update:modelValue with toggled value on click', async () => {
    const wrapper = mount(DsToggle, { props: { modelValue: false } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
  })

  it('emits false when modelValue=true and clicked', async () => {
    const wrapper = mount(DsToggle, { props: { modelValue: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
  })

  it('is disabled when disabled=true', () => {
    const wrapper = mount(DsToggle, { props: { disabled: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it.each(['outline', 'ghost'] as const)('renders variant=%s without error', (variant) => {
    const wrapper = mount(DsToggle, { props: { variant } })
    expect(wrapper.exists()).toBe(true)
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size=%s without error', (size) => {
    const wrapper = mount(DsToggle, { props: { size } })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount(DsToggle, { slots: { default: 'Toggle me' } })
    expect(wrapper.text()).toBe('Toggle me')
  })
})
