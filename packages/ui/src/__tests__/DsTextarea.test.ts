import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsTextarea from '../runtime/components/DsTextarea.vue'

describe('dsTextarea', () => {
  it('renders a <textarea> element', () => {
    const wrapper = mount(DsTextarea)
    expect(wrapper.find('textarea').exists()).toBe(true)
  })

  it('defaults to 4 rows', () => {
    const wrapper = mount(DsTextarea)
    expect(wrapper.find('textarea').attributes('rows')).toBe('4')
  })

  it('accepts custom row count', () => {
    const wrapper = mount(DsTextarea, { props: { rows: 8 } })
    expect(wrapper.find('textarea').attributes('rows')).toBe('8')
  })

  it('binds modelValue to textarea value', () => {
    const wrapper = mount(DsTextarea, { props: { modelValue: 'Hello world' } })
    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('Hello world')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(DsTextarea)
    await wrapper.find('textarea').setValue('typed text')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['typed text'])
  })

  it('emits change event', async () => {
    const wrapper = mount(DsTextarea)
    await wrapper.find('textarea').trigger('change')
    expect(wrapper.emitted('change')).toBeDefined()
  })

  it('emits blur event', async () => {
    const wrapper = mount(DsTextarea)
    await wrapper.find('textarea').trigger('blur')
    expect(wrapper.emitted('blur')).toBeDefined()
  })

  it('emits focus event', async () => {
    const wrapper = mount(DsTextarea)
    await wrapper.find('textarea').trigger('focus')
    expect(wrapper.emitted('focus')).toBeDefined()
  })

  it('sets disabled attribute', () => {
    const wrapper = mount(DsTextarea, { props: { disabled: true } })
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
  })

  it('sets readonly attribute', () => {
    const wrapper = mount(DsTextarea, { props: { readonly: true } })
    expect(wrapper.find('textarea').attributes('readonly')).toBeDefined()
  })

  it('sets aria-invalid when error=true', () => {
    const wrapper = mount(DsTextarea, { props: { error: true } })
    expect(wrapper.find('textarea').attributes('aria-invalid')).toBe('true')
  })

  it('applies resize-none class when resize=none', () => {
    const wrapper = mount(DsTextarea, { props: { resize: 'none' } })
    expect(wrapper.find('textarea').classes()).toContain('resize-none')
  })

  it('applies resize-y class when resize=vertical', () => {
    const wrapper = mount(DsTextarea, { props: { resize: 'vertical' } })
    expect(wrapper.find('textarea').classes()).toContain('resize-y')
  })
})
