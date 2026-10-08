import Image from 'next/image';
import { hero } from '@/data/content';
import { cn } from '@/lib/utils';
import { LogoPal, LogoShare } from './icons';

/** Purple "Gaming Consoles" banner with the console art bleeding off both bottom corners. */
export function HeroBanner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative flex min-h-[150px] w-full items-center justify-center overflow-hidden rounded-xl bg-gaming-hero max-md:shadow-lg md:min-h-[228px]',
        className,
      )}
    >
      <div className="absolute -bottom-12 left-0 z-0 hidden md:flex">
        <Image
          src={hero.left}
          alt=""
          width={250}
          height={250}
          priority
          className="w-44 object-contain xl:w-[250px]"
        />
      </div>
      <div className="absolute -bottom-11 right-0 z-0 sm:-bottom-10 md:-bottom-12">
        <Image
          src={hero.right}
          alt=""
          width={250}
          height={250}
          priority
          className="w-48 object-contain sm:w-60 md:w-44 xl:w-[250px]"
        />
      </div>
      <div className="relative z-10 flex w-full flex-col items-start justify-center gap-1.5 px-4 text-white md:items-center md:gap-3 md:text-center">
        <h2 className="font-ubuntu text-h5 font-bold capitalize leading-tight tracking-tight drop-shadow-lg max-md:text-[22px] md:text-d5">
          {hero.title}
        </h2>
        {/* Shrink-to-fit wrapper: the line is 75% (max 70%) of its own one-line width, which sets where it wraps. */}
        <div className="flex flex-col items-start md:items-center md:gap-1">
          <p className="w-[75%] text-o4 font-bold drop-shadow-md max-md:text-start sm:text-b4 sm:font-bold md:max-w-[70%] lg:text-sh1 lg:font-bold xl:text-h6">
            Rent the latest gaming gadgets from{' '}
            <span
              className="mx-1 inline-flex w-14 items-center justify-center align-middle md:w-20"
              aria-label="SharePal"
            >
              <LogoShare className="h-auto w-[62%]" />
              <LogoPal fill="#fff" className="h-auto w-[38%]" />
            </span>{' '}
            PS5, Xbox, Oculus VR, Racing Wheel on rent.
          </p>
        </div>
        <div className="flex w-full flex-wrap items-center justify-start gap-1 md:mt-3 md:max-w-lg md:justify-center md:gap-2">
          {hero.brands.map((b, i) => (
            <span key={b.alt} className="contents">
              {i > 0 && (
                <span className="h-4 w-[2px] rounded-full bg-category-purple opacity-50 md:h-6 md:w-[3px] md:opacity-70" />
              )}
              {/* eslint-disable-next-line @next/next/no-img-element -- tiny SVG wordmarks, nothing to optimise */}
              <img src={b.src} alt={b.alt} className="h-auto w-12 object-contain md:w-24" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
