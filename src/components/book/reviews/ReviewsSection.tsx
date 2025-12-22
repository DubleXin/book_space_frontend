//import type { Review } from "../../../types/profile";
import { ReviewCard } from "./ReviewCard";
import { ratingStyles } from "./reviews.utils";

import ReviewCompose from "./ReviewCompose/ReviewCompose";
import { useReviewsByBook } from "./reviews.hooks";
import { useAuth } from "../../../store";

export function ReviewsSection({
  bookId,
  highlighted,
}: {
  bookId: number;
  highlighted?: boolean;
}) {
  const reviewsQuery = useReviewsByBook(bookId);
  const reviews = reviewsQuery.data ?? [];
  const user = useAuth((s) => s.user);

  return (
    <section
      id="reviews"
      className={`rounded-2xl border transition-[border-color,background-color] duration-700 ease-out ${
        highlighted
          ? "border-sky-500 bg-sky-50 dark:border-sky-600 dark:bg-sky-950/30"
          : "border-neutral-200 dark:border-neutral-800"
      } bg-white/50 p-6 shadow-sm dark:bg-neutral-950/30`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Opinions</h2>
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
        </span>
      </div>

      {user && <ReviewCompose bookId={bookId} />}

      <ul className="mt-4 space-y-3">
        {reviews.map((r) => (
          <ReviewCard
            key={`review-${r.id}-${r.bookId ?? "x"}`}
            starRowClasses={ratingStyles(r.rating)}
            review={r}
          />
        ))}
      </ul>
    </section>
  );
}
