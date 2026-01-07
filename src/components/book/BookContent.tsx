import ReactMarkdown from "react-markdown";
import type { Book } from "../../types/book";
import { Tag } from "../ui/Tag";
import { Link } from "react-router-dom";

const BookContent = ({ book }: { book: Book }) => {
  return (
    <div className="min-w-0 p-2 md:p-0">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold leading-tight md:text-3xl">
          {book?.title ?? "—"}
        </h1>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-600 dark:text-neutral-300">
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            {book?.author ?? "Unknown author"}
          </span>
          {book?.publishedYear ? (
            <>
              <span className="opacity-50">•</span>
              <span>{book.publishedYear}</span>
            </>
          ) : null}
          {book?.externalSource ? (
            <>
              <span className="opacity-50">•</span>
              <span className="capitalize">{book.externalSource}</span>
            </>
          ) : null}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {book?.subjects?.length ? (
            book.subjects.map((s) => (
              <Link key={`tag-${s.name}`} to={`/explore?subject=${s.name}`}>
                <Tag key={s.name} variant="primary">
                  {s.name.replace("_", " ")}
                </Tag>
              </Link>
            ))
          ) : (
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              No subjects
            </span>
          )}
        </div>
      </div>

      <div className="mt-6 md:rounded-2xl md:border bg-white p-5 dark:bg-neutral-950/40">
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-neutral-700 dark:text-neutral-300">
          About this book
        </h2>

        <div className="prose prose-sm max-w-none text-neutral-800 dark:prose-invert dark:text-neutral-200">
          <ReactMarkdown>{book?.description ?? ""}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default BookContent;
