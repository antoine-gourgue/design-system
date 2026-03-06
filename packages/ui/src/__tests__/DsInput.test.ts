import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsInput from '../runtime/components/DsInput.vue'

describe('dsInput', () => {
  it('renders an <input> element', () => {
    const wrapper = mount(DsInput)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('uses type="text" by default', () => {
    const wrapper = mount(DsInput)
    expect(wrapper.find('input').attributes('type')).toBe('text')
  })

  it('binds modelValue to the input value', () => {
    const wrapper = mount(DsInput, { props: { modelValue: 'hello' } })
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('hello')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(DsInput)
    const input = wrapper.find('input')
    await input.setValue('new value')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value'])
  })

  it('emits change on change event', async () => {
    const wrapper = mount(DsInput)
    const input = wrapper.find('input')
    await input.trigger('change')
    expect(wrapper.emitted('change')).toBeDefined()
  })

  it('emits blur on blur event', async () => {
    const wrapper = mount(DsInput)
    await wrapper.find('input').trigger('blur')
    expect(wrapper.emitted('blur')).toBeDefined()
  })

  it('emits focus on focus event', async () => {
    const wrapper = mount(DsInput)
    await wrapper.find('input').trigger('focus')
    expect(wrapper.emitted('focus')).toBeDefined()
  })

  it('sets placeholder', () => {
    const wrapper = mount(DsInput, { props: { placeholder: 'Enter text' } })
    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter text')
  })

  it('sets disabled attribute on input', () => {
    const wrapper = mount(DsInput, { props: { disabled: true } })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('sets readonly attribute on input', () => {
    const wrapper = mount(DsInput, { props: { readonly: true } })
    expect(wrapper.find('input').attributes('readonly')).toBeDefined()
  })

  it('sets aria-invalid on input when error=true', () => {
    const wrapper = mount(DsInput, { props: { error: true } })
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
  })

  it('does not set aria-invalid when error=false', () => {
    const wrapper = mount(DsInput, { props: { error: false } })
    expect(wrapper.find('input').attributes('aria-invalid')).toBeUndefined()
  })

  it('sets maxlength attribute', () => {
    const wrapper = mount(DsInput, { props: { maxlength: 100 } })
    expect(wrapper.find('input').attributes('maxlength')).toBe('100')
  })

  it('renders leading slot', () => {
    const wrapper = mount(DsInput, { slots: { leading: '<span data-testid="leading" />' } })
    expect(wrapper.find('[data-testid="leading"]').exists()).toBe(true)
  })

  it('renders trailing slot', () => {
    const wrapper = mount(DsInput, { slots: { trailing: '<span data-testid="trailing" />' } })
    expect(wrapper.find('[data-testid="trailing"]').exists()).toBe(true)
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size=%s without error', (size) => {
    const wrapper = mount(DsInput, { props: { size } })
    expect(wrapper.exists()).toBe(true)
  })
})
