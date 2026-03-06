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
  // Step 1 — escape HTML entities
  let out = raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

  // Step 2 — collect all regions with a placeholder so later regexes
  // never re-process already-tagged content.
  // Placeholders use \x02 / \x03 which never appear in user code.
  const spans: string[] = []
  function wrap(cls: string, text: string): string {
    const idx = spans.length
    spans.push(`<span class="${cls}">${text}</span>`)
    return `\x02${idx}\x03`
  }

  // Comments
  out = out.replace(
    /(&lt;!--[\s\S]*?--&gt;)/g,
    (_, m) => wrap('hl-comment', m),
  )
  // Closing tag names: </Foo>
  out = out.replace(
    /(&lt;\/)([A-Za-z][A-Za-z0-9-]*)(&gt;)/g,
    (_, open, name, close) => wrap('hl-tag', open) + wrap('hl-tag', name) + wrap('hl-tag', close),
  )
  // Opening tag names: <Foo  or  <Foo>  or  <Foo/>
  out = out.replace(
    /(&lt;)([A-Za-z][A-Za-z0-9.-]*)(\s|\/&gt;|&gt;)/g,
    (_, lt, name, after) => wrap('hl-tag', lt) + wrap('hl-tag', name) + after,
  )
  // v- directives
  out = out.replace(
    /\b(v-[\w:-]+)(?==)/g,
    (_, m) => wrap('hl-directive', m),
  )
  // Shorthand bindings :prop, @event, #slot
  out = out.replace(
    /( )([@:#][\w:-]+)(?==)/g,
    (_, sp, m) => sp + wrap('hl-shorthand', m),
  )
  // Static attribute names (only outside already-wrapped placeholders)
  out = out.replace(
    /( )([a-zA-Z][\w-]*)(?==)/g,
    (_, sp, m) => sp + wrap('hl-attr', m),
  )
  // Attribute values "..."
  out = out.replace(
    /=(&quot;[^&\x02]*&quot;)/g,
    (_, v) => '=' + wrap('hl-string', v),
  )
  // Self-closing />
  out = out.replace(/(\/&gt;)/g, (_, m) => wrap('hl-tag', m))
  // Remaining &gt; and &lt;
  out = out.replace(/(&gt;)/g, (_, m) => wrap('hl-tag', m))
  out = out.replace(/(&lt;)/g, (_, m) => wrap('hl-tag', m))

  // Step 3 — restore all placeholders
  out = out.replace(/\x02(\d+)\x03/g, (_, i) => spans[Number(i)] ?? '')

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
