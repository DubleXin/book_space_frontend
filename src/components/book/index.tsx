import { useLocation, useParams } from "react-router-dom";
import { useBook } from "./book.hooks";
import { useEffect } from "react";
import { ReviewsSection } from "./reviews/ReviewsSection";
import CoverContent from "./CoverContent";
import { useNavigate } from "react-router-dom";
import BookContent from "./BookContent";
import UnknownBook from "./UnknownBook";
import { BookPageSkeleton } from "./book.skeletons";

const Book = () => {
  const { id } = useParams();

  const bookId = id ? Number(id) : null;

  const navigate = useNavigate();
  const bookQuery = useBook(bookId);

  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  useEffect(() => {
    if (hash !== "#reviews") return;

    const t = window.setTimeout(() => {
      navigate(".", { replace: true });
    }, 1500);

    return () => window.clearTimeout(t);
  }, [hash, navigate]);
  const onGotoReviewButtonCLick = () => navigate("#reviews");

  const book = bookQuery.data?.data;
  const reviewsHighlighted = hash === "#reviews";

  if (!bookId) return <UnknownBook />;
  if (bookQuery.isPending) return <BookPageSkeleton />;
  if (!book) return <UnknownBook />;

  return (
    <div className="max-w-screen text-slate-950 dark:text-white md:p-8 min-w-0">
      <main className="mx-auto flex max-w-6xl gap-6">
        <div className="flex-1 space-y-6">
          <section className="md:rounded-2xl border dark:border-neutral-800 bg-white/50 sm:p-6 md:shadow-sm dark:bg-neutral-950/30">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr] md:items-start">
              <CoverContent
                book={book}
                onReviewButtonCLick={onGotoReviewButtonCLick}
              />

              <BookContent book={book} />
            </div>
          </section>

          <ReviewsSection bookId={book.id} highlighted={reviewsHighlighted} />
        </div>
      </main>
    </div>
  );
};

export default Book;
