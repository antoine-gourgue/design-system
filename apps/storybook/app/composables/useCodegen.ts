/**
 * Generates Vue template code snippets from component props and slot content.
 */
export function useCodegen() {
  function generateCode(
    componentName: string,
    props: Record<string, unknown>,
    slot?: string,
    defaultProps?: Record<string, unknown>,
  ): string {
    const attrs = Object.entries(props)
      .filter(([, v]) => v !== undefined && v !== null && v !== '')
      .filter(([k, v]) => defaultProps ? v !== defaultProps[k] : true)
      .map(([key, value]) => {
        if (typeof value === 'boolean') {
          return value ? key : `:${key}="false"`
        }
        if (typeof value === 'number') {
          return `:${key}="${value}"`
        }
        if (typeof value === 'object') {
          return `:${key}='${JSON.stringify(value)}'`
        }
        return `${key}="${value}"`
      })

    const attrsStr = attrs.length > 0 ? ' ' + attrs.join('\n  ') : ''

    if (slot) {
      const multiline = attrs.length > 1
      if (multiline) {
        return `<${componentName}\n  ${attrs.join('\n  ')}\n>\n  ${slot}\n</${componentName}>`
      }
      return `<${componentName}${attrsStr}>\n  ${slot}\n</${componentName}>`
    }

    if (attrs.length > 1) {
      return `<${componentName}\n  ${attrs.join('\n  ')}\n/>`
    }
    return `<${componentName}${attrsStr} />`
  }

  return { generateCode }
}
