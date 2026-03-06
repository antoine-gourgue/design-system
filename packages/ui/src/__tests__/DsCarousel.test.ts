import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsCarousel from '../runtime/components/DsCarousel.vue'

describe('dsCarousel', () => {
  it('renders slot content', () => {
    const wrapper = mount(DsCarousel, {
      props: { count: 2 },
      slots: { default: '<div data-testid="slide">Slide</div>' },
    })
    expect(wrapper.find('[data-testid="slide"]').exists()).toBe(true)
  })

  it('shows prev/next arrows when count > 1', () => {
    const wrapper = mount(DsCarousel, { props: { count: 3, arrows: true } })
    expect(wrapper.find('[aria-label="Previous slide"]').exists()).toBe(true)
    expect(wrapper.find('[aria-label="Next slide"]').exists()).toBe(true)
  })

  it('hides arrows when arrows=false', () => {
    const wrapper = mount(DsCarousel, { props: { count: 3, arrows: false } })
    expect(wrapper.find('[aria-label="Previous slide"]').exists()).toBe(false)
  })

  it('hides arrows when count=1', () => {
    const wrapper = mount(DsCarousel, { props: { count: 1, arrows: true } })
    expect(wrapper.find('[aria-label="Previous slide"]').exists()).toBe(false)
  })

  it('shows dot navigation when count > 1', () => {
    const wrapper = mount(DsCarousel, { props: { count: 3, dots: true } })
    const dots = wrapper.findAll('[aria-label^="Go to slide"]')
    expect(dots).toHaveLength(3)
  })

  it('hides dots when dots=false', () => {
    const wrapper = mount(DsCarousel, { props: { count: 3, dots: false } })
    expect(wrapper.findAll('[aria-label^="Go to slide"]')).toHaveLength(0)
  })

  it('navigates to next slide on next button click', async () => {
    const wrapper = mount(DsCarousel, { props: { count: 3, loop: false } })
    const slideContainer = wrapper.find('.flex.transition-transform')
    const initialTransform = slideContainer.attributes('style')
    await wrapper.find('[aria-label="Next slide"]').trigger('click')
    expect(slideContainer.attributes('style')).not.toBe(initialTransform)
  })

  it('merges custom class', () => {
    const wrapper = mount(DsCarousel, { props: { class: 'my-carousel' } })
    expect(wrapper.classes()).toContain('my-carousel')
  })
})
