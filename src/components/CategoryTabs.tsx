'use client';

import { useEffect, useRef } from 'react';
import { superCategories } from '@/data/content';
import { useHeaderHidden } from '@/lib/useHeaderHidden';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

/** Photography / Gaming / Outdoor / Entertainment. Sits on the purple band on mobile, sticks under the header on desktop. */
export function CategoryTabs() {
  const hidden = useHeaderHidden();
  const scroller = useRef<HTMLDivElement>(null);
  const active = useRef<HTMLAnchorElement>(null);

  // On narrow screens the strip overflows; start with the active tab first, like the live swiper does.
  useEffect(() => {
    const s = scroller.current;
    const a = active.current?.parentElement;
    if (s && a && s.scrollWidth > s.clientWidth) s.scrollLeft = a.offsetLeft;
  }, []);

  const nudge = (dir: 1 | -1) =>
    scroller.current?.scrollBy({ left: dir * scroller.current.clientWidth * 0.5, behavior: 'smooth' });

  return (
    <div
      className={cn(
        'z-20 py-1 transition-all duration-300 md:sticky md:bg-neutral-150',
        hidden ? 'md:top-0' : 'md:top-[84px]',
      )}
    >
      <nav aria-label="Categories" className="relative mx-auto w-full max-w-3xl px-8">
        {/* The live swiper rests 30px left of centre on desktop; matched here. */}
        <div
          ref={scroller}
          className="scrollbar-none flex w-full snap-x items-center overflow-x-auto scroll-smooth lg:-translate-x-[30px]"
        >
          {superCategories.map((c) => (
            <div
              key={c.label}
              className="shrink-0 basis-[40%] snap-start px-2 py-2 text-center sm:basis-1/2 md:basis-1/3 md:px-4 lg:basis-1/4"
            >
              <a
                ref={c.active ? active : undefined}
                href={c.href}
                aria-current={c.active ? 'page' : undefined}
                className="group relative inline-block w-full max-w-44 px-3"
              >
                <span
                  className={cn(
                    'relative inline-block text-gray-200 transition-transform duration-200 group-hover:text-gray-100 md:text-neutral-700 md:group-hover:text-gray-900',
                    c.active ? 'text-sh4' : 'text-sh5',
                  )}
                >
                  {c.label}
                </span>
                {c.active && (
                  <span className="absolute left-1/2 top-[calc(100%+6px)] h-[2px] w-full -translate-x-1/2 rounded-full bg-category-purple md:w-10/12" />
                )}
              </a>
            </div>
          ))}
        </div>
        <button
          type="button"
          aria-label="Scroll categories left"
          onClick={() => nudge(-1)}
          className="absolute left-1 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full lg:hidden"
        >
          <ChevronLeftIcon className="size-4 text-gray-400" />
        </button>
        <button
          type="button"
          aria-label="Scroll categories right"
          onClick={() => nudge(1)}
          className="absolute right-1 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full lg:hidden"
        >
          <ChevronRightIcon className="size-4 text-gray-400" />
        </button>
      </nav>
    </div>
  );
}
