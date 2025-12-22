import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchBook } from "../../api/book";
import { getMyStarred, toggleStarRQ } from "../../api/profile";
import { useAuth } from "../../store";
import type { StarredBook } from "../../types/profile";

export const useBook = (bookId: number | null) =>
  useQuery({
    queryKey: ["book", bookId],
    queryFn: ({ signal }) => fetchBook(bookId!, signal),
    staleTime: 24 * 60 * 60 * 1000,
    placeholderData: keepPreviousData,
    enabled: Number.isFinite(bookId),
  });

export const useMyStars = () => {
  const user = useAuth((s) => s.user);

  return useQuery({
    queryKey: ["stars", user?.sub],
    queryFn: ({ signal }) => getMyStarred(signal),
    placeholderData: keepPreviousData,
    enabled: !!user,
  });
};

export const useToggleStar = () => {
  const user = useAuth((s) => s.user);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: toggleStarRQ,
    onMutate: async (bookId: number) => {
      if (!user) return;
      await qc.cancelQueries({ queryKey: ["stars", user.sub] });

      const prev = qc.getQueryData<StarredBook[]>(["stars", user.sub]) ?? [];

      const isStared = prev.some((s) => s.bookId === bookId);

      const next = isStared
        ? prev.filter((s) => s.bookId !== bookId)
        : [
            ...prev,
            {
              id: -Date.now(),
              userId: user.sub,
              bookId: bookId,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            } as StarredBook,
          ];
      qc.setQueryData(["stars", user.sub], next);
      return { prev };
    },
    onError: (_err, _bookId, ctx) => {
      if (!user) return;
      qc.setQueryData(["stars", user.sub], ctx?.prev);
    },
    onSettled: () => {
      if (!user) return;
      qc.invalidateQueries({ queryKey: ["stars", user.sub] });
    },
  });
};
