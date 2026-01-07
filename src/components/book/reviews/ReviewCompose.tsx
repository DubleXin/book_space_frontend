import { useState } from "react";
import { useMyProfile } from "../../../hooks";
import { Star } from "lucide-react";
import { Button } from "../../ui/Button";
import { ratingStyles } from "./reviews.utils";
import { cn } from "../../../utils/cn";
import { useCreateReview } from "./reviews.hooks";

const ReviewCompose = ({ bookId }: { bookId: number }) => {
  const profileQuery = useMyProfile();

  const [message, setMessage] = useState("");
  const [rating, setRating] = useState<number | undefined>(undefined);

  const canSubmit = message.trim().length > 0;

  const reviewsQuery = useCreateReview();
  const profile = profileQuery.data ?? undefined;

  return (
    <div className="mt-4 border bg-white p-4 md:rounded-2xl dark:border-neutral-800 dark:bg-neutral-950/40">
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-white text-sm font-semibold text-neutral-700 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
          {profile?.username?.[0]?.toUpperCase() ?? "U"}
        </div>

        <div className="min-w-0 flex-1">
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Express an opinion..."
            rows={2}
            className="w-full resize-none rounded-xl border bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500"
          />

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <span className="text-xs text-neutral-600 dark:text-neutral-300">
                Rating
              </span>

              <div className="flex min-w-0 flex-wrap items-center gap-1">
                {([1, 2, 3, 4, 5] as const).map((n) => {
                  const active = rating !== undefined && n <= rating;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      className={cn(
                        "rounded-full p-1 transition focus:outline-none focus:ring-2 focus:ring-sky-500",
                        active
                          ? "text-amber-500"
                          : "text-neutral-300 hover:text-neutral-400 dark:text-neutral-700 dark:hover:text-neutral-600"
                      )}
                      aria-label={`Set rating to ${n}`}
                    >
                      <Star
                        className={cn(
                          "h-5 w-5 stroke-current",
                          active ? "fill-current" : "fill-transparent"
                        )}
                      />
                    </button>
                  );
                })}

                {rating !== undefined ? (
                  <span
                    className={cn(
                      "ml-2 inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-xs font-medium",
                      ratingStyles(rating)
                    )}
                  >
                    {rating}/5
                  </span>
                ) : (
                  <span className="ml-2 text-xs text-neutral-500 dark:text-neutral-400">
                    —
                  </span>
                )}
              </div>
            </div>

            <div className="flex w-full items-center gap-2 sm:w-auto sm:justify-end">
              <button
                type="button"
                className="flex-1 rounded-xl px-3 py-2 text-sm text-neutral-600 
                transition hover:bg-neutral-100 disabled:opacity-50 dark:text-neutral-300 dark:hover:bg-neutral-800 sm:flex-none"
                onClick={() => {
                  setMessage("");
                  setRating(undefined);
                }}
                disabled={message.trim().length === 0 && rating === undefined}
              >
                Cancel
              </button>

              <Button
                type="button"
                variant="primary"
                className="flex-1 sm:w-auto sm:flex-none"
                disabled={!canSubmit}
                onClick={() => {
                  if (rating === undefined && message.trim().length === 0)
                    return;
                  reviewsQuery.mutate({
                    bookId,
                    message,
                    rating,
                  });
                  setMessage("");
                  setRating(undefined);
                }}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCompose;
