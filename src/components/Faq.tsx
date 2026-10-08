'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { FAQ_PREVIEW_COUNT, faqs, type Faq } from '@/data/content';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export function FaqSection() {
  const { openPanel } = useStore();
  return (
    <section aria-labelledby="faq-title" className="container !my-10 rounded-3xl bg-gray-100 p-4 py-10">
      <div className="flex h-full w-full flex-col items-start gap-2 p-4 !pt-0 md:p-6">
        <h2 id="faq-title" className="py-2 text-h4 text-neutral-900 md:text-h2">
          Frequently Asked Questions (FAQs)
        </h2>
        <Accordion.Root type="single" collapsible className="w-full">
          {faqs.slice(0, FAQ_PREVIEW_COUNT).map((f, i) => (
            <FaqItem key={f.q} faq={f} value={`faq-${i}`} />
          ))}
        </Accordion.Root>
        <button
          type="button"
          onClick={() => openPanel('faq')}
          className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-4xl bg-neutral-150 px-6 py-3 text-b3 font-semibold text-primary-900 transition-colors hover:bg-neutral-200"
        >
          View more FAQ&apos;s
        </button>
      </div>
    </section>
  );
}

export function FaqItem({
  faq,
  value,
  className,
  compact,
}: {
  faq: Faq;
  value: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <Accordion.Item
      value={value}
      className={cn('rounded-xl bg-gray-100 transition-colors duration-300 hover:bg-gray-150', className)}
    >
      <Accordion.Header className="flex">
        <Accordion.Trigger
          className={cn(
            'group flex flex-1 items-center justify-between gap-4 px-4 py-4 text-left transition-all hover:underline',
            compact ? 'text-sh5 md:text-sh3' : 'text-sh4 md:text-sh3',
          )}
        >
          {faq.q}
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <p className="px-4 pb-4 text-b5 text-neutral-500">{faq.a}</p>
      </Accordion.Content>
    </Accordion.Item>
  );
}
