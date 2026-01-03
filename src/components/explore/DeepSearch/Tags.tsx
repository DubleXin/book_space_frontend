import { useMemo, useState } from "react";
import { useSubjects } from "../../../hooks/useSubjects";
import { Input } from "../../ui/Input";
import { Tag } from "../../ui/Tag";
import { normalizeSubjectName } from "../explore.utils";
import { Button } from "../../ui/Button";
import type { Filters } from "../explore.types";

const Tags = ({
  filters,
  setFilters,
  toggleTag,
}: {
  filters: Filters;
  setFilters: (
    patch: Partial<Filters>,
    opts?: {
      replace?: boolean;
    }
  ) => void;
  toggleTag: (tagLike: string) => void;
}) => {
  const [subjectFilter, setSubjectFilter] = useState("");

  const subjectQuery = useSubjects();
  const subjects = useMemo(() => subjectQuery.data?.data ?? [], [subjectQuery]);

  const visibleSubjects = useMemo(() => {
    const q = subjectFilter.trim().toLowerCase();
    if (!q) return subjects;
    return subjects.filter((s) => s.name.toLowerCase().includes(q));
  }, [subjectFilter, subjects]);

  return (
    <div className="mt-5">
      <div className="mb-2 flex items-center justify-between">
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
          Subjects
        </label>
        <button
          type="button"
          className="text-[11px] text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          onClick={() => setSubjectFilter("")}
        >
          reset
        </button>
      </div>

      <Input
        inputSize="sm"
        variant="filled"
        placeholder="Filter subjects…"
        value={subjectFilter}
        onChange={(e) => setSubjectFilter(e.target.value)}
      />

      <div className="mt-3 flex flex-wrap gap-2">
        {visibleSubjects.map((s) => {
          const tag = normalizeSubjectName(s.name);
          const selected = filters.subject.includes(tag);
          return (
            <Tag
              key={s.id}
              size="sm"
              variant={selected ? "primary" : "secondary"}
              selected={selected}
              onClick={() => toggleTag(s.name)}
            >
              {s.name.replaceAll("_", " ")}
            </Tag>
          );
        })}
      </div>

      {filters.subject.length ? (
        <div className="mt-3">
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={() =>
              setFilters({ subject: [], offset: 0 }, { replace: true })
            }
          >
            Clear subjects
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Tags;
