import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DsStepper from '../runtime/components/DsStepper.vue'

const steps = [
  { label: 'Account', description: 'Set up your account' },
  { label: 'Profile', description: 'Add your profile info' },
  { label: 'Confirm' },
]

describe('dsStepper', () => {
  it('renders with role=list', () => {
    const wrapper = mount(DsStepper, { props: { steps } })
    expect(wrapper.attributes('role')).toBe('list')
  })

  it('renders all step labels', () => {
    const wrapper = mount(DsStepper, { props: { steps } })
    expect(wrapper.text()).toContain('Account')
    expect(wrapper.text()).toContain('Profile')
    expect(wrapper.text()).toContain('Confirm')
  })

  it('renders descriptions when provided', () => {
    const wrapper = mount(DsStepper, { props: { steps } })
    expect(wrapper.text()).toContain('Set up your account')
  })

  it('marks current step with aria-current="step"', () => {
    const wrapper = mount(DsStepper, { props: { steps, modelValue: 1 } })
    expect(wrapper.find('[aria-current="step"]').exists()).toBe(true)
  })

  it('emits update:modelValue when step is clicked', async () => {
    const wrapper = mount(DsStepper, { props: { steps, modelValue: 0 } })
    const stepButtons = wrapper.findAll('button')
    await stepButtons[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1])
  })

  it.each(['horizontal', 'vertical'] as const)('renders orientation=%s without error', (orientation) => {
    const wrapper = mount(DsStepper, { props: { steps, orientation } })
    expect(wrapper.exists()).toBe(true)
  })

  it('shows checkmark for completed steps', () => {
    const wrapper = mount(DsStepper, { props: { steps, modelValue: 2 } })
    // When modelValue=2, steps 0 and 1 are "done", which renders SVG checkmarks
    expect(wrapper.findAll('svg')).toHaveLength(2)
  })
})
