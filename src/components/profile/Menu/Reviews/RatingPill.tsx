import { Star } from "lucide-react";

const RatingPill = ({ rating }: { rating?: number | null }) => {
  if (rating == null) {
    return (
      <span
        className="inline-flex items-center rounded-full bg-slate-900/5 px-2 py-1 
      text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200 dark:bg-white/5 dark:text-white/70 dark:ring-white/10"
      >
        No rating
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full bg-sky-600/10 px-2 py-1 text-xs 
    font-semibold text-sky-700 ring-1 ring-inset ring-sky-600/20 dark:bg-sky-400/10 dark:text-sky-200 dark:ring-sky-300/20"
    >
      <Star className="h-3.5 w-3.5" />
      {rating}/5
    </span>
  );
};

export default RatingPill;
