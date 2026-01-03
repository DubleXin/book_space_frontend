import { Search, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import type { Filters } from "./explore.types";

type Props = {
  filters: Filters;
  setFilters: (
    patch: Partial<Filters>,
    opts?: {
      replace?: boolean;
    }
  ) => void;
  hasAnyFilter: boolean;
  toggleTag: (tagLike: string) => void;
  clearAll: () => void;
};

const SearchBar = ({
  filters,
  setFilters,
  hasAnyFilter,
  toggleTag,
  clearAll,
}: Props) => {
  const [searchDraft, setSearchDraft] = useState(filters.search);

  useEffect(() => setSearchDraft(filters.search), [filters.search]);

  const applySearch = useCallback(() => {
    setFilters({ search: searchDraft, offset: 0 }, { replace: false });
  }, [searchDraft, setFilters]);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-neutral-950">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60 dark:stroke-white" />
          <Input
            className="pl-9"
            placeholder='Search by title… (e.g. "Dune")'
            value={searchDraft}
            onChange={(e) => setSearchDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") applySearch();
            }}
          />
        </div>

        <Button className="w-auto" variant="primary" onClick={applySearch}>
          Search
        </Button>

        <Button
          className="w-auto"
          variant="outline"
          onClick={() => {
            setSearchDraft("");
            setFilters({ search: "", offset: 0 }, { replace: false });
          }}
          disabled={!filters.search}
        >
          Clear
        </Button>
      </div>

      {hasAnyFilter ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {filters.search ? (
            <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs dark:border-neutral-800 dark:text-white">
              <span className="opacity-70">search:</span>
              <span className="font-medium">{filters.search}</span>
              <button
                className="ml-1 inline-flex opacity-70 hover:opacity-100"
                onClick={() =>
                  setFilters({ search: "", offset: 0 }, { replace: false })
                }
                aria-label="Remove search filter"
                title="Remove search"
                type="button"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ) : null}

          {filters.author ? (
            <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs dark:border-neutral-800 dark:text-white">
              <span className="opacity-70">author:</span>
              <span className="font-medium">{filters.author}</span>
              <button
                className="ml-1 inline-flex opacity-70 hover:opacity-100"
                onClick={() =>
                  setFilters({ author: "", offset: 0 }, { replace: false })
                }
                aria-label="Remove author filter"
                title="Remove author"
                type="button"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ) : null}

          {filters.subject.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs capitalize 
              dark:border-neutral-800 dark:text-white"
            >
              <span className="opacity-70">tag:</span>
              <span className="font-medium">{t.replaceAll("_", " ")}</span>
              <button
                className="ml-1 inline-flex opacity-70 hover:opacity-100"
                onClick={() => toggleTag(t)}
                aria-label={`Remove tag ${t}`}
                title="Remove tag"
                type="button"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}

          <button
            type="button"
            onClick={clearAll}
            className="ml-auto inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 
            dark:text-gray-300 dark:hover:bg-neutral-800"
            title="Clear all filters"
          >
            <X className="h-4 w-4" />
            Clear all
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
