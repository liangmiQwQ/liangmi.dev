// Format a YYYY-MM-DD date, e.g. "Nov 7, 2026".
export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeZone: 'UTC'
  }).format(new Date(`${date}T00:00:00Z`))
}
