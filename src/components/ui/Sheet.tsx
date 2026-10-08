'use client';

import * as Dialog from '@radix-ui/react-dialog';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { XIcon } from '../icons';

/** Right-hand drawer used for search, cart and the full FAQ list (same shape as SharePal's). */
export function Sheet({
  open,
  onClose,
  title,
  children,
  footer,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-primary-900/30 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className={cn(
            'fixed inset-y-0 right-0 z-50 flex h-full w-full flex-col bg-neutral-150 shadow-modal duration-300 ease-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-[576px] sm:rounded-l-3xl',
            className,
          )}
        >
          <div className="flex flex-shrink-0 items-center gap-4 border-b border-neutral-200 bg-gray-100 px-5 py-5 sm:rounded-tl-3xl">
            <Dialog.Close className="inline-flex size-8 items-center justify-center rounded-full transition-colors hover:bg-neutral-150">
              <XIcon className="size-6" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
            <Dialog.Title className="text-h4 text-primary-900">{title}</Dialog.Title>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
          {footer && (
            <div className="flex-shrink-0 border-t border-neutral-200 bg-gray-100 p-4">{footer}</div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
