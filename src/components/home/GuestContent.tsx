import { type Book } from "../../types/book";
import { BookCard } from "../../components/ui/BookCard";
import { cn } from "../../utils/cn";

type Props = React.ButtonHTMLAttributes<HTMLElement> & {
  books?: Book[];
  variant?: "highlight" | "default";
};

const GuestContent = ({
  books,
  variant = "default",
  className,
  ...props
}: Props) => {
  const isHighlighted = variant === "highlight";

  return (
    <div
      className={cn(
        "min-h-0  p-4 pb-12 border dark:border-neutral-800 rounded-xl",
        isHighlighted ? " border-sky-500 dark:border-sky-600" : null,
        "transition",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Featured Woks</h2>
      </div>

      <div className="mt-3 min-h-0 overflow-auto">
        <ul className="space-y-3 flex gap-3 flex-wrap">
          {books &&
            books.map((s) => (
              <BookCard
                bookId={s.id}
                key={`book-${s.id}`}
                variant="tile"
                coverSize="lg"
                title={true}
                to={`/book/${s.id}`}
                author={true}
                cover={true}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default GuestContent;
