import type { Book } from "../../types/book";
import { IconButton } from "../ui/IconButton";
import { useMyStars, useToggleStar } from "./book.hooks";
import { useAuth } from "../../store";
import { Star, PenLine } from "lucide-react";

const CoverContent = ({
  book,
  onReviewButtonCLick,
}: {
  book: Book;
  onReviewButtonCLick: () => void;
}) => {
  const mutateStar = useToggleStar();
  const user = useAuth((s) => s.user);

  const starQuery = useMyStars();

  function OnStarButtonCLick(): void {
    if (!user || !book) return;
    mutateStar.mutate(book.id);
  }

  const stars = starQuery.data ?? [];

  const isBookStarred = !!stars.find((value) => value.bookId === book.id);

  return (
    <div className="self-start">
      <div className="overflow-hidden rounded-2xl border bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="aspect-[2/3] w-full">
          {book?.coverUrl ? (
            <img
              src={book.coverUrl}
              alt={book.title ?? "Book cover"}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-neutral-500 dark:text-neutral-400">
              No cover
            </div>
          )}
        </div>
        <div className="w-full flex justify-between px-10">
          <IconButton
            disabled={!user}
            iconClassName={`${
              isBookStarred ? "fill-yellow-500" : ""
            } stroke-amber-500 stroke-2`}
            Icon={Star}
            label={"Star Book"}
            onClick={OnStarButtonCLick}
          />
          <IconButton
            onClick={onReviewButtonCLick}
            disabled={!user}
            Icon={PenLine}
            label={"Write a review"}
          />
        </div>
      </div>
    </div>
  );
};

export default CoverContent;
