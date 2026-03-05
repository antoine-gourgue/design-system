import type { InjectionKey, Ref } from 'vue'

export interface DsTabsContext {
  activeTab: Ref<string>
  setActive: (id: string) => void
  variant: Ref<'line' | 'enclosed' | 'pills'>
}

export const DsTabsKey: InjectionKey<DsTabsContext> = Symbol('DsTabs')
