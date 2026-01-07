import { NotebookPen, Star, UserCog } from "lucide-react";
import { IconButton } from "../ui/IconButton";
import type { MenuState } from "./profile.types";
import { useMyStars } from "../../hooks";
import { useMyReviews } from "./profile.hooks";

const Sidebar = ({
  menuState: windowState,
  onMenuStateChange: onWidowStateChange,
}: {
  menuState: MenuState;
  onMenuStateChange: (state: MenuState) => void;
}) => {
  const starQuery = useMyStars();
  const reviewQuery = useMyReviews();

  const getVariant = (activeOn: MenuState): "secondary" | "ghost" =>
    windowState === activeOn ? "secondary" : "ghost";

  const starCount = starQuery.data ? starQuery.data.length : 0;
  const reviewCount = reviewQuery.data ? reviewQuery.data.length : 0;
  return (
    <div className="md:rounded-xl border-r md:border p-1 flex flex-col gap-2">
      <div>
        <IconButton
          variant={getVariant("settings")}
          size="lg"
          label={"settings"}
          Icon={UserCog}
          onClick={() => onWidowStateChange("settings")}
        />
      </div>
      <div className="relative inline-flex">
        <IconButton
          variant={getVariant("stars")}
          onClick={() => onWidowStateChange("stars")}
          size="lg"
          label={"stars"}
          Icon={Star}
        />
        <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-yellow-500 px-1 text-[11px] font-semibold text-white">
          {starCount}
        </span>
      </div>
      <div className="relative inline-flex">
        <IconButton
          variant={getVariant("reviews")}
          onClick={() => onWidowStateChange("reviews")}
          size="lg"
          label={"reviews"}
          Icon={NotebookPen}
        />
        <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-violet-500 px-1 text-[11px] font-semibold text-white">
          {reviewCount}
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
