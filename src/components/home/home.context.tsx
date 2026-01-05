import { createContext } from "react";
import type { HomePanelState } from "./home.types";

type HomeContext = {
  state: HomePanelState;
  onStateChange: (s: HomePanelState) => void;
};

const defaultContext: HomeContext = {
  state: "default",
  onStateChange: () => {},
};

const context = createContext(defaultContext);

export default context;
