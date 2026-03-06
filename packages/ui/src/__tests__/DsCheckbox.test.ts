import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsCheckbox from '../runtime/components/DsCheckbox.vue'

describe('dsCheckbox', () => {
  it('renders a hidden checkbox input', () => {
    const wrapper = mount(DsCheckbox)
    const input = wrapper.find('input[type="checkbox"]')
    expect(input.exists()).toBe(true)
    expect(input.classes()).toContain('sr-only')
  })

  it('is unchecked by default', () => {
    const wrapper = mount(DsCheckbox, { props: { modelValue: false } })
    const input = wrapper.find('input[type="checkbox"]')
    expect((input.element as HTMLInputElement).checked).toBe(false)
  })

  it('is checked when modelValue=true', () => {
    const wrapper = mount(DsCheckbox, { props: { modelValue: true } })
    const input = wrapper.find('input[type="checkbox"]')
    expect((input.element as HTMLInputElement).checked).toBe(true)
  })

  it('emits update:modelValue when changed', async () => {
    const wrapper = mount(DsCheckbox, { props: { modelValue: false } })
    await wrapper.find('input').setValue(true)
    expect(wrapper.emitted('update:modelValue')).toBeDefined()
  })

  it('shows checkmark SVG when checked', () => {
    const wrapper = mount(DsCheckbox, { props: { modelValue: true } })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('shows indeterminate indicator when modelValue="indeterminate"', () => {
    const wrapper = mount(DsCheckbox, { props: { modelValue: 'indeterminate' } })
    expect(wrapper.find('span.bg-white').exists()).toBe(true)
  })

  it('sets aria-checked="mixed" for indeterminate', () => {
    const wrapper = mount(DsCheckbox, { props: { modelValue: 'indeterminate', id: 'chk' } })
    expect(wrapper.find('label').attributes('aria-checked')).toBe('mixed')
  })

  it('disables input when disabled=true', () => {
    const wrapper = mount(DsCheckbox, { props: { disabled: true } })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('renders label text', () => {
    const wrapper = mount(DsCheckbox, { props: { label: 'Accept terms' } })
    expect(wrapper.text()).toContain('Accept terms')
  })

  it('renders description text when label is present', () => {
    const wrapper = mount(DsCheckbox, { props: { label: 'Terms', description: 'A helpful note' } })
    expect(wrapper.text()).toContain('A helpful note')
  })

  it('renders default slot content', () => {
    const wrapper = mount(DsCheckbox, { slots: { default: '<span data-testid="help">Help</span>' } })
    expect(wrapper.find('[data-testid="help"]').exists()).toBe(true)
  })
})
