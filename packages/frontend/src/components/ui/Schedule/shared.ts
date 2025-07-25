import type { AstroComponent, ScheduleEvent } from '#/types';

export type ColumnMapType = Map<AstroComponent | string, AstroComponent | string>;

/**
 * For formatting in the time column, we use a 24-hour format without AM/PM.
 */
export function formatHour(hour: number, locale: Intl.UnicodeBCP47LocaleIdentifier): string {
  const date = new Date();
  date.setHours(hour, 0, 0, 0);

  const formatter = new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false
  });

  return formatter.format(date);
}

/**
 * Calculate the dynamic hour range based on all events in the week.
 * Returns an array of hours from the earliest event start to the latest event end (ceiling).
 */
export function getHours(events: ScheduleEvent[]) {
  if (events.length === 0) {
    // Default range if no events
    return Array.from({ length: 13 }, (_, i) => i + 8); // 8 AM to 8 PM
  }

  let minHour = 23;
  let maxHour = 0;

  for (const event of events) {
    const endTime = event.end ?? new Date(event.start.getTime() + 60 * 60 * 1000);

    minHour = Math.min(minHour, event.start.getHours());
    maxHour = Math.max(maxHour, endTime.getHours());
  }

  // Generate array of hours from minHour to maxHour (inclusive)
  const hourCount = maxHour - minHour + 1;
  return Array.from({ length: hourCount }, (_, i) => minHour + i);
}
