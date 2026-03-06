import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsVerticalNav from '../runtime/components/DsVerticalNav.vue'

const groups = [
  {
    id: 'main',
    title: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'settings', label: 'Settings', disabled: true },
    ],
  },
]

describe('dsVerticalNav', () => {
  it('renders with role=navigation', () => {
    const wrapper = mount(DsVerticalNav, { props: { groups } })
    expect(wrapper.attributes('role')).toBe('navigation')
  })

  it('renders group title', () => {
    const wrapper = mount(DsVerticalNav, { props: { groups } })
    expect(wrapper.text()).toContain('Main')
  })

  it('renders item labels', () => {
    const wrapper = mount(DsVerticalNav, { props: { groups } })
    expect(wrapper.text()).toContain('Dashboard')
    expect(wrapper.text()).toContain('Settings')
  })

  it('marks active item with aria-current="page"', () => {
    const wrapper = mount(DsVerticalNav, { props: { groups, activeId: 'dashboard' } })
    const active = wrapper.find('[aria-current="page"]')
    expect(active.exists()).toBe(true)
    expect(active.text()).toContain('Dashboard')
  })

  it('emits select event when item is clicked', async () => {
    const wrapper = mount(DsVerticalNav, { props: { groups } })
    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click')
    expect(wrapper.emitted('select')).toBeDefined()
    expect(wrapper.emitted('select')?.[0][0]).toBe('dashboard')
  })

  it('does not emit select for disabled item', async () => {
    const wrapper = mount(DsVerticalNav, { props: { groups } })
    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click')
    expect(wrapper.emitted('select')).toBeUndefined()
  })

  it('hides group title when collapsed=true', () => {
    const wrapper = mount(DsVerticalNav, { props: { groups, collapsed: true } })
    const titleEl = wrapper.find('p')
    expect(titleEl.exists()).toBe(false)
  })

  it('renders item badge when provided', () => {
    const groupsWithBadge = [{
      id: 'g',
      items: [{ id: 'inbox', label: 'Inbox', badge: 5 }],
    }]
    const wrapper = mount(DsVerticalNav, { props: { groups: groupsWithBadge } })
    expect(wrapper.text()).toContain('5')
  })
})
