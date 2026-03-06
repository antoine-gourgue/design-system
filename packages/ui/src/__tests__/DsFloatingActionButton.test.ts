import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import DsFloatingActionButton from '../runtime/components/DsFloatingActionButton.vue'

const actions = [
  { id: 'edit', label: 'Edit', onClick: vi.fn() },
  { id: 'delete', label: 'Delete', onClick: vi.fn() },
]

describe('dsFloatingActionButton', () => {
  it('renders main FAB button', () => {
    const wrapper = mount(DsFloatingActionButton)
    expect(wrapper.find('button[aria-label]').exists()).toBe(true)
  })

  it('uses default label "Open actions"', () => {
    const wrapper = mount(DsFloatingActionButton)
    expect(wrapper.find('button').attributes('aria-label')).toBe('Open actions')
  })

  it('accepts custom label', () => {
    const wrapper = mount(DsFloatingActionButton, { props: { label: 'Add item' } })
    expect(wrapper.find('button').attributes('aria-label')).toBe('Add item')
  })

  it('emits click when no actions and FAB is clicked', async () => {
    const wrapper = mount(DsFloatingActionButton, { props: { actions: [] } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeDefined()
  })

  it('does not emit click when actions are provided (opens speed dial)', async () => {
    const wrapper = mount(DsFloatingActionButton, { props: { actions } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('shows action buttons when FAB is clicked (with actions)', async () => {
    const wrapper = mount(DsFloatingActionButton, { props: { actions } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('[aria-label="Edit"]').exists()).toBe(true)
  })

  it('calls action onClick when action button is clicked', async () => {
    const handler = vi.fn()
    const wrapper = mount(DsFloatingActionButton, {
      props: { actions: [{ id: 'a', label: 'Action', onClick: handler }] },
    })
    await wrapper.find('button').trigger('click')
    await wrapper.find('[aria-label="Action"]').trigger('click')
    expect(handler).toHaveBeenCalled()
  })

  it.each(['primary', 'secondary', 'ghost'] as const)('renders variant=%s without error', (variant) => {
    const wrapper = mount(DsFloatingActionButton, { props: { variant } })
    expect(wrapper.exists()).toBe(true)
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size=%s without error', (size) => {
    const wrapper = mount(DsFloatingActionButton, { props: { size } })
    expect(wrapper.exists()).toBe(true)
  })

  it.each(['bottom-right', 'bottom-left', 'top-right', 'top-left'] as const)('renders position=%s without error', (position) => {
    const wrapper = mount(DsFloatingActionButton, { props: { position } })
    expect(wrapper.exists()).toBe(true)
  })
})
