'use client';

import Image from 'next/image';
import { toast } from 'sonner';
import { productById } from '@/lib/products';
import { useStore } from '@/lib/store';
import { CalendarPlusIcon, CartLineIcon, ChatBubblesIcon, GridIcon, HomeIcon, SearchLineIcon } from './icons';

/**
 * Bottom-centre pill. Before dates are picked it asks for them (like the live page);
 * once something is in the cart it turns into the green "Go to Cart" button.
 */
export function FloatingPill() {
  const { hydrated, dates, cart, cartCount, openPanel, panel } = useStore();
  if (!hydrated || panel) return null;
  const lastId = Number(Object.keys(cart).at(-1));
  const last = lastId ? productById(lastId) : undefined;

  if (cartCount > 0) {
    return (
      <div className="fixed inset-x-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-30 mx-auto flex max-w-max animate-pill-in justify-center md:bottom-10">
        <button
          type="button"
          onClick={() => openPanel('cart')}
          className="flex items-center gap-3 rounded-full bg-secondary-500 py-2 pl-2 pr-5 text-bt1 text-primary-900 shadow-[0_8px_24px_rgba(158,255,0,0.35)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="relative flex size-9 items-center justify-center overflow-hidden rounded-xl bg-white p-1">
            {last && (
              <Image
                src={last.image}
                alt=""
                width={36}
                height={36}
                className="h-full w-full object-contain"
              />
            )}
          </span>
          Go to Cart
          <span className="rounded-full bg-primary-900 px-2 py-0.5 text-o3 text-secondary-500">
            {cartCount}
          </span>
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    );
  }

  if (dates) return null;

  return (
    <div className="fixed inset-x-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-30 mx-auto flex max-w-max animate-pill-in justify-center md:bottom-10">
      <button
        type="button"
        onClick={() => openPanel('dates')}
        className="relative rounded-full border-2 border-secondary-500 bg-primary-900 transition-transform hover:scale-[1.02]"
      >
        <span className="flex items-center justify-center gap-2 px-[18px] py-[14px] text-sh5 text-gray-100">
          <CalendarPlusIcon className="h-4 w-4" />
          Select rental dates to view prices
        </span>
      </button>
    </div>
  );
}

export function ChatFab() {
  return (
    <button
      type="button"
      aria-label="Chat with SharePal"
      onClick={() =>
        toast('Hi! 👋', {
          description:
            'The SharePal assistant lives on sharepal.in. For anything urgent, write to care@sharepal.in.',
        })
      }
      className="fixed bottom-16 right-2 z-30 transition-transform hover:scale-105 md:bottom-10 md:right-6"
    >
      <span className="block w-20 lg:w-28">
        <ChatBubblesIcon className="h-auto w-full" />
      </span>
    </button>
  );
}

export function MobileNav() {
  const { openPanel, cartCount } = useStore();
  const items = [
    { label: 'Home', Icon: HomeIcon, onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    {
      label: 'Category',
      Icon: GridIcon,
      onClick: () =>
        document.getElementById('listing-title')?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
    },
    { label: 'Search', Icon: SearchLineIcon, onClick: () => openPanel('search') },
    { label: 'Cart', Icon: CartLineIcon, onClick: () => openPanel('cart'), badge: cartCount },
  ];
  return (
    <nav
      aria-label="Quick links"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-gray-100 px-1.5 pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <div className="relative mx-auto flex w-full max-w-sm gap-0.5 py-1.5">
        {items.map(({ label, Icon, onClick, badge }) => (
          <button
            key={label}
            type="button"
            onClick={onClick}
            className="relative flex flex-1 flex-col items-center justify-center rounded-lg px-1 py-1.5 text-primary-900 transition-colors hover:text-primary-800"
          >
            <Icon className="h-5 w-5" />
            <span className="mt-0.5 text-[10px]">{label}</span>
            {!!badge && (
              <span className="absolute right-[calc(50%-18px)] top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive-500 px-1 text-o3 text-white">
                {badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
