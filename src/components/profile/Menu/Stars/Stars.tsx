import { Link } from "react-router-dom";
import { useStars } from "../../../../hooks/useStars";
import { toMonDD } from "../../../../utils/date";
import { BookCard } from "../../../ui/BookCard";
import { Star, ArrowUpRight } from "lucide-react";
import { cn } from "../../../../utils/cn";

const Stars = () => {
  const starQuery = useStars();
  const stars = starQuery.data ?? [];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-neutral-950/40">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="mt-1 text-sm text-slate-600 dark:text-white/60">
            Books you’ve starred ({stars.length})
          </p>
        </div>

        <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/5 px-2 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200 dark:bg-white/5 dark:text-white/70 dark:ring-white/10">
          <Star className="h-3.5 w-3.5" />
          Saved
        </span>
      </div>

      {starQuery.isPending ? (
        <div className="rounded-xl border border-dashed border-slate-200 p-6 text-sm text-slate-600 dark:border-white/10 dark:text-white/60">
          Loading stars…
        </div>
      ) : stars.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 p-6 text-sm text-slate-600 dark:border-white/10 dark:text-white/60">
          No starred books yet. Open a book and tap the star to save it here.
        </div>
      ) : (
        <ul className="divide-y divide-slate-200 dark:divide-white/10 overflow-y-auto scrollbar-thin">
          {stars.map((s) => {
            const date = toMonDD(s.createdAt ?? "").formatted;

            return (
              <li key={s.id ?? `${s.bookId}-${s.createdAt}`} className="py-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  {/* left: book preview */}
                  <div className="min-w-0">
                    <BookCard
                      bookId={s.bookId}
                      to={`/book/${s.bookId}`}
                      variant="row"
                      coverSize="md"
                      title={true}
                      author={true}
                      subject={true}
                      cover={true}
                      className={cn(
                        "border-slate-200 dark:border-white/10",
                        "hover:border-neutral-400 dark:hover:border-white/30"
                      )}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3 sm:justify-end">
                    <div className="text-right">
                      <p className="text-xs font-medium text-slate-500 dark:text-white/40">
                        Starred on
                      </p>
                      <p className="text-sm font-semibold text-slate-800 dark:text-white/80">
                        {date}
                      </p>
                    </div>

                    <Link
                      to={`/book/${s.bookId}`}
                      className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
                      aria-label="Open book"
                      title="Open book"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Stars;
