'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { toast } from 'sonner';
import { productById } from './products';
import { chargeableDays, fromKey, MIN_GAP_DAYS, daysBetween, startOfDay, type RentalDates } from './rental';

type Panel = 'dates' | 'city' | 'search' | 'cart' | 'faq' | null;

type Persisted = {
  city: string;
  dates: RentalDates | null;
  cart: Record<number, number>;
  wishlist: number[];
  waitlist: number[];
};

type Store = Persisted & {
  hydrated: boolean;
  days: number; // chargeable days, 0 until dates are set
  panel: Panel;
  openPanel: (p: Panel) => void;
  closePanel: () => void;
  setCity: (city: string) => void;
  setDates: (dates: RentalDates) => void;
  addToCart: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  toggleWishlist: (id: number) => void;
  joinWaitlist: (id: number) => void;
  cartCount: number;
};

const KEY = 'sharepal-recreation:v1';
const initial: Persisted = { city: 'Bangalore', dates: null, cart: {}, wishlist: [], waitlist: [] };

const StoreContext = createContext<Store | null>(null);

function readPersisted(): Persisted {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return initial;
    const saved = { ...initial, ...(JSON.parse(raw) as Partial<Persisted>) };
    // Drop saved dates once the delivery day has passed or the range is no longer valid.
    if (saved.dates) {
      const delivery = fromKey(saved.dates.delivery);
      const pickup = fromKey(saved.dates.pickup);
      if (delivery < startOfDay(new Date()) || daysBetween(delivery, pickup) < MIN_GAP_DAYS)
        saved.dates = null;
    }
    return saved;
  } catch {
    return initial;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(initial);
  const [hydrated, setHydrated] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);
  // An "add to cart" made before dates were picked; completed once the date dialog is confirmed.
  const pendingAdd = useRef<number | null>(null);

  useEffect(() => {
    const saved = readPersisted();
    setState(saved);
    setHydrated(true);
    // Like the live page, ask for rental dates on arrival, but only if we don't already have them.
    if (!saved.dates) {
      const t = window.setTimeout(() => setPanel((p) => p ?? 'dates'), 700);
      return () => window.clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      // Private mode or storage full: the page still works, it just won't remember.
    }
  }, [state, hydrated]);

  const days = state.dates ? chargeableDays(fromKey(state.dates.delivery), fromKey(state.dates.pickup)) : 0;

  const addNow = useCallback((id: number) => {
    setState((s) => ({ ...s, cart: { ...s.cart, [id]: (s.cart[id] ?? 0) + 1 } }));
    const p = productById(id);
    toast.success('Added to cart', { description: p?.name });
  }, []);

  const addToCart = useCallback(
    (id: number) => {
      if (!state.dates) {
        pendingAdd.current = id;
        setPanel('dates');
        return;
      }
      addNow(id);
    },
    [state.dates, addNow],
  );

  const setDates = useCallback(
    (dates: RentalDates) => {
      setState((s) => ({ ...s, dates }));
      setPanel(null);
      if (pendingAdd.current !== null) {
        const id = pendingAdd.current;
        pendingAdd.current = null;
        addNow(id);
      }
    },
    [addNow],
  );

  const closePanel = useCallback(() => {
    setPanel((p) => {
      if (p === 'dates') pendingAdd.current = null;
      return null;
    });
  }, []);

  const value = useMemo<Store>(
    () => ({
      ...state,
      hydrated,
      days,
      panel,
      openPanel: setPanel,
      closePanel,
      setCity: (city) => {
        setState((s) => ({ ...s, city }));
        setPanel(null);
      },
      setDates,
      addToCart,
      setQty: (id, qty) =>
        setState((s) => {
          const cart = { ...s.cart };
          if (qty <= 0) delete cart[id];
          else cart[id] = qty;
          return { ...s, cart };
        }),
      // Toasts stay outside the state updaters: React may run an updater twice.
      toggleWishlist: (id) => {
        const has = state.wishlist.includes(id);
        toast(has ? 'Removed from wishlist' : 'Saved to wishlist', { description: productById(id)?.name });
        setState((s) => ({ ...s, wishlist: has ? s.wishlist.filter((w) => w !== id) : [...s.wishlist, id] }));
      },
      joinWaitlist: (id) => {
        if (state.waitlist.includes(id)) return;
        toast.success("You're on the waitlist", {
          description: "We'll let you know the moment it launches.",
        });
        setState((s) => ({ ...s, waitlist: [...s.waitlist, id] }));
      },
      cartCount: Object.values(state.cart).reduce((a, b) => a + b, 0),
    }),
    [state, hydrated, days, panel, closePanel, setDates, addToCart],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const s = useContext(StoreContext);
  if (!s) throw new Error('useStore must be used inside <StoreProvider>');
  return s;
}
