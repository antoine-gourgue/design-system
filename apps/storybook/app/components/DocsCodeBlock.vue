<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  code: string
  language?: string
  filename?: string
}>()

const copied = ref(false)

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => { copied.value = false }, 1800)
  } catch {}
}

/** Syntax highlight for Vue/HTML template strings */
function highlight(raw: string): string {
  let out = raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

  // Comments
  out = out.replace(
    /(&lt;!--[\s\S]*?--&gt;)/g,
    '<span class="hl-comment">$1</span>',
  )
  // Closing tag names
  out = out.replace(
    /(&lt;\/)([A-Za-z][A-Za-z0-9-]*)(&gt;)/g,
    '$1<span class="hl-tag">$2</span>$3',
  )
  // Opening tag names
  out = out.replace(
    /(&lt;)([A-Za-z][A-Za-z0-9.-]*)(\s|\/&gt;|&gt;)/g,
    '$1<span class="hl-tag">$2</span>$3',
  )
  // v- directives
  out = out.replace(
    /\b(v-[\w:-]+)(?==)/g,
    '<span class="hl-directive">$1</span>',
  )
  // Shorthand binding :prop, @event, #slot
  out = out.replace(
    /\s([@:#][\w:-]+)(?==)/g,
    ' <span class="hl-shorthand">$1</span>',
  )
  // Static attribute names
  out = out.replace(
    /\s([a-zA-Z][\w-]*)(?==)/g,
    ' <span class="hl-attr">$1</span>',
  )
  // Attribute values "..."
  out = out.replace(
    /=(&quot;[^&]*&quot;)/g,
    '=<span class="hl-string">$1</span>',
  )
  // Self-closing />
  out = out.replace(/(\/&gt;)/g, '<span class="hl-tag">$1</span>')
  // Remaining > and <
  out = out.replace(/(&gt;)/g, '<span class="hl-tag">$1</span>')
  out = out.replace(/(&lt;)/g, '<span class="hl-tag">$1</span>')

  return out
}

const highlighted = computed(() =>
  props.language === 'bash' || props.language === 'shell'
    ? escapeHtml(props.code)
    : highlight(props.code),
)

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
</script>

<template>
  <div class="relative group rounded-ds-lg overflow-hidden border border-ds-border bg-[#0d0d0d]">
    <!-- Header bar -->
    <div class="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
      <span class="text-xs text-zinc-500 font-mono">
        {{ filename ?? language ?? 'vue' }}
      </span>
      <button
        type="button"
        class="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-500 rounded px-1.5 py-0.5"
        @click="copy"
      >
        <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="size-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        {{ copied ? 'Copied' : 'Copy' }}
      </button>
    </div>

    <!-- Code -->
    <pre class="px-4 py-4 overflow-x-auto text-sm leading-relaxed font-mono text-zinc-300 docs-code"><code v-html="highlighted" /></pre>
  </div>
</template>

<style>
.docs-code .hl-comment { color: #6b7280; font-style: italic; }
.docs-code .hl-tag { color: #60a5fa; }
.docs-code .hl-directive { color: #a78bfa; }
.docs-code .hl-shorthand { color: #38bdf8; }
.docs-code .hl-attr { color: #94a3b8; }
.docs-code .hl-string { color: #86efac; }
</style>
