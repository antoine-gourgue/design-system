import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsCard from '../runtime/components/DsCard.vue'
import DsCardContent from '../runtime/components/DsCardContent.vue'
import DsCardFooter from '../runtime/components/DsCardFooter.vue'
import DsCardHeader from '../runtime/components/DsCardHeader.vue'

describe('dsCard', () => {
  it('renders a div', () => {
    const wrapper = mount(DsCard)
    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('renders slot content', () => {
    const wrapper = mount(DsCard, { slots: { default: '<p>Card body</p>' } })
    expect(wrapper.text()).toBe('Card body')
  })

  it.each(['none', 'sm', 'md', 'lg'] as const)('renders shadow=%s without error', (shadow) => {
    const wrapper = mount(DsCard, { props: { shadow } })
    expect(wrapper.exists()).toBe(true)
  })

  it.each(['sm', 'md', 'lg', 'xl'] as const)('renders radius=%s without error', (radius) => {
    const wrapper = mount(DsCard, { props: { radius } })
    expect(wrapper.exists()).toBe(true)
  })

  it('applies cursor-pointer when hoverable=true', () => {
    const wrapper = mount(DsCard, { props: { hoverable: true } })
    expect(wrapper.classes()).toContain('cursor-pointer')
  })

  it.each(['none', 'sm', 'md', 'lg'] as const)('renders padding=%s without error', (padding) => {
    const wrapper = mount(DsCard, { props: { padding } })
    expect(wrapper.exists()).toBe(true)
  })

  it('merges custom class', () => {
    const wrapper = mount(DsCard, { props: { class: 'my-card' } })
    expect(wrapper.classes()).toContain('my-card')
  })
})

describe('dsCardHeader', () => {
  it('renders slot content', () => {
    const wrapper = mount(DsCardHeader, { slots: { default: 'Header' } })
    expect(wrapper.text()).toBe('Header')
  })
})

describe('dsCardContent', () => {
  it('renders slot content', () => {
    const wrapper = mount(DsCardContent, { slots: { default: 'Content' } })
    expect(wrapper.text()).toBe('Content')
  })
})

describe('dsCardFooter', () => {
  it('renders slot content', () => {
    const wrapper = mount(DsCardFooter, { slots: { default: 'Footer' } })
    expect(wrapper.text()).toBe('Footer')
  })
})
