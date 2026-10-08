import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Teach tailwind-merge SharePal's type scale, otherwise `text-sh5` reads as a colour
// and silently knocks out `text-neutral-700` (or the other way round).
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            ...['d4', 'd5', 'd6', 'd7', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7'],
            ...['sh1', 'sh2', 'sh3', 'sh4', 'sh5', 'sh6', 'sh7', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7'],
            ...['bt1', 'bt2', 'bt3', 'bt4', 'o2', 'o3', 'o4'],
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
