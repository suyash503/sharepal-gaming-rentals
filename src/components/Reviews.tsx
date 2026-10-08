import { reviews, stats, type Review } from '@/data/content';
import { GoogleIcon, StarIcon } from './icons';

/** "Served more than 1 Lakh Orders": an endless marquee of Google reviews (pauses on hover), then the impact stats. */
export function Reviews() {
  return (
    <section
      aria-labelledby="reviews-title"
      className="flex flex-col gap-5 bg-gray-100 py-4 lg:gap-12 lg:py-12"
    >
      <h2 id="reviews-title" className="px-4 text-center font-ubuntu text-d7 md:max-w-full md:text-d4">
        Served more than <span className="text-decorative-orange">1 Lakh Orders</span>
      </h2>
      <div className="flex gap-5 overflow-hidden py-3">
        <div className="group overflow-hidden p-2">
          <div
            className="flex w-max animate-marquee-horizontal flex-row gap-4 px-4 group-hover:[animation-play-state:paused]"
            style={{ '--duration': '60s' } as React.CSSProperties}
          >
            {/* Two identical runs, so translating by -50% loops seamlessly. */}
            {[0, 1].map((run) => (
              <ul key={run} className="flex shrink-0 gap-4" aria-hidden={run === 1}>
                {reviews.map((r) => (
                  <ReviewCard key={r.name} review={r} />
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
      <div className="container grid w-full grid-cols-3 justify-between gap-3 border-y-2 border-neutral-150 !px-0 py-4 md:gap-6 md:py-6">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-2">
            <p className="bg-review-gradient bg-clip-text py-0 text-center font-ubuntu text-2xl font-bold text-transparent md:py-3 lg:text-6xl">
              {s.value}
            </p>
            <p className="text-center text-xs capitalize text-gray-800 sm:text-xl">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <li className="flex min-w-[328px] max-w-[328px] flex-col justify-between gap-4 rounded-2xl border border-neutral-200 bg-neutral-100 p-3 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] md:rounded-3xl lg:min-w-[360px] lg:max-w-[360px] lg:p-4 lg:px-0">
      <div className="flex flex-col gap-2 p-0 md:px-4">
        <div className="flex gap-2" aria-label="Rated 5 out of 5 on Google">
          <GoogleIcon />
          <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon key={i} />
            ))}
          </div>
        </div>
        <blockquote className="line-clamp-4 text-sh6 text-primary-900 lg:text-sh2">
          “ {review.quote} ”
        </blockquote>
      </div>
      <div className="flex gap-5 p-0 md:px-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-150 text-xs font-semibold text-primary-600 md:text-base">
          {review.initials}
        </span>
        <div>
          <p className="text-xs font-medium text-gray-600 lg:text-sm">{review.name}</p>
          <p className="text-[10px] text-gray-400 lg:text-sm">
            {review.city} • {review.product}
          </p>
        </div>
      </div>
    </li>
  );
}
