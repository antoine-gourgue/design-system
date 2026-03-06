import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsSelect from '../runtime/components/DsSelect.vue'

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
]

const groupedOptions = [
  { label: 'Fruits', options: [{ label: 'Apple', value: 'apple' }] },
  { label: 'Veggies', options: [{ label: 'Carrot', value: 'carrot' }] },
]

describe('dsSelect', () => {
  it('renders a <select> element', () => {
    const wrapper = mount(DsSelect, { props: { options } })
    expect(wrapper.find('select').exists()).toBe(true)
  })

  it('renders flat options', () => {
    const wrapper = mount(DsSelect, { props: { options } })
    const rendered = wrapper.findAll('option')
    expect(rendered.some(o => o.text() === 'Apple')).toBe(true)
    expect(rendered.some(o => o.text() === 'Banana')).toBe(true)
    expect(rendered.some(o => o.text() === 'Cherry')).toBe(true)
  })

  it('renders grouped options with optgroup', () => {
    const wrapper = mount(DsSelect, { props: { options: groupedOptions } })
    expect(wrapper.findAll('optgroup')).toHaveLength(2)
  })

  it('shows a placeholder option', () => {
    const wrapper = mount(DsSelect, { props: { options, placeholder: 'Select one' } })
    expect(wrapper.find('option[value=""]').text()).toBe('Select one')
  })

  it('binds modelValue to selected option', () => {
    const wrapper = mount(DsSelect, { props: { options, modelValue: 'banana' } })
    expect((wrapper.find('select').element as HTMLSelectElement).value).toBe('banana')
  })

  it('emits update:modelValue on change', async () => {
    const wrapper = mount(DsSelect, { props: { options } })
    await wrapper.find('select').setValue('cherry')
    expect(wrapper.emitted('update:modelValue')).toBeDefined()
  })

  it('disables the select when disabled=true', () => {
    const wrapper = mount(DsSelect, { props: { options, disabled: true } })
    expect(wrapper.find('select').attributes('disabled')).toBeDefined()
  })

  it('disables individual option', () => {
    const opts = [
      { label: 'Active', value: 'active' },
      { label: 'Disabled', value: 'disabled', disabled: true },
    ]
    const wrapper = mount(DsSelect, { props: { options: opts } })
    const disabledOpt = wrapper.findAll('option').find(o => o.text() === 'Disabled')
    expect(disabledOpt?.attributes('disabled')).toBeDefined()
  })

  it('renders chevron icon SVG', () => {
    const wrapper = mount(DsSelect, { props: { options } })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size=%s without error', (size) => {
    const wrapper = mount(DsSelect, { props: { options, size } })
    expect(wrapper.exists()).toBe(true)
  })
})
