const utcDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatPublishedDate(value: string): string {
  return utcDateFormatter.format(new Date(`${value}T00:00:00Z`));
}

export function toTagPath(tag: string): string {
  return `/tags/${encodeURIComponent(tag.toLowerCase())}`;
}
