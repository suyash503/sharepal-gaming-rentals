'use client';

import { SHAREPAL } from '@/data/content';
import { useStore } from '@/lib/store';

export function Breadcrumbs() {
  const { city } = useStore();
  return (
    <nav aria-label="Breadcrumb" className="container py-3 md:py-6">
      <ol className="flex items-center justify-start gap-1.5 overflow-hidden text-sm text-muted-foreground sm:gap-2.5">
        <li className="inline-flex items-center gap-1.5">
          <a
            href={`${SHAREPAL}/${city.toLowerCase()}`}
            className="text-sh7 text-neutral-500 transition-colors hover:text-neutral-600 md:text-sh5"
          >
            {city}
          </a>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </li>
        <li className="inline-flex items-center gap-1.5">
          <span aria-current="page" className="text-sh7 text-neutral-900 md:text-sh5">
            Gaming gadgets on rent
          </span>
        </li>
      </ol>
    </nav>
  );
}
