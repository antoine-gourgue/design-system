import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsBreadcrumb from '../runtime/components/DsBreadcrumb.vue'

const items = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Widget' },
]

describe('dsBreadcrumb', () => {
  it('renders with aria-label="Breadcrumb"', () => {
    const wrapper = mount(DsBreadcrumb, { props: { items } })
    expect(wrapper.attributes('aria-label')).toBe('Breadcrumb')
  })

  it('renders all item labels', () => {
    const wrapper = mount(DsBreadcrumb, { props: { items } })
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('Products')
    expect(wrapper.text()).toContain('Widget')
  })

  it('renders href links for items with href', () => {
    const wrapper = mount(DsBreadcrumb, { props: { items } })
    const links = wrapper.findAll('a')
    expect(links.some(l => l.attributes('href') === '/')).toBe(true)
    expect(links.some(l => l.attributes('href') === '/products')).toBe(true)
  })

  it('marks last item with aria-current="page"', () => {
    const wrapper = mount(DsBreadcrumb, { props: { items } })
    const current = wrapper.find('[aria-current="page"]')
    expect(current.text()).toBe('Widget')
  })

  it('shows separator chevrons between items', () => {
    const wrapper = mount(DsBreadcrumb, { props: { items } })
    // There should be 2 separators for 3 items
    expect(wrapper.findAll('svg')).toHaveLength(2)
  })

  it('renders single item without separator', () => {
    const wrapper = mount(DsBreadcrumb, { props: { items: [{ label: 'Only' }] } })
    expect(wrapper.findAll('svg')).toHaveLength(0)
  })

  it('renders item without href as non-link span', () => {
    const itemsNoHref = [{ label: 'Home' }, { label: 'Page' }]
    const wrapper = mount(DsBreadcrumb, { props: { items: itemsNoHref } })
    expect(wrapper.findAll('a')).toHaveLength(0)
  })
})
