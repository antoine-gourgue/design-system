export function resolveDsIconName(name: string): string {
  if (name.toLowerCase().startsWith('si:'))
    return `simple-icons:${name.slice(3)}`

  if (name.includes(':'))
    return name

  if (name.toLowerCase().startsWith('flag-'))
    return `flagpack:${name.slice(5).toLowerCase()}`

  return `lucide:${name}`
}
