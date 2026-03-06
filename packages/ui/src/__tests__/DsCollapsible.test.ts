import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsCollapsible from '../runtime/components/DsCollapsible.vue'

describe('dsCollapsible', () => {
  it('hides content when modelValue=false', () => {
    const wrapper = mount(DsCollapsible, {
      props: { modelValue: false, title: 'Section' },
      slots: { default: '<p data-testid="content">Hidden content</p>' },
    })
    expect(wrapper.find('[data-testid="content"]').exists()).toBe(false)
  })

  it('shows content when modelValue=true', () => {
    const wrapper = mount(DsCollapsible, {
      props: { modelValue: true, title: 'Section' },
      slots: { default: '<p data-testid="content">Visible content</p>' },
    })
    expect(wrapper.find('[data-testid="content"]').exists()).toBe(true)
  })

  it('sets aria-expanded=false when closed', () => {
    const wrapper = mount(DsCollapsible, { props: { modelValue: false, title: 'Section' } })
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
  })

  it('sets aria-expanded=true when open', () => {
    const wrapper = mount(DsCollapsible, { props: { modelValue: true, title: 'Section' } })
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
  })

  it('emits update:modelValue=true when closed and trigger clicked', async () => {
    const wrapper = mount(DsCollapsible, { props: { modelValue: false, title: 'Section' } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('emits update:modelValue=false when open and trigger clicked', async () => {
    const wrapper = mount(DsCollapsible, { props: { modelValue: true, title: 'Section' } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('does not emit when disabled', async () => {
    const wrapper = mount(DsCollapsible, { props: { modelValue: false, disabled: true, title: 'Section' } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('renders title', () => {
    const wrapper = mount(DsCollapsible, { props: { title: 'My Section' } })
    expect(wrapper.text()).toContain('My Section')
  })
})
