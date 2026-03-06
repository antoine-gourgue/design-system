import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsPagination from '../runtime/components/DsPagination.vue'

describe('dsPagination', () => {
  it('renders with role=navigation', () => {
    const wrapper = mount(DsPagination, { props: { modelValue: 1, total: 100, perPage: 10 } })
    expect(wrapper.attributes('role')).toBe('navigation')
  })

  it('renders page buttons', () => {
    const wrapper = mount(DsPagination, { props: { modelValue: 1, total: 50, perPage: 10 } })
    expect(wrapper.find('[aria-label="Go to page 1"]').exists()).toBe(true)
  })

  it('marks current page with aria-current="page"', () => {
    const wrapper = mount(DsPagination, { props: { modelValue: 2, total: 50, perPage: 10 } })
    expect(wrapper.find('[aria-current="page"]').exists()).toBe(true)
  })

  it('disables previous button on first page', () => {
    const wrapper = mount(DsPagination, { props: { modelValue: 1, total: 50, perPage: 10 } })
    expect(wrapper.find('[aria-label="Go to previous page"]').attributes('disabled')).toBeDefined()
  })

  it('disables next button on last page', () => {
    const wrapper = mount(DsPagination, { props: { modelValue: 5, total: 50, perPage: 10 } })
    expect(wrapper.find('[aria-label="Go to next page"]').attributes('disabled')).toBeDefined()
  })

  it('emits update:modelValue when next is clicked', async () => {
    const wrapper = mount(DsPagination, { props: { modelValue: 1, total: 50, perPage: 10 } })
    await wrapper.find('[aria-label="Go to next page"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
  })

  it('emits update:modelValue when previous is clicked', async () => {
    const wrapper = mount(DsPagination, { props: { modelValue: 3, total: 50, perPage: 10 } })
    await wrapper.find('[aria-label="Go to previous page"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
  })

  it('emits update:modelValue when page button is clicked', async () => {
    const wrapper = mount(DsPagination, { props: { modelValue: 3, total: 50, perPage: 10 } })
    await wrapper.find('[aria-label="Go to page 2"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
  })

  it('does not emit when disabled', async () => {
    const wrapper = mount(DsPagination, { props: { modelValue: 1, total: 50, perPage: 10, disabled: true } })
    await wrapper.find('[aria-label="Go to next page"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('shows ellipsis for large page counts', () => {
    const wrapper = mount(DsPagination, { props: { modelValue: 5, total: 200, perPage: 10 } })
    expect(wrapper.text()).toContain('…')
  })
})
