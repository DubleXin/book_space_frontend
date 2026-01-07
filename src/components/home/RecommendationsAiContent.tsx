import { BookCard } from "../../components/ui/BookCard";
import { type EnhancedRecommendationData } from "../../types/recommendation";

type Props = {
  recommendations: EnhancedRecommendationData;
};

const RecommendationsAiContent = ({ recommendations }: Props) => {
  return (
    <div className="rounded-xl border dark:border-neutral-800 p-4">
      <h2 className="text-lg font-semibold">Selected works</h2>
      <ul className="mt-3 flex flex-wrap gap-3 items-center sm:items-start justify-center sm:justify-start">
        {recommendations.aiHighlights.map((s) => (
          <li key={`book-ai-${s.bookId}`} className="">
            <BookCard
              bookId={s.bookId}
              variant="row"
              coverSize="lg"
              title={true}
              subject={true}
              cover={true}
              to={`/book/${s.bookId}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationsAiContent;
