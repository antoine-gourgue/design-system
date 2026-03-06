/* ─────────────────────────────────────────────────────────────
   Component Registry
   Defines documentation metadata for all components.
   Components are resolved at runtime via resolveComponent().
────────────────────────────────────────────────────────────── */

export type PropType = 'select' | 'boolean' | 'text' | 'number' | 'color'

export interface PropControl {
  name: string
  label: string
  type: PropType
  options?: string[]
  default: string | boolean | number
  description?: string
  hideIf?: (props: Record<string, unknown>) => boolean
}

export interface ComponentExample {
  label: string
  props: Record<string, unknown>
  slot?: string
  description?: string
}

export interface SkeletonDoc {
  componentName: string
  examples: ComponentExample[]
}

export interface PropDef {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
}

export interface ComponentDoc {
  slug: string
  componentName: string
  displayName: string
  description: string
  category: string
  controls: PropControl[]
  defaultSlot?: string
  defaultProps?: Record<string, unknown>
  propDefs: PropDef[]
  examples: ComponentExample[]
  skeleton?: SkeletonDoc
  accessibility?: string[]
  since?: string
}

export const componentDocs: ComponentDoc[] = [
  /* ── Button ── */
  {
    slug: 'button',
    componentName: 'DsButton',
    displayName: 'Button',
    description: 'Triggers actions or events. Supports multiple variants, sizes, loading state and icon slots.',
    category: 'Actions',
    defaultSlot: 'Click me',
    defaultProps: { variant: 'primary', size: 'md' },
    controls: [
      { name: 'variant', label: 'Variant', type: 'select', options: ['primary', 'secondary', 'ghost', 'destructive', 'link', 'outline'], default: 'primary', description: 'Visual style of the button.' },
      { name: 'size', label: 'Size', type: 'select', options: ['sm', 'md', 'lg', 'icon', 'icon-sm', 'icon-lg'], default: 'md', description: 'Size of the button.' },
      { name: 'loading', label: 'Loading', type: 'boolean', default: false, description: 'Show spinner and disable interaction.' },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false, description: 'Disable the button.' },
      { name: 'fullWidth', label: 'Full Width', type: 'boolean', default: false, description: 'Expand to full width.' },
      { name: 'rounded', label: 'Rounded', type: 'boolean', default: false, description: 'Pill shape.' },
    ],
    propDefs: [
      { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'destructive' | 'link' | 'outline'", default: "'primary'", description: 'Visual style.' },
      { name: 'size', type: "'sm' | 'md' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg'", default: "'md'", description: 'Size.' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading spinner.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the button.' },
      { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Full container width.' },
      { name: 'rounded', type: 'boolean', default: 'false', description: 'Pill/fully rounded.' },
      { name: 'as', type: "'button' | 'a'", default: "'button'", description: 'Render as element.' },
      { name: 'href', type: 'string', description: 'URL when as="a".' },
      { name: 'type', type: "'button' | 'submit' | 'reset'", default: "'button'", description: 'Native button type.' },
    ],
    examples: [
      { label: 'Primary', props: { variant: 'primary' }, slot: 'Primary' },
      { label: 'Secondary', props: { variant: 'secondary' }, slot: 'Secondary' },
      { label: 'Outline', props: { variant: 'outline' }, slot: 'Outline' },
      { label: 'Ghost', props: { variant: 'ghost' }, slot: 'Ghost' },
      { label: 'Destructive', props: { variant: 'destructive' }, slot: 'Delete' },
      { label: 'Link', props: { variant: 'link' }, slot: 'Link' },
      { label: 'Small', props: { size: 'sm' }, slot: 'Small' },
      { label: 'Large', props: { size: 'lg' }, slot: 'Large' },
      { label: 'Loading', props: { loading: true }, slot: 'Loading' },
      { label: 'Disabled', props: { disabled: true }, slot: 'Disabled' },
      { label: 'Full Width', props: { fullWidth: true }, slot: 'Full Width' },
      { label: 'Rounded', props: { rounded: true }, slot: 'Rounded' },
    ],
    skeleton: {
      componentName: 'DsButtonSkeleton',
      examples: [
        { label: 'Default', props: {} },
        { label: 'Small', props: { size: 'sm' } },
        { label: 'Large', props: { size: 'lg' } },
        { label: 'Rounded', props: { rounded: true } },
        { label: 'Custom Width', props: { width: '140px' } },
      ],
    },
    accessibility: [
      'Uses native <button> element by default for full keyboard and AT support.',
      'Loading state sets aria-busy="true" and aria-disabled="true".',
      'Focus ring visible on keyboard navigation.',
    ],
  },

  /* ── Badge ── */
  {
    slug: 'badge',
    componentName: 'DsBadge',
    displayName: 'Badge',
    description: 'A small label for status, counts, or categories.',
    category: 'Display',
    defaultSlot: 'New',
    defaultProps: { variant: 'primary', size: 'md' },
    controls: [
      { name: 'variant', label: 'Variant', type: 'select', options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'outline'], default: 'primary', description: 'Color variant.' },
      { name: 'size', label: 'Size', type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Size.' },
      { name: 'rounded', label: 'Rounded', type: 'boolean', default: false, description: 'Pill shape.' },
    ],
    propDefs: [
      { name: 'variant', type: "'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline'", default: "'default'", description: 'Color variant.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size.' },
      { name: 'rounded', type: 'boolean', default: 'false', description: 'Pill shape.' },
    ],
    examples: [
      { label: 'Default', props: { variant: 'default' }, slot: 'Default' },
      { label: 'Primary', props: { variant: 'primary' }, slot: 'Primary' },
      { label: 'Success', props: { variant: 'success' }, slot: 'Active' },
      { label: 'Warning', props: { variant: 'warning' }, slot: 'Pending' },
      { label: 'Danger', props: { variant: 'danger' }, slot: 'Error' },
      { label: 'Outline', props: { variant: 'outline' }, slot: 'Outline' },
      { label: 'Rounded', props: { rounded: true }, slot: 'Rounded' },
    ],
    skeleton: {
      componentName: 'DsBadgeSkeleton',
      examples: [
        { label: 'Default', props: {} },
        { label: 'Small', props: { size: 'sm' } },
        { label: 'Large', props: { size: 'lg' } },
      ],
    },
    accessibility: [
      'Use meaningful text labels.',
      'Avoid using color alone to convey information.',
    ],
  },

  /* ── Alert ── */
  {
    slug: 'alert',
    componentName: 'DsAlert',
    displayName: 'Alert',
    description: 'Communicates status, warnings, or contextual information to the user.',
    category: 'Feedback',
    defaultSlot: 'This is an informational message.',
    defaultProps: { variant: 'info', title: 'Note' },
    controls: [
      { name: 'variant', label: 'Variant', type: 'select', options: ['default', 'info', 'success', 'warning', 'destructive'], default: 'info', description: 'Visual severity.' },
      { name: 'title', label: 'Title', type: 'text', default: 'Note', description: 'Optional bold heading.' },
    ],
    propDefs: [
      { name: 'variant', type: "'default' | 'info' | 'success' | 'warning' | 'destructive'", default: "'default'", description: 'Visual style and severity.' },
      { name: 'title', type: 'string', description: 'Optional heading inside the alert.' },
    ],
    examples: [
      { label: 'Info', props: { variant: 'info', title: 'Information' }, slot: 'Your session will expire in 10 minutes.' },
      { label: 'Success', props: { variant: 'success', title: 'Saved' }, slot: 'Your changes have been saved successfully.' },
      { label: 'Warning', props: { variant: 'warning', title: 'Warning' }, slot: 'This action cannot be undone.' },
      { label: 'Error', props: { variant: 'destructive', title: 'Error' }, slot: 'Something went wrong. Please try again.' },
      { label: 'Default', props: { variant: 'default' }, slot: 'A simple neutral message.' },
    ],
    skeleton: {
      componentName: 'DsAlertSkeleton',
      examples: [
        { label: 'With title', props: { showTitle: true } },
        { label: 'No title', props: { showTitle: false } },
      ],
    },
    accessibility: [
      'Rendered with role="alert" for screen reader announcements.',
      'Each variant uses a contextual icon for visual reinforcement.',
    ],
  },

  /* ── Avatar ── */
  {
    slug: 'avatar',
    componentName: 'DsAvatar',
    displayName: 'Avatar',
    description: 'Displays a user image, or initials as a fallback.',
    category: 'Display',
    defaultProps: { fallback: 'John Doe', size: 'md', shape: 'circle' },
    controls: [
      { name: 'fallback', label: 'Fallback Name', type: 'text', default: 'John Doe', description: 'Name used for initials.' },
      { name: 'size', label: 'Size', type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'], default: 'md', description: 'Avatar size.' },
      { name: 'shape', label: 'Shape', type: 'select', options: ['circle', 'rounded', 'square'], default: 'circle', description: 'Border radius.' },
    ],
    propDefs: [
      { name: 'src', type: 'string', description: 'Image URL.' },
      { name: 'alt', type: 'string', description: 'Image alt text.' },
      { name: 'fallback', type: 'string', description: 'Name for initials fallback.' },
      { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Size.' },
      { name: 'shape', type: "'circle' | 'rounded' | 'square'", default: "'circle'", description: 'Shape.' },
    ],
    examples: [
      { label: 'Initials', props: { fallback: 'John Doe', size: 'md' } },
      { label: 'Large', props: { fallback: 'Alice B', size: 'lg' } },
      { label: 'XL Circle', props: { fallback: 'TS', size: 'xl', shape: 'circle' } },
      { label: 'Square', props: { fallback: 'AX', size: 'md', shape: 'square' } },
      { label: 'Rounded', props: { fallback: 'KB', size: 'md', shape: 'rounded' } },
    ],
    skeleton: {
      componentName: 'DsAvatarSkeleton',
      examples: [
        { label: 'Default', props: {} },
        { label: 'Large', props: { size: 'lg' } },
        { label: 'Square', props: { shape: 'square' } },
      ],
    },
    accessibility: [
      'Provide meaningful alt text when src is used.',
      'Initials fallback is aria-hidden.',
    ],
  },

  /* ── Card ── */
  {
    slug: 'card',
    componentName: 'DsCard',
    displayName: 'Card',
    description: 'A flexible surface container. Compose with DsCardHeader, DsCardContent and DsCardFooter.',
    category: 'Display',
    defaultSlot: 'Card content goes here.',
    defaultProps: { shadow: 'sm', radius: 'lg', padding: 'md' },
    controls: [
      { name: 'shadow', label: 'Shadow', type: 'select', options: ['none', 'sm', 'md', 'lg'], default: 'sm', description: 'Box shadow depth.' },
      { name: 'radius', label: 'Radius', type: 'select', options: ['sm', 'md', 'lg', 'xl'], default: 'lg', description: 'Border radius.' },
      { name: 'padding', label: 'Padding', type: 'select', options: ['none', 'sm', 'md', 'lg'], default: 'md', description: "Direct padding — use 'none' when composing with DsCardContent." },
      { name: 'hoverable', label: 'Hoverable', type: 'boolean', default: false, description: 'Lift on hover.' },
    ],
    propDefs: [
      { name: 'shadow', type: "'none' | 'sm' | 'md' | 'lg'", default: "'sm'", description: 'Box shadow depth.' },
      { name: 'radius', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'lg'", description: 'Border radius.' },
      { name: 'padding', type: "'none' | 'sm' | 'md' | 'lg'", default: "'none'", description: "Direct padding on the card. Use 'none' when composing with DsCardContent/DsCardHeader." },
      { name: 'hoverable', type: 'boolean', default: 'false', description: 'Lifts shadow on hover and shows pointer cursor.' },
    ],
    examples: [
      { label: 'Default', props: { shadow: 'sm', padding: 'md' }, slot: 'A simple padded card.' },
      { label: 'No shadow', props: { shadow: 'none', padding: 'md' }, slot: 'Flat card.' },
      { label: 'Large shadow', props: { shadow: 'lg', padding: 'md' }, slot: 'Elevated card.' },
      { label: 'Hoverable', props: { hoverable: true, padding: 'md' }, slot: 'Hover to see the lift effect.' },
    ],
    skeleton: {
      componentName: 'DsCardSkeleton',
      examples: [
        { label: 'Default', props: {} },
        { label: 'With Avatar', props: { showAvatar: true } },
        { label: 'No Footer', props: { showFooter: false } },
        { label: 'Full', props: { showAvatar: true, showFooter: true, lines: 4 } },
      ],
    },
    accessibility: [
      'Use semantic HTML inside card slots (headings, paragraphs, etc.).',
      'Set hoverable only when the card is an interactive/clickable element.',
    ],
  },

  /* ── Input ── */
  {
    slug: 'input',
    componentName: 'DsInput',
    displayName: 'Input',
    description: 'Text input with label, help text, error state and icon slots.',
    category: 'Form',
    defaultProps: { placeholder: 'Enter text...' },
    controls: [
      { name: 'placeholder', label: 'Placeholder', type: 'text', default: 'Enter text...', description: 'Placeholder text.' },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false, description: 'Disable the input.' },
      { name: 'error', label: 'Error', type: 'boolean', default: false, description: 'Show error state.' },
      { name: 'readonly', label: 'Readonly', type: 'boolean', default: false, description: 'Read-only mode.' },
    ],
    propDefs: [
      { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
      { name: 'modelValue', type: 'string', description: 'v-model binding.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state.' },
      { name: 'error', type: 'boolean', default: 'false', description: 'Error state.' },
      { name: 'readonly', type: 'boolean', default: 'false', description: 'Readonly mode.' },
      { name: 'type', type: 'string', default: "'text'", description: 'Input type attribute.' },
    ],
    examples: [
      { label: 'Default', props: { placeholder: 'Enter text...' } },
      { label: 'Disabled', props: { placeholder: 'Disabled input', disabled: true } },
      { label: 'Error', props: { placeholder: 'Invalid value', error: true } },
      { label: 'Readonly', props: { readonly: true }, slot: 'Read only value' },
    ],
    skeleton: {
      componentName: 'DsInputSkeleton',
      examples: [
        { label: 'Default', props: {} },
        { label: 'With Label', props: { hasLabel: true } },
        { label: 'With Help', props: { hasLabel: true, hasHelpText: true } },
      ],
    },
    accessibility: [
      'Always pair with a DsLabel using matching id/for attributes.',
      'Error state sets aria-invalid="true".',
    ],
  },

  /* ── Textarea ── */
  {
    slug: 'textarea',
    componentName: 'DsTextarea',
    displayName: 'Textarea',
    description: 'Multi-line text input with resizing options.',
    category: 'Form',
    defaultProps: { placeholder: 'Enter your message...', rows: 4 },
    controls: [
      { name: 'placeholder', label: 'Placeholder', type: 'text', default: 'Enter your message...', description: 'Placeholder text.' },
      { name: 'rows', label: 'Rows', type: 'number', default: 4, description: 'Number of visible rows.' },
      { name: 'resize', label: 'Resize', type: 'select', options: ['none', 'vertical', 'horizontal', 'both'], default: 'vertical', description: 'Resize direction.' },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false, description: 'Disable input.' },
      { name: 'error', label: 'Error', type: 'boolean', default: false, description: 'Error state.' },
    ],
    propDefs: [
      { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
      { name: 'modelValue', type: 'string', description: 'v-model value.' },
      { name: 'rows', type: 'number', default: '4', description: 'Number of visible rows.' },
      { name: 'resize', type: "'none' | 'vertical' | 'horizontal' | 'both'", default: "'vertical'", description: 'Resize handle.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state.' },
      { name: 'error', type: 'boolean', default: 'false', description: 'Error state.' },
      { name: 'readonly', type: 'boolean', default: 'false', description: 'Readonly mode.' },
    ],
    examples: [
      { label: 'Default', props: { placeholder: 'Write something...' } },
      { label: 'No resize', props: { placeholder: 'Fixed size', resize: 'none' } },
      { label: 'Error', props: { placeholder: 'Invalid', error: true } },
      { label: 'Disabled', props: { placeholder: 'Disabled', disabled: true } },
    ],
    skeleton: {
      componentName: 'DsTextareaSkeleton',
      examples: [
        { label: 'Default', props: {} },
        { label: 'With Label', props: { hasLabel: true } },
        { label: 'Tall', props: { rows: 6 } },
      ],
    },
    accessibility: [
      'Always pair with a DsLabel using matching id/for attributes.',
    ],
  },

  /* ── Checkbox ── */
  {
    slug: 'checkbox',
    componentName: 'DsCheckbox',
    displayName: 'Checkbox',
    description: 'A boolean toggle with optional label and description.',
    category: 'Form',
    defaultProps: { label: 'Accept terms', modelValue: false },
    controls: [
      { name: 'label', label: 'Label', type: 'text', default: 'Accept terms', description: 'Checkbox label.' },
      { name: 'modelValue', label: 'Checked', type: 'boolean', default: false, description: 'Checked state.' },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false, description: 'Disable checkbox.' },
    ],
    propDefs: [
      { name: 'modelValue', type: "boolean | 'indeterminate'", default: 'false', description: 'Checked state.' },
      { name: 'label', type: 'string', description: 'Text label.' },
      { name: 'description', type: 'string', description: 'Helper text below label.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state.' },
    ],
    examples: [
      { label: 'Unchecked', props: { label: 'Accept terms', modelValue: false } },
      { label: 'Checked', props: { label: 'Subscribed', modelValue: true } },
      { label: 'Disabled', props: { label: 'Unavailable', modelValue: false, disabled: true } },
      { label: 'With description', props: { label: 'Newsletter', description: 'Receive weekly updates.' } },
    ],
    skeleton: {
      componentName: 'DsCheckboxSkeleton',
      examples: [
        { label: 'Label only', props: { showLabel: true } },
        { label: 'With description', props: { showLabel: true, showDescription: true } },
        { label: 'No label', props: { showLabel: false } },
      ],
    },
    accessibility: [
      'Uses native <input type="checkbox"> under the hood.',
      'Label is linked via id/for for proper AT support.',
      'Supports indeterminate state via modelValue="indeterminate".',
    ],
  },

  /* ── Switch ── */
  {
    slug: 'switch',
    componentName: 'DsSwitch',
    displayName: 'Switch',
    description: 'A toggle switch for binary on/off settings.',
    category: 'Form',
    defaultProps: { label: 'Enable notifications', modelValue: false },
    controls: [
      { name: 'label', label: 'Label', type: 'text', default: 'Enable notifications', description: 'Switch label.' },
      { name: 'modelValue', label: 'On', type: 'boolean', default: false, description: 'On/off state.' },
      { name: 'size', label: 'Size', type: 'select', options: ['sm', 'md'], default: 'md', description: 'Size.' },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false, description: 'Disabled state.' },
    ],
    propDefs: [
      { name: 'modelValue', type: 'boolean', default: 'false', description: 'Switch state.' },
      { name: 'label', type: 'string', description: 'Text label.' },
      { name: 'description', type: 'string', description: 'Helper text.' },
      { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Size.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state.' },
    ],
    examples: [
      { label: 'Off', props: { label: 'Dark mode', modelValue: false } },
      { label: 'On', props: { label: 'Dark mode', modelValue: true } },
      { label: 'Small', props: { label: 'Small toggle', modelValue: false, size: 'sm' } },
      { label: 'Disabled', props: { label: 'Unavailable', disabled: true } },
    ],
    skeleton: {
      componentName: 'DsSwitchSkeleton',
      examples: [
        { label: 'Small', props: { size: 'sm', showLabel: true } },
        { label: 'Medium', props: { size: 'md', showLabel: true } },
        { label: 'No label', props: { showLabel: false } },
      ],
    },
    accessibility: [
      'Uses role="switch" with aria-checked.',
      'Keyboard-operable: Space to toggle.',
    ],
  },

  /* ── Progress ── */
  {
    slug: 'progress',
    componentName: 'DsProgress',
    displayName: 'Progress',
    description: 'A progress bar to indicate completion or loading.',
    category: 'Feedback',
    defaultProps: { value: 65, max: 100, variant: 'primary' },
    controls: [
      { name: 'value', label: 'Value', type: 'number', default: 65, description: 'Current value.' },
      { name: 'max', label: 'Max', type: 'number', default: 100, description: 'Maximum value.' },
      { name: 'size', label: 'Size', type: 'select', options: ['xs', 'sm', 'md', 'lg'], default: 'md', description: 'Bar thickness.' },
      { name: 'variant', label: 'Variant', type: 'select', options: ['primary', 'success', 'warning', 'danger'], default: 'primary', description: 'Color.' },
      { name: 'showValue', label: 'Show Value', type: 'boolean', default: false, description: 'Display percentage.' },
      { name: 'label', label: 'Label', type: 'text', default: '', description: 'Optional text label.' },
    ],
    propDefs: [
      { name: 'value', type: 'number', default: '0', description: 'Current value.', required: true },
      { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
      { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", description: 'Bar height.' },
      { name: 'variant', type: "'primary' | 'success' | 'warning' | 'danger'", default: "'primary'", description: 'Color.' },
      { name: 'label', type: 'string', description: 'Accessible label and display text.' },
      { name: 'showValue', type: 'boolean', default: 'false', description: 'Show percentage value.' },
    ],
    examples: [
      { label: '65%', props: { value: 65 } },
      { label: 'Success', props: { value: 100, variant: 'success', label: 'Completed' } },
      { label: 'Warning', props: { value: 78, variant: 'warning', showValue: true } },
      { label: 'Danger', props: { value: 23, variant: 'danger', label: 'Storage full' } },
      { label: 'Thin', props: { value: 50, size: 'xs' } },
    ],
    skeleton: {
      componentName: 'DsProgressSkeleton',
      examples: [
        { label: 'With label', props: { showLabel: true } },
        { label: 'No label', props: { showLabel: false } },
        { label: 'Small', props: { showLabel: false, size: 'sm' } },
        { label: 'Large', props: { showLabel: true, size: 'lg' } },
      ],
    },
    accessibility: [
      'Uses role="progressbar" with aria-valuenow, aria-valuemin, aria-valuemax.',
      'Provide a label for screen reader context.',
    ],
  },

  /* ── Spinner ── */
  {
    slug: 'spinner',
    componentName: 'DsSpinner',
    displayName: 'Spinner',
    description: 'An animated loading indicator for async states.',
    category: 'Feedback',
    defaultProps: { size: 'md' },
    controls: [
      { name: 'size', label: 'Size', type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'], default: 'md', description: 'Spinner size.' },
    ],
    propDefs: [
      { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Size of the spinner.' },
    ],
    examples: [
      { label: 'XS', props: { size: 'xs' } },
      { label: 'SM', props: { size: 'sm' } },
      { label: 'MD', props: { size: 'md' } },
      { label: 'LG', props: { size: 'lg' } },
      { label: 'XL', props: { size: 'xl' } },
    ],
    accessibility: [
      'Has role="status" and aria-hidden="true" — pair with a visually-hidden text label when used alone.',
      'Respects prefers-reduced-motion.',
    ],
  },

  /* ── Separator ── */
  {
    slug: 'separator',
    componentName: 'DsSeparator',
    displayName: 'Separator',
    description: 'A visual divider between sections of content.',
    category: 'Display',
    defaultProps: { orientation: 'horizontal' },
    controls: [
      { name: 'orientation', label: 'Orientation', type: 'select', options: ['horizontal', 'vertical'], default: 'horizontal', description: 'Direction.' },
    ],
    propDefs: [
      { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Orientation of the separator.' },
    ],
    examples: [
      { label: 'Horizontal', props: { orientation: 'horizontal' } },
      { label: 'Vertical', props: { orientation: 'vertical' } },
    ],
    accessibility: [
      'Has role="separator" and aria-orientation.',
    ],
  },

  /* ── Accordion ── */
  {
    slug: 'accordion',
    componentName: 'DsAccordion',
    displayName: 'Accordion',
    description: 'Expandable/collapsible sections to organize content.',
    category: 'Navigation',
    defaultProps: { type: 'single' },
    controls: [
      { name: 'type', label: 'Type', type: 'select', options: ['single', 'multiple'], default: 'single', description: 'Single or multiple open items.' },
    ],
    propDefs: [
      { name: 'type', type: "'single' | 'multiple'", default: "'single'", description: 'Allow one or many open sections.' },
      { name: 'defaultValue', type: 'string | string[]', description: 'Default open item(s).' },
    ],
    examples: [
      { label: 'Single', props: { type: 'single' } },
      { label: 'Multiple', props: { type: 'multiple' } },
    ],
    skeleton: {
      componentName: 'DsAccordionSkeleton',
      examples: [
        { label: '3 items', props: { items: 3 } },
        { label: '4 items', props: { items: 4 } },
        { label: 'With content', props: { items: 3, showContent: true } },
      ],
    },
    accessibility: [
      'Trigger uses aria-expanded on the button.',
      'Content uses role="region" linked to its trigger.',
    ],
  },

  /* ── Breadcrumb ── */
  {
    slug: 'breadcrumb',
    componentName: 'DsBreadcrumb',
    displayName: 'Breadcrumb',
    description: 'Displays the current page location within a navigation hierarchy.',
    category: 'Navigation',
    defaultProps: {
      items: [
        { label: 'Home', href: '#' },
        { label: 'Components', href: '#' },
        { label: 'Breadcrumb' },
      ],
    },
    controls: [],
    propDefs: [
      { name: 'items', type: 'BreadcrumbItem[]', description: 'Array of { label, href? } items.', required: true },
    ],
    examples: [
      { label: 'Basic', props: { items: [{ label: 'Home', href: '#' }, { label: 'Current page' }] } },
      { label: 'Deep', props: { items: [{ label: 'Home', href: '#' }, { label: 'Components', href: '#' }, { label: 'Navigation', href: '#' }, { label: 'Breadcrumb' }] } },
    ],
    skeleton: {
      componentName: 'DsBreadcrumbSkeleton',
      examples: [
        { label: '2 steps', props: { steps: 2 } },
        { label: '3 steps', props: { steps: 3 } },
        { label: '4 steps', props: { steps: 4 } },
      ],
    },
    accessibility: [
      'Uses nav[aria-label="Breadcrumb"] container.',
      'Last item has aria-current="page".',
    ],
  },

  /* ── Tooltip ── */
  {
    slug: 'tooltip',
    componentName: 'DsTooltip',
    displayName: 'Tooltip',
    description: 'A floating label that reveals additional context on hover/focus.',
    category: 'Feedback',
    defaultSlot: 'Hover over me',
    defaultProps: { content: 'Helpful info', side: 'top' },
    controls: [
      { name: 'content', label: 'Content', type: 'text', default: 'Helpful info', description: 'Tooltip text.' },
      { name: 'side', label: 'Side', type: 'select', options: ['top', 'bottom', 'left', 'right'], default: 'top', description: 'Placement.' },
      { name: 'delay', label: 'Delay (ms)', type: 'number', default: 300, description: 'Show delay.' },
    ],
    propDefs: [
      { name: 'content', type: 'string', description: 'Tooltip text.', required: true },
      { name: 'side', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Placement side.' },
      { name: 'delay', type: 'number', default: '300', description: 'Show delay in ms.' },
    ],
    examples: [
      { label: 'Top', props: { content: 'Tooltip on top', side: 'top' } },
      { label: 'Bottom', props: { content: 'Tooltip below', side: 'bottom' } },
      { label: 'Left', props: { content: 'Left side', side: 'left' } },
      { label: 'Right', props: { content: 'Right side', side: 'right' } },
    ],
    accessibility: [
      'Uses role="tooltip" on the floating element.',
      'Shown on both hover and focus for keyboard users.',
    ],
  },

  /* ── Label ── */
  {
    slug: 'label',
    componentName: 'DsLabel',
    displayName: 'Label',
    description: 'A form label that associates with an input via the for attribute.',
    category: 'Form',
    defaultSlot: 'Email address',
    defaultProps: {},
    controls: [
      { name: 'required', label: 'Required', type: 'boolean', default: false, description: 'Show required asterisk.' },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false, description: 'Apply disabled/muted style.' },
    ],
    propDefs: [
      { name: 'for', type: 'string', description: 'The id of the input this label is for.' },
      { name: 'required', type: 'boolean', default: 'false', description: 'Appends a red asterisk (*).' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Applies muted/disabled styling.' },
    ],
    examples: [
      { label: 'Default', props: {}, slot: 'Email address' },
      { label: 'Required', props: { required: true }, slot: 'Password' },
      { label: 'Disabled', props: { disabled: true }, slot: 'Unavailable field' },
    ],
    accessibility: [
      'Use the for prop matching the input id to associate the label properly.',
      'Screen readers announce the label text when the associated input is focused.',
    ],
  },

  /* ── HelpText ── */
  {
    slug: 'help-text',
    componentName: 'DsHelpText',
    displayName: 'HelpText',
    description: 'Small hint or error text displayed below a form input.',
    category: 'Form',
    defaultSlot: 'Enter a valid email address.',
    defaultProps: {},
    controls: [
      { name: 'error', label: 'Error', type: 'boolean', default: false, description: 'Display as red error text.' },
    ],
    propDefs: [
      { name: 'error', type: 'boolean', default: 'false', description: 'Displays text in danger color with role="alert".' },
      { name: 'id', type: 'string', description: 'ID to reference via aria-describedby on the input.' },
    ],
    examples: [
      { label: 'Hint', props: {}, slot: 'Enter a valid email address.' },
      { label: 'Error', props: { error: true }, slot: 'This field is required.' },
    ],
    accessibility: [
      'Reference via aria-describedby on the associated input.',
      'Error state applies role="alert" for immediate screen reader announcements.',
    ],
  },

  /* ── Toast ── */
  {
    slug: 'toast',
    componentName: 'DsToastProvider',
    displayName: 'Toast',
    description: 'Transient notifications triggered programmatically via useToast().',
    category: 'Feedback',
    defaultProps: {},
    controls: [],
    propDefs: [
      { name: 'title', type: 'string', description: 'Toast heading text.', required: true },
      { name: 'description', type: 'string', description: 'Optional body text below the title.' },
      { name: 'variant', type: "'default' | 'success' | 'error' | 'warning' | 'info'", default: "'default'", description: 'Color and severity.' },
      { name: 'duration', type: 'number', default: '4000', description: 'Auto-dismiss duration in ms.' },
      { name: 'dismissible', type: 'boolean', default: 'true', description: 'Show a close button.' },
    ],
    examples: [],
    accessibility: [
      'Uses role="alert" and aria-live="polite" for screen reader announcements.',
      'Dismissible toasts have an accessible close button with a proper aria-label.',
    ],
  },

  /* ── Modal ── */
  {
    slug: 'modal',
    componentName: 'DsModal',
    displayName: 'Modal',
    description: 'An accessible dialog overlay with ESC to close and focus trap. Requires v-model and a trigger.',
    category: 'Overlay',
    defaultProps: {},
    controls: [],
    propDefs: [
      { name: 'modelValue', type: 'boolean', description: 'Open/close state (v-model).', required: true },
      { name: 'title', type: 'string', description: 'Modal title shown in the header.' },
      { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", default: "'md'", description: 'Dialog width.' },
    ],
    examples: [],
    accessibility: [
      'Closes on ESC key.',
      'Focus is trapped inside the dialog while open.',
      'Clicking the backdrop closes the modal.',
      'Uses aria-modal="true" and role="dialog".',
    ],
  },

  /* ── Tabs ── */
  {
    slug: 'tabs',
    componentName: 'DsTabs',
    displayName: 'Tabs',
    description: 'Organizes content into selectable panels.',
    category: 'Navigation',
    defaultProps: {},
    controls: [],
    propDefs: [
      { name: 'modelValue', type: 'string', description: 'Active tab value (v-model).' },
    ],
    examples: [],
    skeleton: {
      componentName: 'DsTabsSkeleton',
      examples: [
        { label: 'Default', props: {} },
        { label: '4 Tabs', props: { tabsCount: 4 } },
        { label: 'Pills', props: { variant: 'pills' } },
      ],
    },
    accessibility: [
      'Tab list uses role="tablist".',
      'Arrow keys navigate between tabs.',
    ],
  },

  /* ── Dropdown ── */
  {
    slug: 'dropdown',
    componentName: 'DsDropdown',
    displayName: 'Dropdown',
    description: 'A contextual menu triggered by a button. Requires a trigger slot and an items array.',
    category: 'Navigation',
    defaultProps: {},
    controls: [],
    propDefs: [
      { name: 'items', type: 'DsDropdownItem[]', description: 'Array of menu items ({ label, value?, disabled?, destructive?, divider? }).' },
      { name: 'placement', type: "'bottom-start' | 'bottom-end' | 'bottom' | 'top-start' | 'top-end' | 'top'", default: "'bottom-start'", description: 'Menu placement relative to trigger.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the dropdown trigger.' },
    ],
    examples: [],
    accessibility: [
      'Uses role="menu" and role="menuitem" on the menu and items.',
      'Closes on ESC key and outside click.',
      'Arrow keys navigate between menu items.',
    ],
  },

  /* ── Table ── */
  {
    slug: 'table',
    componentName: 'DsTable',
    displayName: 'Table',
    description: 'A styled data table with sortable columns, striped rows, and hover states.',
    category: 'Data',
    defaultProps: {
      columns: [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'role', label: 'Role' },
        { key: 'status', label: 'Status', align: 'center' },
      ],
      rows: [
        { name: 'Antoine Gourgue', role: 'Staff Engineer', status: 'Active' },
        { name: 'Marie Dupont', role: 'Designer', status: 'Active' },
        { name: 'Luc Martin', role: 'Product Manager', status: 'Away' },
      ],
      striped: false,
      hoverable: true,
      dense: false,
    },
    controls: [
      { name: 'striped', label: 'Striped', type: 'boolean', default: false, description: 'Alternate row backgrounds.' },
      { name: 'hoverable', label: 'Hoverable', type: 'boolean', default: true, description: 'Highlight row on hover.' },
      { name: 'dense', label: 'Dense', type: 'boolean', default: false, description: 'Reduce cell padding.' },
    ],
    propDefs: [
      { name: 'columns', type: 'DsTableColumn[]', description: 'Array of { key, label, align?, width?, sortable? }.', required: true },
      { name: 'rows', type: "Record<string, unknown>[]", description: 'Data rows — each object key must match a column key.', required: true },
      { name: 'striped', type: 'boolean', default: 'false', description: 'Alternating row backgrounds.' },
      { name: 'hoverable', type: 'boolean', default: 'true', description: 'Highlight row on hover.' },
      { name: 'dense', type: 'boolean', default: 'false', description: 'Compact cell padding.' },
      { name: 'bordered', type: 'boolean', default: 'false', description: 'Show outer border.' },
      { name: 'caption', type: 'string', description: 'Accessible table caption.' },
      { name: 'sortBy', type: 'string', description: 'Currently sorted column key.' },
      { name: 'sortDir', type: "'asc' | 'desc'", default: "'asc'", description: 'Sort direction.' },
    ],
    examples: [],
    skeleton: {
      componentName: 'DsTableSkeleton',
      examples: [
        { label: 'Default (4×4)', props: {} },
        { label: 'Dense', props: { dense: true, rows: 5 } },
        { label: 'Wide (6 cols)', props: { columns: 6 } },
      ],
    },
    accessibility: [
      'Uses semantic <table>, <thead>, <tbody>, <th>, <td> elements.',
      'Sortable column headers include aria-sort (implement manually via sortBy/sortDir).',
      'Keyboard focusable sort buttons.',
    ],
  },

  /* ── Calendar ── */
  {
    slug: 'calendar',
    componentName: 'DsCalendar',
    displayName: 'Calendar',
    description: 'An interactive month calendar for date selection with keyboard navigation.',
    category: 'Data',
    defaultProps: {},
    controls: [
      { name: 'showToday', label: 'Show Today button', type: 'boolean', default: true, description: 'Display a "Today" shortcut.' },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false, description: 'Disable all interactions.' },
    ],
    propDefs: [
      { name: 'modelValue', type: 'Date | null', description: 'Selected date (v-model).' },
      { name: 'min', type: 'Date', description: 'Minimum selectable date.' },
      { name: 'max', type: 'Date', description: 'Maximum selectable date.' },
      { name: 'locale', type: 'string', default: "'en-US'", description: 'Locale for month/day labels.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable all date selection.' },
      { name: 'showToday', type: 'boolean', default: 'true', description: 'Show "Today" shortcut button.' },
    ],
    examples: [],
    skeleton: {
      componentName: 'DsCalendarSkeleton',
      examples: [
        { label: 'Default', props: {} },
      ],
    },
    accessibility: [
      'Navigation buttons are keyboard focusable with aria-label.',
      'Each day button has aria-label (full date) and aria-pressed (selected state).',
      'Disabled days get disabled attribute.',
    ],
  },

  /* ── StatCard ── */
  {
    slug: 'stat-card',
    componentName: 'DsStatCard',
    displayName: 'StatCard',
    description: 'A KPI / metric card displaying a value, label, and optional trend indicator.',
    category: 'Display',
    defaultProps: { label: 'Total Users', value: '12,400', trend: '+12%', trendUp: true },
    controls: [
      { name: 'label', label: 'Label', type: 'text', default: 'Total Users', description: 'Metric label.' },
      { name: 'value', label: 'Value', type: 'text', default: '12,400', description: 'Main metric value.' },
      { name: 'trend', label: 'Trend', type: 'text', default: '+12%', description: 'Trend badge text (e.g. +12%).' },
      { name: 'trendUp', label: 'Trend Up', type: 'boolean', default: true, description: 'Green arrow if true, red if false.' },
      { name: 'description', label: 'Description', type: 'text', default: '', description: 'Optional sub-text.' },
    ],
    propDefs: [
      { name: 'label', type: 'string', description: 'Metric label.', required: true },
      { name: 'value', type: 'string | number', description: 'Main metric value.', required: true },
      { name: 'trend', type: 'string', description: 'Trend badge text (e.g. "+12%", "-3.4%").' },
      { name: 'trendUp', type: 'boolean', description: 'Positive (green) or negative (red) trend.' },
      { name: 'description', type: 'string', description: 'Optional description below the value.' },
    ],
    examples: [
      { label: 'Positive trend', props: { label: 'Revenue', value: '$48,200', trend: '+8.2%', trendUp: true } },
      { label: 'Negative trend', props: { label: 'Churn rate', value: '2.4%', trend: '-0.3%', trendUp: false } },
      { label: 'No trend', props: { label: 'Open tickets', value: '34' } },
      { label: 'With description', props: { label: 'Active sessions', value: '1,280', trend: '+24%', trendUp: true, description: 'Compared to last 30 days' } },
    ],
    skeleton: {
      componentName: 'DsStatCardSkeleton',
      examples: [
        { label: 'Default', props: { showTrend: true } },
        { label: 'No trend', props: { showTrend: false } },
        { label: 'With description', props: { showTrend: true, showDescription: true } },
      ],
    },
    accessibility: [
      'Trend indicator is decorative — screen readers read the value and label.',
    ],
  },

  /* ── Kbd ── */
  {
    slug: 'kbd',
    componentName: 'DsKbd',
    displayName: 'Kbd',
    description: 'Inline keyboard shortcut badge using the semantic <kbd> element.',
    category: 'Display',
    defaultSlot: '⌘K',
    defaultProps: { size: 'md' },
    controls: [
      { name: 'size', label: 'Size', type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Badge size.' },
    ],
    propDefs: [
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls padding and font size.' },
    ],
    examples: [
      { label: 'Small', props: { size: 'sm' }, slot: 'ESC' },
      { label: 'Medium', props: { size: 'md' }, slot: '⌘K' },
      { label: 'Large', props: { size: 'lg' }, slot: 'Enter' },
      { label: 'Combo', props: { size: 'md' }, slot: 'Ctrl+Shift+P' },
    ],
    accessibility: [
      'Uses semantic <kbd> HTML element.',
      'Readable by screen readers as keyboard input.',
    ],
  },

  /* ── Pagination ── */
  {
    slug: 'pagination',
    componentName: 'DsPagination',
    displayName: 'Pagination',
    description: 'Navigate between pages of content with previous/next controls, page numbers, and ellipsis for large page counts.',
    category: 'Navigation',
    defaultProps: { modelValue: 3, total: 100, perPage: 10, siblings: 1, showEdges: true },
    controls: [
      { name: 'total', label: 'Total items', type: 'number', default: 100, description: 'Total number of items.' },
      { name: 'perPage', label: 'Per page', type: 'number', default: 10, description: 'Items per page.' },
      { name: 'siblings', label: 'Siblings', type: 'number', default: 1, description: 'Pages shown on each side of current.' },
      { name: 'showEdges', label: 'Show edges', type: 'boolean', default: true, description: 'Always show first and last page.' },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false, description: 'Disable all controls.' },
    ],
    propDefs: [
      { name: 'modelValue', type: 'number', description: 'Current page (v-model, 1-indexed).', required: true },
      { name: 'total', type: 'number', description: 'Total number of items.', required: true },
      { name: 'perPage', type: 'number', default: '10', description: 'Items per page.' },
      { name: 'siblings', type: 'number', default: '1', description: 'Sibling page count on each side.' },
      { name: 'showEdges', type: 'boolean', default: 'true', description: 'Show first/last page buttons.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable all navigation.' },
    ],
    examples: [],
    skeleton: {
      componentName: 'DsPaginationSkeleton',
      examples: [
        { label: 'Default (5 pages)', props: {} },
        { label: 'Wide (7 pages)', props: { pages: 7 } },
        { label: 'Compact (3 pages)', props: { pages: 3 } },
      ],
    },
    accessibility: [
      'Wraps in a <nav> with aria-label="Pagination".',
      'Active page button has aria-current="page".',
      'Prev/Next arrows have descriptive aria-label.',
      'Disabled state set via disabled attribute on buttons.',
    ],
  },

  /* ── Skeleton ── */
  {
    slug: 'skeleton',
    componentName: 'DsSkeleton',
    displayName: 'Skeleton',
    description: 'A generic placeholder block for loading states.',
    category: 'Display',
    defaultProps: { class: 'h-4 w-48 rounded' },
    controls: [],
    propDefs: [],
    examples: [
      { label: 'Line', props: { class: 'h-4 w-48' } },
      { label: 'Paragraph', props: { class: 'h-4 w-full' } },
      { label: 'Circle', props: { class: 'h-10 w-10 rounded-full' } },
      { label: 'Block', props: { class: 'h-24 w-full rounded-ds-md' } },
    ],
    accessibility: [
      'Has aria-hidden="true" and role="presentation".',
    ],
  },

  /* ── Select ── */
  {
    slug: 'select',
    componentName: 'DsSelect',
    displayName: 'Select',
    description: 'A styled native select for choosing from a list of options, with optional option groups.',
    category: 'Form',
    defaultProps: { modelValue: '', placeholder: 'Choose an option…', size: 'md', error: false },
    controls: [
      { name: 'placeholder', label: 'Placeholder', type: 'text', default: 'Choose an option…', description: 'Placeholder text.' },
      { name: 'size', label: 'Size', type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Input height.' },
      { name: 'error', label: 'Error', type: 'boolean', default: false, description: 'Error state.' },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false, description: 'Disable input.' },
    ],
    propDefs: [
      { name: 'modelValue', type: 'string | number | null', description: 'Selected value (v-model).' },
      { name: 'options', type: '(DsSelectOption | DsSelectGroup)[]', description: 'Options or option groups.' },
      { name: 'placeholder', type: 'string', description: 'Placeholder option label.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Height of the select.' },
      { name: 'error', type: 'boolean', default: 'false', description: 'Error border state.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the select.' },
    ],
    examples: [],
    skeleton: {
      componentName: 'DsSelectSkeleton',
      examples: [
        { label: 'Small', props: { size: 'sm' } },
        { label: 'Medium', props: { size: 'md' } },
        { label: 'Large', props: { size: 'lg' } },
      ],
    },
    accessibility: [
      'Uses native <select> for maximum accessibility and keyboard support.',
      'Error state sets visual red border.',
    ],
  },

  /* ── RadioGroup ── */
  {
    slug: 'radio-group',
    componentName: 'DsRadioGroup',
    displayName: 'Radio Group',
    description: 'A group of radio buttons for single-choice selection, with vertical/horizontal layout and card mode.',
    category: 'Form',
    defaultProps: { modelValue: 'b', orientation: 'vertical', card: false, disabled: false },
    controls: [
      { name: 'orientation', label: 'Orientation', type: 'select', options: ['vertical', 'horizontal'], default: 'vertical', description: 'Layout direction.' },
      { name: 'card', label: 'Card mode', type: 'boolean', default: false, description: 'Display as bordered cards.' },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false, description: 'Disable all options.' },
    ],
    propDefs: [
      { name: 'modelValue', type: 'string | number | null', description: 'Selected value (v-model).' },
      { name: 'options', type: 'DsRadioOption[]', description: 'Array of options with label, value, description?, disabled?.' },
      { name: 'orientation', type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Layout direction.' },
      { name: 'card', type: 'boolean', default: 'false', description: 'Card-style bordered display.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable all options.' },
      { name: 'name', type: 'string', description: 'Name attribute for the radio group.' },
    ],
    examples: [],
    skeleton: {
      componentName: 'DsRadioGroupSkeleton',
      examples: [
        { label: 'Default', props: { count: 3 } },
        { label: 'Card mode', props: { count: 3, card: true } },
      ],
    },
    accessibility: [
      'Uses role="radiogroup" and native radio inputs (visually hidden).',
      'Keyboard navigable with arrow keys.',
    ],
  },

  /* ── Slider ── */
  {
    slug: 'slider',
    componentName: 'DsSlider',
    displayName: 'Slider',
    description: 'A range slider with a filled track, thumb, and optional value display.',
    category: 'Form',
    defaultProps: { modelValue: 50, min: 0, max: 100, step: 1, showValue: true, label: 'Volume', disabled: false },
    controls: [
      { name: 'label', label: 'Label', type: 'text', default: 'Volume', description: 'Slider label.' },
      { name: 'modelValue', label: 'Value', type: 'number', default: 50, description: 'Current value.' },
      { name: 'min', label: 'Min', type: 'number', default: 0, description: 'Minimum value.' },
      { name: 'max', label: 'Max', type: 'number', default: 100, description: 'Maximum value.' },
      { name: 'step', label: 'Step', type: 'number', default: 1, description: 'Step increment.' },
      { name: 'showValue', label: 'Show value', type: 'boolean', default: true, description: 'Display current value.' },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false, description: 'Disable slider.' },
    ],
    propDefs: [
      { name: 'modelValue', type: 'number', default: '50', description: 'Current value (v-model).' },
      { name: 'min', type: 'number', default: '0', description: 'Minimum value.' },
      { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
      { name: 'step', type: 'number', default: '1', description: 'Step increment.' },
      { name: 'label', type: 'string', description: 'Label shown above the track.' },
      { name: 'showValue', type: 'boolean', default: 'true', description: 'Show current value.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
    ],
    examples: [
      { label: 'Default', props: { modelValue: 50, label: 'Volume', min: 0, max: 100 } },
      { label: 'Fine step', props: { modelValue: 25, label: 'Opacity', min: 0, max: 100, step: 5 } },
      { label: 'Disabled', props: { modelValue: 60, label: 'Brightness', disabled: true } },
    ],
    skeleton: {
      componentName: 'DsSliderSkeleton',
      examples: [
        { label: 'Default', props: {} },
        { label: 'No label', props: { showLabel: false } },
      ],
    },
    accessibility: [
      'Uses native <input type="range"> for full keyboard and AT support.',
      'Label and value are visible for screen readers.',
    ],
  },

  /* ── NumberInput ── */
  {
    slug: 'number-input',
    componentName: 'DsNumberInput',
    displayName: 'Number Input',
    description: 'A numeric input with integrated increment and decrement buttons, min/max support.',
    category: 'Form',
    defaultProps: { modelValue: 1, min: 0, max: 99, step: 1, size: 'md', disabled: false },
    controls: [
      { name: 'modelValue', label: 'Value', type: 'number', default: 1, description: 'Current value.' },
      { name: 'min', label: 'Min', type: 'number', default: 0, description: 'Minimum value.' },
      { name: 'max', label: 'Max', type: 'number', default: 99, description: 'Maximum value.' },
      { name: 'step', label: 'Step', type: 'number', default: 1, description: 'Step increment.' },
      { name: 'size', label: 'Size', type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Input size.' },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false, description: 'Disable input.' },
      { name: 'error', label: 'Error', type: 'boolean', default: false, description: 'Error border.' },
    ],
    propDefs: [
      { name: 'modelValue', type: 'number', default: '0', description: 'Current numeric value (v-model).' },
      { name: 'min', type: 'number', description: 'Minimum allowed value.' },
      { name: 'max', type: 'number', description: 'Maximum allowed value.' },
      { name: 'step', type: 'number', default: '1', description: 'Increment/decrement step.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Input height.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable all controls.' },
      { name: 'error', type: 'boolean', default: 'false', description: 'Error border state.' },
    ],
    examples: [
      { label: 'Default', props: { modelValue: 5, min: 0, max: 20 } },
      { label: 'Small', props: { modelValue: 1, size: 'sm' } },
      { label: 'Large', props: { modelValue: 10, size: 'lg' } },
      { label: 'Disabled', props: { modelValue: 3, disabled: true } },
    ],
    skeleton: {
      componentName: 'DsNumberInputSkeleton',
      examples: [
        { label: 'Small', props: { size: 'sm' } },
        { label: 'Medium', props: { size: 'md' } },
        { label: 'Large', props: { size: 'lg' } },
      ],
    },
    accessibility: [
      'Decrement/increment buttons have aria-label.',
      'Native <input type="number"> beneath.',
    ],
  },

  /* ── OTP Input ── */
  {
    slug: 'otp-input',
    componentName: 'DsOtpInput',
    displayName: 'OTP Input',
    description: 'A segmented one-time password input for 2FA and verification codes. Supports paste and keyboard navigation.',
    category: 'Form',
    defaultProps: { modelValue: '', length: 6, disabled: false, error: false },
    controls: [
      { name: 'length', label: 'Length', type: 'number', default: 6, description: 'Number of digits.' },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false, description: 'Disable all fields.' },
      { name: 'error', label: 'Error', type: 'boolean', default: false, description: 'Show error state.' },
    ],
    propDefs: [
      { name: 'modelValue', type: 'string', description: 'Current value (v-model).' },
      { name: 'length', type: 'number', default: '6', description: 'Number of input boxes.' },
      { name: 'type', type: "'text' | 'password'", default: "'text'", description: 'Input type (password to hide digits).' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the inputs.' },
      { name: 'error', type: 'boolean', default: 'false', description: 'Show error border on all inputs.' },
    ],
    examples: [
      { label: '6 digits', props: { length: 6 } },
      { label: '4 digits', props: { length: 4 } },
      { label: 'Error state', props: { length: 6, error: true } },
      { label: 'Disabled', props: { length: 6, disabled: true } },
    ],
    skeleton: {
      componentName: 'DsOtpInputSkeleton',
      examples: [
        { label: '6 digits', props: { length: 6 } },
        { label: '4 digits', props: { length: 4 } },
      ],
    },
    accessibility: [
      'Each input has aria-label="Digit N".',
      'Supports paste from clipboard, auto-advance on input.',
      'Arrow keys navigate between boxes, Backspace removes and focuses previous.',
    ],
  },

  /* ── Tag ── */
  {
    slug: 'tag',
    componentName: 'DsTag',
    displayName: 'Tag',
    description: 'A compact label chip for categories, filters, or statuses. Optional remove button.',
    category: 'Display',
    defaultSlot: 'Design System',
    defaultProps: { variant: 'default', size: 'md', removable: false },
    controls: [
      { name: 'variant', label: 'Variant', type: 'select', options: ['default', 'primary', 'success', 'danger', 'warning', 'info'], default: 'default', description: 'Color variant.' },
      { name: 'size', label: 'Size', type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Tag size.' },
      { name: 'removable', label: 'Removable', type: 'boolean', default: false, description: 'Show remove button.' },
    ],
    propDefs: [
      { name: 'variant', type: "'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info'", default: "'default'", description: 'Color scheme.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tag size.' },
      { name: 'removable', type: 'boolean', default: 'false', description: 'Show remove (×) button.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable remove button.' },
    ],
    examples: [
      { label: 'Default', props: { variant: 'default' }, slot: 'Default' },
      { label: 'Primary', props: { variant: 'primary' }, slot: 'Primary' },
      { label: 'Success', props: { variant: 'success' }, slot: 'Success' },
      { label: 'Danger', props: { variant: 'danger' }, slot: 'Danger' },
      { label: 'Warning', props: { variant: 'warning' }, slot: 'Warning' },
      { label: 'Info', props: { variant: 'info' }, slot: 'Info' },
      { label: 'Removable', props: { variant: 'primary', removable: true }, slot: 'Removable tag' },
    ],
    skeleton: {
      componentName: 'DsTagSkeleton',
      examples: [
        { label: '3 tags', props: { count: 3 } },
        { label: '5 tags', props: { count: 5 } },
      ],
    },
    accessibility: [
      'Remove button has aria-label="Remove".',
      'Slot content is the accessible text.',
    ],
  },

  /* ── EmptyState ── */
  {
    slug: 'empty-state',
    componentName: 'DsEmptyState',
    displayName: 'Empty State',
    description: 'A centered placeholder block for zero-data views with icon, title, description, and a CTA slot.',
    category: 'Display',
    defaultProps: { title: 'No results found', description: 'Try adjusting your filters or search term.' },
    controls: [
      { name: 'title', label: 'Title', type: 'text', default: 'No results found', description: 'Main heading.' },
      { name: 'description', label: 'Description', type: 'text', default: 'Try adjusting your filters or search term.', description: 'Supporting text.' },
    ],
    propDefs: [
      { name: 'title', type: 'string', description: 'Main heading text.', required: true },
      { name: 'description', type: 'string', description: 'Supporting description.' },
    ],
    examples: [],
    skeleton: {
      componentName: 'DsEmptyStateSkeleton',
      examples: [
        { label: 'Default', props: {} },
      ],
    },
    accessibility: [
      'Icon slot accepts any SVG or image.',
      'Default slot accepts CTA buttons.',
    ],
  },

  /* ── Timeline ── */
  {
    slug: 'timeline',
    componentName: 'DsTimeline',
    displayName: 'Timeline',
    description: 'A vertical list of events with status indicators, timestamps, and connecting lines.',
    category: 'Display',
    defaultProps: {},
    controls: [],
    propDefs: [
      { name: 'items', type: 'DsTimelineItem[]', description: 'Array of items with title, description?, date?, status?.', required: true },
    ],
    examples: [],
    skeleton: {
      componentName: 'DsTimelineSkeleton',
      examples: [
        { label: '4 items', props: { count: 4 } },
        { label: '2 items', props: { count: 2 } },
      ],
    },
    accessibility: [
      'Uses <ol> semantic list element.',
      'Status dot has aria-label for screen readers.',
    ],
  },

  /* ── Stepper ── */
  {
    slug: 'stepper',
    componentName: 'DsStepper',
    displayName: 'Stepper',
    description: 'A multi-step progress indicator for wizards and onboarding flows. Clickable steps.',
    category: 'Data',
    defaultProps: { modelValue: 1 },
    controls: [
      { name: 'modelValue', label: 'Current step', type: 'number', default: 1, description: 'Active step index (0-based).' },
      { name: 'orientation', label: 'Orientation', type: 'select', options: ['horizontal', 'vertical'], default: 'horizontal', description: 'Layout direction.' },
    ],
    propDefs: [
      { name: 'steps', type: 'DsStep[]', description: 'Array of step definitions with label, description?.', required: true },
      { name: 'modelValue', type: 'number', default: '0', description: 'Current step index (v-model, 0-based).' },
      { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout direction.' },
    ],
    examples: [],
    skeleton: {
      componentName: 'DsStepperSkeleton',
      examples: [
        { label: '4 steps', props: { steps: 4 } },
        { label: '3 steps', props: { steps: 3 } },
      ],
    },
    accessibility: [
      'Uses role="list" and role="listitem".',
      'Active step has aria-current="step".',
      'Each step button is focusable and keyboard-activated.',
    ],
  },

  /* ── Rating ── */
  {
    slug: 'rating',
    componentName: 'DsRating',
    displayName: 'Rating',
    description: 'An interactive star rating component. Supports read-only display and configurable max.',
    category: 'Feedback',
    defaultProps: { modelValue: 3, max: 5, size: 'md', readonly: false, disabled: false },
    controls: [
      { name: 'modelValue', label: 'Value', type: 'number', default: 3, description: 'Current rating.' },
      { name: 'max', label: 'Max stars', type: 'number', default: 5, description: 'Number of stars.' },
      { name: 'size', label: 'Size', type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Star size.' },
      { name: 'readonly', label: 'Read only', type: 'boolean', default: false, description: 'Non-interactive display.' },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false, description: 'Disabled state.' },
    ],
    propDefs: [
      { name: 'modelValue', type: 'number', default: '0', description: 'Current rating value (v-model).' },
      { name: 'max', type: 'number', default: '5', description: 'Total number of stars.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Star size.' },
      { name: 'readonly', type: 'boolean', default: 'false', description: 'Disable interaction (display only).' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Faded disabled state.' },
    ],
    examples: [
      { label: 'Default', props: { modelValue: 3 } },
      { label: 'Full', props: { modelValue: 5 } },
      { label: 'Read only', props: { modelValue: 4, readonly: true } },
      { label: 'Small', props: { modelValue: 3, size: 'sm' } },
      { label: 'Large', props: { modelValue: 4, size: 'lg' } },
      { label: 'Disabled', props: { modelValue: 2, disabled: true } },
    ],
    skeleton: {
      componentName: 'DsRatingSkeleton',
      examples: [
        { label: 'Small', props: { size: 'sm' } },
        { label: 'Medium', props: { size: 'md' } },
        { label: 'Large', props: { size: 'lg' } },
      ],
    },
    accessibility: [
      'Uses role="radiogroup" with aria-label.',
      'Each star is a button with aria-label and aria-pressed.',
      'Click same star to deselect (toggle to 0).',
    ],
  },

  /* ── Sheet ── */
  {
    slug: 'sheet',
    componentName: 'DsSheet',
    displayName: 'Sheet',
    description: 'A side panel that slides in from any edge. Useful for drawers, menus, or settings panels.',
    category: 'Overlay',
    defaultProps: { side: 'right', size: 'md' },
    controls: [
      { name: 'side', label: 'Side', type: 'select', options: ['left', 'right', 'bottom', 'top'], default: 'right', description: 'Edge to slide from.' },
      { name: 'size', label: 'Size', type: 'select', options: ['sm', 'md', 'lg', 'full'], default: 'md', description: 'Panel width/height.' },
    ],
    propDefs: [
      { name: 'modelValue', type: 'boolean', description: 'Open state (v-model).', required: true },
      { name: 'side', type: "'left' | 'right' | 'bottom' | 'top'", default: "'right'", description: 'Slide-in edge.' },
      { name: 'size', type: "'sm' | 'md' | 'lg' | 'full'", default: "'md'", description: 'Panel width (or height for top/bottom).' },
      { name: 'title', type: 'string', description: 'Sheet title in the header.' },
      { name: 'description', type: 'string', description: 'Subtitle below the title.' },
    ],
    examples: [],
    accessibility: [
      'role="dialog" with aria-modal="true".',
      'ESC key closes the sheet.',
      'Backdrop click closes.',
      'Scrollable body if content exceeds height.',
    ],
  },

  /* ── Collapsible ── */
  {
    slug: 'collapsible',
    componentName: 'DsCollapsible',
    displayName: 'Collapsible',
    description: 'A simple expand/collapse toggle for progressive disclosure. Lighter alternative to Accordion.',
    category: 'Overlay',
    defaultProps: { modelValue: false, title: 'Advanced options' },
    controls: [
      { name: 'title', label: 'Title', type: 'text', default: 'Advanced options', description: 'Trigger label.' },
      { name: 'modelValue', label: 'Open', type: 'boolean', default: false, description: 'Expanded state.' },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false, description: 'Prevent toggle.' },
    ],
    propDefs: [
      { name: 'modelValue', type: 'boolean', default: 'false', description: 'Open/closed state (v-model).' },
      { name: 'title', type: 'string', description: 'Default trigger button label.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevent expanding.' },
    ],
    examples: [],
    skeleton: undefined,
    accessibility: [
      'Trigger button has aria-expanded.',
      'Custom trigger via slot:trigger with (open, toggle) props.',
    ],
  },

  /* ── CommandPalette ── */
  {
    slug: 'command-palette',
    componentName: 'DsCommandPalette',
    displayName: 'Command Palette',
    description: 'A ⌘K search modal for quick navigation and actions. Keyboard-navigable with grouped results.',
    category: 'Overlay',
    defaultProps: { modelValue: false, placeholder: 'Search commands…' },
    controls: [
      { name: 'placeholder', label: 'Placeholder', type: 'text', default: 'Search commands…', description: 'Input placeholder.' },
    ],
    propDefs: [
      { name: 'modelValue', type: 'boolean', description: 'Open state (v-model).' },
      { name: 'items', type: 'DsCommandItem[]', description: 'Array of command items with id, label, description?, shortcut?, group?, action().' },
      { name: 'placeholder', type: 'string', default: "'Search commands…'", description: 'Search input placeholder.' },
    ],
    examples: [],
    accessibility: [
      'role="dialog" with aria-modal and aria-label.',
      'Arrow keys navigate items, Enter selects, Escape closes.',
      'Active item is visually highlighted.',
    ],
  },

  /* ── ContextMenu ── */
  {
    slug: 'context-menu',
    componentName: 'DsContextMenu',
    displayName: 'Context Menu',
    description: 'A right-click contextual menu. Wrap any content to attach a context menu.',
    category: 'Overlay',
    defaultProps: {},
    controls: [],
    propDefs: [
      { name: 'items', type: 'DsContextMenuItem[]', description: 'Menu items with label, action(), shortcut?, danger?, disabled?, type: "separator".', required: true },
    ],
    examples: [],
    accessibility: [
      'role="menu" with role="menuitem" for each item.',
      'ESC closes the menu.',
      'Click outside closes.',
      'Disabled items prevent action.',
    ],
  },

  /* ── AlertDialog ── */
  {
    slug: 'alert-dialog',
    componentName: 'DsAlertDialog',
    displayName: 'Alert Dialog',
    description: 'A confirmation modal with a Cancel and Confirm action. Use it for destructive or irreversible operations.',
    category: 'Overlay',
    defaultProps: { modelValue: false, title: 'Are you sure?', description: 'This action cannot be undone.', confirmLabel: 'Confirm', cancelLabel: 'Cancel', variant: 'default' },
    controls: [
      { name: 'title', label: 'Title', type: 'text', default: 'Are you sure?' },
      { name: 'description', label: 'Description', type: 'text', default: 'This action cannot be undone.' },
      { name: 'confirmLabel', label: 'Confirm label', type: 'text', default: 'Confirm' },
      { name: 'cancelLabel', label: 'Cancel label', type: 'text', default: 'Cancel' },
      { name: 'variant', label: 'Variant', type: 'select', options: ['default', 'destructive'], default: 'default' },
    ],
    propDefs: [
      { name: 'modelValue', type: 'boolean', default: 'false', description: 'Open state (v-model).', required: true },
      { name: 'title', type: 'string', default: '"Are you sure?"', description: 'Dialog title.' },
      { name: 'description', type: 'string', default: '–', description: 'Dialog description (also default slot).' },
      { name: 'confirmLabel', type: 'string', default: '"Confirm"', description: 'Label for confirm button.' },
      { name: 'cancelLabel', type: 'string', default: '"Cancel"', description: 'Label for cancel button.' },
      { name: 'variant', type: '"default" | "destructive"', default: '"default"', description: 'Changes the confirm button style.' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Shows loading state on confirm button.' },
    ],
    examples: [],
    skeleton: {
      componentName: 'DsAlertDialogSkeleton',
      examples: [{ label: 'Default', props: {} }],
    },
    accessibility: [
      'role="alertdialog" with aria-modal="true".',
      'ESC key closes the dialog.',
      'Backdrop click cancels.',
      'Focus trap inside the dialog.',
    ],
  },

  /* ── Popover ── */
  {
    slug: 'popover',
    componentName: 'DsPopover',
    displayName: 'Popover',
    description: 'A generic floating panel triggered by clicking its trigger slot. Can contain any content.',
    category: 'Overlay',
    defaultProps: { side: 'bottom', align: 'start' },
    controls: [
      { name: 'side', label: 'Side', type: 'select', options: ['top', 'bottom', 'left', 'right'], default: 'bottom' },
      { name: 'align', label: 'Align', type: 'select', options: ['start', 'center', 'end'], default: 'start' },
    ],
    propDefs: [
      { name: 'side', type: '"top" | "bottom" | "left" | "right"', default: '"bottom"', description: 'Preferred side to open.' },
      { name: 'align', type: '"start" | "center" | "end"', default: '"start"', description: 'Alignment relative to the trigger.' },
    ],
    examples: [],
    skeleton: {
      componentName: 'DsPopoverSkeleton',
      examples: [{ label: 'Default', props: {} }],
    },
    accessibility: [
      'role="dialog" on the floating panel.',
      'Click outside closes.',
    ],
  },

  /* ── DatePicker ── */
  {
    slug: 'date-picker',
    componentName: 'DsDatePicker',
    displayName: 'DatePicker',
    description: 'A date input that opens a Calendar in a popover. Supports min/max and a configurable date format.',
    category: 'Form',
    defaultProps: { placeholder: 'Pick a date', format: 'DD/MM/YYYY' },
    controls: [
      { name: 'placeholder', label: 'Placeholder', type: 'text', default: 'Pick a date' },
      { name: 'format', label: 'Format', type: 'select', options: ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'], default: 'DD/MM/YYYY' },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false },
    ],
    propDefs: [
      { name: 'modelValue', type: 'Date | null', default: 'null', description: 'Selected date (v-model).' },
      { name: 'placeholder', type: 'string', default: '"Pick a date"', description: 'Placeholder text.' },
      { name: 'format', type: 'string', default: '"DD/MM/YYYY"', description: 'Display format using YYYY MM DD tokens.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
      { name: 'min', type: 'Date', default: '–', description: 'Minimum selectable date.' },
      { name: 'max', type: 'Date', default: '–', description: 'Maximum selectable date.' },
    ],
    examples: [],
    skeleton: {
      componentName: 'DsDatePickerSkeleton',
      examples: [{ label: 'Default', props: {} }],
    },
    accessibility: [
      'Button trigger with aria-expanded.',
      'Calendar is keyboard navigable.',
      'Clear button has aria-label.',
    ],
  },

  /* ── Toggle ── */
  {
    slug: 'toggle',
    componentName: 'DsToggle',
    displayName: 'Toggle',
    description: 'A pressable button that maintains an on/off state. Lighter than Switch, designed for toolbars and filters.',
    category: 'Actions',
    defaultProps: { modelValue: false, variant: 'outline', size: 'md' },
    controls: [
      { name: 'modelValue', label: 'Pressed', type: 'boolean', default: false },
      { name: 'variant', label: 'Variant', type: 'select', options: ['outline', 'ghost'], default: 'outline' },
      { name: 'size', label: 'Size', type: 'select', options: ['sm', 'md', 'lg'], default: 'md' },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false },
    ],
    propDefs: [
      { name: 'modelValue', type: 'boolean', default: 'false', description: 'Pressed state (v-model).' },
      { name: 'variant', type: '"outline" | "ghost"', default: '"outline"', description: 'Visual style.' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Size.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the toggle.' },
    ],
    defaultSlot: 'Bold',
    examples: [
      { label: 'Outline', props: { modelValue: false, variant: 'outline' } },
      { label: 'Ghost', props: { modelValue: false, variant: 'ghost' } },
      { label: 'Active', props: { modelValue: true, variant: 'outline' } },
    ],
    skeleton: {
      componentName: 'DsToggleSkeleton',
      examples: [
        { label: 'Small', props: { size: 'sm' } },
        { label: 'Medium', props: { size: 'md' } },
        { label: 'Large', props: { size: 'lg' } },
      ],
    },
    accessibility: [
      'role="switch" with aria-pressed state.',
      'Keyboard activatable.',
      'Focus visible ring.',
    ],
  },

  /* ── ToggleGroup ── */
  {
    slug: 'toggle-group',
    componentName: 'DsToggleGroup',
    displayName: 'ToggleGroup',
    description: 'A group of Toggle buttons for single or multiple selection. Ideal for view switchers and filter bars.',
    category: 'Actions',
    defaultProps: { modelValue: 'list', type: 'single', size: 'md' },
    controls: [
      { name: 'type', label: 'Type', type: 'select', options: ['single', 'multiple'], default: 'single' },
      { name: 'size', label: 'Size', type: 'select', options: ['sm', 'md', 'lg'], default: 'md' },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false },
    ],
    propDefs: [
      { name: 'modelValue', type: 'string | string[]', default: '–', description: 'Selected value(s) (v-model).' },
      { name: 'items', type: 'DsToggleGroupItem[]', default: '–', description: 'Items: { value, label, disabled? }', required: true },
      { name: 'type', type: '"single" | "multiple"', default: '"single"', description: 'Selection mode.' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Size.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all items.' },
    ],
    examples: [],
    skeleton: {
      componentName: 'DsToggleGroupSkeleton',
      examples: [
        { label: '3 items', props: { count: 3 } },
        { label: '4 items', props: { count: 4 } },
      ],
    },
    accessibility: [
      'role="group" on the container.',
      'role="switch" + aria-pressed on each item.',
    ],
  },

  /* ── DataTable ── */
  {
    slug: 'data-table',
    componentName: 'DsDataTable',
    displayName: 'DataTable',
    description: 'An enhanced table with built-in column sorting, full-text search, and pagination.',
    category: 'Data',
    defaultProps: { searchable: true, striped: false, compact: false, perPage: 5 },
    controls: [
      { name: 'searchable', label: 'Searchable', type: 'boolean', default: true },
      { name: 'striped', label: 'Striped', type: 'boolean', default: false },
      { name: 'compact', label: 'Compact', type: 'boolean', default: false },
    ],
    propDefs: [
      { name: 'columns', type: 'DataTableColumn[]', default: '–', description: 'Column definitions: { key, label, sortable?, align?, format? }', required: true },
      { name: 'rows', type: 'Record<string, unknown>[]', default: '–', description: 'Data rows.', required: true },
      { name: 'searchable', type: 'boolean', default: 'true', description: 'Show search bar.' },
      { name: 'striped', type: 'boolean', default: 'false', description: 'Alternating row colors.' },
      { name: 'compact', type: 'boolean', default: 'false', description: 'Reduced row padding.' },
      { name: 'perPage', type: 'number', default: '10', description: 'Rows per page.' },
    ],
    examples: [],
    skeleton: {
      componentName: 'DsDataTableSkeleton',
      examples: [
        { label: 'Default (5 rows)', props: { rows: 5, columns: 4 } },
        { label: 'Compact (3 rows)', props: { rows: 3, columns: 3 } },
      ],
    },
    accessibility: [
      'Proper <table> semantics with <th> and <td>.',
      'Sort buttons have clear visual direction indicators.',
    ],
  },

  /* ── HoverCard ── */
  {
    slug: 'hover-card',
    componentName: 'DsHoverCard',
    displayName: 'HoverCard',
    description: 'A rich floating card triggered on hover. Perfect for user profile previews or link previews.',
    category: 'Display',
    defaultProps: { side: 'bottom', align: 'start', openDelay: 200 },
    controls: [
      { name: 'side', label: 'Side', type: 'select', options: ['top', 'bottom', 'left', 'right'], default: 'bottom' },
      { name: 'align', label: 'Align', type: 'select', options: ['start', 'center', 'end'], default: 'start' },
    ],
    propDefs: [
      { name: 'side', type: '"top" | "bottom" | "left" | "right"', default: '"bottom"', description: 'Preferred side.' },
      { name: 'align', type: '"start" | "center" | "end"', default: '"start"', description: 'Alignment relative to trigger.' },
      { name: 'openDelay', type: 'number', default: '200', description: 'Delay in ms before opening.' },
      { name: 'closeDelay', type: 'number', default: '100', description: 'Delay in ms before closing.' },
    ],
    examples: [],
    skeleton: {
      componentName: 'DsHoverCardSkeleton',
      examples: [{ label: 'Default', props: {} }],
    },
    accessibility: [
      'role="tooltip" on the card.',
      'Delay prevents accidental triggers.',
    ],
  },

  /* ── Carousel ── */
  {
    slug: 'carousel',
    componentName: 'DsCarousel',
    displayName: 'Carousel',
    description: 'A responsive slide carousel with arrow controls, dot indicators, autoplay, and loop support.',
    category: 'Display',
    defaultProps: { count: 3, arrows: true, dots: true, autoplay: false, loop: true },
    controls: [
      { name: 'arrows', label: 'Arrows', type: 'boolean', default: true },
      { name: 'dots', label: 'Dots', type: 'boolean', default: true },
      { name: 'autoplay', label: 'Autoplay', type: 'boolean', default: false },
      { name: 'loop', label: 'Loop', type: 'boolean', default: true },
    ],
    propDefs: [
      { name: 'count', type: 'number', default: '1', description: 'Number of slides (matches slot children).' },
      { name: 'arrows', type: 'boolean', default: 'true', description: 'Show prev/next buttons.' },
      { name: 'dots', type: 'boolean', default: 'true', description: 'Show dot indicators.' },
      { name: 'autoplay', type: 'boolean', default: 'false', description: 'Auto-advance slides.' },
      { name: 'interval', type: 'number', default: '4000', description: 'Autoplay interval in ms.' },
      { name: 'loop', type: 'boolean', default: 'true', description: 'Loop back to start.' },
    ],
    examples: [],
    skeleton: {
      componentName: 'DsCarouselSkeleton',
      examples: [{ label: 'Default', props: {} }],
    },
    accessibility: [
      'Arrow buttons have aria-label.',
      'Dot buttons have aria-label and aria-current.',
      'Respects prefers-reduced-motion.',
    ],
  },

  /* ── ScrollArea ── */
  {
    slug: 'scroll-area',
    componentName: 'DsScrollArea',
    displayName: 'ScrollArea',
    description: 'A container with a custom thin scrollbar styled using design tokens. Supports vertical, horizontal, and both directions.',
    category: 'Display',
    defaultProps: { orientation: 'vertical', maxHeight: '200px' },
    controls: [
      { name: 'orientation', label: 'Orientation', type: 'select', options: ['vertical', 'horizontal', 'both'], default: 'vertical' },
      { name: 'maxHeight', label: 'Max Height', type: 'text', default: '200px' },
    ],
    propDefs: [
      { name: 'maxHeight', type: 'string', default: '–', description: 'CSS value for max-height.' },
      { name: 'maxWidth', type: 'string', default: '–', description: 'CSS value for max-width.' },
      { name: 'orientation', type: '"vertical" | "horizontal" | "both"', default: '"vertical"', description: 'Scroll direction.' },
    ],
    examples: [],
    skeleton: {
      componentName: 'DsScrollAreaSkeleton',
      examples: [{ label: 'Default', props: {} }],
    },
    accessibility: [
      'Native scroll — accessible by default.',
      'Custom scrollbar is purely cosmetic.',
    ],
  },

  /* ── FileUpload ── */
  {
    slug: 'file-upload',
    componentName: 'DsFileUpload',
    displayName: 'FileUpload',
    description: 'A drag-and-drop file upload zone with file type validation, size limits, and a file list.',
    category: 'Form',
    defaultProps: { multiple: false },
    controls: [
      { name: 'multiple', label: 'Multiple', type: 'boolean', default: false },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false },
    ],
    propDefs: [
      { name: 'modelValue', type: 'File[]', default: '[]', description: 'Selected files (v-model).' },
      { name: 'accept', type: 'string', default: '–', description: 'Accepted file types (MIME or extensions).' },
      { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow multiple files.' },
      { name: 'maxSize', type: 'number', default: '–', description: 'Max file size in bytes.' },
      { name: 'maxFiles', type: 'number', default: '–', description: 'Max number of files.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the drop zone.' },
    ],
    examples: [],
    skeleton: {
      componentName: 'DsFileUploadSkeleton',
      examples: [{ label: 'Default', props: {} }],
    },
    accessibility: [
      'Drag zone has role="button" with tabindex.',
      'Keyboard: Enter or Space opens file picker.',
      'Error messages are displayed inline.',
    ],
  },

  /* ── ColorPicker ── */
  {
    slug: 'color-picker',
    componentName: 'DsColorPicker',
    displayName: 'ColorPicker',
    description: 'A color selection component with swatches and a hex input. Triggers the native color picker on click.',
    category: 'Form',
    defaultProps: { modelValue: '#7f00ff', showInput: true },
    controls: [
      { name: 'showInput', label: 'Show hex input', type: 'boolean', default: true },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false },
    ],
    propDefs: [
      { name: 'modelValue', type: 'string', default: '"#7f00ff"', description: 'Selected hex color (v-model).' },
      { name: 'swatches', type: 'string[]', default: '16 default colors', description: 'Array of hex color strings.' },
      { name: 'showInput', type: 'boolean', default: 'true', description: 'Show the hex input + native picker.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all interactions.' },
    ],
    examples: [],
    skeleton: {
      componentName: 'DsColorPickerSkeleton',
      examples: [{ label: 'Default', props: {} }],
    },
    accessibility: [
      'Swatches have aria-pressed state.',
      'Native color input is visually hidden but accessible.',
      'Title attribute shows hex value.',
    ],
  },

  /* ── PhoneInput ── */
  {
    slug: 'phone-input',
    componentName: 'DsPhoneInput',
    displayName: 'PhoneInput',
    description: 'An international phone number input with a searchable country code selector.',
    category: 'Form',
    defaultProps: { placeholder: '6 00 00 00 00' },
    controls: [
      { name: 'placeholder', label: 'Placeholder', type: 'text', default: '6 00 00 00 00' },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false },
    ],
    propDefs: [
      { name: 'modelValue', type: 'string', default: '""', description: 'Full phone number with dial code (v-model).' },
      { name: 'placeholder', type: 'string', default: '"6 00 00 00 00"', description: 'Placeholder for the number input.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
    ],
    examples: [],
    skeleton: {
      componentName: 'DsPhoneInputSkeleton',
      examples: [{ label: 'Default', props: {} }],
    },
    accessibility: [
      'Country selector has aria-expanded.',
      'Country list is keyboard navigable.',
      'type="tel" on the phone input.',
    ],
  },

  /* ── LineChart ── */
  {
    slug: 'line-chart',
    componentName: 'DsLineChart',
    displayName: 'LineChart',
    description: 'An SVG line chart with multi-series support, area fill, hover tooltips, and a legend. Zero dependencies.',
    category: 'Charts',
    defaultProps: { showArea: false, showDots: true, showGrid: true, showLegend: true, height: 240 },
    controls: [
      { name: 'showArea', label: 'Area fill', type: 'boolean', default: false },
      { name: 'showDots', label: 'Show dots', type: 'boolean', default: true },
      { name: 'showGrid', label: 'Show grid', type: 'boolean', default: true },
      { name: 'showLegend', label: 'Show legend', type: 'boolean', default: true },
    ],
    propDefs: [
      { name: 'labels', type: 'string[]', default: '–', description: 'X-axis labels.', required: true },
      { name: 'datasets', type: 'DsLineChartDataset[]', default: '–', description: 'Each dataset: { label, data, color? }.', required: true },
      { name: 'showArea', type: 'boolean', default: 'false', description: 'Fill the area below lines.' },
      { name: 'showDots', type: 'boolean', default: 'true', description: 'Render dots at data points.' },
      { name: 'showGrid', type: 'boolean', default: 'true', description: 'Render horizontal grid lines.' },
      { name: 'showLegend', type: 'boolean', default: 'true', description: 'Show legend for multiple datasets.' },
      { name: 'height', type: 'number', default: '240', description: 'Chart height in pixels.' },
    ],
    examples: [],
    skeleton: {
      componentName: 'DsLineChartSkeleton',
      examples: [
        { label: 'Default', props: { height: 240 } },
      ],
    },
    accessibility: ['Pure SVG — screen-reader friendly with descriptive tooltip text.'],
  },

  /* ── BarChart ── */
  {
    slug: 'bar-chart',
    componentName: 'DsBarChart',
    displayName: 'BarChart',
    description: 'An SVG bar chart with grouped multi-series, grid, hover tooltips, optional value labels, and a legend.',
    category: 'Charts',
    defaultProps: { showGrid: true, showValues: false, showLegend: true, grouped: true, height: 240 },
    controls: [
      { name: 'showGrid', label: 'Show grid', type: 'boolean', default: true },
      { name: 'showValues', label: 'Show values', type: 'boolean', default: false },
      { name: 'showLegend', label: 'Show legend', type: 'boolean', default: true },
      { name: 'grouped', label: 'Grouped', type: 'boolean', default: true },
    ],
    propDefs: [
      { name: 'labels', type: 'string[]', default: '–', description: 'X-axis labels.', required: true },
      { name: 'datasets', type: 'DsBarChartDataset[]', default: '–', description: 'Each dataset: { label, data, color? }.', required: true },
      { name: 'showGrid', type: 'boolean', default: 'true', description: 'Horizontal grid lines.' },
      { name: 'showValues', type: 'boolean', default: 'false', description: 'Display value above each bar.' },
      { name: 'showLegend', type: 'boolean', default: 'true', description: 'Legend for multiple datasets.' },
      { name: 'grouped', type: 'boolean', default: 'true', description: 'Group datasets side by side.' },
      { name: 'height', type: 'number', default: '240', description: 'Chart height.' },
    ],
    examples: [],
    skeleton: {
      componentName: 'DsBarChartSkeleton',
      examples: [
        { label: 'Default (6 bars)', props: { bars: 6, height: 240 } },
      ],
    },
    accessibility: ['Hover tooltip shows exact values for screen content.'],
  },

  /* ── DonutChart ── */
  {
    slug: 'donut-chart',
    componentName: 'DsDonutChart',
    displayName: 'DonutChart',
    description: 'An SVG donut (or pie) chart with hover highlights, percentage legend, and a center total label.',
    category: 'Charts',
    defaultProps: { thickness: 28, radius: 70, showLegend: true, showTotal: true, totalLabel: 'Total', size: 200 },
    controls: [
      { name: 'showLegend', label: 'Show legend', type: 'boolean', default: true },
      { name: 'showTotal', label: 'Show total', type: 'boolean', default: true },
      { name: 'thickness', label: 'Thickness', type: 'number', default: 28 },
    ],
    propDefs: [
      { name: 'data', type: 'DsDonutChartItem[]', default: '–', description: 'Each item: { label, value, color? }.', required: true },
      { name: 'thickness', type: 'number', default: '28', description: 'Ring thickness in SVG units. 0 = pie chart.' },
      { name: 'radius', type: 'number', default: '70', description: 'Outer radius in SVG units.' },
      { name: 'showLegend', type: 'boolean', default: 'true', description: 'Show legend with percentages.' },
      { name: 'showTotal', type: 'boolean', default: 'true', description: 'Show total in center.' },
      { name: 'totalLabel', type: 'string', default: '"Total"', description: 'Center sub-label text.' },
      { name: 'size', type: 'number', default: '200', description: 'Rendered size in pixels.' },
    ],
    examples: [],
    skeleton: {
      componentName: 'DsDonutChartSkeleton',
      examples: [
        { label: 'Default', props: { size: 160 } },
      ],
    },
    accessibility: ['Hover tooltip shows label, value and percentage.'],
  },

  /* ── Sparkline ── */
  {
    slug: 'sparkline',
    componentName: 'DsSparkline',
    displayName: 'Sparkline',
    description: 'A minimal inline chart for KPI cards, tables, and dashboards. Supports line and bar types.',
    category: 'Charts',
    defaultProps: { type: 'line', color: '#7f00ff', showArea: true, width: 100, height: 36, showValue: false, trendColor: false },
    controls: [
      { name: 'type', label: 'Type', type: 'select', options: ['line', 'bar'], default: 'line' },
      { name: 'showArea', label: 'Area fill', type: 'boolean', default: true },
      { name: 'showValue', label: 'Show value', type: 'boolean', default: false },
      { name: 'trendColor', label: 'Trend color', type: 'boolean', default: false },
    ],
    propDefs: [
      { name: 'data', type: 'number[]', default: '–', description: 'Array of numeric values.', required: true },
      { name: 'type', type: '"line" | "bar"', default: '"line"', description: 'Chart type.' },
      { name: 'color', type: 'string', default: '"#7f00ff"', description: 'Stroke/fill color.' },
      { name: 'showArea', type: 'boolean', default: 'true', description: 'Fill area under line.' },
      { name: 'width', type: 'number', default: '100', description: 'Width in pixels.' },
      { name: 'height', type: 'number', default: '36', description: 'Height in pixels.' },
      { name: 'showValue', type: 'boolean', default: 'false', description: 'Show last value as text.' },
      { name: 'trendColor', type: 'boolean', default: 'false', description: 'Auto-color: green if up, red if down.' },
    ],
    examples: [],
    skeleton: {
      componentName: 'DsSparklineSkeleton',
      examples: [
        { label: 'Default', props: { width: 100, height: 36 } },
        { label: 'With value', props: { width: 100, height: 36, showValue: true } },
      ],
    },
    accessibility: ['Decorative SVG — add aria-hidden="true" when used purely for visual trend.'],
  },

  /* ── Drawer ── */
  {
    slug: 'drawer',
    componentName: 'DsDrawer',
    displayName: 'Drawer',
    description: 'A compound side drawer that slides in from any edge. Composed of DsDrawerHeader, DsDrawerContent and DsDrawerFooter sub-components for a structured layout.',
    category: 'Overlay',
    defaultProps: { side: 'right', size: 'md' },
    controls: [
      { name: 'side', label: 'Side', type: 'select', options: ['left', 'right', 'bottom', 'top'], default: 'right' },
      { name: 'size', label: 'Size', type: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'], default: 'md' },
    ],
    propDefs: [
      { name: 'modelValue', type: 'boolean', default: 'false', description: 'Controls the open/closed state. Use v-model.' },
      { name: 'side', type: '"left" | "right" | "bottom" | "top"', default: '"right"', description: 'Edge from which the drawer slides in.' },
      { name: 'size', type: '"sm" | "md" | "lg" | "xl" | "full"', default: '"md"', description: 'Width (left/right) or height (top/bottom) of the drawer.' },
      { name: 'class', type: 'string', default: '–', description: 'Additional CSS classes for the panel.' },
    ],
    examples: [],
    skeleton: {
      componentName: 'DsDrawerSkeleton',
      examples: [
        { label: 'Default (right)', props: {} },
        { label: 'With more rows', props: { rows: 6 } },
      ],
    },
    accessibility: [
      'role="dialog" and aria-modal="true" are set on the overlay container.',
      'Pressing Escape closes the drawer.',
      'Clicking the backdrop closes the drawer.',
      'Focus is managed — trap focus inside the drawer when open.',
      'The close button has an aria-label="Close drawer".',
    ],
  },

  // ─── Combobox ────────────────────────────────────────────────────────────
  {
    slug: 'combobox',
    componentName: 'DsCombobox',
    displayName: 'Combobox',
    description: 'A searchable select with built-in filter. Ideal for long option lists.',
    category: 'Form',
    defaultProps: { options: [], placeholder: 'Select an option…', size: 'md' },
    controls: [
      { name: 'placeholder', label: 'Placeholder', type: 'text', default: 'Select an option…' },
      { name: 'size', label: 'Size', type: 'select', options: ['sm', 'md', 'lg'], default: 'md' },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false },
      { name: 'clearable', label: 'Clearable', type: 'boolean', default: false },
    ],
    propDefs: [
      { name: 'modelValue', type: 'string', default: 'undefined', description: 'Selected value (v-model).' },
      { name: 'options', type: 'DsComboboxOption[]', default: '[]', description: 'Options list { label, value, disabled? }.' },
      { name: 'placeholder', type: 'string', default: '"Select an option…"', description: 'Placeholder text when nothing is selected.' },
      { name: 'searchPlaceholder', type: 'string', default: '"Search…"', description: 'Placeholder for the search field.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the component.' },
      { name: 'clearable', type: 'boolean', default: 'false', description: 'Show a button to clear the selection.' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Size of the component.' },
    ],
    examples: [],
    skeleton: { componentName: 'DsComboboxSkeleton', examples: [{ label: 'Default', props: {} }] },
    accessibility: [
      'aria-haspopup="listbox" and aria-expanded are managed on the trigger.',
      'Options have role="option" with aria-selected.',
      'Keyboard navigation supported (Escape closes the list).',
    ],
  },

  // ─── MultiSelect ─────────────────────────────────────────────────────────
  {
    slug: 'multi-select',
    componentName: 'DsMultiSelect',
    displayName: 'MultiSelect',
    description: 'Multiple selection with chips for each chosen option.',
    category: 'Form',
    defaultProps: { options: [], placeholder: 'Select options…' },
    controls: [
      { name: 'placeholder', label: 'Placeholder', type: 'text', default: 'Select options…' },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false },
    ],
    propDefs: [
      { name: 'modelValue', type: 'string[]', default: '[]', description: 'Selected values (v-model).' },
      { name: 'options', type: 'DsMultiSelectOption[]', default: '[]', description: 'Options list.' },
      { name: 'placeholder', type: 'string', default: '"Select options…"', description: 'Placeholder.' },
      { name: 'max', type: 'number', default: 'undefined', description: 'Maximum number of selections.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the component.' },
    ],
    examples: [],
    skeleton: { componentName: 'DsMultiSelectSkeleton', examples: [{ label: 'Default', props: {} }] },
    accessibility: [
      'Each selection chip has a remove button with aria-label.',
      'Keyboard navigation: Escape closes the list.',
    ],
  },

  // ─── TagInput ────────────────────────────────────────────────────────────
  {
    slug: 'tag-input',
    componentName: 'DsTagInput',
    displayName: 'TagInput',
    description: 'Input that creates tags/labels as you type.',
    category: 'Form',
    defaultProps: { placeholder: 'Add tag…' },
    controls: [
      { name: 'placeholder', label: 'Placeholder', type: 'text', default: 'Add tag…' },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false },
      { name: 'allowDuplicates', label: 'Allow duplicates', type: 'boolean', default: false },
    ],
    propDefs: [
      { name: 'modelValue', type: 'string[]', default: '[]', description: 'Current tags (v-model).' },
      { name: 'placeholder', type: 'string', default: '"Add tag…"', description: 'Input placeholder.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the component.' },
      { name: 'max', type: 'number', default: 'undefined', description: 'Maximum number of tags.' },
      { name: 'allowDuplicates', type: 'boolean', default: 'false', description: 'Allow duplicate tags.' },
    ],
    examples: [],
    skeleton: { componentName: 'DsTagInputSkeleton', examples: [{ label: 'Default', props: {} }] },
    accessibility: [
      'Press Enter to add a tag.',
      'Backspace on empty input removes the last tag.',
      'Each tag has a remove button with aria-label.',
    ],
  },

  // ─── AvatarGroup ─────────────────────────────────────────────────────────
  {
    slug: 'avatar-group',
    componentName: 'DsAvatarGroup',
    displayName: 'AvatarGroup',
    description: 'Stacked group of avatars with an overflow counter.',
    category: 'Display',
    defaultProps: { max: 4, size: 'md' },
    controls: [
      { name: 'size', label: 'Size', type: 'select', options: ['xs', 'sm', 'md', 'lg'], default: 'md' },
      { name: 'max', label: 'Max visible', type: 'number', default: 4 },
    ],
    propDefs: [
      { name: 'items', type: 'DsAvatarGroupItem[]', default: '[]', description: 'Avatar list { src?, alt?, initials? }.' },
      { name: 'max', type: 'number', default: '4', description: 'Maximum number of avatars displayed before the overflow counter.' },
      { name: 'size', type: '"xs" | "sm" | "md" | "lg"', default: '"md"', description: 'Avatar size.' },
    ],
    examples: [],
    skeleton: { componentName: 'DsAvatarGroupSkeleton', examples: [{ label: 'Default (4)', props: { count: 4 } }, { label: 'Large (6)', props: { count: 6 } }] },
    accessibility: [
      'Each avatar has a title attribute for the name.',
    ],
  },

  // ─── DateRangePicker ─────────────────────────────────────────────────────
  {
    slug: 'date-range-picker',
    componentName: 'DsDateRangePicker',
    displayName: 'DateRangePicker',
    description: 'Date range selector with two side-by-side calendars.',
    category: 'Form',
    defaultProps: { placeholder: 'Pick a date range' },
    controls: [
      { name: 'placeholder', label: 'Placeholder', type: 'text', default: 'Pick a date range' },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false },
    ],
    propDefs: [
      { name: 'modelValue', type: '{ start: Date | null, end: Date | null }', default: '{ start: null, end: null }', description: 'Selected range (v-model).' },
      { name: 'placeholder', type: 'string', default: '"Pick a date range"', description: 'Placeholder text when nothing is selected.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the component.' },
    ],
    examples: [],
    skeleton: { componentName: 'DsDateRangePickerSkeleton', examples: [{ label: 'Default', props: {} }] },
    accessibility: [
      'Clicking outside the calendar closes it.',
      'Keyboard navigation supported.',
    ],
  },

  // ─── TimePicker ──────────────────────────────────────────────────────────
  {
    slug: 'time-picker',
    componentName: 'DsTimePicker',
    displayName: 'TimePicker',
    description: 'Time picker with 12h or 24h format, optional seconds.',
    category: 'Form',
    defaultProps: { format: '24', placeholder: '--:--' },
    controls: [
      { name: 'format', label: 'Format', type: 'select', options: ['12', '24'], default: '24' },
      { name: 'showSeconds', label: 'Show seconds', type: 'boolean', default: false },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false },
    ],
    propDefs: [
      { name: 'modelValue', type: 'string', default: 'undefined', description: 'HH:MM or HH:MM:SS value (v-model).' },
      { name: 'format', type: '"12" | "24"', default: '"24"', description: 'Display format.' },
      { name: 'showSeconds', type: 'boolean', default: 'false', description: 'Show the seconds input.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the component.' },
    ],
    examples: [],
    skeleton: { componentName: 'DsTimePickerSkeleton', examples: [{ label: 'Default', props: {} }] },
    accessibility: [
      'Each hour/minute/second spinner is a native number input.',
      'Escape or outside click closes the picker.',
    ],
  },

  // ─── StatusBadge ─────────────────────────────────────────────────────────
  {
    slug: 'status-badge',
    componentName: 'DsStatusBadge',
    displayName: 'StatusBadge',
    description: 'Badge with colored status indicator (online, offline, busy, away, pending).',
    category: 'Display',
    defaultProps: { status: 'online', showLabel: true, pulse: false, size: 'md' },
    controls: [
      { name: 'status', label: 'Status', type: 'select', options: ['online', 'offline', 'busy', 'away', 'pending'], default: 'online' },
      { name: 'size', label: 'Size', type: 'select', options: ['sm', 'md', 'lg'], default: 'md' },
      { name: 'showLabel', label: 'Show label', type: 'boolean', default: true },
      { name: 'pulse', label: 'Pulse animation', type: 'boolean', default: false },
    ],
    propDefs: [
      { name: 'status', type: '"online" | "offline" | "busy" | "away" | "pending"', default: '"online"', description: 'Status displayed.' },
      { name: 'label', type: 'string', default: 'auto', description: 'Custom label (overrides the default status label).' },
      { name: 'showLabel', type: 'boolean', default: 'true', description: 'Show or hide the label.' },
      { name: 'pulse', type: 'boolean', default: 'false', description: 'Ping animation for online status.' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Size.' },
    ],
    examples: [
      { label: 'Online', props: { status: 'online', showLabel: true } },
      { label: 'Offline', props: { status: 'offline', showLabel: true } },
      { label: 'Busy', props: { status: 'busy', showLabel: true } },
      { label: 'Away', props: { status: 'away', showLabel: true } },
      { label: 'Pending', props: { status: 'pending', showLabel: true } },
      { label: 'Pulse animation', props: { status: 'online', pulse: true } },
      { label: 'Dot only', props: { status: 'online', showLabel: false } },
    ],
    skeleton: { componentName: 'DsStatusBadgeSkeleton', examples: [{ label: 'Default', props: {} }] },
    accessibility: ['The color dot is purely decorative (implicitly aria-hidden). The text label carries the information.'],
  },

  // ─── NotificationItem ────────────────────────────────────────────────────
  {
    slug: 'notification-item',
    componentName: 'DsNotificationItem',
    displayName: 'NotificationItem',
    description: 'Notification list item with avatar, title, description, and timestamp.',
    category: 'Display',
    defaultProps: { title: 'New message', description: 'You have a new message from Alice.', time: '2 min ago', read: false, avatarInitials: 'AL' },
    controls: [
      { name: 'title', label: 'Title', type: 'text', default: 'New message' },
      { name: 'description', label: 'Description', type: 'text', default: 'You have a new message from Alice.' },
      { name: 'time', label: 'Time', type: 'text', default: '2 min ago' },
      { name: 'read', label: 'Read', type: 'boolean', default: false },
    ],
    propDefs: [
      { name: 'title', type: 'string', default: 'undefined', description: 'Notification title.' },
      { name: 'description', type: 'string', default: 'undefined', description: 'Description / content.' },
      { name: 'time', type: 'string', default: 'undefined', description: 'Timestamp displayed.' },
      { name: 'read', type: 'boolean', default: 'false', description: 'Indicates whether the notification has been read (no blue dot).' },
      { name: 'avatarSrc', type: 'string', default: 'undefined', description: 'Avatar image URL.' },
      { name: 'avatarInitials', type: 'string', default: 'undefined', description: 'Initials if no image is provided.' },
    ],
    examples: [
      { label: 'Unread', props: { title: 'New message', description: 'You have a new message from Alice.', time: '2 min ago', read: false, avatarInitials: 'AL' } },
      { label: 'Read', props: { title: 'Pull request merged', description: 'feat/ui-components has been merged into main.', time: '1h ago', read: true, avatarInitials: 'GH' } },
    ],
    skeleton: { componentName: 'DsNotificationItemSkeleton', examples: [{ label: 'Default (3 items)', props: { count: 3 } }] },
    accessibility: [
      'role="listitem" on each notification.',
      'The dismiss button has an aria-label.',
    ],
  },

  // ─── Banner ──────────────────────────────────────────────────────────────
  {
    slug: 'banner',
    componentName: 'DsBanner',
    displayName: 'Banner',
    description: 'Dismissible announcement bar, ideal for global messages at the top of the page.',
    category: 'Overlay',
    defaultProps: { variant: 'info', dismissible: true },
    controls: [
      { name: 'variant', label: 'Variant', type: 'select', options: ['default', 'info', 'success', 'warning', 'danger'], default: 'info' },
      { name: 'dismissible', label: 'Dismissible', type: 'boolean', default: true },
    ],
    propDefs: [
      { name: 'variant', type: '"default" | "info" | "success" | "warning" | "danger"', default: '"info"', description: 'Color and icon of the banner.' },
      { name: 'dismissible', type: 'boolean', default: 'true', description: 'Show the close button.' },
    ],
    examples: [
      { label: 'Info', props: { variant: 'info', dismissible: true }, slot: 'New version 2.0 is available. Read the changelog.' },
      { label: 'Warning', props: { variant: 'warning', dismissible: true }, slot: 'Your subscription expires in 3 days.' },
      { label: 'Success', props: { variant: 'success', dismissible: false }, slot: 'Your account has been verified.' },
      { label: 'Danger', props: { variant: 'danger', dismissible: true }, slot: 'Critical security update required.' },
    ],
    skeleton: { componentName: 'DsBannerSkeleton', examples: [{ label: 'Default', props: {} }] },
    accessibility: [
      'role="alert" to announce the message to screen readers.',
      'The dismiss button has aria-label="Dismiss".',
    ],
  },

  // ─── ConfirmDialog ───────────────────────────────────────────────────────
  {
    slug: 'confirm-dialog',
    componentName: 'DsConfirmDialog',
    displayName: 'ConfirmDialog',
    description: 'Simplified confirmation dialog with danger or primary variant.',
    category: 'Overlay',
    defaultProps: { title: 'Are you sure?', description: 'This action cannot be undone.', confirmLabel: 'Confirm', cancelLabel: 'Cancel', variant: 'danger' },
    controls: [
      { name: 'title', label: 'Title', type: 'text', default: 'Are you sure?' },
      { name: 'description', label: 'Description', type: 'text', default: 'This action cannot be undone.' },
      { name: 'variant', label: 'Variant', type: 'select', options: ['danger', 'primary'], default: 'danger' },
      { name: 'confirmLabel', label: 'Confirm label', type: 'text', default: 'Confirm' },
      { name: 'cancelLabel', label: 'Cancel label', type: 'text', default: 'Cancel' },
    ],
    propDefs: [
      { name: 'modelValue', type: 'boolean', default: 'false', description: 'Controls the open/closed state (v-model).' },
      { name: 'title', type: 'string', default: '"Are you sure?"', description: 'Dialog title.' },
      { name: 'description', type: 'string', default: '"This action cannot be undone."', description: 'Description.' },
      { name: 'confirmLabel', type: 'string', default: '"Confirm"', description: 'Label for the confirm button.' },
      { name: 'cancelLabel', type: 'string', default: '"Cancel"', description: 'Label for the cancel button.' },
      { name: 'variant', type: '"danger" | "primary"', default: '"danger"', description: 'Color of the confirm button.' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Loading state during confirmation.' },
    ],
    examples: [],
    skeleton: { componentName: 'DsConfirmDialogSkeleton', examples: [{ label: 'Default', props: {} }] },
    accessibility: [
      'role="alertdialog" and aria-modal="true".',
      'Escape closes the dialog.',
      'Clicking the backdrop cancels.',
    ],
  },

  // ─── LoadingOverlay ──────────────────────────────────────────────────────
  {
    slug: 'loading-overlay',
    componentName: 'DsLoadingOverlay',
    displayName: 'LoadingOverlay',
    description: 'Loading overlay that overlays its parent content.',
    category: 'Overlay',
    defaultProps: { visible: false, blur: true },
    controls: [
      { name: 'visible', label: 'Visible', type: 'boolean', default: false },
      { name: 'label', label: 'Label', type: 'text', default: 'Loading…' },
      { name: 'blur', label: 'Blur backdrop', type: 'boolean', default: true },
    ],
    propDefs: [
      { name: 'visible', type: 'boolean', default: 'false', description: 'Show or hide the overlay.' },
      { name: 'label', type: 'string', default: 'undefined', description: 'Text displayed below the spinner.' },
      { name: 'blur', type: 'boolean', default: 'true', description: 'Apply a blur effect to the content below.' },
    ],
    examples: [],
    skeleton: { componentName: 'DsLoadingOverlaySkeleton', examples: [{ label: 'Default', props: {} }] },
    accessibility: [
      'aria-busy="true" and aria-live="polite" indicate loading state.',
    ],
  },

  // ─── NavigationMenu ──────────────────────────────────────────────────────
  {
    slug: 'navigation-menu',
    componentName: 'DsNavigationMenu',
    displayName: 'NavigationMenu',
    description: 'Horizontal navigation menu with dropdown sub-menus.',
    category: 'Navigation',
    defaultProps: { items: [] },
    controls: [],
    propDefs: [
      { name: 'items', type: 'DsNavMenuItem[]', default: '[]', description: 'Navigation items { label, href?, description?, children? }.' },
    ],
    examples: [],
    skeleton: { componentName: 'DsNavigationMenuSkeleton', examples: [{ label: 'Default', props: {} }] },
    accessibility: [
      'Keyboard navigation supported.',
      'Sub-menus open on hover or click.',
    ],
  },

  // ─── Menubar ─────────────────────────────────────────────────────────────
  {
    slug: 'menubar',
    componentName: 'DsMenubar',
    displayName: 'Menubar',
    description: 'Desktop application-style menu bar (File / Edit / View…).',
    category: 'Navigation',
    defaultProps: { menus: [] },
    controls: [],
    propDefs: [
      { name: 'menus', type: 'DsMenubarMenu[]', default: '[]', description: 'List of menus { label, items[] }. Each item: { label, shortcut?, disabled?, separator?, action? }.' },
    ],
    examples: [],
    skeleton: { componentName: 'DsMenubarSkeleton', examples: [{ label: 'Default', props: {} }] },
    accessibility: [
      'Escape closes the open menu.',
      'Click outside closes the menu.',
      'Keyboard shortcuts are displayed to the right of each item.',
    ],
  },

  // ─── CodeBlock ───────────────────────────────────────────────────────────
  {
    slug: 'code-block',
    componentName: 'DsCodeBlock',
    displayName: 'CodeBlock',
    description: 'Code block with syntax highlighting, line numbers, and a copy button.',
    category: 'Display',
    defaultProps: { language: 'typescript', copyable: true, showLineNumbers: false },
    controls: [
      { name: 'language', label: 'Language', type: 'text', default: 'typescript' },
      { name: 'filename', label: 'Filename', type: 'text', default: '' },
      { name: 'showLineNumbers', label: 'Line numbers', type: 'boolean', default: false },
      { name: 'copyable', label: 'Copyable', type: 'boolean', default: true },
    ],
    propDefs: [
      { name: 'code', type: 'string', default: '""', description: 'Code to display.' },
      { name: 'language', type: 'string', default: '"plaintext"', description: 'Language for syntax highlighting (e.g. typescript, vue, bash).' },
      { name: 'filename', type: 'string', default: 'undefined', description: 'Filename displayed in the header.' },
      { name: 'showLineNumbers', type: 'boolean', default: 'false', description: 'Show line numbers.' },
      { name: 'copyable', type: 'boolean', default: 'true', description: 'Show the Copy button.' },
    ],
    examples: [],
    skeleton: { componentName: 'DsCodeBlockSkeleton', examples: [{ label: 'Default (6 lines)', props: {} }, { label: 'Short (3 lines)', props: { lines: 3 } }] },
    accessibility: [
      'The Copy button has a visible label "Copy" / "Copied".',
    ],
  },

  // ─── TreeView ────────────────────────────────────────────────────────────
  {
    slug: 'tree-view',
    componentName: 'DsTreeView',
    displayName: 'TreeView',
    description: 'Interactive hierarchical tree with expand/collapse and selection.',
    category: 'Display',
    defaultProps: { nodes: [] },
    controls: [],
    propDefs: [
      { name: 'nodes', type: 'DsTreeNode[]', default: '[]', description: 'Nodes { id, label, children?, disabled? }. Recursive.' },
      { name: 'selected', type: 'string', default: 'undefined', description: 'ID of the selected node.' },
    ],
    examples: [],
    skeleton: { componentName: 'DsTreeViewSkeleton', examples: [{ label: 'Default', props: {} }] },
    accessibility: [
      'role="tree" on the container, role="treeitem" on each node.',
      'aria-expanded reflects the expand/collapse state of folders.',
    ],
  },

  // ─── VisuallyHidden ──────────────────────────────────────────────────────
  {
    slug: 'visually-hidden',
    componentName: 'DsVisuallyHidden',
    displayName: 'VisuallyHidden',
    description: 'Hides content visually while keeping it accessible to screen readers.',
    category: 'Utilities',
    defaultProps: {},
    controls: [],
    propDefs: [],
    examples: [
      { label: 'Screen reader label', props: {}, slot: 'Submit form' },
    ],
    accessibility: [
      'Content is hidden with CSS but remains in the DOM for screen readers.',
      'Use for supplemental labels that would be redundant visually.',
    ],
  },

  // ─── AspectRatio ─────────────────────────────────────────────────────────
  {
    slug: 'aspect-ratio',
    componentName: 'DsAspectRatio',
    displayName: 'AspectRatio',
    description: 'Wrapper that maintains a fixed width/height ratio for its content.',
    category: 'Display',
    defaultProps: { ratio: 1.777 },
    controls: [
      { name: 'ratio', label: 'Ratio (width/height)', type: 'number', default: 1.777 },
    ],
    propDefs: [
      { name: 'ratio', type: 'number', default: '16/9', description: 'Width/height ratio (e.g. 16/9 = 1.777, 1/1 = 1, 4/3 = 1.333).' },
    ],
    examples: [],
    accessibility: ['Purely structural component, no accessibility impact.'],
  },

  // ─── RadarChart ──────────────────────────────────────────────────────────
  {
    slug: 'radar-chart',
    componentName: 'DsRadarChart',
    displayName: 'RadarChart',
    description: 'SVG radar / spider web chart, zero dependencies.',
    category: 'Charts',
    defaultProps: { data: [], color: '#7f00ff', size: 280, showLabels: true, showGrid: true },
    controls: [
      { name: 'color', label: 'Color', type: 'color', default: '#7f00ff' },
      { name: 'size', label: 'Size (px)', type: 'number', default: 280 },
      { name: 'showLabels', label: 'Show labels', type: 'boolean', default: true },
      { name: 'showGrid', label: 'Show grid', type: 'boolean', default: true },
    ],
    propDefs: [
      { name: 'data', type: 'DsRadarChartAxis[]', default: '[]', description: 'Axes { label, value (0-100) }.' },
      { name: 'color', type: 'string', default: '"#7f00ff"', description: 'Main chart color.' },
      { name: 'size', type: 'number', default: '280', description: 'SVG size in pixels.' },
      { name: 'showLabels', type: 'boolean', default: 'true', description: 'Show axis labels.' },
      { name: 'showGrid', type: 'boolean', default: 'true', description: 'Show the background grid.' },
    ],
    examples: [],
    skeleton: { componentName: 'DsRadarChartSkeleton', examples: [{ label: 'Default', props: {} }] },
    accessibility: [
      'SVG with aria-hidden="true" and role="img".',
      'Provide a description via aria-label or aria-labelledby on the parent container.',
    ],
  },

  /* ── AreaChart ── */
  {
    slug: 'area-chart',
    componentName: 'DsAreaChart',
    displayName: 'Area Chart',
    description: 'Gradient area chart. Supports multiple series, stacked mode, and interactive tooltips.',
    category: 'Charts',
    defaultProps: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        { label: 'Revenue', data: [4000, 3000, 5000, 2780, 1890, 6390], color: '#7f00ff' },
        { label: 'Expenses', data: [2400, 1398, 9800, 3908, 4800, 3800], color: '#06b6d4' },
      ],
      showGrid: true,
      showLegend: true,
      stacked: false,
      height: 240,
    },
    controls: [
      { name: 'showGrid', label: 'Show Grid', type: 'boolean', default: true },
      { name: 'showLegend', label: 'Show Legend', type: 'boolean', default: true },
      { name: 'showDots', label: 'Show Dots', type: 'boolean', default: false },
      { name: 'stacked', label: 'Stacked', type: 'boolean', default: false },
      { name: 'height', label: 'Height (px)', type: 'number', default: 240 },
    ],
    propDefs: [
      { name: 'labels', type: 'string[]', required: true, description: 'X-axis labels.' },
      { name: 'datasets', type: 'DsAreaChartDataset[]', required: true, description: 'Data series.' },
      { name: 'showGrid', type: 'boolean', default: 'true', description: 'Show the grid.' },
      { name: 'showDots', type: 'boolean', default: 'false', description: 'Show data points.' },
      { name: 'showLegend', type: 'boolean', default: 'true', description: 'Show the legend.' },
      { name: 'stacked', type: 'boolean', default: 'false', description: 'Stacked area mode.' },
      { name: 'height', type: 'number', default: '240', description: 'Chart height in px.' },
    ],
    examples: [
      {
        label: 'Single series',
        props: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{ label: 'Visitors', data: [1200, 1900, 1400, 2200, 1800, 2800], color: '#7f00ff' }],
          height: 200,
        },
      },
      {
        label: 'Stacked',
        props: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [
            { label: 'Product A', data: [3000, 4000, 3500, 5000], color: '#7f00ff' },
            { label: 'Product B', data: [2000, 2500, 3000, 2800], color: '#06b6d4' },
            { label: 'Product C', data: [1000, 1500, 1200, 1800], color: '#22c55e' },
          ],
          stacked: true,
          height: 220,
        },
      },
    ],
    skeleton: { componentName: 'DsAreaChartSkeleton', examples: [{ label: 'Default', props: {} }] },
    accessibility: [
      'SVG chart with accessible hover tooltip.',
      'Use aria-label on the container to describe the chart.',
    ],
  },

  /* ── GaugeChart ── */
  {
    slug: 'gauge-chart',
    componentName: 'DsGaugeChart',
    displayName: 'Gauge Chart',
    description: 'Animated circular SVG gauge. Ideal for displaying a KPI, a progress indicator, or a bounded metric.',
    category: 'Charts',
    defaultProps: { value: 72, min: 0, max: 100, label: 'Score', size: 180, showValue: true, showMinMax: true },
    controls: [
      { name: 'value', label: 'Value', type: 'number', default: 72 },
      { name: 'min', label: 'Min', type: 'number', default: 0 },
      { name: 'max', label: 'Max', type: 'number', default: 100 },
      { name: 'label', label: 'Label', type: 'text', default: 'Score' },
      { name: 'size', label: 'Size (px)', type: 'number', default: 180 },
      { name: 'showValue', label: 'Show Value', type: 'boolean', default: true },
      { name: 'showMinMax', label: 'Show Min/Max', type: 'boolean', default: true },
      { name: 'thickness', label: 'Thickness', type: 'number', default: 14 },
      { name: 'color', label: 'Color', type: 'color', default: '#7f00ff' },
    ],
    propDefs: [
      { name: 'value', type: 'number', required: true, description: 'Current value.' },
      { name: 'min', type: 'number', default: '0', description: 'Minimum value.' },
      { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
      { name: 'label', type: 'string', description: 'Label displayed below the value.' },
      { name: 'unit', type: 'string', description: 'Suffix (e.g. %, °C).' },
      { name: 'size', type: 'number', default: '180', description: 'SVG size in px.' },
      { name: 'color', type: 'string', description: 'Gauge color (default: violet).' },
      { name: 'showValue', type: 'boolean', default: 'true', description: 'Display the value in the center.' },
      { name: 'showMinMax', type: 'boolean', default: 'true', description: 'Display min/max values.' },
      { name: 'thickness', type: 'number', default: '14', description: 'Arc thickness.' },
    ],
    examples: [
      { label: 'CPU Usage', props: { value: 45, label: 'CPU', unit: '%', size: 160 } },
      { label: 'High value', props: { value: 93, label: 'Performance', color: '#22c55e', size: 160 } },
      { label: 'Warning', props: { value: 81, label: 'Memory', color: '#f97316', size: 160 } },
      { label: 'Custom range', props: { value: 1400, min: 0, max: 2000, label: 'RPM', size: 160 } },
    ],
    skeleton: { componentName: 'DsGaugeChartSkeleton', examples: [{ label: 'Default', props: {} }] },
    accessibility: [
      'SVG with role="img" and dynamic aria-label.',
      'The value is also visible as text for screen readers.',
    ],
  },

  /* ── NumberTicker ── */
  {
    slug: 'number-ticker',
    componentName: 'DsNumberTicker',
    displayName: 'Number Ticker',
    description: 'Animated counter that interpolates to a target value. Ideal for displaying statistics or KPIs.',
    category: 'Display',
    defaultProps: { value: 12345, duration: 1200, decimals: 0, prefix: '', suffix: '', easing: 'ease-out' },
    controls: [
      { name: 'value', label: 'Value', type: 'number', default: 12345 },
      { name: 'duration', label: 'Duration (ms)', type: 'number', default: 1200 },
      { name: 'decimals', label: 'Decimals', type: 'number', default: 0 },
      { name: 'prefix', label: 'Prefix', type: 'text', default: '' },
      { name: 'suffix', label: 'Suffix', type: 'text', default: '' },
      { name: 'easing', label: 'Easing', type: 'select', options: ['linear', 'ease-out', 'ease-in-out'], default: 'ease-out' },
    ],
    propDefs: [
      { name: 'value', type: 'number', required: true, description: 'Target value.' },
      { name: 'duration', type: 'number', default: '1200', description: 'Animation duration (ms).' },
      { name: 'decimals', type: 'number', default: '0', description: 'Number of decimal places.' },
      { name: 'prefix', type: 'string', description: 'Prefix (e.g. $, €).' },
      { name: 'suffix', type: 'string', description: 'Suffix (e.g. %, k).' },
      { name: 'separator', type: 'string', default: '","', description: 'Thousands separator.' },
      { name: 'easing', type: "'linear' | 'ease-out' | 'ease-in-out'", default: '"ease-out"', description: 'Easing curve.' },
    ],
    examples: [
      { label: 'Revenue', props: { value: 98432, prefix: '$', duration: 1500 }, description: 'Counter with currency prefix.' },
      { label: 'Percentage', props: { value: 94.5, decimals: 1, suffix: '%', duration: 800 }, description: 'Decimal value with suffix.' },
      { label: 'Linear', props: { value: 1000, easing: 'linear', duration: 2000 }, description: 'Linear animation.' },
    ],
    skeleton: { componentName: 'DsNumberTickerSkeleton', examples: [{ label: 'Default', props: {} }] },
    accessibility: [
      'The text is directly readable by screen readers.',
      'Respects prefers-reduced-motion: if enabled, the value is displayed instantly.',
    ],
  },

  /* ── Resizable ── */
  {
    slug: 'resizable',
    componentName: 'DsResizable',
    displayName: 'Resizable',
    description: 'Resizable panel via a drag-and-drop separator. Supports horizontal and vertical orientations.',
    category: 'Layout',
    defaultProps: { direction: 'horizontal', initialSize: 50, minSize: 15, maxSize: 85 },
    controls: [
      { name: 'direction', label: 'Direction', type: 'select', options: ['horizontal', 'vertical'], default: 'horizontal' },
      { name: 'initialSize', label: 'Initial size (%)', type: 'number', default: 50 },
      { name: 'minSize', label: 'Min size (%)', type: 'number', default: 15 },
      { name: 'maxSize', label: 'Max size (%)', type: 'number', default: 85 },
    ],
    propDefs: [
      { name: 'direction', type: "'horizontal' | 'vertical'", default: '"horizontal"', description: 'Separator orientation.' },
      { name: 'initialSize', type: 'number', default: '50', description: 'Initial size of panel A (%).' },
      { name: 'minSize', type: 'number', default: '15', description: 'Minimum size of panel A (%).' },
      { name: 'maxSize', type: 'number', default: '85', description: 'Maximum size of panel A (%).' },
    ],
    examples: [
      { label: 'Horizontal', props: { direction: 'horizontal', initialSize: 40 } },
      { label: 'Vertical', props: { direction: 'vertical', initialSize: 40 } },
    ],
    skeleton: { componentName: 'DsResizableSkeleton', examples: [{ label: 'Default', props: {} }] },
    accessibility: [
      'The separator has role="separator" with aria-orientation, aria-valuenow, aria-valuemin, and aria-valuemax.',
      'Supports mouse drag and touch on mobile.',
    ],
  },

  /* ── VirtualList ── */
  {
    slug: 'virtual-list',
    componentName: 'DsVirtualList',
    displayName: 'Virtual List',
    description: 'Virtualized list: only visible elements are rendered in the DOM. Optimal performance for large collections.',
    category: 'Data',
    defaultProps: { items: [], itemHeight: 56, containerHeight: 300, overscan: 3 },
    controls: [
      { name: 'itemHeight', label: 'Item height (px)', type: 'number', default: 56 },
      { name: 'containerHeight', label: 'Container height (px)', type: 'number', default: 300 },
      { name: 'overscan', label: 'Overscan', type: 'number', default: 3 },
    ],
    propDefs: [
      { name: 'items', type: 'T[]', required: true, description: 'Array of data to virtualize.' },
      { name: 'itemHeight', type: 'number', required: true, description: 'Fixed height of each item (px).' },
      { name: 'containerHeight', type: 'number', default: '400', description: 'Height of the scrollable container (px).' },
      { name: 'overscan', type: 'number', default: '3', description: 'Number of additional items rendered outside the viewport.' },
      { name: 'keyField', type: 'string', description: 'Field used as unique key.' },
    ],
    examples: [],
    skeleton: { componentName: 'DsVirtualListSkeleton', examples: [{ label: 'Default', props: {} }] },
    accessibility: [
      'Use aria-rowcount and aria-rowindex on items to indicate position in the total list.',
      'Add role="list" on the container and role="listitem" on each item.',
    ],
  },

  /* ── Kanban ── */
  {
    slug: 'kanban',
    componentName: 'DsKanban',
    displayName: 'Kanban',
    description: 'Kanban board with drag-and-drop columns and cards. Supports priorities, tags, and column customization.',
    category: 'Data',
    defaultProps: {
      draggable: true,
      columns: [
        {
          id: 'todo',
          title: 'To Do',
          color: '#94a3b8',
          cards: [
            { id: '1', title: 'Design new landing page', description: 'Create wireframes and mockups', tags: ['design', 'ui'], priority: 'high' },
            { id: '2', title: 'Set up CI/CD pipeline', tags: ['devops'], priority: 'medium' },
          ],
        },
        {
          id: 'in-progress',
          title: 'In Progress',
          color: '#7f00ff',
          cards: [
            { id: '3', title: 'Implement auth module', description: 'JWT + refresh token', tags: ['backend', 'auth'], priority: 'high' },
          ],
        },
        {
          id: 'done',
          title: 'Done',
          color: '#22c55e',
          cards: [
            { id: '4', title: 'Database schema', tags: ['backend'], priority: 'low' },
            { id: '5', title: 'Project setup', tags: ['setup'], priority: 'low' },
          ],
        },
      ],
    },
    controls: [
      { name: 'draggable', label: 'Draggable', type: 'boolean', default: true },
    ],
    propDefs: [
      { name: 'columns', type: 'DsKanbanColumn[]', required: true, description: 'Board columns.' },
      { name: 'draggable', type: 'boolean', default: 'true', description: 'Enable drag-and-drop.' },
    ],
    examples: [],
    skeleton: { componentName: 'DsKanbanSkeleton', examples: [{ label: 'Default', props: {} }] },
    accessibility: [
      'Drag-and-drop is keyboard accessible via move buttons.',
      'Each column has an aria label and cards have appropriate roles.',
    ],
  },

  /* ── QRCode ── */
  {
    slug: 'qr-code',
    componentName: 'DsQRCode',
    displayName: 'QR Code',
    description: 'Dependency-free SVG QR code generator. Implements ISO 18004 standard versions 1–6, ECC level L (up to 134 bytes).',
    category: 'Display',
    defaultProps: { value: 'https://dds.dev', size: 180, quiet: 2 },
    controls: [
      { name: 'value', label: 'Value', type: 'text', default: 'https://dds.dev' },
      { name: 'size', label: 'Size (px)', type: 'number', default: 180 },
      { name: 'quiet', label: 'Quiet zone', type: 'number', default: 2 },
      { name: 'foreground', label: 'Foreground', type: 'color', default: 'currentColor' },
      { name: 'label', label: 'Label', type: 'text', default: '' },
    ],
    propDefs: [
      { name: 'value', type: 'string', required: true, description: 'Text/URL to encode (max 134 bytes for V6-L).' },
      { name: 'size', type: 'number', default: '200', description: 'Rendered SVG size in pixels.' },
      { name: 'moduleSize', type: 'number', default: '8', description: 'Size of each module (cell) in px.' },
      { name: 'foreground', type: 'string', default: '"currentColor"', description: 'Color of dark modules.' },
      { name: 'background', type: 'string', default: '"transparent"', description: 'Background color.' },
      { name: 'quiet', type: 'number', default: '2', description: 'Quiet zone size (modules).' },
      { name: 'label', type: 'string', description: 'Text displayed below the QR code.' },
    ],
    examples: [
      { label: 'URL', props: { value: 'https://dds.dev', size: 160, label: 'dds.dev' } },
      { label: 'Short text', props: { value: 'Hello, DDS!', size: 160 } },
      { label: 'Custom colors', props: { value: 'DDS Design', size: 160, foreground: '#7f00ff', background: '#f0e6ff' } },
    ],
    skeleton: { componentName: 'DsQRCodeSkeleton', examples: [{ label: 'Default', props: {} }] },
    accessibility: [
      'SVG with role="img" and aria-label describing the content.',
      'Always provide a label or alternative text near the QR code.',
    ],
  },

  /* ── CopyButton ── */
  {
    slug: 'copy-button',
    componentName: 'DsCopyButton',
    displayName: 'Copy Button',
    description: 'Button that copies text to the clipboard with animated visual feedback. Uses the Clipboard API with fallback.',
    category: 'Display',
    defaultProps: { text: 'npm install design-system-antoinegourgue', label: 'Copy', successLabel: 'Copied!', variant: 'outline', size: 'md' },
    controls: [
      { name: 'text', label: 'Text to copy', type: 'text', default: 'npm install design-system-antoinegourgue' },
      { name: 'label', label: 'Label', type: 'text', default: 'Copy' },
      { name: 'successLabel', label: 'Success label', type: 'text', default: 'Copied!' },
      { name: 'variant', label: 'Variant', type: 'select', options: ['default', 'ghost', 'outline'], default: 'outline' },
      { name: 'size', label: 'Size', type: 'select', options: ['sm', 'md', 'lg'], default: 'md' },
    ],
    propDefs: [
      { name: 'text', type: 'string', required: true, description: 'Text to copy to the clipboard.' },
      { name: 'label', type: 'string', default: '"Copy"', description: 'Button label.' },
      { name: 'successLabel', type: 'string', default: '"Copied!"', description: 'Label after successful copy.' },
      { name: 'variant', type: "'default' | 'ghost' | 'outline'", default: '"outline"', description: 'Visual style.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: '"md"', description: 'Button size.' },
      { name: 'timeout', type: 'number', default: '1800', description: 'Duration to display success state (ms).' },
    ],
    examples: [
      { label: 'Ghost', props: { text: 'Hello world', variant: 'ghost', label: 'Copy snippet' } },
      { label: 'Small', props: { text: 'Copy me', size: 'sm' } },
      { label: 'Large', props: { text: 'Large button text', size: 'lg', variant: 'default' } },
    ],
    skeleton: { componentName: 'DsCopyButtonSkeleton', examples: [{ label: 'Default', props: {} }] },
    accessibility: [
      'aria-label is dynamically updated (copied state vs. normal).',
      'Visual feedback (checkmark icon + green color) is paired with a label change.',
    ],
  },

  /* ── FormField ── */
  {
    slug: 'form-field',
    componentName: 'DsFormField',
    displayName: 'Form Field',
    description: 'Form field wrapper: label, description, animated error message. Provides context (id, error, disabled) to child components.',
    category: 'Form',
    defaultProps: { label: 'Email address', description: 'We will never share your email.', error: '', required: false, disabled: false },
    controls: [
      { name: 'label', label: 'Label', type: 'text', default: 'Email address' },
      { name: 'description', label: 'Description', type: 'text', default: 'We will never share your email.' },
      { name: 'error', label: 'Error message', type: 'text', default: '' },
      { name: 'required', label: 'Required', type: 'boolean', default: false },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false },
      { name: 'orientation', label: 'Orientation', type: 'select', options: ['vertical', 'horizontal'], default: 'vertical' },
    ],
    propDefs: [
      { name: 'label', type: 'string', description: 'Label displayed above the field.' },
      { name: 'description', type: 'string', description: 'Helper text displayed below the label.' },
      { name: 'error', type: 'string', description: 'Error message (shows error state on the field).' },
      { name: 'required', type: 'boolean', default: 'false', description: 'Mark the field as required.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the field.' },
      { name: 'id', type: 'string', description: 'Custom ID (auto-generated if not provided).' },
      { name: 'orientation', type: "'vertical' | 'horizontal'", default: '"vertical"', description: 'Label / input layout.' },
    ],
    examples: [
      { label: 'With error', props: { label: 'Username', error: 'This username is already taken.', required: true } },
      { label: 'Horizontal', props: { label: 'Full name', description: 'As it appears on your ID.', orientation: 'horizontal' } },
      { label: 'Disabled', props: { label: 'API Key', description: 'Read-only.', disabled: true } },
    ],
    skeleton: { componentName: 'DsFormFieldSkeleton', examples: [{ label: 'Default', props: {} }, { label: 'With description', props: { showDescription: true } }] },
    accessibility: [
      'The label is linked to the field via htmlFor/for.',
      'The error message has role="alert" to announce it to screen readers.',
      'The ID is auto-generated if not provided.',
    ],
  },

  /* ── FloatingActionButton ── */
  {
    slug: 'floating-action-button',
    componentName: 'DsFloatingActionButton',
    displayName: 'Floating Action Button',
    description: 'Floating Action Button (FAB). Supports a speed dial mode with animated secondary actions.',
    category: 'Layout',
    defaultProps: { label: 'Add item', size: 'md', variant: 'primary', fixed: false, actions: [] },
    controls: [
      { name: 'label', label: 'Label', type: 'text', default: 'Add item' },
      { name: 'size', label: 'Size', type: 'select', options: ['sm', 'md', 'lg'], default: 'md' },
      { name: 'variant', label: 'Variant', type: 'select', options: ['primary', 'secondary', 'ghost'], default: 'primary' },
      { name: 'fixed', label: 'Fixed position', type: 'boolean', default: false },
    ],
    propDefs: [
      { name: 'label', type: 'string', default: '"Open actions"', description: 'Aria-label for the button.' },
      { name: 'position', type: "'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'", default: '"bottom-right"', description: 'Position in the corner.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: '"md"', description: 'Button size.' },
      { name: 'variant', type: "'primary' | 'secondary' | 'ghost'", default: '"primary"', description: 'Visual style.' },
      { name: 'actions', type: 'DsFabAction[]', default: '[]', description: 'Speed dial actions (empty = emits click).' },
      { name: 'fixed', type: 'boolean', default: 'true', description: 'Fixed position (vs. absolute).' },
    ],
    examples: [
      { label: 'Simple', props: { label: 'Create', size: 'md', variant: 'primary', fixed: false } },
      { label: 'Secondary', props: { size: 'md', variant: 'secondary', fixed: false } },
      { label: 'Small', props: { size: 'sm', fixed: false } },
    ],
    skeleton: { componentName: 'DsFloatingActionButtonSkeleton', examples: [{ label: 'Default', props: {} }] },
    accessibility: [
      'aria-label describes the main action.',
      'aria-expanded indicates the open state of the speed dial.',
      'Secondary actions each have their own aria-label.',
    ],
  },

  /* ── VerticalNav ── */
  {
    slug: 'vertical-nav',
    componentName: 'DsVerticalNav',
    displayName: 'Vertical Nav',
    description: 'Vertical sidebar navigation with groups, icons, badges, and sub-menus. Supports collapsed mode.',
    category: 'Navigation',
    defaultProps: {
      activeId: 'dashboard',
      collapsed: false,
      groups: [
        {
          id: 'main',
          title: 'Main',
          items: [
            { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
            { id: 'analytics', label: 'Analytics', badge: 'New', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
            { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
          ],
        },
        {
          id: 'content',
          title: 'Content',
          items: [
            { id: 'posts', label: 'Posts', badge: 12, icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
            { id: 'users', label: 'Users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', disabled: true },
          ],
        },
      ],
    },
    controls: [
      { name: 'activeId', label: 'Active item ID', type: 'text', default: 'dashboard' },
      { name: 'collapsed', label: 'Collapsed', type: 'boolean', default: false },
    ],
    propDefs: [
      { name: 'groups', type: 'DsVerticalNavGroup[]', required: true, description: 'Navigation groups.' },
      { name: 'activeId', type: 'string', description: 'ID of the active item.' },
      { name: 'collapsed', type: 'boolean', default: 'false', description: 'Collapsed mode (icons only).' },
    ],
    examples: [
      {
        label: 'Default',
        props: {
          activeId: 'dashboard',
          collapsed: false,
          groups: [
            {
              id: 'main',
              title: 'Main',
              items: [
                { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                { id: 'analytics', label: 'Analytics', badge: 'New', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
              ],
            },
            {
              id: 'content',
              title: 'Content',
              items: [
                { id: 'posts', label: 'Posts', badge: 12, icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                { id: 'users', label: 'Users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', disabled: true },
              ],
            },
          ],
        },
      },
      {
        label: 'Collapsed',
        props: {
          activeId: 'dashboard',
          collapsed: true,
          groups: [
            {
              id: 'main',
              title: 'Main',
              items: [
                { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                { id: 'analytics', label: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
              ],
            },
          ],
        },
      },
    ],
    skeleton: { componentName: 'DsVerticalNavSkeleton', examples: [{ label: 'Default', props: {} }] },
    accessibility: [
      '<nav> element with role="navigation".',
      'aria-current="page" on the active item.',
      'aria-disabled on disabled items.',
      'title displayed as tooltip in collapsed mode.',
    ],
  },
]

export function getComponentDoc(slug: string): ComponentDoc | undefined {
  return componentDocs.find(c => c.slug === slug)
}
