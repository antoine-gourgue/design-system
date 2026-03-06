import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsRadioGroup from '../runtime/components/DsRadioGroup.vue'

const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c', disabled: true },
]

describe('dsRadioGroup', () => {
  it('renders with role=radiogroup', () => {
    const wrapper = mount(DsRadioGroup, { props: { options } })
    expect(wrapper.attributes('role')).toBe('radiogroup')
  })

  it('renders all option labels', () => {
    const wrapper = mount(DsRadioGroup, { props: { options } })
    expect(wrapper.text()).toContain('Option A')
    expect(wrapper.text()).toContain('Option B')
    expect(wrapper.text()).toContain('Option C')
  })

  it('renders hidden radio inputs', () => {
    const wrapper = mount(DsRadioGroup, { props: { options } })
    const inputs = wrapper.findAll('input[type="radio"]')
    expect(inputs).toHaveLength(3)
  })

  it('marks selected option as checked', () => {
    const wrapper = mount(DsRadioGroup, { props: { options, modelValue: 'b' } })
    const inputs = wrapper.findAll('input[type="radio"]')
    expect((inputs[1].element as HTMLInputElement).checked).toBe(true)
  })

  it('emits update:modelValue when option is selected', async () => {
    const wrapper = mount(DsRadioGroup, { props: { options, modelValue: null } })
    await wrapper.findAll('input[type="radio"]')[0].trigger('change')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['a'])
  })

  it('disables specific option when option.disabled=true', () => {
    const wrapper = mount(DsRadioGroup, { props: { options } })
    const inputs = wrapper.findAll('input[type="radio"]')
    expect(inputs[2].attributes('disabled')).toBeDefined()
  })

  it('disables all options when disabled=true', () => {
    const wrapper = mount(DsRadioGroup, { props: { options, disabled: true } })
    wrapper.findAll('input[type="radio"]').forEach((input) => {
      expect(input.attributes('disabled')).toBeDefined()
    })
  })

  it.each(['vertical', 'horizontal'] as const)('renders orientation=%s without error', (orientation) => {
    const wrapper = mount(DsRadioGroup, { props: { options, orientation } })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders descriptions when provided', () => {
    const optsWithDesc = [{ label: 'Plan A', value: 'a', description: 'Best for individuals' }]
    const wrapper = mount(DsRadioGroup, { props: { options: optsWithDesc } })
    expect(wrapper.text()).toContain('Best for individuals')
  })
})
