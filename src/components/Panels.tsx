'use client';

import * as Accordion from '@radix-ui/react-accordion';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { cities, faqs } from '@/data/content';
import { isWaitlist, productById, products, sortProducts } from '@/lib/products';
import { formatINR, fromKey, rentFor, shortDate } from '@/lib/rental';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { CalendarPlayIcon, CartLineIcon, SearchIcon, StarIcon, XIcon } from './icons';
import { Sheet } from './ui/Sheet';
import { FaqItem } from './Faq';

/** All the overlays the page can open. Only one is open at a time (see `panel` in the store). */
export function Panels() {
  return (
    <>
      <CityDialog />
      <SearchSheet />
      <CartSheet />
      <FaqSheet />
    </>
  );
}

function CityDialog() {
  const { panel, closePanel, city, setCity } = useStore();
  const choose = (name: string) => {
    setCity(name);
    if (name !== 'Bangalore')
      toast(`Showing ${name}`, {
        description: 'This recreation uses the Bangalore gaming catalogue for every city.',
      });
  };
  return (
    <Dialog.Root open={panel === 'city'} onOpenChange={(o) => !o && closePanel()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-primary-900/30 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-50 grid max-h-[90svh] w-[95%] max-w-3xl -translate-x-1/2 -translate-y-1/2 gap-2 rounded-3xl border border-border bg-gray-100 px-2 py-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 md:gap-4"
        >
          <Dialog.Title className="text-center text-xl font-bold tracking-tight md:text-2xl">
            Select Your City
          </Dialog.Title>
          <Dialog.Close className="absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-full hover:bg-neutral-150">
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </Dialog.Close>
          <div className="max-h-[calc(94svh-120px)] space-y-8 overflow-y-auto px-4 pb-2 md:px-6">
            <div className="space-y-4">
              <Divider label="Popular Cities" />
              <div className="grid grid-cols-3 gap-1 md:grid-cols-6">
                {cities.popular.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => choose(c.name)}
                    aria-pressed={city === c.name}
                    className={cn(
                      'flex flex-col items-center space-y-2 rounded-xl border p-3 transition-colors hover:bg-gray-50 md:min-w-[96px]',
                      city === c.name ? 'border-primary-500 bg-primary-100' : 'border-transparent',
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- line-art SVGs */}
                    <img src={c.icon} alt="" className="h-12 w-12" />
                    <span className="text-xs font-medium md:text-sm">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Divider label="Other Cities" />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-7">
                {cities.other.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => choose(name)}
                    aria-pressed={city === name}
                    className={cn(
                      'rounded-lg border px-3 py-2 text-xs transition-colors hover:bg-gray-50',
                      city === name ? 'border-primary-500 bg-primary-100' : 'border-border',
                    )}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="relative text-center">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t-[1.3px] border-border" />
      </div>
      <span className="relative bg-gray-100 px-4 text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

function SearchSheet() {
  const { panel, closePanel, days } = useStore();
  const [q, setQ] = useState('');
  const results = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    const list = words.length
      ? products.filter((p) => words.every((w) => p.name.toLowerCase().includes(w)))
      : sortProducts(products, 'popular').slice(0, 8);
    return list;
  }, [q]);

  return (
    <Sheet open={panel === 'search'} onClose={closePanel} title="Search Products">
      <div className="bg-gray-100 px-4 pb-4">
        <label className="relative block">
          <span className="sr-only">Search for products</span>
          <SearchIcon className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-neutral-500" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search for products"
            className="h-12 w-full rounded-2xl border-2 border-neutral-200 bg-gray-100 pl-12 pr-4 text-b4 text-neutral-900 placeholder:text-neutral-400 focus:border-primary-300 focus:outline-none"
          />
        </label>
      </div>
      <div className="p-4">
        <p className="mb-3 flex items-center gap-3 text-sh7 text-neutral-500">
          {q ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'Popular Items'}
          <span className="h-px flex-1 bg-neutral-200" />
        </p>
        {results.length === 0 ? (
          <p className="py-10 text-center text-b4 text-neutral-500">No gaming gadgets match “{q}”.</p>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {results.map((p) => (
              <li key={p.id} className="rounded-2xl bg-gray-100 p-2">
                <div className="aspect-square rounded-xl bg-gray-100 p-3">
                  <Image
                    src={p.image}
                    alt=""
                    width={160}
                    height={160}
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="mt-1 line-clamp-2 text-sh5 text-neutral-900">{p.name}</p>
                <p className="mt-1 text-sh7 text-neutral-500">
                  {isWaitlist(p)
                    ? 'Coming soon'
                    : days
                      ? `Rent for ${days} days · ${formatINR(rentFor(p.per_day_rent, days))}`
                      : `${formatINR(p.per_day_rent)}/day`}
                </p>
                {p.rating > 0 && (
                  <p className="mt-0.5 flex items-center gap-1 text-o4 text-gray-600">
                    <StarIcon className="size-3" /> {p.rating.toFixed(1)} ·{' '}
                    {p.booked_count.toLocaleString('en-IN')} rentals
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Sheet>
  );
}

function CartSheet() {
  const { panel, closePanel, cart, setQty, days, dates, openPanel } = useStore();
  const lines = Object.entries(cart)
    .map(([id, qty]) => ({ product: productById(Number(id)), qty }))
    .filter((l): l is { product: NonNullable<typeof l.product>; qty: number } => !!l.product);
  const total = lines.reduce((sum, l) => sum + rentFor(l.product.per_day_rent, days) * l.qty, 0);

  return (
    <Sheet
      open={panel === 'cart'}
      onClose={closePanel}
      title="Your Cart"
      footer={
        lines.length > 0 && !dates ? (
          <button
            type="button"
            onClick={() => openPanel('dates')}
            className="inline-flex h-12 w-full items-center justify-center rounded-4xl bg-primary-500 text-lg font-medium text-white transition-colors hover:bg-primary-600"
          >
            Select rental dates to see the total
          </button>
        ) : (
          lines.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sh5 text-neutral-500">
                  Total for {days} {days === 1 ? 'day' : 'days'}
                </span>
                <span className="text-h6 text-neutral-900">{formatINR(total)}</span>
              </div>
              <button
                type="button"
                onClick={() => toast('Checkout isn’t part of this page recreation.')}
                className="inline-flex h-12 w-full items-center justify-center rounded-4xl bg-primary-500 text-lg font-medium text-white transition-colors hover:bg-primary-600"
              >
                Proceed to Checkout
              </button>
            </div>
          )
        )
      }
    >
      {dates && (
        <button
          type="button"
          onClick={() => openPanel('dates')}
          className="flex w-full items-center gap-2 bg-primary-100 px-5 py-3 text-left text-b6 text-primary-700"
        >
          <CalendarPlayIcon className="size-4 shrink-0" />
          Delivery {shortDate(fromKey(dates.delivery))} · Pickup {shortDate(fromKey(dates.pickup))}
          <span className="ml-auto font-bold underline">Edit</span>
        </button>
      )}
      {lines.length === 0 ? (
        <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
          <CartLineIcon className="size-10 text-neutral-300" />
          <p className="text-sh2 text-neutral-900">Your cart is empty</p>
          <p className="text-b5 text-neutral-500">Add a console or a combo and it will show up here.</p>
        </div>
      ) : (
        <ul className="space-y-3 p-4">
          {lines.map(({ product: p, qty }) => (
            <li key={p.id} className="flex gap-3 rounded-2xl bg-gray-100 p-3">
              <div className="size-20 shrink-0 rounded-xl bg-gray-100 p-1">
                <Image src={p.image} alt="" width={80} height={80} className="h-full w-full object-contain" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <p className="line-clamp-2 text-sh5 text-neutral-900">{p.name}</p>
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <p className="text-h7 text-neutral-900">
                      {formatINR(rentFor(p.per_day_rent, days) * qty)}
                    </p>
                    <p className="text-o4 text-neutral-500">
                      {formatINR(p.per_day_rent)}/day × {days} {days === 1 ? 'day' : 'days'}
                      {qty > 1 ? ` × ${qty}` : ''}
                    </p>
                  </div>
                  <div className="flex h-8 items-center gap-2 rounded-full border-2 border-primary-900 px-1">
                    <button
                      type="button"
                      aria-label={`Remove one ${p.name}`}
                      onClick={() => setQty(p.id, qty - 1)}
                      className="flex size-6 items-center justify-center rounded-full hover:bg-neutral-150"
                    >
                      −
                    </button>
                    <span className="min-w-4 text-center text-sh5 tabular-nums">{qty}</span>
                    <button
                      type="button"
                      aria-label={`Add one more ${p.name}`}
                      onClick={() => setQty(p.id, qty + 1)}
                      className="flex size-6 items-center justify-center rounded-full hover:bg-neutral-150"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Sheet>
  );
}

function FaqSheet() {
  const { panel, closePanel } = useStore();
  return (
    <Sheet open={panel === 'faq'} onClose={closePanel} title="FAQs">
      <Accordion.Root type="single" collapsible className="space-y-4 p-6">
        {faqs.map((f, i) => (
          <FaqItem key={f.q} faq={f} value={`sheet-${i}`} className={cn('bg-gray-100')} compact />
        ))}
      </Accordion.Root>
    </Sheet>
  );
}
