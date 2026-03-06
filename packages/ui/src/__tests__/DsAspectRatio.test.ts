import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsAspectRatio from '../runtime/components/DsAspectRatio.vue'

describe('dsAspectRatio', () => {
  it('renders slot content', () => {
    const wrapper = mount(DsAspectRatio, { slots: { default: '<img data-testid="img" />' } })
    expect(wrapper.find('[data-testid="img"]').exists()).toBe(true)
  })

  it('applies correct paddingBottom for 16/9 ratio (default)', () => {
    const wrapper = mount(DsAspectRatio)
    const style = wrapper.attributes('style') ?? ''
    expect(style).toContain('padding-bottom')
    // 1/(16/9)*100 ≈ 56.25
    expect(style).toContain('56.25%')
  })

  it('applies correct paddingBottom for 1:1 ratio', () => {
    const wrapper = mount(DsAspectRatio, { props: { ratio: 1 } })
    expect(wrapper.attributes('style')).toContain('100%')
  })

  it('applies correct paddingBottom for 4:3 ratio', () => {
    const wrapper = mount(DsAspectRatio, { props: { ratio: 4 / 3 } })
    const style = wrapper.attributes('style') ?? ''
    expect(style).toContain('75%')
  })

  it('merges custom class', () => {
    const wrapper = mount(DsAspectRatio, { props: { class: 'my-ratio' } })
    expect(wrapper.classes()).toContain('my-ratio')
  })
})
