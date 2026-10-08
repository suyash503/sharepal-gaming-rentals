'use client';

import Image from 'next/image';
import { toast } from 'sonner';
import { WAITLIST, isWaitlist, type Product } from '@/lib/products';
import { formatINR, rentFor } from '@/lib/rental';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { HeartIcon, PlusIcon, SparkleIcon, StarIcon } from './icons';

const badgeStyles: Record<string, string> = {
  New: 'border-decorative-blue text-decorative-blue bg-white/70',
  Trending: 'border-decorative-orange text-decorative-orange bg-white/70',
  'Vote to Launch': 'border-secondary-400 bg-secondary-100 text-secondary-850 !text-o3 md:!text-o2',
};

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const { days, cart, wishlist, waitlist, addToCart, setQty, toggleWishlist, joinWaitlist, openPanel } =
    useStore();
  const waitlisted = isWaitlist(product);
  const qty = cart[product.id] ?? 0;
  const saved = wishlist.includes(product.id);
  const joined = waitlist.includes(product.id);
  const joinedCount = WAITLIST.joined + (joined ? 1 : 0);

  return (
    <article
      aria-label={product.name}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-transparent p-2.5 leading-5 transition-all duration-300 max-md:bg-gray-100 md:rounded-3xl md:p-3 md:hover:bg-gray-100 md:hover:shadow-[0_8px_24px_rgba(3,13,49,0.06)]"
    >
      <div className="relative aspect-square shrink-0 overflow-hidden rounded-lg bg-gray-100 p-1.5 md:rounded-2xl md:p-3">
        <div className="h-full w-full p-3 md:p-5">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            priority={priority}
            sizes="(min-width: 1024px) 166px, (min-width: 768px) 25vw, 40vw"
            className={cn(
              'h-full w-full object-contain transition-transform duration-300 group-hover:scale-105',
              product.out_of_stock && 'opacity-50 grayscale',
            )}
          />
        </div>
        {product.tag && (
          <span
            className={cn(
              'absolute left-2 top-2 inline-flex items-center rounded-lg border px-1.5 py-0 text-[10px] font-semibold md:left-3 md:top-3 md:border-2 md:px-2.5 md:py-0.5 md:text-xs',
              badgeStyles[product.tag],
            )}
          >
            {product.tag}
          </span>
        )}
        {product.out_of_stock && (
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-neutral-900/80 px-2.5 py-1 text-o3 text-white md:bottom-3 md:text-sh7">
            Out of stock
          </span>
        )}
        <button
          type="button"
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          onClick={() => toggleWishlist(product.id)}
          className={cn(
            'absolute right-1 top-1 p-0 transition-all duration-300 md:right-3 md:top-3',
            saved
              ? 'scale-100 text-destructive-500 opacity-100'
              : 'scale-[0.8] text-gray-500 opacity-40 focus-visible:opacity-100 group-hover:scale-100 group-hover:opacity-100 md:opacity-0',
          )}
        >
          {saved ? <HeartFilled className="size-4 md:size-6" /> : <HeartIcon className="size-4 md:size-6" />}
        </button>
      </div>

      {waitlisted && (
        <div className="mt-2 flex w-full flex-col gap-1.5 rounded-xl bg-secondary-100 p-2">
          <div className="flex items-start gap-1.5">
            <SparkleIcon className="size-3.5 shrink-0 text-success-600" />
            <p
              className="text-pretty text-o4 text-success-700 max-md:text-[11px] max-md:leading-4"
              role="status"
            >
              We launch if 1k people join the waitlist. Get notified first!
            </p>
          </div>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={WAITLIST.goal}
            aria-valuenow={joinedCount}
            aria-label={`${joinedCount} of ${WAITLIST.goal} people joined the waitlist`}
            className="relative h-5 w-full overflow-hidden rounded-full bg-gray-200"
          >
            <div
              className="h-full rounded-full bg-category-purple transition-[width] duration-500 ease-out"
              style={{ width: `${Math.max(3.3, (joinedCount / WAITLIST.goal) * 100)}%` }}
            />
            {/* The live label is white on light grey and nearly invisible; a darker tone keeps it readable. */}
            <span className="absolute inset-0 flex items-center justify-center text-o3 tabular-nums text-neutral-500">
              {joinedCount}/{WAITLIST.goal} Joined
            </span>
          </div>
        </div>
      )}

      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col items-start justify-center gap-1 pb-1 pt-2.5 md:gap-1.5 md:p-2 md:pb-0">
          <h3 className="line-clamp-2 text-b6 font-bold md:text-sh2">{product.name}</h3>
          {product.rating > 0 && !waitlisted && (
            <p className="flex items-center gap-1 text-o4 text-gray-600 md:text-b6">
              <StarIcon className="size-3 md:size-3.5" />
              <span className="font-semibold text-gray-900">{product.rating.toFixed(1)}</span>
              <span aria-hidden="true">·</span>
              <span>{product.booked_count.toLocaleString('en-IN')} rentals</span>
            </p>
          )}
        </div>

        <div className="flex w-full flex-col items-start justify-between gap-0 px-0 md:gap-1 md:px-2">
          <div aria-hidden="true" className="my-1 h-px w-full bg-neutral-200" />
          {waitlisted ? (
            <button
              type="button"
              disabled={joined}
              onClick={() => joinWaitlist(product.id)}
              className="mt-2 inline-flex h-9 w-full items-center justify-center gap-2 rounded-full bg-secondary-500 px-4 py-2 text-bt3 text-primary-900 transition-[transform,background-color] duration-150 ease-out hover:bg-secondary-400 active:scale-[0.98] disabled:cursor-default disabled:bg-secondary-200 md:h-10"
            >
              {joined ? 'You’re on the list ✓' : 'Join Waitlist'}
            </button>
          ) : (
            <div className="flex w-full items-end justify-between gap-1 max-md:flex-wrap md:gap-2">
              <div className="flex flex-col items-baseline justify-between gap-0 md:gap-1">
                {days > 0 ? (
                  <>
                    <div className="flex items-center gap-1 whitespace-nowrap text-o3 text-gray-600 md:text-sh5">
                      Rent for
                      <span className="text-xs font-semibold leading-5 text-gray-900 md:text-sm">{days}</span>
                      {days === 1 ? 'day' : 'days'}
                    </div>
                    <div className="text-sh4 text-gray-900 md:text-h6">
                      {formatINR(rentFor(product.per_day_rent, days))}
                    </div>
                    <span className="rounded bg-secondary-500 px-1 py-px text-o3 text-secondary-900 md:px-1.5 md:py-0.5 md:text-sh7">
                      {formatINR(product.per_day_rent)}/day
                    </span>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => openPanel('dates')}
                      className="text-left text-o3 text-gray-600 underline-offset-2 hover:underline md:text-sh5"
                    >
                      Select dates for total rent
                    </button>
                    <div className="text-sh4 text-gray-900 md:text-h6">
                      {formatINR(product.per_day_rent)}
                      <span className="text-o3 text-gray-600 md:text-sh7">/day</span>
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center gap-1 max-md:w-full md:gap-2">
                {product.out_of_stock ? (
                  <button
                    type="button"
                    onClick={() =>
                      toast.success('We’ll let you know', {
                        description: `${product.name} is back in stock soon.`,
                      })
                    }
                    className="flex h-8 items-center justify-center rounded-full border-2 border-neutral-250 px-3 text-bt4 text-neutral-500 transition-colors hover:bg-neutral-150 max-md:w-full md:h-10 lg:h-12"
                  >
                    Notify me
                  </button>
                ) : qty > 0 ? (
                  <QtyStepper name={product.name} qty={qty} onChange={(n) => setQty(product.id, n)} />
                ) : (
                  <button
                    type="button"
                    aria-label={`Add ${product.name} to cart`}
                    onClick={() => addToCart(product.id)}
                    className="flex h-8 items-center justify-center gap-2 rounded-full border-2 border-primary-900 bg-transparent px-4 py-2 transition-all duration-300 hover:bg-neutral-150 active:opacity-90 max-md:w-full md:h-9 md:w-9 md:p-2 lg:h-12 lg:w-12"
                  >
                    <span className="text-bt4 md:hidden">Add to Cart</span>
                    <PlusIcon className="hidden size-4 text-primary-900 md:block md:size-5 lg:!size-6" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function QtyStepper({ name, qty, onChange }: { name: string; qty: number; onChange: (n: number) => void }) {
  return (
    <div className="flex h-8 items-center justify-between gap-1 rounded-full border-2 border-primary-900 px-1 animate-in fade-in-0 zoom-in-95 max-md:w-full md:h-10">
      <button
        type="button"
        aria-label={`Remove one ${name}`}
        onClick={() => onChange(qty - 1)}
        className="flex size-6 items-center justify-center rounded-full text-primary-900 hover:bg-neutral-150"
      >
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
          <path d="M5 11h14v2H5z" fill="currentColor" />
        </svg>
      </button>
      <span className="min-w-4 text-center text-sh3 tabular-nums text-primary-900" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        aria-label={`Add one more ${name}`}
        onClick={() => onChange(qty + 1)}
        className="flex size-6 items-center justify-center rounded-full text-primary-900 hover:bg-neutral-150"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
}

function HeartFilled({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
        fill="currentColor"
      />
    </svg>
  );
}
