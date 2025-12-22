import { BookCard } from "../../components/ui/BookCard";
import { type EnhancedRecommendationData } from "../../types/recommendation";

type Props = {
  recommendations: EnhancedRecommendationData;
};

const RecommendationsAlgoContent = ({ recommendations }: Props) => {
  return (
    <div className="min-h-0 rounded-xl border p-4 pb-12">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Explore more</h2>
      </div>

      {/* key: min-h-0 + overflow */}
      <div className="mt-3 min-h-0 overflow-auto">
        <ul className="flex gap-3 flex-wrap">
          {recommendations.recommendedBooks
            .filter(
              (value, i, array) =>
                array.findIndex((s) => s.bookId === value.bookId) === i
            )
            .map((s) => (
              <li key={`book-${s.bookId}`}>
                <BookCard
                  bookId={s.bookId}
                  variant="tile"
                  coverSize="lg"
                  title={true}
                  to={`/book/${s.bookId}`}
                  author={true}
                  coverUrl={true}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default RecommendationsAlgoContent;
