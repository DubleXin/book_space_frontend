import { useCallback, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";
import type { Hint } from "./navbar.types";
import Overlay from "./Overlay";
import { useRegisterMouseEvents } from "./navbar.hooks";
import { useSearchHistory } from "../../hooks/useSearchHistory";

const SearchBar = () => {
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [historyVersion, setHistoryVersion] = useState(0);

  const onHistoryUpdate = () => setHistoryVersion((v) => v + 1);

  const { items: historyRecords, add: addHistoryRecord } =
    useSearchHistory(historyVersion);

  const history = useMemo(
    () => historyRecords,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open, historyVersion, historyRecords]
  );

  const baseHints: Hint[] = useMemo(() => {
    return [
      { id: "all:all", label: "Explore all books", kind: "action", value: "" },
      { id: "t:fantasy", label: "fantasy", kind: "subject", value: "#fantasy" },
      {
        id: "a:Jose-Rizal",
        label: "José Rizal",
        kind: "author",
        value: "a:José Rizal",
      },
      {
        id: "p:the-two-towers",
        label: "The Two Towers",
        kind: "plain",
        value: "The Two Towers",
      },
    ];
  }, []);

  const hints: Hint[] = useMemo(() => {
    const recentHints: Hint[] = history.map((record) => {
      return {
        id: `r:${record}`,
        label: record,
        kind: "recent",
        value: record,
      };
    });

    const all = [
      ...baseHints.slice(0, 1),
      ...recentHints,
      ...baseHints.slice(1),
    ];

    const search = searchQuery.trim().toLowerCase();
    if (!search) return all;

    return all.filter((record) => record.label.toLowerCase().includes(search));
  }, [searchQuery, history, baseHints]);

  const closeOverlay = () => setOpen(false);

  const submit = useCallback(
    (value?: string) => {
      const query = (value ?? searchQuery).trim();

      if (query) addHistoryRecord(query);
      setSearchQuery(query);

      const [, author, subject, search] =
        query.match(/^(?:a:\s*(.+)|#\s*(.+)|(.+))$/i) ?? [];

      const params = new URLSearchParams(
        author
          ? { author: author.trim() }
          : subject
          ? { subject: subject.trim() }
          : search
          ? { search: search.trim() }
          : {}
      );

      navigate({
        pathname: "/explore",
        search: params.toString() ? `?${params}` : "",
      });
      closeOverlay();
    },
    [addHistoryRecord, navigate, searchQuery]
  );

  useRegisterMouseEvents(open, panelRef, inputRef, closeOverlay);

  return (
    <div className="relative w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className={cn(
          `
          min-h-8 w-full rounded-full
          flex items-center gap-2 px-3
          overflow-hidden
        `,

          "bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 hover:border-neutral-300",
          "focus-within:bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30",

          "dark:bg-slate-700/70 dark:border-white/10 dark:hover:bg-slate-700",
          "dark:focus-within:bg-slate-800 dark:focus-within:border-blue-400/50 dark:focus-within:ring-blue-400/20"
        )}
      >
        <Search className="h-4 w-4 text-neutral-600 dark:text-white/70" />

        <input
          ref={inputRef}
          id="top-searchbar"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="
            w-full bg-transparent outline-none
            text-sm text-stone-950
            placeholder:text-neutral-500
            dark:text-white dark:placeholder:text-white/50
          "
          placeholder="Search"
          autoComplete="off"
        />
      </form>

      <Overlay
        open={open}
        panelRef={panelRef}
        hints={hints}
        onHistoryUpdate={onHistoryUpdate}
        submit={submit}
        query={searchQuery}
        onClose={closeOverlay}
        historyVersion={historyVersion}
      />
    </div>
  );
};

export default SearchBar;
