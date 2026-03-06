import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsEmptyState from '../runtime/components/DsEmptyState.vue'

describe('dsEmptyState', () => {
  it('renders the required title', () => {
    const wrapper = mount(DsEmptyState, { props: { title: 'No results found' } })
    expect(wrapper.text()).toContain('No results found')
  })

  it('renders description when provided', () => {
    const wrapper = mount(DsEmptyState, {
      props: { title: 'Empty', description: 'Try adding some items.' },
    })
    expect(wrapper.text()).toContain('Try adding some items.')
  })

  it('does not render description when not provided', () => {
    const wrapper = mount(DsEmptyState, { props: { title: 'Empty' } })
    expect(wrapper.find('p + p').exists()).toBe(false)
  })

  it('renders default icon slot', () => {
    const wrapper = mount(DsEmptyState, { props: { title: 'Empty' } })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders custom icon slot', () => {
    const wrapper = mount(DsEmptyState, {
      props: { title: 'Empty' },
      slots: { icon: '<span data-testid="custom-icon">★</span>' },
    })
    expect(wrapper.find('[data-testid="custom-icon"]').exists()).toBe(true)
  })

  it('renders CTA slot when provided', () => {
    const wrapper = mount(DsEmptyState, {
      props: { title: 'Empty' },
      slots: { default: '<button>Add item</button>' },
    })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('merges custom class', () => {
    const wrapper = mount(DsEmptyState, { props: { title: 'Empty', class: 'my-empty' } })
    expect(wrapper.classes()).toContain('my-empty')
  })
})
