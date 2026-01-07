import { Skeleton } from "../../components/ui/Skeleton";
import { cn } from "../../utils/cn";

function PillSkeleton({ className }: { className?: string }) {
  return <Skeleton rounded="full" className={cn("h-8", className)} />;
}

export function BookPageSkeleton() {
  return (
    <div className="max-w-screen text-slate-950 dark:text-white md:p-8 min-w-0">
      <main className="mx-auto flex max-w-6xl gap-6">
        <div className="flex-1 space-y-6">
          <section className="md:rounded-2xl border dark:border-neutral-800 bg-white/50 p-3 sm:p-4 md:p-6 md:shadow-sm dark:bg-neutral-950/30">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr] md:items-start">
              <CoverContentSkeleton />
              <BookContentSkeleton />
            </div>
          </section>

          <ReviewsSectionSkeleton />
        </div>
      </main>
    </div>
  );
}

function CoverContentSkeleton() {
  return (
    <div className="self-start">
      <div className="overflow-hidden md:rounded-2xl border bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="aspect-[2/3] w-full min-w-0">
          <Skeleton className="h-full w-full" rounded="2xl" />
        </div>

        <div className="w-full flex justify-between px-10 py-2">
          {/* Icon buttons */}
          <Skeleton className="h-10 w-10" rounded="full" />
          <Skeleton className="h-10 w-10" rounded="full" />
        </div>
      </div>
    </div>
  );
}

function BookContentSkeleton() {
  return (
    <div className="min-w-0 p-2 md:p-0">
      <div className="flex flex-col gap-2">
        {/* title */}
        <Skeleton className="h-7 sm:h-8 w-5/6" rounded="md" />

        {/* author + meta row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Skeleton className="h-4 w-40" rounded="md" />
          <Skeleton className="h-4 w-14" rounded="md" />
          <Skeleton className="h-4 w-24" rounded="md" />
        </div>

        {/* tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <PillSkeleton
              key={i}
              className={cn(i % 3 === 0 ? "w-24" : "w-20")}
            />
          ))}
        </div>
      </div>

      {/* About */}
      <div className="mt-6 md:rounded-2xl md:border md:dark:border-neutral-800 bg-white p-4 sm:p-5 dark:bg-neutral-950/40">
        <Skeleton className="h-4 w-28" rounded="md" />
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-full" rounded="md" />
          <Skeleton className="h-4 w-11/12" rounded="md" />
          <Skeleton className="h-4 w-10/12" rounded="md" />
          <Skeleton className="h-4 w-9/12" rounded="md" />
        </div>
      </div>
    </div>
  );
}

export function ReviewsSectionSkeleton({ cards = 3 }: { cards?: number }) {
  return (
    <section className="md:rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 md:p-6 shadow-sm dark:bg-neutral-950/30 min-w-0">
      <div className="flex items-center px-6 sm:px-8 justify-between flex-wrap gap-2">
        <Skeleton className="h-5 w-28" rounded="md" />
        <Skeleton className="h-4 w-24" rounded="md" />
      </div>

      {/* composer placeholder */}
      <div className="mt-4 border bg-white p-4 md:rounded-2xl dark:border-neutral-800 dark:bg-neutral-950/40">
        <div className="flex gap-3">
          <Skeleton className="h-10 w-10" rounded="full" />
          <div className="min-w-0 flex-1 space-y-3">
            <Skeleton className="h-20 w-full" rounded="xl" />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-12" rounded="md" />
                <Skeleton className="h-6 w-24" rounded="full" />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Skeleton className="h-10 w-full sm:w-24" rounded="xl" />
                <Skeleton className="h-10 w-full sm:w-20" rounded="xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ul className="mt-4 space-y-3 p-2">
        {Array.from({ length: cards }).map((_, i) => (
          <li
            key={i}
            className="rounded-2xl border bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-950/40"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 space-y-2">
                <Skeleton className="h-4 w-32" rounded="md" />
                <Skeleton className="h-6 w-36" rounded="full" />
              </div>
              <Skeleton className="h-4 w-20" rounded="md" />
            </div>

            <div className="mt-3 space-y-2">
              <Skeleton className="h-4 w-full" rounded="md" />
              <Skeleton className="h-4 w-11/12" rounded="md" />
              <Skeleton className="h-4 w-9/12" rounded="md" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
