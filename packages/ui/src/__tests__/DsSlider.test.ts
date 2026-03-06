import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsSlider from '../runtime/components/DsSlider.vue'

describe('dsSlider', () => {
  it('renders an input[type=range]', () => {
    const wrapper = mount(DsSlider)
    expect(wrapper.find('input[type="range"]').exists()).toBe(true)
  })

  it('binds modelValue to input value', () => {
    const wrapper = mount(DsSlider, { props: { modelValue: 75 } })
    const input = wrapper.find('input[type="range"]').element as HTMLInputElement
    expect(Number(input.value)).toBe(75)
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(DsSlider, { props: { modelValue: 50 } })
    await wrapper.find('input').setValue('80')
    expect(wrapper.emitted('update:modelValue')).toBeDefined()
  })

  it('sets min and max attributes', () => {
    const wrapper = mount(DsSlider, { props: { min: 10, max: 90 } })
    const input = wrapper.find('input')
    expect(input.attributes('min')).toBe('10')
    expect(input.attributes('max')).toBe('90')
  })

  it('sets step attribute', () => {
    const wrapper = mount(DsSlider, { props: { step: 5 } })
    expect(wrapper.find('input').attributes('step')).toBe('5')
  })

  it('disables input when disabled=true', () => {
    const wrapper = mount(DsSlider, { props: { disabled: true } })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('shows current value when showValue=true', () => {
    const wrapper = mount(DsSlider, { props: { modelValue: 42, showValue: true } })
    expect(wrapper.text()).toContain('42')
  })

  it('renders label text', () => {
    const wrapper = mount(DsSlider, { props: { label: 'Volume' } })
    expect(wrapper.text()).toContain('Volume')
  })

  it('shows min and max labels', () => {
    const wrapper = mount(DsSlider, { props: { min: 0, max: 100 } })
    const text = wrapper.text()
    expect(text).toContain('0')
    expect(text).toContain('100')
  })
})
