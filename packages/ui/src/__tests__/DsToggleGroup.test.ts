import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsToggleGroup from '../runtime/components/DsToggleGroup.vue'

const items = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
]

describe('dsToggleGroup', () => {
  it('renders a group container', () => {
    const wrapper = mount(DsToggleGroup, { props: { items } })
    expect(wrapper.attributes('role')).toBe('group')
  })

  it('renders one button per item', () => {
    const wrapper = mount(DsToggleGroup, { props: { items } })
    expect(wrapper.findAll('button')).toHaveLength(3)
  })

  it('shows labels', () => {
    const wrapper = mount(DsToggleGroup, { props: { items } })
    expect(wrapper.text()).toContain('Option A')
    expect(wrapper.text()).toContain('Option B')
    expect(wrapper.text()).toContain('Option C')
  })

  it('marks active item with aria-pressed=true (single mode)', () => {
    const wrapper = mount(DsToggleGroup, { props: { items, modelValue: 'a' } })
    const buttons = wrapper.findAll('button')
    expect(buttons[0].attributes('aria-pressed')).toBe('true')
    expect(buttons[1].attributes('aria-pressed')).toBe('false')
  })

  it('emits empty string when active item is clicked (single mode)', async () => {
    const wrapper = mount(DsToggleGroup, { props: { items, modelValue: 'a', type: 'single' } })
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
  })

  it('emits selected value when inactive item is clicked (single mode)', async () => {
    const wrapper = mount(DsToggleGroup, { props: { items, modelValue: '', type: 'single' } })
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b'])
  })

  it('emits array when multiple mode', async () => {
    const wrapper = mount(DsToggleGroup, { props: { items, modelValue: ['a'], type: 'multiple' } })
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['a', 'b']])
  })

  it('removes item from array when already selected (multiple mode)', async () => {
    const wrapper = mount(DsToggleGroup, { props: { items, modelValue: ['a', 'b'], type: 'multiple' } })
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['b']])
  })

  it('disables all buttons when disabled=true', () => {
    const wrapper = mount(DsToggleGroup, { props: { items, disabled: true } })
    wrapper.findAll('button').forEach((btn) => {
      expect(btn.attributes('disabled')).toBeDefined()
    })
  })

  it('disables individual item when item.disabled=true', () => {
    const itemsWithDisabled = [
      { value: 'a', label: 'A', disabled: true },
      { value: 'b', label: 'B' },
    ]
    const wrapper = mount(DsToggleGroup, { props: { items: itemsWithDisabled } })
    const buttons = wrapper.findAll('button')
    expect(buttons[0].attributes('disabled')).toBeDefined()
    expect(buttons[1].attributes('disabled')).toBeUndefined()
  })
})
