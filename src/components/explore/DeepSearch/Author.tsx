import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import type { Filters } from "../explore.types";
import { useCallback, useEffect, useState } from "react";

const Author = ({
  filters,
  setFilters,
}: {
  filters: Filters;
  setFilters: (
    patch: Partial<Filters>,
    opts?: {
      replace?: boolean;
    }
  ) => void;
}) => {
  const [authorDraft, setAuthorDraft] = useState(filters.author);

  useEffect(() => setAuthorDraft(filters.author), [filters.author]);

  const applyAuthor = useCallback(() => {
    setFilters({ author: authorDraft, offset: 0 }, { replace: false });
  }, [authorDraft, setFilters]);

  return (
    <div className="mt-4">
      <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
        Author
      </label>
      <Input
        placeholder='e.g. "Asimov"'
        value={authorDraft}
        onChange={(e) => setAuthorDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") applyAuthor();
        }}
      />
      <div className="mt-2 flex gap-2">
        <Button
          className="w-auto"
          size="sm"
          variant="secondary"
          onClick={applyAuthor}
        >
          Apply
        </Button>
        <Button
          className="w-auto"
          size="sm"
          variant="outline"
          onClick={() => {
            setAuthorDraft("");
            setFilters({ author: "", offset: 0 }, { replace: false });
          }}
          disabled={!filters.author}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default Author;
