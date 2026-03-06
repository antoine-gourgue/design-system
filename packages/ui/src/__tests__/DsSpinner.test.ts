import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsSpinner from '../runtime/components/DsSpinner.vue'

describe('dsSpinner', () => {
  it('renders an SVG element', () => {
    const wrapper = mount(DsSpinner)
    expect(wrapper.element.tagName).toBe('svg')
  })

  it('has role=status for accessibility', () => {
    const wrapper = mount(DsSpinner)
    expect(wrapper.attributes('role')).toBe('status')
  })

  it('has aria-hidden=true', () => {
    const wrapper = mount(DsSpinner)
    expect(wrapper.attributes('aria-hidden')).toBe('true')
  })

  it('applies size-3 for xs', () => {
    const wrapper = mount(DsSpinner, { props: { size: 'xs' } })
    expect(wrapper.classes()).toContain('size-3')
  })

  it('applies size-4 for sm', () => {
    const wrapper = mount(DsSpinner, { props: { size: 'sm' } })
    expect(wrapper.classes()).toContain('size-4')
  })

  it('applies size-5 for md (default)', () => {
    const wrapper = mount(DsSpinner, { props: { size: 'md' } })
    expect(wrapper.classes()).toContain('size-5')
  })

  it('applies size-6 for lg', () => {
    const wrapper = mount(DsSpinner, { props: { size: 'lg' } })
    expect(wrapper.classes()).toContain('size-6')
  })

  it('applies size-8 for xl', () => {
    const wrapper = mount(DsSpinner, { props: { size: 'xl' } })
    expect(wrapper.classes()).toContain('size-8')
  })

  it('has animation class', () => {
    const wrapper = mount(DsSpinner)
    expect(wrapper.classes()).toContain('animate-ds-spin')
  })

  it('merges custom class', () => {
    const wrapper = mount(DsSpinner, { props: { class: 'text-blue-500' } })
    expect(wrapper.classes()).toContain('text-blue-500')
  })
})
