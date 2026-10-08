import data from '@/data/product-list.json';

export type ProductTag = '' | 'Trending' | 'New' | 'Vote to Launch';

export type Product = {
  id: number;
  name: string;
  image: string;
  rating: number;
  booked_count: number;
  tag: ProductTag;
  per_day_rent: number;
  out_of_stock: boolean;
};

export const products: Product[] = (data.products as Product[]).map((p) => ({
  ...p,
  // One image URL in the feed has a raw space ("ps5-with-2%20controllers" is fine, but guard anyway).
  image: p.image.replace(/ /g, '%20'),
}));

// Order of the 50 products on sharepal.in/bangalore/gaming-gadgets-on-rent (captured 2026-10-08).
// "Recommended" follows it so the grid opens in the same sequence as the live page.
const LIVE_ORDER = [
  'PlayStation Portal Remote Player',
  'PS5 + FC27 + 1 Controller',
  'PS5 + FC27 + 2 Controllers',
  'PS5 + FC27 + 4 Controllers',
  'PS5 + FC26 + 1 Controller',
  'PS5 + FC26 + 2 Controllers',
  'PS5 + FC26 + 4 Controllers',
  'PS5 + Games (100+) + 1 Controller',
  'PS5 All in one Combo + 2 Controllers',
  'PS5 + Games (100+) + 2 Controllers',
  'PS5 + 1 Controller (Disc or Digital) (No Games Included)',
  'PS5 + EA Play + 1 Controller',
  'PS5 + 2 Controllers (Disc or Digital) (No Games Included)',
  'FC25 + 2 Controllers Combo',
  'PS5 All in one Combo + 1 Controller',
  'Cricket 24 + 2 Controllers (Digital Game)',
  'Uncharted Series + 1 Controller (Digital Game)',
  'PS5 + EA Play + 2 Controllers',
  'FC24 + 2 Controllers (Digital Game)',
  'God Of War Ragnarök + 1 Controller (Digital Game)',
  'Ghost of Tsushima + 1 Controller (Digital Game)',
  'PS5 Mega Racing Wheel Combo',
  'Spider-Man Miles Morales + 1 Controller (Digital Game)',
];

const rank = (p: Product) => {
  const i = LIVE_ORDER.indexOf(p.name);
  return i === -1 ? LIVE_ORDER.length : i;
};

export type SortKey = 'recommended' | 'popular' | 'price-asc' | 'price-desc' | 'rating';

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'popular', label: 'Most booked' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top rated' },
];

/** Products you can't rent yet (waitlist) or right now (out of stock) sink below rentable ones, except in Recommended. */
export function sortProducts(list: Product[], key: SortKey): Product[] {
  const out = [...list];
  const unavailable = (p: Product) => Number(p.out_of_stock || p.tag === 'Vote to Launch');
  switch (key) {
    case 'recommended':
      return out.sort((a, b) => rank(a) - rank(b));
    case 'popular':
      return out.sort((a, b) => unavailable(a) - unavailable(b) || b.booked_count - a.booked_count);
    case 'price-asc':
      return out.sort((a, b) => unavailable(a) - unavailable(b) || a.per_day_rent - b.per_day_rent);
    case 'price-desc':
      return out.sort((a, b) => unavailable(a) - unavailable(b) || b.per_day_rent - a.per_day_rent);
    case 'rating':
      return out.sort(
        (a, b) => unavailable(a) - unavailable(b) || b.rating - a.rating || b.booked_count - a.booked_count,
      );
  }
}

export const isWaitlist = (p: Product) => p.tag === 'Vote to Launch';

export const productById = (id: number) => products.find((p) => p.id === id);

/** The waitlist product shows "33 / 1000 joined" on the live page; the feed doesn't carry that number. */
export const WAITLIST = { joined: 33, goal: 1000 };
