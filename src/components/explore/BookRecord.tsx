import { Link } from "react-router-dom";
import type { Book } from "../../types/book";
import { cn } from "../../utils/cn";
import { clampText } from "../../utils/text";
import { ExternalLink } from "lucide-react";
import { normalizeSubjectName } from "./explore.utils";
import { Tag } from "../ui/Tag";
import type { Filters } from "./explore.types";

const BookRecord = ({
  book,
  filters,
  toggleTag,
}: {
  book: Book;
  filters: Filters;
  toggleTag: (tagLike: string) => void;
}) => {
  const firstSubject = book.subjects?.[0]?.name?.replaceAll("_", " ") ?? "";
  return (
    <Link
      to={`/book/${book.id}`}
      className={cn(
        `
            group flex gap-3
            rounded-xl border border-neutral-200 bg-white p-3
            hover:bg-gray-50 hover:border-neutral-500
            dark:border-neutral-500 dark:bg-neutral-950
            dark:hover:bg-neutral-800/60 dark:hover:border-neutral-300
            transition
            focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
            `
      )}
    >
      <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-lg border bg-gray-100 dark:border-neutral-800 dark:bg-neutral-900">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[10px] text-gray-500 dark:text-gray-400">
            No cover
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
              {book.title}
            </div>

            <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-600 dark:text-gray-400">
              <span className="truncate">
                {book.author ? clampText(book.author, 28) : "Unknown author"}
              </span>

              {book.publishedYear ? (
                <span className="opacity-70">•</span>
              ) : null}
              {book.publishedYear ? (
                <span className="tabular-nums opacity-80">
                  {book.publishedYear}
                </span>
              ) : null}

              {firstSubject ? <span className="opacity-70">•</span> : null}
              {firstSubject ? (
                <span className="truncate opacity-80">{firstSubject}</span>
              ) : null}
            </div>
          </div>

          <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 text-xs text-gray-500 opacity-0 transition group-hover:opacity-100 dark:text-gray-400">
            <ExternalLink className="h-4 w-4" />
          </span>
        </div>

        {book.subjects?.length ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {book.subjects.slice(0, 4).map((s, i) => {
              const subject = normalizeSubjectName(s.name);
              const selected = filters.subject.includes(subject);
              return (
                <Tag
                  key={`${s.id}-${i}`}
                  size="sm"
                  variant={selected ? "primary" : "outline"}
                  selected={selected}
                  className="w-auto"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleTag(s.name);
                  }}
                >
                  {s.name.replaceAll("_", " ")}
                </Tag>
              );
            })}

            {book.subjects.length > 4 ? (
              <span className="self-center text-[11px] text-gray-500 dark:text-gray-400">
                +{book.subjects.length - 4} more
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </Link>
  );
};

export default BookRecord;
