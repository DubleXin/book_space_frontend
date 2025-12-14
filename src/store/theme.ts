import { create } from "zustand";

const PREFIX = import.meta.env.VITE_APP_PREFIX || "bookspace";
const VERSION = "v1";

type Theme = "dark" | "light";

const LOCAL_STORAGE = {
  theme: `${PREFIX}.${VERSION}.theme`,
};

type ThemeState = {
  readonly theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem(LOCAL_STORAGE.theme);
  if (stored === "light" || stored === "dark") return stored as Theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const useTheme = create<ThemeState>((set, get) => ({
  theme: getInitialTheme(),
  setTheme: (theme) => {
    localStorage.setItem(LOCAL_STORAGE.theme, theme);
    set({ theme });
  },
  toggleTheme: () => {
    const next: Theme = get().theme === "dark" ? "light" : "dark";
    get().setTheme(next);
  },
}));
