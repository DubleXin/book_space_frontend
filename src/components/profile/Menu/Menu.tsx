import type { MenuState } from "../profile.types";
import { IconButton } from "../../ui/IconButton";
import { ArrowLeft } from "lucide-react";
import { Settings } from "./Settings";
import { Stars } from "./Stars";
import { Reviews } from "./Reviews";

const widths: Record<MenuState, string> = {
  default: "",
  settings: "max-w-2xl",
  stars: "max-w-4xl",
  reviews: "max-w-5xl",
};

const Menu = ({
  state,
  onStateChange,
}: {
  state: MenuState;
  onStateChange: (state: MenuState) => void;
}) => {
  if (state === "default") return null;

  return (
    <section className="w-full px-4 py-6 h-[80vh] overflow-y-auto scrollbar-thin">
      <div className={`mx-auto w-full ${widths[state]}`}>
        <div className="mb-4 flex items-center gap-3">
          <IconButton
            label="back"
            Icon={ArrowLeft}
            onClick={() => onStateChange("default")}
          />
          <h2 className="text-base font-semibold tracking-tight">
            {state === "settings" && "Settings"}
            {state === "stars" && "Stars"}
            {state === "reviews" && "Reviews"}
          </h2>
        </div>

        <div className="w-full">
          {state === "settings" && <Settings />}
          {state === "stars" && <Stars />}
          {state === "reviews" && <Reviews />}
        </div>
      </div>
    </section>
  );
};

export default Menu;
