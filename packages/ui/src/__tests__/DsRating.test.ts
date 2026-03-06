import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsRating from '../runtime/components/DsRating.vue'

describe('dsRating', () => {
  it('renders with role=radiogroup', () => {
    const wrapper = mount(DsRating)
    expect(wrapper.attributes('role')).toBe('radiogroup')
  })

  it('renders 5 stars by default', () => {
    const wrapper = mount(DsRating)
    expect(wrapper.findAll('button')).toHaveLength(5)
  })

  it('renders max=3 stars', () => {
    const wrapper = mount(DsRating, { props: { max: 3 } })
    expect(wrapper.findAll('button')).toHaveLength(3)
  })

  it('emits update:modelValue when star is clicked', async () => {
    const wrapper = mount(DsRating, { props: { modelValue: 0 } })
    await wrapper.findAll('button')[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([3])
  })

  it('toggles off when same star is clicked', async () => {
    const wrapper = mount(DsRating, { props: { modelValue: 3 } })
    await wrapper.findAll('button')[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([0])
  })

  it('does not emit when readonly=true', async () => {
    const wrapper = mount(DsRating, { props: { modelValue: 3, readonly: true } })
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('does not emit when disabled=true', async () => {
    const wrapper = mount(DsRating, { props: { modelValue: 3, disabled: true } })
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size=%s without error', (size) => {
    const wrapper = mount(DsRating, { props: { size } })
    expect(wrapper.exists()).toBe(true)
  })

  it('marks pressed star with aria-pressed=true', () => {
    const wrapper = mount(DsRating, { props: { modelValue: 2 } })
    expect(wrapper.findAll('button')[1].attributes('aria-pressed')).toBe('true')
    expect(wrapper.findAll('button')[2].attributes('aria-pressed')).toBe('false')
  })
})
