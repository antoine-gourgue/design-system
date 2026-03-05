<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '../utils/cn'

export interface DsCodeBlockProps {
  code?: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  copyable?: boolean
  class?: string
}

const props = withDefaults(defineProps<DsCodeBlockProps>(), {
  code: '',
  language: 'plaintext',
  copyable: true,
  showLineNumbers: false,
})

const copied = ref(false)

async function copyCode() {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

const lines = computed(() => props.code.split('\n'))

function highlight(code: string): string {
  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/(\/\/.*$)/gm, '<span class="ds-token-comment">$1</span>')
    .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, '<span class="ds-token-string">$1</span>')
    .replace(/\b(const|let|var|function|return|import|export|from|if|else|for|while|class|interface|type|extends|implements|new|this|void|null|undefined|true|false|async|await|ref|computed|watch|defineProps|defineEmits|withDefaults)\b/g, '<span class="ds-token-keyword">$1</span>')
    .replace(/\b(\d+)\b/g, '<span class="ds-token-number">$1</span>')
}
</script>

<template>
  <div :class="cn('rounded-ds-xl overflow-hidden border border-ds-border bg-[#0f0f11] font-mono text-sm', props.class)">
    <div v-if="filename || language !== 'plaintext' || copyable" class="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/5">
      <span v-if="filename" class="text-xs text-white/50 font-sans">{{ filename }}</span>
      <span v-else-if="language !== 'plaintext'" class="text-xs text-white/30 font-sans uppercase tracking-wider">{{ language }}</span>
      <div class="flex-1"></div>
      <button
        v-if="copyable"
        type="button"
        :class="cn(
          'flex items-center gap-1.5 px-2.5 py-1 rounded-ds-sm text-xs font-sans transition-colors',
          copied ? 'bg-ds-success/20 text-ds-success' : 'text-white/50 hover:text-white hover:bg-white/10',
        )"
        @click="copyCode"
      >
        <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        {{ copied ? 'Copied' : 'Copy' }}
      </button>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <tbody>
          <tr v-for="(line, i) in lines" :key="i" class="hover:bg-white/[0.03] transition-colors">
            <td
              v-if="showLineNumbers"
              class="select-none text-right text-white/20 pr-4 pl-4 py-0 w-12 text-xs align-top pt-0.5"
            >
              {{ i + 1 }}
            </td>
            <td class="pl-4 pr-4 py-0 text-white/85 whitespace-pre align-top">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span v-html="highlight(line) || '&nbsp;'"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
:deep(.ds-token-keyword) { color: #c084fc; }
:deep(.ds-token-string) { color: #86efac; }
:deep(.ds-token-comment) { color: #71717a; font-style: italic; }
:deep(.ds-token-number) { color: #fb923c; }
</style>
