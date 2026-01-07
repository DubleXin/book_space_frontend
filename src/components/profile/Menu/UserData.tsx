import { CircleUser } from "lucide-react";
import { useMyProfile } from "../../../hooks";
import type { MenuState } from "../profile.types";
import { useAuth } from "../../../store";

const UserData = ({ state }: { state: MenuState }) => {
  const user = useAuth((s) => s.user);

  const profileQuery = useMyProfile(0);
  const profile = profileQuery.data ?? undefined;

  if (state !== "default") return null;

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-6 ">
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-neutral-950/40">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <div className="grid h-16 w-16 place-items-center rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
              <CircleUser className="h-10 w-10 stroke-[1.5] text-slate-700 dark:text-white/80" />
            </div>

            <div className="min-w-0 text-center sm:text-left">
              <h1 className="text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
                <span className="text-sky-600 dark:text-sky-300">
                  {profile?.username ?? "Loading…"}
                </span>
              </h1>
              <p className="mt-1 truncate text-sm text-slate-600 dark:text-white/60">
                {user?.email ?? "—"}
              </p>
            </div>
          </div>
        </div>

        <div
          className="rounded-2xl border border-slate-200 bg-white/70 p-3 md:p-6 
        shadow-sm backdrop-blur dark:border-white/10 dark:bg-neutral-950/40
        max-h-full md:max-h-60 overflow-y-auto scrollbar-thin"
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-wide text-slate-800 dark:text-white/80">
              Bio
            </h2>

            <span className="text-xs text-slate-500 dark:text-white/40">
              Public
            </span>
          </div>

          <p className="text-xs md:text-sm leading-relaxed text-slate-700 dark:text-white/70">
            {profile?.bio?.trim() ? profile.bio : "No bio yet."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserData;
