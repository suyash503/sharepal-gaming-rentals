// Rental date maths. SharePal doesn't charge for the delivery or the pickup day,
// so delivering on the 12th and picking up on the 15th bills the 13th and 14th: 2 days.

const DAY = 24 * 60 * 60 * 1000;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export type RentalDates = { delivery: string; pickup: string }; // yyyy-mm-dd, local time

export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

export const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export const toKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export const fromKey = (key: string) => {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
};

/** Whole days between two dates, ignoring DST shifts. */
export const daysBetween = (from: Date, to: Date) =>
  Math.round((startOfDay(to).getTime() - startOfDay(from).getTime()) / DAY);

export const chargeableDays = (delivery: Date, pickup: Date) =>
  Math.max(0, daysBetween(delivery, pickup) - 1);

/** Pickup has to leave at least one chargeable day between it and delivery. */
export const MIN_GAP_DAYS = 2;

const ordinal = (n: number) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

/** "12th Oct" */
export const shortDate = (d: Date) => `${ordinal(d.getDate())} ${MONTHS[d.getMonth()]}`;

/** "Oct 12, 2026" */
export const fieldDate = (d: Date) => `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

export const chargeablePeriod = (delivery: Date, pickup: Date) =>
  `${shortDate(addDays(delivery, 1))} - ${shortDate(addDays(pickup, -1))}`;

export const rentFor = (perDay: number, days: number) => Math.round(perDay * days);

const inr = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });

export const formatINR = (n: number) => `₹${inr.format(Math.round(n))}`;
