import { useState } from "react";

import { cn } from "../../utils/cn";

import type { MenuState } from "./profile.types";
import Sidebar from "./Sidebar";
import { Menu } from "./Menu";
import UserData from "./Menu/UserData";

const Profile = () => {
  const [menuState, setMenuState] = useState<MenuState>("default");

  const onWidowStateChange = (state: MenuState) => setMenuState(state);

  return (
    <div className="max-w-screen p-8 text-slate-950 dark:text-white">
      <main className="mx-auto flex max-w-7xl gap-6">
        <section className="w-full grid grid-cols-[auto_1fr] gap-2 rounded-2xl border bg-white/50 p-6 shadow-sm dark:bg-neutral-950/30 min-h-[70vh]">
          <Sidebar
            menuState={menuState}
            onMenuStateChange={onWidowStateChange}
          />
          <div className="flex w-full">
            <div
              className={cn(
                "rounded-xl w-full",
                "overflow-hidden",
                "transition-[max-width,opacity] duration-300 ease-in-out",
                menuState === "default"
                  ? " border max-w-full flex justify-start px-8 py-16 opacity-100"
                  : "max-w-0 opacity-0"
              )}
            >
              <UserData state={menuState} />
            </div>

            <aside
              className={cn(
                "rounded-xl border w-full",
                "overflow-hidden",
                "transition-[max-width,opacity] duration-300 ease-in-out",
                menuState !== "default"
                  ? "max-w-full opacity-100 flex justify-start "
                  : "max-w-0 opacity-0"
              )}
            >
              <Menu state={menuState} onStateChange={onWidowStateChange} />
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
