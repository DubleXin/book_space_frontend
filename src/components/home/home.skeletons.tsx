import { Skeleton } from "../../components/ui/Skeleton";
import { cn } from "../../utils/cn";

export function TagsSkeleton({
  initialCount = 12,
  showActions = true,
}: {
  initialCount?: number;
  showActions?: boolean;
}) {
  const widths = ["w-14", "w-16", "w-20", "w-24", "w-28"];
  const chipH = "h-8 sm:h-9";

  return (
    <div className="rounded-xl border dark:border-neutral-800 p-3 sm:p-4">
      <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-3">
        {Array.from({ length: initialCount }).map((_, i) => (
          <Skeleton
            key={i}
            rounded="full"
            className={cn(chipH, widths[i % widths.length])}
          />
        ))}

        {showActions && (
          <>
            <Skeleton rounded="full" className={cn(chipH, "w-20 sm:w-24")} />
            <Skeleton rounded="full" className={cn(chipH, "w-16 sm:w-20")} />
          </>
        )}
      </div>
    </div>
  );
}

function BookTileSkeleton() {
  return (
    <div className="w-[120px] sm:w-[150px] md:w-[170px]">
      <Skeleton className="aspect-[2/3] w-full" rounded="2xl" />
      <div className="mt-2 sm:mt-3 space-y-2">
        <Skeleton className="h-3.5 sm:h-4 w-5/6" rounded="md" />
        <Skeleton className="h-3.5 sm:h-4 w-2/3" rounded="md" />
      </div>
    </div>
  );
}

function BookRowSkeleton() {
  return (
    <div className="flex w-[260px] sm:w-[320px] max-w-full gap-2 sm:gap-3">
      <Skeleton
        className="h-[80px] w-[54px] sm:h-[96px] sm:w-[64px] shrink-0"
        rounded="xl"
      />
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-3.5 sm:h-4 w-5/6" rounded="md" />
        <Skeleton className="h-3.5 sm:h-4 w-3/5" rounded="md" />
        <Skeleton className="h-3.5 sm:h-4 w-2/5" rounded="md" />
      </div>
    </div>
  );
}

export function RecommendationsAiSkeleton() {
  return (
    <div className="rounded-xl border dark:border-neutral-800 p-2 sm:p-4">
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-4 sm:h-5 w-40 sm:w-44" rounded="md" />
      </div>

      <ul className="mt-3 flex flex-wrap gap-2 sm:gap-3 items-center sm:items-start justify-center sm:justify-start">
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i}>
            <BookRowSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RecommendationsAlgoSkeleton({
  items = 12,
}: {
  items?: number;
}) {
  return (
    <div className="min-h-0 rounded-xl border dark:border-neutral-800 p-3 sm:p-4 pb-10 sm:pb-12">
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-4 sm:h-5 w-32 sm:w-36" rounded="md" />
        <Skeleton className="h-8 sm:h-9 w-20 sm:w-24" rounded="full" />
      </div>

      <div className="mt-3 min-h-0 overflow-auto">
        <ul className="flex gap-2 sm:gap-3 flex-wrap items-center justify-center md:items-start md:justify-start">
          {Array.from({ length: items }).map((_, i) => (
            <li key={i}>
              <BookTileSkeleton />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function GuestContentSkeleton({ items = 12 }: { items?: number }) {
  return (
    <div className="min-h-0 p-3 sm:p-4 pb-10 sm:pb-12 border dark:border-neutral-800 rounded-xl">
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-4 sm:h-5 w-36 sm:w-40" rounded="md" />
      </div>

      <div className="mt-3 min-h-0 overflow-auto">
        <ul className="flex gap-2 sm:gap-3 flex-wrap">
          {Array.from({ length: items }).map((_, i) => (
            <li key={i}>
              <BookTileSkeleton />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
