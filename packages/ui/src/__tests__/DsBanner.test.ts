import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsBanner from '../runtime/components/DsBanner.vue'

describe('dsBanner', () => {
  it('renders with role=alert', () => {
    const wrapper = mount(DsBanner)
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount(DsBanner, { slots: { default: 'Important notice!' } })
    expect(wrapper.text()).toContain('Important notice!')
  })

  it.each(['default', 'info', 'success', 'warning', 'danger'] as const)('renders variant=%s without error', (variant) => {
    const wrapper = mount(DsBanner, { props: { variant } })
    expect(wrapper.exists()).toBe(true)
  })

  it('shows dismiss button when dismissible=true', () => {
    const wrapper = mount(DsBanner, { props: { dismissible: true } })
    expect(wrapper.find('[aria-label="Dismiss"]').exists()).toBe(true)
  })

  it('hides dismiss button when dismissible=false', () => {
    const wrapper = mount(DsBanner, { props: { dismissible: false } })
    expect(wrapper.find('[aria-label="Dismiss"]').exists()).toBe(false)
  })

  it('hides banner after dismiss button is clicked', async () => {
    const wrapper = mount(DsBanner, { props: { dismissible: true } })
    await wrapper.find('[aria-label="Dismiss"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })

  it('renders an icon SVG', () => {
    const wrapper = mount(DsBanner)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('merges custom class', () => {
    const wrapper = mount(DsBanner, { props: { class: 'my-banner' } })
    expect(wrapper.find('[role="alert"]').classes()).toContain('my-banner')
  })
})
