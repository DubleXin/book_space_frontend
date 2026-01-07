import { Logs } from "lucide-react";
import { IconButton } from "../ui/IconButton";

import { useContext } from "react";
import HomeContext from "./home.context";

const HomeSidebar = () => {
  const { state, onStateChange } = useContext(HomeContext);

  const isOpen = state === "activity";

  return (
    <div className="relative flex flex-col gap-2 z-10 mt-16 invisible pointer-events-none lg:visible lg:pointer-events-auto">
      <div className="absolute -left-[2.45rem] top-0 inline-flex border-y border-l rounded-l-xl p-1 bg-white dark:bg-neutral-950 dark:border-neutral-800">
        <IconButton
          label={isOpen ? "close activity" : "activity"}
          Icon={Logs}
          size="sm"
          variant={isOpen ? "secondary" : "ghost"}
          onClick={() => onStateChange(isOpen ? "default" : "activity")}
        />
      </div>
    </div>
  );
};

export default HomeSidebar;
