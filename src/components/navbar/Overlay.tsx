import { ArrowRight, Clock, Hash, PenLine, Signature } from "lucide-react";
import type { Hint, HintKind } from "./navbar.types";

import { cn } from "../../utils/cn";
import { useEffect, useState, type RefObject } from "react";
import { useSearchHistory } from "../../hooks/useSearchHistory";

function kindIcon(kind: HintKind) {
  if (kind === "recent") return <Clock className="h-4 w-4 opacity-70" />;
  if (kind === "subject") return <Hash className="h-4 w-4 opacity-70" />;
  if (kind === "author") return <Signature className="h-4 w-4 opacity-70" />;
  if (kind === "plain") return <PenLine className="h-4 w-4 opacity-70" />;
  return <ArrowRight className="h-4 w-4 opacity-70" />;
}

const Overlay = ({
  historyVersion,
  panelRef,
  hints,
  onHistoryUpdate,
  submit,
  open,
  query,
  onClose,
}: {
  historyVersion: number;
  panelRef: RefObject<HTMLDivElement | null>;
  hints: Hint[];
  onHistoryUpdate: () => void;
  submit: (value?: string | undefined) => void;
  open: boolean;
  query: string;
  onClose: () => void;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { clear } = useSearchHistory(historyVersion);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, Math.max(hints.length - 1, 0)));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const item = hints[activeIndex];
        if (!item) return submit();
        return submit(item.value ?? item.label);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, hints, activeIndex, onClose, submit]);

  useEffect(() => {
    if (open) setActiveIndex(0);
  }, [open, query]);

  if (!open) return <></>;

  return (
    <div className="z-50 ">
      <div className="absolute left-0 top-10 w-full max-w-xl">
        <div
          ref={panelRef}
          className="
                  overflow-hidden rounded-2xl
                  border border-black/10 bg-white shadow-xl
                  dark:border-white/10 dark:bg-slate-900
                "
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between gap-3 border-b border-black/5 px-4 py-3 dark:border-white/10">
            <div className="text-xs text-neutral-500 dark:text-white/60">
              Esc to close • ↑ ↓ to navigate • Enter to search
            </div>

            {history.length > 0 && (
              <button
                type="button"
                className="text-xs text-neutral-500 hover:text-neutral-800 dark:text-white/50 dark:hover:text-white"
                onClick={() => {
                  clear();
                  onHistoryUpdate();
                }}
              >
                Clear recent
              </button>
            )}
          </div>

          <ul className="max-h-[60vh] overflow-auto p-2">
            {hints.length === 0 ? (
              <li className="px-3 py-3 text-sm text-neutral-500 dark:text-white/60">
                No hints. Press Enter to search “{query.trim()}”.
              </li>
            ) : (
              hints.map((h, idx) => (
                <li key={h.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => submit(h.value ?? h.label)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm",
                      "hover:bg-black/5 dark:hover:bg-white/10",
                      idx === activeIndex && "bg-black/5 dark:bg-white/10"
                    )}
                  >
                    <span className="text-neutral-700 dark:text-white/70">
                      {kindIcon(h.kind)}
                    </span>

                    <span className="flex-1 text-neutral-900 dark:text-white">
                      {h.kind === "subject"
                        ? `#${h.label}`
                        : h.kind === "author"
                        ? `a:${h.label}`
                        : h.label}
                    </span>

                    <span className="text-xs text-neutral-500 dark:text-white/50">
                      {h.kind}
                    </span>
                  </button>
                </li>
              ))
            )}
          </ul>

          <div className="border-t border-black/5 px-4 py-3 text-xs text-neutral-500 dark:border-white/10 dark:text-white/60">
            Tip: start typing to filter hints.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
