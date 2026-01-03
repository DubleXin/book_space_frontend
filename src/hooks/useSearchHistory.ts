import { useMemo } from "react";
import { useAuth } from "../store";
import { createSearchHistoryStore } from "../store/searchHistory";

export const useSearchHistory = (historyVersion: number) => {
  const user = useAuth((s) => s.user);
  const useStore = useMemo(
    () => createSearchHistoryStore(String(user?.sub)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, historyVersion]
  );
  return useStore();
};
