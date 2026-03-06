import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsSwitch from '../runtime/components/DsSwitch.vue'

describe('dsSwitch', () => {
  it('renders a button with role=switch', () => {
    const wrapper = mount(DsSwitch)
    expect(wrapper.find('button[role="switch"]').exists()).toBe(true)
  })

  it('sets aria-checked=false when modelValue=false', () => {
    const wrapper = mount(DsSwitch, { props: { modelValue: false } })
    expect(wrapper.find('button').attributes('aria-checked')).toBe('false')
  })

  it('sets aria-checked=true when modelValue=true', () => {
    const wrapper = mount(DsSwitch, { props: { modelValue: true } })
    expect(wrapper.find('button').attributes('aria-checked')).toBe('true')
  })

  it('emits update:modelValue with true when toggled from false', async () => {
    const wrapper = mount(DsSwitch, { props: { modelValue: false } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('emits update:modelValue with false when toggled from true', async () => {
    const wrapper = mount(DsSwitch, { props: { modelValue: true } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('does not emit when disabled', async () => {
    const wrapper = mount(DsSwitch, { props: { modelValue: false, disabled: true } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('disables the button when disabled=true', () => {
    const wrapper = mount(DsSwitch, { props: { disabled: true } })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('renders label text', () => {
    const wrapper = mount(DsSwitch, { props: { label: 'Enable feature' } })
    expect(wrapper.text()).toContain('Enable feature')
  })

  it('renders description text when label is present', () => {
    const wrapper = mount(DsSwitch, { props: { label: 'Enable feature', description: 'Feature description' } })
    expect(wrapper.text()).toContain('Feature description')
  })

  it.each(['sm', 'md'] as const)('renders size=%s without error', (size) => {
    const wrapper = mount(DsSwitch, { props: { size } })
    expect(wrapper.exists()).toBe(true)
  })

  it('applies different track width for size=sm', () => {
    const wrapper = mount(DsSwitch, { props: { size: 'sm' } })
    expect(wrapper.find('button').classes()).toContain('w-9')
  })

  it('applies wider track width for size=md', () => {
    const wrapper = mount(DsSwitch, { props: { size: 'md' } })
    expect(wrapper.find('button').classes()).toContain('w-11')
  })
})
