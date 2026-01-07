import { SlidersHorizontal } from "lucide-react";

import type { Filters } from "../explore.types";
import Author from "./Author";
import Tags from "./Tags";

type Props = {
  filters: Filters;
  setFilters: (
    patch: Partial<Filters>,
    opts?: {
      replace?: boolean;
    }
  ) => void;
  toggleTag: (tagLike: string) => void;
};

const DeepSearch = ({ filters, setFilters, toggleTag }: Props) => {
  return (
    <div className="md:sticky top-4 rounded-2xl border  border-neutral-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-neutral-950">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 opacity-70 dark:stroke-white" />
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Deep search
        </h2>
      </div>

      <Author filters={filters} setFilters={setFilters} />

      <Tags filters={filters} setFilters={setFilters} toggleTag={toggleTag} />

      <div className="mt-5 rounded-xl border border-neutral-200 bg-gray-50 p-3 text-xs text-gray-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-gray-300">
        Filters are stored in the URL so search is shareable + refresh-safe.
      </div>
    </div>
  );
};

export default DeepSearch;
