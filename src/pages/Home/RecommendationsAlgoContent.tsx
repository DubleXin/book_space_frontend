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
        <ul className="space-y-3 flex gap-3 flex-wrap">
          {recommendations.recommendedBooks
            .filter(
              (value, i, array) =>
                array.findIndex((s) => s.bookId === value.bookId) === i
            )
            .map((s) => (
              <BookCard
                bookId={s.bookId}
                key={`book-${s.bookId}`}
                variant="tile"
                coverSize="lg"
                title={true}
                to="/"
                author={true}
                coverUrl={true}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default RecommendationsAlgoContent;
