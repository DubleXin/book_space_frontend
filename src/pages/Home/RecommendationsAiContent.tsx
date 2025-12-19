import { BookCard } from "../../components/ui/BookCard";
import { type EnhancedRecommendationData } from "../../types/recommendation";

type Props = {
  recommendations: EnhancedRecommendationData;
};

const RecommendationsAiContent = ({ recommendations }: Props) => {
  return (
    <div className="rounded-xl border p-4">
      <h2 className="text-lg font-semibold">Selected works</h2>
      <ul className="mt-3 space-y-2 flex gap-3">
        {recommendations.aiHighlights.map((s) => (
          <BookCard
            bookId={s.bookId}
            key={`book-ai-${s.bookId}`}
            variant="row"
            coverSize="lg"
            title={true}
            subject={true}
            coverUrl={true}
            to="/"
          />
        ))}
      </ul>
    </div>
  );
};

export default RecommendationsAiContent;
