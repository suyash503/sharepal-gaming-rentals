'use client';

import { useState } from 'react';
import { addDays, daysBetween, MIN_GAP_DAYS, sameDay, startOfDay } from '@/lib/rental';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

type Props = {
  from: Date | null;
  to: Date | null;
  onChange: (from: Date | null, to: Date | null) => void;
  months?: 1 | 2;
  className?: string;
};

/** Six-week grid for a month, starting on the Sunday on or before the 1st. */
function monthGrid(year: number, month: number) {
  const first = new Date(year, month, 1);
  const start = addDays(first, -first.getDay());
  const weeks = Math.ceil((first.getDay() + new Date(year, month + 1, 0).getDate()) / 7);
  return Array.from({ length: weeks }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => addDays(start, w * 7 + d)),
  );
}

/**
 * Delivery/pickup range picker styled like SharePal's (react-day-picker + shadcn) calendar.
 * First click sets delivery, second sets pickup. Pickup must leave one chargeable day in between,
 * so the two days right after delivery are blocked while pickup is being chosen.
 */
export function RangeCalendar({ from, to, onChange, months = 2, className }: Props) {
  const today = startOfDay(new Date());
  const [view, setView] = useState(() => {
    const base = from ?? today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const [hover, setHover] = useState<Date | null>(null);
  const choosingPickup = !!from && !to;

  const pick = (day: Date) => {
    if (!from || to) return onChange(day, null);
    if (daysBetween(from, day) < MIN_GAP_DAYS) return onChange(day, null); // too close: restart from this day
    onChange(from, day);
  };

  const canGoBack = view > new Date(today.getFullYear(), today.getMonth(), 1);
  const rangeEnd = to ?? (choosingPickup && hover && daysBetween(from, hover) >= MIN_GAP_DAYS ? hover : null);

  return (
    <div className={cn('p-3', className)}>
      <div className={cn('flex flex-col gap-4 sm:flex-row')}>
        {Array.from({ length: months }, (_, m) => {
          const month = new Date(view.getFullYear(), view.getMonth() + m, 1);
          return (
            <div key={m} className="flex-1 space-y-4">
              <div className="relative flex items-center justify-center pt-1">
                <div className="text-sm font-medium" aria-live="polite">
                  {MONTHS[month.getMonth()]} {month.getFullYear()}
                </div>
                {m === 0 && (
                  <NavButton
                    side="left"
                    disabled={!canGoBack}
                    onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
                  />
                )}
                {m === months - 1 && (
                  <NavButton
                    side="right"
                    onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
                  />
                )}
              </div>
              <table className="w-full border-collapse" role="grid" onMouseLeave={() => setHover(null)}>
                <thead>
                  <tr className="flex">
                    {WEEKDAYS.map((d) => (
                      <th
                        key={d}
                        scope="col"
                        className="flex-1 text-center text-[0.8rem] font-normal text-muted-foreground"
                      >
                        {d}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {monthGrid(month.getFullYear(), month.getMonth()).map((week, w) => (
                    <tr key={w} className="mt-2 flex w-full">
                      {week.map((day) => {
                        const outside = day.getMonth() !== month.getMonth();
                        const past = day < today;
                        const tooClose =
                          choosingPickup &&
                          !past &&
                          daysBetween(from, day) > 0 &&
                          daysBetween(from, day) < MIN_GAP_DAYS;
                        const isFrom = !!from && sameDay(day, from);
                        const isTo = !!rangeEnd && sameDay(day, rangeEnd);
                        const inRange = !!from && !!rangeEnd && day > from && day < rangeEnd;
                        const selected = !outside && (isFrom || isTo || inRange);
                        return (
                          <td
                            key={day.toISOString()}
                            className={cn(
                              'relative aspect-square flex-1 p-px text-center text-sm',
                              selected && 'bg-secondary-200',
                              selected && isFrom && 'rounded-l-md',
                              selected && isTo && 'rounded-r-md',
                              !to && selected && inRange && 'bg-secondary-150',
                            )}
                          >
                            {!outside && (
                              <button
                                type="button"
                                disabled={past}
                                aria-pressed={isFrom || isTo}
                                aria-label={`${day.toDateString()}${isFrom ? ', delivery' : ''}${isTo ? ', pickup' : ''}${tooClose ? ', too close to delivery for pickup' : ''}`}
                                onClick={() => pick(day)}
                                onMouseEnter={() => setHover(day)}
                                className={cn(
                                  'flex h-full w-full items-center justify-center rounded-md text-sm font-medium transition-colors',
                                  past && 'cursor-not-allowed text-muted-foreground opacity-50',
                                  !past && !selected && 'hover:bg-neutral-150',
                                  tooClose && 'text-neutral-300',
                                  (isFrom || isTo) &&
                                    'bg-secondary-500 font-bold text-neutral-900 hover:bg-secondary-600',
                                  inRange && 'font-bold text-neutral-900',
                                  sameDay(day, today) &&
                                    !isFrom &&
                                    !isTo &&
                                    'underline decoration-2 underline-offset-4',
                                )}
                              >
                                {day.getDate()}
                              </button>
                            )}
                            {outside && (
                              <span className="flex h-full w-full items-center justify-center text-neutral-250">
                                {day.getDate()}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NavButton({
  side,
  onClick,
  disabled,
}: {
  side: 'left' | 'right';
  onClick: () => void;
  disabled?: boolean;
}) {
  const Icon = side === 'left' ? ChevronLeftIcon : ChevronRightIcon;
  return (
    <button
      type="button"
      aria-label={side === 'left' ? 'Previous month' : 'Next month'}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'absolute inline-flex h-8 w-8 items-center justify-center rounded-4xl border-2 border-neutral-200 bg-neutral-100 transition-colors hover:bg-neutral-150 disabled:opacity-40',
        side === 'left' ? 'left-1' : 'right-1',
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
