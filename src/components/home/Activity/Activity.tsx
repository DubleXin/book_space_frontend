import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ActivityPanelVariant } from "../home.types";
import type { activityBadgeData } from "./activity.types";
import { IconButton } from "../../ui/IconButton";
import { cn } from "../../../utils/cn";

const limits: Record<ActivityPanelVariant, number> = {
  compact: 12,
  expanded: 40,
};

const Activity = ({
  username,
  items,
  isPending,
  variant,
  onExpand,
  onCollapse,
}: {
  username?: string;
  items: activityBadgeData[];
  isPending?: boolean;
  variant: ActivityPanelVariant;
  onExpand: () => void;
  onCollapse: () => void;
}) => {
  const isExpanded = variant === "expanded";

  return (
    <section
      className={cn(
        "rounded-xl border dark:border-neutral-700",
        "bg-white shadow-sm dark:bg-neutral-950",
        "h-[70vh] min-h-[520px] p-2 md:p-10"
      )}
    >
      <header className="flex items-start justify-between gap-3 p-4 border-b border-slate-200/70 dark:border-white/10">
        <div className="min-w-0">
          <h3 className="text-base font-semibold tracking-tight">
            Recent Actions
            {username ? (
              <span className="ml-2 text-sky-500">{`[${username}]`}</span>
            ) : null}
          </h3>
          <p className="mt-1 text-xs text-slate-600 dark:text-white/60">
            Full activity timeline
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isExpanded ? (
            <IconButton
              label="collapse"
              Icon={ArrowLeft}
              onClick={onCollapse}
            />
          ) : (
            <IconButton label="expand" Icon={ArrowRight} onClick={onExpand} />
          )}
        </div>
      </header>

      <div
        className={cn(
          "p-4",
          isExpanded
            ? "h-[calc(70vh-64px)] md:h-[calc(60vh-64px)] overflow-y-auto scrollbar-thin"
            : ""
        )}
      >
        {isPending ? (
          <div className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-600 dark:border-white/10 dark:text-white/60">
            Loading activity…
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-600 dark:border-white/10 dark:text-white/60">
            No recent actions yet.
          </div>
        ) : (
          <ul className="space-y-2">
            {items.slice(0, limits[variant]).map((a, i) => (
              <li
                key={`activity-item-${i}`}
                className="rounded-lg border border-slate-200/70 bg-white/60 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-sky-500">{`>`}</span>

                  <span className="font-medium">
                    {a.source.to ? (
                      <Link
                        className="underline hover:decoration-sky-500 transition"
                        to={a.source.to}
                      >
                        {a.source.name}
                      </Link>
                    ) : (
                      a.source.name
                    )}
                  </span>

                  <span className="text-slate-500 dark:text-white/40">—</span>
                  <span className="text-slate-600 dark:text-white/60">
                    {a.timestamp.formatted}
                  </span>
                  <span className="text-slate-500 dark:text-white/40">—</span>

                  <span className="text-slate-800 dark:text-white/80">
                    {a.action}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}

        {!isExpanded && items.length > limits.compact ? (
          <button
            type="button"
            onClick={onExpand}
            className="mt-3 text-xs font-semibold text-sky-700 hover:text-sky-800 dark:text-sky-300 dark:hover:text-sky-200"
          >
            Show more
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default Activity;
