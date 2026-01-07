import React from "react";
import HomeSidebar from "./HomeSideBar";
import { cn } from "../../utils/cn";

const Shell = ({ children }: { children: React.ReactNode }) => (
  <div className="max-w-screen p-0 md:p-12 text-slate-950 dark:text-white ">
    <main className="mx-auto flex max-w-7xl ">
      <HomeSidebar />
      <section
        className={cn(
          "relative isolate",
          "w-full grid grid-cols-[auto_1fr] gap-2 rounded-2xl md:border md:dark:border-neutral-800",
          "bg-white/50 p-6 shadow-sm dark:bg-neutral-950/30 min-h-[70vh]"
        )}
      >
        <div className="min-w-0 relative overflow-visible">{children}</div>
      </section>
    </main>
  </div>
);

export default Shell;
