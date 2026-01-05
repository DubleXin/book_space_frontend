import { Outlet, useOutletContext } from "react-router-dom";
import HomeSidebar from "../components/home/HomeSideBar";
import type { HomePanelState } from "../components/home/home.types";
import { useState } from "react";

// If you want to pass more stuff (activity count, etc), add it here.
export type HomeOutletContext = {
  panel: HomePanelState;
  setPanel: React.Dispatch<React.SetStateAction<HomePanelState>>;
  activityCount: number;
};

export default function HomeLayout() {
  const [panel, setPanel] = useState<HomePanelState>("default");

  // For the “theory test”, hardcode or compute it however you want.
  // You can later move your activityItems.length here and pass it down.
  const activityCount = 0;

  return (
    <div className="max-w-screen p-8 text-slate-950 dark:text-white">
      <main className="mx-auto flex max-w-7xl gap-6">
        <section
          className={[
            "relative isolate", // ✅ creates a clean stacking context for z-index
            "w-full grid grid-cols-[auto_1fr] gap-2 rounded-2xl border",
            "bg-white/50 p-6 shadow-sm dark:bg-neutral-950/30 min-h-[70vh]",
          ].join(" ")}
        >
          <HomeSidebar
            state={panel}
            onStateChange={setPanel}
            activityCount={activityCount}
          />

          {/* ✅ critical: defines containing block + allows shrink inside 1fr grid cell */}
          <div className="min-w-0 relative">
            <Outlet
              context={
                { panel, setPanel, activityCount } satisfies HomeOutletContext
              }
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export const useHomeContext = () => useOutletContext<HomeOutletContext>();
