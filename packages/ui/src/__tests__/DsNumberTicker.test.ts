import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsNumberTicker from '../runtime/components/DsNumberTicker.vue'

describe('dsNumberTicker', () => {
  it('renders a span', () => {
    const wrapper = mount(DsNumberTicker, { props: { value: 100 } })
    expect(wrapper.element.tagName).toBe('SPAN')
  })

  it('eventually shows the target value', async () => {
    const wrapper = mount(DsNumberTicker, { props: { value: 42, duration: 0 } })
    await new Promise(r => setTimeout(r, 50))
    expect(wrapper.text()).toContain('42')
  })

  it('renders prefix when provided', () => {
    const wrapper = mount(DsNumberTicker, { props: { value: 100, prefix: '$' } })
    expect(wrapper.text()).toContain('$')
  })

  it('renders suffix when provided', () => {
    const wrapper = mount(DsNumberTicker, { props: { value: 100, suffix: '%' } })
    expect(wrapper.text()).toContain('%')
  })

  it('shows decimal places when decimals > 0', async () => {
    const wrapper = mount(DsNumberTicker, { props: { value: 42.5, decimals: 1, duration: 0 } })
    await new Promise(r => setTimeout(r, 50))
    expect(wrapper.text()).toContain('42.5')
  })

  it.each(['linear', 'ease-out', 'ease-in-out'] as const)('renders easing=%s without error', (easing) => {
    const wrapper = mount(DsNumberTicker, { props: { value: 100, easing } })
    expect(wrapper.exists()).toBe(true)
  })

  it('merges custom class', () => {
    const wrapper = mount(DsNumberTicker, { props: { value: 0, class: 'my-ticker' } })
    expect(wrapper.classes()).toContain('my-ticker')
  })
})
