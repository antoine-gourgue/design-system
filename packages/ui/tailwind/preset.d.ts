import type { Config } from 'tailwindcss'

declare const dsPreset: Omit<Config, 'content'>
export = dsPreset
