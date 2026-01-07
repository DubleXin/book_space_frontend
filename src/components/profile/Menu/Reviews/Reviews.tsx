import { useMemo, useState } from "react";
import { useReviews } from "../../../../hooks/useReviews";
import { toMonDD } from "../../../../utils/date";
import { BookCard } from "../../../ui/BookCard";
import { IconButton } from "../../../ui/IconButton";
import { MessageSquareText, Trash2 } from "lucide-react";
import { cn } from "../../../../utils/cn";
import ConfirmDialog from "../../../ui/ConfirmDialog";
import RatingPill from "./RatingPill";
import { clampText } from "../../../../utils/text";
import { useDeleteReview } from "../../profile.hooks";

const Reviews = () => {
  const reviewQuery = useReviews();
  const reviews = useMemo(() => reviewQuery.data ?? [], [reviewQuery.data]);

  const deleteReviewMutation = useDeleteReview();

  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const deleteTarget = useMemo(
    () => reviews.find((r) => r.id === deleteId),
    [reviews, deleteId]
  );

  const toggleExpanded = (id: number) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleDelete = () => {
    if (deleteId == null) return;

    deleteReviewMutation.mutate(deleteId, {
      onSuccess: () => setDeleteId(null),
      onError: () => setDeleteId(null),
    });
  };

  return (
    <>
      <section className="md:rounded-2xl md:border border-slate-200 bg-white/70 p-2 md:p-4 md:shadow-sm md:backdrop-blur dark:border-white/10 dark:bg-neutral-950/40 sm:p-6">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <div className="min-w-0">
            <p className="mt-1 text-sm text-slate-600 dark:text-white/60">
              Your latest reviews ({reviews.length})
            </p>
          </div>

          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-slate-900/5 px-2 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200 dark:bg-white/5 dark:text-white/70 dark:ring-white/10">
            <MessageSquareText className="h-3.5 w-3.5" />
            Posted
          </span>
        </div>

        {reviewQuery.isPending ? (
          <div className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-600 dark:border-white/10 dark:text-white/60 sm:p-6">
            Loading reviews…
          </div>
        ) : reviews.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-600 dark:border-white/10 dark:text-white/60 sm:p-6">
            No reviews yet. Open a book and leave your first review.
          </div>
        ) : (
          <ul className="divide-y divide-slate-200 dark:divide-white/10">
            {reviews.map((r) => {
              const date = toMonDD(r.createdAt ?? "").formatted;
              const isOpen = !!expanded[r.id];
              const needsCollapse = (r.message?.length ?? 0) > 180;

              return (
                <li key={r.id} className="py-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <BookCard
                          bookId={r.bookId}
                          to={`/book/${r.bookId}`}
                          variant="row"
                          coverSize="md"
                          title={true}
                          author={true}
                          subject={true}
                          cover={true}
                          className={cn(
                            "border-slate-200 dark:border-white/10",
                            "hover:border-neutral-400 dark:hover:border-white/30",
                            "flex-col md:flex-row"
                          )}
                        />
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
                        <div className="text-left sm:text-right">
                          <p className="text-xs font-medium text-slate-500 dark:text-white/40">
                            Posted on
                          </p>
                          <p className="text-sm font-semibold text-slate-800 dark:text-white/80">
                            {date}
                          </p>
                        </div>

                        <RatingPill rating={r.rating} />

                        <IconButton
                          label="Delete review"
                          Icon={Trash2}
                          variant="ghost"
                          size="sm"
                          disabled={deleteReviewMutation.isPending}
                          className="shrink-0 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          onClick={() => setDeleteId(r.id)}
                        />
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white/60 p-3 dark:border-white/10 dark:bg-white/5 sm:p-4">
                      <p className="text-sm leading-relaxed text-slate-700 dark:text-white/70">
                        {isOpen || !needsCollapse
                          ? r.message
                          : clampText(r.message, 180)}
                      </p>

                      {needsCollapse ? (
                        <button
                          type="button"
                          onClick={() => toggleExpanded(r.id)}
                          className="mt-2 text-xs font-semibold text-sky-700 hover:text-sky-800 dark:text-sky-300 dark:hover:text-sky-200"
                        >
                          {isOpen ? "Show less" : "Show more"}
                        </button>
                      ) : null}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <ConfirmDialog
        open={deleteId != null}
        title="Delete review?"
        description={
          deleteTarget
            ? `This will permanently remove your review for this book.`
            : "This will permanently remove your review."
        }
        confirmLabel="Delete"
        onClose={() =>
          deleteReviewMutation.isPending ? null : setDeleteId(null)
        }
        onConfirm={handleDelete}
        isBusy={deleteReviewMutation.isPending}
      />
    </>
  );
};

export default Reviews;
