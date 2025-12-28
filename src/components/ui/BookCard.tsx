import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

const shortenString = (value: string = "", limit: number): string | undefined =>
  value && value.length > limit ? value.substring(0, limit - 3) + "..." : value;

const bookCardVariants = {
  tile: `
    group flex flex-col gap-2
  `,
  row: `
    group flex items-center gap-3
  `,
};

const coverSizes = {
  sm: "w-12",
  md: "w-16",
  lg: "w-20",
};

type BookCardProps = {
  bookId: string | number;
  title: boolean;
  author?: boolean;
  subject?: boolean;
  cover?: boolean | null;

  to: string;

  variant?: keyof typeof bookCardVariants;
  coverSize?: keyof typeof coverSizes;

  badge?: string;

  className?: string;
};
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchBook } from "../../api/book";

export function BookCard({
  bookId,
  title,
  author,
  subject,
  cover: coverUrl,
  to,
  variant = "tile",
  coverSize = "md",
  badge,
  className,
}: BookCardProps) {
  const bookQuery = useQuery({
    queryKey: ["book", bookId],
    queryFn: ({ signal }) => fetchBook(bookId, signal),
    staleTime: 120 * 60 * 1000,
    placeholderData: keepPreviousData,
    enabled: !!bookId,
  });

  const book = bookQuery?.data?.data ?? undefined;

  const isRow = variant === "row";
  const subjectDisplay =
    !!book && !!book.subjects ? book.subjects[0].name.replace("_", " ") : "";
  return (
    <Link
      to={to}
      className={cn(
        `
        rounded-xl 
        border 
        hover:border hover:border-neutral-500
        dark:hover:border-neutral-300
        focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
        transition
        `,
        isRow
          ? "p-2 hover:bg-gray-50 dark:hover:bg-neutral-800/60 border-neutral-200 dark:border-neutral-500"
          : "p-2 flex border-transparent",
        bookCardVariants[variant],
        className
      )}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-lg border bg-gray-100 dark:border-neutral-800 dark:bg-neutral-900 ",
          coverSizes[coverSize],
          "aspect-[2/3]",
          !isRow && "self-center"
        )}
      >
        {coverUrl && !!book ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-gray-500 dark:text-gray-400">
            No cover
          </div>
        )}

        {!isRow && !!book ? (
          <div
            className="absolute bottom-0 w-full
          flex justify-center items-center"
          >
            <span
              className="
              rounded-t-md border bg-white px-2 py-0.5 text-xs
              text-gray-900 shadow-sm
              dark:border-neutral-800 dark:bg-neutral-900 dark:text-gray-100
            "
            >
              {!badge ? shortenString(subjectDisplay, 9) : badge}
            </span>
          </div>
        ) : null}
      </div>

      <div className={cn(isRow ? "min-w-0" : "pt-1")}>
        {title && (
          <div className="min-w-0 text-sm font-semibold text-gray-900 dark:text-gray-100">
            <span
              className={cn(isRow ? "block truncate" : "block line-clamp-2")}
            >
              {shortenString(book?.title, 12)}
            </span>
          </div>
        )}

        {(author || subject) && !!book && (
          <div className="mt-0.5 text-xs text-gray-600 dark:text-gray-400">
            {author ? (
              <span className="truncate">{shortenString(book.author, 12)}</span>
            ) : null}
            {author && subject ? <span className="mx-1">•</span> : null}
            {subject ? (
              <span className="truncate">{subjectDisplay}</span>
            ) : null}
          </div>
        )}
      </div>
    </Link>
  );
}
