'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  footerCategories,
  footerColumns,
  rentingVsBuying,
  seoCategories,
  SHAREPAL,
  socials,
  whySharePal,
} from '@/data/content';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import {
  ChevronUpIcon,
  FacebookIcon,
  FooterLogoShare,
  HeadsetIcon,
  InstagramIcon,
  LinkedinIcon,
  LogoPal,
  MailIcon,
} from './icons';

const socialIcons = { Facebook: FacebookIcon, Instagram: InstagramIcon, LinkedIn: LinkedinIcon };

export function Footer() {
  return (
    <footer className="bg-primary-900 py-5 pb-24 md:py-[72px] md:pb-10">
      <div className="container flex w-full flex-col gap-5 md:gap-12">
        {/* Category directory: columns on desktop, accordions on mobile */}
        <div className="grid gap-6 max-md:hidden md:grid-cols-4 md:gap-10 lg:grid-cols-5">
          {footerCategories.map((c) => (
            <div key={c.title} className="flex w-full flex-col gap-4">
              <h3 className="line-clamp-2 text-lg font-semibold text-gray-100">{c.title}</h3>
              {c.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-b6 text-neutral-300 transition-all duration-75 hover:text-neutral-200 hover:underline md:text-b4"
                >
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <Accordion.Root type="single" collapsible className="flex w-full flex-col gap-3 md:hidden">
          {footerCategories.map((c) => (
            <Accordion.Item key={c.title} value={c.title}>
              <Accordion.Header className="flex">
                <Accordion.Trigger className="group flex flex-1 items-center justify-between rounded-lg bg-primary-800 p-3 text-left text-xs font-semibold text-gray-100">
                  {c.title}
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
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="flex flex-col gap-3 px-3 pb-1 pt-3">
                  {c.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      className="text-b6 text-neutral-300 hover:text-neutral-200 hover:underline"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        <SeoCopy />

        <div className="flex w-full flex-col gap-8">
          <div className="flex h-10 w-full items-center bg-footer-logo">
            <FooterLogoShare className="h-auto w-24" />
            <LogoPal />
          </div>
          <div className="grid w-full grid-cols-2 gap-x-3 gap-y-6 md:gap-3 lg:grid-cols-5">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-3 min-w-max text-sh4 text-gray-100 md:mb-6">{col.title}</h3>
                <div className="flex min-w-max flex-col gap-1 text-xs font-medium text-neutral-300">
                  {col.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      {...(l.href.startsWith(SHAREPAL)
                        ? {}
                        : { target: '_blank', rel: 'noopener noreferrer' })}
                      className="w-full min-w-max py-1.5 text-b6 decoration-transparent transition-all duration-300 hover:text-primary-100 hover:underline hover:decoration-white md:py-3 md:text-b4"
                    >
                      {l.label}
                      {l.isNew && (
                        <span className="ml-1 inline-flex -translate-y-2 items-center rounded-full bg-secondary-500 px-2.5 py-[0.5px] text-[10px] font-bold text-secondary-900">
                          New
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <h3 className="mb-3 min-w-max text-sh4 text-gray-100 md:mb-6">Need Help</h3>
              <div className="flex min-w-max flex-col gap-2 text-xs font-medium text-neutral-300">
                <button
                  type="button"
                  onClick={() =>
                    toast('Support chat opens on sharepal.in', {
                      description: 'Write to care@sharepal.in in the meantime.',
                    })
                  }
                  className="flex items-center gap-2 py-1.5 transition-colors duration-300 hover:text-white md:py-3"
                >
                  <HeadsetIcon className="h-4 w-4 shrink-0" />
                  <span className="text-b6 md:text-b4">Contact Support</span>
                </button>
                <a
                  href={`${SHAREPAL}/support`}
                  className="flex items-center gap-2 py-1.5 transition-colors duration-300 hover:text-white md:py-3"
                >
                  <span className="text-b6 md:text-b4">Contact Us</span>
                </a>
                <a
                  href="mailto:care@sharepal.in"
                  className="flex items-center gap-2 py-1.5 transition-colors duration-300 hover:text-white md:py-3"
                >
                  <MailIcon />
                  <span className="text-b6 md:text-b4">care@sharepal.in</span>
                </a>
                <div className="flex items-center gap-3 py-1.5 md:py-3">
                  {socials.map((s) => {
                    const Icon = socialIcons[s.label];
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit SharePal on ${s.label}`}
                        className="transition-opacity duration-300 hover:opacity-80"
                      >
                        <Icon />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-between gap-4 border-t border-primary-700 py-6 text-sm font-medium text-primary-300 max-md:flex-col">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex cursor-pointer items-center gap-2 max-md:w-full max-md:justify-center max-md:rounded-sm max-md:bg-primary-850 max-md:py-2"
            >
              Go up <ChevronUpIcon />
            </button>
            <p>© {new Date().getFullYear()}. SWNAC E-Kiraya Services Pvt Ltd</p>
            <p>
              Made with <span className="text-destructive-500">♥</span> for India
            </p>
          </div>
          <p className="-mt-6 text-center text-o4 text-primary-300/60 md:text-left">
            Independent recreation of sharepal.in/bangalore/gaming-gadgets-on-rent, built for a SharePal
            internship assignment.
          </p>
        </div>
      </div>
    </footer>
  );
}

/** Long-form SEO copy, clipped to a few lines until "Read More". */
function SeoCopy() {
  const { city } = useStore();
  const [open, setOpen] = useState(false);
  const link = 'text-sh4 font-semibold text-primary-100 underline';
  return (
    <div className="flex flex-col gap-2">
      <div
        id="footer-seo"
        className={cn(
          'overflow-hidden transition-[max-height] duration-500 ease-in-out',
          open ? 'max-h-[1600px]' : 'max-h-[260px]',
        )}
      >
        <div className="flex w-full flex-col gap-5 text-pretty text-sm text-neutral-300">
          <div>
            <h2 className="my-1 text-lg font-medium text-gray-100">
              <a href={`${SHAREPAL}/bangalore/rent`} className={link}>
                Renting from SharePal in {city}
              </a>
            </h2>
            <p>
              Discover the convenience of renting from SharePal, your trusted partner in {city} for all your
              rental needs. Whether you&apos;re exploring the vibrant streets of Koramangala, setting up a
              shoot in Indiranagar, or planning a trek from the outskirts of Whitefield, SharePal has you
              covered. We offer a wide range of products, including cameras, action cameras, gaming consoles,
              projectors, speakers, trekking gear, riding gear, and creator gear. With free home delivery and
              pickup services, flexible rental tenures, and an easy-to-use platform, renting has never been
              easier. Experience the freedom to rent what you need, when you need it, without the commitment
              of buying.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="my-1 text-sh4 text-gray-100">Categories on Rent</h2>
            {seoCategories.map((c) => (
              <div key={c.title}>
                <h3 className="my-2">
                  <a href={c.href} className={link}>
                    {c.title}
                  </a>
                </h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
          <div>
            <h2 className="my-2 text-sh4 text-gray-100">Renting vs. Buying</h2>
            <ul className="list-disc space-y-1 pl-5">
              {rentingVsBuying.map(([k, v]) => (
                <li key={k}>
                  <b className="font-medium text-neutral-200">{k}</b>: {v}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="my-2 text-sh4 text-gray-100">Why SharePal in {city}</h2>
            <p>
              SharePal stands out in {city} for its customer-focused services and unique selling propositions
              (USPs):
            </p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              {whySharePal.map(([k, v]) => (
                <li key={k}>
                  <b className="font-medium text-neutral-200">{k}</b>: {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="footer-seo"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 self-start text-bt4 text-neutral-200 transition-colors hover:text-neutral-100"
      >
        {open ? 'Read Less' : 'Read More'}
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={cn('h-4 w-4 transition-transform', open && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </div>
  );
}
