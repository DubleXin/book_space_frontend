import type { Review } from "../../../../types/profile";
import { cn } from "../../../../utils/cn";
import { toMonDD } from "../../../../utils/date";
import { useProfileByUserId } from "../reviews.hooks";
import { ratingLabel } from "../reviews.utils";
import StarRow from "./StarRow";

const ReviewCard = ({
  review,
  starRowClasses,
}: {
  review: Review;
  starRowClasses: string;
}) => {
  const profileQuery = useProfileByUserId(review.userId);

  const profile = profileQuery.data ?? undefined;

  return (
    <li className="rounded-2xl border bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-950/40">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {String(profile?.username ?? "[username]")}
            </span>

            <span
              className={cn(
                starRowClasses,
                "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium"
              )}
            >
              <StarRow rating={review.rating} />
              <span>{ratingLabel(review.rating)}</span>
            </span>
          </div>
        </div>
        <div>
          <span className=" text-sm text-neutral-600 dark:text-neutral-300">
            {toMonDD(String(review.createdAt)).formatted}
          </span>
        </div>
      </div>

      <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">
        {review.message ?? "[message]"}
      </p>
    </li>
  );
};

export default ReviewCard;
