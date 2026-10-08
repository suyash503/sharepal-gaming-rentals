'use client';

import Link from 'next/link';
import { toast } from 'sonner';
import { useStore } from '@/lib/store';
import { fromKey, shortDate } from '@/lib/rental';
import { useHeaderHidden } from '@/lib/useHeaderHidden';
import { cn } from '@/lib/utils';
import {
  CalendarPlayIcon,
  CalendarPlusIcon,
  CalendarStopIcon,
  CaretDownIcon,
  CartIcon,
  LogoPal,
  LogoShare,
  PinIcon,
  SearchIcon,
  UserIcon,
} from './icons';

const loginToast = () => toast('Sign-in isn’t part of this page recreation.');

export function Header() {
  const hidden = useHeaderHidden();
  const { city, dates, openPanel, cartCount } = useStore();
  const delivery = dates ? shortDate(fromKey(dates.delivery)) : null;
  const pickup = dates ? shortDate(fromKey(dates.pickup)) : null;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 flex w-full flex-col items-center justify-center gap-1 overflow-hidden bg-[#4C187C] pb-3 transition-all duration-500 md:pb-4 lg:flex-row',
        hidden && '-translate-y-full opacity-0',
      )}
    >
      {/* Desktop */}
      <div className="container hidden w-full items-end justify-between gap-1 lg:flex">
        <Link href="/" aria-label="SharePal home">
          <div className="flex h-[68px] w-40 flex-col items-center justify-end gap-1 rounded-b-2xl bg-primary-500 p-3 pt-[18px] shadow-logo">
            <div className="flex items-center justify-center">
              <LogoShare />
              <LogoPal />
            </div>
          </div>
        </Link>

        <div className="relative flex items-center justify-center gap-2 rounded-full border-2 border-category-purple bg-gray-100">
          <button
            type="button"
            onClick={() => openPanel('city')}
            className="flex items-center justify-center gap-1 rounded-l-full bg-neutral-200 px-[10px] py-[6px] text-primary-900 transition-colors hover:bg-neutral-250"
          >
            <PinIcon className="w-5" />
            <p className="min-w-16 text-left text-bt3">{city}</p>
            <CaretDownIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Edit rental dates"
            onClick={() => openPanel('dates')}
            className="flex w-max items-center justify-center gap-2 text-neutral-700"
          >
            <span className="flex items-center justify-center gap-2 text-sh5">
              <CalendarPlayIcon className="h-4 w-4" />
              {delivery ? (
                <span>
                  <span className="font-medium">Delivery Date:</span> {delivery}
                </span>
              ) : (
                'Delivery Date'
              )}
            </span>
            <span className="h-5 w-0.5 bg-neutral-200" aria-hidden="true" />
            <span className="flex items-center justify-center gap-2 text-sh5">
              <CalendarStopIcon className="h-4 w-4" />
              {pickup ? (
                <span>
                  <span className="font-medium">Pickup Date:</span> {pickup}
                </span>
              ) : (
                'Pickup Date'
              )}
            </span>
          </button>
          <button
            type="button"
            onClick={() => openPanel('dates')}
            className="inline-flex h-9 items-center justify-center gap-1 whitespace-nowrap rounded-4xl bg-primary-900 px-3 py-2 text-bt3 text-white transition-opacity active:opacity-90"
          >
            <CalendarPlusIcon className="size-4" />
            <span className="pr-1 leading-5 tracking-wide">{dates ? 'Edit' : 'Select'}</span>
          </button>
        </div>

        <div className="flex items-end justify-end gap-3 text-gray-100">
          <button
            type="button"
            aria-label="Search products"
            onClick={() => openPanel('search')}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-4xl p-2 transition-colors hover:bg-white/10 active:opacity-90"
          >
            <SearchIcon className="min-h-7 min-w-7" />
          </button>
          <button
            type="button"
            aria-label={`Cart, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
            onClick={() => openPanel('cart')}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-4xl p-2 transition-colors hover:bg-white/10 active:opacity-90"
          >
            <CartIcon className="min-h-7 min-w-7" />
            <CartBadge count={cartCount} />
          </button>
          <button type="button" onClick={loginToast} className="flex items-center justify-end gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-category-purple bg-gray-100 p-0.5 text-neutral-900 transition-colors duration-300">
              <UserIcon className="min-h-6 min-w-6" />
            </span>
            <span className="text-bt2">Hi, Login</span>
          </button>
        </div>
      </div>

      {/* Mobile and tablet */}
      <div className="container flex w-full flex-col items-center justify-center gap-3 lg:hidden">
        <div className="flex h-full w-full items-center justify-between gap-1">
          <Link
            href="/"
            aria-label="SharePal home"
            className="flex h-10 flex-col items-center justify-end gap-1 rounded-b-xl bg-primary-500 px-3 pb-1 pt-3"
          >
            <span className="flex w-full max-w-28 items-center justify-center">
              <LogoShare width={70} height={27} />
              <LogoPal width={42} height={27} />
            </span>
          </Link>
          <div className="flex w-full items-center justify-end gap-1.5 pt-1.5 md:gap-4">
            <button
              type="button"
              onClick={() => openPanel('city')}
              className="flex items-center justify-center gap-1 rounded-full border border-category-purple bg-category-purple px-2 py-0.5 text-gray-100 shadow-md"
            >
              <PinIcon className="w-4 md:w-5" />
              <p className="min-w-4 text-bt4">{city}</p>
              <CaretDownIcon className="w-3 md:w-4" />
            </button>
            <button
              type="button"
              aria-label="Sign in"
              onClick={loginToast}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-200 bg-neutral-900 text-gray-100"
            >
              <UserIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={() => openPanel('dates')}
          className="flex h-[34px] w-full items-center justify-between gap-1 rounded-full border-2 border-category-purple bg-gray-100"
        >
          <span className="flex items-center gap-1 px-2">
            <CalendarPlayIcon className="mx-1 w-4 shrink-0" />
            <span className="truncate text-sh5 text-neutral-700">
              {dates ? `${delivery} – ${pickup}` : 'Select Rental Dates'}
            </span>
          </span>
          <span className="inline-flex h-[30px] items-center justify-center gap-1 rounded-4xl bg-primary-900 px-3 text-bt4 font-medium text-white">
            <CalendarPlusIcon className="size-4" />
            {dates ? 'Edit' : 'Select'}
          </span>
        </button>
      </div>
    </header>
  );
}

export function CartBadge({ count, className }: { count: number; className?: string }) {
  if (!count) return null;
  return (
    <span
      className={cn(
        'absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-destructive-500 px-1 text-o3 text-white ring-2 ring-[#4C187C]',
        className,
      )}
    >
      {count}
    </span>
  );
}
