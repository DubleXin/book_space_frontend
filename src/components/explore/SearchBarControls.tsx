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
  rangeLabel: string;
  count: number;
};

const SearchBarControls = ({
  rangeLabel,
  count,
  filters,
  setFilters,
}: Props) => {
  const canPrev = filters.offset > 0;
  const canNext = filters.offset + filters.limit < count;
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing <span className="font-medium">{rangeLabel}</span> of{" "}
        <span className="font-medium">{count}</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-2 py-1.5 text-sm dark:border-white/10 dark:bg-neutral-950">
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Limit
          </span>
          <select
            className="bg-transparent text-sm outline-none dark:text-white dark:bg-black"
            value={filters.limit}
            onChange={(e) => {
              const limit = Number(e.target.value);
              setFilters({ limit, offset: 0 }, { replace: false });
            }}
          >
            {[6, 12, 18, 24].map((n) => (
              <option className="dark:bg-black-700" key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <Button
          className="w-auto"
          size="sm"
          variant="outline"
          onClick={() =>
            setFilters(
              {
                offset: Math.max(filters.offset - filters.limit, 0),
              },
              { replace: false }
            )
          }
          disabled={!canPrev}
        >
          Prev
        </Button>
        <Button
          className="w-auto"
          size="sm"
          variant="outline"
          onClick={() =>
            setFilters(
              { offset: filters.offset + filters.limit },
              { replace: false }
            )
          }
          disabled={!canNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default SearchBarControls;
