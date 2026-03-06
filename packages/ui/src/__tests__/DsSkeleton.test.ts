import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsSkeleton from '../runtime/components/DsSkeleton.vue'

describe('dsSkeleton', () => {
  it('renders a div with aria-hidden=true', () => {
    const wrapper = mount(DsSkeleton)
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.attributes('aria-hidden')).toBe('true')
    expect(wrapper.attributes('role')).toBe('presentation')
  })

  it.each(['rectangle', 'rounded', 'circle', 'pill', 'text'] as const)('renders shape=%s without error', (shape) => {
    const wrapper = mount(DsSkeleton, { props: { shape } })
    expect(wrapper.exists()).toBe(true)
  })

  it('applies !rounded-full for circle shape', () => {
    const wrapper = mount(DsSkeleton, { props: { shape: 'circle' } })
    expect(wrapper.classes()).toContain('!rounded-full')
  })

  it('applies numeric width as px style', () => {
    const wrapper = mount(DsSkeleton, { props: { width: 200 } })
    expect(wrapper.attributes('style')).toContain('width: 200px')
  })

  it('applies string width directly', () => {
    const wrapper = mount(DsSkeleton, { props: { width: '100%' } })
    expect(wrapper.attributes('style')).toContain('width: 100%')
  })

  it('applies numeric height as px style', () => {
    const wrapper = mount(DsSkeleton, { props: { height: 50 } })
    expect(wrapper.attributes('style')).toContain('height: 50px')
  })

  it('applies string height directly', () => {
    const wrapper = mount(DsSkeleton, { props: { height: '2rem' } })
    expect(wrapper.attributes('style')).toContain('height: 2rem')
  })

  it('merges custom class', () => {
    const wrapper = mount(DsSkeleton, { props: { class: 'my-skeleton' } })
    expect(wrapper.classes()).toContain('my-skeleton')
  })
})
