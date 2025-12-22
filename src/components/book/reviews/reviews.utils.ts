const RATING_STYLES: Record<number, string> = {
  1: "bg-red-100 text-red-800 border-red-200 dark:bg-red-950/40 dark:text-red-200 dark:border-red-900",
  2: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950/40 dark:text-orange-200 dark:border-orange-900",
  3: "bg-yellow-100 text-yellow-900 border-yellow-200 dark:bg-yellow-950/40 dark:text-yellow-200 dark:border-yellow-900",
  4: "bg-lime-100 text-lime-800 border-lime-200 dark:bg-lime-950/40 dark:text-lime-200 dark:border-lime-900",
  5: "bg-green-100 text-green-800 border-green-200 dark:bg-green-950/40 dark:text-green-200 dark:border-green-900",
};

const DEFAULT_STYLE =
  "bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-900/40 dark:text-neutral-200 dark:border-neutral-800";

export function ratingStyles(rating?: number | null) {
  return (rating && RATING_STYLES[rating]) || DEFAULT_STYLE;
}

export function ratingLabel(rating?: number | null) {
  if (!rating) return "No rating";
  return `${rating}/5`;
}
