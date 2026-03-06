import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsStatCard from '../runtime/components/DsStatCard.vue'

describe('dsStatCard', () => {
  it('renders label and value', () => {
    const wrapper = mount(DsStatCard, { props: { label: 'Total Sales', value: '1,234' } })
    expect(wrapper.text()).toContain('Total Sales')
    expect(wrapper.text()).toContain('1,234')
  })

  it('renders numeric value', () => {
    const wrapper = mount(DsStatCard, { props: { label: 'Users', value: 9876 } })
    expect(wrapper.text()).toContain('9876')
  })

  it('renders trend when provided', () => {
    const wrapper = mount(DsStatCard, { props: { label: 'Revenue', value: '$1k', trend: '+12%', trendUp: true } })
    expect(wrapper.text()).toContain('+12%')
  })

  it('renders description when provided', () => {
    const wrapper = mount(DsStatCard, { props: { label: 'Revenue', value: '$1k', description: 'vs last month' } })
    expect(wrapper.text()).toContain('vs last month')
  })

  it('shows up arrow SVG when trendUp=true', () => {
    const wrapper = mount(DsStatCard, { props: { label: 'X', value: '1', trend: '+5%', trendUp: true } })
    const svgs = wrapper.findAll('svg')
    expect(svgs.length).toBeGreaterThan(0)
  })

  it('renders slot content', () => {
    const wrapper = mount(DsStatCard, {
      props: { label: 'X', value: '1' },
      slots: { default: '<span data-testid="chart">chart</span>' },
    })
    expect(wrapper.find('[data-testid="chart"]').exists()).toBe(true)
  })

  it('merges custom class', () => {
    const wrapper = mount(DsStatCard, { props: { label: 'X', value: '1', class: 'my-stat' } })
    expect(wrapper.classes()).toContain('my-stat')
  })
})
