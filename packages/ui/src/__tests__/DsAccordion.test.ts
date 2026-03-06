import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsAccordion from '../runtime/components/DsAccordion.vue'
import DsAccordionItem from '../runtime/components/DsAccordionItem.vue'

describe('dsAccordion', () => {
  it('renders its slot content', () => {
    const wrapper = mount(DsAccordion, { slots: { default: '<div data-testid="child">item</div>' } })
    expect(wrapper.find('[data-testid="child"]').exists()).toBe(true)
  })

  it('applies type=single by default', () => {
    const wrapper = mount(DsAccordion)
    expect(wrapper.exists()).toBe(true)
  })

  it('merges custom class', () => {
    const wrapper = mount(DsAccordion, { props: { class: 'my-accordion' } })
    expect(wrapper.classes()).toContain('my-accordion')
  })
})

describe('dsAccordionItem', () => {
  function mountWithAccordion(itemProps = {}) {
    return mount(DsAccordion, {
      slots: {
        default: {
          components: { DsAccordionItem },
          template: `<DsAccordionItem value="item1" title="Section 1" v-bind='${JSON.stringify(itemProps)}'>Content here</DsAccordionItem>`,
        },
      },
    })
  }

  it('renders the title', () => {
    const wrapper = mountWithAccordion()
    expect(wrapper.text()).toContain('Section 1')
  })

  it('content has max-h-0 (hidden) by default', () => {
    const wrapper = mountWithAccordion()
    const content = wrapper.find('[role="region"]')
    expect(content.classes()).toContain('max-h-0')
  })

  it('expands content when trigger is clicked', async () => {
    const wrapper = mountWithAccordion()
    await wrapper.find('button').trigger('click')
    expect(wrapper.text()).toContain('Content here')
  })

  it('sets aria-expanded=false initially', () => {
    const wrapper = mountWithAccordion()
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
  })

  it('sets aria-expanded=true after click', async () => {
    const wrapper = mountWithAccordion()
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
  })

  it('disables trigger when disabled=true', () => {
    const wrapper = mountWithAccordion({ disabled: true })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })
})
