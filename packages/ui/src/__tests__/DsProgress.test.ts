import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsProgress from '../runtime/components/DsProgress.vue'

describe('dsProgress', () => {
  it('renders a progressbar element', () => {
    const wrapper = mount(DsProgress)
    expect(wrapper.find('[role="progressbar"]').exists()).toBe(true)
  })

  it('sets aria-valuenow to the value prop', () => {
    const wrapper = mount(DsProgress, { props: { value: 42 } })
    expect(wrapper.find('[role="progressbar"]').attributes('aria-valuenow')).toBe('42')
  })

  it('sets aria-valuemin to 0', () => {
    const wrapper = mount(DsProgress, { props: { value: 50 } })
    expect(wrapper.find('[role="progressbar"]').attributes('aria-valuemin')).toBe('0')
  })

  it('sets aria-valuemax to max prop', () => {
    const wrapper = mount(DsProgress, { props: { value: 50, max: 200 } })
    expect(wrapper.find('[role="progressbar"]').attributes('aria-valuemax')).toBe('200')
  })

  it('fills bar to correct percentage', () => {
    const wrapper = mount(DsProgress, { props: { value: 75, max: 100 } })
    const bar = wrapper.find('[role="progressbar"] > div')
    expect(bar.attributes('style')).toContain('width: 75%')
  })

  it('clamps percentage to 100% when value > max', () => {
    const wrapper = mount(DsProgress, { props: { value: 150, max: 100 } })
    const bar = wrapper.find('[role="progressbar"] > div')
    expect(bar.attributes('style')).toContain('width: 100%')
  })

  it('clamps percentage to 0% when value is negative', () => {
    const wrapper = mount(DsProgress, { props: { value: -10 } })
    const bar = wrapper.find('[role="progressbar"] > div')
    expect(bar.attributes('style')).toContain('width: 0%')
  })

  it('shows label text when provided', () => {
    const wrapper = mount(DsProgress, { props: { label: 'Upload progress' } })
    expect(wrapper.text()).toContain('Upload progress')
  })

  it('shows percentage value when showValue=true', () => {
    const wrapper = mount(DsProgress, { props: { value: 60, showValue: true } })
    expect(wrapper.text()).toContain('60%')
  })

  it('does not show percentage when showValue=false', () => {
    const wrapper = mount(DsProgress, { props: { value: 60, showValue: false } })
    expect(wrapper.text()).not.toContain('%')
  })

  it.each(['xs', 'sm', 'md', 'lg'] as const)('renders size=%s without error', (size) => {
    const wrapper = mount(DsProgress, { props: { size } })
    expect(wrapper.exists()).toBe(true)
  })

  it.each(['primary', 'success', 'warning', 'danger'] as const)('renders variant=%s without error', (variant) => {
    const wrapper = mount(DsProgress, { props: { variant } })
    expect(wrapper.exists()).toBe(true)
  })
})
