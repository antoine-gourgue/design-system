export interface NavItem {
  title: string
  href: string
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export const nav: NavGroup[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/' },
      { title: 'Installation', href: '/guide/installation' },
      { title: 'Theming', href: '/guide/theming' },
    ],
  },
  {
    title: 'Foundations',
    items: [
      { title: 'Colors', href: '/foundations/colors' },
      { title: 'Typography', href: '/foundations/typography' },
      { title: 'Tokens', href: '/foundations/tokens' },
    ],
  },
  {
    title: 'Actions',
    items: [
      { title: 'Button', href: '/components/button' },
      { title: 'Toggle', href: '/components/toggle' },
      { title: 'ToggleGroup', href: '/components/toggle-group' },
    ],
  },
  {
    title: 'Form',
    items: [
      { title: 'Checkbox', href: '/components/checkbox' },
      { title: 'ColorPicker', href: '/components/color-picker' },
      { title: 'Combobox', href: '/components/combobox' },
      { title: 'DatePicker', href: '/components/date-picker' },
      { title: 'DateRangePicker', href: '/components/date-range-picker' },
      { title: 'FileUpload', href: '/components/file-upload' },
      { title: 'HelpText', href: '/components/help-text' },
      { title: 'Input', href: '/components/input' },
      { title: 'Label', href: '/components/label' },
      { title: 'MultiSelect', href: '/components/multi-select' },
      { title: 'NumberInput', href: '/components/number-input' },
      { title: 'OTP Input', href: '/components/otp-input' },
      { title: 'PhoneInput', href: '/components/phone-input' },
      { title: 'RadioGroup', href: '/components/radio-group' },
      { title: 'Select', href: '/components/select' },
      { title: 'Slider', href: '/components/slider' },
      { title: 'Switch', href: '/components/switch' },
      { title: 'TagInput', href: '/components/tag-input' },
      { title: 'Textarea', href: '/components/textarea' },
      { title: 'TimePicker', href: '/components/time-picker' },
    ],
  },
  {
    title: 'Feedback',
    items: [
      { title: 'Alert', href: '/components/alert' },
      { title: 'AlertDialog', href: '/components/alert-dialog' },
      { title: 'Badge', href: '/components/badge' },
      { title: 'Progress', href: '/components/progress' },
      { title: 'Rating', href: '/components/rating' },
      { title: 'Spinner', href: '/components/spinner' },
      { title: 'Toast', href: '/components/toast' },
      { title: 'Tooltip', href: '/components/tooltip' },
    ],
  },
  {
    title: 'Display',
    items: [
      { title: 'AspectRatio', href: '/components/aspect-ratio' },
      { title: 'Avatar', href: '/components/avatar' },
      { title: 'AvatarGroup', href: '/components/avatar-group' },
      { title: 'Card', href: '/components/card' },
      { title: 'Carousel', href: '/components/carousel' },
      { title: 'CodeBlock', href: '/components/code-block' },
      { title: 'EmptyState', href: '/components/empty-state' },
      { title: 'HoverCard', href: '/components/hover-card' },
      { title: 'Kbd', href: '/components/kbd' },
      { title: 'NotificationItem', href: '/components/notification-item' },
      { title: 'ScrollArea', href: '/components/scroll-area' },
      { title: 'Separator', href: '/components/separator' },
      { title: 'Skeleton', href: '/components/skeleton' },
      { title: 'StatCard', href: '/components/stat-card' },
      { title: 'StatusBadge', href: '/components/status-badge' },
      { title: 'Tag', href: '/components/tag' },
      { title: 'Timeline', href: '/components/timeline' },
      { title: 'TreeView', href: '/components/tree-view' },
      { title: 'VisuallyHidden', href: '/components/visually-hidden' },
    ],
  },
  {
    title: 'Charts',
    items: [
      { title: 'BarChart', href: '/components/bar-chart' },
      { title: 'DonutChart', href: '/components/donut-chart' },
      { title: 'LineChart', href: '/components/line-chart' },
      { title: 'RadarChart', href: '/components/radar-chart' },
      { title: 'Sparkline', href: '/components/sparkline' },
    ],
  },
  {
    title: 'Data',
    items: [
      { title: 'Calendar', href: '/components/calendar' },
      { title: 'DataTable', href: '/components/data-table' },
      { title: 'Stepper', href: '/components/stepper' },
      { title: 'Table', href: '/components/table' },
    ],
  },
  {
    title: 'Navigation',
    items: [
      { title: 'Accordion', href: '/components/accordion' },
      { title: 'Breadcrumb', href: '/components/breadcrumb' },
      { title: 'Dropdown', href: '/components/dropdown' },
      { title: 'Menubar', href: '/components/menubar' },
      { title: 'NavigationMenu', href: '/components/navigation-menu' },
      { title: 'Pagination', href: '/components/pagination' },
      { title: 'Tabs', href: '/components/tabs' },
    ],
  },
  {
    title: 'Overlay',
    items: [
      { title: 'AlertDialog', href: '/components/alert-dialog' },
      { title: 'Banner', href: '/components/banner' },
      { title: 'Collapsible', href: '/components/collapsible' },
      { title: 'ConfirmDialog', href: '/components/confirm-dialog' },
      { title: 'Drawer', href: '/components/drawer' },
      { title: 'Command Palette', href: '/components/command-palette' },
      { title: 'Context Menu', href: '/components/context-menu' },
      { title: 'LoadingOverlay', href: '/components/loading-overlay' },
      { title: 'Modal', href: '/components/modal' },
      { title: 'Popover', href: '/components/popover' },
      { title: 'Sheet', href: '/components/sheet' },
    ],
  },
]

/** Flat list of all component nav items for prev/next navigation */
export const componentNavItems: NavItem[] = nav
  .flatMap(g => g.items)
