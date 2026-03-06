import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsNumberInput from '../runtime/components/DsNumberInput.vue'

describe('dsNumberInput', () => {
  it('renders increment and decrement buttons', () => {
    const wrapper = mount(DsNumberInput)
    expect(wrapper.find('[aria-label="Increase"]').exists()).toBe(true)
    expect(wrapper.find('[aria-label="Decrease"]').exists()).toBe(true)
  })

  it('renders a number input', () => {
    const wrapper = mount(DsNumberInput)
    expect(wrapper.find('input[type="number"]').exists()).toBe(true)
  })

  it('binds modelValue to input', () => {
    const wrapper = mount(DsNumberInput, { props: { modelValue: 5 } })
    const input = wrapper.find('input').element as HTMLInputElement
    expect(Number(input.value)).toBe(5)
  })

  it('emits increment on + button click', async () => {
    const wrapper = mount(DsNumberInput, { props: { modelValue: 5, step: 1 } })
    await wrapper.find('[aria-label="Increase"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([6])
  })

  it('emits decrement on - button click', async () => {
    const wrapper = mount(DsNumberInput, { props: { modelValue: 5, step: 1 } })
    await wrapper.find('[aria-label="Decrease"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([4])
  })

  it('disables decrement when at min', () => {
    const wrapper = mount(DsNumberInput, { props: { modelValue: 0, min: 0 } })
    expect(wrapper.find('[aria-label="Decrease"]').attributes('disabled')).toBeDefined()
  })

  it('disables increment when at max', () => {
    const wrapper = mount(DsNumberInput, { props: { modelValue: 10, max: 10 } })
    expect(wrapper.find('[aria-label="Increase"]').attributes('disabled')).toBeDefined()
  })

  it('disables all when disabled=true', () => {
    const wrapper = mount(DsNumberInput, { props: { disabled: true } })
    expect(wrapper.find('[aria-label="Increase"]').attributes('disabled')).toBeDefined()
    expect(wrapper.find('[aria-label="Decrease"]').attributes('disabled')).toBeDefined()
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('clamps value to min on decrement', async () => {
    const wrapper = mount(DsNumberInput, { props: { modelValue: 1, min: 0, step: 5 } })
    await wrapper.find('[aria-label="Decrease"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([0])
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size=%s without error', (size) => {
    const wrapper = mount(DsNumberInput, { props: { size } })
    expect(wrapper.exists()).toBe(true)
  })
})
