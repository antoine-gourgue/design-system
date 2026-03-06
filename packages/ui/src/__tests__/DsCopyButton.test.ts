import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import DsCopyButton from '../runtime/components/DsCopyButton.vue'

const writeText = vi.fn().mockResolvedValue(undefined)

describe('dsCopyButton', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', { clipboard: { writeText } })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    writeText.mockClear()
  })

  it('renders a button', () => {
    const wrapper = mount(DsCopyButton, { props: { text: 'Hello' } })
    expect(wrapper.element.tagName).toBe('BUTTON')
  })

  it('shows default label "Copy"', () => {
    const wrapper = mount(DsCopyButton, { props: { text: 'Hello' } })
    expect(wrapper.text()).toContain('Copy')
  })

  it('accepts custom label', () => {
    const wrapper = mount(DsCopyButton, { props: { text: 'Hello', label: 'Copier' } })
    expect(wrapper.text()).toContain('Copier')
  })

  it('calls clipboard.writeText on click', async () => {
    const wrapper = mount(DsCopyButton, { props: { text: 'copy-me' } })
    await wrapper.trigger('click')
    expect(writeText).toHaveBeenCalledWith('copy-me')
  })

  it('shows successLabel after copy', async () => {
    const wrapper = mount(DsCopyButton, { props: { text: 'Hello', successLabel: 'Done!' } })
    await wrapper.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Done!')
  })

  it.each(['default', 'ghost', 'outline'] as const)('renders variant=%s without error', (variant) => {
    const wrapper = mount(DsCopyButton, { props: { text: 'x', variant } })
    expect(wrapper.exists()).toBe(true)
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size=%s without error', (size) => {
    const wrapper = mount(DsCopyButton, { props: { text: 'x', size } })
    expect(wrapper.exists()).toBe(true)
  })
})
