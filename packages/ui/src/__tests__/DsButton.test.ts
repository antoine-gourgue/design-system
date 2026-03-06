import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsButton from '../runtime/components/DsButton.vue'

describe('dsButton', () => {
  it('renders a <button> by default', () => {
    const wrapper = mount(DsButton, { slots: { default: 'Click me' } })
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.text()).toBe('Click me')
  })

  it('applies type="button" by default', () => {
    const wrapper = mount(DsButton)
    expect(wrapper.attributes('type')).toBe('button')
  })

  it('accepts type="submit"', () => {
    const wrapper = mount(DsButton, { props: { type: 'submit' } })
    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('renders as <a> when as="a"', () => {
    const wrapper = mount(DsButton, { props: { as: 'a', href: 'https://example.com' } })
    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('https://example.com')
  })

  it('sets disabled attribute when disabled=true', () => {
    const wrapper = mount(DsButton, { props: { disabled: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.attributes('aria-disabled')).toBe('true')
  })

  it('sets aria-busy and disabled when loading=true', () => {
    const wrapper = mount(DsButton, { props: { loading: true } })
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('shows spinner SVG when loading=true', () => {
    const wrapper = mount(DsButton, { props: { loading: true } })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('applies w-full when fullWidth=true', () => {
    const wrapper = mount(DsButton, { props: { fullWidth: true } })
    expect(wrapper.classes()).toContain('w-full')
  })

  it('applies !rounded-full when rounded=true', () => {
    const wrapper = mount(DsButton, { props: { rounded: true } })
    expect(wrapper.classes()).toContain('!rounded-full')
  })

  it.each([
    'primary',
    'secondary',
    'ghost',
    'destructive',
    'link',
    'outline',
  ] as const)('renders variant=%s without error', (variant) => {
    const wrapper = mount(DsButton, { props: { variant } })
    expect(wrapper.exists()).toBe(true)
  })

  it.each(['sm', 'md', 'lg', 'icon', 'icon-sm', 'icon-lg'] as const)('renders size=%s without error', (size) => {
    const wrapper = mount(DsButton, { props: { size } })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders leftIcon slot', () => {
    const wrapper = mount(DsButton, { slots: { leftIcon: '<span data-testid="left-icon" />' } })
    expect(wrapper.find('[data-testid="left-icon"]').exists()).toBe(true)
  })

  it('renders rightIcon slot', () => {
    const wrapper = mount(DsButton, { slots: { rightIcon: '<span data-testid="right-icon" />' } })
    expect(wrapper.find('[data-testid="right-icon"]').exists()).toBe(true)
  })

  it('hides leftIcon slot when loading=true', () => {
    const wrapper = mount(DsButton, {
      props: { loading: true },
      slots: { leftIcon: '<span data-testid="left-icon" />' },
    })
    expect(wrapper.find('[data-testid="left-icon"]').exists()).toBe(false)
  })

  it('merges custom class prop', () => {
    const wrapper = mount(DsButton, { props: { class: 'custom-class' } })
    expect(wrapper.classes()).toContain('custom-class')
  })
})
