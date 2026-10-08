'use client';

import Image from 'next/image';
import { Fragment, useMemo, useState } from 'react';
import { promoBanners, subCategories } from '@/data/content';
import { products, sortOptions, sortProducts, type SortKey } from '@/lib/products';
import { useStore } from '@/lib/store';
import { useHeaderHidden } from '@/lib/useHeaderHidden';
import { cn } from '@/lib/utils';
import { HeroBanner } from './HeroBanner';
import { ProductCard } from './ProductCard';
import { CaretDownIcon } from './icons';

const PAGE_SIZE = 12;
// The live grid drops a promo banner in after the 4th and the 8th product, at every breakpoint.
const BANNER_AFTER = [4, 8];

export function Catalog() {
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState<SortKey>('recommended');
  const [visible, setVisible] = useState(PAGE_SIZE);

  const active = subCategories.find((c) => c.id === category) ?? subCategories[0];
  const list = useMemo(
    () =>
      sortProducts(
        products.filter((p) => active.match(p.name, p.image)),
        sort,
      ),
    [active, sort],
  );
  const shown = list.slice(0, visible);

  const pickCategory = (id: string) => {
    setCategory(id);
    setVisible(PAGE_SIZE);
  };

  return (
    <div className="flex flex-row gap-2 px-2 max-md:pt-4 md:grid md:grid-cols-[100px_1fr] md:gap-8 md:px-0 lg:grid-cols-[120px_1fr]">
      <Sidebar active={category} onPick={pickCategory} />

      <div className="min-w-0 flex-1">
        <HeroBanner className="hidden md:flex" />

        <section aria-labelledby="listing-title" className="relative z-[1] pb-10">
          <div className="flex items-center justify-between gap-3 border-b-2 border-neutral-200 pb-3 md:py-4">
            <h1 id="listing-title" className="font-inter text-sh4 capitalize md:max-w-full md:text-h2">
              {category === 'all' ? 'Gaming Gadgets On Rent' : `${active.label} On Rent`}
            </h1>
            <div className="flex shrink-0 items-center gap-4">
              <SortSelect value={sort} onChange={setSort} className="hidden md:flex" />
              <p className="flex items-center justify-center gap-1 text-b6 text-neutral-300 md:text-b2">
                <span className="hidden md:inline-flex">Total items:</span>
                <span className="text-neutral-500">
                  {list.length} {list.length === 1 ? 'item' : 'items'}
                </span>
              </p>
            </div>
          </div>
          <div className="mt-2 flex justify-end md:hidden">
            <SortSelect value={sort} onChange={setSort} />
          </div>

          {list.length === 0 ? (
            <EmptyState label={active.label} onReset={() => pickCategory('all')} />
          ) : (
            <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-5 md:mt-6 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
              {shown.map((p, i) => {
                const bannerIndex = BANNER_AFTER.indexOf(i + 1);
                return (
                  <Fragment key={p.id}>
                    <ProductCard product={p} priority={i < 4} />
                    {bannerIndex !== -1 && i + 1 < shown.length && (
                      <PromoBanner {...promoBanners[bannerIndex]} />
                    )}
                  </Fragment>
                );
              })}
            </div>
          )}

          {list.length > 0 && (
            <div className="mt-5 flex w-full flex-col items-center justify-center border-t border-gray-200 py-7 md:mt-10">
              <p className="pb-3 text-sm text-gray-400 md:text-base" aria-live="polite">
                Showing {shown.length} of {list.length} results
              </p>
              {shown.length < list.length ? (
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="inline-flex h-9 w-full items-center justify-center rounded-4xl border-2 border-neutral-900 bg-gray-100 p-5 text-base font-medium transition-colors hover:bg-neutral-150 active:opacity-90 sm:max-w-72 md:h-[52px] md:p-6"
                >
                  Show More
                </button>
              ) : (
                list.length > PAGE_SIZE && (
                  <button
                    type="button"
                    onClick={() => {
                      setVisible(PAGE_SIZE);
                      document
                        .getElementById('listing-title')
                        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className="text-sh5 text-neutral-500 underline-offset-4 hover:text-neutral-700 hover:underline"
                  >
                    Back to top of list
                  </button>
                )
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function Sidebar({ active, onPick }: { active: string; onPick: (id: string) => void }) {
  const hidden = useHeaderHidden();
  return (
    <aside className="block w-[80px] shrink-0 md:w-full">
      <nav
        aria-label="Gaming sub-categories"
        className={cn(
          'scrollbar-none sticky overflow-y-auto rounded-xl bg-gray-100 p-1 shadow-sidebar transition-all duration-300 max-md:py-3 md:p-3',
          hidden
            ? 'top-4 max-h-[calc(100dvh-32px)] md:top-20 md:max-h-[calc(100dvh-100px)]'
            : 'top-28 max-h-[calc(100dvh-140px)] md:top-[140px] md:max-h-[calc(100dvh-160px)]',
        )}
      >
        <ul className="flex flex-col gap-2 md:gap-3 lg:gap-4">
          {subCategories.map((c) => {
            const on = c.id === active;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => onPick(c.id)}
                  className="group flex w-full flex-col items-center justify-center gap-0.5 transition-all duration-300 md:gap-1"
                >
                  <span
                    className={cn(
                      'relative flex aspect-square w-12 items-center justify-center overflow-hidden rounded-lg p-1 transition-all duration-300 md:w-14 md:rounded-xl md:p-1.5 lg:w-16',
                      on
                        ? 'border-2 border-primary-500 bg-gray-100'
                        : 'border border-border bg-gray-50 group-hover:bg-gray-100',
                    )}
                  >
                    <Image
                      src={c.image}
                      alt=""
                      width={96}
                      height={96}
                      className={cn(
                        'h-full w-full object-contain transition-transform duration-300 group-hover:scale-110',
                        on ? 'scale-105' : 'scale-100',
                      )}
                    />
                  </span>
                  <span
                    className={cn(
                      'line-clamp-2 max-w-[60px] text-center text-[10px] font-semibold leading-tight md:text-xs md:font-bold lg:max-w-[80px] lg:text-sh5',
                      on ? 'text-primary-500' : 'text-neutral-900',
                    )}
                  >
                    {c.label}
                    {on && (
                      <span className="mx-auto mt-0.5 block h-[2px] w-4 rounded-full bg-primary-500 md:w-6 lg:w-8" />
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

function PromoBanner({ href, alt, desktop, mobile }: (typeof promoBanners)[number]) {
  return (
    <div className="col-span-full md:my-5">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-hidden rounded-lg md:rounded-2xl"
      >
        <Image
          src={desktop}
          alt={alt}
          width={1920}
          height={428}
          sizes="(min-width: 1216px) 1064px, 100vw"
          className="hidden h-auto w-full rounded-2xl object-cover transition-transform duration-500 hover:scale-[1.01] md:block"
        />
        <Image
          src={mobile}
          alt={alt}
          width={828}
          height={185}
          sizes="100vw"
          className="h-auto w-full rounded-lg object-cover md:hidden"
        />
      </a>
    </div>
  );
}

function SortSelect({
  value,
  onChange,
  className,
}: {
  value: SortKey;
  onChange: (v: SortKey) => void;
  className?: string;
}) {
  return (
    <label className={cn('relative flex items-center', className)}>
      <span className="sr-only">Sort products</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="h-8 cursor-pointer appearance-none rounded-full border-2 border-neutral-200 bg-gray-100 py-0 pl-3 pr-8 text-sh7 text-neutral-700 transition-colors hover:border-neutral-250 md:text-sh5"
      >
        {sortOptions.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <CaretDownIcon className="pointer-events-none absolute right-2.5 size-4 text-neutral-500" />
    </label>
  );
}

function EmptyState({ label, onReset }: { label: string; onReset: () => void }) {
  const { city } = useStore();
  return (
    <div className="mt-6 flex flex-col items-center gap-3 rounded-3xl bg-gray-100 px-6 py-12 text-center">
      <p className="text-sh2 text-neutral-900">No {label} rentals in this list yet</p>
      <p className="max-w-sm text-b5 text-neutral-500">
        Pick another category, or browse every gaming gadget available in{' '}
        <span className="font-semibold text-neutral-700">{city}</span>.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-2 inline-flex h-10 items-center justify-center rounded-full bg-primary-900 px-5 text-bt3 text-white transition-opacity hover:opacity-90"
      >
        Show all gaming gadgets
      </button>
    </div>
  );
}
