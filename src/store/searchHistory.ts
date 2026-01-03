import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const PREFIX = import.meta.env.VITE_APP_PREFIX || "bookspace";
const VERSION = "v1";
const LOCAL_STORAGE = {
  searchHistory: `${PREFIX}.${VERSION}.searchHistory`,
};

const MAX_ITEMS = 12;

type SearchHistoryState = {
  items: string[];
  add: (query: string) => void;
  remove: (query: string) => void;
  clear: () => void;
};

const normalize = (query: string) => query.trim().replace(/\s+/g, " ");

export const createSearchHistoryStore = (userKey?: string) => {
  userKey = userKey ?? "guest";

  return create<SearchHistoryState>()(
    persist(
      (set) => ({
        items: [],
        add: (query) =>
          set((state) => {
            const normalized = normalize(query);
            if (!normalized) return state;
            const next = [
              normalized,
              ...state.items.filter((record) => record !== normalized),
            ].slice(0, MAX_ITEMS);
            return { items: next };
          }),
        remove: (query) =>
          set((state) => ({
            items: state.items.filter((record) => record !== query),
          })),
        clear: () => set({ items: [] }),
      }),
      {
        name: `${LOCAL_STORAGE.searchHistory}.${userKey}`,
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
};
