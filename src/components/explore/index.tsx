import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import {
  filtersToApiParams,
  normalizeSubjectName,
  readFilters,
  writeFilters,
} from "./explore.utils";
import BookRecord from "./BookRecord";

import { useBooks } from "../../hooks/useBooks";
import SearchBar from "./SearchBar";
import SearchBarControls from "./SearchBarControls";
import { DeepSearch } from "./DeepSearch";

export default function ExplorePage() {
  const [sp, setSp] = useSearchParams();
  const filters = useMemo(() => readFilters(sp), [sp]);

  const setFilters = useCallback(
    (patch: Partial<typeof filters>, opts?: { replace?: boolean }) => {
      setSp((prev) => writeFilters(prev, patch), {
        replace: opts?.replace ?? true,
      });
    },
    [setSp]
  );

  const toggleTag = useCallback(
    (tagLike: string) => {
      const tag = normalizeSubjectName(tagLike);
      const nextTags = filters.subject.includes(tag)
        ? filters.subject.filter((t) => t !== tag)
        : [...filters.subject, tag];

      setFilters({ subject: nextTags, offset: 0 }, { replace: true });
    },
    [filters.subject, setFilters]
  );

  const clearAll = useCallback(() => {
    setSp(new URLSearchParams(), { replace: true });
  }, [setSp]);

  const subjectsKey = useMemo(
    () => [...filters.subject].map(normalizeSubjectName).sort(),
    [filters.subject]
  );
  const bookKey = useMemo(() => {
    return [
      filters.search,
      filters.author,
      String(filters.offset),
      String(filters.limit),
      ...subjectsKey,
    ];
  }, [
    filters.author,
    filters.limit,
    filters.offset,
    filters.search,
    subjectsKey,
  ]);

  const apiParams = useMemo(() => filtersToApiParams(filters), [filters]);
  const bookQuery = useBooks(apiParams, bookKey);

  const count = bookQuery.data?.count ?? 0;
  const filteredBooks = useMemo(
    () => bookQuery.data?.data ?? [],
    [bookQuery.data]
  );

  const hasAnyFilter =
    !!filters.search || !!filters.author || filters.subject.length > 0;

  const rangeLabel = useMemo(() => {
    if (!count) return "0-0";
    const from = Math.min(filters.offset + 1, count);
    const to = Math.min(filters.offset + filteredBooks.length, count);
    return `${from}-${to}`;
  }, [count, filters.offset, filteredBooks.length]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <div className="mb-5">
        <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          Explore books
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Search by title, filter by author, and refine with subjects.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-12 min-w-0">
        <main className="md:col-span-8 lg:col-span-9 min-w-0 order-2 md:order-1">
          <SearchBar
            filters={filters}
            setFilters={setFilters}
            hasAnyFilter={hasAnyFilter}
            toggleTag={toggleTag}
            clearAll={clearAll}
          />

          <SearchBarControls
            filters={filters}
            setFilters={setFilters}
            rangeLabel={rangeLabel}
            count={count}
          />

          <div className="mt-3 min-w-0">
            {filteredBooks.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-6 text-sm text-gray-700 dark:border-neutral-700 dark:bg-neutral-950 dark:text-gray-300">
                No books matched your filters. Try clearing subjects or using a
                shorter query.
              </div>
            ) : (
              <div className="flex flex-col gap-2 min-w-0">
                {filteredBooks.map((b) => (
                  <BookRecord
                    key={b.id}
                    book={b}
                    filters={filters}
                    toggleTag={toggleTag}
                  />
                ))}
              </div>
            )}
          </div>
        </main>

        <aside className="md:col-span-4 lg:col-span-3 min-w-0 order-1 md:order-2">
          <DeepSearch
            filters={filters}
            setFilters={setFilters}
            toggleTag={toggleTag}
          />
        </aside>
      </div>
    </div>
  );
}
