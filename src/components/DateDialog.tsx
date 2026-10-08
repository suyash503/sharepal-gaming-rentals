'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { chargeableDays, chargeablePeriod, fieldDate, fromKey, toKey } from '@/lib/rental';
import { cn } from '@/lib/utils';
import { CalendarFieldIcon, CalendarSmallIcon, DiscountBadgeIcon, InfoIcon, XIcon } from './icons';
import { RangeCalendar } from './RangeCalendar';

export function DateDialog() {
  const { panel, closePanel } = useStore();
  const open = panel === 'dates';
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && closePanel()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-primary-900/30 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className={cn(
            'fixed z-50 flex flex-col overflow-hidden bg-neutral-150 shadow-modal duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'max-md:inset-x-0 max-md:bottom-0 max-md:max-h-[92dvh] max-md:rounded-t-3xl max-md:data-[state=closed]:slide-out-to-bottom max-md:data-[state=open]:slide-in-from-bottom',
            'md:left-1/2 md:top-1/2 md:max-h-[94dvh] md:w-[95%] md:max-w-[1280px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-[28px] md:border md:border-border md:bg-gray-150 md:data-[state=closed]:zoom-out-95 md:data-[state=open]:zoom-in-95',
          )}
        >
          {/* Remount the body on every open so it starts from the saved dates. */}
          {open && <DatePickerBody />}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function DatePickerBody() {
  const { dates, setDates } = useStore();
  const [from, setFrom] = useState<Date | null>(dates ? fromKey(dates.delivery) : null);
  const [to, setTo] = useState<Date | null>(dates ? fromKey(dates.pickup) : null);
  const days = from && to ? chargeableDays(from, to) : 0;
  const ready = !!from && !!to && days > 0;

  const onChange = (f: Date | null, t: Date | null) => {
    setFrom(f);
    setTo(t);
  };
  const confirm = () => from && to && setDates({ delivery: toKey(from), pickup: toKey(to) });

  const continueButton = (className?: string) => (
    <button
      type="button"
      disabled={!ready}
      onClick={confirm}
      className={cn(
        'inline-flex h-12 w-full items-center justify-center rounded-4xl text-lg font-medium transition-colors',
        ready
          ? 'bg-primary-500 text-white hover:bg-primary-600 active:opacity-90'
          : 'cursor-not-allowed bg-primary-500/50 text-white md:bg-neutral-200 md:text-neutral-500',
        className,
      )}
    >
      Continue
    </button>
  );

  return (
    <>
      <div className="flex-shrink-0 border-b border-neutral-200 bg-gray-100 px-4 pb-4 pt-3 md:border-none md:bg-transparent md:p-6 md:pb-0">
        <div className="mx-auto mb-3 h-1 w-14 rounded-full bg-neutral-200 md:hidden" aria-hidden="true" />
        <div className="flex items-center justify-between">
          <Dialog.Title className="text-xl font-bold tracking-tight md:text-2xl md:font-semibold">
            Select your Dates
          </Dialog.Title>
          <Dialog.Close className="inline-flex size-8 items-center justify-center rounded-full transition-colors hover:bg-neutral-200">
            <XIcon className="size-5 md:size-4" />
            <span className="sr-only">Close</span>
          </Dialog.Close>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6 p-4 md:flex-col-reverse md:p-6 md:pt-4 lg:flex-row">
          <div className="flex-1 space-y-5">
            <div className="flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-3">
              <DateField
                label="Delivery Date"
                placeholder="Select delivery date"
                value={from}
                active={!from || !!to}
                onClick={() => onChange(null, null)}
              />
              <p className="flex items-start gap-2 rounded-xl bg-primary-100 px-3 py-2 text-b6 text-primary-700 max-md:text-sm md:order-3 md:col-span-2 md:mt-2 md:rounded-2xl">
                <InfoIcon className="min-h-5 min-w-5 text-primary-500" />
                <span>
                  <span className="font-bold">Same-day delivery</span> between{' '}
                  <span className="font-bold">5PM and 11PM</span> For future dates, you can select a specific
                  time slot available at checkout. We pickup between{' '}
                  <span className="font-bold">9AM to 1PM</span>.
                </span>
              </p>
              <DateField
                label="Pickup Date"
                placeholder={from ? 'Now pick a pickup date' : 'Select pickup date'}
                value={to}
                active={!!from && !to}
                onClick={() => from && onChange(from, null)}
                className="md:order-2"
              />
            </div>

            <RangeCalendar
              from={from}
              to={to}
              onChange={onChange}
              months={1}
              className="rounded-3xl bg-gray-100 md:hidden"
            />

            <div className="flex w-full flex-col gap-1.5">
              <div className="text-sm font-medium leading-5 text-neutral-900">Your Rental Period:</div>
              <div className="flex w-full items-end justify-start gap-3 rounded-2xl border-2 border-neutral-200 bg-gray-100 px-3 py-2.5">
                <div className="flex items-end gap-1">
                  <div className="text-d5 tabular-nums text-neutral-800">{String(days).padStart(2, '0')}</div>
                  <div className="pb-0.5 text-sm font-medium leading-5 text-neutral-500">
                    {days === 1 ? 'Day' : days ? 'Days' : 'Day'}
                  </div>
                </div>
                <div className="h-10 w-[2px] self-center rounded-full bg-border" />
                <div className="flex flex-1 flex-col items-start justify-center gap-1">
                  <div className="w-full text-b6 text-neutral-900">Chargeable Period:</div>
                  <div className="flex w-full items-center gap-2">
                    <CalendarSmallIcon className="h-4 w-4 shrink-0" />
                    <div
                      className={cn(
                        'flex-1 text-sm font-medium leading-5',
                        ready ? 'text-neutral-900' : 'text-neutral-300',
                      )}
                    >
                      {ready && from && to ? chargeablePeriod(from, to) : '--'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl bg-primary-900 pb-5 text-white">
              <div className="mb-4 flex items-center gap-3">
                <DiscountBadgeIcon className="size-10 shrink-0" />
                <span className="bg-save-more-text bg-clip-text text-xl font-bold italic text-transparent md:text-2xl">
                  Save more with us!
                </span>
              </div>
              <p className="px-5 text-sm font-semibold md:text-xs">
                Longer rental periods mean bigger savings—enjoy discounts of up to 12%. We don’t charge you
                for deliver and pickup days!
              </p>
            </div>

            {continueButton('hidden md:inline-flex')}
          </div>

          <div className="hidden h-max flex-[1.5] rounded-3xl bg-gray-100 p-3 md:block">
            <RangeCalendar from={from} to={to} onChange={onChange} months={2} />
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 border-t border-neutral-200 bg-gray-100 p-3 md:hidden">
        {continueButton()}
      </div>
    </>
  );
}

function DateField({
  label,
  placeholder,
  value,
  active,
  onClick,
  className,
}: {
  label: string;
  placeholder: string;
  value: Date | null;
  active: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <div className={cn('space-y-1.5 md:space-y-2', className)}>
      <div className="text-sm font-medium leading-none max-md:text-base">
        {label} <span className="text-destructive">*</span>
      </div>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'relative flex h-11 w-full items-center justify-start rounded-2xl border-2 bg-gray-100 pl-8 transition-colors max-md:h-12 max-md:pl-10',
          active ? 'border-primary-300' : 'border-neutral-200',
        )}
      >
        <CalendarFieldIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 max-md:left-4" />
        {value ? (
          <span className="text-sh5 text-neutral-900 max-md:text-base">{fieldDate(value)}</span>
        ) : (
          <span className="text-b4 text-neutral-300 max-md:text-base">{placeholder}</span>
        )}
      </button>
    </div>
  );
}
