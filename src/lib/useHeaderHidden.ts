'use client';

import { useSyncExternalStore } from 'react';

// The header slides away while you scroll down and comes back as soon as you scroll up,
// like on sharepal.in. One shared listener keeps the header, tabs and sidebar in step.

const SHOW_ABOVE = 120; // px from the top where the header always shows
let hidden = false;
let lastY = 0;
const listeners = new Set<() => void>();

function onScroll() {
  const y = window.scrollY;
  let next = hidden;
  if (y <= SHOW_ABOVE) next = false;
  else if (y > lastY + 2) next = true;
  else if (y < lastY - 2) next = false;
  lastY = y;
  if (next !== hidden) {
    hidden = next;
    listeners.forEach((l) => l());
  }
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) {
    lastY = window.scrollY;
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener('scroll', onScroll);
  };
}

export function useHeaderHidden() {
  return useSyncExternalStore(
    subscribe,
    () => hidden,
    () => false,
  );
}
