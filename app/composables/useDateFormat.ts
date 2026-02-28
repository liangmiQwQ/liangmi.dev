export function useDateFormat() {
  function formatDate(dateStr: string | undefined, options?: Intl.DateTimeFormatOptions): string {
    if (!dateStr)
      return ''
    const date = new Date(dateStr)
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return date.toLocaleDateString('en-US', options || defaultOptions)
  }

  function formatShortDate(dateStr: string | undefined): string {
    if (!dateStr)
      return ''
    return new Date(dateStr).toLocaleDateString()
  }

  return { formatDate, formatShortDate }
}
