import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsAvatar from '../runtime/components/DsAvatar.vue'

describe('dsAvatar', () => {
  it('renders an img when src is provided', () => {
    const wrapper = mount(DsAvatar, { props: { src: 'https://example.com/avatar.png', alt: 'User' } })
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toBe('https://example.com/avatar.png')
  })

  it('shows fallback initials when no src', () => {
    const wrapper = mount(DsAvatar, { props: { fallback: 'John Doe' } })
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.text()).toBe('JD')
  })

  it('uses first two chars of single-word fallback', () => {
    const wrapper = mount(DsAvatar, { props: { fallback: 'Alice' } })
    expect(wrapper.text()).toBe('AL')
  })

  it('shows "?" when no src and no fallback', () => {
    const wrapper = mount(DsAvatar)
    expect(wrapper.text()).toBe('?')
  })

  it('shows fallback when image fails to load', async () => {
    const wrapper = mount(DsAvatar, { props: { src: 'bad-url.png', fallback: 'Error User' } })
    await wrapper.find('img').trigger('error')
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.text()).toBe('EU')
  })

  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('renders size=%s without error', (size) => {
    const wrapper = mount(DsAvatar, { props: { size } })
    expect(wrapper.exists()).toBe(true)
  })

  it.each(['circle', 'rounded', 'square'] as const)('renders shape=%s without error', (shape) => {
    const wrapper = mount(DsAvatar, { props: { shape } })
    expect(wrapper.exists()).toBe(true)
  })

  it('applies !rounded-full for circle shape', () => {
    const wrapper = mount(DsAvatar, { props: { shape: 'circle' } })
    expect(wrapper.classes()).toContain('!rounded-full')
  })

  it('applies !rounded-none for square shape', () => {
    const wrapper = mount(DsAvatar, { props: { shape: 'square' } })
    expect(wrapper.classes()).toContain('!rounded-none')
  })

  it('uses alt attribute on image', () => {
    const wrapper = mount(DsAvatar, {
      props: { src: 'https://example.com/a.png', alt: 'Profile picture' },
    })
    expect(wrapper.find('img').attributes('alt')).toBe('Profile picture')
  })
})
