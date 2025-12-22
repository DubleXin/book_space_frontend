import { Star } from "lucide-react";

const StarRow = ({ rating }: { rating?: number | null }) => {
  const defined = Math.max(0, Math.min(5, rating ?? 0));
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Rating ${defined} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < defined;
        return (
          <Star
            key={i}
            className={`h-4 w-4 ${
              filled ? "fill-current" : "fill-transparent"
            } stroke-current aria-hidden="true`}
          />
        );
      })}
    </div>
  );
};

export default StarRow;
