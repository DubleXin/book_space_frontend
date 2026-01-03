import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { BookX, Compass, ArrowLeft } from "lucide-react";

const UnknownBook = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh max-w-screen p-8 text-slate-950 dark:text-white">
      <main className="mx-auto flex max-w-6xl flex-col gap-6">
        <section className="rounded-2xl border bg-white/50 p-6 shadow-sm dark:bg-neutral-950/30">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr] md:items-start">
            <div className="self-start">
              <div className="overflow-hidden rounded-2xl border bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="aspect-[2/3] w-full">
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-neutral-500 dark:text-neutral-400">
                    <BookX className="h-7 w-7" />
                    <span className="text-sm">No cover</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-semibold leading-tight md:text-3xl">
                Book not found
              </h1>

              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                This book doesn't exist, was removed, or the link is incorrect.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  className="w-auto gap-2"
                  onClick={() => navigate("/explore")}
                >
                  <Compass className="h-4 w-4" />
                  Back to Explore
                </Button>

                <Button
                  variant="outline"
                  className="w-auto gap-2"
                  onClick={() => navigate(-1)}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Go back
                </Button>
              </div>

              <div className="mt-6 rounded-2xl border bg-white p-5 dark:bg-neutral-950/40">
                <h2 className="mb-3 text-sm font-semibold tracking-wide text-neutral-700 dark:text-neutral-300">
                  What you can do
                </h2>

                <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-200">
                  <li>• Browse Explore to find similar books.</li>
                  <li>• Try searching by title or author.</li>
                  <li>• Check if the URL is correct.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UnknownBook;
