import {
  addComponent,
  addImports,
  createResolver,
  defineNuxtModule,
  installModule,
} from '@nuxt/kit'

export interface ModuleOptions {
  /**
   * Prefix for all registered components.
   * @default 'Ds'
   */
  prefix?: string

  /**
   * Register components globally (accessible without explicit import).
   * @default true
   */
  global?: boolean

  /**
   * Automatically inject the base CSS with design tokens.
   * Disable if you import it manually.
   * @default true
   */
  injectCSS?: boolean

  /**
   * Enable the Toast system composable (useToast).
   * @default true
   */
  toast?: boolean
}

const componentList = [
  // Primitives
  'DsIcon',
  'DsSeparator',
  'DsSpinner',
  // Button
  'DsButton',
  'DsButtonSkeleton',
  // Badge
  'DsBadge',
  'DsBadgeSkeleton',
  // Avatar
  'DsAvatar',
  'DsAvatarSkeleton',
  // Card family
  'DsCard',
  'DsCardHeader',
  'DsCardContent',
  'DsCardFooter',
  'DsCardSkeleton',
  // Form
  'DsLabel',
  'DsHelpText',
  'DsInput',
  'DsInputSkeleton',
  'DsTextarea',
  'DsTextareaSkeleton',
  'DsCheckbox',
  'DsCheckboxSkeleton',
  'DsSwitch',
  'DsSwitchSkeleton',
  'DsSelect',
  'DsSelectSkeleton',
  'DsRadioGroup',
  'DsRadioGroupSkeleton',
  'DsSlider',
  'DsSliderSkeleton',
  'DsNumberInput',
  'DsNumberInputSkeleton',
  'DsOtpInput',
  'DsOtpInputSkeleton',
  // Feedback
  'DsAlert',
  'DsAlertSkeleton',
  'DsProgress',
  'DsProgressSkeleton',
  'DsTooltip',
  'DsRating',
  'DsRatingSkeleton',
  // Display
  'DsTag',
  'DsTagSkeleton',
  'DsEmptyState',
  'DsEmptyStateSkeleton',
  'DsTimeline',
  'DsTimelineSkeleton',
  'DsStepper',
  'DsStepperSkeleton',
  // Overlay
  'DsModal',
  'DsSheet',
  'DsDrawer',
  'DsDrawerHeader',
  'DsDrawerContent',
  'DsDrawerFooter',
  'DsDrawerSkeleton',
  'DsCollapsible',
  'DsCommandPalette',
  'DsContextMenu',
  // Charts
  'DsLineChart',
  'DsLineChartSkeleton',
  'DsBarChart',
  'DsBarChartSkeleton',
  'DsDonutChart',
  'DsDonutChartSkeleton',
  'DsSparkline',
  'DsSparklineSkeleton',
  // New shadcn-inspired components
  'DsAlertDialog',
  'DsAlertDialogSkeleton',
  'DsPopover',
  'DsPopoverSkeleton',
  'DsDatePicker',
  'DsDatePickerSkeleton',
  'DsToggle',
  'DsToggleSkeleton',
  'DsToggleGroup',
  'DsToggleGroupSkeleton',
  'DsDataTable',
  'DsDataTableSkeleton',
  'DsHoverCard',
  'DsHoverCardSkeleton',
  'DsCarousel',
  'DsCarouselSlide',
  'DsCarouselSkeleton',
  'DsScrollArea',
  'DsScrollAreaSkeleton',
  'DsFileUpload',
  'DsFileUploadSkeleton',
  'DsColorPicker',
  'DsColorPickerSkeleton',
  'DsPhoneInput',
  'DsPhoneInputSkeleton',
  // Dropdown / Popover
  'DsDropdown',
  // Tabs
  'DsTabs',
  'DsTabList',
  'DsTab',
  'DsTabPanels',
  'DsTabPanel',
  'DsTabsSkeleton',
  // Accordion
  'DsAccordion',
  'DsAccordionItem',
  'DsAccordionSkeleton',
  // Navigation
  'DsBreadcrumb',
  'DsBreadcrumbSkeleton',
  // Toast
  'DsToastProvider',
  'DsToast',
  // Skeleton (generic)
  'DsSkeleton',
  // Data display
  'DsTable',
  'DsTableSkeleton',
  'DsStatCard',
  'DsStatCardSkeleton',
  // Calendar
  'DsCalendar',
  'DsCalendarSkeleton',
  // Pagination
  'DsPagination',
  'DsPaginationSkeleton',
  // Utilities
  'DsKbd',
  'DsAspectRatio',
  'DsVisuallyHidden',
  // New form components
  'DsCombobox',
  'DsComboboxSkeleton',
  'DsMultiSelect',
  'DsMultiSelectSkeleton',
  'DsTagInput',
  'DsTagInputSkeleton',
  'DsDateRangePicker',
  'DsDateRangePickerSkeleton',
  'DsTimePicker',
  'DsTimePickerSkeleton',
  // New display components
  'DsAvatarGroup',
  'DsAvatarGroupSkeleton',
  'DsStatusBadge',
  'DsStatusBadgeSkeleton',
  'DsNotificationItem',
  'DsNotificationItemSkeleton',
  'DsCodeBlock',
  'DsCodeBlockSkeleton',
  'DsTreeView',
  'DsTreeViewSkeleton',
  // New overlay/nav components
  'DsBanner',
  'DsBannerSkeleton',
  'DsConfirmDialog',
  'DsConfirmDialogSkeleton',
  'DsLoadingOverlay',
  'DsLoadingOverlaySkeleton',
  'DsNavigationMenu',
  'DsNavigationMenuSkeleton',
  'DsMenubar',
  'DsMenubarSkeleton',
  // Charts
  'DsRadarChart',
  'DsRadarChartSkeleton',
  // New components
  'DsAreaChart',
  'DsAreaChartSkeleton',
  'DsGaugeChart',
  'DsGaugeChartSkeleton',
  'DsNumberTicker',
  'DsNumberTickerSkeleton',
  'DsResizable',
  'DsResizableSkeleton',
  'DsVirtualList',
  'DsVirtualListSkeleton',
  'DsKanban',
  'DsKanbanSkeleton',
  'DsQRCode',
  'DsQRCodeSkeleton',
  'DsCopyButton',
  'DsCopyButtonSkeleton',
  'DsFormField',
  'DsFormFieldSkeleton',
  'DsFloatingActionButton',
  'DsFloatingActionButtonSkeleton',
  'DsVerticalNav',
  'DsVerticalNavSkeleton',
]

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'design-system-antoinegourgue',
    configKey: 'nuxtDs',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },

  defaults: {
    prefix: 'Ds',
    global: true,
    injectCSS: true,
    toast: true,
  },

  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    /* ── 1. Inject base CSS with design tokens ── */
    if (options.injectCSS) {
      nuxt.options.css.push(resolve('./runtime/assets/base.css'))
    }

    /* ── 2. Install icon module dependency ── */
    await installModule('@nuxt/icon')

    /* ── 3. Register components ── */
    const prefix = options.prefix ?? 'Ds'

    for (const componentName of componentList) {
      const baseName = componentName.replace(/^Ds/, '')
      const registeredName = `${prefix}${baseName}`

      addComponent({
        name: registeredName,
        filePath: resolve(`./runtime/components/${componentName}.vue`),
        global: options.global,
      })
    }

    /* ── 4. Auto-import utility functions ── */
    addImports([
      {
        name: 'cn',
        as: 'cn',
        from: resolve('./runtime/utils/cn'),
      },
    ])

    /* ── 5. Auto-import composables ── */
    if (options.toast) {
      addImports([
        {
          name: 'useToast',
          as: 'useToast',
          from: resolve('./runtime/composables/useToast'),
        },
      ])
    }

    /* ── 6. Expose version via runtimeConfig ── */
    nuxt.options.runtimeConfig.public.nuxtDs = {
      version: '0.5.0',
    }
  },
})
