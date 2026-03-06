import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsModal from '../runtime/components/DsModal.vue'

describe('dsModal', () => {
  it('does not render content when modelValue=false', () => {
    const wrapper = mount(DsModal, { props: { modelValue: false } })
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('renders dialog when modelValue=true', () => {
    const wrapper = mount(DsModal, {
      props: { modelValue: true },
      attachTo: document.body,
    })
    expect(document.querySelector('[role="dialog"]')).toBeTruthy()
    wrapper.unmount()
  })

  it('renders title when provided', () => {
    const wrapper = mount(DsModal, {
      props: { modelValue: true, title: 'Confirm action' },
      attachTo: document.body,
    })
    expect(document.body.textContent).toContain('Confirm action')
    wrapper.unmount()
  })

  it('renders description when provided', () => {
    const wrapper = mount(DsModal, {
      props: { modelValue: true, title: 'Modal', description: 'Are you sure?' },
      attachTo: document.body,
    })
    expect(document.body.textContent).toContain('Are you sure?')
    wrapper.unmount()
  })

  it('emits update:modelValue=false and close when close button is clicked', async () => {
    const wrapper = mount(DsModal, {
      props: { modelValue: true, showClose: true },
      attachTo: document.body,
    })
    const closeBtn = document.querySelector<HTMLButtonElement>('[aria-label="Close modal"]')
    closeBtn?.click()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(wrapper.emitted('close')).toBeDefined()
    wrapper.unmount()
  })

  it.each(['sm', 'md', 'lg', 'xl', 'full'] as const)('renders size=%s without error', (size) => {
    const wrapper = mount(DsModal, { props: { modelValue: false, size } })
    expect(wrapper.exists()).toBe(true)
    wrapper.unmount()
  })
})
