import { BookCard } from "../../components/ui/BookCard";
import { type EnhancedRecommendationData } from "../../types/recommendation";

type Props = {
  recommendations: EnhancedRecommendationData;
};

const RecommendationsAiContent = ({ recommendations }: Props) => {
  return (
    <div className="rounded-xl border p-4">
      <h2 className="text-lg font-semibold">Selected works</h2>
      <ul className="mt-3 flex gap-3">
        {recommendations.aiHighlights.map((s) => (
          <li key={`book-ai-${s.bookId}`}>
            <BookCard
              bookId={s.bookId}
              variant="row"
              coverSize="lg"
              title={true}
              subject={true}
              coverUrl={true}
              to={`/book/${s.bookId}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationsAiContent;
